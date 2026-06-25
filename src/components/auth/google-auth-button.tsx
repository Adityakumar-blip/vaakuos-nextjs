"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { authService, getAppUrl } from "@/services/auth-service";
import { loadGoogleSDK, initializeGoogleLogin, promptGoogleLogin } from "@/lib/google-sdk";
import { GoogleMark } from "@/components/auth/auth-fields";

/**
 * "Continue with Google" — a custom button styled identically to the WhatsApp
 * social button. Clicking opens Google's FedCM account chooser via `prompt()`;
 * the credential (ID token) is POSTed to `/auth/google`.
 *
 * We render our own button rather than Google's iframe so it matches the rest of
 * the auth chrome. The old approach (transparent GSI button overlaid on a custom
 * one) is blocked by FedCM's clickjacking protection, so it can't be used.
 */
export function GoogleAuthButton({
  successMessage,
  failureMessage = "Something went wrong with Google sign-in.",
  label = "Google",
}: {
  successMessage: string;
  failureMessage?: string;
  label?: string;
}) {
  const [ready, setReady] = React.useState(false);
  const [unavailable, setUnavailable] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    const init = async () => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      if (!clientId) {
        console.error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not defined");
        setUnavailable(true);
        return;
      }

      try {
        await loadGoogleSDK();
        if (cancelled) return;

        initializeGoogleLogin(clientId, async (response) => {
          try {
            await authService.googleLogin(response.credential);

            toast.success(successMessage, {
              description: "Redirecting you to your workspace.",
            });

            const params = new URLSearchParams(window.location.search);
            const planId = params.get("planId");
            const appUrl = getAppUrl();
            window.location.href = planId ? `${appUrl}/dashboard` : appUrl;
          } catch (error: any) {
            toast.error("Google sign-in failed", {
              description: error?.response?.data?.message || failureMessage,
            });
          }
        });

        setReady(true);
      } catch (error) {
        console.error("Google SDK load error:", error);
        setUnavailable(true);
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [successMessage, failureMessage]);

  if (unavailable) return null;

  return (
    <button
      type="button"
      onClick={() => promptGoogleLogin()}
      disabled={!ready}
      className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-foreground/15 bg-card/60 px-4 text-[0.88rem] font-medium text-foreground transition-colors duration-200 hover:border-foreground/30 hover:bg-card disabled:cursor-not-allowed disabled:opacity-60"
    >
      {ready ? <GoogleMark /> : <Loader2 className="h-[18px] w-[18px] animate-spin" />}
      {label}
    </button>
  );
}
