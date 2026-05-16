import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact VaakuOS - Book a Demo",
  description:
    "Get in touch with VaakuOS. Book a demo, talk to sales, or reach our support team.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Get in touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <form className="space-y-6">
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
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                placeholder="john@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                className="w-full h-32 rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
                placeholder="How can we help?"
              />
            </div>
            <Button type="submit" className="w-full rounded-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}