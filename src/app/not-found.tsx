import Link from "next/link";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const inlineLink = `font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest ${focusRing}`;

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center bg-paper px-4 font-display text-ink">
      <div className="mx-auto max-w-6xl py-20">
        <p className="text-lg font-semibold text-forest">404</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink md:text-6xl">
          That page moved, or never existed.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-8 text-ink/70">
          Check the address, or try one of these instead.
        </p>
        <ul className="mt-10 space-y-3 border-t border-line pt-8 text-lg">
          <li>
            <Link href="/" className={inlineLink}>
              Go to the homepage
            </Link>
          </li>
          <li>
            <Link href="/pricing" className={inlineLink}>
              Compare plans
            </Link>
          </li>
          <li>
            <Link href="/contact" className={inlineLink}>
              Ask the team directly
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
