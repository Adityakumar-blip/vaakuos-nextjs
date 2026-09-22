import type { Metadata } from "next";
import { IntegrationRequestForm } from "@/components/IntegrationRequestForm";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request an integration",
  description:
    "Tell us which tool you want VaakuOS to connect with. Our team scopes it and follows up within one business day.",
  alternates: {
    canonical: "/request-integration",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Integrations", path: "/integrations" },
  { name: "Request an integration", path: "/request-integration" },
]);

export default function RequestIntegrationPage() {
  return (
    <section className="px-4 pb-20 pt-28 md:pb-28 md:pt-36">
      <JsonLd data={breadcrumb} />
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-12">
          <h1 className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink md:text-[2rem]">
            Don&rsquo;t see the tool you run?
          </h1>
          <p className="max-w-md text-lg leading-8 text-ink/70 md:justify-self-end">
            Tell us which app you want VaakuOS to connect with. We scope it
            and follow up with a path to go live within one business day.
          </p>
        </div>

        <div className="mt-14 border-t border-line pt-14">
          <IntegrationRequestForm isPage />
        </div>
      </div>
    </section>
  );
}
