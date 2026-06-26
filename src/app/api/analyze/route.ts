import { NextRequest, NextResponse } from 'next/server'
import { getMockAnalysis } from '@/lib/poisson'

export async function POST(req: NextRequest) {
  const { home, away, league, note } = await req.json()

  // If no API key, return mock data
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey || apiKey.startsWith('sk-ant-...')) {
    const mock = getMockAnalysis(home, away, league)
    return NextResponse.json(mock)
  }

  // Real Anthropic API call
  const prompt = `Sen bir profesyonel futbol istatistik analistsin. ${league ? league + ': ' : ''}${home} vs ${away} maçını analiz et. ${note ? 'Ek bilgi: ' + note : ''}

Aşağıdaki JSON formatında SADECE JSON döndür, başka hiçbir şey yazma:
{"lambdaH":<ev takımı beklenen gol, ondalıklı>,"lambdaA":<deplasman beklenen gol, ondalıklı>,"confidence":"Düşük/Orta/Yüksek","keyFactor":"<1 cümle kilit faktör>","analysis":"<150-200 kelime Türkçe analiz: form, H2H, taktik, eksikler, tahmin gerekçesi>"}

lambdaH ve lambdaA gerçek istatistiklere dayalı olsun. Sadece JSON döndür.`

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    const data = await res.json()
    const text = data.content
      ?.filter((c: { type: string }) => c.type === 'text')
      .map((c: { text: string }) => c.text)
      .join('') || ''

    const match = text.match(/\{[\s\S]*\}/)
    if (!match) throw new Error('No JSON in response')

    return NextResponse.json(JSON.parse(match[0]))
  } catch (e) {
    const mock = getMockAnalysis(home, away, league)
    return NextResponse.json({ ...mock, error: 'API hatası, mock data kullanıldı' })
  }
}
