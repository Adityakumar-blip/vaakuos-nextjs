"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { groupedDocs } from "./docs-registry";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      <Link
        href="/docs"
        aria-current={pathname === "/docs" ? "page" : undefined}
        onClick={onNavigate}
        className={`block rounded-lg px-3 py-1.5 text-[0.95rem] transition-colors ${focusRing} ${
          pathname === "/docs" ? "bg-mint-soft font-semibold text-forest" : "text-ink/70 hover:bg-ink/5 hover:text-ink"
        }`}
      >
        Overview
      </Link>
      {groupedDocs().map((group) => (
        <div key={group.category} className="mt-7">
          <h2 className="px-3 text-sm font-bold text-ink">{group.category}</h2>
          <ul className="mt-2 border-l border-line">
            {group.entries.map((entry) => {
              const active = pathname === entry.href;
              return (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    aria-current={active ? "page" : undefined}
                    onClick={onNavigate}
                    className={`-ml-px block border-l py-1.5 pl-4 pr-3 text-[0.95rem] transition-colors ${focusRing} ${
                      active
                        ? "border-forest font-semibold text-forest"
                        : "border-transparent text-ink/70 hover:border-ink/30 hover:text-ink"
                    }`}
                  >
                    {entry.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <p className="mt-8 border-t border-line px-3 pt-6 text-sm leading-6 text-ink/65">
        More guides are on the way. Need one that isn&rsquo;t here?{" "}
        <Link href="/contact" className={`font-semibold text-forest underline underline-offset-4 ${focusRing}`}>
          Ask the team
        </Link>
      </p>
    </>
  );
}

export function DocsSidebar() {
  return (
    <nav aria-label="Documentation" className="sticky top-28 max-h-[calc(100dvh-8rem)] overflow-y-auto pb-10 pr-4">
      <NavList />
    </nav>
  );
}

export function DocsMobileNav() {
  return (
    <details className="group border-b border-line pb-4 lg:hidden">
      <summary
        className={`flex cursor-pointer list-none items-center justify-between rounded-xl border border-line bg-white px-4 py-3 text-base font-semibold text-ink ${focusRing}`}
      >
        Browse documentation
        <span aria-hidden="true" className="text-ink/60 transition-transform group-open:rotate-180">
          ⌄
        </span>
      </summary>
      <div className="mt-4">
        <NavList />
      </div>
    </details>
  );
}
