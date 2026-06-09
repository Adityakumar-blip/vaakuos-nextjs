import type { Integration } from "./integration-data";

type PluginLogoProps = Pick<Integration, "logo" | "name"> & {
  className?: string;
};

const svgPath: Partial<Record<Integration["logo"], string>> = {
  shopify: "/icons/brands/shopify.svg",
  woocommerce: "/icons/brands/woocommerce.svg",
  bigcommerce: "/icons/brands/bigcommerce.svg",
  magento: "/icons/brands/magento.svg",
  hubspot: "/icons/brands/hubspot.svg",
  salesforce: "/icons/brands/salesforce.svg",
  zapier: "/icons/brands/zapier.svg",
  slack: "/icons/brands/slack.svg",
  sheets: "/icons/brands/googlesheets.svg",
  wix: "/icons/brands/wix.svg",
  webflow: "/icons/brands/webflow.svg",
};

// logos that need the SVG inverted to white (dark/colored backgrounds)
const invertedLogos = new Set<Integration["logo"]>([
  "woocommerce",
  "bigcommerce",
  "magento",
  "hubspot",
  "salesforce",
  "zapier",
  "sheets",
  "wix",
  "webflow",
]);

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

  const src = svgPath[logo];
  const filter = invertedLogos.has(logo)
    ? "brightness(0) invert(1)"
    : "brightness(0)";

  return (
    <div
      className={`relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-black/10 shadow-sm ${styles[logo]} ${className}`.trim()}
      aria-hidden="true"
    >
      {src ? (
        <img
          src={src}
          alt=""
          width={32}
          height={32}
          style={{ filter }}
          draggable={false}
        />
      ) : (
        // Klaviyo: no open-source SVG available, use letter mark
        <span className="text-2xl font-bold">K</span>
      )}
      <span className="sr-only">{name} logo</span>
    </div>
  );
}
