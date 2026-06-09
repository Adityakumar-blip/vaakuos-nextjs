import Link from "next/link";
import { ArrowRight, PlugZap } from "lucide-react";
import { PluginLogo } from "@/app/integrations/plugin-logo";
import type { IntegrationLogo } from "@/app/integrations/integration-data";

const integrations = [
  { name: "Shopify", category: "Commerce", logo: "shopify" },
  { name: "WooCommerce", category: "Commerce", logo: "woocommerce" },
  { name: "Google Sheets", category: "Data", logo: "sheets" },
  { name: "Wix", category: "Commerce", logo: "wix" },
] satisfies Array<{ name: string; category: string; logo: IntegrationLogo }>;

const syncSteps = [
  "Capture abandoned checkout events",
  "Enrich with customer and product context",
  "Stop recovery when the order is confirmed",
];

export const IntegrationsSection = () => {
  return (
    <section
      id="integrations"
      className="relative overflow-hidden px-4 py-16 sm:py-20 md:py-28"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
              <PlugZap className="h-3.5 w-3.5" />
              Commerce stack ready
            </div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              Plug VaakuOS into the tools that already run your store.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Connect with your favorite platforms, sync data automatically, and
              keep recovery workflows aligned with the real order state.
            </p>

            <div className="mt-8">
              {syncSteps.map((step, index) => (
                <div key={step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm shadow-primary/20">
                      {index + 1}
                    </span>
                    {index < syncSteps.length - 1 && (
                      <span
                        className="my-1 w-px flex-1 bg-gradient-to-b from-primary/30 to-border"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <p
                    className={`pt-1.5 text-sm font-medium text-foreground ${
                      index < syncSteps.length - 1 ? "pb-6" : ""
                    }`}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/integrations"
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-card px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              View all integrations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                {integrations.length} live connections
              </span>
              <p className="text-xs font-medium text-muted-foreground">
                Commerce, data &amp; ops
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 rounded-2xl border border-border bg-card p-2.5 shadow-sm sm:gap-3 sm:p-4 md:p-5">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="group relative flex flex-col justify-between gap-6 overflow-hidden rounded-xl border border-border bg-background p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 sm:gap-8 sm:p-5"
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <div className="flex items-start justify-between gap-3">
                    <PluginLogo
                      logo={integration.logo}
                      name={integration.name}
                      className="h-11 w-11 rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-12 sm:w-12"
                    />
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Live
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground sm:text-lg">
                      {integration.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                      {integration.category} sync
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
