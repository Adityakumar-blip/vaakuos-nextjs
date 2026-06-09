"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Zap,
  Bot,
  BarChart3,
  Shield,
  Workflow,
  Target,
  Globe,
  Lock,
  Users,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  Database,
  Tag,
  Bell,
  TestTube2,
  Link2,
  MousePointer2,
  Gauge,
  Key,
  Inbox,
  ShoppingCart,
  Send,
  Layers,
  GitBranch,
  ChevronDown,
  CreditCard,
} from "lucide-react";

// ─── Tab definitions ───────────────────────────────────────────────────────

const tabs = [
  { id: "campaigns", label: "Campaigns", icon: MessageSquare },
  { id: "intent", label: "Intent Tracking", icon: Target },
  { id: "automation", label: "Automation", icon: Workflow },
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "platform", label: "Platform", icon: Shield },
] as const;

type TabId = (typeof tabs)[number]["id"];

// ─── Spotlight content per tab ─────────────────────────────────────────────

const spotlights: Record<
  TabId,
  {
    badge: string;
    headline: string;
    sub: string;
    items: { icon: React.ElementType; title: string; desc: string }[];
  }
> = {
  campaigns: {
    badge: "WhatsApp Campaigns",
    headline: "Send campaigns shoppers actually open",
    sub: "WhatsApp sees 90%+ open rates. VaakuOS channels that attention into recovered carts and new orders — with zero spam risk.",
    items: [
      { icon: MessageSquare, title: "HSM Template Builder", desc: "Create and submit Meta-compliant message templates with variables for names, products, and dynamic offers." },
      { icon: Clock, title: "Scheduled Delivery", desc: "Schedule campaigns weeks ahead or trigger them the instant an intent signal fires." },
      { icon: Zap, title: "Dynamic Personalization", desc: "Automatically inject customer names, product images, live prices, and discount codes." },
      { icon: Link2, title: "One-click Checkout Links", desc: "Embed interactive purchase links that drop customers into a pre-filled checkout instantly." },
      { icon: Target, title: "Audience Segmentation", desc: "Target by cart value, purchase history, location, tags, or any custom contact field." },
      { icon: BarChart3, title: "Delivery Analytics", desc: "Track sent, delivered, read, and click rates per campaign in real time." },
    ],
  },
  intent: {
    badge: "Intent Detection",
    headline: "Catch the moment intent peaks — not after",
    sub: "Most tools wait until a cart is abandoned. VaakuOS reads intent signals before the customer leaves and fires recovery at the precise moment.",
    items: [
      { icon: MousePointer2, title: "Pre-exit Detection", desc: "Analyze cursor patterns, scroll velocity, and tab switches to predict abandonment before it happens." },
      { icon: ShoppingCart, title: "Cart Abandonment Tracking", desc: "Detect add-to-cart without checkout across Shopify, WooCommerce, and any custom storefront." },
      { icon: Gauge, title: "Checkout Drop-off", desc: "Pinpoint exactly which checkout step each customer abandoned for ultra-precise recovery messages." },
      { icon: Bell, title: "Millisecond Triggers", desc: "Fire recovery sequences within 100ms of detecting an intent signal — while the moment is still hot." },
      { icon: Database, title: "Event Webhooks", desc: "Stream all cart and checkout events to your CRM, data warehouse, or any analytics platform." },
      { icon: Globe, title: "Multi-platform Support", desc: "Native Shopify and WooCommerce plugins; custom stores connect via a lightweight JavaScript SDK." },
    ],
  },
  automation: {
    badge: "Automation",
    headline: "Build once. Recover revenue forever.",
    sub: "Create multi-step flows that react automatically to what customers do — and don't do — without any manual intervention.",
    items: [
      { icon: Workflow, title: "Visual Flow Builder", desc: "Drag-and-drop flow creator with triggers, conditions, delays, and branching paths." },
      { icon: Layers, title: "Multi-step Sequences", desc: "Chain up to 10+ messages across hours, days, or weeks with intelligent delay controls." },
      { icon: Bot, title: "Auto-response Rules", desc: "Reply automatically to incoming messages based on keywords, sentiment, or contact tags." },
      { icon: Clock, title: "Send-time Optimization", desc: "AI learns when each contact is most likely to engage and sends at their personal optimal time." },
      { icon: CheckCircle2, title: "Auto-stop on Purchase", desc: "Recovery flows stop the instant an order is confirmed — no annoying follow-ups after conversion." },
      { icon: GitBranch, title: "A/B Testing", desc: "Test message variants, timing windows, and CTAs to find the combination that converts best." },
    ],
  },
  inbox: {
    badge: "Shared Inbox",
    headline: "Every customer conversation, one place",
    sub: "Your whole team works from a single WhatsApp inbox. Assign, annotate, and close faster — with full customer context alongside every chat.",
    items: [
      { icon: Inbox, title: "Unified Inbox", desc: "All conversations across multiple WhatsApp numbers in a single shared view for your team." },
      { icon: Users, title: "Team Assignment", desc: "Route conversations to specific agents or teams based on tags, language, or round-robin." },
      { icon: MessageSquare, title: "Internal Notes", desc: "Add private notes visible only to your team without interrupting the customer conversation." },
      { icon: Tag, title: "Customer Context Panel", desc: "See full contact history, cart value, order history, and tags alongside every chat." },
      { icon: Zap, title: "Template Replies", desc: "Send approved WhatsApp templates in one click — no copy-pasting or manual formatting." },
      { icon: Bell, title: "Real-time Notifications", desc: "Desktop and in-app alerts the moment a customer replies to any recovery message." },
    ],
  },
  analytics: {
    badge: "Analytics",
    headline: "Revenue attribution that tells the whole story",
    sub: "See exactly which campaigns, flows, and messages are driving recovered revenue. Build custom dashboards your whole team can act on.",
    items: [
      { icon: BarChart3, title: "Customizable Dashboard", desc: "Build your own analytics view with drag-and-drop widgets for the metrics that matter to you." },
      { icon: TrendingUp, title: "Full Message Funnel", desc: "Track every step: sent → delivered → read → clicked → purchased in a single funnel view." },
      { icon: Sparkles, title: "Campaign ROI", desc: "See exact revenue recovered attributed directly to each campaign and automation flow." },
      { icon: Users, title: "Contact Growth", desc: "Monitor subscriber opt-ins, churn, and list health trends over any custom date range." },
      { icon: Workflow, title: "Flow Performance", desc: "Identify which automation steps drive conversions and where customers are dropping off." },
      { icon: Database, title: "Export & API", desc: "Export any report as CSV or pull all metrics via REST API into Looker, Tableau, or any BI tool." },
    ],
  },
  platform: {
    badge: "Platform",
    headline: "Enterprise-ready from day one",
    sub: "Multi-tenant architecture, granular RBAC, end-to-end encryption, and compliance built in — not bolted on as an afterthought.",
    items: [
      { icon: Lock, title: "Role-Based Access Control", desc: "20+ granular permissions across campaigns, contacts, billing, settings, and more." },
      { icon: Shield, title: "GDPR & CCPA Compliant", desc: "Consent management, right-to-delete flows, and data residency controls built in." },
      { icon: Globe, title: "Multi-language Support", desc: "Auto-detects customer locale and delivers content natively in 50+ languages." },
      { icon: Key, title: "API Tokens & Webhooks", desc: "Generate scoped API tokens and outbound webhooks for any developer integration." },
      { icon: Globe, title: "Distributed Infrastructure", desc: "<100ms trigger latency on a distributed network with a 99.9% uptime SLA." },
      { icon: TestTube2, title: "Sandbox Environment", desc: "Full staging environment to test campaigns, flows, and integrations before going live." },
    ],
  },
};

// ─── Mock visuals ──────────────────────────────────────────────────────────

function CampaignMockup() {
  return (
    <div className="relative select-none">
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Send className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-semibold">Summer Recovery Campaign</span>
          </div>
          <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">Live</span>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
          {[["2,847", "Sent"], ["2,791", "Delivered"], ["2,203", "Read"]].map(([val, label]) => (
            <div key={label} className="p-5 text-center">
              <p className="text-2xl font-bold tabular-nums">{val}</p>
              <p className="mt-1 text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
        <div className="p-5">
          <p className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Message preview</p>
          <div className="rounded-xl bg-primary/5 border border-primary/20 p-4 text-sm leading-relaxed">
            <p>Hey <span className="font-semibold text-primary">{"{{name}}"}</span>, you left something behind! 🛒</p>
            <p className="mt-1 text-muted-foreground">Your <span className="text-foreground font-medium">{"{{product}}"}</span> is still waiting for you.</p>
            <p className="mt-3 text-primary font-medium text-xs">Complete your order → vaaku.os/cart/{"{{id}}"}</p>
          </div>
        </div>
        <div className="border-t border-border px-5 py-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Scheduled: Today 3:00 PM</span>
            <span className="text-success font-medium">↑ 24.3% open rate</span>
          </div>
        </div>
      </div>
      <div className="absolute -right-6 -bottom-6 -z-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
    </div>
  );
}

function IntentMockup() {
  const events = [
    { time: "14:03:22", event: "Product viewed",    cart: "$129.00", cls: "text-info" },
    { time: "14:04:01", event: "Added to cart",     cart: "$258.00", cls: "text-primary" },
    { time: "14:04:45", event: "Checkout started",  cart: "$258.00", cls: "text-warning" },
    { time: "14:05:12", event: "Checkout dropped",  cart: "$258.00", cls: "text-destructive" },
    { time: "14:05:13", event: "Flow triggered ⚡", cart: "$258.00", cls: "text-success" },
  ];
  return (
    <div className="relative select-none">
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
            <Target className="h-4 w-4 text-accent" />
          </div>
          <span className="text-sm font-semibold">Live Intent Feed</span>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Real-time
          </span>
        </div>
        <div className="divide-y divide-border">
          {events.map((e) => (
            <div key={e.time} className="flex items-center gap-4 px-5 py-3">
              <span className="tabular-nums text-xs text-muted-foreground w-16 shrink-0">{e.time}</span>
              <span className={cn("text-sm font-medium flex-1", e.cls)}>{e.event}</span>
              <span className="text-xs font-mono text-muted-foreground">{e.cart}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-border px-5 py-4 bg-muted/30">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Drop-off at: Payment Info</span>
            <span className="text-primary font-medium">Recovery message queued</span>
          </div>
        </div>
      </div>
      <div className="absolute -left-6 -bottom-6 -z-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
    </div>
  );
}

function AutomationMockup() {
  const nodes = [
    { label: "Cart Abandoned",  cls: "border-primary/40 bg-primary/5 text-primary" },
    { label: "Wait 30 min",     cls: "border-warning/40 bg-warning/5 text-warning" },
    { label: "Send WhatsApp",   cls: "border-success/40 bg-success/5 text-success" },
    { label: "Purchased?",      cls: "border-info/40 bg-info/5 text-info" },
  ];
  return (
    <div className="relative select-none">
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Workflow className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-semibold">Cart Recovery Flow</span>
          <span className="ml-auto rounded-full bg-success/10 px-3 py-0.5 text-xs font-medium text-success">Active</span>
        </div>
        <div className="p-5 flex flex-col items-center gap-0">
          {nodes.map((node, i) => (
            <div key={node.label} className="flex flex-col items-center w-full">
              <div className={cn("w-full max-w-xs rounded-xl border px-4 py-3 text-center text-sm font-medium", node.cls)}>
                {node.label}
              </div>
              {i < nodes.length - 1 && (
                <div className="flex flex-col items-center">
                  <div className="h-5 w-px bg-border" />
                  <div className="h-2 w-2 rounded-full bg-border" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-border px-5 py-4 bg-muted/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>847 contacts in flow</span>
            <span className="text-primary font-medium">23.1% converted</span>
          </div>
        </div>
      </div>
      <div className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
    </div>
  );
}

function InboxMockup() {
  const convos = [
    { name: "Sarah K.", msg: "Is this still available?", time: "2m",  badge: 1, av: "SK" },
    { name: "James T.", msg: "Just placed the order!",   time: "15m", badge: 0, av: "JT" },
    { name: "Priya M.", msg: "Can I get a discount?",    time: "1h",  badge: 3, av: "PM" },
  ];
  return (
    <div className="relative select-none">
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="h-8 w-8 rounded-lg bg-info/10 flex items-center justify-center">
            <Inbox className="h-4 w-4 text-info" />
          </div>
          <span className="text-sm font-semibold">Team Inbox</span>
          <span className="ml-auto text-xs text-muted-foreground">3 open</span>
        </div>
        <div className="divide-y divide-border">
          {convos.map((c) => (
            <div key={c.name} className="flex items-start gap-3 px-5 py-4 hover:bg-muted/30 transition-colors cursor-pointer">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">{c.av}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-medium">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{c.msg}</p>
              </div>
              {c.badge > 0 && (
                <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{c.badge}</span>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-border px-5 py-4 bg-muted/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Avg. response: 4 min</span>
            <span className="text-success font-medium">All assigned</span>
          </div>
        </div>
      </div>
      <div className="absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-full bg-info/10 blur-3xl" />
    </div>
  );
}

function AnalyticsMockup() {
  const bars = [40, 65, 55, 80, 70, 90, 85];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="relative select-none">
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 text-success" />
          </div>
          <span className="text-sm font-semibold">Revenue Recovered</span>
          <span className="ml-auto text-xs font-medium text-success">↑ 18.4% vs last week</span>
        </div>
        <div className="p-5">
          <div className="mb-1 text-3xl font-bold tabular-nums">$48,291</div>
          <div className="text-xs text-muted-foreground">This week</div>
          <div className="mt-5 flex items-end gap-2 h-24">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded-t-sm bg-primary/20 hover:bg-primary/40 transition-colors" style={{ height: `${h}%` }} />
                <span className="text-[10px] text-muted-foreground">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-border border-t border-border">
          {[["91.2%", "Delivered"], ["67.8%", "Read"], ["23.1%", "Converted"]].map(([val, label]) => (
            <div key={label} className="p-4 text-center">
              <p className="text-lg font-bold">{val}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -right-6 -bottom-6 -z-10 h-40 w-40 rounded-full bg-success/10 blur-3xl" />
    </div>
  );
}

function PlatformMockup() {
  const perms = [
    { label: "Contacts Read",    on: true },
    { label: "Campaigns Create", on: true },
    { label: "Billing Manage",   on: false },
    { label: "Users Admin",      on: false },
    { label: "Analytics Export", on: true },
    { label: "Inbox Assign",     on: true },
  ];
  return (
    <div className="relative select-none">
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center">
            <Lock className="h-4 w-4 text-destructive" />
          </div>
          <span className="text-sm font-semibold">Role: Campaign Manager</span>
        </div>
        <div className="p-5 space-y-3">
          {perms.map((p) => (
            <div key={p.label} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{p.label}</span>
              <div className={cn("h-5 w-9 rounded-full relative transition-colors", p.on ? "bg-primary" : "bg-muted")}>
                <div className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform", p.on ? "translate-x-4" : "translate-x-0.5")} />
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border px-5 py-4 bg-muted/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>4 of 20+ permissions enabled</span>
            <span className="text-primary font-medium">GDPR compliant</span>
          </div>
        </div>
      </div>
      <div className="absolute -left-6 -bottom-6 -z-10 h-40 w-40 rounded-full bg-destructive/10 blur-3xl" />
    </div>
  );
}

const mockupMap: Record<TabId, React.ComponentType> = {
  campaigns: CampaignMockup,
  intent:    IntentMockup,
  automation:AutomationMockup,
  inbox:     InboxMockup,
  analytics: AnalyticsMockup,
  platform:  PlatformMockup,
};

// ─── Capability explorer data ──────────────────────────────────────────────

type Status = "live" | "beta" | "soon";

type Capability = {
  id: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  category: string;
  desc: string;
  benefits: string[];
  status: Status;
};

// Status — uses system tokens only
const statusCfg: Record<Status, { label: string; cls: string }> = {
  live: { label: "Live",         cls: "bg-success/10 text-success" },
  beta: { label: "Beta",         cls: "bg-warning/10 text-warning" },
  soon: { label: "Coming soon",  cls: "bg-muted text-muted-foreground" },
};

// Category — uses system tokens only
const catCfg: Record<string, { dot: string; iconCls: string; bg: string; badge: string }> = {
  Messaging:    { dot: "bg-primary",     iconCls: "text-primary",     bg: "bg-primary/10",     badge: "bg-primary/10 text-primary" },
  "E-commerce": { dot: "bg-accent",      iconCls: "text-accent",      bg: "bg-accent/10",      badge: "bg-accent/10 text-accent" },
  Automation:   { dot: "bg-warning",     iconCls: "text-warning",     bg: "bg-warning/10",     badge: "bg-warning/10 text-warning" },
  CRM:          { dot: "bg-info",        iconCls: "text-info",        bg: "bg-info/10",        badge: "bg-info/10 text-info" },
  Inbox:        { dot: "bg-tertiary",    iconCls: "text-tertiary-foreground", bg: "bg-tertiary/20", badge: "bg-tertiary/20 text-tertiary-foreground" },
  Analytics:    { dot: "bg-success",     iconCls: "text-success",     bg: "bg-success/10",     badge: "bg-success/10 text-success" },
  Security:     { dot: "bg-destructive", iconCls: "text-destructive", bg: "bg-destructive/10", badge: "bg-destructive/10 text-destructive" },
  Platform:     { dot: "bg-muted-foreground", iconCls: "text-muted-foreground", bg: "bg-muted", badge: "bg-muted text-muted-foreground" },
};

const capabilityGroups: { category: string; features: Capability[] }[] = [
  {
    category: "Messaging",
    features: [
      {
        id: "waba",
        icon: MessageSquare,
        title: "WhatsApp Business API",
        tagline: "Official Meta WABA with full template support",
        category: "Messaging",
        desc: "Connect your WhatsApp Business Account via Meta's official embedded signup flow. Send text, media, and template messages at scale with full webhook-driven delivery tracking.",
        benefits: [
          "Full OAuth flow to connect Meta / Facebook accounts in minutes",
          "Send HSM templates, images, documents, and interactive messages",
          "Webhook-driven delivery status: sent → delivered → read, in real time",
        ],
        status: "live",
      },
      {
        id: "templates",
        icon: Layers,
        title: "HSM Template Builder",
        tagline: "Create and submit Meta-compliant message templates",
        category: "Messaging",
        desc: "Build WhatsApp message templates with dynamic variable placeholders — customer name, product title, discount codes, and more. Submit directly to Meta for approval without leaving the dashboard.",
        benefits: [
          "Variable placeholders for name, product, cart total, and custom fields",
          "Submit to Meta for approval and track status in the dashboard",
          "Bulk-submit multiple templates at once to speed up approval cycles",
        ],
        status: "live",
      },
    ],
  },
  {
    category: "E-commerce",
    features: [
      {
        id: "cart-tracking",
        icon: ShoppingCart,
        title: "Cart Event Tracking",
        tagline: "Capture checkout-started and checkout-completed events",
        category: "E-commerce",
        desc: "Track every cart and checkout event across your storefront. VaakuOS captures checkout-started and checkout-completed signals, storing them for recovery logic and reporting.",
        benefits: [
          "POST /ecommerce/custom/checkout-started and checkout-completed endpoints",
          "Works with Shopify, WooCommerce, and any custom storefront via API",
          "All events stored per contact for full checkout history",
        ],
        status: "live",
      },
      {
        id: "checkout-dropoff",
        icon: Gauge,
        title: "Checkout Drop-off Detection",
        tagline: "Identify customers who started but never completed checkout",
        category: "E-commerce",
        desc: "By comparing checkout-started events against checkout-completed events, VaakuOS identifies exactly which customers dropped off — and at which stage — so recovery messages can be precisely targeted.",
        benefits: [
          "Diff engine compares unpaired checkout events to identify abandonment",
          "Stage-level drop-off: address, payment, review, or confirmation step",
          "Enroll abandoned contacts into recovery flows automatically",
        ],
        status: "beta",
      },
    ],
  },
  {
    category: "Automation",
    features: [
      {
        id: "flow-builder",
        icon: Workflow,
        title: "Visual Flow Builder",
        tagline: "Design multi-step recovery sequences without code",
        category: "Automation",
        desc: "Create automation flows with a visual node-and-connection builder. Define triggers, conditions, delays, and send actions — then activate with a single click. Flow execution engine is actively being built.",
        benefits: [
          "JSON-based flow model with trigger, condition, delay, and action nodes",
          "Keyword-triggered flows activate on incoming WhatsApp message text",
          "Flows can be activated, paused, or stopped from the dashboard",
        ],
        status: "beta",
      },
      {
        id: "auto-responses",
        icon: Bot,
        title: "Auto-response Rules",
        tagline: "Reply automatically based on keywords or contact tags",
        category: "Automation",
        desc: "Set keyword-based auto-response rules so incoming WhatsApp messages are handled instantly — without agent involvement. Route, reply, or tag contacts automatically based on what they send.",
        benefits: [
          "Keyword matching on incoming message text triggers auto-reply",
          "Reply with any approved HSM template or free-text message",
          "Combine with flows to hand off to multi-step sequences after reply",
        ],
        status: "live",
      },
      {
        id: "scheduled-campaigns",
        icon: Clock,
        title: "Scheduled Campaign Execution",
        tagline: "Queue campaigns to send at a future date and time",
        category: "Automation",
        desc: "Schedule campaigns to fire at a precise date and time using BullMQ-backed queues. Campaigns move through draft → scheduled → processing → completed with full status tracking at every step.",
        benefits: [
          "BullMQ + Redis queue ensures reliable campaign execution at scale",
          "Per-message status tracking: pending, sent, delivered, read, failed",
          "Bulk schedule or update status for multiple campaigns at once",
        ],
        status: "live",
      },
    ],
  },
  {
    category: "CRM",
    features: [
      {
        id: "contacts",
        icon: Users,
        title: "Contact Management",
        tagline: "Flexible CRM with tags, custom fields, and segmentation",
        category: "CRM",
        desc: "Store and manage your entire customer list with a flexible contact schema. Add tags, define custom fields of any type, and filter contacts by any combination of properties.",
        benefits: [
          "Custom fields support text, number, date, and select types",
          "Tag-based organisation with bulk assign and remove operations",
          "Advanced filter by any field, tag, status, or custom property",
        ],
        status: "live",
      },
      {
        id: "import",
        icon: Database,
        title: "Bulk Contact Import",
        tagline: "Upload thousands of contacts from CSV or Excel",
        category: "CRM",
        desc: "Import your entire contact list in one go via CSV or Excel upload. The importer handles duplicate detection, field mapping, and validation — and provides a sample template to get started.",
        benefits: [
          "Upload CSV or Excel files with automatic field detection",
          "Duplicate handling prevents double-importing the same contacts",
          "Download a sample template to see the expected format before importing",
        ],
        status: "live",
      },
    ],
  },
  {
    category: "Inbox",
    features: [
      {
        id: "shared-inbox",
        icon: Inbox,
        title: "Shared Team Inbox",
        tagline: "One WhatsApp inbox for your whole team",
        category: "Inbox",
        desc: "Every inbound WhatsApp conversation from every phone number lands in a single shared inbox. Your team works together, assigns conversations, and responds — without losing context.",
        benefits: [
          "All WhatsApp numbers consolidated into one conversation view",
          "Conversation state tracking: open, pending, resolved",
          "Real-time message push via Socket.io (in development)",
        ],
        status: "soon",
      },
      {
        id: "assignment",
        icon: Tag,
        title: "Team Assignment & Notes",
        tagline: "Route conversations and collaborate privately",
        category: "Inbox",
        desc: "Assign conversations to specific agents or teams, and attach private internal notes visible only to your team — not the customer. Full context stays with the conversation.",
        benefits: [
          "Assign any conversation to a specific user or team",
          "Add private notes without interrupting the customer thread",
          "See full contact history, cart value, and tags in the sidebar",
        ],
        status: "soon",
      },
    ],
  },
  {
    category: "Analytics",
    features: [
      {
        id: "dashboards",
        icon: BarChart3,
        title: "Custom Dashboards",
        tagline: "Build your own analytics view with drag-and-drop widgets",
        category: "Analytics",
        desc: "Each user builds their own dashboard from a library of available metrics. Drag widgets into position, resize them, and reset to a sensible default. Widget CRUD is live; aggregation data is being finalised.",
        benefits: [
          "Per-user dashboard with personalised widget layout and preferences",
          "Available metrics: messages sent, delivered, read, failed, and more",
          "Reorder and resize widgets via drag-and-drop",
        ],
        status: "beta",
      },
      {
        id: "delivery-tracking",
        icon: TrendingUp,
        title: "Message Delivery Tracking",
        tagline: "Track every message from sent to read in real time",
        category: "Analytics",
        desc: "Every message sent through VaakuOS is tracked through its full delivery lifecycle via Meta WABA webhooks. Delivery status updates happen in real time with no polling required.",
        benefits: [
          "Webhook-driven status updates: sent, delivered, read, failed",
          "Per-campaign and per-message breakdown available via API",
          "Failed message reporting with error codes from Meta",
        ],
        status: "live",
      },
    ],
  },
  {
    category: "Security",
    features: [
      {
        id: "rbac",
        icon: Lock,
        title: "Enterprise RBAC",
        tagline: "20+ granular permissions across every module",
        category: "Security",
        desc: "Create custom roles with exactly the permissions your team needs. Permissions cover every module — contacts, campaigns, templates, billing, inbox, analytics, and settings — with no overlap.",
        benefits: [
          "20+ permissions: CONTACTS_READ, CAMPAIGNS_CREATE, BILLING_MANAGE, and more",
          "Assign multiple roles per user with additive permission merging",
          "Roles are tenant-scoped — no cross-tenant permission leakage",
        ],
        status: "live",
      },
      {
        id: "gdpr",
        icon: Shield,
        title: "GDPR & CCPA Compliance",
        tagline: "Consent management and right-to-delete controls",
        category: "Security",
        desc: "VaakuOS is being built with compliance in mind. Token encryption is live today. Dedicated GDPR consent management, right-to-delete flows, and data residency controls are on the roadmap.",
        benefits: [
          "Integration access tokens encrypted at rest with AES-256",
          "Multi-tenant isolation ensures no cross-tenant data access",
          "Consent management and right-to-delete flows (coming soon)",
        ],
        status: "beta",
      },
    ],
  },
  {
    category: "Platform",
    features: [
      {
        id: "api-tokens",
        icon: Key,
        title: "API Tokens & Webhooks",
        tagline: "Generate scoped tokens for developer integrations",
        category: "Platform",
        desc: "Generate tenant-scoped API tokens for programmatic access to VaakuOS data. Validate tokens, manage rotation, and control access from a single place.",
        benefits: [
          "Generate and revoke API tokens with a single API call",
          "Token validation endpoint for integration middleware",
          "Tenant-scoped so tokens never access other accounts",
        ],
        status: "live",
      },
      {
        id: "billing",
        icon: CreditCard,
        title: "Subscription & Billing",
        tagline: "Plan management and payments via Razorpay",
        category: "Platform",
        desc: "Full subscription lifecycle management — create plans, publish them to Razorpay, handle payment webhooks, and surface billing info to your customers. Addon support is included.",
        benefits: [
          "Plan CRUD with draft → published workflow via Razorpay API",
          "Webhook signature verification for all Razorpay payment events",
          "Addon management for optional feature upsells within any plan",
        ],
        status: "live",
      },
    ],
  },
];

// ─── Stats ─────────────────────────────────────────────────────────────────

const heroStats = [
  { value: "15–25%", label: "Revenue recovered on average" },
  { value: "90%+",   label: "WhatsApp open rate" },
  { value: "<100ms", label: "Trigger latency" },
  { value: "99.9%",  label: "Delivery uptime SLA" },
];

const integrations = ["Shopify", "WooCommerce", "Google Sheets", "Zapier", "Wix", "Meta / WABA"];

// ─── Capability Explorer ───────────────────────────────────────────────────

function CapabilityExplorer() {
  const allFeatures = capabilityGroups.flatMap((g) => g.features);
  const [activeId, setActiveId] = useState(allFeatures[0].id);
  const [openMobileId, setOpenMobileId] = useState<string | null>(null);

  const activeIdx = allFeatures.findIndex((f) => f.id === activeId);
  const active    = allFeatures[activeIdx];
  const cc        = catCfg[active.category]  ?? catCfg.Platform;
  const sc        = statusCfg[active.status];

  function goTo(idx: number) {
    if (idx >= 0 && idx < allFeatures.length) setActiveId(allFeatures[idx].id);
  }

  return (
    <>
      {/* ── Desktop split panel ── */}
      <div className="hidden lg:flex rounded-2xl border border-border bg-card overflow-hidden shadow-sm" style={{ height: 620 }}>

        {/* Left: scrollable grouped list */}
        <div className="w-72 xl:w-80 shrink-0 border-r border-border overflow-y-auto">
          {capabilityGroups.map((group) => {
            const gc = catCfg[group.category] ?? catCfg.Platform;
            return (
              <div key={group.category}>
                <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-card/95 px-4 py-2.5 backdrop-blur-sm">
                  <span className={cn("h-1.5 w-1.5 rounded-full", gc.dot)} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {group.category}
                  </span>
                </div>
                {group.features.map((f) => {
                  const Icon    = f.icon;
                  const isActive = f.id === activeId;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setActiveId(f.id)}
                      className={cn(
                        "group w-full flex items-start gap-3 border-l-2 px-4 py-3.5 text-left transition-all duration-150",
                        isActive
                          ? "border-l-primary bg-primary/5"
                          : "border-l-transparent hover:border-l-border hover:bg-muted/40"
                      )}
                    >
                      <div className={cn(
                        "mt-0.5 h-7 w-7 shrink-0 rounded-lg flex items-center justify-center transition-colors",
                        isActive ? gc.bg : "bg-muted group-hover:bg-muted/80"
                      )}>
                        <Icon className={cn("h-3.5 w-3.5 transition-colors", isActive ? gc.iconCls : "text-muted-foreground")} />
                      </div>
                      <div className="min-w-0">
                        <p className={cn(
                          "text-sm font-medium leading-snug",
                          isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/80"
                        )}>
                          {f.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground/70 line-clamp-1">
                          {f.tagline}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Right: flex column — scrollable content + pinned footer */}
        <div className="flex flex-1 flex-col overflow-hidden">

          {/* Scrollable detail content */}
          <div className="flex-1 overflow-y-auto p-8 xl:p-10">
            {/* Header */}
            <div className="flex items-start gap-4 mb-7">
              <div className={cn("h-14 w-14 shrink-0 rounded-2xl flex items-center justify-center", cc.bg)}>
                <active.icon className={cn("h-7 w-7", cc.iconCls)} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{active.title}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", cc.badge)}>
                    {active.category}
                  </span>
                  <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", sc.cls)}>
                    {sc.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-7 mb-7">{active.desc}</p>

            {/* Benefits */}
            <div className="space-y-3">
              {active.benefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <div className={cn("mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center", cc.bg)}>
                    <CheckCircle2 className={cn("h-3 w-3", cc.iconCls)} />
                  </div>
                  <p className="text-sm leading-relaxed">{b}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Pinned footer — always visible ── */}
          <div className="shrink-0 border-t border-border bg-card px-8 py-4 flex items-center justify-between">
            <span className="text-xs text-muted-foreground tabular-nums">
              {activeIdx + 1} of {allFeatures.length} capabilities
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => goTo(activeIdx - 1)}
                disabled={activeIdx === 0}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              <button
                onClick={() => goTo(activeIdx + 1)}
                disabled={activeIdx === allFeatures.length - 1}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile accordion ── */}
      <div className="lg:hidden space-y-6">
        {capabilityGroups.map((group) => {
          const gc = catCfg[group.category] ?? catCfg.Platform;
          return (
            <div key={group.category}>
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className={cn("h-2 w-2 rounded-full", gc.dot)} />
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {group.category}
                </span>
              </div>
              <div className="space-y-2">
                {group.features.map((f) => {
                  const Icon   = f.icon;
                  const isOpen = openMobileId === f.id;
                  const fsc    = statusCfg[f.status];
                  const fcc    = catCfg[f.category] ?? catCfg.Platform;
                  return (
                    <div
                      key={f.id}
                      className={cn(
                        "rounded-xl border transition-colors duration-200",
                        isOpen ? "border-primary/30 bg-primary/[0.03]" : "border-border bg-card"
                      )}
                    >
                      <button
                        onClick={() => setOpenMobileId(isOpen ? null : f.id)}
                        className="w-full flex items-center gap-3 p-4 text-left"
                      >
                        <div className={cn("h-9 w-9 shrink-0 rounded-xl flex items-center justify-center", isOpen ? fcc.bg : "bg-muted")}>
                          <Icon className={cn("h-4 w-4", isOpen ? fcc.iconCls : "text-muted-foreground")} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold leading-snug">{f.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{f.tagline}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={cn("hidden sm:inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold", fsc.cls)}>
                            {fsc.label}
                          </span>
                          <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", isOpen && "rotate-180")} />
                        </div>
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 border-t border-border pt-4 space-y-4">
                          <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold sm:hidden", fsc.cls)}>
                            {fsc.label}
                          </span>
                          <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                          <ul className="space-y-2.5">
                            {f.benefits.map((b) => (
                              <li key={b} className="flex items-start gap-2.5">
                                <div className={cn("mt-0.5 h-4 w-4 shrink-0 rounded-full flex items-center justify-center", fcc.bg)}>
                                  <CheckCircle2 className={cn("h-2.5 w-2.5", fcc.iconCls)} />
                                </div>
                                <span className="text-xs leading-relaxed">{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Mobile bottom counter */}
        <p className="text-center text-xs text-muted-foreground pt-2">
          {allFeatures.length} capabilities across {capabilityGroups.length} categories
        </p>
      </div>
    </>
  );
}

// ─── Main component ────────────────────────────────────────────────────────

export function FeaturesContent() {
  const [activeTab, setActiveTab] = useState<TabId>("campaigns");
  const spotlight      = spotlights[activeTab];
  const MockupComponent = mockupMap[activeTab];

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-32 pb-20 px-4">
        <div className="absolute inset-0 -z-10 [background-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.12),transparent)]" />
        <div className="container mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Platform Overview
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
            The complete WhatsApp
            <br />
            <span className="text-primary">commerce platform</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Track intent, automate recovery, and manage every customer conversation — all from one
            platform designed for e-commerce revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full gap-2">
              Book a Live Demo <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {heroStats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card/60 backdrop-blur px-5 py-3 text-center">
                <p className="text-xl font-bold tabular-nums">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tab navigation ── */}
      <div className="sticky top-16 z-30 border-y border-border bg-background/90 backdrop-blur-lg">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Feature spotlight ── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
                {spotlight.badge}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
                {spotlight.headline}
              </h2>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">{spotlight.sub}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {spotlight.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-3">
                      <div className="mt-0.5 h-8 w-8 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-0.5">{item.title}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <MockupComponent />
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* ── Capability Explorer ── */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Explore every capability
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              16 capabilities across 8 categories. Select any feature to see what&apos;s live,
              what&apos;s in beta, and what&apos;s coming.
            </p>
          </div>
          <CapabilityExplorer />
        </div>
      </section>

      {/* ── How it connects ── */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            From cart drop to recovered revenue
          </h2>
          <p className="text-lg text-muted-foreground mb-16 max-w-xl mx-auto">
            Every feature connects to close the loop automatically — no manual work, no missed windows.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-0">
            {[
              { step: "01", title: "Intent Detected",    desc: "Customer abandons cart or drops off at checkout",   cls: "text-primary border-primary/30 bg-primary/5" },
              { step: "02", title: "Flow Triggered",     desc: "Recovery sequence activates within milliseconds",   cls: "text-accent border-accent/30 bg-accent/5" },
              { step: "03", title: "WhatsApp Sent",      desc: "Personalised message with one-click checkout link", cls: "text-success border-success/30 bg-success/5" },
              { step: "04", title: "Revenue Recovered",  desc: "Flow stops, order attributed, ROI tracked",         cls: "text-info border-info/30 bg-info/5" },
            ].map((item, i, arr) => (
              <div key={item.step} className="flex flex-col md:flex-row items-center">
                <div className={cn("rounded-2xl border p-6 w-52 text-center", item.cls)}>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">{item.step}</p>
                  <p className="text-base font-bold mb-2">{item.title}</p>
                  <p className="text-xs opacity-70 leading-relaxed">{item.desc}</p>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="shrink-0 h-5 w-5 text-muted-foreground mx-2 my-4 md:my-0 rotate-90 md:rotate-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-border bg-muted/30 py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "15–25%", label: "Avg. revenue recovery rate", sub: "across all customers" },
              { value: "500+",   label: "Brands using VaakuOS",       sub: "and growing" },
              { value: "50+",    label: "Languages supported",        sub: "auto-detected" },
              { value: "12+",    label: "Native integrations",        sub: "with more coming" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-bold tabular-nums mb-1">{s.value}</p>
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
            Connects with tools you already use
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {integrations.map((name) => (
              <div key={name} className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all duration-200">
                {name}
              </div>
            ))}
            <div className="rounded-xl border border-dashed border-border px-5 py-3 text-sm font-medium text-muted-foreground">
              + 6 more
            </div>
          </div>
          <div className="mt-6">
            <Link href="/integrations" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
              View all integrations <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 bg-primary/5 border-t border-primary/10">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            Ready to start recovering revenue?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Join 500+ brands using VaakuOS to win back abandoned carts with WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full gap-2">
              Book a Live Demo <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <Link href="/calculator">Calculate Your ROI</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required · Free forever tier available
          </p>
        </div>
      </section>

    </div>
  );
}
