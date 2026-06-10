import Image from "next/image";
import Link from "next/link";
import { fraunces } from "./auth-fonts";
import { AuthBackButton } from "./auth-back-button";

type Mode = "login" | "signup" | "forgot" | "reset";

const HEADLINE: Record<Mode, string> = {
  login: "Pick up right where your customers left off.",
  signup: "Start turning abandoned carts into revenue.",
  forgot: "Locked out? Let's get you back in.",
  reset: "One new password and you're back in business.",
};

const BACK_HREF: Record<Mode, string> = {
  login: "/",
  signup: "/",
  forgot: "/login",
  reset: "/login",
};

export function AuthShell({ mode, children }: { mode: Mode; children: React.ReactNode }) {
  return (
    <div className="grid h-[100dvh] w-full overflow-hidden lg:grid-cols-2">
      {/* ── left: simple brand panel (desktop) ── */}
      <div className="relative hidden flex-col bg-primary p-12 text-primary-foreground lg:flex xl:p-16">
        {/* one soft highlight for depth — nothing busy */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_55%_at_12%_0%,hsl(152_39%_35%/0.55),transparent_62%)]" />

        <Link href="/" className="relative z-10 inline-flex items-center gap-2.5">
          <Image
            src="/images/green.svg"
            alt="VaakuOS"
            width={24}
            height={24}
            className="h-6 w-6 brightness-0 invert"
          />
          <span className="text-xl font-bold tracking-tight">VaakuOS</span>
        </Link>

        <div className="relative z-10 my-auto max-w-md">
          <h2
            className={`${fraunces.className} text-[2.6rem] font-normal leading-[1.08] tracking-tight xl:text-[3rem]`}
          >
            {HEADLINE[mode]}
          </h2>
          <p className="mt-5 max-w-sm text-[0.95rem] leading-7 text-primary-foreground/60">
            The omnichannel OS that re-engages shoppers and wins back lost sales.
          </p>
        </div>

        <p className="relative z-10 text-[0.8rem] text-primary-foreground/45">© VaakuOS</p>
      </div>

      {/* ── right: form ── */}
      <div className="relative h-full">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(125%_120%_at_50%_0%,hsl(var(--background)),hsl(var(--muted))_55%,hsl(var(--background)))]" />
        <AuthBackButton href={BACK_HREF[mode]} />
        <div className="h-full overflow-y-auto">
          <div className="flex min-h-full items-center justify-center px-6 py-14 sm:px-10">
            <div className="w-full max-w-[24rem]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
