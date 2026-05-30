import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Interest",
  description: "Be the first to know when VaakuOS launches new features.",
  alternates: {
    canonical: "/register-interest",
  },
};

export default function RegisterInterestPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Get early access
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Register your interest and be the first to know when we launch new features.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                placeholder="Company name"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-bold transition-all"
            >
              Register Interest
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
