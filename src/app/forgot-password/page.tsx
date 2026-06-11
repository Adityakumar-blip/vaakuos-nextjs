import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your VaakuOS account password.",
  alternates: {
    canonical: "/forgot-password",
  },
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell mode="forgot">
      <ForgotPasswordForm />
    </AuthShell>
  );
}
