"use client"

import { useState, useEffect, useRef } from "react"
import type { Product } from "@/app/api/products/route"

const specs_labels = ["型番", "シリアル", "サイズ", "付属品"]

export function ProductSection() {
  const [product, setProduct] = useState<Product | null>(null)
  const [activeThumb, setActiveThumb] = useState(0)
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: Product) => {
        setProduct(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

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
    <section id="product" ref={sectionRef} className="relative bg-white/60 py-24 md:py-32 backdrop-blur-sm">
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
        <div className="mb-12 grid gap-4 rounded-2xl bg-gray-50/80 p-6 md:grid-cols-3 backdrop-blur-sm">
          {[
            { label: "全品鑑定済み", desc: "プロが保証した本物のみ取り扱っています。" },
            { label: "厳選された美品", desc: "状態にこだわった個体のみをご提供しています。" },
            { label: "気軽に相談OK", desc: "LINEでもお気軽にご質問ください。" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-sm font-black text-foreground">{item.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ローディング */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
              <p className="text-sm text-muted-foreground">商品を読み込み中...</p>
            </div>
          </div>
        )}

        {/* 商品コンテンツ */}
        {!loading && product && (
          <div className="product-content grid gap-12 opacity-0 lg:grid-cols-2">
            {/* ギャラリー */}
            <div>
              <div className="relative mb-4 overflow-hidden rounded-2xl bg-gray-50/80 p-4 backdrop-blur-sm">
                <div className="aspect-square">
                  {product.images[activeThumb] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.images[activeThumb]}
                      alt={product.name}
                      className="h-full w-full object-cover rounded-xl"
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveThumb(i)}
                    className={`aspect-square overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                      activeThumb === i ? "border-black" : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* 商品情報 */}
            <div>
              <span className="mb-2 inline-block text-xs font-bold tracking-widest text-gray-400">
                HANDBAG / VINTAGE
              </span>
              <h3 className="mb-3 text-2xl font-black tracking-tight text-foreground">
                {product.name}
              </h3>

              <div className="mb-2 flex items-baseline gap-2">
                <span className="text-4xl font-black text-foreground">{product.price}</span>
                <span className="text-sm text-muted-foreground">（税込）</span>
              </div>
              <p className="mb-6 text-sm font-bold text-green-600">新品定価の約1/3。本物保証つき。</p>

              {/* コンディション */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2">
                <span className="text-lg font-black text-black">{product.condition}</span>
                <span className="text-xs text-muted-foreground">
                  {product.condition === "S" && "新品同様"}
                  {product.condition === "A" && "極美品"}
                  {product.condition === "B" && "良品"}
                  {product.condition === "C" && "使用感あり"}
                </span>
              </div>

              <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center rounded-full bg-black px-8 py-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-gray-800 hover:shadow-lg"
              >
                商品の詳細を見る →
              </a>
            </div>
          </div>
        )}

        {/* 商品なしの場合 */}
        {!loading && !product && (
          <div className="py-16 text-center text-muted-foreground">
            <p>現在取り扱い中の商品を確認中です。</p>
            <a href="https://revival.tokyo/products/list?category_id=7" className="mt-4 inline-block text-sm font-bold text-black underline">
              revival.tokyoで直接見る →
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
