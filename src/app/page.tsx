import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { StatsComparison } from "@/components/stats-comparison";
import { FeaturesSection } from "@/components/features-section";
import { FaqSection, faqItems } from "@/components/faq-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { IntegrationsSection } from "@/components/integrations-section";
import { CTASection } from "@/components/cta-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Recover every abandoned sale with VaakuOS",
  description:
    "VaakuOS tracks intent and re-engages shoppers across channels to win back abandoned carts and conversations.",
  alternates: {
    canonical: "/",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema, faqSchema]} />
      <div className="min-h-screen">
        <HeroSection />

        <ScrollReveal>
          <StatsComparison />
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <FeaturesSection />
        </ScrollReveal>

        <ScrollReveal>
          <HowItWorksSection />
        </ScrollReveal>

        <ScrollReveal>
          <IntegrationsSection />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <FaqSection />
        </ScrollReveal>

        <ScrollReveal>
          <CTASection />
        </ScrollReveal>
      </div>
    </>
  );
}
