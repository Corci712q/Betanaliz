// types
export interface AnalysisResult {
  home: string
  away: string
  league: string
  lambdaH: number
  lambdaA: number
  homeWin: number
  draw: number
  awayWin: number
  over25: number
  btts: number
  topScores: ScorePrediction[]
  analysis?: string
  confidence?: string
  keyFactor?: string
  date: string
  id: number
  result?: '1' | 'X' | '2'
}

export interface ScorePrediction {
  h: number
  a: number
  pct: number
}

// Poisson probability P(X=k) for given lambda
export function poisson(lambda: number, k: number): number {
  if (lambda <= 0) return k === 0 ? 1 : 0
  let p = Math.exp(-lambda)
  for (let i = 1; i <= k; i++) p = (p * lambda) / i
  return p
}

// Compute match probabilities via Poisson distribution
export function computeMatchProbs(lambdaH: number, lambdaA: number, maxGoals = 7) {
  let hw = 0, draw = 0, aw = 0
  const scores: ScorePrediction[] = []

  for (let i = 0; i <= maxGoals; i++) {
    for (let j = 0; j <= maxGoals; j++) {
      const p = poisson(lambdaH, i) * poisson(lambdaA, j)
      if (i > j) hw += p
      else if (i === j) draw += p
      else aw += p
      scores.push({ h: i, a: j, pct: Math.round(p * 100) })
    }
  }

  scores.sort((a, b) => b.pct - a.pct)

  const over25 = scores.reduce((acc, s) => acc + (s.h + s.a > 2 ? s.pct : 0), 0)
  const btts = scores.reduce((acc, s) => acc + (s.h > 0 && s.a > 0 ? s.pct : 0), 0)

  return {
    homeWin: Math.round(hw * 100),
    draw: Math.round(draw * 100),
    awayWin: Math.round(aw * 100),
    over25: Math.min(99, Math.round(over25)),
    btts: Math.min(99, Math.round(btts)),
    topScores: scores.slice(0, 9),
  }
}

// Dixon-Coles adjusted lambda from manual stats
export function computeLambdas(stats: {
  hW: number; hD: number; hL: number; hGF: number; hGA: number; hXG: number
  aW: number; aD: number; aL: number; aGF: number; aGA: number; aXG: number
  h2hHW: number; h2hD: number; h2hAW: number; h2hTotal: number
}) {
  const LEAGUE_MEAN = 1.35
  const HOME_ADV = 1.1

  const hGames = stats.hW + stats.hD + stats.hL || 1
  const aGames = stats.aW + stats.aD + stats.aL || 1

  const hAttack = stats.hXG || stats.hGF / hGames
  const aAttack = stats.aXG || stats.aGF / aGames
  const hDef = stats.hGA / hGames || LEAGUE_MEAN
  const aDef = stats.aGA / aGames || LEAGUE_MEAN

  const h2hBoostH = stats.h2hTotal > 0
    ? ((stats.h2hHW / stats.h2hTotal) - 0.33) * 0.25
    : 0
  const h2hBoostA = stats.h2hTotal > 0
    ? ((stats.h2hAW / stats.h2hTotal) - 0.33) * 0.25
    : 0

  const lambdaH = Math.max(0.2,
    (hAttack / LEAGUE_MEAN) * (LEAGUE_MEAN / Math.max(aDef, 0.4)) * LEAGUE_MEAN * HOME_ADV + h2hBoostH
  )
  const lambdaA = Math.max(0.2,
    (aAttack / LEAGUE_MEAN) * (LEAGUE_MEAN / Math.max(hDef, 0.4)) * LEAGUE_MEAN + h2hBoostA
  )

  return { lambdaH, lambdaA }
}

// Mock AI analysis for demo (replace with real API call when key is added)
export function getMockAnalysis(home: string, away: string, league: string): {
  lambdaH: number
  lambdaA: number
  analysis: string
  confidence: string
  keyFactor: string
} {
  // Deterministic seed based on team names for consistent demo results
  const seed = (home.length * 7 + away.length * 13) % 10

  const lambdaH = parseFloat((1.0 + seed * 0.15).toFixed(2))
  const lambdaA = parseFloat((0.8 + ((seed * 3) % 10) * 0.12).toFixed(2))

  return {
    lambdaH,
    lambdaA,
    confidence: seed > 6 ? 'Yüksek' : seed > 3 ? 'Orta' : 'Düşük',
    keyFactor: `${home} takımının son maçlardaki form ve ev sahibi avantajı belirleyici olacak.`,
    analysis: `Bu analiz demo modunda çalışmaktadır. Gerçek veriler için Vercel dashboard'a ANTHROPIC_API_KEY ekleyin.

${league ? `[${league}] ` : ''}${home} ile ${away} karşılaşmasında her iki takımın son form durumu, kafa kafaya istatistikler ve taktiksel faktörler değerlendirilmiştir.

Beklenen gol değerleri (xG): ${home} → ${lambdaH}, ${away} → ${lambdaA}. Bu değerler Poisson dağılımına göre olasılık hesaplarında kullanılmıştır.

API key eklendiğinde gerçek zamanlı web araştırması ile güncel forma, sakat-cezalı oyuncular ve lig durumuna göre çok daha doğru tahminler üretilecektir.`,
  }
}
