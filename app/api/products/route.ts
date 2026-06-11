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

// ── IDリストのインメモリキャッシュ ──────────────────────────
// Vercelのサーバーレス関数はコールドスタート時にリセットされるが、
// ウォーム状態では保持される。最初のアクセスだけ少し遅くなる。
let cachedIds: number[] = []
let lastFetchedAt = 0
const CACHE_TTL = 60 * 60 * 1000 // 1時間

// 既知のヴィトン商品ID（コールドスタート時のフォールバック）
const FALLBACK_IDS = [171, 178]

// バックグラウンドでIDリストを更新（ユーザーを待たせない）
async function refreshIdsInBackground() {
  const now = Date.now()
  if (now - lastFetchedAt < CACHE_TTL) return // まだ新鮮なら何もしない

  // 非同期で更新（awaitしない）
  fetchVuittonIds().then((ids) => {
    if (ids.length > 0) {
      cachedIds = ids
      lastFetchedAt = Date.now()
    }
  }).catch(console.error)
}

async function fetchVuittonIds(): Promise<number[]> {
  const ids: number[] = []

  for (let page = 1; page <= 10; page++) {
    const url = `https://revival.tokyo/products/list?category_id=7&orderby=2&pageno=${page}`
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } })
    if (!res.ok) break

    const html = await res.text()

    // SOLD OUTのIDを収集
    const soldOutIds = new Set<number>()
    const soldOutRegex = /products\/detail\/(\d+)[^\n]*\n[\s\S]{0,200}?品切れ/g
    let soMatch
    while ((soMatch = soldOutRegex.exec(html)) !== null) {
      soldOutIds.add(parseInt(soMatch[1], 10))
    }

    // <li>ブロック単位でヴィトン商品を判定
    const blockRegex = /<li[^>]*>([\s\S]*?)<\/li>/g
    let blockMatch
    while ((blockMatch = blockRegex.exec(html)) !== null) {
      const block = blockMatch[1]
      const idMatch = block.match(/products\/detail\/(\d+)/)
      if (!idMatch) continue
      const id = parseInt(idMatch[1], 10)

      const isVuitton =
        block.includes("ルイヴィトン") ||
        block.includes("LOUIS VUITTON") ||
        block.includes("Louis Vuitton") ||
        block.includes("LV ") ||
        block.includes("LVモノグラム")

      if (isVuitton && !soldOutIds.has(id)) ids.push(id)
    }

    if (!html.includes(`pageno=${page + 1}`)) break
  }

  return [...new Set(ids)]
}

async function fetchProductDetail(id: number): Promise<Product | null> {
  const url = `https://revival.tokyo/products/detail/${id}`
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
    cache: "no-store",
  })
  if (!res.ok) return null

  const html = await res.text()

  const nameMatch =
    html.match(/property="og:title"\s+content="([^"]+)"/) ??
    html.match(/content="([^"]+)"\s+property="og:title"/)
  const name = nameMatch?.[1]?.replace(" | REVIVAL", "").trim() ?? "ルイ・ヴィトン"

  const priceMatch =
    html.match(/property="product:price:amount"\s+content="([^"]+)"/) ??
    html.match(/content="([^"]+)"\s+property="product:price:amount"/)
  const priceNum = parseInt(priceMatch?.[1] ?? "0", 10)
  const price = priceNum ? `¥${priceNum.toLocaleString()}` : "価格未定"

  // 生HTMLから画像URL収集
  const imgRegex = /src="(https:\/\/revival\.tokyo\/html\/upload\/save_image\/[^"]+\.jpeg)"/g
  const allUrls: string[] = []
  let imgMatch
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    allUrls.push(imgMatch[1])
  }
  const uniqueUrls = [...new Set(allUrls)]
  const mainCount = Math.ceil(uniqueUrls.length / 2)
  const images = uniqueUrls.slice(0, mainCount).slice(0, 4)

  if (images.length === 0) {
    const ogImg =
      html.match(/property="og:image"\s+content="([^"]+)"/) ??
      html.match(/content="([^"]+)"\s+property="og:image"/)
    if (ogImg?.[1]) images.push(ogImg[1])
  }

  const codeMatch = html.match(/商品コード[：:]\s*([A-Z])[-\d]/)
  const condition = codeMatch?.[1] ?? "A"

  return { id, name, price, priceNum, images, condition, url }
}

export async function GET() {
  try {
    // バックグラウンドでIDリスト更新（ユーザーを待たせない）
    refreshIdsInBackground()

    // キャッシュがあればそれを使う、なければFALLBACK_IDS
    const ids = cachedIds.length > 0 ? cachedIds : FALLBACK_IDS
    const randomId = ids[Math.floor(Math.random() * ids.length)]

    // 詳細取得（1回のfetchのみ）
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
