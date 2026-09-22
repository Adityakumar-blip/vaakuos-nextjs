import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, breadcrumbSchema } from "@/lib/seo";
import { WalkthroughButton } from "@/components/walkthrough-button";

export const metadata: Metadata = {
  title: "About VaakuOS",
  description:
    "Meet the team building VaakuOS—the intent-driven engine helping brands recover abandoned revenue with respectful, timely outreach.",
  alternates: {
    canonical: "/about",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

const heading = "font-display font-bold leading-[1.02] tracking-[-0.03em]";
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const inlineLink = `font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest ${focusRing}`;

export default function AboutPage() {
  return (
    <div className="bg-paper font-display text-ink">
      <JsonLd data={[organizationSchema, breadcrumb]} />

      <section className="px-4 pb-20 pt-28 md:pb-28 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <h1 className="max-w-3xl text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[2rem]">
            About VaakuOS
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/70">
            VaakuOS is customer messaging software: one inbox and one customer
            record across WhatsApp, email, Instagram and Messenger, for any
            business whose customers reach out by message.
          </p>
        </div>
      </section>

      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
            <h2 className={`${heading} text-4xl text-ink md:text-6xl`}>
              Why we built it.
            </h2>
            <p className="max-w-md text-lg leading-8 text-ink/70 md:justify-self-end">
              Recovery comes from messaging with shared customer context at
              the right moment, not from more reminders across apps that
              don&rsquo;t talk to each other.
            </p>
          </div>
          <div className="mt-14 max-w-prose space-y-5 border-t border-line pt-10 text-base leading-7 text-ink/70">
            <p>
              A customer who messages on WhatsApp, emails a question and later
              writes in on Instagram is one person, not three conversations.
              Most tools treat them as three, so the same question gets asked
              twice and nobody sees the full picture.
            </p>
            <p>
              VaakuOS keeps one record per customer across all four channels,
              and lets you set up follow-ups that trigger on what a customer
              does, not on a fixed schedule: a form filled, a cart left, an
              appointment booked, a payment falling due.
            </p>
            <p>
              We&rsquo;re a small team building for Shopify and WooCommerce
              brands first, and expanding to any business that talks to
              customers by message.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${heading} text-4xl text-ink md:text-6xl`}>What we believe.</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
            {values.map((v) => (
              <div key={v.title} className="border-t border-ink pt-6">
                <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-ink">{v.title}</h3>
                <p className="mt-3 max-w-prose text-base leading-7 text-ink/70">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest px-4 py-20 text-paper md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${heading} max-w-3xl text-4xl leading-[1.12] md:text-6xl md:leading-[1.08]`}>
            Curious how it would work for your business?
          </h2>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <WalkthroughButton tone="light" />
            <Link
              href="/contact"
              className={`self-start text-base font-semibold text-paper underline decoration-paper/40 underline-offset-4 hover:decoration-paper sm:self-auto ${focusRing} outline-paper`}
            >
              Ask the team directly
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const values = [
  {
    title: "One record, not three",
    desc: "A customer's history follows them across channels. Nobody on your team starts a conversation from zero.",
  },
  {
    title: "Triggered by behaviour, not a calendar",
    desc: "Follow-ups start when a customer does something, and stop the moment they buy, book, pay or reply.",
  },
  {
    title: "No invented numbers",
    desc: "We don't publish recovery rates or customer counts we haven't earned. What we show you is what your account actually did.",
  },
  {
    title: "Shopify and WooCommerce first",
    desc: "We build for D2C operations on those platforms first, then bring the same building blocks to other kinds of business.",
  },
];
