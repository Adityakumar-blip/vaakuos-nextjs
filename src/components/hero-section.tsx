"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import Link from "next/link";
import { useBookDemo } from "@/contexts/book-demo-context";

const proofPoints = [
  "Intent tracking",
  "WhatsApp recovery",
  "Checkout sync",
];

export const HeroSection = () => {
  const { openBookDemo } = useBookDemo();

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden px-4 pb-16 pt-28 md:pb-20 md:pt-36">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--muted))_58%,hsl(var(--background))_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,hsl(var(--tertiary)/0.46),transparent_30%),radial-gradient(circle_at_88%_10%,hsl(var(--primary)/0.20),transparent_28%),linear-gradient(120deg,transparent_0%,hsl(var(--accent)/0.08)_45%,transparent_70%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.22] [background-image:linear-gradient(hsl(var(--foreground)/0.08)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.08)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="hero-fade-item hero-delay-2 mb-6 text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Recover abandoned carts before they turn cold.
          </h1>

          <p className="hero-fade-item hero-delay-3 mx-auto mb-8 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
            VaakuOS tracks intent, re-engages shoppers at the right moment, and
            converts missed purchases across every digital touchpoint.
          </p>

          <div className="hero-fade-item hero-delay-4 flex flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              className="group h-12 flex-1 rounded-lg px-4 text-sm font-semibold shadow-lg shadow-primary/15 sm:flex-none sm:px-7 sm:text-base"
              onClick={openBookDemo}
            >
              Book Live Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Link href="/calculator" className="flex-1 sm:flex-none">
              <Button
                variant="outline"
                size="lg"
                className="h-12 w-full rounded-lg border-foreground/15 bg-card/70 px-4 text-sm font-semibold text-foreground backdrop-blur-md hover:bg-secondary hover:text-foreground sm:px-7 sm:text-base"
              >
                Calculate ROI
              </Button>
            </Link>
          </div>

          <div className="hero-fade-item hero-delay-5 mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-muted-foreground">
            {proofPoints.map((point) => (
              <span key={point} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                {point}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-fade-item hero-delay-5 relative mx-auto mt-12 max-w-6xl md:mt-16">
          <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-2xl shadow-primary/20">
            <div className="flex items-center justify-between border-b border-border bg-background/80 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning" />
                <span className="h-2.5 w-2.5 rounded-full bg-tertiary" />
              </div>
              <div className="hidden rounded-md border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground sm:block">
                VaakuOS product walkthrough
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                <Clock3 className="h-3.5 w-3.5" />
                2 min
              </div>
            </div>

            <div className="relative overflow-hidden bg-card">
              <video
                className="block h-auto w-full"
                poster="/images/hero-dashboard-1280.jpg"
                controls
                preload="metadata"
              >
                <source src="/videos/vaakuos-demo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
