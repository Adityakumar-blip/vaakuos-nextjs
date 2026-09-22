import type { Metadata } from "next";
import Link from "next/link";
import { MessageCostEstimator } from "@/components/message-cost-estimator";

export const metadata: Metadata = {
  title: "WhatsApp Message Cost Calculator (India)",
  description:
    "Estimate what WhatsApp Business API messaging costs your business each month on Meta's India rates: marketing and utility templates, service replies since 1 October 2026, and GST.",
  alternates: {
    canonical: "/calculator",
  },
};

export default function CalculatorPage() {
  return (
    <div className="bg-paper font-display text-ink">
      <section className="px-4 pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
            <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] md:text-6xl">
              What will WhatsApp actually cost you each month?
            </h1>
            <p className="max-w-md text-lg leading-8 text-ink/70 md:justify-self-end">
              Meta bills per message, and the rate depends on what kind of message
              it is. Put in your volumes to see where the money goes.
            </p>
          </div>

          <div className="mt-14">
            <MessageCostEstimator />
          </div>

          <p className="mt-16 max-w-2xl border-t border-line pt-8 text-base leading-7 text-ink/70">
            This estimate covers what Meta charges. It doesn&rsquo;t include your
            provider&rsquo;s markup or your VaakuOS plan.{" "}
            <Link
              href="/blog/whatsapp-business-api-pricing-india"
              className="font-semibold text-forest underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Read how the India rates work
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
