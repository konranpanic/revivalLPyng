import { NextResponse } from "next/server"

// revival.tokyoのルイヴィトン商品IDリスト
// 新商品が入ったらここに追加するだけでOK
const VUITTON_PRODUCT_IDS = [171]

export interface Product {
  id: number
  name: string
  price: string
  priceNum: number
  images: string[]
  description: string
  condition: string
  url: string
}

export async function GET() {
  try {
    // ランダムで1件選ぶ
    const randomId =
      VUITTON_PRODUCT_IDS[Math.floor(Math.random() * VUITTON_PRODUCT_IDS.length)]

    const url = `https://revival.tokyo/products/detail/${randomId}`
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; RevivalLP/1.0)",
      },
      next: { revalidate: 3600 }, // 1時間キャッシュ
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`)
    }

    const html = await res.text()

    // 商品名を取得（og:titleから）
    const titleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/)
    const rawName = titleMatch?.[1]?.replace(" | REVIVAL", "").trim() ?? "ルイ・ヴィトン"

    // 価格を取得（og:price:amountから）
    const priceMatch = html.match(/<meta[^>]*property="product:price:amount"[^>]*content="([^"]+)"/)
    const priceNum = parseInt(priceMatch?.[1] ?? "0", 10)
    const price = priceNum ? `¥${priceNum.toLocaleString()}` : "価格未定"

    // 画像URLを取得（save_imageのJPEGを全取得）
    const imageMatches = html.matchAll(/https:\/\/revival\.tokyo\/html\/upload\/save_image\/[^"'\s)]+\.jpeg/g)
    const allImages = [...new Set([...imageMatches].map((m) => m[0]))]
    // サムネイルを除いて最初の4枚（メイン画像のみ）
    const images = allImages.slice(0, Math.ceil(allImages.length / 2)).slice(0, 4)

    // コンディション（A/B/S/Cなど）
    const conditionMatch = html.match(/class="[^"]*condition[^"]*"[^>]*>\s*([A-Z])\s*</)
      ?? html.match(/>\s*([A-Z])\s*<\/span>\s*\n?\s*<strong>([^<]+)<\/strong>/)
    const condition = conditionMatch?.[1] ?? "A"

    // 商品説明（最初の段落を取得）
    const descMatch = html.match(/ようこそ[^。]*。([^<]{20,200})/)
      ?? html.match(/このバッグは[^<]{20,200}/)
    const description = descMatch?.[0]?.trim() ?? "状態の良い厳選ヴィンテージ品です。"

    const product: Product = {
      id: randomId,
      name: rawName,
      price,
      priceNum,
      images,
      description,
      condition,
      url,
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Product fetch error:", error)
    // フォールバック：固定データを返す
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
      description: "状態の良い厳選ヴィンテージ品です。",
      condition: "A",
      url: "https://revival.tokyo/products/detail/171",
    } as Product)
  }
}
