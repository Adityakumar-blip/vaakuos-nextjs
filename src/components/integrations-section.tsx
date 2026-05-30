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
      className="relative overflow-hidden px-4 py-20 md:py-28"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">
              <PlugZap className="h-3.5 w-3.5" />
              Commerce stack ready
            </div>
            <h2 className="text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
              Plug VaakuOS into the tools that already run your store.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Connect with your favorite platforms, sync data automatically, and
              keep recovery workflows aligned with the real order state.
            </p>

            <div className="mt-8 space-y-2">
              {syncSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 text-sm font-medium text-foreground"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  {step}
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
              <p></p>
              <p className="text-xs font-medium text-muted-foreground">
                Commerce, data, and ops
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm sm:grid-cols-2 md:p-5">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="group flex min-h-[166px] flex-col justify-between rounded-xl border border-border bg-background p-5 transition-colors duration-300 hover:border-primary/25 hover:bg-card"
                >
                  <div className="flex items-start justify-between gap-4">
                    <PluginLogo
                      logo={integration.logo}
                      name={integration.name}
                      className="h-12 w-12 rounded-xl"
                    />
                    <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                      Live
                    </span>
                  </div>
                  <div className="mt-10">
                    <h3 className="text-lg font-semibold text-foreground">
                      {integration.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {integration.category} sync
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="mx-auto mt-4 max-w-lg rounded-lg border border-border bg-muted/40 px-5 py-4">
              <p className="text-sm leading-6 text-muted-foreground">
                Unified recovery events flow back into VaakuOS dashboards, revenue
                attribution, and automated handoff rules.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
