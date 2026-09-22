"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

function Cover({ post, sizes, priority = false }: { post: BlogPreview; sizes: string; priority?: boolean }) {
  if (post.image) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-line/40">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  const palette = COVER_PALETTES[hashSlug(post.slug) % COVER_PALETTES.length];
  return (
    <div className={`relative aspect-[16/9] overflow-hidden rounded-xl ${palette.bg}`}>
      <span
        aria-hidden="true"
        className={`absolute -bottom-[0.28em] left-4 select-none text-[7rem] font-bold leading-none ${palette.mark}`}
      >
        {post.title.charAt(0)}
      </span>
    </div>
  );
}

function PostMeta({ post }: { post: BlogPreview }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 text-sm text-ink/65">
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span>{post.author}</span>
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

  if (posts.length === 0) {
    return (
      <>
        <div className="border-t border-line px-4 py-20 text-center md:py-28">
          <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink md:text-3xl">
            The first post is being written.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base leading-7 text-ink/70">
            Subscribe below so you don&rsquo;t miss it.
          </p>
        </div>
        <NewsletterCta />
      </>
    );
  }

  return (
    <>
      {/* Featured post */}
      <section>
        <p className="mb-5 text-sm font-semibold text-ink/65">Featured post</p>
        <Link
          href={`/blog/${featured.slug}`}
          className={`group block rounded-lg ${focusRing}`}
        >
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
            <Cover post={featured} sizes="(min-width: 768px) 50vw, 100vw" priority />
            <div>
              <PostMeta post={featured} />
              <h2 className="mt-3 font-display text-2xl font-bold leading-[1.15] tracking-[-0.02em] text-ink transition-colors group-hover:text-forest md:text-3xl lg:text-4xl">
                {featured.title}
              </h2>
              {featured.excerpt && (
                <p className="mt-4 line-clamp-3 text-base leading-7 text-ink/70">
                  {featured.excerpt}
                </p>
              )}
            </div>
          </div>
        </Link>
      </section>

      {/* Category filter */}
      <div className="mt-14 border-t border-line md:mt-20">
        {others.length > 0 && categories.length > 2 && (
          <div className="-mb-px flex flex-wrap gap-x-7 gap-y-1">
            {categories.map((name) => (
              <button
                key={name}
                onClick={() => setActive(name)}
                className={`-mt-px border-t-2 pb-1 pt-4 text-sm font-semibold transition-colors ${focusRing} ${
                  active === name
                    ? "border-forest text-ink"
                    : "border-transparent text-ink/65 hover:text-ink"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Post list */}
      {others.length > 0 &&
        (filtered.length > 0 ? (
          <section key={active} className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 md:mt-12">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group block rounded-lg ${focusRing}`}
              >
                <Cover
                  post={post}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="mt-4">
                  <PostMeta post={post} />
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-forest md:text-xl">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink/70">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <div className="mt-10 border-t border-line px-4 py-14 text-center md:mt-12">
            <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-ink">
              Nothing in {active} yet.
            </h3>
            <button
              onClick={() => setActive("All")}
              className={`mt-3 text-sm font-semibold text-forest underline underline-offset-4 ${focusRing}`}
            >
              View all posts
            </button>
          </div>
        ))}

      <NewsletterCta />
    </>
  );
}
