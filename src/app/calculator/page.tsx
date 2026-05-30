import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Calculator",
  description: "Calculate how much revenue VaakuOS can help you recover.",
  alternates: {
    canonical: "/calculator",
  },
};

export default function CalculatorPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Calculate your ROI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how much revenue VaakuOS can help you recover based on your store data.
          </p>
        </div>

        <div className="max-w-xl mx-auto p-8 rounded-[2rem] border border-border bg-card">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Monthly Revenue (₹)
              </label>
              <input
                type="number"
                className="w-full h-12 rounded-lg border border-input bg-background px-4 text-lg"
                placeholder="10,00,000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Average Cart Value (₹)
              </label>
              <input
                type="number"
                className="w-full h-12 rounded-lg border border-input bg-background px-4 text-lg"
                placeholder="2,000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Monthly Abandoned Carts (%)
              </label>
              <input
                type="number"
                className="w-full h-12 rounded-lg border border-input bg-background px-4 text-lg"
                placeholder="70"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Current Recovery Rate (%)
              </label>
              <input
                type="number"
                className="w-full h-12 rounded-lg border border-input bg-background px-4 text-lg"
                placeholder="5"
              />
            </div>
            <button
              type="button"
              className="w-full py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-bold transition-all text-lg"
            >
              Calculate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
