import type { Metadata } from "next";
import Link from "next/link";
import { WalkthroughButton } from "@/components/walkthrough-button";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL, breadcrumbSchema } from "@/lib/seo";
import { integrations } from "./integration-data";
import { PluginDirectory } from "./plugin-directory";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Shopify, WooCommerce, HubSpot, Salesforce and more so VaakuOS knows when to message a customer on WhatsApp, email, Instagram or Messenger.",
  alternates: {
    canonical: "/integrations",
  },
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "VaakuOS integrations",
  itemListElement: integrations.map((integration, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: `${integration.name} integration`,
    url: `${SITE_URL}/integrations/${integration.slug}`,
  })),
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Integrations", path: "/integrations" },
]);

const heading = "font-display font-bold leading-[1.02] tracking-[-0.03em]";
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const inlineLink = `font-semibold underline underline-offset-4 transition-colors ${focusRing}`;

const steps = [
  {
    title: "Connect",
    body: "Install a native plugin or authorize through OAuth. Most connections take a few minutes and no code.",
  },
  {
    title: "Sync",
    body: "VaakuOS reads carts, contacts, orders and leads as they happen and keeps one record per customer.",
  },
  {
    title: "Message",
    body: "Trigger a follow-up on WhatsApp, email, Instagram or Messenger the moment something changes.",
  },
];

export default function IntegrationsPage() {
  return (
    <>
      <JsonLd data={[itemListSchema, breadcrumb]} />

      <section className="px-4 pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
            <h1 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[2rem]">
              Connect the tools you already run, so VaakuOS knows when to message a customer.
            </h1>
            <p className="max-w-md text-lg leading-8 text-ink/70 md:justify-self-end">
              An order, a booking or a new lead can start a rule. Find your
              platform below to see what data moves and how to set it up.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-center sm:gap-6">
            <WalkthroughButton />
            <Link
              href="/request-integration"
              className={`self-start text-base text-ink decoration-ink/25 hover:decoration-ink sm:self-auto ${inlineLink}`}
            >
              Request an integration
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <PluginDirectory integrations={integrations} />
        </div>
      </section>

      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${heading} max-w-3xl text-4xl text-ink md:text-6xl`}>
            From connector to a message a customer sees.
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step, i) => (
              <li key={step.title} className="relative pl-16 md:pl-0">
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[-2.5rem] left-6 top-12 w-px bg-line md:bottom-auto md:left-14 md:right-[-2rem] md:top-6 md:h-px md:w-auto"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-forest font-display text-xl font-bold text-paper md:static"
                >
                  {i + 1}
                </span>
                <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink md:mt-7">{step.title}</h3>
                <p className="mt-3 text-base leading-7 text-ink/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-forest px-4 py-20 text-paper md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${heading} max-w-4xl text-4xl leading-[1.12] md:text-7xl md:leading-[1.08]`}>
            Don&rsquo;t see your tool? Tell us and we&rsquo;ll scope it.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-8 text-paper/80">
            Share what you run and what should trigger a message. We reply
            within one business day.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <WalkthroughButton tone="light" />
            <Link
              href="/request-integration"
              className={`self-start text-base text-paper decoration-paper/40 hover:decoration-paper sm:self-auto ${inlineLink}`}
            >
              Request an integration
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
