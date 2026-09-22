import Link from "next/link";
import { channels, type Channel } from "@/components/home/channel";

/** Primary call to action site-wide. `tone="light"` is for forest or ink backgrounds. */
export function WalkthroughButton({
  tone = "dark",
  label = "Book a walkthrough",
}: {
  tone?: "dark" | "light";
  label?: string;
}) {
  const dark = tone === "dark";
  return (
    <Link
      href="/demo"
      className={`group inline-flex h-16 items-center gap-4 self-start rounded-full py-2 pl-3 pr-8 text-lg font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        dark
          ? "bg-forest text-paper hover:bg-ink focus-visible:outline-forest"
          : "bg-paper text-ink hover:bg-mint focus-visible:outline-paper"
      }`}
    >
      <span className="flex" aria-hidden="true">
        {(Object.keys(channels) as Channel[]).map((c, i) => {
          const { icon: Icon, bg } = channels[c];
          return (
            <span
              key={c}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-white ring-2 transition-[margin] duration-300 motion-reduce:transition-none ${bg} ${
                dark ? "ring-forest group-hover:ring-ink" : "ring-paper group-hover:ring-mint"
              } ${i > 0 ? "-ml-4 group-hover:-ml-1.5" : ""}`}
            >
              <Icon className="h-[18px] w-[18px]" />
            </span>
          );
        })}
      </span>
      {label}
    </Link>
  );
}
