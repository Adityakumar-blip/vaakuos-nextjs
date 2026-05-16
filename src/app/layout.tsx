import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "VaakuOS | Recover every abandoned sale",
    template: "%s | VaakuOS",
  },
  description:
    "VaakuOS tracks intent and re-engages shoppers across channels to win back abandoned carts and conversations.",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vaakuos.com",
    siteName: "VaakuOS",
    title: "VaakuOS | Recover every abandoned sale",
    description:
      "VaakuOS tracks intent and re-engages shoppers across channels to win back abandoned carts and conversations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VaakuOS - AI-Powered Abandoned Cart Recovery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VaakuOS | Recover every abandoned sale",
    description:
      "VaakuOS tracks intent and re-engages shoppers across channels to win back abandoned carts and conversations.",
    images: ["/og-image.png"],
    creator: "@Vaakuos",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}