"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 py-3" // スクロール時は白背景
          : "bg-transparent py-5" // 最初は透明
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* Logo Section */}
        <a href="https://revival.tokyo/" className="block transition-opacity hover:opacity-70">
          <Image
            src="/logo2.png" // 白背景に映えるロゴ
            alt="Revival.tokyo"
            width={600}
            height={200}
            className="h-[40px] w-auto object-contain"
            priority
          />
        </a>

        {/* Links - 文字色を濃いグレーに変更 */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#about" className="text-sm font-medium tracking-wide text-gray-800 hover:text-blue-600 transition-colors">CONCEPT</a>
          <a href="#product" className="text-sm font-medium tracking-wide text-gray-800 hover:text-blue-600 transition-colors">COLLECTION</a>
          <a href="#guide" className="text-sm font-medium tracking-wide text-gray-800 hover:text-blue-600 transition-colors">GUIDE</a>
        </div>
        
        {/* Button - ゴールドの枠から、黒のソリッドボタンへ */}
        <a
          href="#cta-section"
          className="bg-black px-6 py-2.5 text-xs font-bold tracking-[0.15em] text-white transition-transform hover:scale-105"
        >
          ORDER NOW
        </a>
      </div>
    </nav>
  )
}
