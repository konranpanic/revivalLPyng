"use client"

import { useEffect, useRef } from "react"
import { Sparkles, Shield, Truck, ArrowRight } from "lucide-react"
import Image from "next/image"

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
      {/* 1. Background Pattern - ゴールドから、若者向けのクリーンな極薄グレーのグラフチェック柄に変更 */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0H0v40h40V0zM1 39V1h38v38H1z' fill='%23000000' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Gradient Overlay - 白基調の滑らかなグラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/50 to-transparent" />

      {/* Decorative Elements - ゴールド系から、クリーンなライトグレーのぼかし球体に変更 */}
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-gray-100 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-gray-100 blur-3xl" />

      {/* 2. Main Content Grid - 元の2段組構造を完全維持 */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-32">
        <div
          ref={contentRef}
          className="grid items-center gap-12 opacity-0 lg:grid-cols-2 lg:gap-16"
        >
          {/* Text Content (左側) - フォントを太ゴシックにして今っぽく */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <span className="mb-4 inline-block font-sans text-xs font-bold tracking-[0.3em] text-gray-500">
              REVIVAL.TOKYO SPECIAL SELECTION
            </span>

            <h1 className="mb-4 font-sans text-5xl font-black leading-tight tracking-tighter text-gray-900 md:text-6xl lg:text-7xl">
              Louis Vuitton
              <br />
              <span className="text-3xl font-bold tracking-normal text-gray-500 md:text-4xl lg:text-5xl">
                Vintage Collection
              </span>
            </h1>

            <p className="mb-8 font-sans text-base font-semibold tracking-wider text-gray-700">
              〜 自分だけのアイコンと出会う、特別な場所 〜
            </p>

            <p className="mb-10 max-w-xl font-sans text-sm leading-relaxed text-gray-600 lg:text-base">
              誰かと同じ流行りは、もういらない。
              時代を超えて愛され続けるルイ・ヴィトンのマスターピースから、今のストリートに映えるアイテムだけを厳選。
              確かな品質と徹底した本物保証で、あなたの「はじめてのヴィンテージ」をどこよりも誠実にサポートします。
            </p>

            {/* Badges - 枠線をゴールドから、シンプルなライトグレーに変更 */}
            <div className="mb-10 flex flex-wrap justify-center gap-4 lg:justify-start">
              {[
                { icon: Truck, text: "全国送料無料" },
                { icon: Shield, text: "100%本物保証" },
                { icon: Sparkles, text: "最短翌日発送" },
              ].map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 border border-gray-200 bg-white/80 px-4 py-2.5 shadow-sm rounded-lg"
                >
                  <badge.icon className="h-4 w-4 text-black" />
                  <span className="text-xs font-bold tracking-wider text-gray-800">
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button - ゴールドの光るエフェクトから、ソリッドな黒ボタンへ */}
            <a
              href="https://revival.tokyo/products/list?category_id=&name=ヴィトン"
              className="group relative inline-flex items-center justify-center bg-black px-10 py-4 text-sm font-bold tracking-[0.15em] text-white transition-all duration-300 hover:bg-gray-900 hover:shadow-lg rounded-sm"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                限定コレクションを見る
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </div>

          {/* Image Section (右側) - 元の比率や浮遊バッジのレイアウトを維持 */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Decorative Frame - ゴールドの細線を、スタイリッシュなライトグレーの細線へ */}
              <div className="absolute -inset-4 border border-gray-200/60 rounded-xl" />
              <div className="absolute -inset-8 border border-gray-100/40 rounded-2xl" />

              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 rounded-lg shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent z-10" />
                <Image
                  src="/topimage.png"
                  alt="Louis Vuitton Collection"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating Badge - フォントをモード風のゴシックに変更 */}
              <div className="absolute -bottom-4 -left-4 border border-gray-200 bg-white px-6 py-3 shadow-md rounded-md">
                <p className="font-sans text-[10px] font-bold tracking-widest text-gray-400">Since 1854</p>
                <p className="font-sans text-lg font-black tracking-tight text-gray-900">HERITAGE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400">
              SCROLL
            </span>
            <div className="h-12 w-px bg-gradient-to-b from-gray-300 to-transparent" />
          </div>
        </div>
      </div>
    </header>
  )
}          className="object-cover"
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
