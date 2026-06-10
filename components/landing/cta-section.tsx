"use client"

import { useEffect, useRef } from "react"
import { Package, Search, Truck, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "1",
    icon: Package,
    title: "カートに入れて決済",
    description: "「購入する」ボタンを押して画面の指示に従うだけです。数分で簡単に完了します。",
  },
  {
    number: "2",
    icon: Search,
    title: "スタッフが最終チェック＆梱包",
    description: "発送前にもう一度状態を確認します。湿気や衝撃からしっかり守る丁寧な梱包でお届けします。",
  },
  {
    number: "3",
    icon: Truck,
    title: "追跡番号付きで最速発送",
    description: "発送完了と同時に追跡番号をメールでお知らせします。リアルタイムで配送状況をご確認いただけます。",
  },
]

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".animate-item")
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("animate-fade-in-up")
              }, index * 100)
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="cta-section" ref={sectionRef} className="relative overflow-hidden bg-transparent py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold tracking-widest text-gray-500 backdrop-blur-sm">
            ORDER FLOW
          </span>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
            注文の流れ、3ステップだけ
          </h2>
        </div>

        <div className="mb-16 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="animate-item opacity-0">
              <div className="group relative h-full rounded-2xl bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-black font-black text-white">
                  {step.number}
                </div>
                <step.icon className="mb-3 h-7 w-7 text-gray-300" />
                <h3 className="mb-2 text-base font-black text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                    <ArrowRight className="h-5 w-5 text-gray-300" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="animate-item opacity-0">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-black p-10 text-center md:p-16">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-5 py-2 text-xs font-bold tracking-wider text-white">
              ⚡ 世界に1点だけの限定品
            </span>
            <h3 className="mb-3 text-2xl font-black text-white md:text-3xl">
              次の入荷はいつか、わからない。
            </h3>
            <p className="mb-8 text-sm text-gray-400">
              同じコンディションでの次回入荷は完全に未定です。気になったなら、今がそのタイミングです。
            </p>
            <a
              href="https://revival.tokyo/products/detail/171"
              className="group mb-6 inline-flex w-full max-w-md items-center justify-center rounded-full bg-white px-8 py-5 text-base font-black text-black transition-all hover:bg-gray-100 hover:shadow-lg"
            >
              このヴィトンを購入する →
            </a>
            <div className="mb-6">
              <a
                href="https://revival.tokyo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-white"
              >
                他の新着商品も見る <ArrowRight className="h-3 w-3" />
              </a>
            </div>
            <p className="text-xs text-gray-600">
              ※先着順となります。カートに入れている間でも、他のお客様が決済を完了された場合は売切れとなりますのでご注意ください。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
