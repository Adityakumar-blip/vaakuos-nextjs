import type { Metadata } from "next";
import { blogService } from "@/services/blog-service";
import { readingTimeMinutes } from "@/lib/reading-time";
import { BlogIndexContent, type BlogPreview } from "./blog-index-content";

// Re-fetch published posts every 5 minutes so new articles appear without a redeploy
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog: Conversion and Recovery Insights",
  description:
    "Read VaakuOS insights, case studies, and playbooks on recovering abandoned sales and scaling e-commerce revenue.",
  alternates: {
    canonical: "/blog",
  },
};

async function getBlogPosts() {
  try {
    return await blogService.getAllPublished();
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  const previews: BlogPreview[] = blogPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    category: post.category?.name ?? "General",
    author: post.author?.name ?? "VaakuOS Team",
    date: post.created_at,
    readingTime: readingTimeMinutes(post.content ?? ""),
    image: post.featured_image,
  }));

  return (
    <div className="min-h-screen pb-24 pt-32 md:pt-36">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Page header — minimal, left-aligned */}
        <header className="hero-fade-item hero-delay-1 mb-12 md:mb-16">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">
            From the team
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
            Announcements, playbooks, and no-nonsense guides on recovering
            abandoned sales from the team building VaakuOS.
          </p>
        </header>

        <BlogIndexContent posts={previews} />
      </div>
    </div>
  );
}
