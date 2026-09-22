import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What's New in VaakuOS",
  description: "See the latest updates, new features, and improvements to VaakuOS.",
  alternates: {
    canonical: "/changelog",
  },
  robots: { index: false, follow: true },
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const inlineLink = `font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest ${focusRing}`;

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-paper font-display text-ink">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <h1 className="max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[2rem]">
          What&rsquo;s new
        </h1>
        <div className="mt-10 max-w-prose space-y-5 border-t border-line pt-10 text-base leading-7 text-ink/70">
          <p>We haven&rsquo;t published a changelog here yet.</p>
          <p>
            For now, the fastest way to see what&rsquo;s changed is to ask us
            directly, or read the setup guide for how the product works today.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-lg">
          <Link href="/contact" className={inlineLink}>
            Ask the team directly
          </Link>
          <Link href="/docs" className={inlineLink}>
            Read the setup guide
          </Link>
        </div>
      </div>
    </div>
  );
}
