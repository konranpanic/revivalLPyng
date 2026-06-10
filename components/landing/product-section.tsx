"use client"

import { useState, useEffect, useRef } from "react"

const thumbnails = [
  { id: 1, label: "正面全体", src: "/product-171/1.jpeg" },
  { id: 2, label: "底面・角スレ", src: "/product-171/2.jpeg" },
  { id: 3, label: "内側・シリアル", src: "/product-171/3.jpeg" },
  { id: 4, label: "金具拡大", src: "/product-171/4.jpeg" },
]

const specs = [
  { label: "型番", value: "M51240" },
  { label: "シリアル", value: "FL0015（フランス製造）" },
  { label: "サイズ", value: "横幅23cm × 高さ13cm × マチ幅7cm" },
  { label: "付属品", value: "ルイ・ヴィトン純正保存袋" },
]

export function ProductSection() {
  const [activeThumb, setActiveThumb] = useState(1)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelector(".product-content")?.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="product" ref={sectionRef} className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-bold tracking-widest text-gray-500">
            TODAY'S PICK
          </span>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
            今日の厳選アイテム
          </h2>
        </div>

        {/* 3つの強み */}
        <div className="mb-12 grid gap-4 rounded-2xl bg-gray-50 p-6 md:grid-cols-3">
          {[
            { label: "全品鑑定済み", desc: "偽物ゼロ。プロが保証。" },
            { label: "厳選された美品", desc: "状態にこだわった個体だけ。" },
            { label: "気軽に相談OK", desc: "LINEでも何でも聞いて。" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-sm font-black text-foreground">{item.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="product-content grid gap-12 opacity-0 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="relative mb-4 overflow-hidden rounded-2xl bg-gray-50 p-4">
              <div className="aspect-square">
                <img
                  src={thumbnails.find((t) => t.id === activeThumb)?.src}
                  alt={`ルイ・ヴィトン ${thumbnails.find((t) => t.id === activeThumb)?.label}`}
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {thumbnails.map((thumb) => (
                <button
                  key={thumb.id}
                  onClick={() => setActiveThumb(thumb.id)}
                  className={`aspect-square overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                    activeThumb === thumb.id
                      ? "border-black"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img src={thumb.src} alt={thumb.label} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="mb-2 inline-block text-xs font-bold tracking-widest text-gray-400">
              HANDBAG / VINTAGE
            </span>

            <h3 className="mb-3 text-3xl font-black tracking-tight text-foreground">
              トロター ショルダーバッグ
            </h3>

            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-4xl font-black text-foreground">¥180,000</span>
              <span className="text-sm text-muted-foreground">（税込）</span>
            </div>
            <p className="mb-6 text-sm font-bold text-green-600">新品定価の約1/3。本物保証つき。</p>

            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              ヌメ革がちょうどいいアメ色に育ってて、ヴィンテージらしいこなれ感が最高。
              デニムにも、カジュアルにも、どんなコーデにも馴染む。
              これが「ファーストヴィトン」って言われる理由がわかる1個。
            </p>

            <div className="mb-8 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className={`flex ${index !== specs.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <div className="w-2/5 p-4 text-xs font-bold text-muted-foreground">{spec.label}</div>
                  <div className="flex-1 p-4 text-sm text-foreground">{spec.value}</div>
                </div>
              ))}
            </div>

            <a
              href="https://revival.tokyo/products/detail/171"
              className="group inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-gray-800 hover:shadow-lg"
            >
              商品の詳細を見る →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
