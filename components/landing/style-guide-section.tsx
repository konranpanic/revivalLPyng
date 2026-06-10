"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const styles = [
  {
    image: "/style/style-office.jpg", // ご自身の画像パスに変更してください
    number: "01",
    title: "上品で信頼感を醸し出す「オフィスカジュアル」",
    description: "毎日の通勤スタイル、カチッとしたトレンチコートやテーラードジャケットのスタイルに、この「アルマ」を片手で持つだけで、全体の見栄えがガラリと変わります。お仕事のシーンで大切な「清潔感」と「信頼感」を、バッグ1つで周囲にさりげなくアピール。",
  },
  {
    image: "/style/style-casual.jpg",
    number: "02",
    title: "大人のこなれ感を演出する「休日のきれいめデニム」",
    description: "ハイブランドだからといって、ドレスアップした格好だけに合わせる必要はありません。実は、ラフなデニムスタイルやシンプルな白Tシャツといったカジュアルな服装に合わせるのこそが、今っぽくて非常にお洒落です。モノグラムの上品さがカジュアルさを程よく引き締めます。",
  },
  {
    image: "/style/style-dinner.jpg",
    number: "03",
    title: "格式高い場所でも気後れしない「特別な日のディナー」",
    description: "もちろん、ホテルでのランチ会や記念日のディナー、結婚式の二次会、お子様の入卒園式など、フォーマルな席でも主役級の存在感を発揮します。「このバッグさえ持っていけば間違いない」という絶対的な安心感が手に入ります。",
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative border-b border-border/50 bg-transparent py-24 md:py-32" // bg-transparentに変更
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-serif text-xs tracking-[0.4em] text-primary">
            STYLE GUIDE
          </span>
          <h2 className="font-serif text-2xl font-light leading-relaxed tracking-wide text-foreground md:text-3xl">
            日常のあらゆる瞬間を格上げする、
            <br className="md:hidden" />
            あなただけの一生モノ
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {styles.map((style, index) => (
            <div key={index} className="style-card group opacity-0">
              <div className="relative h-full overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-500 hover:border-primary/30">
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={style.image}
                    alt={style.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-3 border-l-2 border-primary/50 pl-4">
                    <span className="font-serif text-2xl font-light text-primary/30">{style.number}</span>
                    <h3 className="font-serif text-base font-medium leading-relaxed text-foreground">
                      {style.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {style.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
