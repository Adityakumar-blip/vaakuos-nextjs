import { Calendar, Workflow, Bot, Zap, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Automated Sequencer",
    description:
      "Deploy a precisely timed sequence of interactions that follow the shopper's behavior automatically.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Frictionless Conversion",
    description:
      "Send interactive retrieval links with product details designed for one-touch purchase completion.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Bot,
    title: "24/7 Conversion AI",
    description:
      "Real-time assistance for every shopper query to ensure the checkout process is never interrupted.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Calendar,
    title: "Timing Optimization",
    description:
      "Activate retrieval flows when engagement probability is highest for maximum conversion velocity.",
    color: "text-tertiary",
    bg: "bg-tertiary/10",
  },
  {
    icon: BarChart3,
    title: "Revenue Insights",
    description:
      "Comprehensive dashboards tracking every recovered sale and the true ROI of your retrieval efforts.",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    icon: Shield,
    title: "Smart Sync",
    description:
      "Seamless platform integration ensures retrieval efforts end the second a transaction is verified.",
    color: "text-success",
    bg: "bg-success/10",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative overflow-hidden bg-muted/40 px-4 py-20 md:py-28">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(135deg,hsl(var(--primary)/0.08)_0_1px,transparent_1px_18px)]" />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[0.95fr_1.05fr] md:items-end">
          <div className="hidden md:block" />
          <div className="max-w-3xl md:ml-auto">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
              Conversion operating system
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
              One workflow from cart drop to confirmed revenue.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
              From the moment a cart is left behind, VaakuOS activates an
              intelligent sequence of interactions to bring your customers back.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="reveal reveal-up reveal-visible group bg-card p-6 transition-colors duration-300 hover:bg-background md:p-8"
              style={{ transitionDelay: `${index * 0.06}s` }}
            >
              <div
                className={`mb-8 flex h-12 w-12 items-center justify-center rounded-2xl ${feature.bg} transition-transform duration-300 group-hover:-translate-y-1`}
              >
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-7 text-muted-foreground md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
