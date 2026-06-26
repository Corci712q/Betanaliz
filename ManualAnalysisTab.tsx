'use client'
import React, { useState } from 'react'
import { computeMatchProbs, computeLambdas } from '@/lib/poisson'
import type { AnalysisResult } from '@/lib/poisson'
import { FormGroup, Button, InfoBox } from './ui'
import AnalysisCard from './AnalysisCard'

function NumInput({ id, value, onChange, placeholder }: {
  id: string; value: string; onChange: (v: string) => void; placeholder?: string
}) {
  return <input type="number" id={id} min="0" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || '0'} />
}

export default function ManualAnalysisTab({ onResult }: { onResult: (r: AnalysisResult) => void }) {
  const [home, setHome] = useState('')
  const [away, setAway] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const fields = {
    hw: useState(''), hd: useState(''), hl: useState(''),
    hgf: useState(''), hga: useState(''), hxg: useState(''),
    aw: useState(''), ad: useState(''), al: useState(''),
    agf: useState(''), aga: useState(''), axg: useState(''),
    h2hw: useState(''), h2hd: useState(''), h2haw: useState(''), h2ht: useState(''),
  }

  const n = (key: keyof typeof fields) => parseFloat(fields[key][0]) || 0

  function compute() {
    const stats = {
      hW: n('hw'), hD: n('hd'), hL: n('hl'), hGF: n('hgf'), hGA: n('hga'), hXG: n('hxg'),
      aW: n('aw'), aD: n('ad'), aL: n('al'), aGF: n('agf'), aGA: n('aga'), aXG: n('axg'),
      h2hHW: n('h2hw'), h2hD: n('h2hd'), h2hAW: n('h2haw'), h2hTotal: n('h2ht') || 1,
    }
    const { lambdaH, lambdaA } = computeLambdas(stats)
    const probs = computeMatchProbs(lambdaH, lambdaA)
    const item: AnalysisResult = {
      home: home || '1. Takım', away: away || '2. Takım', league: 'Manuel',
      lambdaH, lambdaA, ...probs,
      date: new Date().toLocaleDateString('tr-TR'), id: Date.now(),
    }
    setResult(item)
    onResult(item)
  }

  const half: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }

  return (
    <div>
      <InfoBox>İstatistikleri gir, Poisson + Dixon-Coles yöntemiyle hesaplayalım.</InfoBox>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 36px 1fr', gap: 8, alignItems: 'end', marginBottom: '.875rem' }}>
        <FormGroup label="1. Takım"><input value={home} onChange={e => setHome(e.target.value)} placeholder="Takım adı" /></FormGroup>
        <div style={{ textAlign: 'center', paddingBottom: 8, fontSize: 16, color: 'var(--text-muted)', fontWeight: 500 }}>vs</div>
        <FormGroup label="2. Takım"><input value={away} onChange={e => setAway(e.target.value)} placeholder="Takım adı" /></FormGroup>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8, marginTop: 4 }}>Son 5 maç — 1. Takım</div>
      <div style={half}>
        <FormGroup label="Galibiyet"><NumInput id="hw" value={fields.hw[0]} onChange={fields.hw[1]} placeholder="0-5" /></FormGroup>
        <FormGroup label="Beraberlik"><NumInput id="hd" value={fields.hd[0]} onChange={fields.hd[1]} placeholder="0-5" /></FormGroup>
        <FormGroup label="Mağlubiyet"><NumInput id="hl" value={fields.hl[0]} onChange={fields.hl[1]} placeholder="0-5" /></FormGroup>
        <FormGroup label="Atılan gol"><NumInput id="hgf" value={fields.hgf[0]} onChange={fields.hgf[1]} /></FormGroup>
        <FormGroup label="Yenilen gol"><NumInput id="hga" value={fields.hga[0]} onChange={fields.hga[1]} /></FormGroup>
        <FormGroup label="xG ort."><NumInput id="hxg" value={fields.hxg[0]} onChange={fields.hxg[1]} placeholder="1.5" /></FormGroup>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8, marginTop: 4 }}>Son 5 maç — 2. Takım</div>
      <div style={half}>
        <FormGroup label="Galibiyet"><NumInput id="aw" value={fields.aw[0]} onChange={fields.aw[1]} placeholder="0-5" /></FormGroup>
        <FormGroup label="Beraberlik"><NumInput id="ad" value={fields.ad[0]} onChange={fields.ad[1]} placeholder="0-5" /></FormGroup>
        <FormGroup label="Mağlubiyet"><NumInput id="al" value={fields.al[0]} onChange={fields.al[1]} placeholder="0-5" /></FormGroup>
        <FormGroup label="Atılan gol"><NumInput id="agf" value={fields.agf[0]} onChange={fields.agf[1]} /></FormGroup>
        <FormGroup label="Yenilen gol"><NumInput id="aga" value={fields.aga[0]} onChange={fields.aga[1]} /></FormGroup>
        <FormGroup label="xG ort."><NumInput id="axg" value={fields.axg[0]} onChange={fields.axg[1]} placeholder="1.2" /></FormGroup>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 8, marginTop: 4 }}>H2H</div>
      <div style={half}>
        <FormGroup label="1. takım galibiyeti"><NumInput id="h2hw" value={fields.h2hw[0]} onChange={fields.h2hw[1]} /></FormGroup>
        <FormGroup label="2. takım galibiyeti"><NumInput id="h2haw" value={fields.h2haw[0]} onChange={fields.h2haw[1]} /></FormGroup>
        <FormGroup label="Beraberlik"><NumInput id="h2hd" value={fields.h2hd[0]} onChange={fields.h2hd[1]} /></FormGroup>
        <FormGroup label="Toplam maç"><NumInput id="h2ht" value={fields.h2ht[0]} onChange={fields.h2ht[1]} placeholder="5" /></FormGroup>
      </div>

      <Button variant="primary" fullWidth onClick={compute}>🧮 Hesapla</Button>
      {result && <AnalysisCard result={result} />}
    </div>
  )
}
