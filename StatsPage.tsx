'use client'
import React from 'react'
import type { AnalysisResult } from '@/lib/poisson'
import { Badge } from './ui'

export default function StatsPage({
  history, isCorrect, accuracy
}: {
  history: AnalysisResult[]
  isCorrect: (item: AnalysisResult) => boolean | null
  accuracy: number | null
}) {
  const withResult = history.filter(x => x.result)
  const correct = withResult.filter(x => isCorrect(x) === true).length

  if (!history.length) return (
    <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--text-secondary)' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🏆</div>
      <div style={{ fontWeight: 500, marginBottom: 4 }}>Henüz analiz yok</div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Analizler yaptıkça isabet oranın burada görünür.</div>
    </div>
  )

  return (
    <div>
      <div style={{ fontWeight: 500, marginBottom: '1rem' }}>İsabet oranı takibi</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: '1.5rem' }}>
        {[
          { label: 'Toplam analiz', value: history.length, color: 'var(--accent)' },
          { label: 'Sonuç girilen', value: withResult.length, color: 'var(--text)' },
          { label: 'İsabet', value: accuracy !== null ? `${accuracy}%` : '-', color: accuracy !== null && accuracy >= 50 ? 'var(--success-text)' : 'var(--danger-text)' },
        ].map(c => (
          <div key={c.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 500, color: c.color }}>{c.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{c.label}</div>
          </div>
        ))}
      </div>

      {withResult.length > 0 && (
        <>
          <div style={{ height: 1, background: 'var(--border)', margin: '1rem 0' }} />
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8 }}>Son sonuçlar</div>
          {withResult.slice(0, 15).map(item => {
            const correct = isCorrect(item)
            return (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
                <div>
                  <div style={{ fontWeight: 500 }}>{item.home} vs {item.away}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{item.date} — Tahmin: {item.homeWin > item.draw && item.homeWin > item.awayWin ? '1' : item.draw > item.awayWin ? 'X' : '2'}</div>
                </div>
                <Badge variant={correct ? 'success' : 'danger'}>
                  {correct ? '✓ İsabet' : '✗ Yanış'}
                </Badge>
              </div>
            )
          })}
        </>
      )}

      {withResult.length === 0 && (
        <div style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>
          Geçmiş sekmesinden maç sonuçlarını gir, isabet oranın burada hesaplanır.
        </div>
      )}
    </div>
  )
}
