"use client"

import { useEffect, useRef } from "react"

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelector(".content")?.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background/10 py-32 md:py-40"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Decorative Lines */}
      <div className="absolute left-0 top-1/2 h-px w-1/4 bg-gradient-to-r from-transparent to-primary/30" />
      <div className="absolute right-0 top-1/2 h-px w-1/4 bg-gradient-to-l from-transparent to-primary/30" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="content text-center opacity-0">
          <span className="mb-6 inline-block font-serif text-xs tracking-[0.4em] text-primary">
            OUR PHILOSOPHY
          </span>

          <h2 className="mb-12 font-serif text-2xl font-light leading-relaxed tracking-wide text-foreground md:text-3xl">
            私たちのモノづくりと価値への想い
          </h2>

          <div className="space-y-8">
            <p className="text-sm leading-loose text-muted-foreground md:text-base">
              ルイ・ヴィトンが1854年の創業以来、170年以上にわたって世界中で愛され続けている理由。
              それは、徹底的に計算された機能美と、フランスの職人たちが魂を込めて作り上げる圧倒的なクラフトマンシップにあります。
              丁寧に扱われたヴィトンは、10年、20年と時を経てもその美しさと価値を失うことはありません。
            </p>

            <p className="text-sm leading-loose text-muted-foreground md:text-base">
              私たちRevival.tokyoは、前のオーナー様が大切に扱い、紡いできた
              <span className="gold-gradient-text font-medium">『歴史と物語（リバイバル）』</span>
              を敬意を持って受け継ぎ、新しくオーナーとなるあなたへ、最高の状態でお繋ぎすることを使命としています。
            </p>
          </div>

          {/* Decorative Quote */}
          <div className="mt-16 border-l-2 border-primary/30 pl-8 text-left">
            <p className="font-serif text-lg italic text-primary/80">
              {"\"真の贅沢とは、時を超えて愛され続けるもの\""}
            </p>
            <p className="mt-2 text-xs tracking-wider text-muted-foreground">
              — REVIVAL.TOKYO
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
