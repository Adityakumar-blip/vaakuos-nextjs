import Link from "next/link";
import { WalkthroughButton } from "@/components/walkthrough-button";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const inlineLink = `font-semibold underline underline-offset-4 transition-colors ${focusRing}`;

type Item = { title: string; body: string; beta?: boolean };
type Group = { heading: string; lead: string; items: Item[] };

// Every claim here is checked against FEATURES.md. Nothing marked 🎯 (aspirational)
// made it in; anything marked 🔧 (partial) is labeled "In beta" instead of stated as done.
const groups: Group[] = [
  {
    heading: "One conversation, wherever it starts.",
    lead: "Connect your WhatsApp Business number, your sending email domain, and your Instagram and Facebook pages. Every reply ties back to the same customer, on whichever channel they used.",
    items: [
      {
        title: "WhatsApp Business API",
        body: "Connect through Meta's official embedded sign-in, no developer required. Send text, media and approved templates, with delivery tracked from sent to read.",
      },
      {
        title: "Message templates",
        body: "Build templates with variables for a name, a product or a discount code, and submit them to Meta for approval without leaving the dashboard.",
      },
      {
        title: "Team inbox",
        beta: true,
        body: "Every WhatsApp conversation lands in one queue your team can read. Assigning chats to teammates and adding private notes are what we're building next.",
      },
    ],
  },
  {
    heading: "Follow-ups that start without you.",
    lead: "Write a rule once. VaakuOS reacts to what a customer does, or doesn't do, so nobody has to remember to send anything by hand.",
    items: [
      {
        title: "Auto-response rules",
        body: "Reply the moment a keyword arrives, any hour of the day, with an approved template or a plain message.",
      },
      {
        title: "Scheduled campaigns",
        body: "Queue a campaign for a specific date and time. It moves from draft to scheduled to sent, with status tracked the whole way.",
      },
      {
        title: "Flow builder",
        beta: true,
        body: "Design multi-step sequences with triggers, waits and branches in the visual builder. We're finishing the engine that runs every step end to end.",
      },
    ],
  },
  {
    heading: "A customer record you can actually use.",
    lead: "Tags, custom fields and filters, so every conversation and campaign can pull from the same list — whatever kind of business you run.",
    items: [
      {
        title: "Contact management",
        body: "Store your list with tags and custom fields of any type: text, number, date or a dropdown.",
      },
      {
        title: "Bulk import",
        body: "Bring in your whole list from a CSV or Excel file, with duplicate detection and a sample template to match your columns.",
      },
      {
        title: "Filtering and search",
        body: "Filter contacts by any field, tag or status, or search by name and phone, to build the list a campaign should reach.",
      },
    ],
  },
  {
    heading: "Campaigns you can trace to a result.",
    lead: "Send once or queue ahead, personalize per customer, and see what happened to every message you sent.",
    items: [
      {
        title: "Send and schedule",
        body: "Draft a campaign, send it immediately or queue it for later. Pause, reschedule or update several campaigns at once.",
      },
      {
        title: "Personalization",
        body: "Drop in a customer's name, product or discount code at send time, pulled straight from their contact record.",
      },
      {
        title: "Delivery tracking",
        body: "Every message is tracked from sent to delivered to read, straight from Meta's webhooks, so you know what actually reached someone.",
      },
    ],
  },
];

const platformItems: Item[] = [
  {
    title: "Role-based access",
    body: "Create roles with exactly the permissions a teammate needs, chosen from twenty-plus options across contacts, campaigns, billing and more.",
  },
  {
    title: "API tokens and webhooks",
    body: "Generate scoped tokens for your own integrations, and validate or revoke them from a single place.",
  },
  {
    title: "Billing",
    body: "Manage plans and payments through Razorpay, including add-ons, with every billing event verified by webhook signature.",
  },
  {
    title: "Sandbox environment",
    body: "Test campaigns, flows and integrations in a staging environment before anything reaches a real customer.",
  },
  {
    title: "Data isolation and encryption",
    body: "Every account's data is isolated from every other, and integration tokens are encrypted at rest with AES-256.",
  },
];

function FeatureGroup({ group }: { group: Group }) {
  return (
    <section className="px-4 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
          <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink md:text-6xl">
            {group.heading}
          </h2>
          <p className="max-w-md text-lg leading-8 text-ink/70 md:justify-self-end">{group.lead}</p>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-10">
          {group.items.map((item) => (
            <div key={item.title} className="border-t border-ink pt-6">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em] text-ink">
                  {item.title}
                </h3>
                {item.beta && (
                  <span className="rounded-full bg-mint-soft px-3 py-1 text-xs font-semibold text-forest">
                    In beta
                  </span>
                )}
              </div>
              <p className="mt-3 text-base leading-7 text-ink/70">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FeaturesContent() {
  return (
    <div className="bg-paper font-display text-ink">
      {/* ── Hero ── */}
      <section className="px-4 pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
            <h1 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[2rem]">
              Everything VaakuOS does across WhatsApp, email, Instagram and Messenger.
            </h1>
            <p className="max-w-md text-lg leading-8 text-ink/70 md:justify-self-end">
              One record per customer, automations that start on their own, and a
              growing platform underneath. Here&rsquo;s what&rsquo;s live today.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between md:mt-14 md:pt-14">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <WalkthroughButton />
              <Link
                href="/pricing"
                className={`self-start text-base text-ink decoration-ink/25 hover:decoration-ink sm:self-auto ${inlineLink}`}
              >
                Compare plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {groups.map((group) => (
        <FeatureGroup key={group.heading} group={group} />
      ))}

      {/* ── Platform and security (ink band) ── */}
      <section className="bg-ink px-4 py-20 text-paper md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
            <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] md:text-6xl">
              Built to hand to a team, not just a founder.
            </h2>
            <p className="max-w-md text-lg leading-8 text-paper/70 md:justify-self-end">
              Role-based permissions, tokens for developers, and billing that
              doesn&rsquo;t need a spreadsheet.
            </p>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-10">
            {platformItems.map((item) => (
              <div key={item.title} className="border-t border-paper/30 pt-6">
                <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-paper/70">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing (forest band) ── */}
      <section className="bg-forest px-4 py-20 text-paper md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display max-w-5xl text-4xl font-bold leading-[1.12] tracking-[-0.03em] md:text-7xl md:leading-[1.08]">
            When you{" "}
            <span className="rounded-[0.14em] bg-paper/15 px-[0.1em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
              book a walkthrough
            </span>
            , we&rsquo;ll map{" "}
            <span className="rounded-[0.14em] bg-paper/15 px-[0.1em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
              what&rsquo;s live today
            </span>{" "}
            to how you work.
          </h2>
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <WalkthroughButton tone="light" />
            <Link
              href="/docs"
              className={`self-start text-base text-paper decoration-paper/40 hover:decoration-paper sm:self-auto ${inlineLink}`}
            >
              Read the setup guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
