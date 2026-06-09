import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact VaakuOS — Book a Demo or Talk to Sales",
  description:
    "Get in touch with VaakuOS. Book a live demo, talk to sales about pricing, or reach our support team. We typically respond within one business day.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
