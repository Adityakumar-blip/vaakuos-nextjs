import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your VaakuOS account.",
  alternates: {
    canonical: "/signup",
  },
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <AuthShell mode="signup">
      <SignupForm />
    </AuthShell>
  );
}
