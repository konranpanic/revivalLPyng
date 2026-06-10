"use client"

import { useEffect, useRef } from "react"
import { ShoppingBag, Gem, Search } from "lucide-react"

const supports = [
  {
    icon: ShoppingBag,
    title: "なぜ「アルマ」が人生最初の1つに選ばれるのか？",
    description:
      "ルイ・ヴィトンの数ある名作の中で、1934年の誕生以来、不動のアイコンとして君臨し続けているのが『アルマ』です。ココ・シャネルのオーダーによって生まれたとも言われるこのバッグは、独特の丸みを帯びたエレガントなシルエットが特徴。フォーマルからカジュアルまで完璧にマッチする普遍のデザインです。",
  },
  {
    icon: Gem,
    title: "絶対に失敗しないための「3つの実用性チェック」",
    description:
      "本モデルは日常使いに最も便利とされる『PMサイズ』を採用しており、長財布やスマホ、500mlペットボトルまで美しく収まります。キズが非常につきにくく、防水性・耐久性にも優れているため、雨の日でも天候を気にせずガシガシ使えるのが最大の秘密です。",
  },
  {
    icon: Search,
    title: "購入前の小さな疑問を解消する「状態確認サポート」",
    description:
      "高額なお買い物だからこそ、一切の妥協や疑問を残したまま購入してほしくありません。「写真のこの部分を拡大して見たい」など、どんな小さな疑問でも遠慮なくお寄せください。Revival.tokyoのスタッフが実際の現物を確認し、丁寧にお答えいたします。",
  },
]

export function SupportSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".support-card")
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-fade-in-up")
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative border-b border-border/50 bg-background py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-serif text-xs tracking-[0.4em] text-primary">
            SUPPORT
          </span>
          <h2 className="font-serif text-2xl font-light leading-relaxed tracking-wide text-foreground md:text-3xl">
            はじめてのルイ・ヴィトン選びを
            <br className="md:hidden" />
            完璧にサポートする3つのコンテンツ
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Revival.tokyo（リバイバル・トウキョウ）は、あなたが「いつかは欲しい」と願っていた憧れのブランドを、
            最高の満足感とともにお手元にお届けするための準備を整えています。
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {supports.map((support, index) => (
            <div
              key={index}
              className="support-card group relative opacity-0"
            >
              <div className="relative h-full overflow-hidden border border-border/50 bg-card p-8 transition-all duration-500 hover:border-primary/30 hover:bg-secondary/30">
                {/* Number Badge */}
                <div className="absolute right-6 top-6 font-serif text-5xl font-light text-primary/10">
                  0{index + 1}
                </div>

                {/* Icon */}
                <div className="relative mb-8">
                  <div className="flex h-16 w-16 items-center justify-center">
                    <div className="absolute inset-0 border border-primary/30 transition-transform duration-300 group-hover:rotate-45" />
                    <support.icon className="relative z-10 h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-4 border-b border-primary/20 pb-4 font-serif text-lg font-medium leading-relaxed text-foreground">
                  {support.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {support.description}
                </p>

                {/* Hover Indicator */}
                <div className="mt-6 flex items-center gap-2 text-xs tracking-wider text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span>LEARN MORE</span>
                  <div className="h-px w-8 bg-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
