import type { Metadata } from "next";
import { blogService } from "@/services/blog-service";
import { readingTimeMinutes } from "@/lib/reading-time";
import { BlogIndexContent, type BlogPreview } from "./blog-index-content";

// Re-fetch published posts every 5 minutes so new articles appear without a redeploy
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog — playbooks for customer messaging",
  description:
    "Guides and playbooks on messaging customers over WhatsApp, email, Instagram and Messenger, from the team building VaakuOS.",
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
    <div className="bg-paper pb-20 pt-28 font-display text-ink md:pb-28 md:pt-36">
      <div className="mx-auto max-w-6xl px-4">
        <header className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
          <h1 className="text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink md:text-6xl">
            From the team
          </h1>
          <p className="max-w-md text-lg leading-8 text-ink/70 md:justify-self-end">
            Playbooks and guides on messaging customers over WhatsApp, email,
            Instagram and Messenger.
          </p>
        </header>

        <div className="mt-14 md:mt-20">
          <BlogIndexContent posts={previews} />
        </div>
      </div>
    </div>
  );
}
