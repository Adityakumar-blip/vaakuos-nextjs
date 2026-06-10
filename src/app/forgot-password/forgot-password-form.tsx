"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Loader2, MailCheck } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { fraunces } from "@/components/auth/auth-fonts";
import { AuthField } from "@/components/auth/auth-fields";
import { authService } from "@/services/auth-service";

export function ForgotPasswordForm() {
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.forgotPassword(email);
      setSent(true);
      toast.success("Check your inbox", {
        description: "If an account exists, a reset link is on its way.",
      });
    } catch (error: any) {
      toast.error("Couldn't send reset link", {
        description:
          error?.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="auth-rise auth-d2 mx-auto w-full max-w-[24rem]">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 lg:hidden">
          <Image src="/images/green.svg" alt="VaakuOS" width={28} height={28} className="h-7 w-7" />
          <span className="text-lg font-bold tracking-tight">VaakuOS</span>
        </Link>

        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MailCheck className="h-6 w-6" />
        </div>

        <h1 className={`${fraunces.className} text-[2.1rem] font-normal leading-[1.05] tracking-tight text-foreground`}>
          Check your email.
        </h1>
        <p className="mt-2.5 text-[0.95rem] leading-7 text-muted-foreground">
          We&apos;ve sent a password reset link to{" "}
          <span className="font-medium text-foreground">{email}</span>. It may take a minute to
          arrive — don&apos;t forget to peek in spam.
        </p>

        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 inline-flex items-center gap-2 text-[0.92rem] font-medium text-primary underline-offset-4 hover:underline"
        >
          Use a different email
        </button>

        <p className="mt-9 text-[0.92rem] text-muted-foreground">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 font-semibold text-foreground underline-offset-4 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="auth-rise auth-d2 mx-auto w-full max-w-[24rem]">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 lg:hidden">
        <Image src="/images/green.svg" alt="VaakuOS" width={28} height={28} className="h-7 w-7" />
        <span className="text-lg font-bold tracking-tight">VaakuOS</span>
      </Link>

      <h1 className={`${fraunces.className} text-[2.1rem] font-normal leading-[1.05] tracking-tight text-foreground`}>
        Forgot your password?
      </h1>
      <p className="mt-2.5 text-[0.95rem] leading-7 text-muted-foreground">
        No worries. Enter your email and we&apos;ll send you a link to reset it.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <AuthField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@yourstore.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[0.95rem] font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover active:scale-[0.99] disabled:opacity-80"
        >
          {loading ? (
            <>
              <Loader2 className="h-[18px] w-[18px] animate-spin" />
              Sending link…
            </>
          ) : (
            <>
              Send reset link
              <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      <p className="mt-9 text-[0.92rem] text-muted-foreground">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 font-semibold text-foreground underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
