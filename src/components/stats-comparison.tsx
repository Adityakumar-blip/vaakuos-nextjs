import { TrendingUp, Sparkles, Layers, Inbox } from "lucide-react";

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
    <section className="relative overflow-hidden bg-background px-4 py-20 md:py-24">
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,hsl(var(--primary)/0.06)_0_1px,transparent_1px_18px)]" />
      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[0.95fr_1.05fr] md:items-end">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-primary">
              <TrendingUp className="h-4 w-4" />
              Recovery benchmarks
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
              The measurable lift behind omnichannel recovery.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Benchmarked ranges show how connected recovery workflows perform
              against fragmented or single-channel approaches.
            </p>
          </div>
          <div className="hidden md:block" />
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.strategy}
              className={`group bg-card p-6 transition-colors duration-300 hover:bg-background md:p-8 ${
                stat.highlight ? "md:col-span-1" : ""
              }`}
              >
              <div className="mb-8 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-1 ${
                      stat.highlight
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                        {stat.strategy}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {stat.highlight ? "Best performing benchmark" : "Baseline comparison"}
                  </p>
                  </div>
                </div>
                {stat.highlight && (
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                    Best
                  </span>
                )}
              </div>

              <div className="space-y-6">
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

              <p className="mt-8 border-t border-border pt-5 text-sm leading-7 text-muted-foreground">
                {stat.note}
              </p>
              </div>
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
      <span className={`text-base font-bold ${highlight ? "text-primary" : "text-foreground"}`}>
        {value}
      </span>
    </div>
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className={`h-full rounded-full ${highlight ? "bg-primary" : "bg-border"}`}
        style={{ width: `${(percentage / max) * 100}%` }}
      />
    </div>
  </div>
);
