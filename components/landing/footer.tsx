import Image from 'next/image';

export function Footer() {
  return (
    <footer className="relative border-t border-border/30 bg-secondary py-16">
      {/* Top Accent Line */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <div className="text-center">
            {/* リンク先を https://revival.tokyo/ に設定しました */}
            <a href="https://revival.tokyo/" className="inline-block transition-opacity hover:opacity-80">
              <Image
                src="/logo2.png"
                alt="Revival.tokyo"
                width={400}
                height={120}
                className="h-auto w-[280px] object-contain"
                priority
              />
            </a>
            <p className="mt-2 text-[10px] tracking-[0.3em] text-primary/60">
              PREMIUM BRAND SELECTION
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="https://revival.tokyo/help/about"
              className="text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              会社概要
            </a>
            <a
              href="https://revival.tokyo/help/privacy"
              className="text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              プライバシーポリシー
            </a>
            <a
              href="https://revival.tokyo/help/tradelaw"
              className="text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              特定商取引法に基づく表記
            </a>
            <a
              href="https://revival.tokyo/contact"
              className="text-xs tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              お問い合わせ
            </a>
          </div>

          {/* Divider */}
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {/* Copyright */}
          <p className="font-serif text-xs tracking-wider text-muted-foreground">
            &copy; {new Date().getFullYear()} Revival.tokyo. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
