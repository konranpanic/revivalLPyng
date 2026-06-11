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

// ブランドカテゴリの全ページからヴィトン商品IDを自動収集
async function fetchVuittonProductIds(): Promise<number[]> {
  const ids: number[] = []
  let page = 1

  while (true) {
    const url = `https://revival.tokyo/products/list?category_id=7&orderby=2&pageno=${page}`
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RevivalLP/1.0)" },
      next: { revalidate: 3600 }, // 1時間キャッシュ
    })
    if (!res.ok) break

    const html = await res.text()

    // ヴィトン・ルイヴィトン商品のみ抽出（SOLD OUTは除外）
    // 商品ブロックを取得して「SOLD OUT」が含まれないものだけ対象にする
    // li要素ごとに分割して判断
    const productBlocks = html.split(/(?=- \[)/)
    for (const block of productBlocks) {
      if (
        (block.includes("ルイヴィトン") ||
          block.includes("LOUIS VUITTON") ||
          block.includes("LV ") ||
          block.includes("LV モノグラム") ||
          block.includes("LVモノグラム")) &&
        !block.includes("SOLD OUT") &&
        !block.includes("品切れ")
      ) {
        const idMatch = block.match(/products\/detail\/(\d+)/)
        if (idMatch) {
          ids.push(parseInt(idMatch[1], 10))
        }
      }
    }

    // 次のページがなければ終了
    if (!html.includes(`pageno=${page + 1}`)) break
    page++
    if (page > 10) break // 安全のため最大10ページ
  }

  return [...new Set(ids)] // 重複除去
}

// 商品詳細ページをスクレイピング
async function fetchProductDetail(id: number): Promise<Product | null> {
  const url = `https://revival.tokyo/products/detail/${id}`
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; RevivalLP/1.0)" },
    next: { revalidate: 3600 },
  })
  if (!res.ok) return null

  const html = await res.text()

  // 商品名
  const titleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/)
  const name = titleMatch?.[1]?.replace(" | REVIVAL", "").trim() ?? "ルイ・ヴィトン"

  // 価格
  const priceMatch = html.match(/<meta[^>]*property="product:price:amount"[^>]*content="([^"]+)"/)
  const priceNum = parseInt(priceMatch?.[1] ?? "0", 10)
  const price = priceNum ? `¥${priceNum.toLocaleString()}` : "価格未定"

  // 画像URL（メイン画像のみ・最大4枚）
  // save_imageのJPEGを全取得してユニーク化
  const allImageMatches = [...html.matchAll(/https:\/\/revival\.tokyo\/html\/upload\/save_image\/[^"'\s)]+\.jpeg/g)]
  const allImages = [...new Set(allImageMatches.map((m) => m[0]))]
  // ページ内に同じ画像が2回出てくる（メイン+サムネ）ので前半だけ使う
  const images = allImages.slice(0, Math.ceil(allImages.length / 2)).slice(0, 4)

  // コンディション
  const conditionMatch = html.match(/>\s*([A-Z])\s*<\/span>\s*[\s\S]{0,50}?<strong>/)
    ?? html.match(/商品コード：\s*([A-Z])[-\d]/)
  const condition = conditionMatch?.[1] ?? "A"

  return { id, name, price, priceNum, images, condition, url }
}

export async function GET() {
  try {
    // ヴィトン商品IDを自動収集
    const ids = await fetchVuittonProductIds()

    if (ids.length === 0) {
      // フォールバック：既知のIDを使用
      ids.push(171)
    }

    // ランダムで1件選んで詳細取得
    const randomId = ids[Math.floor(Math.random() * ids.length)]
    const product = await fetchProductDetail(randomId)

    if (!product) throw new Error("Failed to fetch product detail")

    return NextResponse.json(product)
  } catch (error) {
    console.error("Product fetch error:", error)
    // フォールバック
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
