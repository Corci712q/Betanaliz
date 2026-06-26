'use client'
import React, { useState } from 'react'
import { useHistory } from '@/lib/useHistory'
import type { AnalysisResult } from '@/lib/poisson'
import AIAnalysisTab from '@/components/AIAnalysisTab'
import ManualAnalysisTab from '@/components/ManualAnalysisTab'
import HistoryPage from '@/components/HistoryPage'
import StatsPage from '@/components/StatsPage'

type Page = 'analyze' | 'history' | 'stats'
type AnalyzeTab = 'ai' | 'manual'

export default function Home() {
  const [page, setPage] = useState<Page>('analyze')
  const [analyzeTab, setAnalyzeTab] = useState<AnalyzeTab>('ai')
  const { history, addResult, setMatchResult, clearHistory, isCorrect, accuracy } = useHistory()

  function handleResult(r: AnalysisResult) {
    addResult(r)
  }

  const navItems: { id: Page; label: string; icon: string }[] = [
    { id: 'analyze', label: 'Analiz', icon: '🔍' },
    { id: 'history', label: 'Geçmiş', icon: '📋' },
    { id: 'stats',   label: 'İsabet', icon: '🏆' },
  ]

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '1.25rem 1rem 4rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
            📊 BetAnaliz
            <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--text-muted)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 6, padding: '2px 8px' }}>Pro</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
            Poisson istatistik modeli ile maç analizi
          </div>
        </div>
        {accuracy !== null && (
          <div style={{ textAlign: 'center', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '8px 14px' }}>
            <div style={{ fontSize: 20, fontWeight: 600, color: accuracy >= 50 ? 'var(--success-text)' : 'var(--danger-text)' }}>{accuracy}%</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>İsabet</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <div style={{ display: 'flex', gap: 4, marginBottom: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: 4 }}>
        {navItems.map(nav => (
          <button
            key={nav.id}
            onClick={() => setPage(nav.id)}
            style={{
              flex: 1, padding: '7px 12px', border: 'none', cursor: 'pointer', borderRadius: 8,
              fontSize: 13, fontWeight: page === nav.id ? 500 : 400, fontFamily: 'inherit',
              background: page === nav.id ? 'var(--accent-bg)' : 'transparent',
              color: page === nav.id ? 'var(--accent-text)' : 'var(--text-secondary)',
              transition: 'all .15s'
            }}
          >
            {nav.icon} {nav.label}
          </button>
        ))}
      </div>

      {/* Analyze page */}
      {page === 'analyze' && (
        <div>
          {/* Analyze sub-tabs */}
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
            {[{ id: 'ai' as AnalyzeTab, label: '🤖 AI Analiz' }, { id: 'manual' as AnalyzeTab, label: '🧮 Manuel' }].map(t => (
              <button
                key={t.id}
                onClick={() => setAnalyzeTab(t.id)}
                style={{
                  padding: '8px 16px', border: 'none', background: 'none', cursor: 'pointer',
                  fontSize: 13, fontWeight: analyzeTab === t.id ? 500 : 400, fontFamily: 'inherit',
                  color: analyzeTab === t.id ? 'var(--accent)' : 'var(--text-secondary)',
                  borderBottom: analyzeTab === t.id ? '2px solid var(--accent)' : '2px solid transparent',
                  marginBottom: -1
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {analyzeTab === 'ai'
            ? <AIAnalysisTab onResult={handleResult} />
            : <ManualAnalysisTab onResult={handleResult} />
          }
        </div>
      )}

      {page === 'history' && (
        <HistoryPage history={history} onSetResult={setMatchResult} onClear={clearHistory} isCorrect={isCorrect} />
      )}

      {page === 'stats' && (
        <StatsPage history={history} isCorrect={isCorrect} accuracy={accuracy} />
      )}
    </div>
  )
}
