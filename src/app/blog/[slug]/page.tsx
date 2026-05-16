import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogService } from "@/services/blog-service";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string) {
  try {
    return await blogService.getBySlug(slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      type: "article",
      publishedTime: post.created_at,
      authors: [post.author?.name || "VaakuOS Team"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors text-sm font-medium"
        >
          ← Back to Blog
        </Link>

        <article>
          <header className="mb-10 md:mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-primary/10 text-primary text-xs md:text-sm font-bold px-3 md:px-4 py-1 rounded">
                {post.category?.name || "General"}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-6 border-y border-border gap-4">
              <div>
                <p className="font-bold text-sm md:text-base">{post.author?.name || "VaakuOS Team"}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Author</p>
              </div>
              <time className="text-sm text-muted-foreground">{formattedDate}</time>
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-strong:text-foreground
              prose-ul:list-disc prose-li:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <footer className="mt-16 pt-10 border-t border-border">
            <div className="bg-card p-6 md:p-10 rounded-2xl border border-border text-center">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                Want more insights?
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
                Join our newsletter to receive the latest strategies for e-commerce growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-5 md:px-6 py-3 md:py-4 rounded-full bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                />
                <button className="px-6 md:px-8 py-3 md:py-4 bg-primary text-white font-bold rounded-full hover:opacity-90 transition-all text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}