"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { fraunces } from "@/components/auth/auth-fonts";
import {
  AuthField,
  AuthPasswordField,
  AuthDivider,
  SocialButton,
} from "@/components/auth/auth-fields";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { authService, getAppUrl } from "@/services/auth-service";

export function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.login({ email, password, rememberMe });

      toast.success("Welcome back!", {
        description: "You have successfully logged in.",
      });

      // Hand off to the app.
      const params = new URLSearchParams(window.location.search);
      const planId = params.get("planId");
      const appUrl = getAppUrl();
      window.location.href = planId ? `${appUrl}/dashboard` : appUrl;
    } catch (error: any) {
      toast.error("Login failed", {
        description: error?.response?.data?.message || "Invalid email or password.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="auth-rise auth-d2 mx-auto w-full max-w-[24rem]">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 lg:hidden">
        <Image src="/images/green.svg" alt="VaakuOS" width={28} height={28} className="h-7 w-7" />
        <span className="text-lg font-bold tracking-tight">VaakuOS</span>
      </Link>

      <h1 className={`${fraunces.className} text-[2.1rem] font-normal leading-[1.05] tracking-tight text-foreground`}>
        Hello again.
      </h1>
      <p className="mt-2.5 text-[0.95rem] leading-7 text-muted-foreground">
        Sign in to pick up right where you left off.
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
        <AuthPasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          hint={
            <Link
              href="/contact"
              className="text-[0.82rem] font-medium text-primary underline-offset-4 hover:underline"
            >
              Forgot it?
            </Link>
          }
        />

        <label className="flex cursor-pointer items-center gap-2.5 text-[0.88rem] text-muted-foreground">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-foreground/25 accent-primary focus:ring-2 focus:ring-ring"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Keep me signed in
        </label>

        <button
          type="submit"
          disabled={loading}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[0.95rem] font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover active:scale-[0.99] disabled:opacity-80"
        >
          {loading ? (
            <>
              <Loader2 className="h-[18px] w-[18px] animate-spin" />
              Signing you in…
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      <div className="my-6">
        <AuthDivider />
      </div>

      <div className="space-y-3">
        <GoogleAuthButton successMessage="Welcome back!" />
        <SocialButton brand="shopify">Continue with Shopify</SocialButton>
      </div>

      <p className="mt-9 text-[0.92rem] text-muted-foreground">
        New to VaakuOS?{" "}
        <Link href="/signup" className="font-semibold text-foreground underline-offset-4 hover:underline">
          Create an account
        </Link>
        <span className="px-2 text-border">·</span>
        <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
          Can&apos;t sign in?
        </Link>
      </p>
    </div>
  );
}
