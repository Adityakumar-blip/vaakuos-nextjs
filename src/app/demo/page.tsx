import type { Metadata } from "next";
import { BookDemoForm } from "@/components/BookDemoForm";

export const metadata: Metadata = {
  title: "Book a walkthrough",
  description:
    "Book a walkthrough with the VaakuOS team. We'll look at the channels your customers use — WhatsApp, email, Instagram and Messenger — and set up your first follow-up together.",
  alternates: {
    canonical: "/demo",
  },
  robots: { index: false, follow: true },
};

export default function DemoPage() {
  return (
    <section className="bg-paper px-4 pb-20 pt-28 font-display text-ink md:pb-28 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-12">
          <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink md:text-6xl">
            Book a walkthrough.
          </h1>
          <p className="max-w-md text-lg leading-8 text-ink/70 md:justify-self-end">
            A walkthrough is a 15-minute call with our team. We&apos;ll look at the channels
            your customers already use — WhatsApp, email, Instagram or Messenger — and set
            up your first follow-up together.
          </p>
        </div>

        <div className="mt-14 md:mt-20">
          <BookDemoForm isPage={true} />
        </div>
      </div>
    </section>
  );
}
