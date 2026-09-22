import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { getLegalPage, legalPageDate } from "@/services/legal-service";
import { LEGAL_FALLBACK_DATE, privacyPolicyFallback } from "../legal-fallbacks";

const SLUG = "privacy-policy" as const;
const FALLBACK_TITLE = "Privacy Policy";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage(SLUG);
  return {
    title: page?.meta_title || page?.title || FALLBACK_TITLE,
    description: page?.meta_description || "How VaakuOS collects, uses and protects your information.",
    alternates: { canonical: "/privacy-policy" },
  };
}

export default async function PrivacyPolicyPage() {
  const page = await getLegalPage(SLUG);
  return (
    <LegalDocument
      title={page?.title || FALLBACK_TITLE}
      lastUpdated={legalPageDate(page, LEGAL_FALLBACK_DATE)}
      html={page?.content || privacyPolicyFallback}
      contactEmail="privacy@vaakuos.com"
    />
  );
}
