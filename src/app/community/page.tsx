import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description: "Join the VaakuOS community of e-commerce professionals.",
  alternates: {
    canonical: "/community",
  },
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Join our community
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with other e-commerce professionals, share strategies, and learn from experts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl border border-border bg-card">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-lg font-bold mb-2">WhatsApp Community</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join our WhatsApp group for real-time discussions and support.
            </p>
            <a href="#" className="text-sm text-primary hover:underline">
              Join Now →
            </a>
          </div>
          <div className="text-center p-8 rounded-2xl border border-border bg-card">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-lg font-bold mb-2">Telegram Channel</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get updates, tips, and best practices delivered to your phone.
            </p>
            <a href="#" className="text-sm text-primary hover:underline">
              Join Now →
            </a>
          </div>
          <div className="text-center p-8 rounded-2xl border border-border bg-card">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-lg font-bold mb-2">Office Hours</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Weekly live sessions with our team and product experts.
            </p>
            <a href="#" className="text-sm text-primary hover:underline">
              Register →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
