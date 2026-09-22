import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PluginLogo } from "@/app/integrations/plugin-logo";
import { WalkthroughButton } from "@/components/walkthrough-button";
import { ChannelStamp, channels, type Channel } from "./channel";

const heading = "font-display font-bold leading-[1.02] tracking-[-0.03em]";
const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const inlineLink = `font-semibold underline underline-offset-4 transition-colors ${focusRing}`;

const incoming: { channel: Channel; text: string }[] = [
  { channel: "whatsapp", text: "Can I move my booking to 5 pm?" },
  { channel: "email", text: "Re: Invoice for September" },
  { channel: "instagram", text: "Any slots free this Saturday?" },
  { channel: "messenger", text: "Is there parking nearby?" },
];

const timeline: { channel: Channel; text: string; when: string }[] = [
  { channel: "instagram", text: "Asked about Saturday slots", when: "Mon" },
  { channel: "messenger", text: "Asked about parking", when: "Tue" },
  { channel: "whatsapp", text: "Moved booking to 5 pm", when: "Thu" },
  { channel: "email", text: "Replied to September invoice", when: "Fri" },
];

// Row height is fixed so the SVG curves meet each channel at its vertical centre.
const ROW = "h-20";

function Convergence() {
  return (
    <div className="mt-14 grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_minmax(80px,0.6fr)_minmax(0,1.1fr)] md:gap-0">
      <ul aria-label="Messages arriving on four channels">
        {incoming.map((m) => (
          <li key={m.channel} className={`flex items-center gap-4 ${ROW}`}>
            <ChannelStamp channel={m.channel} />
            <div className="min-w-0">
              <p className="text-sm text-ink/65">{channels[m.channel].name}</p>
              <p className="truncate text-lg font-semibold text-ink">{m.text}</p>
            </div>
          </li>
        ))}
      </ul>

      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" className="hidden h-80 w-full md:block">
        {incoming.map((m, i) => (
          <path
            key={m.channel}
            d={`M0 ${12.5 + i * 25} C 55 ${12.5 + i * 25}, 45 50, 100 50`}
            fill="none"
            className={`stroke-[2.5] ${channels[m.channel].stroke}`}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <span aria-hidden="true" className="ml-[15px] h-10 w-px bg-line md:hidden" />

      <div className="rounded-3xl bg-white p-6 shadow-[0_1px_0_rgb(var(--ink)/0.06),0_28px_56px_-28px_rgb(var(--ink)/0.3)] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-2xl font-bold tracking-[-0.02em] text-ink">Meera Kapoor</p>
            <p className="mt-0.5 text-sm text-ink/65">Customer since March 2025</p>
          </div>
          <span className="rounded-full bg-mint-soft px-3 py-1 text-sm font-semibold text-forest">One record</span>
        </div>
        <ol className="mt-5 space-y-3 border-t border-line pt-5">
          {timeline.map((t) => (
            <li key={t.text} className="flex items-center gap-3 text-[0.95rem]">
              <ChannelStamp channel={t.channel} size="sm" />
              <span className="flex-1 text-ink">{t.text}</span>
              <span className="text-sm text-ink/65">{t.when}</span>
            </li>
          ))}
        </ol>
        <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
          <div>
            <dt className="text-ink/65">Tags</dt>
            <dd className="mt-1 font-semibold text-ink">Regular, prefers WhatsApp</dd>
          </div>
          <div>
            <dt className="text-ink/65">Next follow-up</dt>
            <dd className="mt-1 font-semibold text-ink">Reminder, Sat 3 pm</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

const capabilities = [
  {
    title: "One inbox for the team",
    body: "Every channel lands in the same queue. Whoever picks up a chat sees what the customer said elsewhere, so nobody asks the same question twice.",
  },
  {
    title: "Follow-ups that start on their own",
    body: "Send a message when something happens: a form is filled, a cart is left, an appointment is booked, a payment falls due. Each follow-up stops as soon as the customer acts.",
  },
  {
    title: "Campaigns you can trace to a result",
    body: "Send a broadcast or newsletter and follow it from sent to delivered, read, replied and converted, per channel. Keep what works, drop what doesn't.",
  },
];

export function Capabilities() {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
          <h2 className={`${heading} text-4xl text-ink md:text-6xl`}>
            What changes when every channel lands in one place.
          </h2>
          <p className="max-w-md text-lg leading-8 text-ink/70 md:justify-self-end">
            Today one customer&rsquo;s questions sit in four different apps. In
            VaakuOS they arrive as one record your whole team can read.
          </p>
        </div>
        <Convergence />
        <div className="mt-20 grid gap-10 md:grid-cols-3 md:gap-10">
          {capabilities.map((item) => (
            <div key={item.title} className="border-t border-ink pt-6">
              <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-ink">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-ink/70">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const integrations = [
  { name: "Shopify", logo: "shopify" },
  { name: "WooCommerce", logo: "woocommerce" },
  { name: "Wix", logo: "wix" },
  { name: "Google Sheets", logo: "sheets" },
] as const;

const steps = [
  {
    title: "Connect your channels",
    body: "Link your WhatsApp Business number, your sending email domain, and your Instagram and Facebook pages. Each takes a few clicks and no code.",
  },
  {
    title: "Bring in customers and tools",
    body: "Import contacts from a spreadsheet, or sync them from the tools you already use. Anything else can push events through the API.",
    logos: true,
  },
  {
    title: "Switch on your first follow-up",
    body: "Start from a template for your kind of business, send a test to your own phone, then turn it on for real customers.",
  },
];

export function GoLive() {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className={`${heading} max-w-3xl text-4xl text-ink md:text-6xl`}>
          From sign-up to your first automated reply.
        </h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="relative pl-16 md:pl-0">
              {/* the connecting line makes the three steps read as one path */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-2.5rem] left-6 top-12 w-px bg-line md:bottom-auto md:left-14 md:right-[-2rem] md:top-6 md:h-px md:w-auto"
                />
              )}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full bg-forest font-display text-xl font-bold text-paper md:static"
              >
                {i + 1}
              </span>
              <h3 className="font-display text-2xl font-bold tracking-[-0.02em] text-ink md:mt-7">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-ink/70">{step.body}</p>
              {step.logos && (
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {integrations.map((it) => (
                    <PluginLogo key={it.logo} logo={it.logo} name={it.name} className="h-9 w-9 rounded-lg" />
                  ))}
                  <Link href="/integrations" className={`ml-2 text-sm text-forest decoration-forest/30 hover:decoration-forest ${inlineLink}`}>
                    Browse integrations
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export const faqItems = [
  {
    question: "Which channels does VaakuOS support?",
    answer:
      "VaakuOS works with the WhatsApp Business API, email, Instagram direct messages and Facebook Messenger. Messages from all four arrive in one inbox, and each customer keeps a single record no matter which channel they used. You can reply on the channel the customer chose, or move the conversation to another one when it makes sense, such as sending a long document by email.",
  },
  {
    question: "Is VaakuOS only for e-commerce stores?",
    answer:
      "No. Online stores use it for cart recovery and order updates, but the same building blocks work for any business that talks to customers by message. Coaching institutes use it for enquiries and fee reminders, clinics for appointments and follow-ups, and real estate and lending teams for lead response and document collection.",
  },
  {
    question: "Do I need a developer to set it up?",
    answer:
      "No. Channels connect through their official sign-in flows, and contacts come in from a spreadsheet or a native integration such as Shopify, WooCommerce, Wix or Google Sheets. A developer only helps if you want to send custom events from your own software through the API.",
  },
  {
    question: "How do you stop customers getting too many messages?",
    answer:
      "Every automated follow-up has a stop condition. When the customer buys, books, pays or replies, the sequence for that person ends. Campaigns only go to contacts who have opted in for that channel, and WhatsApp templates go through Meta's approval before you can send them.",
  },
  {
    question: "Can I see which messages led to a sale or booking?",
    answer:
      "Yes. Each message is tracked from sent to delivered and read, and replies and conversions are tied back to the campaign or follow-up that caused them. You can compare channels and message versions side by side, and see what each one earned.",
  },
] as const;

export function Faq() {
  return (
    <section className="px-4 pb-20 md:pb-28">
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-line pt-20 md:pt-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 className={`${heading} text-4xl text-ink md:text-6xl`}>Questions teams ask before switching.</h2>
          <p className="mt-6 text-lg leading-8 text-ink/70">
            Anything else?{" "}
            <Link href="/contact" className={`text-forest decoration-forest/30 hover:decoration-forest ${inlineLink}`}>
              Ask the team directly
            </Link>
          </p>
        </div>
        <Accordion type="single" collapsible className="border-t border-ink">
          {faqItems.map((faq, i) => (
            <AccordionItem key={faq.question} value={`faq-${i}`} className="border-b border-line">
              <AccordionTrigger className="py-6 text-left font-display text-xl font-bold tracking-[-0.01em] text-ink hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-7 text-ink/70">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

const closingSlot = "rounded-[0.14em] bg-paper/15 px-[0.1em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]";

export function Closing() {
  return (
    <section className="bg-forest px-4 py-20 text-paper md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* echoes the hero's rule sentence so the page opens and closes in the same voice */}
        <h2 className={`${heading} max-w-5xl text-4xl leading-[1.12] md:text-7xl md:leading-[1.08]`}>
          When you <span className={closingSlot}>book a walkthrough</span>, we&rsquo;ll map{" "}
          <span className={closingSlot}>your channels</span> and set up{" "}
          <span className={closingSlot}>your first rule</span> with you.
        </h2>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <WalkthroughButton tone="light" />
          <Link href="/docs" className={`self-start text-base text-paper decoration-paper/40 hover:decoration-paper sm:self-auto ${inlineLink}`}>
            Read the setup guide
          </Link>
        </div>
      </div>
    </section>
  );
}
