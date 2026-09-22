const API_URL = (process.env.NEXT_PUBLIC_API_URL || "https://api.vaakuos.com").replace(/\/+$/, "");

export type LegalSlug = "privacy-policy" | "terms-of-service" | "cookie-policy";

export type LegalPage = {
  slug: LegalSlug;
  title: string;
  content: string;
  meta_title?: string | null;
  meta_description?: string | null;
  effective_date?: string | null;
  updated_at?: string | null;
};

// Null when the API is down or the page isn't published; callers fall back to
// the committed copy so a legal page is never blank.
export async function getLegalPage(slug: LegalSlug): Promise<LegalPage | null> {
  try {
    const res = await fetch(`${API_URL}/legal-pages/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const body = await res.json();
    const page: LegalPage = body?.data ?? body;
    if (!page?.content || !page?.title) return null;
    return page;
  } catch {
    return null;
  }
}

export function legalPageDate(page: LegalPage | null, fallback: string) {
  const raw = page?.effective_date || page?.updated_at;
  if (!raw) return fallback;
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
