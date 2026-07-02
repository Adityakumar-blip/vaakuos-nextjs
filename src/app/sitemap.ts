import { MetadataRoute } from "next";
import { statSync } from "node:fs";
import path from "node:path";
import { blogService } from "@/services/blog-service";
import { integrations } from "./integrations/integration-data";
import { SITE_URL } from "@/lib/seo";

const APP_DIR = path.join(process.cwd(), "src", "app");

/**
 * Real per-page last-modified date from the source file's mtime. This only
 * changes when the page actually changes — unlike `new Date()`, which stamped
 * every route with the build time on every deploy and trained crawlers to
 * ignore the signal. Returns undefined (omits lastmod) if the file is absent
 * at runtime, which is safer than emitting a fabricated date.
 */
function fileModified(relFile: string): Date | undefined {
  try {
    return statSync(path.join(APP_DIR, relFile)).mtime;
  } catch {
    return undefined;
  }
}

type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

type StaticRoute = {
  route: string;
  file: string;
  priority: number;
  changeFrequency: ChangeFreq;
};

// Only real, indexable pages. Thin/unbuilt routes (documentation, help-center,
// changelog, careers, community) and noindex utility routes (demo,
// register-interest, auth pages) are intentionally excluded.
const STATIC_ROUTES: StaticRoute[] = [
  { route: "", file: "page.tsx", priority: 1.0, changeFrequency: "weekly" },
  { route: "/features", file: "features/page.tsx", priority: 0.9, changeFrequency: "monthly" },
  { route: "/pricing", file: "pricing/page.tsx", priority: 0.9, changeFrequency: "monthly" },
  { route: "/integrations", file: "integrations/page.tsx", priority: 0.9, changeFrequency: "monthly" },
  { route: "/docs", file: "docs/page.tsx", priority: 0.7, changeFrequency: "monthly" },
  { route: "/docs/plugin/woocommerce", file: "docs/plugin/woocommerce/page.tsx", priority: 0.7, changeFrequency: "monthly" },
  { route: "/calculator", file: "calculator/page.tsx", priority: 0.7, changeFrequency: "monthly" },
  { route: "/blog", file: "blog/page.tsx", priority: 0.8, changeFrequency: "weekly" },
  { route: "/about", file: "about/page.tsx", priority: 0.6, changeFrequency: "yearly" },
  { route: "/contact", file: "contact/page.tsx", priority: 0.6, changeFrequency: "yearly" },
  { route: "/privacy-policy", file: "privacy-policy/page.tsx", priority: 0.3, changeFrequency: "yearly" },
  { route: "/terms-of-service", file: "terms-of-service/page.tsx", priority: 0.3, changeFrequency: "yearly" },
  { route: "/cookie-policy", file: "cookie-policy/page.tsx", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.route}`,
    lastModified: fileModified(r.file),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Integration detail pages (generated from the same data the pages use).
  const integrationModified = fileModified("integrations/[slug]/page.tsx");
  const integrationEntries: MetadataRoute.Sitemap = integrations.map(
    (integration) => ({
      url: `${SITE_URL}/integrations/${integration.slug}`,
      lastModified: integrationModified,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  // Dynamic blog posts (real publish/update dates from the CMS).
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await blogService.getAllPublished();
    blogEntries = posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.created_at),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch (e) {
    console.error("Failed to generate sitemap for dynamic blogs:", e);
  }

  return [...staticEntries, ...integrationEntries, ...blogEntries];
}
