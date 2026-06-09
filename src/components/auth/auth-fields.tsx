"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------
   Text field — calm, label-led, no leading icon, gentle focus.
   Reads like a form a person laid out, not a component library default.
----------------------------------------------------------------- */
interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: React.ReactNode;
}

export const AuthField = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, hint, id, className, ...props }, ref) => {
    const fieldId = id || props.name || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="group/field">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <label htmlFor={fieldId} className="text-[0.875rem] font-medium text-foreground">
            {label}
          </label>
          {hint}
        </div>
        <input
          ref={ref}
          id={fieldId}
          className={cn(
            "h-12 w-full rounded-lg border border-foreground/15 bg-background/50 px-4 text-[0.95rem] text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/55",
            "hover:border-foreground/30",
            "focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/15",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
AuthField.displayName = "AuthField";

/* ----------------------------------------------------------------
   Password field — same calm shell + a plain-text Show / Hide toggle
   (a word a human reads, not another icon to decode).
----------------------------------------------------------------- */
export const AuthPasswordField = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ label, hint, id, className, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    const fieldId = id || props.name || "password";
    return (
      <div className="group/field">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <label htmlFor={fieldId} className="text-[0.875rem] font-medium text-foreground">
            {label}
          </label>
          {hint}
        </div>
        <div className="relative">
          <input
            ref={ref}
            id={fieldId}
            type={show ? "text" : "password"}
            className={cn(
              "h-12 w-full rounded-lg border border-foreground/15 bg-background/50 pl-4 pr-16 text-[0.95rem] text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/55",
              "hover:border-foreground/30",
              "focus:border-primary focus:bg-card focus:ring-2 focus:ring-primary/15",
              className,
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-1.5 py-1 text-[0.78rem] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>
    );
  },
);
AuthPasswordField.displayName = "AuthPasswordField";

/* ----------------------------------------------------------------
   Segmented choice — two calm options (e.g. account type), no
   dropdown to open. Same label-led rhythm as the text fields.
----------------------------------------------------------------- */
interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

export function AuthSegmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: ReadonlyArray<SegmentedOption<T>>;
}) {
  return (
    <div>
      <span className="mb-2 block text-[0.875rem] font-medium text-foreground">{label}</span>
      <div className="grid grid-cols-2 gap-2 rounded-lg border border-foreground/15 bg-background/50 p-1">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              className={cn(
                "h-10 rounded-md text-[0.9rem] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Quiet "or" divider — lowercase, unhurried.
----------------------------------------------------------------- */
export function AuthDivider({ label = "or" }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 py-1">
      <span className="h-px flex-1 bg-border" />
      <span className="text-[0.82rem] text-muted-foreground">{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

/* ----------------------------------------------------------------
   Social buttons — real brand marks, quiet styling.
----------------------------------------------------------------- */
export function SocialButton({
  children,
  brand,
  onClick,
}: {
  children: React.ReactNode;
  brand: "google" | "shopify";
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg border border-foreground/15 bg-card/60 px-4 text-[0.88rem] font-medium text-foreground transition-colors duration-200 hover:border-foreground/30 hover:bg-card"
    >
      {brand === "google" ? <GoogleMark /> : <ShopifyMark />}
      {children}
    </button>
  );
}

function GoogleMark() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

function ShopifyMark() {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 448 512" aria-hidden="true">
      <path
        fill="#95BF47"
        d="M388.32 104.1a4.66 4.66 0 0 0-4.4-3.9c-1.8-.1-37.4-2.8-37.4-2.8s-24.8-24.6-27.5-27.3-8-1.9-9.7-1.4c0 0-5.2 1.6-13.8 4.3-1.4-4.6-3.5-10.3-6.4-16-9.3-17.8-23-27.2-39.5-27.2a18.7 18.7 0 0 0-3.6.3c-.5-.6-1-1.1-1.5-1.7C243.4 4.3 234.7.2 224.3.5c-20.1.6-40.1 15.1-56.3 40.9-11.4 18.2-20.1 41-22.6 58.7-23.1 7.1-39.2 12.1-39.6 12.3-11.7 3.7-12 4-13.5 15-1.2 8.4-31.7 244.6-31.7 244.6L329 480.1l116.4-29S389 106.5 388.32 104.1ZM263.78 71.4l-22.2 6.9c0-2 .1-3.9.1-6 0-18.4-2.6-33.2-6.7-44.9 16.5 2.1 27.5 20.9 28.8 44ZM224 32.5c4.4 0 8.1 1 11.3 3-15.2 7-31.5 25-38.4 60.9l-36 11.1c10.1-34.4 31.4-75 63.1-75ZM192.9 245.9c1.4 22 59.5 26.8 62.8 78.6 2.6 40.7-21.5 68.6-56.3 70.8-41.8 2.6-64.8-22-64.8-22l8.9-37.7s23.1 17.4 41.6 16.3c12.1-.8 16.4-10.6 16-17.6-1.8-28.7-49.1-27-52.1-74.4-2.5-39.8 23.6-80.1 81.3-83.7 22.2-1.4 33.6 4.3 33.6 4.3l-13.2 49.4s-14.7-6.7-32.1-5.6c-25.6 1.6-25.9 17.8-25.7 21.6ZM274.66 66.4c-.2-21.2-2.7-40.7-7.4-56.7 14.6 3.1 21.8 19.6 24.8 29.4-1.9.6-9.6 3-17.4 5.4Z"
      />
    </svg>
  );
}
