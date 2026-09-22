import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock3,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Wand2,
} from "lucide-react";

import { WalkthroughButton } from "@/components/walkthrough-button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import { DocsPager } from "../../docs-pager";

export const metadata: Metadata = {
  title: "WooCommerce plugin — setup guide",
  description:
    "Connect your WooCommerce store to VaakuOS and win back abandoned carts on WhatsApp. A plain-English guide to installing the plugin, adding your API key, and checking it works — no coding required.",
  alternates: {
    canonical: "/docs/plugin/woocommerce",
  },
};

const TOC = [
  { id: "overview", label: "What the plugin does" },
  { id: "requirements", label: "Before you start" },
  { id: "install", label: "Four simple steps" },
  { id: "verify", label: "A quick test" },
  { id: "messaging", label: "Who gets messaged" },
  { id: "troubleshooting", label: "Common questions" },
  { id: "uninstall", label: "Turning the plugin off" },
];

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const inlineLink = `font-semibold text-forest underline underline-offset-4 decoration-forest/30 transition-colors hover:decoration-forest ${focusRing}`;

const SETUP_STEPS = [
  {
    title: "Add the plugin to your store",
    body: "First make sure WooCommerce itself is installed and active. Then add VaakuOS the same way you add any plugin: in your WordPress dashboard go to Plugins → Add New, search for “VaakuOS”, click Install, then Activate. Were you sent a .zip file instead? Choose Upload Plugin at the top, pick the file, and activate.",
  },
  {
    title: "Copy your API key from VaakuOS",
    body: "Your API key is what links this store to your VaakuOS account. In your VaakuOS dashboard open Settings → API / Integrations and copy the key. Treat it like a password — don’t post it anywhere public.",
  },
  {
    title: "Turn it on and save your settings",
    body: "In WordPress go to VaakuOS → Settings. Tick Enable, paste your API key, and leave the Backend API URL exactly as it is. Choose which order updates you want to send (for example “completed” or “shipped”), and set your Default country code — for example 91 for India — so local phone numbers work on WhatsApp. Click Save, and you’re done.",
  },
  {
    title: "Optional: keep delivery timely on low-traffic sites",
    body: "The plugin sends everything in the background, and on a busy store that happens right away. On a very quiet store, sending waits until someone next visits the site. If that’s you, ask your hosting provider to run a “server cron” every few minutes — most managed WordPress hosts offer this as a setting in their control panel — so messages go out on schedule.",
  },
];

const TROUBLESHOOTING = [
  ["Messages aren’t going out", "VaakuOS → Event Log", "On a quiet store, sending waits for the next visitor. Open your store in a browser to nudge it, or set up the optional server cron above."],
  ["An error about the key (401 / 403)", "VaakuOS → Event Log", "Your API key is wrong or expired. Re-copy it from your VaakuOS dashboard into Settings."],
  ["A “not found” error (404)", "VaakuOS → Event Log", "The Backend API URL was changed by mistake. Set it back to https://api.vaakuos.com."],
  ["Some shoppers aren’t being messaged", "Event Log (look for “skipped”)", "“Require opt-in” is on and those shoppers never agreed to marketing messages."],
  ["An abandoned cart wasn’t sent", "VaakuOS → Abandoned Carts", "The shopper never entered an email or phone number, so there’s no way to reach them. It still counts toward your stats."],
  ["No abandoned carts show up at all", "VaakuOS → Settings", "Your “abandon after” time may be set too high. Lower it and test with a cart of your own."],
];

export default function WooCommerceDocsPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Docs", path: "/docs" },
    { name: "WooCommerce plugin", path: "/docs/plugin/woocommerce" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumb} />

      <nav aria-label="Breadcrumb" className="text-sm text-ink/65">
        <Link href="/docs" className={inlineLink}>
          Docs
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink/65">Plugins and connectors</span>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink" aria-current="page">WooCommerce plugin</span>
      </nav>

      <div className="mt-8 xl:grid xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-12 xl:items-start">
        <article className="max-w-[68ch]">
          <header>
            <p className="text-sm font-semibold text-forest">Setup guide</p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-ink md:text-5xl">
              VaakuOS for WooCommerce
            </h1>
            <p className="mt-5 text-lg leading-8 text-ink/70">
              This plugin watches your store for shoppers who leave without buying,
              new orders and order updates, then passes them to your VaakuOS
              account so you can follow up. It installs in a few minutes, needs no
              coding, and doesn&apos;t slow down your store or checkout.
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-line py-5">
              {[
                { icon: Clock3, label: "Setup time", value: "About 5 minutes" },
                { icon: Wand2, label: "Coding needed", value: "None" },
                { icon: RefreshCw, label: "How it runs", value: "Automatically" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-forest" aria-hidden="true" />
                    <dt className="text-sm text-ink/65">{item.label}</dt>
                    <dd className="text-sm font-semibold text-ink">{item.value}</dd>
                  </div>
                );
              })}
            </dl>
          </header>

          <div className="mt-12">

            {/* Overview */}
            <section id="overview" className="scroll-mt-28">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink">
                What the plugin does
              </h2>
              <p className="mt-4 leading-8 text-ink/70">
                When a shopper adds items to their cart and leaves, when an order
                comes in or changes status, or when a customer signs up, the plugin
                lets your VaakuOS account know. VaakuOS can then reach out on
                WhatsApp — a friendly nudge to finish checkout, an order update, or
                a thank-you.
              </p>
              <p className="mt-4 leading-8 text-ink/70">
                It all happens quietly in the background, so your pages and checkout
                stay fast for shoppers. It works with the latest version of
                WooCommerce, including the newer block-based cart and checkout, and
                it respects WordPress privacy tools for exporting or erasing a
                customer’s data.
              </p>
            </section>

            {/* Requirements */}
            <section id="requirements" className="mt-14 scroll-mt-28">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink">Before you start</h2>
              <div className="mt-6 divide-y divide-line border-t border-line">
                {[
                  ["WooCommerce", "Installed and active (version 7.0 or newer)"],
                  ["WordPress", "Version 6.0 or newer"],
                  ["A VaakuOS account", "Free to create — you’ll copy an API key from it"],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[160px_1fr] gap-4 py-4">
                    <span className="font-semibold text-ink">{k}</span>
                    <span className="text-ink/70">{v}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Install */}
            <section id="install" className="mt-14 scroll-mt-28">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink">Four simple steps</h2>
              <ol className="mt-8 border-l border-line">
                {SETUP_STEPS.map((step, index) => (
                  <li key={step.title} className="relative pb-8 pl-8 last:pb-0">
                    <span className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-forest text-sm font-semibold text-paper">
                      {index + 1}
                    </span>
                    <h3 className="pt-0.5 font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 leading-7 text-ink/70">{step.body}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Verify */}
            <section id="verify" className="mt-14 scroll-mt-28">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink">A quick two-minute test</h2>
              <ol className="mt-6 list-decimal space-y-3 pl-5 leading-7 text-ink/70 marker:font-semibold marker:text-ink">
                <li>
                  Open your store in a private/incognito window so you look like a
                  new shopper. Add a product to the cart and enter an email on the
                  checkout page — but don&apos;t complete the purchase.
                </li>
                <li>
                  In <strong className="text-ink">VaakuOS &rarr; Settings</strong>, temporarily lower{" "}
                  <strong className="text-ink">Abandon after</strong> to 1 minute and save, so you don&apos;t
                  have to wait.
                </li>
                <li>
                  Wait a couple of minutes, then open{" "}
                  <strong className="text-ink">VaakuOS &rarr; Event Log</strong>. You should see an{" "}
                  <strong className="text-ink">abandoned cart</strong> marked as <strong className="text-ink">sent</strong>.
                </li>
                <li>
                  That&apos;s it — set <strong className="text-ink">Abandon after</strong> back to your normal
                  value (for example 30 or 60 minutes) and save.
                </li>
              </ol>
            </section>

            {/* Who gets messaged */}
            <section id="messaging" className="mt-14 scroll-mt-28">
              <div className="mb-2 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-forest" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink">Stay in control of consent</h2>
              <p className="mt-4 leading-8 text-ink/70">
                By default, anyone who leaves their contact details can be messaged.
                If you turn on <strong className="text-ink">Require opt-in</strong>, marketing messages —
                like abandoned-cart reminders — only go to shoppers who agreed to
                receive them; everyone else is simply skipped.
              </p>
              <p className="mt-4 leading-8 text-ink/70">
                Order updates such as “your order has shipped” always go out, because
                they&apos;re service messages people expect, not marketing. If you have a
                custom consent checkbox at checkout,{" "}
                <Link href="/contact" className={inlineLink}>
                  ask support
                </Link>{" "}
                and we&apos;ll help you connect it.
              </p>

              <div className="mt-6 flex items-start gap-3 border-t border-line pt-6">
                <Smartphone className="mt-0.5 h-5 w-5 flex-shrink-0 text-forest" aria-hidden="true" />
                <p className="text-sm leading-7 text-ink/70">
                  <strong className="text-ink">About phone numbers.</strong>{" "}
                  WhatsApp needs the country code to reach someone. That&apos;s why you
                  set a <strong className="text-ink">Default country code</strong> during setup — it turns
                  a local number like <span className="font-mono">9876543210</span>{" "}
                  into a full WhatsApp number automatically. Just make sure it matches
                  where most of your customers are.
                </p>
              </div>
            </section>

            {/* Troubleshooting */}
            <section id="troubleshooting" className="mt-14 scroll-mt-28">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink">Common questions</h2>
              <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
                <table className="w-full text-left text-sm">
                  <thead className="bg-mint-soft/50 text-ink/70">
                    <tr>
                      <th className="px-4 py-3 font-semibold">What you&apos;re seeing</th>
                      <th className="px-4 py-3 font-semibold">Where to look</th>
                      <th className="px-4 py-3 font-semibold">What to do</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {TROUBLESHOOTING.map(([symptom, where, fix]) => (
                      <tr key={symptom} className="align-top">
                        <td className="px-4 py-3 font-semibold text-ink">{symptom}</td>
                        <td className="px-4 py-3 text-ink/70">{where}</td>
                        <td className="px-4 py-3 text-ink/70">{fix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 text-sm leading-7 text-ink/70">
                Still stuck?{" "}
                <Link href="/contact" className={inlineLink}>
                  Contact support
                </Link>{" "}
                and we&apos;ll take a look with you.
              </p>
            </section>

            {/* Uninstall */}
            <section id="uninstall" className="mt-14 scroll-mt-28">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink">Turning the plugin off</h2>
              <p className="mt-4 leading-7 text-ink/70">
                To pause it, just <strong className="text-ink">Deactivate</strong> the plugin — your
                settings and data stay put, and nothing new is sent. To remove it
                completely, <strong className="text-ink">Delete</strong> it from the Plugins screen; that
                cleans up its settings and data for good.
              </p>
            </section>

            {/* CTA */}
            <section className="mt-16 border-t border-ink pt-10">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-forest" aria-hidden="true" />
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink">
                  Ready to win back more sales?
                </h2>
              </div>
              <p className="mt-3 max-w-prose leading-7 text-ink/70">
                Book a walkthrough, add the plugin, and start following up on
                WhatsApp in about five minutes.
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <WalkthroughButton />
                <Link href="/contact" className={inlineLink}>
                  Contact support
                </Link>
              </div>
            </section>
          </div>

          <DocsPager href="/docs/plugin/woocommerce" />
        </article>

        <aside className="hidden xl:block">
          <nav aria-label="On this page" className="sticky top-28">
            <p className="mb-3 text-sm font-bold text-ink">On this page</p>
            <ul className="border-l border-line">
              {TOC.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-ink/70 transition-colors hover:border-ink/30 hover:text-ink ${focusRing}`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
