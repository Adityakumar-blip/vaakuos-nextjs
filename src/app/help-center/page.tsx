import type { Metadata } from "next";
import Link from "next/link";

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
      "Yes, you can cancel your subscription at any time. There's no long-term commitment required.",
  },
  {
    question: "How do you measure revenue recovery?",
    answer:
      "We track every recovered sale through attributed analytics. You'll see exactly how much revenue VaakuOS has recovered for you in real-time dashboard.",
  },
];

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Help Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about VaakuOS.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 rounded-xl border border-border bg-card">
              <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for?
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
  );
}