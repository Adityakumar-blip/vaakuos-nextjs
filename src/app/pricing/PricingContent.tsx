"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Info, Minus, Plus, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useBookDemo } from "@/contexts/book-demo-context";
import { pricingService } from "@/services/pricing-service";
import type { PricingFeatureItem, PricingPlan } from "@/types/pricing";

type BillingCycle = "monthly" | "yearly";

/** Convert paise to a localized rupee string (99900 → "999"). */
const formatRupees = (paise: number) =>
  Math.round(paise / 100).toLocaleString("en-IN");

/** Format raw numeric display values with Indian grouping (10000 → 10,000). */
const formatDisplayValue = (item: PricingFeatureItem) => {
  if (typeof item.value === "number" && item.value !== -1) {
    return item.value.toLocaleString("en-IN");
  }
  return item.display_value;
};

const isUnlimited = (item: PricingFeatureItem) =>
  item.value === -1 || item.display_value === "Unlimited";

const planFeature = (plan: PricingPlan, code: string) =>
  plan.features.find((f) => f.code === code);

/** Cell renderer for the comparison table. */
const ComparisonCell = ({ item }: { item?: PricingFeatureItem }) => {
  if (!item || item.value === false) {
    return <Minus className="h-4 w-4 text-muted-foreground/30" />;
  }
  // Empty-string values are flag-style features ("Dedicated Solution Expert")
  if (item.value === true || item.value === "") {
    return <Check className="h-[18px] w-[18px] text-primary" strokeWidth={2.5} />;
  }
  if (isUnlimited(item)) {
    return <span className="text-sm font-semibold text-primary">Unlimited</span>;
  }
  return (
    <span className="text-sm font-medium text-foreground/90">
      {formatDisplayValue(item)}
    </span>
  );
};

export function PricingContent() {
  const router = useRouter();
  const { openBookDemo } = useBookDemo();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const { data, isLoading } = useQuery({
    queryKey: ["public-pricing"],
    queryFn: pricingService.getPricing,
  });

  const plans = data?.plans?.[billingCycle] ?? [];
  const yearlyPlans = data?.plans?.yearly ?? [];
  const maxYearlyDiscount = Math.max(
    0,
    ...yearlyPlans.map((p) => p.yearlyDiscount || 0),
  );

  // Highlight the "Growth" plan; fall back to the middle card.
  const highlightedIndex = (() => {
    const growth = plans.findIndex((p) => p.name.toLowerCase() === "growth");
    if (growth !== -1) return growth;
    return plans.length >= 3 ? 1 : -1;
  })();

  // Build comparison rows dynamically from the feature catalog the plans use:
  // metered limits (numbers/strings) first, then boolean capabilities.
  const featureRows = (() => {
    const seen = new Map<string, PricingFeatureItem>();
    for (const plan of plans) {
      for (const f of plan.features) {
        if (!seen.has(f.code)) seen.set(f.code, f);
      }
    }
    const all = Array.from(seen.values());
    // Flags = booleans and empty-string markers (e.g. "Dedicated Solution Expert")
    const isFlag = (f: PricingFeatureItem) =>
      typeof f.value === "boolean" || f.value === "";
    return {
      limits: all.filter((f) => !isFlag(f)),
      capabilities: all.filter(isFlag),
    };
  })();

  const comparisonGroups = [
    { title: "Usage & limits", rows: featureRows.limits },
    { title: "Features & support", rows: featureRows.capabilities },
  ].filter((g) => g.rows.length > 0);

  // Shared column template so the header, category, and feature rows align.
  const comparisonCols = {
    gridTemplateColumns: `minmax(200px, 1.5fr) repeat(${plans.length}, minmax(130px, 1fr))`,
  };

  const hasAddons = (data?.addons?.length ?? 0) > 0;

  // Selected add-ons ride along into the signup funnel as `addonIds`,
  // which the app passes to POST /subscriptions (CreateSubscriptionDto.addon_ids).
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  const toggleAddon = (addonId: string) =>
    setSelectedAddonIds((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId],
    );

  const selectedAddons = (data?.addons ?? []).filter((a) =>
    selectedAddonIds.includes(a.id),
  );
  const addonMonthlyTotal = selectedAddons
    .filter((a) => a.type === "recurring")
    .reduce((sum, a) => sum + a.amount, 0);
  const addonOneTimeTotal = selectedAddons
    .filter((a) => a.type !== "recurring")
    .reduce((sum, a) => sum + a.amount, 0);

  const handleGetStarted = (plan: PricingPlan) => {
    const params = new URLSearchParams({
      planId: plan.id,
      billingCycle,
    });
    if (selectedAddonIds.length > 0) {
      params.set("addonIds", selectedAddonIds.join(","));
    }
    router.push(`/login?${params.toString()}`);
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden pb-24 pt-32">
      {/* Background — same language as the hero: soft gradient + faint grid */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--muted))_45%,hsl(var(--background))_100%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(circle_at_18%_12%,hsl(var(--tertiary)/0.35),transparent_32%),radial-gradient(circle_at_84%_8%,hsl(var(--primary)/0.14),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[640px] opacity-[0.18] [background-image:linear-gradient(hsl(var(--foreground)/0.08)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.08)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(180deg,black,transparent)]" />

      {/* Same container as the navbar so wide sections align with it */}
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
            Pricing
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Plans that scale with your recovery engine.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            Start free, upgrade when you grow. Every plan includes the core
            VaakuOS workflow — no setup fees, cancel anytime.
          </p>

          {/* Billing cycle toggle */}
          <div className="mt-8 inline-flex items-center rounded-full border border-border bg-secondary/60 p-1">
            {(["monthly", "yearly"] as const).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBillingCycle(cycle)}
                aria-pressed={billingCycle === cycle}
                className={cn(
                  "flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold transition-all duration-200",
                  billingCycle === cycle
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {cycle === "monthly" ? "Monthly" : "Yearly"}
                {cycle === "yearly" && maxYearlyDiscount > 0 && (
                  <span className="rounded-full bg-tertiary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-tertiary-foreground">
                    Save {maxYearlyDiscount}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing cards */}
        <div
          className={cn(
            "mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3",
            hasAddons ? "mb-8" : "mb-24",
          )}
        >
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-[520px] animate-pulse rounded-2xl border border-border bg-card/60"
              />
            ))
          ) : plans.length > 0 ? (
            plans.map((plan, index) => {
              const highlighted = index === highlightedIndex;
              const isFree = plan.amount === 0;
              const monthlyPaise =
                billingCycle === "yearly"
                  ? plan.discountedMonthlyPrice
                  : plan.amount;

              return (
                <div
                  key={plan.id}
                  className={cn(
                    "relative flex flex-col rounded-2xl border bg-card p-8 transition-shadow duration-300",
                    highlighted
                      ? "border-primary/50 shadow-xl shadow-primary/10 ring-1 ring-primary/25"
                      : "border-border shadow-sm hover:shadow-lg",
                  )}
                >
                  {highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-md">
                      Most popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground">
                      {plan.name}
                    </h3>
                    {plan.subtitle && (
                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                        {plan.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-4xl font-semibold tracking-tight text-foreground">
                        ₹{formatRupees(monthlyPaise)}
                      </span>
                      {!isFree && (
                        <span className="text-sm font-medium text-muted-foreground">
                          /month
                        </span>
                      )}
                    </div>
                    {!isFree && billingCycle === "yearly" && (
                      <p className="mt-2 text-xs font-semibold text-primary">
                        Billed ₹{formatRupees(plan.yearlyPrice)} per year
                      </p>
                    )}
                    {!isFree &&
                      billingCycle === "monthly" &&
                      plan.isYearly &&
                      plan.yearlyDiscount > 0 && (
                        <p className="mt-2 text-xs font-medium text-muted-foreground">
                          Save {plan.yearlyDiscount}% with yearly billing
                        </p>
                      )}
                    {isFree && (
                      <p className="mt-2 text-xs font-medium text-muted-foreground">
                        Free forever — no card required
                      </p>
                    )}
                    {addonMonthlyTotal > 0 && (
                      <p className="mt-2 text-xs font-semibold text-accent">
                        + ₹{formatRupees(addonMonthlyTotal)}/mo in add-ons
                      </p>
                    )}
                    {addonOneTimeTotal > 0 && (
                      <p className="mt-1 text-xs font-semibold text-accent">
                        + ₹{formatRupees(addonOneTimeTotal)} one-time add-ons
                      </p>
                    )}
                  </div>

                  <Button
                    size="lg"
                    variant={highlighted ? "default" : "outline"}
                    className={cn(
                      "group h-12 w-full rounded-lg text-sm font-semibold",
                      highlighted
                        ? "shadow-lg shadow-primary/15"
                        : "border-foreground/15 bg-background text-foreground hover:border-primary/25 hover:bg-secondary hover:text-foreground",
                    )}
                    onClick={() => handleGetStarted(plan)}
                  >
                    {isFree ? "Start for free" : "Get started"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>

                  <div className="mt-8 flex-grow border-t border-border pt-7">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      What&apos;s included
                    </p>
                    <ul className="space-y-3.5">
                      {plan.features.map((feature) => {
                        // value === 0 on a limit (e.g. 0 AI replies) reads as "not included"
                        const excluded =
                          feature.value === false || feature.value === 0;
                        // Empty-string values (e.g. "Dedicated Solution Expert")
                        // are flags — render the label alone, like booleans.
                        const labelOnly =
                          typeof feature.value === "boolean" ||
                          feature.value === "" ||
                          excluded;
                        return (
                          <li
                            key={feature.code}
                            className="flex items-center gap-3 text-sm"
                          >
                            <span
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded-md",
                                excluded
                                  ? "bg-muted text-muted-foreground/40"
                                  : "bg-primary/10 text-primary",
                              )}
                            >
                              {excluded ? (
                                <Minus className="h-3 w-3" strokeWidth={3} />
                              ) : (
                                <Check className="h-3 w-3" strokeWidth={3} />
                              )}
                            </span>
                            <span
                              className={cn(
                                "font-medium leading-snug",
                                excluded
                                  ? "text-muted-foreground/60"
                                  : "text-foreground/85",
                              )}
                            >
                              {labelOnly ? (
                                feature.label
                              ) : (
                                <>
                                  <span className="font-semibold text-foreground">
                                    {isUnlimited(feature)
                                      ? "Unlimited"
                                      : formatDisplayValue(feature)}
                                  </span>{" "}
                                  {feature.label.toLowerCase()}
                                </>
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full rounded-2xl border border-border bg-card py-20 text-center shadow-sm">
              <p className="text-base font-medium text-foreground">
                {billingCycle === "yearly"
                  ? "Yearly billing isn't available yet."
                  : "No plans are available right now."}
              </p>
              {billingCycle === "yearly" && (
                <Button
                  variant="outline"
                  className="mt-4 rounded-lg"
                  onClick={() => setBillingCycle("monthly")}
                >
                  View monthly plans
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Add-ons — selectable power-up strips; chosen IDs are passed into the
            signup funnel and applied at checkout via POST /subscriptions */}
        {hasAddons && (
          <ScrollReveal>
            <div className="mx-auto mb-24 max-w-6xl space-y-4">
              {data!.addons.map((addon) => {
                const selected = selectedAddonIds.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    className={cn(
                      "flex flex-col gap-5 rounded-2xl border bg-card p-6 transition-all duration-200 md:flex-row md:items-center md:justify-between md:px-8",
                      selected
                        ? "border-primary/50 shadow-lg shadow-primary/10 ring-1 ring-primary/25"
                        : "border-border shadow-sm hover:shadow-lg",
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={cn(
                          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                          selected
                            ? "bg-primary text-primary-foreground"
                            : "bg-tertiary text-tertiary-foreground",
                        )}
                      >
                        <Sparkles className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold text-foreground">
                            {addon.name}
                          </h3>
                          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary-foreground">
                            Add-on · works with every plan
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {selected
                            ? "Will be applied at checkout with the plan you pick below."
                            : addon.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 md:shrink-0">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-semibold tracking-tight text-foreground">
                          ₹{formatRupees(addon.amount)}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                          {addon.type === "recurring" ? "/month" : "one-time"}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant={selected ? "default" : "outline"}
                        aria-pressed={selected}
                        className={cn(
                          "h-9 shrink-0 rounded-lg px-4 text-xs font-semibold",
                          !selected &&
                            "border-foreground/15 bg-background hover:bg-secondary",
                        )}
                        onClick={() => toggleAddon(addon.id)}
                      >
                        {selected ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5" />
                            Add
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        )}

        {/* Comparison table — borderless rows, full-height tinted "popular" column.
            Not wrapped in ScrollReveal: its overflow:hidden breaks the sticky header. */}
        {plans.length > 1 && comparisonGroups.length > 0 && (
          <TooltipProvider delayDuration={150}>
            <div>
              <div className="mb-12 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                  Compare plans
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  Every detail, side by side.
                </h2>
              </div>

              {/* Horizontal scroll on mobile; sticky header from md up */}
              <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0">
                <div className="min-w-[640px]">
                  {/* Plan header */}
                  <div
                    className="z-20 grid border-b border-border bg-background/90 backdrop-blur-md md:sticky md:top-16"
                    style={comparisonCols}
                  >
                    <div className="flex items-end px-4 pb-4">
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        Features
                      </span>
                    </div>
                    {plans.map((plan, index) => {
                      const highlighted = index === highlightedIndex;
                      return (
                        <div
                          key={plan.id}
                          className={cn(
                            "flex flex-col items-center gap-1 px-4 pb-4 pt-5 text-center",
                            highlighted &&
                              "rounded-t-2xl border-x border-t border-primary/15 bg-primary/[0.05]",
                          )}
                        >
                          {highlighted && (
                            <span className="mb-1 rounded-full bg-primary px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-primary-foreground">
                              Popular
                            </span>
                          )}
                          <span className="text-sm font-semibold text-foreground">
                            {plan.name}
                          </span>
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-xl font-semibold tracking-tight text-foreground">
                              ₹
                              {formatRupees(
                                billingCycle === "yearly"
                                  ? plan.discountedMonthlyPrice
                                  : plan.amount,
                              )}
                            </span>
                            <span className="text-xs font-medium text-muted-foreground">
                              /mo
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant={highlighted ? "default" : "outline"}
                            className={cn(
                              "mt-2 h-8 w-full max-w-[120px] rounded-lg text-xs font-semibold",
                              !highlighted &&
                                "border-foreground/15 bg-background hover:bg-secondary",
                            )}
                            onClick={() => handleGetStarted(plan)}
                          >
                            Choose
                          </Button>
                        </div>
                      );
                    })}
                  </div>

                  {comparisonGroups.map((group) => (
                    <div key={group.title}>
                      {/* Category label row — tint continues through the popular column */}
                      <div className="grid" style={comparisonCols}>
                        <div className="px-4 pb-3 pt-8">
                          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                            {group.title}
                          </h3>
                        </div>
                        {plans.map((plan, index) => (
                          <div
                            key={plan.id}
                            className={cn(
                              index === highlightedIndex &&
                                "border-x border-primary/15 bg-primary/[0.05]",
                            )}
                          />
                        ))}
                      </div>

                      {group.rows.map((row) => (
                        <div
                          key={row.code}
                          className="grid border-t border-border/60 transition-colors hover:bg-muted/40"
                          style={comparisonCols}
                        >
                          <div className="flex items-center gap-1.5 px-4 py-4">
                            <span className="text-sm font-medium text-foreground/85">
                              {row.label}
                            </span>
                            {row.description && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    aria-label={`About ${row.label}`}
                                    className="text-muted-foreground/40 transition-colors hover:text-muted-foreground"
                                  >
                                    <Info className="h-3.5 w-3.5" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="top"
                                  className="max-w-[240px] text-xs leading-5"
                                >
                                  {row.description}
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                          {plans.map((plan, index) => (
                            <div
                              key={plan.id}
                              className={cn(
                                "flex items-center justify-center px-4 py-4",
                                index === highlightedIndex &&
                                  "border-x border-primary/15 bg-primary/[0.05]",
                              )}
                            >
                              <ComparisonCell item={planFeature(plan, row.code)} />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* Bottom cap — closes the popular column outline */}
                  <div className="grid border-t border-border/60" style={comparisonCols}>
                    <div />
                    {plans.map((plan, index) => (
                      <div
                        key={plan.id}
                        className={cn(
                          "h-4",
                          index === highlightedIndex &&
                            "rounded-b-2xl border-x border-b border-primary/15 bg-primary/[0.05]",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TooltipProvider>
        )}

        {/* Custom plan CTA */}
        <ScrollReveal>
          <div className="mt-16">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-card p-8 shadow-sm md:flex-row md:p-10">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  Need higher limits or a custom plan?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground md:text-base">
                  Talk to us about enterprise volume, dedicated support, and
                  custom integrations for your team.
                </p>
              </div>
              <Button
                size="lg"
                className="group h-12 shrink-0 rounded-lg px-7 text-sm font-semibold shadow-lg shadow-primary/15"
                onClick={openBookDemo}
              >
                Book Live Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
