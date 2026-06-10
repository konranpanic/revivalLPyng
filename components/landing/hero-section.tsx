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
    <header className="relative min-h-screen overflow-hidden bg-white">
      {/* Background Image - 全画面に背景画像を配置 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/topimage.png"
          alt="Louis Vuitton Vintage Background"
          fill
          className="object-cover"
          priority
        />
        {/* 白基調の明るいグラデーションマスク（文字を読みやすくしつつ、クリーンな印象に） */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-32 lg:items-start">
        <div
          ref={contentRef}
          className="w-full max-w-2xl opacity-0 text-left"
        >
          {/* タグ風バッジ */}
          <span className="mb-6 inline-block bg-black px-3 py-1 text-xs font-bold tracking-widest text-white">
            VINTAGE COLLECTION
          </span>

          {/* 大胆な太ゴシック見出し */}
          <h1 className="mb-6 font-sans text-5xl font-black leading-tight tracking-tighter text-gray-900 md:text-7xl">
            GET THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
              ICON.
            </span>
          </h1>

          {/* 若者向けのキャッチコピー */}
          <p className="mb-8 font-sans text-base font-medium leading-relaxed text-gray-700 md:text-lg">
            誰かと同じは、もういらない。<br />
            世界に一つだけのヴィンテージ・ルイヴィトンで、<br />
            あなただけのスタイルを完成させよう。
          </p>

          {/* ソリッドな黒ボタン */}
          <a
            href="#product"
            className="inline-flex items-center gap-2 bg-black px-8 py-4 text-sm font-bold tracking-widest text-white transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            コレクションを見る
            <ArrowRight className="h-4 w-4" />
          </a>
        </a>
      </div>
    </header>
  )
}
