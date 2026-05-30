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
};

const faqs = [
  {
    question: "How does VaakuOS work?",
    answer:
      "VaakuOS tracks user intent signals in real-time. When a shopper shows high-intent behavior (like adding items to cart but not checking out), our AI engine automatically triggers personalized re-engagement messages across WhatsApp, Instagram, or email.",
  },
  {
    question: "What channels does VaakuOS support?",
    answer:
      "VaakuOS supports WhatsApp, Instagram Direct Messages, Facebook Messenger, SMS, and Email. You can run campaigns across all channels simultaneously or focus on one.",
  },
  {
    question: "How do I integrate VaakuOS with my store?",
    answer:
      "We offer native integrations with Shopify, WooCommerce, BigCommerce, and Magento 2. For other platforms, we provide a universal webhook integration. Setup typically takes 5-10 minutes.",
  },
  {
    question: "What's included in the free trial?",
    answer:
      "The 14-day free trial includes full access to all Growth plan features: up to 1,000 messages, all integrations, priority support, and API access.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes, you can cancel your subscription at any time. There&apos;s no long-term commitment required.",
  },
  {
    question: "How do you measure revenue recovery?",
    answer:
      "We track every recovered sale through attributed analytics. You&apos;ll see exactly how much revenue VaakuOS has recovered for you in the real-time dashboard.",
  },
];

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
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              Help Center
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Find answers to common questions about VaakuOS.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 text-lg font-bold">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="mb-4 text-muted-foreground">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
