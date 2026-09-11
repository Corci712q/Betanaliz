export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')

  const { path, ...params } = req.query
  const qs = new URLSearchParams(params).toString()
  const url = `https://api.the-odds-api.com/v4/${path || 'sports'}?${qs}`

  try {
    const r = await fetch(url)
    const data = await r.json()
    res.status(r.status).json(data)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
