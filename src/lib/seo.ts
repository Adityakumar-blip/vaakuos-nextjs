/**
 * Shared SEO constants and JSON-LD schema builders.
 *
 * A single canonical Organization @id is referenced from every page so all
 * structured-data references resolve to one entity in the knowledge graph.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://vaakuos.com";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Confirmed public profiles for entity disambiguation. */
export const SAME_AS = [
  "https://www.linkedin.com/company/vaakuos",
  "https://x.com/useVaakuos",
];

/** Canonical Organization node — reuse via @id everywhere else. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "VaakuOS",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/favicon.png`,
  },
  image: `${SITE_URL}/og-image.png`,
  description:
    "VaakuOS is a customer messaging platform that brings WhatsApp, email, Instagram and Messenger into one inbox and one record per customer. Businesses use it to reply from one place, automate follow-ups and see which messages led to a sale, booking or payment.",
  sameAs: SAME_AS,
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "VaakuOS",
  publisher: { "@id": ORGANIZATION_ID },
};

/** SoftwareApplication node for the product (use on /features and /pricing). */
export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VaakuOS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "Customer messaging platform for WhatsApp, email, Instagram and Messenger. One inbox and one record per customer, automated follow-ups triggered by what customers do, and reporting from sent to delivered, read, replied and converted.",
  publisher: { "@id": ORGANIZATION_ID },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    description: "Start free, upgrade as you grow.",
  },
};

type Crumb = { name: string; path: string };

/** Build a BreadcrumbList for the given trail (paths are site-relative). */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}
