"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

let analyticsModulePromise: Promise<typeof import("@/lib/analytics")> | null =
  null;

const loadAnalyticsModule = () => {
  analyticsModulePromise ??= import("@/lib/analytics");
  return analyticsModulePromise;
};

function AnalyticsTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialise the analytics SDKs once, when the browser is idle.
  useEffect(() => {
    const initialize = () => {
      void loadAnalyticsModule().then(({ initAnalytics }) => {
        initAnalytics();
      });
    };

    const win = window as unknown as {
      requestIdleCallback?: (
        callback: () => void,
        options?: { timeout: number },
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof win.requestIdleCallback === "function") {
      const idleId = win.requestIdleCallback(initialize, { timeout: 2000 });
      return () => win.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(initialize, 1500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  // Track a page view on every client-side route change.
  useEffect(() => {
    const query = searchParams?.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    void loadAnalyticsModule().then(({ trackPageView }) => {
      trackPageView(path);
    });
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsTracker() {
  // useSearchParams() requires a Suspense boundary in the App Router.
  return (
    <Suspense fallback={null}>
      <AnalyticsTrackerInner />
    </Suspense>
  );
}
