"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "写真の商品がそのまま届くの？",
    answer:
      "はい、すべてRevival.tokyoで1点ずつ撮影した現物の写真です。使い回しのサンプル画像やカタログ写真は一切使用しておりません。届いた商品が「思っていたものと違う」ということがないよう、徹底してお伝えしています。",
  },
  {
    question: "フリマで買うのと何が違うの？",
    answer:
      "最大の違いは「本物かどうかの保証」です。フリマアプリは個人間取引のため、偽物が混在するリスクが非常に高い状態です。Revivalではプロの鑑定士が100%本物と確認したものだけを販売しておりますので、安心してお選びいただけます。",
  },
  {
    question: "買ってから「服に合わなかった」ときは返品できる？",
    answer:
      "ヴィンテージ・リユース品という性質上、お客様都合によるご返品はお受けしておりません。だからこそ、ご購入前にどんな些細なことでもお気軽にご質問ください。納得した上でのお買い物を何より大切にしています。",
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
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-white/50 py-24 md:py-32 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full bg-gray-100 px-4 py-1.5 text-xs font-bold tracking-widest text-gray-500">
            FAQ
          </span>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground md:text-4xl">
            よくある質問
          </h2>
        </div>

        <div className="faq-content space-y-3 opacity-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                openIndex === index ? "border-black bg-white shadow-md" : "border-gray-100 bg-white/60 hover:border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-start justify-between p-6 text-left"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg font-black text-black">Q.</span>
                  <span className="pt-0.5 font-bold leading-relaxed text-foreground">{faq.question}</span>
                </div>
                <ChevronDown
                  className={`ml-4 mt-0.5 h-5 w-5 flex-shrink-0 text-black transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div className={`grid transition-all duration-300 ${openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="border-t border-gray-100 px-6 pb-6 pt-4">
                    <div className="flex items-start gap-3">
                      <span className="text-base font-black text-gray-300">A.</span>
                      <p className="pt-0.5 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
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
