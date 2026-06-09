"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useBookDemo } from "@/contexts/book-demo-context";

const benefits = [
  "Set up in under 5 minutes",
  "No coding required",
  "Cancel anytime",
  "24/7 customer support",
];

export const CTASection = () => {
  const { openBookDemo } = useBookDemo();

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--muted))_100%)] px-4 py-16 sm:py-20 md:py-28">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(135deg,hsl(var(--primary)/0.05)_0_1px,transparent_1px_20px)]" />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="rounded-2xl border border-border bg-card/95 p-6 shadow-sm backdrop-blur md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
                Recovery launch
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                Turn missed checkouts into a measurable recovery engine.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
                Launch guided recovery workflows, connect your commerce stack,
                and measure the revenue VaakuOS brings back.
              </p>
            </div>

            <div className="lg:pt-2">
              <div className="flex flex-row gap-3">
                <Button
                  size="xl"
                  className="group flex-1 rounded-lg px-4 text-sm sm:flex-none sm:px-10 sm:text-base"
                  onClick={openBookDemo}
                >
                  Book Live Demo
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="flex-1 rounded-lg border-border bg-background px-4 text-sm text-foreground hover:border-primary/25 hover:bg-secondary hover:text-foreground sm:flex-none sm:px-10 sm:text-base"
                  asChild
                >
                  <Link href="/pricing">See Pricing</Link>
                </Button>
              </div>

              <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-muted/35">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 px-4 py-4 text-sm text-foreground"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
