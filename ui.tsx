'use client'
import React from 'react'
import type { AnalysisResult } from '@/lib/poisson'
import { Card, SectionTitle, Badge } from './ui'

function ProbCard({ label, pct, isTop }: { label: string; pct: number; isTop: boolean }) {
  return (
    <div style={{
      background: isTop ? 'var(--accent-bg)' : 'var(--surface-2)',
      border: `1px solid ${isTop ? 'var(--accent-border)' : 'var(--border)'}`,
      borderRadius: 'var(--radius)', padding: '11px 8px', textAlign: 'center'
    }}>
      <div style={{ fontSize: 11, color: isTop ? 'var(--accent-text)' : 'var(--text-secondary)', marginBottom: 4, fontWeight: 500 }}>
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 500, color: isTop ? 'var(--accent)' : 'var(--text)' }}>
        {pct}%
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
        oran ~{(100 / pct).toFixed(2)}
      </div>
    </div>
  )
}

function ScoreCell({ h, a, pct }: { h: number; a: number; pct: number }) {
  const isHot = pct >= 8
  const isWarm = pct >= 4 && pct < 8
  return (
    <div style={{
      background: isHot ? 'var(--danger-bg)' : isWarm ? 'var(--warning-bg)' : 'var(--surface-2)',
      border: `1px solid ${isHot ? '#fecaca' : isWarm ? '#fde68a' : 'var(--border)'}`,
      borderRadius: 'var(--radius)', padding: '7px 4px', textAlign: 'center'
    }}>
      <div style={{ fontSize: 14, fontWeight: 500, color: isHot ? 'var(--danger-text)' : isWarm ? 'var(--warning-text)' : 'var(--text)' }}>
        {h}-{a}
      </div>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>{pct}%</div>
    </div>
  )
}

export default function AnalysisCard({ result }: { result: AnalysisResult }) {
  const max = Math.max(result.homeWin, result.draw, result.awayWin)

  return (
    <Card style={{ marginTop: '.875rem' }}>
      <div style={{ fontSize: 14, fontWeight: 500, marginBottom: '.875rem', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 18 }}>📊</span>
        {result.home} — {result.away}
        {result.league && (
          <Badge variant="neutral">{result.league}</Badge>
        )}
      </div>

      {/* Main odds */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: '1rem' }}>
        <ProbCard label={result.home} pct={result.homeWin} isTop={result.homeWin === max} />
        <ProbCard label="Beraberlik" pct={result.draw} isTop={result.draw === max} />
        <ProbCard label={result.away} pct={result.awayWin} isTop={result.awayWin === max} />
      </div>

      {/* Score predictions */}
      <SectionTitle>Poisson skor tahminleri</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(52px, 1fr))', gap: 6, marginBottom: '1rem' }}>
        {result.topScores.map(s => (
          <ScoreCell key={`${s.h}-${s.a}`} h={s.h} a={s.a} pct={s.pct} />
        ))}
      </div>

      {/* Extra stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px', marginBottom: '1rem' }}>
        {[
          ['2.5 Üst', `${result.over25}%`],
          ['KG Var', `${result.btts}%`],
          [`xG (${result.home})`, result.lambdaH.toFixed(2)],
          [`xG (${result.away})`, result.lambdaA.toFixed(2)],
          ...(result.confidence ? [['Güven', result.confidence]] : []),
        ].map(([label, value]) => (
          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
            <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
            <span style={{ fontWeight: 500 }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Key factor */}
      {result.keyFactor && (
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', padding: '8px 12px', background: 'var(--surface-2)', borderRadius: 'var(--radius)', marginBottom: '.875rem' }}>
          <strong style={{ color: 'var(--text)' }}>Kilit faktör:</strong> {result.keyFactor}
        </div>
      )}

      {/* Analysis text */}
      {result.analysis && (
        <>
          <SectionTitle>Analiz</SectionTitle>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text)', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '.875rem', whiteSpace: 'pre-wrap' }}>
            {result.analysis}
          </div>
        </>
      )}
    </Card>
  )
}
