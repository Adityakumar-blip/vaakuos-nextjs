import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  DatabaseZap,
  KeyRound,
  PlugZap,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getIntegration, integrations } from "../integration-data";
import { PluginLogo } from "../plugin-logo";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

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

export function generateMetadata({
  params,
}: IntegrationDetailPageProps): Metadata {
  const integration = getIntegration(params.slug);

  if (!integration) {
    return {
      title: "Integration not found",
    };
  }

  return {
    title: `${integration.name} integration setup`,
    description: integration.longDescription,
    alternates: {
      canonical: `/integrations/${integration.slug}`,
    },
  };
}

export default function IntegrationDetailPage({
  params,
}: IntegrationDetailPageProps) {
  const integration = getIntegration(params.slug);

  if (!integration) {
    notFound();
  }

  const relatedIntegrations = integrations
    .filter(
      (item) =>
        item.category === integration.category && item.slug !== integration.slug,
    )
    .slice(0, 3);

  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Integrations", path: "/integrations" },
    { name: integration.name, path: `/integrations/${integration.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-background pt-24 text-foreground">
      <JsonLd data={breadcrumb} />
      <section className="border-b border-border/70">
        <div className="container mx-auto max-w-7xl px-4 py-10 md:py-14">
          <Link
            href="/integrations#plugins"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to integrations
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <PluginLogo
                  logo={integration.logo}
                  name={integration.name}
                  className="h-16 w-16"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                      {integration.category}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        integration.status === "Live"
                          ? "bg-tertiary text-foreground"
                          : integration.status === "Beta"
                            ? "bg-accent/10 text-accent"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {integration.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">
                    {integration.authMethod}
                  </p>
                </div>
              </div>

              <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
                {integration.name} integration guide
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                {integration.longDescription}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="xl" className="rounded-2xl">
                  <Link href="/demo">
                    Book setup walkthrough
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="xl"
                  className="rounded-2xl border-primary/20 bg-white/60"
                >
                  <Link href="/contact">Ask about this integration</Link>
                </Button>
              </div>
            </div>

            <aside className="border-l border-border pl-0 lg:pl-6">
              <div className="divide-y divide-border rounded-2xl border border-border bg-white/35">
                {[
                  {
                    icon: Clock3,
                    label: "Setup time",
                    value: integration.setupTime,
                  },
                  {
                    icon: KeyRound,
                    label: "Auth method",
                    value: integration.authMethod,
                  },
                  {
                    icon: DatabaseZap,
                    label: "Sync mode",
                    value: integration.sync,
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 p-4"
                    >
                      <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-1 font-semibold">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="container mx-auto grid max-w-7xl gap-12 px-4 py-14 lg:grid-cols-[minmax(0,760px)_1fr]">
        <article>
          <section className="border-b border-border pb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Overview
            </p>
            <h2 className="mt-3 text-2xl font-bold">What this integration does</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              {integration.name} sends the operational data VaakuOS needs to
              identify abandoned intent, personalize recovery, and close the
              loop when revenue is recovered. The connection is designed to stay
              close to your existing stack, so your team can keep using current
              commerce, CRM, or workflow tools while VaakuOS handles recovery
              orchestration.
            </p>
          </section>

          <section className="py-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                Setup steps
              </p>
              <h2 className="mt-3 text-2xl font-bold">Launch checklist</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Follow these steps in order. For beta or waitlist integrations,
                the VaakuOS team will confirm access before production traffic
                is enabled.
              </p>
            </div>

            <ol className="mt-8 border-l border-border">
            {integration.setupSteps.map((step, index) => (
              <li
                key={step}
                className="relative pb-8 pl-8 last:pb-0"
              >
                <span className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-background text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <p className="pt-0.5 leading-7 text-muted-foreground">{step}</p>
              </li>
            ))}
            </ol>
          </section>
        </article>

        <aside className="space-y-8 lg:pt-2">
          <section>
            <div className="mb-4 flex items-center gap-3">
              <DatabaseZap className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Data synced</h2>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {integration.dataSynced.map((item) => (
                <div key={item} className="flex items-center gap-3 py-3">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-muted-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Best for</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {integration.bestFor.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-muted px-3 py-1.5 text-sm font-semibold text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="border-t border-border pt-8">
            <div className="mb-4 flex items-center gap-3">
              <PlugZap className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Need help?</h2>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              Share your current stack and we will confirm the right setup path,
              permissions, and launch checklist for your workspace.
            </p>
            <Button asChild variant="outline" className="mt-5 rounded-2xl">
              <Link href="/contact">Talk to support</Link>
            </Button>
          </section>
        </aside>
      </section>

      {relatedIntegrations.length > 0 && (
        <section className="border-t border-border bg-white/35">
          <div className="container mx-auto max-w-7xl px-4 py-14">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
                  Related
                </p>
                <h2 className="mt-2 text-2xl font-bold">
                  More {integration.category} integrations
                </h2>
              </div>
              <Button asChild variant="outline" className="hidden rounded-2xl md:inline-flex">
                <Link href="/integrations#plugins">View all</Link>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {relatedIntegrations.map((item) => (
                <Link
                  key={item.slug}
                  href={`/integrations/${item.slug}`}
                  className="group rounded-3xl border border-border bg-background p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <PluginLogo logo={item.logo} name={item.name} />
                  <h3 className="mt-5 text-xl font-bold">{item.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
                    View setup
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
