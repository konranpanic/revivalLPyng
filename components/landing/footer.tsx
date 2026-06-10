import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative border-t border-gray-100 bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8">
          <a href="https://revival.tokyo/" className="inline-block transition-opacity hover:opacity-70">
            <Image
              src="/logo2.png"
              alt="Revival.tokyo"
              width={400}
              height={120}
              className="h-auto w-[220px] object-contain"
              priority
            />
          </a>

          <p className="text-[11px] font-bold tracking-[0.3em] text-gray-400">
            PREMIUM VINTAGE SELECTION
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "会社概要", href: "https://revival.tokyo/help/about" },
              { label: "プライバシーポリシー", href: "https://revival.tokyo/help/privacy" },
              { label: "特定商取引法に基づく表記", href: "https://revival.tokyo/help/tradelaw" },
              { label: "お問い合わせ", href: "https://revival.tokyo/contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-gray-400 transition-colors hover:text-black"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="h-px w-16 bg-gray-200" />

          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Revival.tokyo. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
