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
    if (contentRef.current) observer.observe(contentRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <header className="relative min-h-screen overflow-hidden luxury-fixed-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent z-0" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-32">
        <div
          ref={contentRef}
          className="grid items-center gap-12 opacity-0 lg:grid-cols-2 lg:gap-16"
        >
          {/* Text Content */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <span className="mb-4 inline-block rounded-full bg-black/5 px-4 py-1.5 text-xs font-bold tracking-widest text-gray-500">
              REVIVAL.TOKYO
            </span>

            <h1 className="mb-4 font-sans text-5xl font-black leading-[1.1] tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
              みんなと同じは、
              <br />
              <span className="text-gray-400">もう飽きた。</span>
            </h1>

            <p className="mb-8 font-sans text-base font-semibold tracking-wide text-gray-600">
              ヴィトン、最初の1個はRevivalで。
            </p>

            <p className="mb-10 max-w-xl font-sans text-sm leading-relaxed text-gray-500 lg:text-base">
              流行を追うんじゃなくて、自分の「好き」を持つ時代。
              ヴィンテージのルイ・ヴィトンは、どこにもない自分らしさを作ってくれる最高のアイテム。
              全品鑑定済みで、はじめてでも安心。
            </p>

            {/* Badges */}
            <div className="mb-10 flex flex-wrap justify-center gap-3 lg:justify-start">
              {[
                { icon: Truck, text: "全国送料無料" },
                { icon: Shield, text: "100%本物保証" },
                { icon: Sparkles, text: "最短翌日発送" },
              ].map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm"
                >
                  <badge.icon className="h-3.5 w-3.5 text-black" />
                  <span className="text-xs font-bold tracking-wider text-gray-700">
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="https://revival.tokyo/products/list?category_id=&name=ヴィトン"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-10 py-4 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-xl"
            >
              コレクションを見てみる
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl border border-gray-200/60" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100/50 shadow-2xl backdrop-blur-sm">
                <Image
                  src="/topimage.png"
                  alt="Louis Vuitton Collection"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl border border-gray-100 bg-white px-5 py-3 shadow-lg">
                <p className="text-[10px] font-bold tracking-widest text-gray-400">Since 1854</p>
                <p className="text-base font-black tracking-tight text-gray-900">HERITAGE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400">SCROLL</span>
            <div className="h-10 w-px bg-gradient-to-b from-gray-300 to-transparent" />
          </div>
        </div>
      </div>
    </header>
  )
}
