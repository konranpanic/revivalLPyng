"use client"

import { useEffect, useRef } from "react"
import { Package, Search, Truck, ArrowRight, AlertTriangle } from "lucide-react"

const steps = [
  {
    number: "1",
    icon: Package,
    title: "カートに入れて決済を完了する",
    description: "「購入する」ボタンを押し、画面の指示に従って入力してください。数分で簡単に完了します。",
  },
  {
    number: "2",
    icon: Search,
    title: "プロによる最終検品と丁寧な厳重梱包",
    description: "発送直前に専門スタッフがもう一度状態を最終確認。湿気や衝撃からバッグを守るため、丁寧にプチプチと資材で包み、専用ダンボールに梱包します。",
  },
  {
    number: "3",
    icon: Truck,
    title: "追跡番号付きで、あなたの元へ最速発送",
    description: "配送業者へ引き渡しが完了した時点で、お荷物の現在地がリアルタイムでわかる「追跡番号」をメールで通知します。",
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="cta-section"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-serif text-xs tracking-[0.4em] text-primary">
            ORDER FLOW
          </span>
          <h2 className="font-serif text-2xl font-light tracking-wide text-foreground md:text-3xl">
            お届けまでの簡単な流れ
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        {/* Steps */}
        <div className="mb-20 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="animate-item opacity-0">
              <div className="group relative h-full border border-border/50 bg-card p-8 transition-all duration-300 hover:border-primary/30">
                {/* Number Badge */}
                <div className="mb-6 flex h-12 w-12 items-center justify-center border border-primary/30 bg-background font-serif text-xl font-semibold text-primary">
                  {step.number}
                </div>

                {/* Icon */}
                <step.icon className="mb-4 h-8 w-8 text-primary/50" />

                {/* Content */}
                <h3 className="mb-3 font-serif text-lg font-medium text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>

                {/* Arrow (except last) */}
                {index < steps.length - 1 && (
                  <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 md:block">
                    <ArrowRight className="h-6 w-6 text-primary/30" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="animate-item opacity-0">
          <div className="relative mx-auto max-w-3xl overflow-hidden border border-primary/30 bg-secondary/50 p-10 text-center md:p-16">
            {/* Corner Decorations */}
            <div className="absolute left-0 top-0 h-16 w-16 border-l-2 border-t-2 border-primary/50" />
            <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-primary/50" />

            {/* Alert */}
            <div className="mb-8 inline-flex items-center gap-3 border border-primary/30 bg-primary/5 px-6 py-3">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium tracking-wider text-primary">
                世界に1点だけの限定リユース品
              </span>
            </div>

            <p className="mb-8 text-sm text-muted-foreground">
              同じコンディションの次回入荷は完全未定です
            </p>

            {/* CTA Button (リンク設定済み) */}
            <a
              href="https://revival.tokyo/products/detail/171" 
              className="group relative mb-8 inline-flex w-full max-w-md items-center justify-center overflow-hidden bg-primary px-8 py-5 text-base font-semibold tracking-[0.1em] text-primary-foreground transition-all duration-300 hover:bg-primary/90 md:text-lg"
            >
              <span className="relative z-10">
                この特別なルイ・ヴィトンを購入する
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>

            {/* Link */}
            <a
              href="https://revival.tokyo/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-6 inline-flex items-center gap-2 text-sm text-primary transition-colors hover:text-primary/80"
            >
              <ArrowRight className="h-4 w-4" />
              Revival.tokyoのトップページ・他の新着商品を見る
            </a>

            <p className="text-xs text-muted-foreground">
              ※ご注文は先着順となります。カートに入れている間でも、他のお客様が決済を完了された場合は売切れとなりますのでご注意ください。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
