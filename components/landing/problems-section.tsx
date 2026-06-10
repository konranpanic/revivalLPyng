"use client"

import { AlertCircle, Target, Search } from "lucide-react"

const problems = [
  {
    title: "インターネットでの高額な購入は、本当に本物かどうか不安...",
    description: "フリマアプリや安価なECサイトが増えた現代だからこそ、「もし偽物だったらどうしよう」「騙されたら取り返しが出ない」と、一歩を踏み出せない方が非常に増えています。",
    icon: AlertCircle,
  },
  {
    title: "たくさん種類がありすぎてどれを選べば失敗しない？",
    description: "せっかく大きな買い物をするのだから、一時の流行で終わるものではなく、何年、何十年経っても色褪せない、自分の年齢に寄り添ってくれる「本当に価値のある定番」を知りたい。",
    icon: Target,
  },
  {
    title: "中古品やリユース品だと、傷や汚れの状態が分かりにくい",
    description: "「届いてみたら想像以上に使い込まれていた…」なんて失敗は絶対に避けたいもの。言葉だけの「美品」ではなく、細かいディテールまで納得のいく買い物をしたい。",
    icon: Search,
  },
]

export function ProblemsSection() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* 画像エリア */}
        <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl">
          <img 
            src="/problem-woman.jpg" 
            alt="ブランド選びの不安" 
            className="h-full w-full object-cover"
          />
        </div>

        {/* テキストエリア */}
        <div className="flex flex-col gap-10">
          <h2 className="text-3xl font-serif font-light text-foreground">
            はじめてのハイブランド選び、<br />
            こんなお悩みや不安はありませんか？
          </h2>

          <div className="grid gap-8">
            {problems.map((problem, index) => {
              const Icon = problem.icon
              return (
                <div key={index} className="flex gap-4">
                  <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">{problem.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <a
            href="https://revival.tokyo/search?q=ルイヴィトン"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-serif tracking-widest hover:underline"
          >
            ルイ・ヴィトン一覧で探してみる →
          </a>
        </div>
      </div>
    </section>
  )
}
