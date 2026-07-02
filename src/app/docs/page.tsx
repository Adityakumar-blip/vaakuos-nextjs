import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Sparkles } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { SITE_URL, breadcrumbSchema } from "@/lib/seo";
import { docs, groupedDocs } from "./docs-registry";

export const metadata: Metadata = {
  title: "Docs — plugins, connectors & developer guides",
  description:
    "Everything you need to connect your store to Vaakuos and run WhatsApp-first recovery: plugin setup guides, event references, payloads, and developer hooks.",
  alternates: {
    canonical: "/docs",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Vaakuos documentation",
  itemListElement: docs.map((doc, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: doc.title,
    url: `${SITE_URL}${doc.href}`,
  })),
};

function anchorFor(category: string) {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function DocsIndexPage() {
  const groups = groupedDocs();
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Docs", path: "/docs" },
  ]);

  return (
    <div className="min-h-screen bg-background pt-24 text-foreground">
      <JsonLd data={[itemListSchema, breadcrumb]} />

      {/* Hero */}
      <section className="relative border-b border-border/70">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(42,97,68,0.14),transparent_32%,rgba(238,90,41,0.10)_64%,transparent)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_25%,rgba(130,193,159,0.35),transparent_26%),radial-gradient(circle_at_80%_10%,rgba(238,90,41,0.14),transparent_22%)]" />

        <div className="container mx-auto max-w-7xl px-4 py-16 md:py-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/50 px-3 py-1.5 text-sm font-semibold text-primary shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Documentation
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
            Build on Vaakuos
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Setup guides, event references, and developer hooks for every plugin
            and connector. Pick a doc below to get streaming events in minutes.
          </p>
        </div>
      </section>

      {/* Index */}
      <div className="container mx-auto grid max-w-7xl gap-12 px-4 py-14 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Category rail */}
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-1">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Categories
            </p>
            {groups.map(({ category, entries }) => (
              <a
                key={category}
                href={`#${anchorFor(category)}`}
                className="flex items-center justify-between rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {category}
                <span className="text-xs tabular-nums text-muted-foreground/70">
                  {entries.length}
                </span>
              </a>
            ))}
          </nav>
        </aside>

        <div className="max-w-3xl">
          {groups.map(({ category, entries }) => (
            <section
              key={category}
              id={anchorFor(category)}
              className="mb-14 scroll-mt-28 last:mb-0"
            >
              <div className="flex items-baseline justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  {category}
                </h2>
                <span className="text-xs font-medium text-muted-foreground">
                  {entries.length} {entries.length === 1 ? "guide" : "guides"}
                </span>
              </div>

              <div className="mt-5 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white/35">
                {entries.map((doc) => {
                  const Icon = doc.icon;
                  return (
                    <Link
                      key={doc.href}
                      href={doc.href}
                      className="group relative flex items-center gap-5 p-5 transition-colors hover:bg-muted/50"
                    >
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <h3 className="font-bold">{doc.title}</h3>
                          {doc.badge && (
                            <span className="rounded-full border border-border bg-background px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                              {doc.badge}
                            </span>
                          )}
                          {doc.meta && (
                            <span className="text-xs font-medium text-muted-foreground">
                              · {doc.meta}
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                          {doc.description}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}

          {/* Help nudge */}
          <div className="mt-4 rounded-2xl border border-border bg-muted/30 p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <h3 className="font-bold">Can&apos;t find what you need?</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Request a connector or reach out — our team will point you to
                  the right setup.
                </p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                  <Link
                    href="/request-integration"
                    className="inline-flex items-center gap-1.5 text-primary hover:underline"
                  >
                    Request an integration
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-primary hover:underline"
                  >
                    Talk to support
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
