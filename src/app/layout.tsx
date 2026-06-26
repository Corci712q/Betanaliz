import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BetAnaliz Pro',
  description: 'Poisson istatistik modeli ile futbol maç analizi ve tahmin platformu',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
