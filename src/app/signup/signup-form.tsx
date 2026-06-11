"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Loader2, Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { fraunces } from "@/components/auth/auth-fonts";
import {
  AuthField,
  AuthPasswordField,
  AuthDivider,
  AuthSegmented,
} from "@/components/auth/auth-fields";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { WhatsappAuthButton } from "@/components/auth/whatsapp-auth-button";
import { authService, getAppUrl } from "@/services/auth-service";

type AccountType = "business" | "agency";

const ACCOUNT_TYPES: ReadonlyArray<{ value: AccountType; label: string }> = [
  { value: "business", label: "Business" },
  { value: "agency", label: "Agency" },
];

const PERKS = ["14 days free", "No card needed", "Cancel anytime"];

export function SignupForm() {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
    type: "business" as AccountType,
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.register(formData);

      toast.success("Account created!", {
        description: "Welcome to VaakuOS. Let's set up your account.",
      });

      const params = new URLSearchParams(window.location.search);
      const planId = params.get("planId");
      const appUrl = getAppUrl();
      window.location.href = planId ? `${appUrl}/dashboard` : appUrl;
    } catch (error: any) {
      toast.error("Signup failed", {
        description:
          error?.response?.data?.message || "Email already exists. Please try another email.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="auth-rise auth-d2 mx-auto w-full max-w-[24rem]">
      <Link href="/" className="mb-7 inline-flex items-center gap-2 lg:hidden">
        <Image src="/images/green.svg" alt="VaakuOS" width={28} height={28} className="h-7 w-7" />
        <span className="text-lg font-bold tracking-tight">VaakuOS</span>
      </Link>

      <h1 className={`${fraunces.className} text-[2.1rem] font-normal leading-[1.05] tracking-tight text-foreground`}>
        Let&apos;s get you set up.
      </h1>
      <div className="mt-3.5 flex flex-wrap gap-x-4 gap-y-1.5">
        {PERKS.map((p) => (
          <span key={p} className="inline-flex items-center gap-1.5 text-[0.85rem] text-muted-foreground">
            <Check className="h-3.5 w-3.5 text-primary" strokeWidth={3} />
            {p}
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <AuthField
            label="Your name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jordan Mehta"
            value={formData.name}
            onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
            required
          />
          <AuthField
            label="Company"
            name="companyName"
            type="text"
            autoComplete="organization"
            placeholder="Acme Inc."
            value={formData.companyName}
            onChange={(e) => setFormData((f) => ({ ...f, companyName: e.target.value }))}
            required
          />
        </div>
        <AuthField
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@yourstore.com"
          value={formData.email}
          onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
          required
        />
        <AuthSegmented
          label="Account type"
          value={formData.type}
          onChange={(type) => setFormData((f) => ({ ...f, type }))}
          options={ACCOUNT_TYPES}
        />
        <AuthPasswordField
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={formData.password}
          onChange={(e) => setFormData((f) => ({ ...f, password: e.target.value }))}
          required
        />

        <label className="flex cursor-pointer items-start gap-2.5 pt-0.5 text-[0.84rem] leading-5 text-muted-foreground">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-foreground/25 accent-primary focus:ring-2 focus:ring-ring"
          />
          <span>
            I&apos;m good with the{" "}
            <Link href="/terms-of-service" className="font-medium text-foreground underline-offset-4 hover:underline">
              terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="font-medium text-foreground underline-offset-4 hover:underline">
              privacy policy
            </Link>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[0.95rem] font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover active:scale-[0.99] disabled:opacity-80"
        >
          {loading ? (
            <>
              <Loader2 className="h-[18px] w-[18px] animate-spin" />
              Setting things up…
            </>
          ) : (
            <>
              Start free trial
              <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </form>

      <div className="my-5">
        <AuthDivider />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <GoogleAuthButton successMessage="Account created!" label="Google" />
        <WhatsappAuthButton successMessage="Account created!" label="WhatsApp" />
      </div>

      <p className="mt-7 text-[0.92rem] text-muted-foreground">
        Already with us?{" "}
        <Link href="/login" className="font-semibold text-foreground underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
