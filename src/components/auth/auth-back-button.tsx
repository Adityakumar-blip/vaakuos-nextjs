"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function AuthBackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="group/back absolute left-5 top-6 z-30 inline-flex items-center gap-2 text-[0.82rem] font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground sm:left-8 lg:left-12"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/70 shadow-sm backdrop-blur-md transition-all duration-200 group-hover/back:-translate-x-0.5 group-hover/back:border-foreground/25 group-hover/back:bg-card group-hover/back:shadow-md">
        <ArrowLeft className="h-[16px] w-[16px]" />
      </span>
      Back
    </button>
  );
}
