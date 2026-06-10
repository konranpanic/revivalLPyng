import { Navigation } from "@/components/landing/navigation"
import { HeroSection } from "@/components/landing/hero-section"
import { ProblemsSection } from "@/components/landing/problems-section"
import { SupportSection } from "@/components/landing/support-section"
import { ReasonsSection } from "@/components/landing/reasons-section"
import { PhilosophySection } from "@/components/landing/philosophy-section"
import { ProductSection } from "@/components/landing/product-section"
import { ConditionSection } from "@/components/landing/condition-section"
import { StyleGuideSection } from "@/components/landing/style-guide-section"
import { CareSection } from "@/components/landing/care-section"
import { FaqSection } from "@/components/landing/faq-section"
import { CtaSection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ProblemsSection />
      <SupportSection />
      <ReasonsSection />
      <PhilosophySection />
      <ProductSection />
      <ConditionSection />
      <StyleGuideSection />
      <CareSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
