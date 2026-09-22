import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Capabilities, Closing, Faq, faqItems, GoLive } from "@/components/home/sections";
import { Industries } from "@/components/home/industries";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Customer Messaging on WhatsApp, Email, Instagram & Messenger | VaakuOS",
  },
  description:
    "One inbox and one customer record across WhatsApp, email, Instagram and Messenger. Automate follow-ups, run campaigns and see which messages led to a sale, booking or payment.",
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
      <div className="bg-paper font-display text-ink">
        <Hero />
        <Capabilities />
        <Industries />
        <GoLive />
        <Faq />
        <Closing />
      </div>
    </>
  );
}
