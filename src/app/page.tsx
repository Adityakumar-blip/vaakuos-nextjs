import type { Metadata } from "next";
import { HeroSection } from "@/components/hero-section";
import { StatsComparison } from "@/components/stats-comparison";
import { FeaturesSection } from "@/components/features-section";
import { IntegrationsSection } from "@/components/integrations-section";
import { CTASection } from "@/components/cta-section";
import { ScrollReveal } from "@/components/scroll-reveal";

export const metadata: Metadata = {
  title: "Recover every abandoned sale with VaakuOS",
  description:
    "VaakuOS tracks intent and re-engages shoppers across channels to win back abandoned carts and conversations.",
  alternates: {
    canonical: "/",
  },
};

// JSON-LD Structured Data
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VaakuOS",
  url: "https://vaakuos.com",
  logo: "https://vaakuos.com/favicon.png",
  sameAs: ["https://www.linkedin.com/company/vaakuos"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: "https://vaakuos.com",
  name: "VaakuOS",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://vaakuos.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="min-h-screen">
        <HeroSection />

        <ScrollReveal>
          <StatsComparison />
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <FeaturesSection />
        </ScrollReveal>

        <ScrollReveal>
          <IntegrationsSection />
        </ScrollReveal>

        <ScrollReveal>
          <CTASection />
        </ScrollReveal>
      </div>
    </>
  );
}