import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteChrome } from "@/components/site-chrome";
import { AnalyticsTracker } from "@/components/analytics-tracker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "VaakuOS | WhatsApp Marketing & Cart Recovery for E-commerce",
    template: "%s | VaakuOS",
  },
  description:
    "WhatsApp marketing platform for Shopify & WooCommerce brands. Recover abandoned carts, send broadcasts, automate order updates and track revenue per message.",
  keywords: [
    "abandoned cart recovery",
    "e-commerce",
    "WhatsApp marketing",
    "customer engagement",
    "AI-powered messaging",
  ],
  authors: [{ name: "VaakuOS" }],
  creator: "VaakuOS",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://vaakuos.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vaakuos.com",
    siteName: "VaakuOS",
    title: "VaakuOS | WhatsApp Marketing & Cart Recovery for E-commerce",
    description:
      "WhatsApp marketing platform for Shopify & WooCommerce brands. Recover abandoned carts, send broadcasts, automate order updates and track revenue per message.",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "VaakuOS - WhatsApp Marketing & Abandoned Cart Recovery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VaakuOS | WhatsApp Marketing & Cart Recovery for E-commerce",
    description:
      "WhatsApp marketing platform for Shopify & WooCommerce brands. Recover abandoned carts, send broadcasts, automate order updates and track revenue per message.",
    images: ["/og-image.png"],
    creator: "@useVaakuos",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    other: {
      "facebook-domain-verification": "b2ssfhjwgbjs5cm0x21z45xcfanqap",
    },
  },
};

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
        <AnalyticsTracker />
        {FB_PIXEL_ID && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}
      </body>
    </html>
  );
}