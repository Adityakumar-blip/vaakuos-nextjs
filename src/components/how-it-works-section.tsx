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
    <section className="relative overflow-hidden px-4 py-20 md:py-28">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">
              How it works
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
              A simple recovery flow that feels automatic.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              VaakuOS keeps the workflow compact: detect the signal, send the
              right recovery action, and stop the moment the sale is won back.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-sm">
            <div className="grid gap-px md:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="group flex min-h-[220px] flex-col bg-background p-6 transition-colors duration-300 hover:bg-card md:p-8"
                >
                  <div className="mb-10 flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                  <div className="mt-auto pt-6">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      View flow
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
