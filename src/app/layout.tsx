import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteChrome } from "@/components/site-chrome";
import { AnalyticsTracker } from "@/components/analytics-tracker";

const display = Bricolage_Grotesque({ subsets: ["latin"], axes: ["opsz"], variable: "--font-display" });

export const metadata: Metadata = {
  title: {
    default: "VaakuOS | Customer Messaging on WhatsApp, Email, Instagram & Messenger",
    template: "%s | VaakuOS",
  },
  description:
    "One inbox and one customer record across WhatsApp, email, Instagram and Messenger. Automate follow-ups, run campaigns and see which messages led to a sale, booking or payment.",
  keywords: [
    "WhatsApp Business API",
    "omnichannel inbox",
    "Instagram DM automation",
    "customer messaging platform",
    "abandoned cart recovery",
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
    title: "VaakuOS | Customer Messaging on WhatsApp, Email, Instagram & Messenger",
    description:
      "One inbox and one customer record across WhatsApp, email, Instagram and Messenger. Automate follow-ups, run campaigns and see which messages led to a sale, booking or payment.",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "VaakuOS - Customer messaging across WhatsApp, email, Instagram and Messenger",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VaakuOS | Customer Messaging on WhatsApp, Email, Instagram & Messenger",
    description:
      "One inbox and one customer record across WhatsApp, email, Instagram and Messenger. Automate follow-ups, run campaigns and see which messages led to a sale, booking or payment.",
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
      <body className={`${display.className} ${display.variable} bg-paper text-ink`}>
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