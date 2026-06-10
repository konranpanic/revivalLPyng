"use client"

import { useEffect, useRef } from "react"

const careSteps = [
  {
    number: "01",
    title: "普段のお手入れは、使用後にサッと「乾拭き」で完璧",
    description:
      "モノグラムのキャンバス部分は高級なPVC素材ですので、お出かけから帰ってきたら、柔らかい布で表面のホコリを優しく拭き取るだけでお手入れは完了です。手汗や雨のしずくがついた場合は、放置せずすぐに乾いた布で拭き取ることが大切です。",
    highlight: "乾拭き",
  },
  {
    number: "02",
    title: "バッグを守る一番の秘訣は「風通しの良い日陰」",
    description:
      "購入した時の箱に入れたまま押し入れの奥深くに長期間しまい込んでしまうと、湿気がこもり、内側のベタつきやカビの原因になってしまいます。保管する際は、付属の通気性の良い不織布の保存袋に入れ、風通しの良い場所に置いてあげるのが長持ちさせる最大のコツです。",
    highlight: "風通しの良い日陰",
  },
  {
    number: "03",
    title: "時間とともに変化する、ヌメ革の美しいエイジングを楽しむ",
    description:
      "バッグの持ち手や底面に使用されている「ヌメ革」は、使えば使うほど、太陽の光や空気、手の油分を吸収し、味わい深い「アメ色」へと変化していきます。あなたと一緒に時を重ね、世界に一つだけの風合いに育てる楽しさを、ぜひ味わってください。",
    highlight: "美しいエイジングを楽しむ",
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative border-b border-border/50 bg-background/0 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-serif text-xs tracking-[0.4em] text-primary">
            LONG USE CARE
          </span>
          <h2 className="font-serif text-2xl font-light leading-relaxed tracking-wide text-foreground md:text-3xl">
            はじめてでも全く難しくない、
            <br className="md:hidden" />
            ヴィトンの正しいお手入れ方法
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {careSteps.map((step, index) => (
            <div key={index} className="care-item group opacity-0">
              <div className="relative h-full border border-border/50 bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:bg-secondary/20">
                {/* Number */}
                <div className="mb-6 font-serif text-5xl font-light text-primary/20">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="mb-4 border-b border-primary/20 pb-4 font-serif text-base font-medium leading-relaxed text-foreground">
                  {step.title.split(step.highlight).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="gold-gradient-text font-semibold">
                          {step.highlight}
                        </span>
                      )}
                    </span>
                  ))}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>

                {/* Corner Decoration */}
                <div className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-primary/20 transition-all duration-300 group-hover:h-12 group-hover:w-12 group-hover:border-primary/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
