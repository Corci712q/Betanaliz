const CACHE = 'betanaliz-v2'
const ASSETS = ['/', '/index.html']

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)))
  self.skipWaiting()
})

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ))
  self.clients.claim()
})

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url)
  // Dış servisler (ESPN, TheSportsDB, Sofascore) ve /api/ hiç önbelleğe girmez:
  // eskiden /api/odds ve TheSportsDB yanıtı bir kez kaydedilip hep o gösteriliyordu
  if (e.request.method !== 'GET' || url.origin !== location.origin || url.pathname.startsWith('/api/')) {
    return
  }
  // Uygulama dosyaları: önce ağ (yeni sürüm hemen gelsin), çevrimdışıyken önbellek
  e.respondWith(
    fetch(e.request).then(res => {
      if (res.ok) {
        const clone = res.clone()
        caches.open(CACHE).then(c => c.put(e.request, clone))
      }
      return res
    }).catch(() => caches.match(e.request).then(c => c || caches.match('/index.html')))
  )
})
