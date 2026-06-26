'use client'
import React from 'react'
import type { AnalysisResult } from '@/lib/poisson'
import { Badge, Button } from './ui'

export default function HistoryPage({
  history, onSetResult, onClear, isCorrect
}: {
  history: AnalysisResult[]
  onSetResult: (id: number, r: '1' | 'X' | '2') => void
  onClear: () => void
  isCorrect: (item: AnalysisResult) => boolean | null
}) {
  if (!history.length) return (
    <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-secondary)' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
      <div style={{ fontWeight: 500, marginBottom: 4 }}>Henüz analiz yok</div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>İlk maçını analiz et!</div>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ fontWeight: 500 }}>Analiz geçmişi ({history.length})</div>
        <Button size="sm" onClick={onClear}>🗑 Temizle</Button>
      </div>

      {history.map(item => {
        const correct = isCorrect(item)
        return (
          <div key={item.id} style={{ borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{item.home} vs {item.away}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                  {item.league && `${item.league} — `}{item.date} — En olası: {item.topScores[0]?.h}-{item.topScores[0]?.a}
                </div>
                <div style={{ display: 'flex', gap: 5, marginTop: 6 }}>
                  <Badge variant="accent">{item.home} {item.homeWin}%</Badge>
                  <Badge variant="neutral">Ber {item.draw}%</Badge>
                  <Badge variant="warning">{item.away} {item.awayWin}%</Badge>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Sonuç:</span>
                  <select
                    value={item.result || ''}
                    onChange={e => e.target.value && onSetResult(item.id, e.target.value as '1' | 'X' | '2')}
                    style={{ width: 'auto', fontSize: 12, padding: '3px 6px' }}
                  >
                    <option value="">Gir...</option>
                    <option value="1">1. Takım kazandı</option>
                    <option value="X">Beraberlik</option>
                    <option value="2">2. Takım kazandı</option>
                  </select>
                  {correct !== null && (
                    <Badge variant={correct ? 'success' : 'danger'}>
                      {correct ? '✓ İsabet' : '✗ Yanış'}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
