"use client"

import { useEffect, useRef } from "react"

const conditions = [
  {
    rank: "A",
    rankLabel: "極美品",
    emoji: "✨",
    description: "ちょっと使った感はあるけど、傷や汚れはほぼなし。全体的にめちゃくちゃ綺麗。",
    details: [
      "型崩れほぼなし（自立します）",
      "ヌメ革：均一なアメ色、手垢汚れ極少",
      "四隅の角スレ：わずかにあるけど破れなし",
      "内側：シミ・ペン跡・においなし",
    ],
    highlight: true,
    badge: "この商品",
  },
  {
    rank: "S",
    rankLabel: "新品同様",
    emoji: "🏷",
    description: "ほぼ未使用か1〜2回しか使ってない、新品とほぼ変わらない状態。",
    details: ["この商品はSランクより使用感があるAランクです"],
    highlight: false,
    badge: null,
  },
  {
    rank: "B",
    rankLabel: "良品",
    emoji: "👌",
    description: "普通に使ってた感あり。ヌメ革の焼けや小傷はあるけど使用には問題なし。",
    details: ["この商品はBランクより上のAランクです"],
    highlight: false,
    badge: null,
  },
]

export function ConditionSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelector(".condition-content")?.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-gray-50 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-gray-200 px-4 py-1.5 text-xs font-bold tracking-widest text-gray-500">
            CONDITION
          </span>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
            状態を正直に全部開示。
            <br />
            「思ったと違う」はなし。
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            マイナス点も含めて全部オープンにするのがRevivalのやり方。届いてガッカリはゼロにする。
          </p>
        </div>

        <div className="condition-content space-y-4 opacity-0">
          {conditions.map((condition, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                condition.highlight
                  ? "border-black bg-white shadow-md"
                  : "border-transparent bg-white/60"
              }`}
            >
              <div className="grid gap-6 p-6 md:grid-cols-[100px_1fr_1fr]">
                <div className="flex items-start gap-3 md:flex-col md:items-center md:text-center">
                  <span className="text-3xl">{condition.emoji}</span>
                  <div>
                    <span className={`text-4xl font-black ${condition.highlight ? "text-black" : "text-gray-300"}`}>
                      {condition.rank}
                    </span>
                    <p className="text-xs text-muted-foreground">{condition.rankLabel}</p>
                    {condition.badge && (
                      <span className="mt-1 inline-block rounded-full bg-black px-2 py-0.5 text-[10px] font-bold text-white">
                        {condition.badge}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">{condition.description}</p>

                <div className="border-t border-gray-100 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  <ul className="space-y-2">
                    {condition.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black" />
                        <span className={condition.highlight ? "font-medium text-foreground" : "text-muted-foreground"}>
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
