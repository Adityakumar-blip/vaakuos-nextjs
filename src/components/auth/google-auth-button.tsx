"use client";

import * as React from "react";
import { toast } from "@/components/ui/sonner";
import { authService, getAppUrl } from "@/services/auth-service";
import { loadGoogleSDK, initializeGoogleLogin, renderGoogleButton } from "@/lib/google-sdk";
import { GoogleMark } from "@/components/auth/auth-fields";
import { cn } from "@/lib/utils";

/**
 * A Google sign-in button styled to match the Shopify `SocialButton`.
 *
 * Google's own rendered button can't be restyled, so we show our own button
 * (identical chrome to the Shopify one) and overlay the real, transparent
 * Google Identity button on top to capture the click and run the credential
 * flow → `authService.googleLogin` (POST /auth/google).
 */
export function GoogleAuthButton({
  successMessage,
  failureMessage = "Something went wrong with Google sign-in.",
  label = "Continue with Google",
}: {
  successMessage: string;
  failureMessage?: string;
  label?: string;
}) {
  const overlayRef = React.useRef<HTMLDivElement>(null);
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
        if (cancelled || !overlayRef.current) return;

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

        // Real Google button — kept transparent and overlaid; GSI requires a
        // width of at least 200px, so clamp up and let the wrapper clip it.
        const width = Math.max(200, overlayRef.current.offsetWidth || 200);
        renderGoogleButton(overlayRef.current, {
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

  return (
    <div className="group relative h-11 w-full overflow-hidden rounded-lg">
      {/* Visible button — matches the Shopify SocialButton chrome exactly. */}
      <div
        className={cn(
          "pointer-events-none flex h-11 w-full items-center justify-center gap-2.5 rounded-lg",
          "border border-foreground/15 bg-card/60 px-4 text-[0.88rem] font-medium text-foreground",
          "transition-colors duration-200 group-hover:border-foreground/30 group-hover:bg-card",
        )}
      >
        <GoogleMark />
        {label}
      </div>

      {/* Real, transparent Google button overlaid to capture the click. */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="absolute inset-0 z-10 cursor-pointer opacity-0"
      />
    </div>
  );
}
