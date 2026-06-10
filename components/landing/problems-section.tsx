"use client"
import { AlertCircle, Target, Search } from "lucide-react"

const problems = [
  {
    title: "フリマで買ったら偽物だった、なんてシャレにならない",
    description: "フリマアプリでの購入は偽物が混在するリスクが非常に高く、「本物かどうか」という不安を抱えたまま使い続けるのは、せっかくの買い物がもったいないですよね。",
    icon: AlertCircle,
  },
  {
    title: "種類が多すぎて、何を買えばいいかわからない",
    description: "ルイ・ヴィトンには非常に多くのモデルがあり、「長く使えるものを選びたい」「後悔したくない」とお考えの方ほど、選択肢の多さに迷ってしまいます。",
    icon: Target,
  },
  {
    title: "写真と実物が違う、なんてことになりたくない",
    description: "「思ったより傷が多かった」「においが気になった」といったレビューを見るたびに、ネット購入への不安が増してしまう。そのお気持ち、よくわかります。",
    icon: Search,
  },
]

export function ProblemsSection() {
  return (
    <section className="bg-transparent py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-16 items-center">

        <div className="relative h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl">
          <img
            src="/problem-woman.jpg"
            alt="ブランド選びの不安"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <span className="mb-3 inline-block rounded-full bg-white/70 px-4 py-1 text-xs font-bold tracking-widest text-gray-500 backdrop-blur-sm">
              あるある？
            </span>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-foreground">
              こんな不安、
              <br />
              感じてない？
            </h2>
          </div>

          <div className="grid gap-6">
            {problems.map((problem, index) => {
              const Icon = problem.icon
              return (
                <div key={index} className="flex gap-4 rounded-2xl border border-gray-100 bg-white/70 p-5 shadow-sm backdrop-blur-sm">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground mb-1">{problem.title}</h3>
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
            className="inline-flex items-center gap-2 rounded-full border border-black bg-transparent px-6 py-3 text-sm font-bold text-black transition-all hover:bg-black hover:text-white w-fit"
          >
            ヴィトン一覧を見る →
          </a>
        </div>
      </div>
    </section>
  )
}
