"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const styles = [
  {
    image: "/style/style-office.jpg",
    tag: "仕事でも",
    title: "オフィスカジュアルに合わせて、デキる人オーラ",
    description: "トレンチコートやジャケットスタイルに合わせるだけで、清潔感と信頼感を自然に演出できます。職場でさりげなく差をつけたい方にぴったりの使い方です。",
  },
  {
    image: "/style/style-casual.jpg",
    tag: "普段使いに",
    title: "デニム＋白T。それだけでおしゃれになれる",
    description: "ハイブランドだからといって、フォーマルな場面だけに限る必要はありません。カジュアルなデニムスタイルに合わせるのが、今いちばんおしゃれな持ち方です。",
  },
  {
    image: "/style/style-dinner.jpg",
    tag: "特別な日も",
    title: "ディナーも二次会も、これ1個で全部いける",
    description: "記念日のディナーや結婚式の二次会など、フォーマルな席でもしっかり存在感を発揮します。「これを持っていけば間違いない」という安心感が手に入ります。",
  },
]

export function StyleGuideSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".style-card")
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
    <section ref={sectionRef} className="relative bg-white/50 py-24 md:py-32 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-bold tracking-widest text-gray-500">
            STYLE GUIDE
          </span>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
            どんなコーデにも合う。
            <br />
            それがヴィンテージヴィトンの強み。
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {styles.map((style, index) => (
            <div key={index} className="style-card group opacity-0">
              <div className="relative h-full overflow-hidden rounded-2xl bg-gray-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={style.image}
                    alt={style.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-black">
                    {style.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-base font-black leading-snug text-foreground">{style.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{style.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
