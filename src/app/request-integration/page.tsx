import type { Metadata } from "next";
import { IntegrationRequestForm } from "@/components/IntegrationRequestForm";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request an Integration",
  description:
    "Don't see the tool you need? Request a VaakuOS integration and our connector team will scope it and follow up within one business day.",
  alternates: {
    canonical: "/request-integration",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Integrations", path: "/integrations" },
  { name: "Request an Integration", path: "/request-integration" },
]);

export default function RequestIntegrationPage() {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-16 pt-28 md:pb-24 md:pt-32">
      <JsonLd data={breadcrumb} />

      {/* ── Background — matches hero, demo & contact sections ── */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(var(--muted))_58%,hsl(var(--background))_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,hsl(var(--tertiary)/0.46),transparent_30%),radial-gradient(circle_at_88%_10%,hsl(var(--primary)/0.20),transparent_28%),linear-gradient(120deg,transparent_0%,hsl(var(--accent)/0.08)_45%,transparent_70%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.22] [background-image:linear-gradient(hsl(var(--foreground)/0.08)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.08)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="container relative z-10 mx-auto max-w-5xl">
        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">
            Request an integration
          </p>
          <h1 className="mb-5 text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
            Don&apos;t see the tool you need?
          </h1>
          <p className="mx-auto max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
            Tell us which app you want VaakuOS to connect with. Our connector
            team will scope it and follow up with a path to go live within one
            business day.
          </p>
        </div>

        <div className="mt-8 md:mt-14">
          <IntegrationRequestForm isPage={true} />
        </div>
      </div>
    </section>
  );
}
