"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Clock3 } from "lucide-react";

import type { Integration } from "./integration-data";
import { PluginLogo } from "./plugin-logo";

type PluginDirectoryProps = {
  integrations: Integration[];
};

export function PluginDirectory({ integrations }: PluginDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState("All plugins");

  const categories = useMemo(() => {
    const counts = integrations.reduce<Record<string, number>>((acc, integration) => {
      acc[integration.category] = (acc[integration.category] || 0) + 1;
      return acc;
    }, {});

    return [
      { name: "All plugins", count: integrations.length },
      ...Object.entries(counts).map(([name, count]) => ({ name, count })),
    ];
  }, [integrations]);

  const filteredIntegrations = useMemo(() => {
    if (selectedCategory === "All plugins") {
      return integrations;
    }

    return integrations.filter(
      (integration) => integration.category === selectedCategory,
    );
  }, [integrations, selectedCategory]);

  return (
    <section id="plugins" className="container mx-auto max-w-7xl px-4 py-16 sm:py-20 md:py-24">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Plugin library
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Modern connectors with the details your team needs.
          </h2>
        </div>

        <label className="w-full max-w-sm">
          <span className="mb-2 block text-sm font-semibold text-muted-foreground">
            Filter by category
          </span>
          <span className="relative block">
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="h-12 w-full appearance-none rounded-2xl border border-border bg-white/70 px-4 pr-11 text-sm font-semibold text-foreground shadow-sm outline-none transition-colors hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/15"
              aria-label="Filter plugins by category"
            >
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </span>
        </label>
      </div>

      <div className="mb-5 flex items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>
          Showing {filteredIntegrations.length} of {integrations.length} plugins
        </span>
        <span className="font-semibold text-foreground">{selectedCategory}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {filteredIntegrations.map((integration) => (
          <Link
            key={integration.name}
            href={`/integrations/${integration.slug}`}
            className="group flex flex-col items-center gap-3 rounded-3xl border border-border bg-card p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl sm:items-stretch sm:gap-0 sm:p-5 sm:text-left"
          >
            <div className="flex w-full items-center justify-center sm:items-start sm:justify-between sm:gap-4">
              <PluginLogo logo={integration.logo} name={integration.name} />
              <span
                className={`hidden items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold sm:inline-flex ${
                  integration.status === "Live"
                    ? "bg-tertiary text-foreground"
                    : integration.status === "Beta"
                      ? "bg-accent/10 text-accent"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {integration.status === "Live" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/70" />
                )}
                {integration.status}
              </span>
            </div>
            <div className="sm:mt-5">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <h3 className="text-sm font-bold sm:text-xl">
                  {integration.name}
                </h3>
                <span className="hidden rounded-full bg-muted px-2.5 py-1 text-xs font-bold text-muted-foreground sm:inline-block">
                  {integration.category}
                </span>
              </div>
              <p className="mt-3 hidden min-h-[3rem] text-sm leading-6 text-muted-foreground sm:block">
                {integration.description}
              </p>
            </div>
            <div className="mt-5 hidden w-full items-center justify-between border-t border-border pt-4 sm:flex">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <Clock3 className="h-4 w-4 text-primary" />
                {integration.sync}
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
