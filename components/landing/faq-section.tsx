"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "掲載されている写真は、すべてお届けされる現物の写真ですか？",
    answer:
      "はい、すべてRevival.tokyoで1点ずつスタジオ撮影した【お届けする現物そのもの】の写真です。使い回しのサンプル画像やカタログ写真は一切使用しておりません。",
  },
  {
    question: "フリマアプリ等で売られているものと、何が違うのですか？",
    answer:
      "最も大きな違いは「真贋（本物であるか）の保証」と「管理状態」です。個人間取引では偽物が混入するリスクが非常に高く、保存状態もバラバラですが、Revival.tokyoではプロの鑑定士が100%本物と鑑定した商品のみを扱い、厳重に管理しております。",
  },
  {
    question: "万が一、届いた後に自分の服に合わないなと思ったら返品は可能ですか？",
    answer:
      "一点物のヴィンテージ・リユース品という特性上、およびすり替え詐欺防止の観点から、お客様都合による返品・交換はお受けしておりません。そのため、気になる点や細部の状態はご購入前に何度でもお気軽にお問い合わせいただき、100%ご納得の上でのご購入をお願いしております。",
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelector(".faq-content")?.classList.add("animate-fade-in-up")
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
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-serif text-xs tracking-[0.4em] text-primary">
            FAQ
          </span>
          <h2 className="font-serif text-2xl font-light tracking-wide text-foreground md:text-3xl">
            はじめて購入される方からの「よくある質問」
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        <div className="faq-content space-y-4 opacity-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`overflow-hidden border transition-all duration-300 ${
                openIndex === index
                  ? "border-primary/30 bg-background"
                  : "border-border/50 bg-transparent hover:border-primary/20"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-start justify-between p-6 text-left"
              >
                <div className="flex items-start gap-4">
                  <span className="font-serif text-2xl font-semibold text-primary">Q</span>
                  <span className="pt-1 font-medium leading-relaxed text-foreground">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`ml-4 mt-1 h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ${
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-border/30 px-6 pb-6 pt-4">
                    <div className="flex items-start gap-4">
                      <span className="font-serif text-xl font-semibold text-muted-foreground">A</span>
                      <p className="pt-0.5 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
