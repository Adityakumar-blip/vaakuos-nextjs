import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Help Center & FAQs",
  description:
    "Find answers to common questions about VaakuOS, pricing, integrations, and getting started.",
  alternates: {
    canonical: "/help-center",
  },
  robots: { index: false, follow: true },
};

const faqs = [
  {
    question: "Which channels does VaakuOS support?",
    answer:
      "WhatsApp, email, Instagram and Messenger. Messages from all four arrive in one inbox, and each customer keeps a single record no matter which channel they used.",
  },
  {
    question: "How do I connect VaakuOS to my store?",
    answer:
      "We offer native integrations with Shopify and WooCommerce, plus a Google Sheets import for contacts. Other tools can push events in through the API.",
  },
  {
    question: "Do I need a developer to set it up?",
    answer:
      "No. Channels connect through their official sign-in flows, and no code is required unless you want to send custom events from your own software.",
  },
  {
    question: "How do automated follow-ups stop?",
    answer:
      "Every follow-up has a stop condition. When the customer buys, books, pays or replies, the sequence for that person ends.",
  },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const inlineLink = `font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest ${focusRing}`;

export default function HelpCenterPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
      />
      <div className="min-h-screen bg-paper font-display text-ink">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <h1 className="max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[2rem]">
            Help center
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-ink/70">
            A full help center isn&rsquo;t live yet. Here are the questions
            people ask most before setup.
          </p>

          <ul className="mt-14 divide-y divide-line border-t border-ink">
            {faqs.map((faq) => (
              <li key={faq.question} className="py-6">
                <h2 className="font-display text-xl font-bold tracking-[-0.01em] text-ink">{faq.question}</h2>
                <p className="mt-2 max-w-prose text-base leading-7 text-ink/70">{faq.answer}</p>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-lg text-ink/70">
            Anything else?{" "}
            <Link href="/contact" className={inlineLink}>
              Ask the team directly
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
