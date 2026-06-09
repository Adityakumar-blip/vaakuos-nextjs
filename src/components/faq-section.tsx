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
      "It monitors intent signals, triggers the appropriate recovery flow, and stops automatically once the order is completed.",
  },
  {
    question: "Which platforms can I connect first?",
    answer:
      "The homepage currently highlights Shopify, WooCommerce, Google Sheets, and Wix, with more integrations available in the integrations area.",
  },
  {
    question: "How long does setup take?",
    answer:
      "For most teams, setup is designed to be quick and low-friction. You connect your stack, configure the workflow, and begin testing recovery flows.",
  },
  {
    question: "Can I measure recovery performance?",
    answer:
      "Yes. The homepage already emphasizes benchmark ranges, and the product is designed to attribute recovered revenue and completion lift back to each workflow.",
  },
  {
    question: "What happens after a sale is recovered?",
    answer:
      "Recovery automation stops, attribution remains intact, and the completed order can continue flowing through your reporting or CRM stack.",
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
