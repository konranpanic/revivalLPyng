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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-primary/20 py-0"
          : "bg-transparent py-0.5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* Logo Section - ネガティブマージンで上下の余白を強制的に消去 */}
        <a href="https://revival.tokyo/" className="block transition-opacity hover:opacity-80">
          <Image
            src="/logo2.png"
            alt="Revival.tokyo"
            width={600}
            height={200}
            // -my-2 で上下に食い込ませ、h-[64px]で高さを確保
            className="h-[64px] w-auto object-contain -my-2"
            priority
          />
        </a>

        {/* Links */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#product"
            className="text-sm tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            COLLECTION
          </a>
          <a
            href="#cta-section"
            className="text-sm tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            PURCHASE
          </a>
        </div>
        
        <a
          href="#cta-section"
          className="luxury-border bg-transparent px-6 py-2.5 text-xs font-medium tracking-[0.15em] text-primary transition-all hover:bg-primary/10"
        >
          ORDER NOW
        </a>
      </div>
    </nav>
  )
}
