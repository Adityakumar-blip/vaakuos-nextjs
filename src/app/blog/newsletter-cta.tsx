"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterCta({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setDone(true);
  };

  return (
    <section
      className={cn(
        "relative mt-20 overflow-hidden rounded-[2.5rem] bg-primary px-6 py-16 text-primary-foreground md:mt-28 md:px-12 md:py-20",
        className,
      )}
    >
      {/* Decorative atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,hsl(var(--accent)/0.35),transparent)] blur-xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,hsl(var(--tertiary)/0.30),transparent)] blur-xl" />
        <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(hsl(0_0%_100%/0.4)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.4)_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-tertiary">
          The Recovery Brief
        </p>
        <h2 className="text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
          Conversion insights,{" "}
          <span className="text-tertiary">every week.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed opacity-80 md:text-lg">
          Join 10,000+ marketers who receive our weekly breakdown of what&apos;s
          working in e-commerce.
        </p>

        {done ? (
          <div className="mx-auto mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-semibold backdrop-blur-sm">
            <CheckCircle2 className="h-5 w-5 text-tertiary" />
            You&apos;re on the list — see you in your inbox.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-tertiary/60"
            />
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-bold text-accent-foreground transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/30"
            >
              Subscribe
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        )}

        <p className="mt-5 text-xs tracking-wide opacity-60">
          Weekly · No spam · Unsubscribe anytime
        </p>
      </div>
    </section>
  );
}
