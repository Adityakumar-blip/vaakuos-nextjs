"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper";

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
        "mt-20 rounded-3xl bg-forest px-6 py-14 text-paper md:mt-28 md:px-12 md:py-16",
        className,
      )}
    >
      <div className="mx-auto max-w-xl">
        <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-[-0.02em] md:text-4xl">
          Get new posts by email
        </h2>
        <p className="mt-3 text-base leading-7 text-paper/80">
          One email when we publish something new. No spam, unsubscribe anytime.
        </p>

        {done ? (
          <div className="mt-7 inline-flex items-center gap-2.5 rounded-full bg-paper/15 px-6 py-4 text-sm font-semibold">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            You&rsquo;re on the list — see you in your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className={`flex-1 rounded-full bg-paper/10 px-6 py-4 text-sm text-paper placeholder:text-paper/50 ${focusRing}`}
            />
            <button
              type="submit"
              className={`inline-flex items-center justify-center rounded-full bg-paper px-7 py-4 text-sm font-semibold text-forest transition-colors hover:bg-mint ${focusRing}`}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
