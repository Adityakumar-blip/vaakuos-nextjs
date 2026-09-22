"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useBookDemo } from "@/contexts/book-demo-context";
import { Calendar, MessageSquare, LifeBuoy, Mail, ChevronRight, ChevronDown, Check, Clock } from "lucide-react";
import Link from "next/link";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

const intents = [
  { id: "support", label: "Get help" },
  { id: "demo", label: "Book a walkthrough" },
  { id: "sales", label: "Pricing & plans" },
  { id: "other", label: "Something else" },
] as const;

type IntentId = (typeof intents)[number]["id"];

const channels = [
  {
    icon: Calendar,
    title: "Book a walkthrough",
    desc: "A 15-minute call about your channels and your follow-ups.",
    action: "demo" as const,
    intent: "demo" as IntentId,
  },
  {
    icon: MessageSquare,
    title: "Talk to sales",
    desc: "Pricing, plans and what fits your team.",
    action: "form" as const,
    intent: "sales" as IntentId,
  },
  {
    icon: LifeBuoy,
    title: "Get help",
    desc: "Setting up a channel, an integration, or something that isn't working.",
    action: "form" as const,
    intent: "support" as IntentId,
  },
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
      <span id="intent-label" className="mb-1.5 block text-sm font-medium text-ink">
        I&apos;m reaching out about
      </span>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby="intent-label"
        className={`flex h-11 w-full items-center justify-between rounded-lg border border-line bg-white px-3.5 text-sm text-ink transition-colors ${focusRing}`}
      >
        <span>{selected.label}</span>
        <ChevronDown
          className={cn("h-4 w-4 text-ink/50 transition-transform duration-200", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-labelledby="intent-label"
          className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-lg border border-line bg-white p-1 shadow-[0_1px_0_rgb(var(--ink)/0.06),0_20px_40px_-20px_rgb(var(--ink)/0.35)]"
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
                    active ? "bg-mint-soft font-semibold text-ink" : "text-ink/70 hover:bg-paper",
                  )}
                >
                  {item.label}
                  {active && <Check className="h-4 w-4 text-forest" aria-hidden="true" />}
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
    <div className="flex flex-col items-start py-6 text-left">
      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-mint-soft">
        <Check className="h-8 w-8 text-forest" aria-hidden="true" />
      </span>
      <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink">Message sent.</h3>
      <p className="mt-3 max-w-sm text-base leading-7 text-ink/70">
        We&apos;ll read it and reply within one business day, from a real person on the team.
      </p>
      <Link
        href="/"
        className={`mt-8 text-base font-semibold text-forest underline decoration-forest/30 underline-offset-4 transition-colors hover:decoration-forest ${focusRing}`}
      >
        Back to home
      </Link>
    </div>
  );
}

type FieldName = "firstName" | "lastName" | "email" | "message";

function fieldMessage(field: FieldName, validity: ValidityState) {
  if (validity.valueMissing) {
    return {
      firstName: "Enter your first name.",
      lastName: "Enter your last name.",
      email: "Enter your work email.",
      message: "Tell us what you need help with.",
    }[field];
  }
  if (validity.typeMismatch && field === "email") return "Enter a valid email, like you@company.com.";
  if (validity.tooLong && field === "message") return "Keep it under 500 characters.";
  return "Check this field and try again.";
}

export function ContactContent() {
  const { openBookDemo } = useBookDemo();
  const [intent, setIntent] = useState<IntentId>("support");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const formRef = useRef<HTMLDivElement>(null);
  const MAX = 500;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoading(true);
    setSendFailed(false);
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "https://api.vaakuos.com").replace(/\/+$/, "");
      const response = await fetch(`${baseUrl}/contact-queries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          company: data.get("company") || undefined,
          intent,
          message: data.get("message"),
        }),
      });
      if (!response.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setSendFailed(true);
    } finally {
      setLoading(false);
    }
  }

  function handleChannel(ch: (typeof channels)[number]) {
    if (ch.action === "demo") {
      openBookDemo();
      return;
    }
    setIntent(ch.intent);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleInvalid<E extends HTMLInputElement | HTMLTextAreaElement>(field: FieldName) {
    return (e: React.FormEvent<E>) => {
      e.preventDefault();
      setErrors((prev) => ({ ...prev, [field]: fieldMessage(field, e.currentTarget.validity) }));
    };
  }

  function clearError(field: FieldName) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  const inputCls = (field: FieldName) =>
    cn(
      "h-11 rounded-lg border bg-white px-3.5 text-base text-ink placeholder:text-ink/40 md:text-sm",
      "focus-visible:ring-0 focus-visible:ring-offset-0",
      focusRing,
      errors[field] ? "border-error" : "border-line",
    );

  return (
    <section className="bg-paper px-4 pb-20 pt-28 font-display text-ink md:pb-28 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
          <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink md:text-6xl">
            Talk to the team.
          </h1>
          <p className="max-w-md text-lg leading-8 text-ink/70 md:justify-self-end">
            Book a walkthrough, ask about pricing, or get help setting up WhatsApp, email,
            Instagram or Messenger. Tell us what you need and we&apos;ll route it to the right person.
          </p>
        </div>

        <div className="mt-14 grid gap-10 border-t border-line pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* ── Left: channels + trust ── */}
          <div>
            <ul className="divide-y divide-line border-y border-line">
              {channels.map((ch) => {
                const Icon = ch.icon;
                return (
                  <li key={ch.title}>
                    <button
                      type="button"
                      onClick={() => handleChannel(ch)}
                      className={`group flex w-full items-start gap-4 py-6 text-left ${focusRing}`}
                    >
                      <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint-soft text-forest">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-display text-lg font-bold tracking-[-0.01em] text-ink">
                            {ch.title}
                          </span>
                          <ChevronRight
                            className="h-4 w-4 shrink-0 text-ink/40 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-ink/70">{ch.desc}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 space-y-4">
              <p className="flex items-center gap-2 text-sm text-ink/70">
                <Clock className="h-4 w-4 shrink-0 text-ink/50" aria-hidden="true" />
                We respond within one business day, Mon&ndash;Fri, 9am&ndash;6pm IST.
              </p>
              <p className="flex items-center gap-2 text-sm text-ink/70">
                <Mail className="h-4 w-4 shrink-0 text-ink/50" aria-hidden="true" />
                <a
                  href="mailto:info@vaakuos.com"
                  className={`font-semibold text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink ${focusRing}`}
                >
                  info@vaakuos.com
                </a>
              </p>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div
            ref={formRef}
            className="scroll-mt-28 rounded-3xl border border-line bg-white p-7 shadow-[0_1px_0_rgb(var(--ink)/0.06),0_28px_56px_-28px_rgb(var(--ink)/0.3)] md:p-8"
          >
            {submitted ? (
              <SuccessState />
            ) : (
              <form onSubmit={handleSubmit} noValidate={false} className="space-y-5">
                <div className="mb-1">
                  <h2 className="font-display text-xl font-bold tracking-[-0.01em] text-ink">
                    Send us a message
                  </h2>
                  <p className="mt-1 text-sm text-ink/70">We&apos;ll route it to the right person on our team.</p>
                </div>

                <IntentDropdown value={intent} onChange={setIntent} />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-ink">
                      First name
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      required
                      type="text"
                      placeholder="John"
                      className={inputCls("firstName")}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                      onInvalid={handleInvalid<HTMLInputElement>("firstName")}
                      onChange={() => clearError("firstName")}
                    />
                    {errors.firstName && (
                      <p id="firstName-error" role="alert" className="mt-1.5 text-sm text-error">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-ink">
                      Last name
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      required
                      type="text"
                      placeholder="Doe"
                      className={inputCls("lastName")}
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                      onInvalid={handleInvalid<HTMLInputElement>("lastName")}
                      onChange={() => clearError("lastName")}
                    />
                    {errors.lastName && (
                      <p id="lastName-error" role="alert" className="mt-1.5 text-sm text-error">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                      Work email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      required
                      type="email"
                      placeholder="john@company.com"
                      className={inputCls("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      onInvalid={handleInvalid<HTMLInputElement>("email")}
                      onChange={() => clearError("email")}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="mt-1.5 text-sm text-error">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-ink">
                      Company <span className="font-normal text-ink/50">(optional)</span>
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Acme Inc."
                      className={cn(
                        "h-11 rounded-lg border border-line bg-white px-3.5 text-base text-ink placeholder:text-ink/40 md:text-sm",
                        "focus-visible:ring-0 focus-visible:ring-offset-0",
                        focusRing,
                      )}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <label htmlFor="message" className="text-sm font-medium text-ink">
                      Message
                    </label>
                    <span
                      className={cn(
                        "text-xs tabular-nums transition-colors",
                        message.length > MAX * 0.9 ? "text-error" : "text-ink/50",
                      )}
                    >
                      {message.length}/{MAX}
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    maxLength={MAX}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value.slice(0, MAX));
                      clearError("message");
                    }}
                    onInvalid={handleInvalid<HTMLTextAreaElement>("message")}
                    rows={5}
                    placeholder="Tell us about your business, team size, and what you're hoping to solve…"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={cn(
                      "w-full resize-none rounded-lg border bg-white px-3.5 py-3 text-base leading-relaxed text-ink placeholder:text-ink/40 md:text-sm",
                      focusRing,
                      errors.message ? "border-error" : "border-line",
                    )}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-1.5 text-sm text-error">
                      {errors.message}
                    </p>
                  )}
                </div>

                {sendFailed && (
                  <p role="alert" className="rounded-lg border border-error/40 bg-error/5 px-4 py-3 text-sm leading-6 text-error">
                    That didn&rsquo;t send. Check your connection and try again, or
                    email us at info@vaakuos.com and we&rsquo;ll pick it up there.
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "h-12 w-full rounded-full bg-forest text-base font-semibold text-paper shadow-none hover:bg-ink",
                    focusRing,
                  )}
                >
                  {loading ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
                      Sending…
                    </>
                  ) : (
                    "Send message"
                  )}
                </Button>

                <p className="text-xs leading-relaxed text-ink/60">
                  By submitting you agree to our{" "}
                  <Link href="/privacy-policy" className={`underline underline-offset-2 hover:text-ink ${focusRing}`}>
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
