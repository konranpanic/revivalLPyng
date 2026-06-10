"use client"

import { useEffect, useRef } from "react"
import { ShoppingBag, Gem, MessageCircle } from "lucide-react"

const supports = [
  {
    icon: ShoppingBag,
    tag: "人気No.1",
    title: "「アルマ」が最初の1個に選ばれる理由",
    description:
      "1934年生まれのアイコンバッグ「アルマ」。デニムにもワンピにも合う万能シルエットで、持つだけでコーデが格上がりする。ファーストヴィトンとしてダントツで選ばれてる理由がわかる。",
  },
  {
    icon: Gem,
    tag: "失敗しない",
    title: "買って後悔しないための3つのチェック",
    description:
      "財布・スマホ・500mlペットボトルが全部入るPMサイズ。キズがつきにくくて防水性も◎。雨の日でも気にせず使えるのが最高ポイント。毎日使えるから元が取れる。",
  },
  {
    icon: MessageCircle,
    tag: "安心サポート",
    title: "気になることは何でも聞いてOK",
    description:
      "「この部分もっとよく見たい」「傷の大きさは？」何でも気軽に聞いてください。スタッフが実物を確認して丁寧に答えます。LINEでも対応中。",
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
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-bold tracking-widest text-gray-500">
            SUPPORT
          </span>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
            はじめてでも迷わない、
            <br />
            3つのコンテンツ
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {supports.map((support, index) => (
            <div key={index} className="support-card group opacity-0">
              <div className="relative h-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <span className="mb-4 inline-block rounded-full bg-black px-3 py-1 text-[10px] font-bold tracking-wider text-white">
                  {support.tag}
                </span>

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50">
                  <support.icon className="h-6 w-6 text-black" />
                </div>

                <h3 className="mb-3 text-base font-bold leading-snug text-foreground">
                  {support.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {support.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
