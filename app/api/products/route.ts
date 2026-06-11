import { NextResponse } from "next/server"

export interface Product {
  id: number
  name: string
  price: string
  priceNum: number
  images: string[]
  condition: string
  url: string
}

// ヴィトン商品IDリストを取得（1時間キャッシュ）
async function fetchVuittonIds(): Promise<number[]> {
  const ids: number[] = []

  for (let page = 1; page <= 10; page++) {
    const url = `https://revival.tokyo/products/list?category_id=7&orderby=2&pageno=${page}`
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 3600 }, // IDリストは1時間キャッシュ
    })
    if (!res.ok) break

    const html = await res.text()

    // リスト行のパターン:
    // - [A 【美品】ルイヴィトン xxx ￥180,000](https://revival.tokyo/products/detail/171)
    // SOLD OUTの場合は直後の行に "SOLD OUT" が来る
    // → 1行で完結するリンク行を正規表現で処理
    const lineRegex = /\[([^\]]+)\]\(https:\/\/revival\.tokyo\/products\/detail\/(\d+)\)/g
    let match
    const soldOutIds = new Set<number>()

    // まずSOLD OUTのIDを収集
    const soldOutRegex = /products\/detail\/(\d+)[^\n]*\n[\s\S]{0,100}?SOLD OUT/g
    let soMatch
    while ((soMatch = soldOutRegex.exec(html)) !== null) {
      soldOutIds.add(parseInt(soMatch[1], 10))
    }

    // ヴィトン商品のIDを収集
    while ((match = lineRegex.exec(html)) !== null) {
      const title = match[1]
      const id = parseInt(match[2], 10)

      const isVuitton =
        title.includes("ルイヴィトン") ||
        title.includes("LOUIS VUITTON") ||
        title.includes("Louis Vuitton") ||
        /LV\s/.test(title) ||
        title.includes("LVモノグラム")

      if (isVuitton && !soldOutIds.has(id)) {
        ids.push(id)
      }
    }

    // 次ページがなければ終了
    if (!html.includes(`pageno=${page + 1}`)) break
  }

  return [...new Set(ids)]
}

// 商品詳細を取得
async function fetchProductDetail(id: number): Promise<Product | null> {
  const url = `https://revival.tokyo/products/detail/${id}`
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    cache: "no-store",
  })
  if (!res.ok) return null

  const html = await res.text()

  // 商品名（og:title）
  const nameMatch = html.match(/property="og:title"\s+content="([^"]+)"/)
    ?? html.match(/content="([^"]+)"\s+property="og:title"/)
  const name = nameMatch?.[1]?.replace(" | REVIVAL", "").trim() ?? "ルイ・ヴィトン"

  // 価格
  const priceMatch = html.match(/property="product:price:amount"\s+content="([^"]+)"/)
    ?? html.match(/content="([^"]+)"\s+property="product:price:amount"/)
  const priceNum = parseInt(priceMatch?.[1] ?? "0", 10)
  const price = priceNum ? `¥${priceNum.toLocaleString()}` : "価格未定"

  // 画像（og:imageと追加画像を収集）
  // og:imageがメイン1枚目
  const ogImageMatch = html.match(/property="og:image"\s+content="([^"]+)"/)
    ?? html.match(/content="([^"]+)"\s+property="og:image"/)
  const ogImage = ogImageMatch?.[1] ?? ""

  // save_image URLを全収集（markdownの ![alt](url) 形式で返ってくる）
  const mdImageRegex = /!\[[^\]]*\]\((https:\/\/revival\.tokyo\/html\/upload\/save_image\/[^)]+\.jpeg)\)/g
  const allImages: string[] = []
  let imgMatch
  while ((imgMatch = mdImageRegex.exec(html)) !== null) {
    allImages.push(imgMatch[1])
  }

  // ユニーク化
  const uniqueImages = [...new Set(allImages)]

  // メイン画像（サムネイルを除く）: 同URLが2回出るのでSetで重複除去済み
  // ページ内の画像総数の前半がメイン、後半がサムネ → 前半だけ使う
  const mainImages = uniqueImages.slice(0, Math.ceil(uniqueImages.length / 2))

  // 最終的な画像リスト（最大4枚）
  const images = mainImages.length > 0
    ? mainImages.slice(0, 4)
    : ogImage ? [ogImage] : []

  // コンディション（商品コード "A-XXX-X" から取得）
  const codeMatch = html.match(/商品コード[：:]\s*([A-Z])[-\d]/)
  const condition = codeMatch?.[1] ?? "A"

  return { id, name, price, priceNum, images, condition, url }
}

export async function GET() {
  try {
    const ids = await fetchVuittonIds()
    const targetIds = ids.length > 0 ? ids : [171, 178]

    // ランダム1件
    const randomId = targetIds[Math.floor(Math.random() * targetIds.length)]
    const product = await fetchProductDetail(randomId)

    if (!product) throw new Error("fetch failed")

    return NextResponse.json(product)
  } catch (e) {
    console.error(e)
    return NextResponse.json({
      id: 171,
      name: "【美品】ルイヴィトン TROTTEUR ショルダーバッグ",
      price: "¥180,000",
      priceNum: 180000,
      images: [
        "https://revival.tokyo/html/upload/save_image/0528155927_6a17e7cfc766b.jpeg",
        "https://revival.tokyo/html/upload/save_image/0528155927_6a17e7cfe0bf3.jpeg",
        "https://revival.tokyo/html/upload/save_image/0528155931_6a17e7d335d7e.jpeg",
        "https://revival.tokyo/html/upload/save_image/0528155931_6a17e7d346f12.jpeg",
      ],
      condition: "A",
      url: "https://revival.tokyo/products/detail/171",
    } as Product)
  }
}
