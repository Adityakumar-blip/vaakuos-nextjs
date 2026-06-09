"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen } from "lucide-react";
import { NewsletterCta } from "./newsletter-cta";
import { COVER_PALETTES, formatDate, hashSlug } from "./blog-utils";

export interface BlogPreview {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readingTime: number;
  image?: string;
}

function Cover({ post, sizes }: { post: BlogPreview; sizes: string }) {
  if (post.image) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-foreground/10 bg-muted">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  // Generative brand cover for posts without a featured image
  const palette = COVER_PALETTES[hashSlug(post.slug) % COVER_PALETTES.length];
  return (
    <div
      className={`relative aspect-[16/9] overflow-hidden rounded-xl ${palette}`}
    >
      <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(hsl(0_0%_100%/0.55)_1px,transparent_1px)] [background-size:18px_18px]" />
      <span
        aria-hidden
        className="absolute -bottom-[0.28em] left-4 select-none text-[7rem] font-bold leading-none tracking-tight text-white/15 transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
      >
        {post.title.charAt(0)}
      </span>
    </div>
  );
}

function PostMeta({ post }: { post: BlogPreview }) {
  return (
    <p className="text-sm text-muted-foreground">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span className="mx-1.5 text-muted-foreground/60">·</span>
      {post.author}
    </p>
  );
}

export function BlogIndexContent({ posts }: { posts: BlogPreview[] }) {
  const [active, setActive] = useState("All");

  const [featured, ...others] = posts;

  const categories = useMemo(() => {
    const names = new Set(others.map((post) => post.category));
    return ["All", ...Array.from(names)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  const filtered =
    active === "All"
      ? others
      : others.filter((post) => post.category === active);

  /* Empty state — no posts at all */
  if (posts.length === 0) {
    return (
      <>
        <div className="hero-fade-item hero-delay-3 rounded-2xl border border-dashed border-foreground/20 bg-card/60 px-8 py-20 text-center md:py-28">
          <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-tertiary/40 text-primary">
            <BookOpen className="h-6 w-6" />
          </span>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            The first story is being written.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Our playbooks on cart recovery, retention, and conversion land here
            soon. Subscribe below so you don&apos;t miss the first issue.
          </p>
        </div>
        <NewsletterCta />
      </>
    );
  }

  return (
    <>
      {/* Featured post */}
      <section className="hero-fade-item hero-delay-2">
        <p className="mb-5 text-sm font-semibold text-muted-foreground">
          Featured post
        </p>
        <Link href={`/blog/${featured.slug}`} className="group block">
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
            <Cover
              post={featured}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div>
              <PostMeta post={featured} />
              <h2 className="mt-3 text-2xl font-bold leading-[1.15] tracking-tight transition-colors group-hover:text-primary md:text-3xl lg:text-4xl">
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="mt-4 line-clamp-3 text-base leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
              )}
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Read post
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Divider + category tabs */}
      <div className="hero-fade-item hero-delay-3 mt-14 border-t border-border md:mt-20">
        {others.length > 0 && categories.length > 2 && (
          <div className="-mb-px flex flex-wrap gap-x-7 gap-y-1 pt-0">
            {categories.map((name) => (
              <button
                key={name}
                onClick={() => setActive(name)}
                className={`-mt-px border-t-2 pb-1 pt-4 text-sm font-semibold transition-colors ${
                  active === name
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Post grid */}
      {others.length > 0 &&
        (filtered.length > 0 ? (
          <section
            key={active}
            className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 md:mt-12"
          >
            {filtered.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block animate-fade-in"
                style={{
                  animationDelay: `${Math.min(index, 8) * 60}ms`,
                  animationFillMode: "backwards",
                }}
              >
                <Cover
                  post={post}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="mt-4">
                  <PostMeta post={post} />
                  <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-primary md:text-xl">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-foreground/20 bg-card/60 px-8 py-14 text-center md:mt-12">
            <h3 className="text-lg font-bold tracking-tight">
              Nothing in {active} yet.
            </h3>
            <button
              onClick={() => setActive("All")}
              className="mt-3 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              View all posts
            </button>
          </div>
        ))}

      <NewsletterCta />
    </>
  );
}
