import Image from "next/image";
import Link from "next/link";
import { authHeading } from "./auth-fonts";
import { AuthBackButton } from "./auth-back-button";

type Mode = "login" | "signup" | "forgot" | "reset";

const HEADLINE: Record<Mode, string> = {
  login: "Pick up right where your customers left off.",
  signup: "Bring every customer conversation into one place.",
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
      <div className="relative hidden flex-col bg-forest p-12 text-paper lg:flex xl:p-16">
        {/* one soft highlight for depth — nothing busy */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_55%_at_12%_0%,rgb(var(--mint)/0.18),transparent_62%)]" />

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
            className={`${authHeading} text-[2.6rem] leading-[1.06] xl:text-[3rem]`}
          >
            {HEADLINE[mode]}
          </h2>
          <p className="mt-5 max-w-sm text-[0.95rem] leading-7 text-paper/75">
            One inbox and one customer record across WhatsApp, email, Instagram and Messenger.
          </p>
        </div>

        <p className="relative z-10 text-[0.8rem] text-paper/70">© VaakuOS</p>
      </div>

      {/* ── right: form ── */}
      <div className="relative h-full">
        <div className="absolute inset-0 -z-10 bg-paper" />
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
