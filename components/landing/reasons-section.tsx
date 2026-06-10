"use client"

import { useEffect, useRef } from "react"
import { Award, ShieldCheck } from "lucide-react"

const reasons = [
  {
    number: "01",
    icon: Award,
    tag: "鑑定済み",
    title: "プロが全品チェック済み。偽物ゼロ。",
    description:
      "シリアルナンバーの位置、縫製の細かさ、金具の刻印まで、プロの鑑定士が何重にもチェック。「100%本物」しか売りません。フリマとはここが違う。",
  },
  {
    number: "02",
    icon: ShieldCheck,
    tag: "本物保証",
    title: "万が一でも全額返金。だから安心して買える。",
    description:
      "本物保証に絶対の自信があるから「全額返金保証」をつけてる。もし万が一にでもコピー品だったら、いつでも全額返金。そのくらい自信があるってこと。",
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
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-gray-50 py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-gray-200 px-4 py-1.5 text-xs font-bold tracking-widest text-gray-500">
            WHY REVIVAL
          </span>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
            Revivalが選ばれる
            <br />
            2つの理由
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card opacity-0">
              <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="absolute right-6 top-6 font-black text-7xl text-gray-50">
                  {reason.number}
                </div>

                <span className="mb-4 inline-block rounded-full bg-black px-3 py-1 text-[10px] font-bold tracking-wider text-white">
                  {reason.tag}
                </span>

                <div className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50">
                  <reason.icon className="h-6 w-6 text-black" />
                </div>

                <h3 className="relative z-10 mb-3 text-lg font-black leading-snug text-foreground">
                  {reason.title}
                </h3>
                <p className="relative z-10 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
