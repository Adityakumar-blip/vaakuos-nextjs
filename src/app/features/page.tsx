import type { Metadata } from "next";
import {
  CheckCircle2,
  Zap,
  Shield,
  MousePointer2,
  Gauge,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Features built to recover revenue",
  description:
    "Explore VaakuOS features: intent tracking, personalized re-engagement, omnichannel automation, and enterprise-grade security.",
  alternates: {
    canonical: "/features",
  },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Features built to recover revenue
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to identify, engage, and convert high-intent
              shoppers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {deepDiveFeatures.map((feature) => (
              <div
                key={feature.title}
                className="p-8 rounded-2xl border border-border bg-card/50 hover:border-primary/50 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto max-w-4xl text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to see these features in action?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Join 500+ brands using VaakuOS to recover millions in lost revenue
            every month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full">
              Book a Live Demo
            </Button>
            <Button size="lg" variant="outline" className="rounded-full">
              Calculate ROI
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const deepDiveFeatures = [
  {
    title: "Real-time Intent Tracking",
    description:
      "Identify high-intent shoppers before they even think about leaving. Our engine analyzes cursor movements and scroll patterns to trigger pre-emptive engagement.",
    icon: MousePointer2,
  },
  {
    title: "Hyper-Personalized Content",
    description:
      "Not just a 'we missed you' email. Dynamic product blocks, customized offers, and multi-channel consistency for every single customer.",
    icon: Zap,
  },
  {
    title: "Enterprise Grade Security",
    description:
      "Your data is encrypted at rest and in transit. We are GDPR and CCPA compliant, ensuring your customers' privacy is never compromised.",
    icon: Shield,
  },
  {
    title: "Low Latency Processing",
    description:
      "Our distributed network ensures that retrieval triggers occur in milliseconds, hitting the customer at the exact peak of their interest.",
    icon: Gauge,
  },
  {
    title: "Multi-Language Support",
    description:
      "Scale globally with ease. Our platform automatically detects customer locale and serves content in 50+ languages natively.",
    icon: Globe,
  },
  {
    title: "A/B Testing Engine",
    description:
      "Never guess what works. Test every subject line, button color, and timing delay to squeeze every percentage point of conversion.",
    icon: CheckCircle2,
  },
];
