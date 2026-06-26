# BetAnaliz Pro

Poisson istatistik modeli ile futbol maç analizi platformu.

## Özellikler

- **AI Analiz** — Web araştırması + Poisson dağılımı ile otomatik maç analizi
- **Manuel Analiz** — Kendi istatistiklerini gir, Dixon-Coles yöntemiyle hesaplayalım
- **Skor Tahmini** — En olası 9 skoru renk kodlamasıyla gösterir
- **Maç Geçmişi** — Tüm analizler otomatik kaydedilir
- **İsabet Takibi** — Tahminlerin ne kadar tuttu, yüzde olarak takip

## Kurulum (Lokal)

```bash
git clone <repo>
cd betanaliz
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` aç.

## Vercel'e Deploy

### 1. GitHub'a yükle
```bash
git init
git add .
git commit -m "initial commit"
gh repo create betanaliz --public --push
```

### 2. Vercel'e bağla
1. [vercel.com](https://vercel.com) → "New Project"
2. GitHub repo'yu seç
3. "Deploy" — otomatik çalışır

### 3. (Opsiyonel) Gerçek AI analiz için API key ekle
Vercel Dashboard → Settings → Environment Variables:
```
ANTHROPIC_API_KEY = sk-ant-...
```
Key eklenince demo/mock data yerine gerçek web araştırması yapılır.

## Proje Yapısı

```
src/
├── app/
│   ├── api/analyze/route.ts   # AI analiz API endpoint
│   ├── globals.css            # Global stiller + dark mode
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Ana sayfa
├── components/
│   ├── ui.tsx                 # Paylaşılan UI bileşenleri
│   ├── AnalysisCard.tsx       # Analiz sonuç kartı
│   ├── AIAnalysisTab.tsx      # AI analiz sekmesi
│   ├── ManualAnalysisTab.tsx  # Manuel analiz sekmesi
│   ├── HistoryPage.tsx        # Geçmiş sayfası
│   └── StatsPage.tsx          # İsabet istatistikleri
└── lib/
    ├── poisson.ts             # Poisson motoru + tipler
    └── useHistory.ts          # localStorage history hook
```

## Matematik

- **Poisson dağılımı**: P(X=k) = (λ^k × e^-λ) / k!
- **Dixon-Coles düzeltmesi**: Ev sahibi avantajı, saldırı/savunma gücü, H2H ağırlığı
- **Lambda (λ)**: Beklenen gol sayısı — saldırı gücü × rakip savunma zayıflığı × lig ortalaması

## Gelecek Özellikler

- [ ] Handikap analizi
- [ ] İlk yarı / ikinci yarı ayrı tahmin
- [ ] Korner ve kart tahminleri
- [ ] Gerçek zamanlı oran karşılaştırma
- [ ] Çoklu maç kuponu
- [ ] Takım profil sayfaları
