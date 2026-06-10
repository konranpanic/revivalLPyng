import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'はじめてのヴィトンはRevivalで｜全品鑑定済み・本物保証のヴィンテージ専門店',
  description: 'みんなと同じじゃつまらない。RevivalはZ世代に向けた、100%本物保証のルイ・ヴィトン専門店。プロ鑑定済みのヴィンテージ品を、新品の約1/3の価格で。はじめてでも安心のサポート付き。',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <div className="fixed inset-0 -z-10 luxury-fixed-bg" />
        <div className="min-h-screen bg-background/50">
          {children}
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
