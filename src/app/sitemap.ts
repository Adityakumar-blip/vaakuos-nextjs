import { MetadataRoute } from "next";
import { blogService } from "@/services/blog-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vaakuos.com";

  // Core routes
  const staticRoutes = [
    "",
    "/about",
    "/features",
    "/integrations",
    "/demo",
    "/documentation",
    "/help-center",
    "/contact",
    "/pricing",
    "/calculator",
    "/changelog",
    "/careers",
    "/community",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch dynamic blog posts
  let blogRoutes: any[] = [];
  try {
    const posts = await blogService.getAllPublished();
    blogRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at || post.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (e) {
    console.error("Failed to generate sitemap for dynamic blogs:", e);
  }

  return [...staticRoutes, ...blogRoutes];
}
