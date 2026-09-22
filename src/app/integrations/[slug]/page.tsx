import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WalkthroughButton } from "@/components/walkthrough-button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { getIntegration, integrations, type IntegrationStatus } from "../integration-data";
import { PluginLogo } from "../plugin-logo";

type IntegrationDetailPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return integrations.map((integration) => ({
    slug: integration.slug,
  }));
}

export function generateMetadata({ params }: IntegrationDetailPageProps): Metadata {
  const integration = getIntegration(params.slug);

  if (!integration) {
    return {
      title: "Integration not found",
    };
  }

  return {
    title: `${integration.name} integration`,
    description: integration.longDescription,
    alternates: {
      canonical: `/integrations/${integration.slug}`,
    },
  };
}

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const inlineLink = `font-semibold underline underline-offset-4 transition-colors ${focusRing}`;

const statusTone: Record<IntegrationStatus, string> = {
  Live: "text-forest",
  Beta: "text-ink/70",
  "Coming soon": "text-ink/65",
};

export default function IntegrationDetailPage({ params }: IntegrationDetailPageProps) {
  const integration = getIntegration(params.slug);

  if (!integration) {
    notFound();
  }

  const related = integrations
    .filter((item) => item.category === integration.category && item.slug !== integration.slug)
    .slice(0, 3);

  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Integrations", path: "/integrations" },
    { name: integration.name, path: `/integrations/${integration.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />

      <section className="px-4 pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <Link href="/integrations" className={`text-sm text-ink/65 decoration-ink/25 hover:decoration-ink ${inlineLink}`}>
            Browse integrations
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <PluginLogo logo={integration.logo} name={integration.name} className="h-16 w-16" priority />
            <div>
              <p className="text-sm text-ink/65">
                {integration.category} &middot; {integration.flow}
              </p>
              <p className={`text-sm font-semibold ${statusTone[integration.status]}`}>{integration.status}</p>
            </div>
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-ink md:text-6xl">
            Connect {integration.name} to VaakuOS
          </h1>
          <p className="mt-6 max-w-prose text-lg leading-8 text-ink/70">{integration.longDescription}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
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
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-ink md:text-4xl">Setup steps</h2>
            <ol className="mt-8 border-l border-line">
              {integration.setupSteps.map((step, index) => (
                <li key={step} className="relative pb-8 pl-8 last:pb-0">
                  <span className="absolute -left-5 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-forest font-display text-sm font-bold text-paper">
                    {index + 1}
                  </span>
                  <p className="pt-1 leading-7 text-ink/70">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-10">
            <div>
              <h2 className="font-display text-xl font-bold tracking-[-0.01em] text-ink">Data synced</h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {integration.dataSynced.map((item) => (
                  <li key={item} className="py-3 text-base text-ink/70">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold tracking-[-0.01em] text-ink">Setup details</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-line pb-3">
                  <dt className="text-ink/65">Setup time</dt>
                  <dd className="font-semibold text-ink">{integration.setupTime}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-3">
                  <dt className="text-ink/65">Auth method</dt>
                  <dd className="font-semibold text-ink">{integration.authMethod}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink/65">Sync mode</dt>
                  <dd className="font-semibold text-ink">{integration.sync}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold tracking-[-0.01em] text-ink">Best for</h2>
              <p className="mt-4 text-base leading-7 text-ink/70">{integration.bestFor.join(", ")}</p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line px-4 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-display text-3xl font-bold tracking-[-0.02em] text-ink md:text-4xl">
              More {integration.category.toLowerCase()} integrations
            </h2>
            <ul className="mt-8">
              {related.map((item) => (
                <li key={item.slug} className="border-t border-line py-6 first:border-t-0">
                  <Link href={`/integrations/${item.slug}`} className={`group flex items-center gap-5 rounded-lg ${focusRing}`}>
                    <PluginLogo logo={item.logo} name={item.name} />
                    <div>
                      <p className="font-display text-xl font-bold tracking-[-0.02em] text-ink group-hover:underline">
                        {item.name}
                      </p>
                      <p className="mt-1 text-sm text-ink/65">{item.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
