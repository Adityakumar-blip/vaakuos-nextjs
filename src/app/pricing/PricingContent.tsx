"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, CheckCircle2, ArrowUpRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { pricingService } from "@/services/pricing-service";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import type { PricingPlan } from "@/types/pricing";

const FEATURE_METADATA: Record<string, { label: string }> = {
  api_access: { label: "API Access" },
  max_agents: { label: "Max Agents" },
  max_contacts: { label: "Max Contacts" },
  max_campaigns: { label: "Max Campaigns" },
  monthly_messages: { label: "Monthly Messages" },
  priority_support: { label: "Priority Support" },
  broadcast_enabled: { label: "Broadcast Enabled" },
  markup_per_message: { label: "Markup Per Message" },
  monthly_ai_replies: { label: "Monthly AI Replies" },
};

const COMPARISON_CONFIG = [
  {
    title: "Usage & Limits",
    rows: [
      { key: "monthly_messages", help: "Total monthly WhatsApp messages allowed." },
      { key: "max_contacts", help: "Maximum number of contacts/leads you can store." },
      { key: "max_agents", help: "Number of team members who can access the dashboard." },
      { key: "max_campaigns", help: "Number of active broadcast campaigns allowed." },
      { key: "monthly_ai_replies", help: "Number of AI-powered automated replies per month." },
    ],
  },
  {
    title: "Features & Support",
    rows: [
      { key: "broadcast_enabled", help: "Ability to send mass messages to your contacts." },
      { key: "api_access", help: "Access to developer APIs and webhooks for integration." },
      { key: "priority_support", help: "Faster response times and dedicated support channel." },
      { key: "markup_per_message", help: "Additional cost per message (INR)." },
    ],
  },
];

const renderCell = (value: unknown, rowKey: string) => {
  if (value === true || value === "Included")
    return <CheckCircle2 className="h-5 w-5 text-primary mx-auto" strokeWidth={2.5} />;
  if (value === false || value === "Not Included")
    return <X className="h-4 w-4 text-muted-foreground/30 mx-auto" />;
  if (value === -1 || value === "Unlimited")
    return <span className="text-primary font-bold tracking-tighter text-base">∞</span>;
  return <span className="text-foreground/90 font-semibold">{String(value)}</span>;
};

export function PricingContent() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const { data: apiPlans, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: pricingService.getPlans,
  });

  const currentPlans = (apiPlans || [])
    .filter((p) => p.is_published && p.billing_cycle === billingCycle)
    .map((plan) => {
      const features = Array.isArray(plan.features) ? plan.features : [];
      return {
        ...plan,
        displayPrice: (plan.amount / 100).toLocaleString(),
        displayFeatures: features.slice(1, 7), // Skip first feature (name), take 6 features
        recommended: plan.name.toLowerCase() === "growth",
        featureMap: features.reduce((acc: Record<string, { display_value?: string; value?: unknown }>, f) => {
          if (f && f.code) {
            acc[f.code] = f;
          }
          return acc;
        }, {}),
      };
    });

  const handleGetStarted = (planId: string) => {
    router.push(`/login?planId=${planId}&billingCycle=${billingCycle}`);
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Header & Toggles */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight pb-4 mb-2 leading-normal">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto font-medium">
            Choose the perfect plan for your business. Whether you are just starting out or scaling fast, we have got you covered.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex bg-secondary/50 backdrop-blur-sm p-1.5 rounded-2xl border border-border/50 mb-8 shadow-inner">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={cn(
                "px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300",
                billingCycle === "monthly"
                  ? "bg-white text-foreground shadow-lg scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/30",
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={cn(
                "px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2",
                billingCycle === "yearly"
                  ? "bg-white text-foreground shadow-lg scale-105"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/30",
              )}
            >
              Yearly{" "}
              <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                -20% Off
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="h-[500px] rounded-[2rem] border border-border bg-card animate-pulse" />
            ))
          ) : currentPlans.length > 0 ? (
            currentPlans.map((plan) => {
              const displayPrice =
                billingCycle === "monthly" ? plan.amount : plan.discountedMonthlyPrice;
              const isGrowth = plan.name.toLowerCase() === "growth";
              const displayFeatures = plan.displayFeatures || [];

              return (
                <div
                  key={plan.id}
                  className={cn(
                    "relative flex flex-col p-8 border backdrop-blur-xl transition-all duration-500 rounded-[2rem] group",
                    isGrowth
                      ? "bg-primary/5 border-primary/40 shadow-2xl shadow-primary/10 ring-1 ring-primary/20"
                      : "bg-white/40 border-border/40 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5",
                  )}
                >
                  {isGrowth && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[11px] font-bold text-white bg-primary px-4 py-1.5 rounded-full uppercase tracking-[0.1em] shadow-lg">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-xl font-bold pb-1 mb-2 group-hover:text-primary transition-colors">
                      {plan.name}
                    </h3>
                    <p className="text-[13px] text-muted-foreground/80 leading-relaxed font-medium">
                      {plan.subtitle}
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold tracking-tight">
                        ₹{typeof displayPrice === "number" ? displayPrice.toLocaleString() : displayPrice}
                      </span>
                      <span className="text-muted-foreground/60 font-medium text-sm">/mo</span>
                    </div>
                    {billingCycle === "yearly" && plan.yearlyPrice && (
                      <p className="text-[12px] text-primary font-semibold mt-1.5">
                        Billed annually (₹{plan.yearlyPrice.toLocaleString()}/yr)
                      </p>
                    )}
                    {billingCycle === "monthly" && plan.yearlyPrice && (
                      <p className="text-[12px] text-muted-foreground mt-1.5 font-medium">
                        ₹{plan.yearlyPrice.toLocaleString()}/yr if billed yearly
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 flex-grow border-t border-border/40 pt-8">
                    {displayFeatures.map((feature, i) => (
                      <div key={i} className="flex gap-4 text-sm items-center">
                        <div className={cn(
                          "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                          feature.value === false ? "bg-muted text-muted-foreground/30" : "bg-primary/10 text-primary"
                        )}>
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </div>
                        <span className={cn(
                          "font-medium leading-none",
                          feature.value === false ? "text-muted-foreground/50" : "text-foreground/80"
                        )}>
                          {feature.display_value} {feature.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    className={cn(
                      "w-full font-bold h-12 rounded-xl mt-8 transition-all duration-300",
                      isGrowth
                        ? "bg-primary hover:bg-primary/90 text-white shadow-[0_10px_20px_-5px_rgba(var(--primary),0.3)] hover:-translate-y-0.5"
                        : "bg-secondary hover:bg-secondary/80 text-foreground hover:-translate-y-0.5",
                    )}
                    onClick={() => handleGetStarted(plan.id)}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {plan.name === "Enterprise" ? "Contact Us" : "Get Started"}
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </Button>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-20 text-muted-foreground">
              No plans available for this cycle.
            </div>
          )}
        </div>

        {/* Comparison Table */}
        {currentPlans.length > 0 && (
          <div className="max-w-[1000px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-bold mb-3">Compare Features</h2>
              <p className="text-sm text-muted-foreground font-medium">
                Find the detailed breakdown of what is included in each plan.
              </p>
            </div>

            <div className="bg-white/40 backdrop-blur-2xl rounded-[2rem] border border-border/40 shadow-2xl overflow-hidden">
              {/* Desktop Sticky Header */}
              <div className="hidden md:grid grid-cols-4 gap-4 sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border/50 py-8 px-8">
                <div className="col-span-1 text-sm font-black text-muted-foreground uppercase tracking-[0.2em] self-center">
                  Core Features
                </div>
                {currentPlans.map((plan) => (
                  <div key={plan.id} className="col-span-1 text-center flex flex-col items-center justify-center">
                    <span className={cn("font-bold text-lg mb-3", plan.name.toLowerCase() === "growth" ? "text-primary" : "text-foreground")}>
                      {plan.name}
                    </span>
                    <Button size="sm" variant={plan.name.toLowerCase() === "growth" ? "default" : "outline"} onClick={() => handleGetStarted(plan.id)} className="w-full max-w-[120px] rounded-xl h-10 font-bold">
                      Choose
                    </Button>
                  </div>
                ))}
              </div>

              <div className="divide-y divide-border/30">
                {COMPARISON_CONFIG.map((category, idx) => (
                  <div key={idx}>
                    <div className="bg-secondary/30 px-8 py-4 backdrop-blur-sm">
                      <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">{category.title}</h3>
                    </div>
                    <div className="divide-y divide-border/10">
                      {category.rows.map((row, rIdx) => {
                        const metadata = FEATURE_METADATA[row.key];
                        return (
                          <div key={rIdx} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center px-8 py-6 hover:bg-primary/[0.02] transition-colors">
                            <div className="col-span-1 font-semibold text-foreground/80 text-[13px]">{metadata?.label || row.key}</div>
                            {currentPlans.map((plan) => (
                              <div key={plan.id} className="col-span-1 text-center text-sm">
                                <span className="md:hidden text-muted-foreground/50 text-[10px] block font-black uppercase mb-1">{plan.name}</span>
                                {renderCell(plan.featureMap?.[row.key]?.display_value ?? plan.featureMap?.[row.key]?.value ?? false, row.key)}
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
