"use client"
import { useState, useEffect } from "react"
import Image from "next/image"

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="https://revival.tokyo/" className="block transition-opacity hover:opacity-70">
          <Image
            src="/logo2.png"
            alt="Revival.tokyo"
            width={600}
            height={200}
            className="h-[36px] w-auto object-contain"
            priority
          />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#about" className="text-sm font-medium tracking-wide text-gray-700 transition-colors hover:text-black">CONCEPT</a>
          <a href="#product" className="text-sm font-medium tracking-wide text-gray-700 transition-colors hover:text-black">COLLECTION</a>
          <a href="#guide" className="text-sm font-medium tracking-wide text-gray-700 transition-colors hover:text-black">GUIDE</a>
        </div>

        <a
          href="#cta-section"
          className="rounded-full bg-black px-6 py-2.5 text-xs font-bold tracking-widest text-white transition-all hover:bg-gray-800 hover:shadow-md"
        >
          購入する
        </a>
      </div>
    </nav>
  )
}
