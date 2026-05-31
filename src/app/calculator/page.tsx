import type { Metadata } from "next";
import { RevenueCalculator } from "@/components/RevenueCalculator";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description: "Calculate how much revenue VaakuOS can help you recover.",
  alternates: {
    canonical: "/calculator",
  },
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen pt-20">
      <RevenueCalculator />
    </div>
  );
}
