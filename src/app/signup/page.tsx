import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your VaakuOS account.",
  alternates: {
    canonical: "/signup",
  },
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-20 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground mt-2">Start your 14-day free trial</p>
        </div>

        <form className="space-y-6 p-8 rounded-[2rem] border border-border bg-card">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-bold transition-all"
          >
            Create Account
          </button>
          <p className="text-xs text-center text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="/terms-of-service" className="underline hover:text-foreground">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
          </p>
        </form>

        <p className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}