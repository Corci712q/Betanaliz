'use client'
import { useState, useEffect, useCallback } from 'react'
import type { AnalysisResult } from './poisson'

const STORAGE_KEY = 'betanaliz_history_v2'

export function useHistory() {
  const [history, setHistory] = useState<AnalysisResult[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setHistory(JSON.parse(raw))
    } catch {}
  }, [])

  const save = useCallback((h: AnalysisResult[]) => {
    setHistory(h)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(h)) } catch {}
  }, [])

  const addResult = useCallback((item: Omit<AnalysisResult, 'id' | 'date'>) => {
    setHistory(prev => {
      const next = [
        { ...item, id: Date.now(), date: new Date().toLocaleDateString('tr-TR') },
        ...prev,
      ].slice(0, 50)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const setMatchResult = useCallback((id: number, result: '1' | 'X' | '2') => {
    setHistory(prev => {
      const next = prev.map(x => x.id === id ? { ...x, result } : x)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    save([])
  }, [save])

  const isCorrect = useCallback((item: AnalysisResult): boolean | null => {
    if (!item.result) return null
    const max = Math.max(item.homeWin, item.draw, item.awayWin)
    if (item.result === '1' && item.homeWin === max) return true
    if (item.result === 'X' && item.draw === max) return true
    if (item.result === '2' && item.awayWin === max) return true
    return false
  }, [])

  const accuracy = (() => {
    const withResult = history.filter(x => x.result)
    if (!withResult.length) return null
    const correct = withResult.filter(x => isCorrect(x) === true).length
    return Math.round((correct / withResult.length) * 100)
  })()

  return { history, addResult, setMatchResult, clearHistory, isCorrect, accuracy }
}
