import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { getLegalPage, legalPageDate } from "@/services/legal-service";
import { LEGAL_FALLBACK_DATE, termsOfServiceFallback } from "../legal-fallbacks";

const SLUG = "terms-of-service" as const;
const FALLBACK_TITLE = "Terms of Service";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage(SLUG);
  return {
    title: page?.meta_title || page?.title || FALLBACK_TITLE,
    description: page?.meta_description || "The terms you agree to when you use VaakuOS.",
    alternates: { canonical: "/terms-of-service" },
  };
}

export default async function TermsOfServicePage() {
  const page = await getLegalPage(SLUG);
  return (
    <LegalDocument
      title={page?.title || FALLBACK_TITLE}
      lastUpdated={legalPageDate(page, LEGAL_FALLBACK_DATE)}
      html={page?.content || termsOfServiceFallback}
      contactEmail="legal@vaakuos.com"
    />
  );
}
