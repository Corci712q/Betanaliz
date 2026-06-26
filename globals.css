'use client'
import React, { useState } from 'react'
import { computeMatchProbs } from '@/lib/poisson'
import type { AnalysisResult } from '@/lib/poisson'
import { FormGroup, Button, InfoBox, Spinner } from './ui'
import AnalysisCard from './AnalysisCard'

const LEAGUES = [
  { group: '🌍 Milli Takım', options: ['FIFA Dünya Kupası 2026', 'FIFA DK Elemeleri', 'UEFA EURO', 'UEFA Nations League', 'CONMEBOL Copa América', 'CAF Afrika Kupası', 'Hazırlık Maçı'] },
  { group: '🇹🇷 Türkiye', options: ['Süper Lig', 'TFF 1. Lig', 'Türkiye Kupası'] },
  { group: '🏆 Avrupa Kulüp', options: ['UEFA Champions League', 'UEFA Europa League', 'UEFA Conference League'] },
  { group: '🌍 Avrupa Ligleri', options: ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Eredivisie', 'Primeira Liga'] },
  { group: '🌎 Diğer', options: ['MLS', 'Saudi Pro League', 'Diğer'] },
]

export default function AIAnalysisTab({ onResult }: { onResult: (r: AnalysisResult) => void }) {
  const [home, setHome] = useState('')
  const [away, setAway] = useState('')
  const [league, setLeague] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState('')

  async function run() {
    if (!home.trim() || !away.trim()) { setError('Lütfen iki takımı da girin.'); return }
    setError(''); setLoading(true); setResult(null)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ home, away, league, note }),
      })
      const data = await res.json()
      const probs = computeMatchProbs(data.lambdaH, data.lambdaA)
      const item: AnalysisResult = {
        home, away, league, note,
        lambdaH: data.lambdaH,
        lambdaA: data.lambdaA,
        ...probs,
        analysis: data.analysis,
        confidence: data.confidence,
        keyFactor: data.keyFactor,
        date: new Date().toLocaleDateString('tr-TR'),
        id: Date.now(),
      }
      setResult(item)
      onResult(item)
    } catch {
      setError('Analiz sırasında bir hata oluştu. Tekrar deneyin.')
    }
    setLoading(false)
  }

  return (
    <div>
      <InfoBox>
        Web araştırması + Poisson dağılımı ile otomatik analiz. (Demo: mock data. Gerçek analiz için API key ekleyin.)
      </InfoBox>

      <FormGroup label="Lig / Turnuva">
        <select value={league} onChange={e => setLeague(e.target.value)}>
          <option value="">Seç...</option>
          {LEAGUES.map(g => (
            <optgroup key={g.group} label={g.group}>
              {g.options.map(o => <option key={o}>{o}</option>)}
            </optgroup>
          ))}
        </select>
      </FormGroup>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 36px 1fr', gap: 8, alignItems: 'end', marginBottom: '.875rem' }}>
        <FormGroup label="1. Takım / Ev">
          <input value={home} onChange={e => setHome(e.target.value)} placeholder="örn. Galatasaray" onKeyDown={e => e.key === 'Enter' && run()} />
        </FormGroup>
        <div style={{ textAlign: 'center', paddingBottom: 8, fontSize: 16, color: 'var(--text-muted)', fontWeight: 500 }}>vs</div>
        <FormGroup label="2. Takım / Dep">
          <input value={away} onChange={e => setAway(e.target.value)} placeholder="örn. Fenerbahçe" onKeyDown={e => e.key === 'Enter' && run()} />
        </FormGroup>
      </div>

      <FormGroup label="Ek not (opsiyonel)">
        <input value={note} onChange={e => setNote(e.target.value)} placeholder="Eksik oyuncular, önem derecesi..." />
      </FormGroup>

      {error && <div style={{ color: 'var(--danger-text)', fontSize: 13, marginBottom: 8 }}>{error}</div>}

      <Button variant="primary" fullWidth onClick={run} disabled={loading}>
        {loading ? '...' : '🔍 Analizi başlat'}
      </Button>

      {loading && <Spinner />}
      {result && <AnalysisCard result={result} />}
    </div>
  )
}
