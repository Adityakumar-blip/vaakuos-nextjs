import { ArrowRight, Bot, MessageSquareText, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: Bot,
    title: "Detect intent",
    description:
      "VaakuOS watches cart activity, product views, and checkout drop-off in real time.",
  },
  {
    icon: MessageSquareText,
    title: "Recover across channels",
    description:
      "It sends the right message at the right time using the channels already in your stack.",
  },
  {
    icon: ShieldCheck,
    title: "Stop when revenue is recovered",
    description:
      "Once the order completes, flows stop automatically and attribution stays clean.",
  },
];

export const howItWorksItems = steps;

export const HowItWorksSection = () => {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:py-20 md:py-28">
      <div className="container mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
            How it works
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            A simple recovery flow that feels automatic.
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
            VaakuOS keeps the workflow compact: detect the signal, send the
            right recovery action, and stop the moment the sale is won back.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-5">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 md:p-7">
                <div className="mb-6 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <step.icon className="h-6 w-6" />
                  </span>
                  <span className="text-3xl font-bold leading-none tracking-tight text-muted-foreground/15">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold tracking-tight text-foreground md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-full z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-primary shadow-sm md:left-full md:top-1/2"
                >
                  <ArrowRight className="h-4 w-4 rotate-90 md:rotate-0" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
