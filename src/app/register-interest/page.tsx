import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register interest",
  description: "Be the first to know when VaakuOS launches new features.",
  alternates: {
    canonical: "/register-interest",
  },
  robots: { index: false, follow: true },
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

const inputCls = `h-11 w-full rounded-lg border border-line bg-white px-3.5 text-base text-ink placeholder:text-ink/40 md:text-sm ${focusRing}`;

export default function RegisterInterestPage() {
  return (
    <section className="bg-paper px-4 pb-20 pt-28 font-display text-ink md:pb-28 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
          <h1 className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink md:text-6xl">
            Get early access.
          </h1>
          <p className="max-w-md text-lg leading-8 text-ink/70 md:justify-self-end">
            Register your interest and be the first to know when we launch new features.
          </p>
        </div>

        <div className="mt-14 max-w-md border-t border-line pt-14">
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                Name
              </label>
              <input id="name" name="name" type="text" className={inputCls} placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                Email
              </label>
              <input id="email" name="email" type="email" className={inputCls} placeholder="you@company.com" />
            </div>
            <div>
              <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-ink">
                Company <span className="font-normal text-ink/50">(optional)</span>
              </label>
              <input id="company" name="company" type="text" className={inputCls} placeholder="Company name" />
            </div>
            <button
              type="submit"
              className={`h-12 w-full rounded-full bg-forest text-base font-semibold text-paper transition-colors hover:bg-ink ${focusRing}`}
            >
              Register interest
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
