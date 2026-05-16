import type { Metadata } from "next";

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
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            See VaakuOS in action
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book a personalized demo and see how we can help you recover abandoned revenue.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <form className="space-y-6 p-8 rounded-[2rem] border border-border bg-card">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First name</label>
                <input
                  type="text"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last name</label>
                <input
                  type="text"
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Work email</label>
              <input
                type="email"
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                placeholder="john@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company name</label>
              <input
                type="text"
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                placeholder="Your company"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Monthly revenue</label>
              <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                <option>Select range</option>
                <option>Under ₹10L</option>
                <option>₹10L - ₹50L</option>
                <option>₹50L - ₹1Cr</option>
                <option>₹1Cr+</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-bold transition-all"
            >
              Book Demo
            </button>
            <p className="text-xs text-center text-muted-foreground">
              By submitting, you agree to our{" "}
              <a href="/privacy-policy" className="underline hover:text-foreground">
                Privacy Policy
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}