import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "VaakuOS terms of service and usage agreement.",
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose max-w-none text-muted-foreground">
          <p>Last updated: March 4, 2026</p>

          <p>
            Welcome to VaakuOS. By accessing or using our service, you agree to be
            bound by these Terms of Service.
          </p>

          <h2>Use of Service</h2>
          <p>
            You may use our service only as permitted by these Terms and applicable
            laws. You agree not to:
          </p>
          <ul>
            <li>Use the service for any illegal purpose</li>
            <li>Violate any laws in your jurisdiction</li>
            <li>Infringe on the intellectual property rights of others</li>
            <li>Attempt to gain unauthorized access to our systems</li>
          </ul>

          <h2>Account Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account
            credentials and for all activities that occur under your account.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            The service and all content, features, and functionality are owned by
            VaakuOS and are protected by copyright, trademark, and other laws.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these Terms? Contact us at legal@vaakuos.com
          </p>
        </div>
      </div>
    </div>
  );
}
