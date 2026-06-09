import type { Metadata } from "next";
import { FeaturesContent } from "./features-content";

export const metadata: Metadata = {
  title: "Features | VaakuOS — WhatsApp Commerce Platform",
  description:
    "Explore every VaakuOS feature: intent tracking, WhatsApp campaigns, automation flows, shared inbox, analytics, and enterprise-grade security. Everything you need to recover abandoned carts.",
  alternates: {
    canonical: "/features",
  },
};

export default function FeaturesPage() {
  return <FeaturesContent />;
}
