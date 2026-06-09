import { Calendar, Workflow, Bot, Zap, BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Automated Sequencer",
    description:
      "Deploy a precisely timed sequence of interactions that follow the shopper's behavior automatically.",
    color: "text-primary",
    bg: "bg-primary/10",
    wide: true,
  },
  {
    icon: Zap,
    title: "Frictionless Conversion",
    description:
      "Send interactive retrieval links with product details designed for one-touch purchase completion.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    wide: false,
  },
  {
    icon: Bot,
    title: "24/7 Conversion AI",
    description:
      "Real-time assistance for every shopper query to ensure the checkout process is never interrupted.",
    color: "text-accent",
    bg: "bg-accent/10",
    wide: false,
  },
  {
    icon: Calendar,
    title: "Timing Optimization",
    description:
      "Activate retrieval flows when engagement probability is highest for maximum conversion velocity.",
    color: "text-tertiary",
    bg: "bg-tertiary/10",
    wide: false,
  },
  {
    icon: BarChart3,
    title: "Revenue Insights",
    description:
      "Comprehensive dashboards tracking every recovered sale and the true ROI of your retrieval efforts.",
    color: "text-info",
    bg: "bg-info/10",
    wide: false,
  },
  {
    icon: Shield,
    title: "Smart Sync",
    description:
      "Seamless platform integration ensures retrieval efforts end the second a transaction is verified.",
    color: "text-success",
    bg: "bg-success/10",
    wide: true,
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative overflow-hidden bg-muted/40 px-4 py-16 sm:py-20 md:py-28">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(135deg,hsl(var(--primary)/0.08)_0_1px,transparent_1px_18px)]" />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[0.95fr_1.05fr] md:items-end">
          <div className="hidden md:block" />
          <div className="max-w-3xl md:ml-auto">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
              Conversion operating system
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              One workflow from cart drop to confirmed revenue.
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
              From the moment a cart is left behind, VaakuOS activates an
              intelligent sequence of interactions to bring your customers back.
            </p>
          </div>
        </div>

        <div className="grid auto-rows-fr grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`reveal reveal-up reveal-visible group flex flex-col bg-card p-5 transition-colors duration-300 hover:bg-background sm:p-6 md:p-8 ${
                feature.wide
                  ? "col-span-2 sm:flex-row sm:items-center sm:gap-6 md:gap-8"
                  : "col-span-1"
              }`}
              style={{ transitionDelay: `${index * 0.06}s` }}
            >
              <div
                className={`mb-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${feature.bg} transition-transform duration-300 group-hover:-translate-y-1 md:h-12 md:w-12 ${
                  feature.wide ? "sm:mb-0 md:h-14 md:w-14" : "md:mb-8"
                }`}
              >
                <feature.icon
                  className={`h-5 w-5 ${feature.color} md:h-6 md:w-6 ${
                    feature.wide ? "md:h-7 md:w-7" : ""
                  }`}
                />
              </div>
              <div>
                <h3 className="mb-2 text-base font-bold text-foreground sm:text-lg md:mb-3 md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
