import type { Metadata } from "next";
import { PricingContent } from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing plans that scale with you",
  description:
    "Pick a VaakuOS plan to automate recovery, messaging, and conversions—built for fast-growing teams.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
