import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integrations that fit your stack",
  description:
    "Connect VaakuOS with Shopify, HubSpot, Salesforce, Slack, and more to recover revenue without heavy lift.",
  alternates: {
    canonical: "/integrations",
  },
};

export default function IntegrationsPage() {
  const categories = [
    {
      name: "E-commerce",
      items: [
        { name: "Shopify", desc: "Native sync for orders, carts, and customer data." },
        { name: "WooCommerce", desc: "Powerful plugin for WordPress stores." },
        { name: "BigCommerce", desc: "Scale your storefront with real-time recovery." },
        { name: "Magento 2", desc: "Robust integration for enterprise merchants." },
      ],
    },
    {
      name: "Automation & CRM",
      items: [
        { name: "Zapier", desc: "Connect with 5000+ apps via webhooks." },
        { name: "HubSpot", desc: "Sync recovery events to your CRM timeline." },
        { name: "Salesforce", desc: "Full lifecycle management for larger teams." },
        { name: "Klaviyo", desc: "Combine AI recovery with email marketing." },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium">Native Integrations</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Works with your <span className="text-primary">tech stack</span>.
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            Connect VaakuOS to the tools you already use. Deploy in minutes
            with our native connectors and no-code setup.
          </p>
        </div>

        <div className="space-y-20">
          {categories.map((cat) => (
            <div key={cat.name}>
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                {cat.name}
                <div className="h-px flex-1 bg-border" />
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    className="p-6 rounded-xl border border-border bg-card hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center font-bold text-xl mb-4">
                      {item.name[0]}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-32 p-12 rounded-3xl bg-foreground text-background flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-white">Can't find your tool?</h2>
            <p className="text-muted-foreground text-lg">
              Request an integration and we'll prioritize it in our roadmap.
            </p>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold whitespace-nowrap transition-all">
            Request Integration
          </button>
        </div>
      </div>
    </div>
  );
}