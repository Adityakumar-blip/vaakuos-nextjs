import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { blogService } from "@/services/blog-service";
import { readingTimeMinutes } from "@/lib/reading-time";
import { COVER_PALETTES, formatDate, hashSlug, initials } from "../blog-utils";
import { NewsletterCta } from "../newsletter-cta";
import { ReadingProgress } from "./reading-progress";
import type { BlogPost } from "@/types/blog";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL, ORGANIZATION_ID, breadcrumbSchema } from "@/lib/seo";

function articleSchema(post: BlogPost) {
  const authorName = post.author?.name || "VaakuOS Team";
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.meta_description || "",
    ...(post.featured_image ? { image: post.featured_image } : {}),
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: { "@type": "Person", name: authorName },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

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

async function getOtherPosts(currentSlug: string): Promise<BlogPost[]> {
  try {
    const posts = await blogService.getAllPublished();
    return posts.filter((post) => post.slug !== currentSlug).slice(0, 5);
  } catch {
    return [];
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

  const description = post.meta_description || post.excerpt || "";

  return {
    // `absolute` bypasses the "%s | VaakuOS" layout template so titles that
    // already carry a brand suffix (e.g. meta_title) don't get it twice.
    title: { absolute: post.meta_title || `${post.title} | VaakuOS` },
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      type: "article",
      publishedTime: post.created_at,
      modifiedTime: post.updated_at || post.created_at,
      authors: [post.author?.name || "VaakuOS Team"],
      ...(post.featured_image ? { images: [{ url: post.featured_image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || description,
      ...(post.featured_image ? { images: [post.featured_image] } : {}),
    },
  };
}

function SideThumb({ post }: { post: BlogPost }) {
  if (post.featured_image) {
    return (
      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-foreground/10 bg-muted">
        <Image
          src={post.featured_image}
          alt={post.title}
          fill
          sizes="80px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }
  const palette = COVER_PALETTES[hashSlug(post.slug) % COVER_PALETTES.length];
  return (
    <div
      className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg ${palette}`}
    >
      <span
        aria-hidden
        className="absolute -bottom-[0.3em] left-1.5 select-none text-3xl font-bold leading-none text-white/20"
      >
        {post.title.charAt(0)}
      </span>
    </div>
  );
}

function OtherReads({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <div className="mb-5 flex items-center gap-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Other reads
        </h2>
        <span className="h-px flex-1 bg-foreground/10" />
      </div>
      <div className="space-y-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-start gap-3.5"
          >
            <SideThumb post={post} />
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-sm font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mt-1.5 text-xs text-muted-foreground">
                <time dateTime={post.created_at}>
                  {formatDate(post.created_at)}
                </time>
                <span className="mx-1.5 text-muted-foreground/60">·</span>
                {post.author?.name || "VaakuOS Team"}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/blog"
        className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary"
      >
        View all posts
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </aside>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, otherPosts] = await Promise.all([
    getBlogPost(slug),
    getOtherPosts(slug),
  ]);

  if (!post) {
    notFound();
  }

  const authorName = post.author?.name || "VaakuOS Team";
  const readingTime = readingTimeMinutes(post.content ?? "");
  const formattedDate = formatDate(post.created_at);

  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <div className="relative min-h-screen overflow-hidden pb-24 pt-32">
      <JsonLd data={[articleSchema(post), breadcrumb]} />
      <ReadingProgress />

      {/* Atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[420px] w-[800px] max-w-[150vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,hsl(var(--tertiary)/0.28),transparent)] blur-2xl" />
        <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(hsl(var(--foreground)/0.07)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.07)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_45%)]" />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        <Link
          href="/blog"
          className="group mb-10 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-card/70 px-4 py-2 text-sm font-semibold text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to the Journal
        </Link>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_280px] xl:gap-16">
          <article className="min-w-0">
            <header className="mb-10 md:mb-12">
              <span className="inline-block rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                {post.category?.name || "General"}
              </span>

              <h1 className="mt-6 text-3xl font-bold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-tertiary text-xs font-bold text-tertiary-foreground">
                    {initials(authorName)}
                  </span>
                  <span className="font-semibold text-foreground">
                    {authorName}
                  </span>
                </span>
                <span className="text-muted-foreground/50">·</span>
                <time dateTime={post.created_at}>{formattedDate}</time>
                <span className="text-muted-foreground/50">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" />
                  {readingTime} min read
                </span>
              </div>
            </header>

            {post.featured_image && (
              <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl border border-foreground/10 shadow-xl shadow-primary/10 md:mb-12">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}

            <div
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                prose-p:leading-relaxed prose-p:text-foreground/80
                prose-a:font-semibold prose-a:text-primary prose-a:decoration-accent/40 prose-a:underline-offset-4 hover:prose-a:decoration-accent
                prose-strong:text-foreground
                prose-blockquote:border-l-accent prose-blockquote:text-xl prose-blockquote:italic prose-blockquote:text-foreground
                prose-li:text-foreground/80
                prose-img:rounded-2xl prose-img:border prose-img:border-foreground/10
                prose-hr:border-border"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <footer className="mt-14">
              <div className="flex items-center gap-4 rounded-2xl border border-foreground/10 bg-card p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-tertiary text-base font-bold text-tertiary-foreground">
                  {initials(authorName)}
                </span>
                <div>
                  <p className="text-lg font-bold tracking-tight">
                    Written by {authorName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Insights on cart recovery, retention, and conversion from
                    the VaakuOS team.
                  </p>
                </div>
              </div>
            </footer>
          </article>

          <OtherReads posts={otherPosts} />
        </div>

        <NewsletterCta />
      </div>
    </div>
  );
}
