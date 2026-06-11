import type { Metadata } from "next";
import { ContactContent } from "./contact-content";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL, ORGANIZATION_ID, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact VaakuOS — Book a Demo or Talk to Sales",
  description:
    "Get in touch with VaakuOS. Book a live demo, talk to sales about pricing, or reach our support team. We typically respond within one business day.",
  alternates: {
    canonical: "/contact",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${SITE_URL}/contact`,
  name: "Contact VaakuOS",
  about: { "@id": ORGANIZATION_ID },
  mainEntity: {
    "@id": ORGANIZATION_ID,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        url: `${SITE_URL}/demo`,
        availableLanguage: ["English"],
      },
    ],
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[contactSchema, breadcrumb]} />
      <ContactContent />
    </>
  );
}
