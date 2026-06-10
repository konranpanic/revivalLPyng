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
  title: '初めてのルイ・ヴィトン（Louis Vuitton）探しはRevivalで｜100%鑑定済みの一生モノを',
  description: '初めてのブランドバッグにルイ・ヴィトンを選びませんか？Revivalでは、プロが厳選した状態の良いヴィンテージ品のみを100%本物保証で販売。中古品に不安がある方も安心のサポート体制で、あなたの「はじめての第一歩」を丁寧にサポートします。',
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
        
        {/* 【修正】背景専用の固定レイヤーをbody直下に分離 */}
        <div className="fixed inset-0 -z-10 luxury-fixed-bg" />
        
        {/* コンテンツの背後にあった半透明レイヤーを調整 */}
        <div className="min-h-screen bg-background/50">
          {children}
        </div>

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
