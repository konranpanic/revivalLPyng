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
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background py-32 md:py-40">
      <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gray-100 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-gray-100 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="content text-center opacity-0">
          <span className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-bold tracking-widest text-gray-500">
            OUR STORY
          </span>

          <h2 className="mb-12 text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
            ヴィンテージって、
            <br />
            実はいちばんおしゃれ。
          </h2>

          <div className="space-y-6 text-left">
            <p className="text-base leading-loose text-muted-foreground">
              みんなが同じ新品を買ってる時代に、ヴィンテージを持つのって実はすごくクールだと思う。
              170年以上愛されてきたヴィトンは、時間が経てば経つほど味が出てくる。
              それって、ファストファッションには絶対に出せない価値。
            </p>
            <p className="text-base leading-loose text-muted-foreground">
              前のオーナーが大切に使ってきた
              <span className="font-bold text-foreground">「歴史と物語」</span>
              を受け継いで、あなたの毎日に溶け込ませてほしい。
              それがRevivalのやりたいこと。
            </p>
          </div>

          <div className="mt-16 rounded-2xl border border-gray-100 bg-white/60 p-8 text-left backdrop-blur-sm">
            <p className="text-xl font-black italic text-gray-900">
              "真の贅沢とは、時を超えて愛され続けるもの"
            </p>
            <p className="mt-3 text-xs tracking-wider text-gray-400">— REVIVAL.TOKYO</p>
          </div>
        </div>
      </div>
    </section>
  )
}
