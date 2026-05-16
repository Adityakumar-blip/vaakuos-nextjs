import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "VaakuOS cookie policy and tracking technologies.",
  alternates: {
    canonical: "/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        <div className="prose max-w-none text-muted-foreground">
          <p>Last updated: March 4, 2026</p>

          <p>
            This Cookie Policy explains how VaakuOS uses cookies and similar tracking
            technologies when you visit our website.
          </p>

          <h2>What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your device when you
            visit a website. They help websites remember your preferences and
            understand how you use the site.
          </p>

          <h2>How We Use Cookies</h2>
          <p>We use cookies for:</p>
          <ul>
            <li><strong>Essential cookies:</strong> Required for the website to function</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Marketing cookies:</strong> Track your activity across websites for advertising</li>
          </ul>

          <h2>Managing Cookies</h2>
          <p>
            You can control cookies through your browser settings. Disabling certain
            cookies may affect website functionality.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about our use of cookies? Contact us at privacy@vaakuos.com
          </p>
        </div>
      </div>
    </div>
  );
}