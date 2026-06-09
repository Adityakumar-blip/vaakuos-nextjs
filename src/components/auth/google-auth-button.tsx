"use client";

import * as React from "react";
import { toast } from "@/components/ui/sonner";
import { authService, getAppUrl } from "@/services/auth-service";
import { loadGoogleSDK, initializeGoogleLogin, renderGoogleButton } from "@/lib/google-sdk";

/**
 * Renders the official Google Identity button and wires its credential
 * callback to `authService.googleLogin` (POST /auth/google) — the same
 * flow used on both the login and signup pages of the original app.
 */
export function GoogleAuthButton({
  successMessage,
  failureMessage = "Something went wrong with Google sign-in.",
}: {
  successMessage: string;
  failureMessage?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
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
        if (cancelled || !ref.current) return;

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

        const width = Math.min(400, ref.current.offsetWidth || 360);
        renderGoogleButton(ref.current, {
          theme: "outline",
          size: "large",
          text: "continue_with",
          width,
        });
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

  return <div ref={ref} className="flex h-11 w-full justify-center overflow-hidden rounded-lg" />;
}
