"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Integrations", path: "/integrations" },
  { label: "Pricing", path: "/pricing" },
  { label: "Calculator", path: "/calculator" },
  { label: "Blog", path: "/blog" },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isActive = (path: string) => pathname === path || pathname?.startsWith(`${path}/`);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 font-display">
      <div
        className={cn(
          "mx-auto transition-all duration-500 ease-out motion-reduce:transition-none",
          // Mobile: always detached with a small side gap (safe-area aware)
          "max-w-full px-3 pt-[calc(0.75rem+env(safe-area-inset-top))]",
          isOpen && "pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:pb-0",
          // Desktop: full-bleed at the top, detaches into a pill once scrolled
          scrolled ? "md:max-w-6xl md:px-4 md:pt-3" : "md:max-w-full md:px-0 md:pt-0",
        )}
      >
        <div
          className={cn(
            "backdrop-blur-lg transition-all duration-500 ease-out motion-reduce:transition-none",
            "rounded-3xl border border-line bg-paper/90 py-2.5 shadow-[0_12px_32px_-20px_rgb(var(--ink)/0.35)]",
            scrolled
              ? "md:rounded-full md:border md:bg-paper/85 md:py-2"
              : "md:rounded-none md:border-x-0 md:border-t-0 md:bg-paper/90 md:py-4 md:shadow-none",
          )}
        >
          <div className={cn("mx-auto w-full max-w-6xl", scrolled ? "px-3 md:pl-5 md:pr-2" : "px-3 md:px-4")}>
            <div className="flex items-center justify-between">
              <Link href="/" className={`flex items-center gap-2 rounded-full ${focusRing}`}>
                <Image src="/images/green.svg" className="h-8 w-8" alt="" width={24} height={24} />
                <span className="text-xl font-bold tracking-[-0.02em] text-ink">VaakuOS</span>
              </Link>

              <div className="hidden items-center gap-1 md:flex">
                {navItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors",
                        focusRing,
                        active ? "bg-mint-soft text-ink" : "text-ink/70 hover:bg-ink/5 hover:text-ink",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden items-center gap-2 md:flex">
                  <Link
                    href="/login"
                    className={`rounded-full px-4 py-2 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-ink/5 ${focusRing}`}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/demo"
                    className={`rounded-full bg-forest px-5 py-2.5 text-[0.95rem] font-semibold text-paper transition-colors hover:bg-ink ${focusRing}`}
                  >
                    Book a walkthrough
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen((prev) => !prev)}
                  className={`-mr-1 flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden ${focusRing}`}
                  aria-expanded={isOpen}
                  aria-controls="mobile-menu"
                  aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                >
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

            <div
              id="mobile-menu"
              className={cn(
                "grid transition-all duration-500 ease-out motion-reduce:transition-none md:hidden",
                isOpen ? "grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="flex min-h-[calc(100dvh-7rem-env(safe-area-inset-top)-env(safe-area-inset-bottom))] flex-col pt-4">
                  <ul>
                    {navItems.map((item) => (
                      <li key={item.path} className="border-b border-line">
                        <Link
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          aria-current={isActive(item.path) ? "page" : undefined}
                          className={cn(
                            "block py-4 text-3xl font-bold tracking-[-0.02em]",
                            focusRing,
                            isActive(item.path) ? "text-forest" : "text-ink",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-col gap-3 pb-1 pt-8">
                    <Link
                      href="/demo"
                      onClick={() => setIsOpen(false)}
                      className={`flex h-14 items-center justify-center rounded-full bg-forest text-lg font-semibold text-paper ${focusRing}`}
                    >
                      Book a walkthrough
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className={`flex h-14 items-center justify-center rounded-full border border-line text-lg font-semibold text-ink ${focusRing}`}
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
