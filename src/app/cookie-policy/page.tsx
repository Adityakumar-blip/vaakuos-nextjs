import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { getLegalPage, legalPageDate } from "@/services/legal-service";
import { LEGAL_FALLBACK_DATE, cookiePolicyFallback } from "../legal-fallbacks";

const SLUG = "cookie-policy" as const;
const FALLBACK_TITLE = "Cookie Policy";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage(SLUG);
  return {
    title: page?.meta_title || page?.title || FALLBACK_TITLE,
    description: page?.meta_description || "How VaakuOS uses cookies and similar tracking technologies.",
    alternates: { canonical: "/cookie-policy" },
  };
}

export default async function CookiePolicyPage() {
  const page = await getLegalPage(SLUG);
  return (
    <LegalDocument
      title={page?.title || FALLBACK_TITLE}
      lastUpdated={legalPageDate(page, LEGAL_FALLBACK_DATE)}
      html={page?.content || cookiePolicyFallback}
      contactEmail="privacy@vaakuos.com"
    />
  );
}
