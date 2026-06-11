import type { Metadata } from "next";
import { PricingContent } from "./PricingContent";
import { JsonLd } from "@/components/json-ld";
import { softwareApplicationSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing plans that scale with you",
  description:
    "Compare VaakuOS pricing plans for abandoned-cart recovery. Start free and upgrade as you grow—automate WhatsApp messaging, recovery flows, and revenue attribution.",
  alternates: {
    canonical: "/pricing",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
]);

export default function PricingPage() {
  return (
    <>
      <JsonLd data={[softwareApplicationSchema, breadcrumb]} />
      <PricingContent />
    </>
  );
}
