"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 }
    )

    if (contentRef.current) {
      observer.observe(contentRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <header className="relative min-h-screen overflow-hidden bg-white pt-24">
      {/* 背景の装飾：ゴールドの柄を消し、うっすらとした寒色系のぼかしに変更 */}
      <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-gray-100 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center justify-center px-6 lg:flex-row lg:justify-between">
        <div
          ref={contentRef}
          className="grid w-full items-center gap-12 opacity-0 lg:grid-cols-2 lg:gap-16"
        >
          {/* テキストコンテンツ：太いゴシック体でインパクトを出す */}
          <div className="order-2 text-left lg:order-1">
            <span className="mb-4 inline-block bg-black px-3 py-1 text-xs font-bold tracking-widest text-white">
              VINTAGE COLLECTION
            </span>

            {/* フォントを太く（font-black）、字間を詰める（tracking-tighter）ことで今っぽく */}
            <h1 className="mb-6 font-sans text-5xl font-black leading-tight tracking-tighter text-gray-900 md:text-7xl">
              GET THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-400">
                ICON.
              </span>
            </h1>

            <p className="mb-8 font-sans text-lg font-medium leading-relaxed text-gray-600 md:text-xl">
              誰かと同じは、もういらない。<br />
              世界に一つだけのヴィンテージ・ルイヴィトンで、<br />
              あなただけのスタイルを完成させよう。
            </p>

            {/* ボタン：黒ベタ塗りでソリッドな印象に。ホバーで少し浮き上がる */}
            <a
              href="#product"
              className="inline-flex items-center gap-2 bg-black px-8 py-4 text-sm font-bold tracking-widest text-white transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              コレクションを見る
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* 画像セクション：枠線を消して、角丸とドロップシャドウでシンプルに */}
          <div className="order-1 lg:order-2">
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-2xl lg:h-[600px]">
              <Image
                src="/topimage.png"
                alt="Louis Vuitton Vintage"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              {/* 若者向けっぽいステッカー風バッジ */}
              <div className="absolute bottom-6 right-6 rotate-12 bg-black px-6 py-4 text-center font-bold text-white shadow-lg">
                <span className="block text-xs tracking-widest">100%</span>
                <span className="block text-sm tracking-widest">AUTHENTIC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
