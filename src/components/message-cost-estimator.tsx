"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";

// Rates cited from /blog/whatsapp-business-api-pricing-india; service messages
// became billable at the utility rate on 1 October 2026.
const RATES = { marketing: 0.8631, utility: 0.115, service: 0.115 } as const;
const RATES_AS_OF = "Meta's India rate card, effective 1 July 2026";
const GST = 0.18;

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

function Field({
  label,
  hint,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div className="border-t border-line py-6">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-base font-semibold text-ink">
          {label}
        </label>
        <span className="font-display text-lg font-bold tracking-[-0.02em] text-forest">{display}</span>
      </div>
      <p className="mt-1 max-w-md text-sm leading-6 text-ink/65">{hint}</p>
      <Slider
        id={id}
        className="mt-4"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => onChange(v)}
        aria-label={label}
      />
    </div>
  );
}

export function MessageCostEstimator() {
  const [marketing, setMarketing] = useState(10000);
  const [utility, setUtility] = useState(9000);
  const [conversations, setConversations] = useState(1500);
  const [repliesPer, setRepliesPer] = useState(4);
  const [withGst, setWithGst] = useState(true);

  const cost = useMemo(() => {
    const serviceMessages = conversations * repliesPer;
    const marketingCost = marketing * RATES.marketing;
    const utilityCost = utility * RATES.utility;
    const serviceCost = serviceMessages * RATES.service;
    const beforeOct = marketingCost + utilityCost;
    const net = beforeOct + serviceCost;
    const total = withGst ? net * (1 + GST) : net;
    return {
      serviceMessages,
      marketingCost,
      utilityCost,
      serviceCost,
      net,
      total,
      addedByServiceBilling: serviceCost,
      marketingShare: net > 0 ? Math.round((marketingCost / net) * 100) : 0,
      beforeOct,
    };
  }, [marketing, utility, conversations, repliesPer, withGst]);

  const lines = [
    { label: "Marketing templates", detail: `${marketing.toLocaleString("en-IN")} × ₹${RATES.marketing}`, value: cost.marketingCost },
    { label: "Utility templates", detail: `${utility.toLocaleString("en-IN")} × ₹${RATES.utility}`, value: cost.utilityCost },
    { label: "Service replies", detail: `${cost.serviceMessages.toLocaleString("en-IN")} × ₹${RATES.service}`, value: cost.serviceCost },
  ];

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
      <div>
        <Field
          label="Marketing messages a month"
          hint="Offers, launches and campaigns. These cost about seven times a utility message, so they usually dominate the bill."
          value={marketing}
          display={marketing.toLocaleString("en-IN")}
          min={0}
          max={100000}
          step={500}
          onChange={setMarketing}
        />
        <Field
          label="Utility messages a month"
          hint="Order, appointment, booking and payment updates sent outside a 24-hour conversation."
          value={utility}
          display={utility.toLocaleString("en-IN")}
          min={0}
          max={100000}
          step={500}
          onChange={setUtility}
        />
        <Field
          label="Customer conversations a month"
          hint="Chats your team or bot replies to. Since 1 October 2026 Meta charges for these replies in India."
          value={conversations}
          display={conversations.toLocaleString("en-IN")}
          min={0}
          max={20000}
          step={100}
          onChange={setConversations}
        />
        <Field
          label="Replies per conversation"
          hint="Count every message you send back, including bot steps. Merging a greeting, the text and the buttons into one message cuts this number."
          value={repliesPer}
          display={String(repliesPer)}
          min={1}
          max={15}
          step={1}
          onChange={setRepliesPer}
        />

        <div className="flex items-center gap-3 border-t border-line pt-6">
          <input
            id="gst"
            type="checkbox"
            checked={withGst}
            onChange={(e) => setWithGst(e.target.checked)}
            className={`h-5 w-5 rounded border-line text-forest accent-forest ${focusRing}`}
          />
          <label htmlFor="gst" className="text-base text-ink">
            Add 18% GST
          </label>
        </div>
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-3xl bg-forest p-6 text-paper sm:p-8">
          <p className="text-base text-paper/80">What Meta charges you a month</p>
          <p className="mt-2 font-display text-5xl font-bold tracking-[-0.03em]">{inr(cost.total)}</p>
          <p className="mt-2 text-sm leading-6 text-paper/80">
            {withGst ? "Includes 18% GST. " : ""}Your provider may add a markup on top.
          </p>

          <dl className="mt-6 space-y-3 border-t border-paper/20 pt-5 text-sm">
            {lines.map((line) => (
              <div key={line.label} className="flex items-baseline justify-between gap-4">
                <dt>
                  {line.label}
                  <span className="block text-paper/70">{line.detail}</span>
                </dt>
                <dd className="font-semibold">{inr(line.value)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-6 space-y-4 text-base leading-7 text-ink/75">
          <p>
            Marketing templates are{" "}
            <span className="font-semibold text-ink">{cost.marketingShare}% of this bill</span>. They cost ₹
            {RATES.marketing} against ₹{RATES.utility} for a utility message, so cutting one campaign saves more than
            trimming hundreds of order updates.
          </p>
          <p>
            Service replies add{" "}
            <span className="font-semibold text-ink">{inr(cost.addedByServiceBilling)}</span> a month. Before 1 October
            2026 those were free, so the same volumes would have cost {inr(cost.beforeOct)} before GST.
          </p>
          <p className="text-sm text-ink/65">
            Rates are {RATES_AS_OF}. Conversations that start from a Click-to-WhatsApp ad stay free for 72 hours.{" "}
            <Link
              href="/blog/whatsapp-business-api-pricing-india"
              className={`font-semibold text-forest underline underline-offset-4 ${focusRing}`}
            >
              How these rates changed
            </Link>
          </p>
        </div>

        <div className="mt-8 border-t border-line pt-6">
          <p className="text-base leading-7 text-ink/75">
            VaakuOS is billed separately from what Meta charges.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Link
              href="/pricing"
              className={`inline-flex h-12 items-center rounded-full bg-ink px-6 text-base font-semibold text-paper transition-colors hover:bg-forest ${focusRing}`}
            >
              Compare plans
            </Link>
            <Link
              href="/demo"
              className={`text-base font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink ${focusRing}`}
            >
              Go through your numbers with us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
