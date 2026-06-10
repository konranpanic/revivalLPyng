"use client"

import { useEffect, useRef } from "react"

const careSteps = [
  {
    number: "01",
    emoji: "🧴",
    title: "帰ったらサッと乾拭きするだけ",
    description:
      "モノグラムのキャンバス部分はPVC素材のため、柔らかい布で軽く拭き取るだけでお手入れ完了です。手汗や雨のしずくがついた際は、放置せずすぐに乾いた布で拭き取ることをおすすめします。",
  },
  {
    number: "02",
    emoji: "🌬️",
    title: "しまうときは「風通しのいい場所」に",
    description:
      "箱に入れたままクローゼットの奥にしまい込んでしまうと、湿気がこもりカビの原因になることがあります。付属の保存袋に入れ、風通しのよい場所に置いていただくのが長持ちの秘訣です。",
  },
  {
    number: "03",
    emoji: "✨",
    title: "使えば使うほど、自分だけの色になる",
    description:
      "持ち手のヌメ革は使うほどにアメ色へと変化していきます。それがヴィンテージの最大の魅力。世界に1つだけの「自分だけのヴィトン」に育てていく楽しさをぜひ味わってください。",
  },
]

export function CareSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".care-item")
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add("animate-fade-in-up")
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
    <section ref={sectionRef} className="relative bg-transparent py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-white/70 px-4 py-1.5 text-xs font-bold tracking-widest text-gray-500 backdrop-blur-sm">
            CARE
          </span>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
            お手入れ、全然難しくない。
            <br />
            3つだけ覚えておけばOK。
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {careSteps.map((step, index) => (
            <div key={index} className="care-item group opacity-0">
              <div className="relative h-full rounded-2xl bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 text-4xl">{step.emoji}</div>
                <div className="mb-1 text-xs font-black text-gray-300">{step.number}</div>
                <h3 className="mb-3 text-base font-black leading-snug text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
