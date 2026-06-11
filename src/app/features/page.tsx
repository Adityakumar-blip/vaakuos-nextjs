import type { Metadata } from "next";
import { FeaturesContent } from "./features-content";
import { JsonLd } from "@/components/json-ld";
import { softwareApplicationSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Features — The WhatsApp Commerce Platform",
  description:
    "Explore VaakuOS features: intent tracking, WhatsApp campaigns, automation flows, shared inbox, and analytics—everything you need to recover abandoned carts.",
  alternates: {
    canonical: "/features",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
]);

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={[softwareApplicationSchema, breadcrumb]} />
      <FeaturesContent />
    </>
  );
}
