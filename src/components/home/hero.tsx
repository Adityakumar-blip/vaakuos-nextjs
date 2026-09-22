"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import { WalkthroughButton } from "@/components/walkthrough-button";
import { Channel, channels } from "./channel";

// A rule reads as a sentence; slots are the parts a business sets in VaakuOS.
type Part = string | { slot: string; channel?: Channel };

type Rule = { id: string; parts: Part[] };

const rules: Rule[] = [
  { id: "store", parts: ["When ", { slot: "a shopper leaves checkout" }, ", nudge them on ", { slot: "WhatsApp", channel: "whatsapp" }, " ", { slot: "an hour later" }, ", and send the invoice by ", { slot: "email", channel: "email" }, " once they pay."] },
  { id: "salon", parts: ["When ", { slot: "a client books" }, " on ", { slot: "Instagram", channel: "instagram" }, ", confirm on ", { slot: "WhatsApp", channel: "whatsapp" }, " ", { slot: "the evening before" }, ", and invite them back ", { slot: "five weeks later" }, "."] },
  { id: "restaurant", parts: ["When ", { slot: "someone asks for a table" }, " on ", { slot: "Messenger", channel: "messenger" }, ", confirm on ", { slot: "WhatsApp", channel: "whatsapp" }, " ", { slot: "two hours before" }, ", and send a feedback link by ", { slot: "email", channel: "email" }, "."] },
  { id: "hotel", parts: ["When ", { slot: "a guest books a room" }, ", send check-in details on ", { slot: "WhatsApp", channel: "whatsapp" }, " ", { slot: "the day before" }, ", and the invoice by ", { slot: "email", channel: "email" }, " at checkout."] },
  { id: "clinic", parts: ["When ", { slot: "a patient books" }, " on ", { slot: "Messenger", channel: "messenger" }, ", confirm on ", { slot: "WhatsApp", channel: "whatsapp" }, " ", { slot: "a day before" }, ", and send the prescription by ", { slot: "email", channel: "email" }, "."] },
  { id: "institute", parts: ["When ", { slot: "a parent asks about fees" }, " on ", { slot: "Instagram", channel: "instagram" }, ", send the brochure by ", { slot: "email", channel: "email" }, " and remind them on ", { slot: "WhatsApp", channel: "whatsapp" }, " ", { slot: "before the demo class" }, "."] },
  { id: "property", parts: ["When ", { slot: "a lead comes in from an ad" }, ", reply on ", { slot: "WhatsApp", channel: "whatsapp" }, " ", { slot: "within a minute" }, ", and send floor plans by ", { slot: "email", channel: "email" }, " after the site visit."] },
  { id: "gym", parts: ["When ", { slot: "a membership ends in a week" }, ", remind the member on ", { slot: "WhatsApp", channel: "whatsapp" }, ", and email the renewal link ", { slot: "if they don't reply" }, "."] },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

export function Hero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const active = rules[index];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing || hovering) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % rules.length), 4500);
    return () => window.clearInterval(id);
  }, [playing, hovering]);

  let slotCount = 0;

  return (
    <section className="px-4 pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-12">
          <h1 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[2rem]">
            Customer messaging across WhatsApp, email, Instagram and Messenger, from one place.
          </h1>
          <p className="max-w-md text-base leading-7 text-ink/70 md:justify-self-end">
            Each customer gets one record, whatever channel they use. Write a
            follow-up rule once, and VaakuOS sends the right message on the right
            channel at the right moment.
          </p>
        </div>

        <div
          className="mt-10 border-y border-line py-10 md:mt-14 md:py-14"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
        >
          {/* key remount replays the slot animation when the rule changes */}
          <p
            key={active.id}
            className="font-display text-[2.1rem] font-bold leading-[1.18] tracking-[-0.025em] text-ink sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[1.12]"
          >
            {active.parts.map((part, i) => {
              if (typeof part === "string") return <span key={i}>{part}</span>;
              const delay = `${slotCount++ * 90}ms`;
              if (part.channel) {
                const { icon: Icon, bg, decoration } = channels[part.channel];
                return (
                  <span
                    key={i}
                    className={`slot-in inline-flex items-baseline gap-[0.18em] whitespace-nowrap underline decoration-[0.08em] underline-offset-[0.16em] [text-decoration-skip-ink:none] ${decoration}`}
                    style={{ animationDelay: delay }}
                  >
                    <span
                      className={`inline-flex h-[0.78em] w-[0.78em] translate-y-[0.08em] items-center justify-center self-center rounded-[0.2em] text-white ${bg}`}
                      aria-hidden="true"
                    >
                      <Icon className="h-[0.48em] w-[0.48em]" strokeWidth={2.5} />
                    </span>
                    {part.slot}
                  </span>
                );
              }
              return (
                <span
                  key={i}
                  className="slot-in rounded-[0.14em] bg-mint-soft px-[0.1em] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]"
                  style={{ animationDelay: delay }}
                >
                  {part.slot}
                </span>
              );
            })}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <WalkthroughButton />
            <Link
              href="/pricing"
              className={`self-start text-base font-semibold text-ink underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-ink sm:self-auto ${focusRing}`}
            >
              Compare plans
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className={`inline-flex items-center gap-2 self-start rounded-full text-sm font-medium text-ink/65 transition-colors hover:text-ink sm:self-auto ${focusRing}`}
          >
            {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            {playing ? "Pause examples" : "Play examples"}
          </button>
        </div>
      </div>
    </section>
  );
}
