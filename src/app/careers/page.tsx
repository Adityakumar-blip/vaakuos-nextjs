import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at VaakuOS",
  description: "Join the VaakuOS team and help shape the future of e-commerce communication.",
  alternates: {
    canonical: "/careers",
  },
  robots: { index: false, follow: true },
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const inlineLink = `font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest ${focusRing}`;

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-paper font-display text-ink">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <h1 className="max-w-2xl text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[2rem]">
          Careers
        </h1>
        <div className="mt-10 max-w-prose space-y-5 border-t border-line pt-10 text-base leading-7 text-ink/70">
          <p>We don&rsquo;t have any open roles listed here right now.</p>
          <p>
            If that changes, we&rsquo;ll post it on this page. In the
            meantime, if you think you&rsquo;d be a good fit for VaakuOS,
            write to us directly.
          </p>
        </div>
        <a href="mailto:careers@vaakuos.com" className={`mt-8 inline-block text-lg ${inlineLink}`}>
          Email careers@vaakuos.com
        </a>
      </div>
    </div>
  );
}
