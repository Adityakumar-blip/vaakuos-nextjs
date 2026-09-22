import Link from "next/link";
import { ChannelStamp, channels, type Channel } from "./channel";

type Item = { channel: Channel; business: string; text: string };

// Illustrative messages; the spread of businesses is the point of the section.
const rowOne: Item[] = [
  { channel: "whatsapp", business: "Online store", text: "Your linen shirt is still in your cart. Want us to hold your size till tonight?" },
  { channel: "messenger", business: "Clinic", text: "Dr. Mehta has 11:30 free on Saturday. Shall I book it?" },
  { channel: "email", business: "Coaching institute", text: "Here's the brochure and weekend batch timings you asked for." },
  { channel: "whatsapp", business: "Hotel", text: "Your room is ready from 2 pm. Here's your check-in link." },
  { channel: "instagram", business: "Salon", text: "Saturday 4 pm is free with Ritu. Shall I hold it for you?" },
  { channel: "whatsapp", business: "Real estate", text: "Three 2BHKs in Whitefield match your budget. Visit one this Sunday?" },
];

const rowTwo: Item[] = [
  { channel: "whatsapp", business: "Lender", text: "Your EMI of ₹12,400 is due on 5 Oct. Pay in one tap." },
  { channel: "email", business: "Online store", text: "Order #4187 has shipped. It arrives Thursday." },
  { channel: "whatsapp", business: "Restaurant", text: "Table for four at 8 pm tonight. Reply C to confirm." },
  { channel: "instagram", business: "Gym", text: "Your membership renews on 1 Oct. Keeping the same plan?" },
  { channel: "messenger", business: "Travel agent", text: "Your Goa quote is ready, with two hotel options." },
  { channel: "whatsapp", business: "Repair shop", text: "Your phone is repaired. Collect it till 7 pm today." },
];

function Chip({ item, duplicate }: { item: Item; duplicate?: boolean }) {
  return (
    <li aria-hidden={duplicate} className="w-[21rem] shrink-0 rounded-2xl bg-paper/[0.07] p-5 ring-1 ring-inset ring-paper/15">
      <div className="flex items-center gap-2.5">
        <ChannelStamp channel={item.channel} size="sm" />
        <span className="text-sm font-semibold text-mint">{item.business}</span>
        <span className="ml-auto text-sm text-paper/60">{channels[item.channel].name}</span>
      </div>
      <p className="mt-3 text-[0.95rem] leading-6 text-paper">{item.text}</p>
    </li>
  );
}

function Row({ items, direction }: { items: Item[]; direction: "left" | "right" }) {
  return (
    <div className="marquee">
      <ul className={`marquee-track ${direction === "right" ? "marquee-track-reverse" : ""}`}>
        {items.map((item) => (
          <Chip key={item.business + item.text} item={item} />
        ))}
        {items.map((item) => (
          <Chip key={`copy-${item.business}${item.text}`} item={item} duplicate />
        ))}
      </ul>
    </div>
  );
}

export function Industries() {
  return (
    <section className="overflow-hidden bg-ink py-20 text-paper md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
          <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] md:text-6xl">
            Built for any business whose customers message first.
          </h2>
          <p className="max-w-md text-lg leading-8 text-paper/70 md:justify-self-end">
            A cart, a booking, an enquiry, an EMI. Different days, same building
            blocks: something happens, and the right message goes out.
          </p>
        </div>
      </div>

      {/* Full-bleed so the rows run past both edges of the column */}
      <div className="mt-14 space-y-4 [--marquee-duration:70s] md:mt-16">
        <Row items={rowOne} direction="left" />
        <Row items={rowTwo} direction="right" />
      </div>

      <div className="mx-auto mt-14 max-w-6xl px-4">
        <p className="max-w-2xl text-lg leading-8 text-paper/75">
          Gyms, travel agents, repair shops, NGOs. If your customers reach you by
          message, it works the same way.{" "}
          <Link
            href="/contact"
            className="font-semibold text-mint underline decoration-mint/40 underline-offset-4 transition-colors hover:decoration-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
          >
            Tell us what you run
          </Link>
        </p>
      </div>
    </section>
  );
}
