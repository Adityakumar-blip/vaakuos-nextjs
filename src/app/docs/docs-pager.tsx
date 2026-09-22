import Link from "next/link";
import { docNeighbours } from "./docs-registry";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

export function DocsPager({ href }: { href: string }) {
  const { previous, next } = docNeighbours(href);
  if (!previous && !next) return null;

  return (
    <nav aria-label="Guides" className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
      {previous && (
        <Link
          href={previous.href}
          className={`rounded-2xl border border-line bg-white p-5 transition-colors hover:border-ink/30 ${focusRing}`}
        >
          <span className="text-sm text-ink/65">Previous</span>
          <span className="mt-1 block text-lg font-bold tracking-[-0.01em] text-ink">{previous.title}</span>
        </Link>
      )}
      {next && (
        <Link
          href={next.href}
          className={`rounded-2xl border border-line bg-white p-5 transition-colors hover:border-ink/30 sm:col-start-2 sm:text-right ${focusRing}`}
        >
          <span className="text-sm text-ink/65">Next</span>
          <span className="mt-1 block text-lg font-bold tracking-[-0.01em] text-ink">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
