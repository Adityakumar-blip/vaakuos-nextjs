import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogService } from "@/services/blog-service";
import { COVER_PALETTES, formatDate, hashSlug, initials } from "../blog-utils";
import { NewsletterCta } from "../newsletter-cta";
import { ReadingProgress } from "./reading-progress";
import type { BlogPost } from "@/types/blog";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL, ORGANIZATION_ID, breadcrumbSchema } from "@/lib/seo";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const inlineLink = `font-semibold text-forest underline underline-offset-4 decoration-forest/30 transition-colors hover:decoration-forest ${focusRing}`;

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
      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-line/40">
        <Image
          src={post.featured_image}
          alt={post.title}
          fill
          sizes="80px"
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }
  const palette = COVER_PALETTES[hashSlug(post.slug) % COVER_PALETTES.length];
  return (
    <div className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg ${palette.bg}`}>
      <span aria-hidden="true" className={`absolute -bottom-[0.3em] left-1.5 select-none text-3xl font-bold leading-none ${palette.mark}`}>
        {post.title.charAt(0)}
      </span>
    </div>
  );
}

function OtherReads({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <aside className="lg:sticky lg:top-28 lg:self-start">
      <h2 className="border-t border-ink pt-4 text-sm font-semibold text-ink">Other reads</h2>
      <div className="mt-5 space-y-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`group flex items-start gap-3.5 rounded-lg ${focusRing}`}
          >
            <SideThumb post={post} />
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-sm font-bold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-forest">
                {post.title}
              </h3>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-xs text-ink/65">
                <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                <span>{post.author?.name || "VaakuOS Team"}</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/blog" className={`mt-7 inline-block text-sm ${inlineLink}`}>
        View all posts
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
  const publishedDate = formatDate(post.created_at);
  const wasUpdated = post.updated_at && post.updated_at !== post.created_at;

  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <div className="bg-paper pb-20 pt-28 font-display text-ink md:pb-28 md:pt-36">
      <JsonLd data={[articleSchema(post), breadcrumb]} />
      <ReadingProgress />

      <div className="mx-auto max-w-6xl px-4">
        <Link href="/blog" className={`mb-10 inline-block text-sm ${inlineLink}`}>
          Back to the blog
        </Link>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_280px] xl:gap-16">
          <article className="min-w-0">
            <header className="mb-10 md:mb-12">
              <p className="text-sm text-ink/65">{post.category?.name || "General"}</p>

              <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-ink md:text-6xl">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-5 max-w-prose text-lg leading-8 text-ink/70">
                  {post.excerpt}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-ink/65">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest text-xs font-bold text-paper">
                  {initials(authorName)}
                </span>
                <span className="font-semibold text-ink">{authorName}</span>
                <time dateTime={post.created_at}>Published {publishedDate}</time>
                {wasUpdated && (
                  <time dateTime={post.updated_at}>
                    Updated {formatDate(post.updated_at)}
                  </time>
                )}
              </div>
            </header>

            {post.featured_image && (
              <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-2xl bg-line/40 md:mb-12">
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
              className="prose prose-lg max-w-[68ch]
                prose-headings:font-display prose-headings:font-bold prose-headings:tracking-[-0.02em] prose-headings:text-ink
                prose-p:leading-8 prose-p:text-ink/80
                prose-a:font-semibold prose-a:text-forest prose-a:no-underline prose-a:underline-offset-4 hover:prose-a:underline
                prose-strong:text-ink
                prose-blockquote:border-l-forest prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-ink/80
                prose-li:text-ink/80 prose-li:marker:text-ink/40
                prose-code:rounded prose-code:bg-mint-soft prose-code:px-1.5 prose-code:py-0.5 prose-code:text-ink prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-ink prose-pre:text-paper
                prose-img:rounded-2xl
                prose-hr:border-line"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <footer className="mt-14 border-t border-line pt-8">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest text-base font-bold text-paper">
                  {initials(authorName)}
                </span>
                <div>
                  <p className="font-display text-lg font-bold tracking-[-0.01em] text-ink">
                    Written by {authorName}
                  </p>
                  <p className="text-sm text-ink/65">
                    From the team building VaakuOS.
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
