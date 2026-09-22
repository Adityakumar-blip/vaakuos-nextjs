"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Info, Minus, Plus, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WalkthroughButton } from "@/components/walkthrough-button";
import { pricingService } from "@/services/pricing-service";
import type { PricingFeatureItem, PricingPlan } from "@/types/pricing";

type BillingCycle = "monthly" | "yearly";

const heading = "font-display font-bold leading-[1.02] tracking-[-0.03em]";
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

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
    return <Minus className="h-4 w-4 text-ink/25" aria-hidden="true" />;
  }
  // Empty-string values are flag-style features ("Dedicated Solution Expert")
  if (item.value === true || item.value === "") {
    return <Check className="h-[18px] w-[18px] text-forest" strokeWidth={2.5} aria-hidden="true" />;
  }
  if (isUnlimited(item)) {
    return <span className="text-sm font-semibold text-forest">Unlimited</span>;
  }
  return (
    <span className="text-sm font-medium text-ink/80">
      {formatDisplayValue(item)}
    </span>
  );
};

/** Mirrors the real plan card's shape so layout doesn't shift once data loads. */
function PlanCardSkeleton() {
  return (
    <div className="flex flex-col rounded-[1.75rem] border border-line bg-white p-8" aria-hidden="true">
      <div className="mb-6 space-y-2">
        <div className="h-5 w-24 animate-pulse rounded bg-ink/10" />
        <div className="h-4 w-36 animate-pulse rounded bg-ink/10" />
      </div>
      <div className="mb-8 space-y-2">
        <div className="h-9 w-28 animate-pulse rounded bg-ink/10" />
        <div className="h-3 w-32 animate-pulse rounded bg-ink/10" />
      </div>
      <div className="h-12 w-full animate-pulse rounded-full bg-ink/10" />
      <div className="mt-8 flex-grow space-y-3.5 border-t border-line pt-7">
        <div className="h-3 w-24 animate-pulse rounded bg-ink/10" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-5 w-5 shrink-0 animate-pulse rounded-md bg-ink/10" />
            <div className="h-3 flex-1 animate-pulse rounded bg-ink/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PricingContent() {
  const router = useRouter();
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
    { title: "Usage and limits", rows: featureRows.limits },
    { title: "Features and support", rows: featureRows.capabilities },
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
    <div className="bg-paper font-display text-ink">
      {/* Header */}
      <section className="px-4 pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
            <h1 className={`${heading} text-4xl text-ink md:text-6xl`}>
              Plans that scale with every channel your customers use.
            </h1>
            <p className="max-w-md text-lg leading-8 text-ink/70 md:justify-self-end">
              Start free, upgrade when you grow. Every plan covers WhatsApp,
              email, Instagram and Messenger, with no setup fees and no
              lock-in.
            </p>
          </div>

          {/* Billing cycle toggle */}
          <div className="mt-10 inline-flex items-center gap-1 rounded-full border border-line p-1">
            {(["monthly", "yearly"] as const).map((cycle) => (
              <button
                key={cycle}
                type="button"
                onClick={() => setBillingCycle(cycle)}
                aria-pressed={billingCycle === cycle}
                className={cn(
                  `flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold transition-colors ${focusRing}`,
                  billingCycle === cycle
                    ? "bg-ink text-paper"
                    : "text-ink/65 hover:text-ink",
                )}
              >
                {cycle === "monthly" ? "Monthly" : "Yearly"}
                {cycle === "yearly" && maxYearlyDiscount > 0 && (
                  <span className="rounded-full bg-mint-soft px-2 py-0.5 text-xs font-semibold text-forest">
                    Save {maxYearlyDiscount}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="px-4">
        <div className={cn("mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3", hasAddons ? "mb-8" : "mb-24")}>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <PlanCardSkeleton key={i} />)
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
                    "flex flex-col rounded-[1.75rem] p-8",
                    highlighted ? "bg-forest text-paper" : "border border-line bg-white text-ink",
                  )}
                >
                  <div className="mb-6">
                    {highlighted && (
                      <span className="mb-3 inline-flex rounded-full bg-paper/15 px-3 py-1 text-xs font-semibold text-paper">
                        Recommended
                      </span>
                    )}
                    <h3 className={cn("font-display text-2xl font-bold tracking-[-0.02em]", highlighted ? "text-paper" : "text-ink")}>
                      {plan.name}
                    </h3>
                    {plan.subtitle && (
                      <p className={cn("mt-1.5 text-sm leading-6", highlighted ? "text-paper/75" : "text-ink/65")}>
                        {plan.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-4xl font-bold tracking-[-0.02em]">
                        ₹{formatRupees(monthlyPaise)}
                      </span>
                      {!isFree && (
                        <span className={cn("text-sm font-medium", highlighted ? "text-paper/75" : "text-ink/65")}>
                          /month
                        </span>
                      )}
                    </div>
                    {!isFree && billingCycle === "yearly" && (
                      <p className={cn("mt-2 text-xs font-semibold", highlighted ? "text-paper/85" : "text-forest")}>
                        Billed ₹{formatRupees(plan.yearlyPrice)} per year
                      </p>
                    )}
                    {!isFree &&
                      billingCycle === "monthly" &&
                      plan.isYearly &&
                      plan.yearlyDiscount > 0 && (
                        <p className={cn("mt-2 text-xs font-medium", highlighted ? "text-paper/75" : "text-ink/65")}>
                          Save {plan.yearlyDiscount}% with yearly billing
                        </p>
                      )}
                    {isFree && (
                      <p className={cn("mt-2 text-xs font-medium", highlighted ? "text-paper/75" : "text-ink/65")}>
                        Free forever, no card required
                      </p>
                    )}
                    {addonMonthlyTotal > 0 && (
                      <p className={cn("mt-2 text-xs font-semibold", highlighted ? "text-paper" : "text-forest")}>
                        + ₹{formatRupees(addonMonthlyTotal)}/mo in add-ons
                      </p>
                    )}
                    {addonOneTimeTotal > 0 && (
                      <p className={cn("mt-1 text-xs font-semibold", highlighted ? "text-paper" : "text-forest")}>
                        + ₹{formatRupees(addonOneTimeTotal)} one-time add-ons
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleGetStarted(plan)}
                    className={cn(
                      "h-12 w-full rounded-full text-sm font-semibold transition-colors",
                      highlighted
                        ? `bg-paper text-ink hover:bg-mint ${focusRing} focus-visible:outline-paper`
                        : `bg-forest text-paper hover:bg-ink ${focusRing}`,
                    )}
                  >
                    {isFree ? "Start for free" : "Get started"}
                  </button>

                  <div className={cn("mt-8 flex-grow border-t pt-7", highlighted ? "border-paper/20" : "border-line")}>
                    <p className={cn("mb-4 text-sm font-semibold", highlighted ? "text-paper/75" : "text-ink/65")}>
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
                          <li key={feature.code} className="flex items-center gap-3 text-sm">
                            <span
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded-md",
                                excluded
                                  ? highlighted
                                    ? "bg-paper/10 text-paper/40"
                                    : "bg-line/40 text-ink/35"
                                  : highlighted
                                    ? "bg-paper/15 text-paper"
                                    : "bg-mint-soft text-forest",
                              )}
                            >
                              {excluded ? (
                                <Minus className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                              ) : (
                                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                              )}
                            </span>
                            <span
                              className={cn(
                                "font-medium leading-snug",
                                excluded
                                  ? highlighted ? "text-paper/45" : "text-ink/45"
                                  : highlighted ? "text-paper/90" : "text-ink/85",
                              )}
                            >
                              {labelOnly ? (
                                feature.label
                              ) : (
                                <>
                                  <span className={cn("font-semibold", highlighted ? "text-paper" : "text-ink")}>
                                    {isUnlimited(feature) ? "Unlimited" : formatDisplayValue(feature)}
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
            <div className="col-span-full rounded-[1.75rem] border border-line bg-white py-20 text-center">
              <p className="text-base font-medium text-ink">
                {billingCycle === "yearly"
                  ? "Yearly billing isn't available yet."
                  : "No plans are available right now."}
              </p>
              {billingCycle === "yearly" && (
                <button
                  type="button"
                  onClick={() => setBillingCycle("monthly")}
                  className={`mt-4 rounded-full border border-line px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-paper ${focusRing}`}
                >
                  View monthly plans
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Add-ons — selectable power-up strips; chosen IDs are passed into the
          signup funnel and applied at checkout via POST /subscriptions */}
      {hasAddons && (
        <section className="px-4">
          <div className="mx-auto mb-24 max-w-6xl space-y-4">
            {data!.addons.map((addon) => {
              const selected = selectedAddonIds.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  className={cn(
                    "flex flex-col gap-5 rounded-[1.75rem] border bg-white p-6 transition-colors md:flex-row md:items-center md:justify-between md:px-8",
                    selected ? "border-forest" : "border-line",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                        selected ? "bg-forest text-paper" : "bg-mint-soft text-forest",
                      )}
                    >
                      <Sparkles className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-ink">{addon.name}</h3>
                        <span className="rounded-full bg-line/40 px-2.5 py-0.5 text-xs font-semibold text-ink/65">
                          Add-on, works with every plan
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-ink/65">
                        {selected
                          ? "Will be applied at checkout with the plan you pick below."
                          : addon.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 md:shrink-0">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-semibold tracking-[-0.02em] text-ink">
                        ₹{formatRupees(addon.amount)}
                      </span>
                      <span className="text-sm font-medium text-ink/65">
                        {addon.type === "recurring" ? "/month" : "one-time"}
                      </span>
                    </div>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleAddon(addon.id)}
                      className={cn(
                        `flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-xs font-semibold transition-colors ${focusRing}`,
                        selected
                          ? "bg-forest text-paper"
                          : "border border-line text-ink hover:bg-paper",
                      )}
                    >
                      {selected ? (
                        <>
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Comparison table — borderless rows, full-height tinted "recommended" column.
          Horizontal scroll is contained to this box so the page never widens. */}
      {plans.length > 1 && comparisonGroups.length > 0 && (
        <TooltipProvider delayDuration={150}>
          <section className="px-4 py-20 md:py-28">
            <div className="mx-auto max-w-6xl">
              <h2 className={`${heading} mb-12 text-4xl text-ink md:text-6xl`}>Every plan, side by side.</h2>

              <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:overflow-visible md:px-0">
                <div className="min-w-[640px]">
                  {/* Plan header */}
                  <div
                    className="z-20 grid border-b border-line bg-paper/90 backdrop-blur-md md:sticky md:top-16"
                    style={comparisonCols}
                  >
                    <div className="flex items-end px-4 pb-4">
                      <span className="text-sm font-semibold text-ink/65">Features</span>
                    </div>
                    {plans.map((plan, index) => {
                      const highlighted = index === highlightedIndex;
                      return (
                        <div
                          key={plan.id}
                          className={cn(
                            "flex flex-col items-center gap-1 px-4 pb-4 pt-5 text-center",
                            highlighted && "rounded-t-2xl border-x border-t border-mint-soft bg-mint-soft/30",
                          )}
                        >
                          {highlighted && (
                            <span className="mb-1 rounded-full bg-forest px-2.5 py-0.5 text-xs font-semibold text-paper">
                              Recommended
                            </span>
                          )}
                          <span className="text-sm font-semibold text-ink">{plan.name}</span>
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-xl font-semibold tracking-[-0.02em] text-ink">
                              ₹{formatRupees(billingCycle === "yearly" ? plan.discountedMonthlyPrice : plan.amount)}
                            </span>
                            <span className="text-xs font-medium text-ink/65">/mo</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleGetStarted(plan)}
                            className={cn(
                              `mt-2 h-8 w-full max-w-[120px] rounded-full text-xs font-semibold transition-colors ${focusRing}`,
                              highlighted
                                ? "bg-forest text-paper hover:bg-ink"
                                : "border border-line text-ink hover:bg-paper",
                            )}
                          >
                            Choose
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {comparisonGroups.map((group) => (
                    <div key={group.title}>
                      {/* Category label row — tint continues through the recommended column */}
                      <div className="grid" style={comparisonCols}>
                        <div className="px-4 pb-3 pt-8">
                          <h3 className="text-sm font-semibold text-ink/65">{group.title}</h3>
                        </div>
                        {plans.map((plan, index) => (
                          <div
                            key={plan.id}
                            className={cn(index === highlightedIndex && "border-x border-mint-soft bg-mint-soft/30")}
                          />
                        ))}
                      </div>

                      {group.rows.map((row) => (
                        <div
                          key={row.code}
                          className="grid border-t border-line/60 transition-colors hover:bg-ink/[0.02]"
                          style={comparisonCols}
                        >
                          <div className="flex items-center gap-1.5 px-4 py-4">
                            <span className="text-sm font-medium text-ink/85">{row.label}</span>
                            {row.description && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    aria-label={`About ${row.label}`}
                                    className={`text-ink/40 transition-colors hover:text-ink/70 ${focusRing}`}
                                  >
                                    <Info className="h-3.5 w-3.5" aria-hidden="true" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-[240px] text-xs leading-5">
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
                                index === highlightedIndex && "border-x border-mint-soft bg-mint-soft/30",
                              )}
                            >
                              <ComparisonCell item={planFeature(plan, row.code)} />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* Bottom cap — closes the recommended column outline */}
                  <div className="grid border-t border-line/60" style={comparisonCols}>
                    <div />
                    {plans.map((plan, index) => (
                      <div
                        key={plan.id}
                        className={cn(
                          "h-4",
                          index === highlightedIndex && "rounded-b-2xl border-x border-b border-mint-soft bg-mint-soft/30",
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </TooltipProvider>
      )}

      {/* Custom plan CTA */}
      <section className="bg-forest px-4 py-20 text-paper md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <h2 className={`${heading} text-4xl md:text-6xl`}>Need higher limits or a custom plan?</h2>
            <div className="md:justify-self-end">
              <p className="max-w-md text-lg leading-8 text-paper/75">
                Talk to us about volume, dedicated support and integrations
                for your team.
              </p>
              <div className="mt-6">
                <WalkthroughButton tone="light" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
