"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useBookDemo } from "@/contexts/book-demo-context";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Calendar,
  MessageSquare,
  LifeBuoy,
  Mail,
  ChevronRight,
  ChevronDown,
  Zap,
  Clock,
  Users,
} from "lucide-react";
import Link from "next/link";

const intents = [
  { id: "support", label: "Get support" },
  { id: "demo",    label: "Book a demo" },
  { id: "sales",   label: "Pricing & sales" },
  { id: "other",   label: "General inquiry" },
] as const;

type IntentId = (typeof intents)[number]["id"];

const channels = [
  {
    icon: Calendar,
    title: "Book a live demo",
    desc: "A 30-minute guided walkthrough with our team.",
    action: "demo" as const,
    intent: "demo" as IntentId,
    iconCls: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    title: "Talk to sales",
    desc: "Pricing, custom plans, and enterprise setup.",
    action: "form" as const,
    intent: "sales" as IntentId,
    iconCls: "text-accent",
    iconBg: "bg-accent/10",
  },
  {
    icon: LifeBuoy,
    title: "Technical support",
    desc: "WABA onboarding, integrations, and platform help.",
    action: "form" as const,
    intent: "support" as IntentId,
    iconCls: "text-info",
    iconBg: "bg-info/10",
  },
];

const trustItems = [
  { icon: Zap,   text: "Typically responds within 2 hours" },
  { icon: Clock, text: "Mon – Fri, 9 am – 6 pm IST" },
  { icon: Users, text: "500+ brands already on VaakuOS" },
];

// ── Self-contained dropdown (avoids Radix + Lenis portal conflicts) ──
function IntentDropdown({
  value,
  onChange,
}: {
  value: IntentId;
  onChange: (v: IntentId) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = intents.find((i) => i.id === value) ?? intents[0];

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-11 w-full items-center justify-between rounded-lg border border-input bg-background px-3.5 text-sm transition-colors focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/25"
      >
        <span className="text-foreground">{selected.label}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg shadow-foreground/5"
        >
          {intents.map((item) => {
            const active = item.id === value;
            return (
              <li key={item.id} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(item.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors",
                    active
                      ? "bg-primary/[0.07] font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                  {active && <Check className="h-4 w-4 text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function SuccessState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mb-6 ring-8 ring-success/5">
        <Check className="h-10 w-10 text-success" />
      </div>
      <h3 className="text-2xl font-semibold tracking-tight mb-3">Message sent!</h3>
      <p className="text-muted-foreground max-w-xs leading-relaxed mb-8">
        We&apos;ll get back to you within one business day. Watch your inbox.
      </p>
      <Button variant="outline" className="rounded-lg" asChild>
        <Link href="/">← Back to home</Link>
      </Button>
    </div>
  );
}

export function ContactContent() {
  const { openBookDemo } = useBookDemo();
  const [intent, setIntent]       = useState<IntentId>("support");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [message, setMessage]     = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const MAX = 500;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  }

  function handleChannel(ch: (typeof channels)[number]) {
    if (ch.action === "demo") {
      openBookDemo();
      return;
    }
    setIntent(ch.intent);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const inputCls =
    "w-full h-11 rounded-lg border border-input bg-background px-3.5 text-sm transition-colors placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/50";

  return (
    <section className="relative isolate overflow-hidden px-4 pb-24 pt-32">
      {/* ── Background — matches hero section ── */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--muted))_58%,hsl(var(--background))_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,hsl(var(--tertiary)/0.46),transparent_30%),radial-gradient(circle_at_88%_10%,hsl(var(--primary)/0.20),transparent_28%),linear-gradient(120deg,transparent_0%,hsl(var(--accent)/0.08)_45%,transparent_70%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.22] [background-image:linear-gradient(hsl(var(--foreground)/0.08)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.08)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="container relative z-10 mx-auto max-w-6xl">

        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">
            Contact us
          </p>
          <h1 className="mb-5 text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
            Let&apos;s talk recovery.
          </h1>
          <p className="mx-auto max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
            Book a demo, ask about pricing, or get technical help. We respond to
            every message within two business hours.
          </p>
        </div>

        {/* ── Two-column ── */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

          {/* ── Left: channels + trust ── */}
          <div className="space-y-3">
            {channels.map((ch) => {
              const Icon = ch.icon;
              return (
                <button
                  key={ch.title}
                  type="button"
                  onClick={() => handleChannel(ch)}
                  className="group w-full rounded-2xl border border-border bg-card/80 p-5 text-left backdrop-blur-sm transition-all duration-200 hover:border-foreground/15 hover:shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <div className={cn("mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105", ch.iconBg)}>
                      <Icon className={cn("h-5 w-5", ch.iconCls)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold leading-snug text-foreground">{ch.title}</p>
                        <ChevronRight className={cn("h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5", ch.iconCls)} />
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{ch.desc}</p>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Trust strip */}
            <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm">
              <div className="space-y-3">
                {trustItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Direct email
                  </p>
                  <a
                    href="mailto:info@vaakuos.com"
                    className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                  >
                    info@vaakuos.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: form card ── */}
          <div ref={formRef} className="scroll-mt-28 rounded-2xl border border-border bg-card p-7 shadow-sm md:p-8">
            {submitted ? (
              <SuccessState />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="mb-1">
                  <h2 className="text-xl font-semibold tracking-tight">Send us a message</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We&apos;ll route it to the right person on our team.
                  </p>
                </div>

                {/* Intent dropdown */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    I&apos;m reaching out about <span className="text-accent">*</span>
                  </label>
                  <IntentDropdown value={intent} onChange={setIntent} />
                </div>

                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      First name <span className="text-accent">*</span>
                    </label>
                    <input required type="text" placeholder="John" className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Last name <span className="text-accent">*</span>
                    </label>
                    <input required type="text" placeholder="Doe" className={inputCls} />
                  </div>
                </div>

                {/* Email + Company */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Work email <span className="text-accent">*</span>
                    </label>
                    <input required type="email" placeholder="john@company.com" className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Company{" "}
                      <span className="text-xs font-normal text-muted-foreground">(optional)</span>
                    </label>
                    <input type="text" placeholder="Acme Inc." className={inputCls} />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="mb-2 flex items-baseline justify-between">
                    <label className="text-sm font-medium">
                      Message <span className="text-accent">*</span>
                    </label>
                    <span className={cn(
                      "text-xs tabular-nums transition-colors",
                      message.length > MAX * 0.9 ? "text-destructive" : "text-muted-foreground"
                    )}>
                      {message.length}/{MAX}
                    </span>
                  </div>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, MAX))}
                    rows={5}
                    placeholder="Tell us about your store, team size, and what you're hoping to solve…"
                    className="w-full resize-none rounded-lg border border-input bg-background px-3.5 py-3 text-sm leading-relaxed transition-colors placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/25"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="group h-12 w-full rounded-lg text-sm font-semibold shadow-lg shadow-primary/15"
                >
                  {loading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>

                <p className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                  We respond within one business day. By submitting you agree to our{" "}
                  <Link href="/privacy-policy" className="underline underline-offset-2 transition-colors hover:text-foreground">
                    Privacy Policy
                  </Link>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
