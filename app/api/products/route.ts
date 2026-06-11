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
      cache: "no-store", // キャッシュしない→毎回最新を取得
    })
    if (!res.ok) break

    const html = await res.text()

    // 商品ブロックをリンク単位で分割して判定
    // 形式: /products/detail/XXX のリンクが含まれる行を探す
    const lines = html.split("\n")
    let currentBlock = ""

    for (const line of lines) {
      currentBlock += line + "\n"

      // products/detailのリンクを見つけたらチェック
      if (line.includes("/products/detail/")) {
        const isVuitton =
          currentBlock.includes("ルイヴィトン") ||
          currentBlock.includes("LOUIS VUITTON") ||
          currentBlock.includes("Louis Vuitton") ||
          currentBlock.includes("LV ") ||
          currentBlock.includes("LVモノグラム") ||
          currentBlock.includes("LV モノグラム")

        const isSoldOut =
          currentBlock.includes("SOLD OUT") ||
          currentBlock.includes("品切れ")

        if (isVuitton && !isSoldOut) {
          const idMatch = line.match(/products\/detail\/(\d+)/)
          if (idMatch) {
            ids.push(parseInt(idMatch[1], 10))
          }
        }
        currentBlock = "" // リセット
      }
    }

    // 次ページがなければ終了
    if (!html.includes(`pageno=${page + 1}`)) break
    page++
    if (page > 10) break
  }

  return [...new Set(ids)]
}

// 商品詳細ページをスクレイピング
async function fetchProductDetail(id: number): Promise<Product | null> {
  const url = `https://revival.tokyo/products/detail/${id}`
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; RevivalLP/1.0)" },
    cache: "no-store",
  })
  if (!res.ok) return null

  const html = await res.text()

  // --- 商品名 (og:titleから) ---
  const titleMatch = html.match(/property="og:title"\s+content="([^"]+)"/)
    ?? html.match(/content="([^"]+)"\s+property="og:title"/)
  const name = titleMatch?.[1]?.replace(" | REVIVAL", "").trim() ?? "ルイ・ヴィトン"

  // --- 価格 (product:price:amountから) ---
  const priceMatch = html.match(/property="product:price:amount"\s+content="([^"]+)"/)
    ?? html.match(/content="([^"]+)"\s+property="product:price:amount"/)
  const priceNum = parseInt(priceMatch?.[1] ?? "0", 10)
  const price = priceNum ? `¥${priceNum.toLocaleString()}` : "価格未定"

  // --- 画像URL (imgタグのsrcから直接取得) ---
  // パターン: <img ... src="https://revival.tokyo/html/upload/save_image/XXXXX.jpeg" ...>
  // ただしサムネイルは alt に「サムネイル」が含まれるので除外
  const imgRegex = /<img[^>]+src="(https:\/\/revival\.tokyo\/html\/upload\/save_image\/[^"]+\.jpeg)"[^>]*alt="([^"]*)"[^>]*>/g
  const images: string[] = []
  let imgMatch
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    const src = imgMatch[1]
    const alt = imgMatch[2]
    // サムネイルを除外、メイン画像のみ（最大4枚）
    if (!alt.includes("サムネイル") && images.length < 4) {
      images.push(src)
    }
  }

  // --- コンディション ---
  // 形式: <span ...>A</span> の直後に <strong>美品</strong> が来る
  const condMatch = html.match(/お気に入りに追加[\s\S]{0,200}?>\s*([A-Z])\s*<\//)
  const condition = condMatch?.[1] ?? "A"

  return { id, name, price, priceNum, images, condition, url }
}

export async function GET() {
  try {
    const ids = await fetchVuittonProductIds()

    if (ids.length === 0) {
      ids.push(171, 178) // フォールバック用の既知ID
    }

    // ランダムで1件選ぶ（毎回キャッシュなしなので毎アクセスで変わる）
    const randomId = ids[Math.floor(Math.random() * ids.length)]
    const product = await fetchProductDetail(randomId)

    if (!product) throw new Error("Failed to fetch product detail")

    return NextResponse.json(product)
  } catch (error) {
    console.error("Product fetch error:", error)
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
