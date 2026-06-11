import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export const faqItems = [
  {
    question: "How does VaakuOS recover abandoned checkouts?",
    answer:
      "VaakuOS recovers abandoned checkouts by monitoring real-time shopper signals — cart additions, product views, and checkout drop-off — and triggering a timed, multi-step outreach sequence the moment intent to leave is detected. WhatsApp is the primary recovery channel because WhatsApp messages reach far higher open rates than email, and each message is personalized with the shopper's cart contents and a one-tap link back to checkout. If the first message doesn't convert, VaakuOS follows up across any connected channels at intervals tuned to the shopper's behavior, rather than blasting everyone on the same schedule. The instant an order is confirmed, every recovery flow for that shopper stops automatically, so no one is messaged after they have already purchased. Revenue from each recovered order is attributed back to the specific workflow that closed it, giving you a clear view of what each sequence earns.",
  },
  {
    question: "Which platforms can I connect first?",
    answer:
      "VaakuOS connects natively to the commerce and data tools most stores already run, so you can start recovering revenue without custom engineering. The fastest paths to go live are Shopify and WooCommerce, which sync abandoned-checkout events, customer context, and confirmed orders automatically once the plugin is installed. Beyond storefronts, VaakuOS connects to Google Sheets for lightweight data flows and Wix for hosted stores, with additional connectors for CRM, marketing, and automation tools such as HubSpot, Salesforce, Klaviyo, Slack, and Zapier available in the integrations area. Each connector keeps its own setup path, authentication method, and sync mode documented, so your team can pick the right route quickly. If a tool you depend on isn't listed yet, signed webhooks and an API let you push events into VaakuOS directly, and the team can confirm the best setup for more complex stacks.",
  },
  {
    question: "How long does setup take?",
    answer:
      "For most teams, VaakuOS is designed to go live the same day. The core flow is three steps: connect your store or data source through a native plugin or OAuth, map the recovery workflow you want to run, and turn on a test sequence to confirm messages fire correctly before opening it to live traffic. Native commerce connectors like Shopify and WooCommerce typically take under ten minutes to authenticate and begin syncing carts and orders, because VaakuOS normalizes that data automatically rather than asking you to build mappings by hand. More involved rollouts — custom event schemas, signed webhooks, or multi-channel sequences across CRM and marketing tools — take longer, and for those the VaakuOS team provides implementation support from first connection through QA. You stay in control of when a workflow moves from testing to production traffic.",
  },
  {
    question: "Can I measure recovery performance?",
    answer:
      "Yes. VaakuOS attributes recovered revenue back to the exact workflow, channel, and sequence step that closed each sale, so you can see true return on every recovery flow rather than a single blended number. Dashboards track the metrics that matter for cart recovery: how much revenue was at risk from abandoned checkouts, how much was recovered, completion-rate lift, and performance per channel such as WhatsApp versus email. Because attribution stays intact through to the confirmed order, you can compare sequences against one another, identify which message timing and channel mix performs best for your store, and retire the flows that underdeliver. This makes it straightforward to justify spend and to optimize: you tune sequences based on what actually recovers revenue, and the reporting can flow onward into your existing analytics or CRM stack for a complete picture.",
  },
  {
    question: "What happens after a sale is recovered?",
    answer:
      "The moment an order is confirmed, VaakuOS halts every active recovery flow for that shopper automatically — a safeguard we call Smart Sync. This is what prevents the most common and most damaging mistake in cart recovery: messaging a customer to come back and buy something they have already bought. Stopping outreach the instant the sale closes protects the customer experience and your brand's reputation on channels like WhatsApp, where over-messaging quickly leads to blocks and opt-outs. Attribution for the recovered order remains intact, so the sale is still credited to the workflow that earned it and continues to appear in your reporting. From there, the completed order keeps flowing through your normal systems — your store, analytics, and any connected CRM or marketing tools — so post-purchase journeys, fulfillment, and customer records all stay accurate without any manual cleanup.",
  },
] as const;

export const FaqSection = () => {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-20 md:py-28">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              Frequently asked questions.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              A short FAQ section keeps the homepage clear, handles common
              objections, and gives the page a more complete SaaS structure.
            </p>
          </div>

          <div>
            <Accordion
              type="single"
              collapsible
              className="divide-y divide-border/70"
            >
              {faqItems.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="border-0 px-0"
                >
                  <AccordionTrigger className="border-b border-border/70 px-0 py-6 text-left text-base font-semibold text-foreground no-underline hover:no-underline md:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-0 text-sm leading-7 text-muted-foreground md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="px-0 mt-2">
              <p className="text-sm text-muted-foreground">
                Need a walkthrough that matches your stack?
                <Link
                  href="/contact"
                  className="ml-1 font-semibold text-primary hover:underline"
                >
                  Talk to the team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
