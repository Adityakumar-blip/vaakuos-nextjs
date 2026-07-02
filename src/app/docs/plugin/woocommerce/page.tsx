import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Trash2,
  Wand2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "WooCommerce plugin — setup guide",
  description:
    "Connect your WooCommerce store to Vaakuos and win back abandoned carts on WhatsApp. A plain-English guide to installing the plugin, adding your API key, and checking it works — no coding required.",
  alternates: {
    canonical: "/docs/plugin/woocommerce",
  },
};

const TOC = [
  { id: "overview", label: "What it does" },
  { id: "requirements", label: "What you need" },
  { id: "install", label: "Set it up" },
  { id: "verify", label: "Check it's working" },
  { id: "messaging", label: "Who gets messaged" },
  { id: "troubleshooting", label: "If something's off" },
  { id: "uninstall", label: "Removing it" },
];

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
      {children}
    </p>
  );
}

const SETUP_STEPS = [
  {
    title: "Add the plugin to your store",
    body: "First make sure WooCommerce itself is installed and active. Then add Vaakuos the same way you add any plugin: in your WordPress dashboard go to Plugins → Add New, search for “Vaakuos”, click Install, then Activate. Were you sent a .zip file instead? Choose Upload Plugin at the top, pick the file, and activate.",
  },
  {
    title: "Copy your API key from Vaakuos",
    body: "Your API key is what links this store to your Vaakuos account. In your Vaakuos dashboard open Settings → API / Integrations and copy the key. Treat it like a password — don’t post it anywhere public.",
  },
  {
    title: "Turn it on and save your settings",
    body: "In WordPress go to Vaakuos → Settings. Tick Enable, paste your API key, and leave the Backend API URL exactly as it is. Choose which order updates you want to send (for example “completed” or “shipped”), and set your Default country code — for example 91 for India — so local phone numbers work on WhatsApp. Click Save, and you’re done.",
  },
  {
    title: "Optional: keep delivery timely on low-traffic sites",
    body: "The plugin sends everything in the background, and on a busy store that happens right away. On a very quiet store, sending waits until someone next visits the site. If that’s you, ask your hosting provider to run a “server cron” every few minutes — most managed WordPress hosts offer this as a setting in their control panel — so messages go out on schedule.",
  },
];

const TROUBLESHOOTING = [
  ["Messages aren’t going out", "Vaakuos → Event Log", "On a quiet store, sending waits for the next visitor. Open your store in a browser to nudge it, or set up the optional server cron above."],
  ["An error about the key (401 / 403)", "Vaakuos → Event Log", "Your API key is wrong or expired. Re-copy it from your Vaakuos dashboard into Settings."],
  ["A “not found” error (404)", "Vaakuos → Event Log", "The Backend API URL was changed by mistake. Set it back to https://api.vaakuos.com."],
  ["Some shoppers aren’t being messaged", "Event Log (look for “skipped”)", "“Require opt-in” is on and those shoppers never agreed to marketing messages."],
  ["An abandoned cart wasn’t sent", "Vaakuos → Abandoned Carts", "The shopper never entered an email or phone number, so there’s no way to reach them. It still counts toward your stats."],
  ["No abandoned carts show up at all", "Vaakuos → Settings", "Your “abandon after” time may be set too high. Lower it and test with a cart of your own."],
];

export default function WooCommerceDocsPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Docs", path: "/docs" },
    { name: "WooCommerce plugin", path: "/docs/plugin/woocommerce" },
  ]);

  return (
    <div className="min-h-screen bg-background pt-24 text-foreground">
      <JsonLd data={breadcrumb} />

      {/* Hero */}
      <section className="border-b border-border/70">
        <div className="container mx-auto max-w-7xl px-4 py-10 md:py-14">
          <Link
            href="/integrations/woocommerce"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to the WooCommerce integration
          </Link>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                Setup guide
              </span>
              <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
                Vaakuos for WooCommerce
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                This plugin watches your store for shoppers who leave without
                buying, new orders, and order updates — and quietly passes them
                to your Vaakuos account so you can follow up on WhatsApp. It
                installs in a few minutes, needs no coding, and never slows down
                your store or checkout.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="xl" className="rounded-2xl">
                  <Link href="/signup">
                    Create a free account
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="xl"
                  className="rounded-2xl border-primary/20 bg-white/60"
                >
                  <Link href="/contact">Talk to support</Link>
                </Button>
              </div>
            </div>

            <aside className="border-l border-border pl-0 lg:pl-6">
              <div className="divide-y divide-border rounded-2xl border border-border bg-white/35">
                {[
                  { icon: Clock3, label: "Setup time", value: "About 5 minutes" },
                  { icon: Wand2, label: "Coding needed", value: "None" },
                  { icon: RefreshCw, label: "How it runs", value: "Automatically" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-3 p-4">
                      <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-1 font-semibold">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="container mx-auto grid max-w-7xl gap-12 px-4 py-14 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* Table of contents */}
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-1">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              On this page
            </p>
            {TOC.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="max-w-3xl">
          {/* Overview */}
          <section id="overview" className="scroll-mt-28">
            <SectionEyebrow>What it does</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-bold">
              Turn missed sales into WhatsApp follow-ups
            </h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              When a shopper adds items to their cart and leaves, when an order
              comes in or changes status, or when a customer signs up, the plugin
              lets your Vaakuos account know. Vaakuos can then reach out on
              WhatsApp — a friendly nudge to finish checkout, an order update, or
              a thank-you.
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">
              It all happens quietly in the background, so your pages and checkout
              stay fast for shoppers. It works with the latest version of
              WooCommerce, including the newer block-based cart and checkout, and
              it respects WordPress privacy tools for exporting or erasing a
              customer’s data.
            </p>
          </section>

          {/* Requirements */}
          <section id="requirements" className="mt-14 scroll-mt-28">
            <SectionEyebrow>What you need</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-bold">Before you start</h2>
            <div className="mt-6 divide-y divide-border rounded-2xl border border-border">
              {[
                ["WooCommerce", "Installed and active (version 7.0 or newer)"],
                ["WordPress", "Version 6.0 or newer"],
                ["A Vaakuos account", "Free to create — you’ll copy an API key from it"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[160px_1fr] gap-4 p-4">
                  <span className="font-semibold">{k}</span>
                  <span className="text-muted-foreground">{v}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Install */}
          <section id="install" className="mt-14 scroll-mt-28">
            <SectionEyebrow>Set it up</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-bold">Four simple steps</h2>
            <ol className="mt-8 border-l border-border">
              {SETUP_STEPS.map((step, index) => (
                <li key={step.title} className="relative pb-8 pl-8 last:pb-0">
                  <span className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-background text-sm font-semibold text-primary">
                    {index + 1}
                  </span>
                  <h3 className="pt-0.5 font-bold">{step.title}</h3>
                  <p className="mt-2 leading-7 text-muted-foreground">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* Verify */}
          <section id="verify" className="mt-14 scroll-mt-28">
            <SectionEyebrow>Check it&apos;s working</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-bold">A quick two-minute test</h2>
            <ol className="mt-6 list-decimal space-y-3 pl-5 leading-7 text-muted-foreground marker:font-semibold marker:text-foreground">
              <li>
                Open your store in a private/incognito window so you look like a
                new shopper. Add a product to the cart and enter an email on the
                checkout page — but don&apos;t complete the purchase.
              </li>
              <li>
                In <strong>Vaakuos → Settings</strong>, temporarily lower{" "}
                <strong>Abandon after</strong> to 1 minute and save, so you don&apos;t
                have to wait.
              </li>
              <li>
                Wait a couple of minutes, then open{" "}
                <strong>Vaakuos → Event Log</strong>. You should see an{" "}
                <strong>abandoned cart</strong> marked as <strong>sent</strong>.
              </li>
              <li>
                That&apos;s it — set <strong>Abandon after</strong> back to your normal
                value (for example 30 or 60 minutes) and save.
              </li>
            </ol>
          </section>

          {/* Who gets messaged */}
          <section id="messaging" className="mt-14 scroll-mt-28">
            <div className="mb-2 flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <SectionEyebrow>Who gets messaged</SectionEyebrow>
            </div>
            <h2 className="mt-3 text-2xl font-bold">Stay in control of consent</h2>
            <p className="mt-4 leading-8 text-muted-foreground">
              By default, anyone who leaves their contact details can be messaged.
              If you turn on <strong>Require opt-in</strong>, marketing messages —
              like abandoned-cart reminders — only go to shoppers who agreed to
              receive them; everyone else is simply skipped.
            </p>
            <p className="mt-4 leading-8 text-muted-foreground">
              Order updates such as “your order has shipped” always go out, because
              they&apos;re service messages people expect, not marketing. If you have a
              custom consent checkbox at checkout,{" "}
              <Link href="/contact" className="font-semibold text-primary hover:underline">
                ask support
              </Link>{" "}
              and we&apos;ll help you connect it.
            </p>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-muted/30 p-5">
              <Smartphone className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <p className="text-sm leading-7 text-muted-foreground">
                <strong className="text-foreground">About phone numbers.</strong>{" "}
                WhatsApp needs the country code to reach someone. That&apos;s why you
                set a <strong>Default country code</strong> during setup — it turns
                a local number like <span className="font-mono">9876543210</span>{" "}
                into a full WhatsApp number automatically. Just make sure it matches
                where most of your customers are.
              </p>
            </div>
          </section>

          {/* Troubleshooting */}
          <section id="troubleshooting" className="mt-14 scroll-mt-28">
            <SectionEyebrow>If something&apos;s off</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-bold">Common questions</h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold">What you&apos;re seeing</th>
                    <th className="px-4 py-3 font-semibold">Where to look</th>
                    <th className="px-4 py-3 font-semibold">What to do</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {TROUBLESHOOTING.map(([symptom, where, fix]) => (
                    <tr key={symptom} className="align-top">
                      <td className="px-4 py-3 font-semibold">{symptom}</td>
                      <td className="px-4 py-3 text-muted-foreground">{where}</td>
                      <td className="px-4 py-3 text-muted-foreground">{fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-sm leading-7 text-muted-foreground">
              Still stuck?{" "}
              <Link href="/contact" className="font-semibold text-primary hover:underline">
                Contact support
              </Link>{" "}
              and we&apos;ll take a look with you.
            </p>
          </section>

          {/* Uninstall */}
          <section id="uninstall" className="mt-14 scroll-mt-28">
            <div className="mb-2 flex items-center gap-3">
              <Trash2 className="h-5 w-5 text-primary" />
              <SectionEyebrow>Removing it</SectionEyebrow>
            </div>
            <h2 className="mt-3 text-2xl font-bold">Turning the plugin off</h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              To pause it, just <strong>Deactivate</strong> the plugin — your
              settings and data stay put, and nothing new is sent. To remove it
              completely, <strong>Delete</strong> it from the Plugins screen; that
              cleans up its settings and data for good.
            </p>
          </section>

          {/* CTA */}
          <section className="mt-16 rounded-3xl border border-border bg-white/35 p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold">Ready to win back more sales?</h2>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
              Create a free Vaakuos account, add the plugin, and start following
              up on WhatsApp in about five minutes.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="xl" className="rounded-2xl">
                <Link href="/signup">
                  Get started free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="rounded-2xl border-primary/20 bg-white/60"
              >
                <Link href="/contact">Contact support</Link>
              </Button>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
