"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { AuthField } from "@/components/auth/auth-fields";
import { authService, getAppUrl } from "@/services/auth-service";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

type Step = "phone" | "code";

/**
 * "Continue with WhatsApp" — styled to match the Shopify/Google social
 * buttons. Opens a dialog that runs the full OTP flow:
 *   1. enter phone  → POST /auth/whatsapp/request-otp
 *   2. enter 6-digit code → POST /auth/whatsapp/verify-otp → sign in.
 */
export function WhatsappAuthButton({
  successMessage,
  label = "WhatsApp",
}: {
  successMessage: string;
  label?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<Step>("phone");
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [resendIn, setResendIn] = React.useState(0);

  // Reset the flow whenever the dialog is closed.
  React.useEffect(() => {
    if (!open) {
      setStep("phone");
      setPhone("");
      setCode("");
      setLoading(false);
      setResendIn(0);
    }
  }, [open]);

  // Countdown for the "resend code" affordance.
  React.useEffect(() => {
    if (resendIn <= 0) return;
    const id = setInterval(() => setResendIn((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(id);
  }, [resendIn]);

  const sanitizedPhone = phone.trim();
  const phoneValid = /^\+?[0-9][0-9\s-]{6,}$/.test(sanitizedPhone);

  const sendCode = async () => {
    if (!phoneValid || loading) return;
    setLoading(true);
    try {
      await authService.whatsappRequestOtp(sanitizedPhone);
      setStep("code");
      setCode("");
      setResendIn(RESEND_SECONDS);
      toast.success("Code sent", {
        description: `We sent a ${OTP_LENGTH}-digit code to ${sanitizedPhone} on WhatsApp.`,
      });
    } catch (error: any) {
      toast.error("Couldn't send code", {
        description:
          error?.response?.data?.message || "Check the number and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (value: string) => {
    if (value.length !== OTP_LENGTH || loading) return;
    setLoading(true);
    try {
      await authService.whatsappVerifyOtp(sanitizedPhone, value);

      toast.success(successMessage, {
        description: "Redirecting you to your workspace.",
      });

      const params = new URLSearchParams(window.location.search);
      const planId = params.get("planId");
      const appUrl = getAppUrl();
      window.location.href = planId ? `${appUrl}/dashboard` : appUrl;
    } catch (error: any) {
      toast.error("Invalid code", {
        description:
          error?.response?.data?.message || "That code didn't match. Try again.",
      });
      setCode("");
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-foreground/15 bg-card/60 px-4 text-[0.88rem] font-medium text-foreground transition-colors duration-200 hover:border-foreground/30 hover:bg-card"
      >
        <WhatsappMark />
        {label}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[26rem] rounded-xl">
          <DialogHeader>
            <DialogTitle>
              {step === "phone" ? "Continue with WhatsApp" : "Enter your code"}
            </DialogTitle>
            <DialogDescription>
              {step === "phone"
                ? "We'll send a one-time code to your WhatsApp number."
                : `Enter the ${OTP_LENGTH}-digit code we sent to ${sanitizedPhone}.`}
            </DialogDescription>
          </DialogHeader>

          {step === "phone" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendCode();
              }}
              className="mt-1 space-y-4"
            >
              <AuthField
                label="WhatsApp number"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+1 555 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoFocus
                required
              />
              <button
                type="submit"
                disabled={!phoneValid || loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[0.95rem] font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-[18px] w-[18px] animate-spin" />
                    Sending code…
                  </>
                ) : (
                  "Send code"
                )}
              </button>
            </form>
          ) : (
            <div className="mt-1 space-y-5">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={OTP_LENGTH}
                  value={code}
                  onChange={(value) => {
                    setCode(value);
                    if (value.length === OTP_LENGTH) verifyCode(value);
                  }}
                  disabled={loading}
                  autoFocus
                >
                  <InputOTPGroup>
                    {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} className="h-12 w-12 text-base" />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <button
                type="button"
                onClick={() => verifyCode(code)}
                disabled={code.length !== OTP_LENGTH || loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-[0.95rem] font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary-hover active:scale-[0.99] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-[18px] w-[18px] animate-spin" />
                    Verifying…
                  </>
                ) : (
                  "Verify & continue"
                )}
              </button>

              <div className="flex items-center justify-between text-[0.82rem] text-muted-foreground">
                <button
                  type="button"
                  onClick={() => {
                    setStep("phone");
                    setCode("");
                  }}
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Change number
                </button>
                <button
                  type="button"
                  onClick={sendCode}
                  disabled={resendIn > 0 || loading}
                  className="font-medium text-primary underline-offset-4 hover:underline disabled:text-muted-foreground disabled:no-underline"
                >
                  {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend code"}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function WhatsappMark() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#25D366"
        d="M.06 24l1.69-6.16A11.86 11.86 0 0 1 .14 11.9C.14 5.34 5.49 0 12.06 0a11.8 11.8 0 0 1 8.4 3.49 11.74 11.74 0 0 1 3.48 8.41c0 6.55-5.35 11.89-11.92 11.89a11.94 11.94 0 0 1-5.7-1.45L.06 24Z"
      />
      <path
        fill="#fff"
        d="M9.02 6.91c-.22-.49-.45-.5-.66-.51l-.56-.01c-.2 0-.51.07-.78.37-.27.29-1.03 1-1.03 2.45 0 1.44 1.05 2.83 1.2 3.03.15.19 2.03 3.25 5.02 4.43 2.48.98 2.99.78 3.53.73.54-.05 1.74-.71 1.99-1.4.24-.68.24-1.27.17-1.4-.07-.12-.27-.19-.56-.34-.29-.15-1.74-.86-2-.95-.27-.1-.47-.15-.66.14-.2.29-.76.95-.93 1.15-.17.19-.34.22-.63.07-.29-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.73-1.63-2.02-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.14-.17.19-.29.29-.49.1-.19.05-.36-.02-.51-.07-.15-.65-1.6-.91-2.18Z"
      />
    </svg>
  );
}
