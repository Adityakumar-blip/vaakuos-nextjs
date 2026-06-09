"use client";

import { Button } from "@/components/ui/button";
import { Menu, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useBookDemo } from "@/contexts/book-demo-context";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openBookDemo } = useBookDemo();

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

  const navItems = [
    { label: "Integrations", path: "/integrations" },
    { label: "Pricing", path: "/pricing" },
    { label: "Calculator", path: "/calculator" },
    { label: "Blogs", path: "/blog" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className={cn(
          "mx-auto transition-all duration-500 ease-out",
          // Mobile: always detached with a small side gap
          "max-w-full px-3 pt-3",
          isOpen && "pb-3 md:pb-0",
          // Desktop: only detaches once scrolled
          scrolled
            ? "md:max-w-6xl md:px-4 md:pt-3"
            : "md:max-w-full md:px-0 md:pt-0",
        )}
      >
        <div
          className={cn(
            "transition-all duration-500 ease-out backdrop-blur-lg",
            // Mobile: always a rounded floating bar
            "rounded-2xl border border-border bg-background/80 shadow-lg shadow-black/[0.06] py-2.5",
            // Desktop: rounded pill when scrolled, full-bleed bar at top
            scrolled
              ? "md:rounded-2xl md:border md:border-border md:bg-background/70 md:shadow-lg md:py-2.5"
              : "md:rounded-none md:border-x-0 md:border-t-0 md:border-b md:border-border/60 md:bg-background/80 md:shadow-none md:py-4",
          )}
        >
          <div className="mx-auto w-full max-w-[1400px] px-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 cursor-pointer group"
              >
                <Image
                  src="/images/green.svg"
                  className="h-8 w-8"
                  alt="VaakuOS Logo"
                  width={24}
                  height={24}
                />
                <span className="text-xl font-bold text-foreground tracking-tight">
                  VaakuOS
                </span>
              </Link>

              <div className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-3">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button variant="hero" size="sm" onClick={openBookDemo}>
                    Book Live Demo
                  </Button>
                </div>

                <div className="md:hidden flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="-mr-2 h-8 w-8 bg-transparent text-foreground hover:bg-transparent hover:text-foreground active:bg-transparent active:scale-95 transition-transform focus-visible:ring-0 focus-visible:ring-offset-0"
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                    aria-label={
                      isOpen ? "Close navigation menu" : "Open navigation menu"
                    }
                  >
                    <span className="relative block h-6 w-6">
                      <Menu
                        className={cn(
                          "absolute inset-0 h-6 w-6 transition-all duration-300",
                          isOpen
                            ? "opacity-0 rotate-90 scale-75"
                            : "opacity-100 rotate-0 scale-100",
                        )}
                      />
                      <X
                        className={cn(
                          "absolute inset-0 h-6 w-6 transition-all duration-300",
                          isOpen
                            ? "opacity-100 rotate-0 scale-100"
                            : "opacity-0 -rotate-90 scale-75",
                        )}
                      />
                    </span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile detached expanding menu */}
            <div
              id="mobile-menu"
              className={cn(
                "md:hidden grid transition-all duration-500 ease-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="flex min-h-[calc(100vh-7rem)] flex-col pt-4">
                  <div className="flex flex-col">
                    {navItems.map((item, i) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        style={{
                          transitionDelay: isOpen ? `${i * 50 + 120}ms` : "0ms",
                        }}
                        className={cn(
                          "flex items-center justify-between border-b border-border/50 py-4 text-xl font-bold text-foreground/90 hover:text-foreground transition-all duration-300 group active:scale-[0.99]",
                          isOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-2",
                        )}
                      >
                        {item.label}
                        <ArrowRight className="h-5 w-5 text-primary opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-row gap-3 pb-1 pt-8">
                    <Button
                      asChild
                      variant="outline"
                      className="h-12 flex-1 rounded-xl font-bold"
                    >
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button
                      variant="hero"
                      className="h-12 flex-1 rounded-xl font-bold shadow-lg shadow-primary/20"
                      onClick={() => {
                        openBookDemo();
                        setIsOpen(false);
                      }}
                    >
                      Book Live Demo
                    </Button>
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
