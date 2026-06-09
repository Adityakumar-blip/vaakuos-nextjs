import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  DatabaseZap,
  Layers3,
  GitBranch,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Webhook,
} from "lucide-react";

import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/ui/button";
import { integrations } from "./integration-data";
import { PluginDirectory } from "./plugin-directory";

export const metadata: Metadata = {
  title: "Integrations that fit your stack",
  description:
    "Connect VaakuOS with Shopify, HubSpot, Salesforce, Slack, and more to recover revenue without heavy lift.",
  alternates: {
    canonical: "/integrations",
  },
};

const workflow = [
  {
    icon: PlugZap,
    title: "Connect",
    body: "Install a native plugin or authenticate through OAuth.",
  },
  {
    icon: DatabaseZap,
    title: "Normalize",
    body: "VaakuOS maps carts, contacts, orders, and intent into one recovery layer.",
  },
  {
    icon: GitBranch,
    title: "Route",
    body: "Send the right signal to CRM, marketing, service, or ops systems.",
  },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-background pt-24 text-foreground">
      <section className="relative border-b border-border/70">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,rgba(42,97,68,0.14),transparent_32%,rgba(238,90,41,0.10)_64%,transparent)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_25%,rgba(130,193,159,0.35),transparent_26%),radial-gradient(circle_at_80%_10%,rgba(238,90,41,0.14),transparent_22%)]" />

        <div className="container mx-auto grid max-w-7xl gap-10 px-4 py-16 md:py-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/50 px-3 py-1.5 text-sm font-semibold text-primary shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Native connectors for revenue recovery
            </div>
            <h1 className="max-w-4xl text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              All your store signals, routed through one recovery OS.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg md:text-xl">
              Connect VaakuOS to commerce, CRM, marketing, and ops tools without
              brittle glue code. Every plugin keeps its own logo, status, and
              sync method clear so teams can pick the right path fast.
            </p>

            <div className="mt-8 flex flex-row gap-3">
              <Button
                asChild
                size="xl"
                className="flex-1 rounded-2xl px-4 text-sm sm:flex-none sm:px-10 sm:text-base"
              >
                <Link href="/demo">
                  Book integration demo
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="flex-1 rounded-2xl border-primary/20 bg-white/60 px-4 text-sm sm:flex-none sm:px-10 sm:text-base"
              >
                <Link href="#plugins">View plugins</Link>
              </Button>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 divide-x divide-border overflow-hidden rounded-2xl border border-border bg-white/45 shadow-sm backdrop-blur">
              {[
                ["12+", "connectors"],
                ["99.9%", "event uptime"],
                ["<10m", "go-live"],
              ].map(([value, label]) => (
                <div key={label} className="p-4">
                  <div className="text-2xl font-bold text-foreground">
                    {value}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden min-h-[440px] overflow-hidden rounded-[2rem] border border-foreground/10 bg-[#10130f] p-5 shadow-2xl shadow-primary/20 lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(145,204,170,0.24),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.08),transparent_58%)]" />
            <div className="absolute inset-5 rounded-[1.5rem] border border-white/10" />
            <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
            <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-tertiary/35" />
            <div className="absolute left-[18%] top-[20%] h-px w-[64%] rotate-12 bg-gradient-to-r from-transparent via-tertiary/45 to-transparent" />
            <div className="absolute left-[18%] bottom-[22%] h-px w-[64%] -rotate-12 bg-gradient-to-r from-transparent via-accent/35 to-transparent" />
            <div className="absolute left-1/2 top-[14%] h-[72%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent" />

            <div className="relative h-full min-h-[400px]">
              {[
                { label: "Commerce", icon: Boxes, className: "left-4 top-8" },
                {
                  label: "CRM",
                  icon: DatabaseZap,
                  className: "right-4 top-12",
                },
                {
                  label: "Marketing",
                  icon: Sparkles,
                  className: "left-8 bottom-16",
                },
                {
                  label: "Automation",
                  icon: GitBranch,
                  className: "right-8 bottom-14",
                },
                {
                  label: "Webhooks",
                  icon: Webhook,
                  className: "left-1/2 top-2 -translate-x-1/2",
                },
                {
                  label: "Data",
                  icon: Layers3,
                  className: "left-1/2 bottom-4 -translate-x-1/2",
                },
              ].map((node) => {
                const Icon = node.icon;

                return (
                  <div
                    key={node.label}
                    className={`absolute ${node.className} flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.08] px-3 py-2 text-white shadow-lg backdrop-blur`}
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-tertiary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-semibold">{node.label}</span>
                  </div>
                );
              })}

              <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[2rem] border border-lime-200/25 bg-primary text-primary-foreground shadow-2xl shadow-black/40">
                <BrandMark className="mb-3 h-12 w-12 bg-primary-foreground text-primary" />
                <span className="text-sm font-bold">VaakuOS</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-primary-foreground/70">
                  integration hub
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      <PluginDirectory integrations={integrations} />

      <section className="border-y border-border bg-white/35">
        <div className="container mx-auto max-w-7xl px-4 py-16 sm:py-20 md:py-24">
          <div className="mb-10 max-w-2xl md:mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
              How it connects
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              From plugin to routed signal in three steps.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3 md:gap-5">
            {workflow.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="relative">
                  <div className="group relative flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 md:p-7">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="text-3xl font-bold leading-none tracking-tight text-muted-foreground/15">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold tracking-tight text-foreground md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-7 text-muted-foreground">
                      {item.body}
                    </p>
                  </div>

                  {index < workflow.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-full z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm md:left-full md:top-1/2"
                    >
                      <ArrowRight className="h-4 w-4 rotate-90 md:rotate-0" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 py-16 sm:py-20 md:py-24">
        <div className="grid gap-6 rounded-[2rem] border border-foreground/10 bg-foreground p-6 text-background shadow-2xl md:grid-cols-[1fr_0.75fr] md:p-10">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-background/10 px-3 py-1.5 text-sm font-bold">
              <ShieldCheck className="h-4 w-4" />
              Secure by default
            </div>
            <h2 className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Need a private app, webhook, or custom marketplace plugin?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-background/70">
              VaakuOS supports custom event schemas, signed webhooks, API-key
              installs, and managed rollout for teams with complex stacks.
            </p>
          </div>
          <div className="rounded-3xl border border-background/10 bg-background/5 p-5">
            {[
              { icon: Webhook, text: "Signed webhooks and retry queues" },
              { icon: Boxes, text: "Sandbox, staging, and production apps" },
              {
                icon: CheckCircle2,
                text: "Implementation support from launch to QA",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.text}
                  className="flex items-center gap-3 border-b border-background/10 py-4 last:border-0"
                >
                  <Icon className="h-5 w-5 text-tertiary" />
                  <span className="font-semibold text-background/85">
                    {item.text}
                  </span>
                </div>
              );
            })}
            <Button
              asChild
              variant="accent"
              size="xl"
              className="mt-5 w-full rounded-2xl"
            >
              <Link href="/contact">
                Request an integration
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
