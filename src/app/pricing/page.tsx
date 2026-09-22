import type { Metadata } from "next";
import { PricingContent } from "./PricingContent";
import { JsonLd } from "@/components/json-ld";
import { softwareApplicationSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing plans that scale with you",
  description:
    "Compare VaakuOS pricing plans for customer messaging on WhatsApp, email, Instagram and Messenger. Start free and upgrade as you grow—automate follow-ups and track revenue per message.",
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
