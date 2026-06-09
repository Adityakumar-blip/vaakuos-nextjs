import { TrendingUp, Sparkles, Layers, Inbox, ArrowRight } from "lucide-react";

const stats = [
  {
    strategy: "Omnichannel Strategy",
    captured: "15% - 25%",
    capturedMax: 25,
    completion: "18% - 35%",
    completionMax: 35,
    growth: "10% - 15%",
    growthMax: 15,
    icon: Sparkles,
    highlight: true,
    note: "Unified customer intelligence with cross-channel communication for maximum recovery.",
  },
  {
    strategy: "Multi-Channel Strategy",
    captured: "5% - 10%",
    capturedMax: 10,
    completion: "8% - 15%",
    completionMax: 15,
    growth: "3% - 5%",
    growthMax: 5,
    icon: Layers,
    highlight: false,
    note: "Disconnected flows across multiple apps without shared customer context.",
  },
  {
    strategy: "Single-Channel Strategy",
    captured: "1% - 3%",
    capturedMax: 3,
    completion: "2% - 5%",
    completionMax: 5,
    growth: "0.5% - 1%",
    growthMax: 1,
    icon: Inbox,
    highlight: false,
    note: "Isolated communication with no visibility into customer behavior across touchpoints.",
  },
];

const maxValues = {
  captured: 25,
  completion: 35,
  growth: 15,
};

export const StatsComparison = () => {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-16 sm:py-20 md:py-24">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,hsl(var(--primary)/0.06)_0_1px,transparent_1px_18px)]" />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 grid gap-6 sm:mb-12 md:mb-16 md:grid-cols-[0.95fr_1.05fr] md:items-end">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-primary">
              <TrendingUp className="h-4 w-4" />
              Recovery benchmarks
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              The measurable lift behind omnichannel recovery.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Benchmarked ranges show how connected recovery workflows perform
              against fragmented or single-channel approaches.
            </p>
          </div>
          <div className="hidden md:block" />
        </div>

        {/* Mobile swipe hint */}
        <div className="mb-3 flex items-center justify-between md:hidden">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Compare strategies
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
            Swipe
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-px md:overflow-hidden md:rounded-3xl md:border md:border-border md:bg-border md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {stats.map((stat, index) => (
            <div
              key={stat.strategy}
              className={`group flex w-[82%] shrink-0 snap-center flex-col rounded-3xl border bg-card p-6 transition-all duration-300 hover:bg-background sm:w-[56%] md:w-auto md:shrink md:rounded-none md:border-0 lg:p-8 ${
                stat.highlight
                  ? "border-primary/40 shadow-xl shadow-primary/10 ring-1 ring-primary/20 md:shadow-none md:ring-0"
                  : "border-border"
              }`}
            >
              <div className="mb-7 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-1 ${
                      stat.highlight
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground md:text-xl">
                      {stat.strategy}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                      {stat.highlight
                        ? "Best performing benchmark"
                        : "Baseline comparison"}
                    </p>
                  </div>
                </div>
                {stat.highlight ? (
                  <span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                    Best
                  </span>
                ) : (
                  <span className="shrink-0 text-base font-bold tracking-tight text-muted-foreground/40">
                    0{index + 1}
                  </span>
                )}
              </div>

              <div className="space-y-5">
                <MetricCell
                  label="Revenue captured"
                  value={stat.captured}
                  percentage={stat.capturedMax}
                  max={maxValues.captured}
                  highlight={stat.highlight}
                />
                <MetricCell
                  label="Checkout completion"
                  value={stat.completion}
                  percentage={stat.completionMax}
                  max={maxValues.completion}
                  highlight={stat.highlight}
                />
                <MetricCell
                  label="Growth lift"
                  value={stat.growth}
                  percentage={stat.growthMax}
                  max={maxValues.growth}
                  highlight={stat.highlight}
                />
              </div>

              <p className="mt-8 border-t border-border pt-5 text-sm leading-7 text-muted-foreground md:mt-auto">
                {stat.note}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile progress dots */}
        <div className="mt-4 flex justify-center gap-1.5 md:hidden">
          {stats.map((stat) => (
            <span
              key={stat.strategy}
              className={`h-1.5 rounded-full transition-all ${
                stat.highlight ? "w-6 bg-primary" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const MetricCell = ({
  label,
  value,
  percentage,
  max,
  highlight,
}: {
  label: string;
  value: string;
  percentage: number;
  max: number;
  highlight: boolean;
}) => (
  <div>
    <div className="mb-2 flex items-center justify-between gap-3">
      <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span
        className={`text-base font-bold ${
          highlight ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={`h-full rounded-full ${
          highlight
            ? "bg-gradient-to-r from-primary to-primary/60"
            : "bg-foreground/25"
        }`}
        style={{ width: `${(percentage / max) * 100}%` }}
      />
    </div>
  </div>
);
