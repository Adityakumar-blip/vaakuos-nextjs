import type { Metadata } from "next";
import { BookDemoForm } from "@/components/BookDemoForm";

export const metadata: Metadata = {
  title: "Book a Free Demo",
  description:
    "See VaakuOS in action. Book a personalized demo to see how we recover abandoned revenue for your store.",
  alternates: {
    canonical: "/demo",
  },
};

export default function DemoPage() {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-16 pt-28 md:pb-24 md:pt-32">
      {/* ── Background — matches hero & contact sections ── */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--muted))_58%,hsl(var(--background))_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,hsl(var(--tertiary)/0.46),transparent_30%),radial-gradient(circle_at_88%_10%,hsl(var(--primary)/0.20),transparent_28%),linear-gradient(120deg,transparent_0%,hsl(var(--accent)/0.08)_45%,transparent_70%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.22] [background-image:linear-gradient(hsl(var(--foreground)/0.08)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.08)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="container relative z-10 mx-auto max-w-5xl">
        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">
            Book a demo
          </p>
          <h1 className="mb-5 text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
            See VaakuOS in action.
          </h1>
          <p className="mx-auto max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
            Book a personalized walkthrough and see exactly how we recover
            abandoned revenue for stores like yours.
          </p>
        </div>

        <div className="mt-8 md:mt-14">
          <BookDemoForm isPage={true} />
        </div>
      </div>
    </section>
  );
}
