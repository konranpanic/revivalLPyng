"use client"

import { useEffect, useRef } from "react"

const conditions = [
  {
    rank: "A",
    rankLabel: "ランク（極美品）",
    description: "わずかな使用感はあるものの、目立つ傷や汚れ、型崩れがほとんど見られない、全体的に大変綺麗な状態の中古品。",
    details: [
      "バッグ全体の型崩れ：ほぼなし（自立します）",
      "ハンドル・ヌメ革：均一で綺麗なアメ色、手垢汚れ極少",
      "四隅の角スレ：わずかなスレがあるものの、破れや露出なし",
      "バッグ内側：特筆すべきシミ、ペン跡、不快なニオイなし",
    ],
    highlight: true,
  },
  {
    rank: "S",
    rankLabel: "ランク（新品同様）",
    description: "展示品や未使用品、または1〜2回程度しか使用されていない、新品とほぼ変わらない完璧な状態のもの。",
    details: ["本商品は上記の通り、状態の良いAランクとなります"],
    highlight: false,
  },
  {
    rank: "B",
    rankLabel: "ランク（良品）",
    description: "日常的な使用感があり、ヌメ革の焼けや部分的なシミ、金具の小傷などは見られるが、使用には全く問題のない一般的な中古品。",
    details: ["本商品はBランクよりも上の、ワンランク上の美品コンディションです"],
    highlight: false,
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
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-serif text-xs tracking-[0.4em] text-primary">
            CONDITION
          </span>
          <h2 className="font-serif text-2xl font-light tracking-wide text-foreground md:text-3xl">
            商品状態の詳細開示
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            ネット通販における「がっかり」をなくすため、Revival.tokyoでは専門検品士による厳格な評価基準のもと、マイナス点も含めてすべての状態を透明に開示しています。
          </p>
        </div>

        <div className="condition-content space-y-4 opacity-0">
          {conditions.map((condition, index) => (
            <div
              key={index}
              className={`overflow-hidden border transition-all duration-300 ${
                condition.highlight
                  ? "border-primary/50 bg-primary/5"
                  : "border-border/50 bg-card"
              }`}
            >
              <div className="grid gap-6 p-6 md:grid-cols-[120px_1fr_1fr]">
                {/* Rank */}
                <div className="flex items-start gap-3 md:flex-col md:items-center md:text-center">
                  <span
                    className={`font-serif text-4xl font-semibold ${
                      condition.highlight ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {condition.rank}
                  </span>
                  <span className="text-xs text-muted-foreground">{condition.rankLabel}</span>
                </div>

                {/* Description */}
                <div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {condition.description}
                  </p>
                </div>

                {/* Details */}
                <div className="border-t border-border/30 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                  <ul className="space-y-2">
                    {condition.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                        <span className={condition.highlight ? "text-foreground" : "text-muted-foreground"}>
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
