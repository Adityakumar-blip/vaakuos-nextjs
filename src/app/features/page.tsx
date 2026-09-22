import type { Metadata } from "next";
import { FeaturesContent } from "./features-content";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL, ORGANIZATION_ID, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Features | WhatsApp, Email, Instagram & Messenger — VaakuOS",
  description:
    "See what's live in VaakuOS: WhatsApp, email, Instagram and Messenger in one place, automations, a contact CRM, campaigns and delivery tracking for any business that messages customers.",
  alternates: {
    canonical: "/features",
  },
};

// Page-specific SoftwareApplication node: description reflects the multi-channel,
// multi-industry product, not the shared lib/seo.ts copy (which stays e-commerce-only).
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VaakuOS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/features`,
  description:
    "Customer messaging platform covering WhatsApp, email, Instagram and Messenger, with one customer record, automations, a contact CRM, campaigns and delivery tracking.",
  publisher: { "@id": ORGANIZATION_ID },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Start free, upgrade as you grow.",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Features", path: "/features" },
]);

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={[softwareSchema, breadcrumb]} />
      <FeaturesContent />
    </>
  );
}
