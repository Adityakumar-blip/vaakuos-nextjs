import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { groupedDocs } from "./docs-registry";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Set up VaakuOS: connect your store or tools, send customer events, and start automated follow-ups on WhatsApp, email, Instagram and Messenger.",
  alternates: {
    canonical: "/docs",
  },
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const inlineLink = `font-semibold text-forest underline decoration-forest/30 underline-offset-4 transition-colors hover:decoration-forest ${focusRing}`;

const startHere = [
  {
    title: "Connect a store or tool",
    body: "Install a plugin or connect an app so VaakuOS knows when an order, booking or lead happens.",
    href: "/integrations",
    linkText: "Browse integrations",
  },
  {
    title: "Send your own events",
    body: "No plugin for your stack? Post events straight to the API with a token from your dashboard.",
    href: "/contact",
    linkText: "Ask for API access",
  },
];

export default function DocsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
        ])}
      />

      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-5xl">Documentation</h1>
        <p className="mt-5 text-lg leading-8 text-ink/70">
          Guides for connecting VaakuOS to the tools you already run, so an order,
          a booking or a new lead can start a follow-up on WhatsApp, email,
          Instagram or Messenger.
        </p>
      </div>

      <section className="mt-14">
        <h2 className="text-sm font-bold text-ink">Start here</h2>
        <div className="mt-4 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2">
          {startHere.map((item) => (
            <div key={item.title} className="bg-white p-6">
              <h3 className="text-lg font-bold tracking-[-0.01em]">{item.title}</h3>
              <p className="mt-2 text-base leading-7 text-ink/70">{item.body}</p>
              <Link href={item.href} className={`mt-4 inline-block text-base ${inlineLink}`}>
                {item.linkText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {groupedDocs().map((group) => (
        <section key={group.category} className="mt-14">
          <h2 className="text-sm font-bold text-ink">{group.category}</h2>
          <ul className="mt-4 border-t border-line">
            {group.entries.map((entry) => (
              <li key={entry.href} className="border-b border-line">
                <Link
                  href={entry.href}
                  className={`group flex flex-col gap-1 py-5 transition-colors hover:bg-ink/[0.03] sm:px-2 ${focusRing}`}
                >
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-lg font-bold tracking-[-0.01em] text-ink group-hover:text-forest">
                      {entry.title}
                    </span>
                    {entry.badge && (
                      <span className="rounded-full bg-mint-soft px-2.5 py-0.5 text-sm font-semibold text-forest">
                        {entry.badge}
                      </span>
                    )}
                    {entry.meta && <span className="text-sm text-ink/65">{entry.meta}</span>}
                  </span>
                  <span className="max-w-2xl text-base leading-7 text-ink/70">{entry.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="mt-16 rounded-2xl border border-line bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold tracking-[-0.02em]">Can&rsquo;t find what you need?</h2>
        <p className="mt-2 max-w-xl text-base leading-7 text-ink/70">
          These are the guides we&rsquo;ve published so far. Tell us which platform
          you run and we&rsquo;ll point you at the right setup, or write the guide.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-6">
          <Link href="/request-integration" className={`text-base ${inlineLink}`}>
            Request an integration
          </Link>
          <Link href="/contact" className={`text-base ${inlineLink}`}>
            Talk to support
          </Link>
        </div>
      </section>
    </>
  );
}
