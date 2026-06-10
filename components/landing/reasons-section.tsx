"use client"

import { useEffect, useRef } from "react"
import { Award, ShieldCheck } from "lucide-react"

const reasons = [
  {
    number: "01",
    icon: Award,
    title: "プロの熟練鑑定士による「厳重な真贋チェック」をクリア済",
    description:
      "業界トップクラスの経験を持つプロの専任鑑定士がすべての商品を管理しています。シリアルナンバーの打刻位置やフォント、細部の縫製、金具の刻印の深さに至るまで、何重もの厳しい検品基準をクリアした【100%正規品・本物】のアイテムのみを自信を持って展示しております。",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "鑑定のクオリティに自信があるからこそ安心の「100%本物保証」",
    description:
      "私たちは、お届けする商品の真贋について絶対の自信を持っております。そのため、Revival.tokyoでは万が一のセーフティネットとして「100%本物保証」を明記。万が一にも規定外（コピー品）と判断された場合には、購入からの期間を問わず、いつでも速やかに全額返金対応をさせていただきます。",
  },
]

export function ReasonsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".reason-card")
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
      className="relative border-b border-border/50 bg-card py-24 md:py-32"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary)_1px,_transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-serif text-xs tracking-[0.4em] text-primary">
            WHY CHOOSE US
          </span>
          <h2 className="font-serif text-2xl font-light leading-relaxed tracking-wide text-foreground md:text-3xl">
            お客様に選ばれ続ける、
            <br className="md:hidden" />
            Revival.tokyoの「信頼」と「約束」
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card opacity-0">
              <div className="group relative h-full overflow-hidden bg-background p-10 transition-all duration-500">
                {/* Top Border */}
                <div className="absolute left-0 top-0 h-0.5 w-full bg-gradient-to-r from-primary via-primary/70 to-primary/30" />

                {/* Large Number Background */}
                <div className="absolute -right-4 -top-4 font-serif text-[120px] font-bold leading-none text-primary/5">
                  {reason.number}
                </div>

                {/* Icon */}
                <div className="relative z-10 mb-6 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center border border-primary/30 bg-primary/5">
                    <reason.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="font-serif text-3xl font-light text-primary/30">
                    {reason.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="relative z-10 mb-4 font-serif text-lg font-medium leading-relaxed text-foreground">
                  {reason.title}
                </h3>
                <p className="relative z-10 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>

                {/* Corner Accent */}
                <div className="absolute bottom-0 right-0 h-16 w-16 border-b-2 border-r-2 border-primary/20 transition-all duration-300 group-hover:border-primary/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
