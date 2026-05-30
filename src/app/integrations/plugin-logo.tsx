import type { Integration } from "./integration-data";

type PluginLogoProps = Pick<Integration, "logo" | "name"> & {
  className?: string;
};

export function PluginLogo({ logo, name, className = "" }: PluginLogoProps) {
  const styles: Record<Integration["logo"], string> = {
    shopify: "bg-[#95BF47] text-[#173300]",
    woocommerce: "bg-[#7F54B3] text-white",
    bigcommerce: "bg-[#121118] text-white",
    magento: "bg-[#F26322] text-white",
    hubspot: "bg-[#FF5C35] text-white",
    salesforce: "bg-[#00A1E0] text-white",
    klaviyo: "bg-[#111111] text-white",
    zapier: "bg-[#FF4F00] text-white",
    slack: "bg-white text-[#1D1C1D]",
    sheets: "bg-[#0F9D58] text-white",
    wix: "bg-[#0C0C0C] text-white",
    webflow: "bg-[#146EF5] text-white",
  };

  return (
    <div
      className={`relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-black/10 shadow-sm ${styles[logo]} ${className}`.trim()}
      aria-hidden="true"
    >
      {logo === "shopify" && (
        <div className="relative h-9 w-8 rounded-b-lg rounded-t-sm bg-white/95 shadow-inner">
          <span className="absolute left-1/2 top-2 h-2 w-3 -translate-x-1/2 rounded-t-full border-2 border-[#173300]" />
          <span className="absolute inset-x-0 bottom-1 text-center text-lg font-bold leading-none text-[#95BF47]">
            S
          </span>
        </div>
      )}
      {logo === "woocommerce" && (
        <span className="rounded-lg bg-white px-2 py-1 text-[11px] font-bold text-[#7F54B3]">
          WOO
        </span>
      )}
      {logo === "bigcommerce" && <span className="text-2xl font-bold">B</span>}
      {logo === "magento" && <span className="text-2xl font-bold">M</span>}
      {logo === "hubspot" && (
        <span className="relative h-8 w-8">
          <span className="absolute left-2 top-3 h-3 w-3 rounded-full bg-white" />
          <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-white" />
          <span className="absolute bottom-0 right-1 h-2.5 w-2.5 rounded-full bg-white" />
          <span className="absolute left-4 top-2 h-5 w-0.5 rotate-45 bg-white" />
          <span className="absolute left-4 top-5 h-4 w-0.5 -rotate-45 bg-white" />
        </span>
      )}
      {logo === "salesforce" && (
        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-bold text-[#00A1E0]">
          cloud
        </span>
      )}
      {logo === "klaviyo" && <span className="text-2xl font-bold">K</span>}
      {logo === "zapier" && <span className="text-3xl font-bold">*</span>}
      {logo === "slack" && (
        <span className="grid h-8 w-8 grid-cols-2 gap-1">
          <span className="rounded-full rounded-br-sm bg-[#36C5F0]" />
          <span className="rounded-full rounded-bl-sm bg-[#2EB67D]" />
          <span className="rounded-full rounded-tr-sm bg-[#E01E5A]" />
          <span className="rounded-full rounded-tl-sm bg-[#ECB22E]" />
        </span>
      )}
      {logo === "sheets" && (
        <span className="grid h-8 w-7 grid-cols-2 grid-rows-3 gap-0.5 rounded bg-white/95 p-1">
          <span className="col-span-2 bg-[#0F9D58]" />
          <span className="bg-[#0F9D58]" />
          <span className="bg-[#0F9D58]" />
          <span className="bg-[#0F9D58]" />
          <span className="bg-[#0F9D58]" />
        </span>
      )}
      {logo === "wix" && <span className="text-xl font-bold">WIX</span>}
      {logo === "webflow" && <span className="text-lg font-bold italic">W</span>}
      <span className="sr-only">{name} logo</span>
    </div>
  );
}
