import type { Metadata } from "next";
import { BookDemoForm } from "@/components/BookDemoForm";

export const metadata: Metadata = {
  title: "Book a Free Demo",
  description:
    "See VaakuOS in action. Book a personalized demo to see how we recover abandoned revenue for your store.",
  alternates: {
    canonical: "/demo",
  },
};

export default function DemoPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            See VaakuOS in action
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book a personalized demo and see how we can help you recover abandoned revenue.
          </p>
        </div>

        <BookDemoForm isPage={true} />
      </div>
    </div>
  );
}
