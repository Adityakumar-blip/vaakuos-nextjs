import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developer Documentation",
  description:
    "VaakuOS API docs, integration guides, and SDK references for developers.",
  alternates: {
    canonical: "/documentation",
  },
};

export default function DocumentationPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with VaakuOS API, webhooks, and integrations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-border bg-card" id="getting-started">
            <h3 className="text-lg font-bold mb-2">Getting Started</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Learn the basics of VaakuOS API and authentication.
            </p>
            <a href="#getting-started" className="text-sm text-primary hover:underline">
              Read the guide →
            </a>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card" id="api-reference">
            <h3 className="text-lg font-bold mb-2">API Reference</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Complete reference for all VaakuOS API endpoints.
            </p>
            <a href="#api-reference" className="text-sm text-primary hover:underline">
              View reference →
            </a>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card" id="webhooks">
            <h3 className="text-lg font-bold mb-2">Webhooks</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Set up real-time event notifications.
            </p>
            <a href="#webhooks" className="text-sm text-primary hover:underline">
              Learn more →
            </a>
          </div>
          <div className="p-6 rounded-xl border border-border bg-card" id="sdks">
            <h3 className="text-lg font-bold mb-2">SDKs & Libraries</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Official SDKs for Node.js, Python, and more.
            </p>
            <a href="#sdks" className="text-sm text-primary hover:underline">
              Browse SDKs →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
