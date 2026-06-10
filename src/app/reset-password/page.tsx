import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "./reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Choose a new password for your VaakuOS account.",
  alternates: {
    canonical: "/reset-password",
  },
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <AuthShell mode="reset">
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
