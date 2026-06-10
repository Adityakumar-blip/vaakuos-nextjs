"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { fraunces } from "@/components/auth/auth-fonts";
import { AuthPasswordField } from "@/components/auth/auth-fields";
import { authService } from "@/services/auth-service";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password too short", {
        description: "Use at least 8 characters.",
      });
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords don't match", {
        description: "Make sure both fields are identical.",
      });
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      setDone(true);
      toast.success("Password updated", {
        description: "You can now sign in with your new password.",
      });
    } catch (error: any) {
      toast.error("Couldn't reset password", {
        description:
          error?.response?.data?.message ||
          "This reset link may have expired. Request a new one.",
      });
    } finally {
      setLoading(false);
    }
  };

  // No token in the URL — point the user back to forgot-password.
  if (!token) {
    return (
      <div className="auth-rise auth-d2 mx-auto w-full max-w-[24rem]">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 lg:hidden">
          <Image src="/images/green.svg" alt="VaakuOS" width={28} height={28} className="h-7 w-7" />
          <span className="text-lg font-bold tracking-tight">VaakuOS</span>
        </Link>

        <h1 className={`${fraunces.className} text-[2.1rem] font-normal leading-[1.05] tracking-tight text-foreground`}>
          This link looks broken.
        </h1>
        <p className="mt-2.5 text-[0.95rem] leading-7 text-muted-foreground">
          The reset link is missing or invalid. Request a fresh one and we&apos;ll email it over.
        </p>

        <Link
          href="/forgot-password"
          className="group mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[0.95rem] font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover active:scale-[0.99]"
        >
          Request a new link
          <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="auth-rise auth-d2 mx-auto w-full max-w-[24rem]">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 lg:hidden">
          <Image src="/images/green.svg" alt="VaakuOS" width={28} height={28} className="h-7 w-7" />
          <span className="text-lg font-bold tracking-tight">VaakuOS</span>
        </Link>

        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>

        <h1 className={`${fraunces.className} text-[2.1rem] font-normal leading-[1.05] tracking-tight text-foreground`}>
          All set.
        </h1>
        <p className="mt-2.5 text-[0.95rem] leading-7 text-muted-foreground">
          Your password has been updated. Sign in with your new password to continue.
        </p>

        <Link
          href="/login"
          className="group mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[0.95rem] font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover active:scale-[0.99]"
        >
          Go to sign in
          <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />
        </Link>
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
        Set a new password.
      </h1>
      <p className="mt-2.5 text-[0.95rem] leading-7 text-muted-foreground">
        Pick something you&apos;ll remember. You&apos;ll use it to sign in from now on.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <AuthPasswordField
          label="New password"
          name="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <AuthPasswordField
          label="Confirm password"
          name="confirm-password"
          autoComplete="new-password"
          placeholder="Re-enter your new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
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
              Updating…
            </>
          ) : (
            <>
              Reset password
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
