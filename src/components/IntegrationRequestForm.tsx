"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/sonner";
import {
  Loader2,
  ArrowRight,
  PlugZap,
  Webhook,
  GitBranch,
  Check,
  CheckCircle2,
} from "lucide-react";

interface IntegrationRequestFormProps {
  onSuccess?: () => void;
  isPage?: boolean;
}

const categories = [
  "E-commerce / Storefront",
  "CRM",
  "Marketing / Email & SMS",
  "Helpdesk / Support",
  "Automation / Workflow",
  "Analytics / Data",
  "Other",
];

const inputCls =
  "h-11 rounded-lg border-input bg-background px-3.5 text-sm transition-colors placeholder:text-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-0 focus-visible:border-primary/50";

const labelCls = "mb-1.5 block text-sm font-medium text-foreground";

const perks = [
  { icon: PlugZap, text: "Native plugin or OAuth connector" },
  { icon: Webhook, text: "Signed webhooks and retry queues" },
  { icon: GitBranch, text: "Routed signals into your stack" },
];

export const IntegrationRequestForm = ({
  onSuccess,
  isPage = false,
}: IntegrationRequestFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    toolName: "",
    website: "",
    category: "",
    useCase: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const baseUrl = (
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      ).replace(/\/+$/, "");
      const response = await fetch(`${baseUrl}/integration-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit integration request");

      toast.success("Request received!", {
        description: `We'll review the ${formData.toolName || "integration"} request and let you know if it makes our product roadmap.`,
      });
      setIsSubmitting(false);
      setSubmitted(true);
    } catch {
      setIsSubmitting(false);
      toast.error("Oops! Something went wrong.", {
        description: "Please try again later or contact support.",
      });
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden md:min-h-[560px] md:flex-row",
        isPage &&
          "mx-auto max-w-[900px] rounded-2xl border border-border bg-card shadow-xl shadow-foreground/[0.04]",
      )}
    >
      {/* ── Summary panel ── */}
      <aside className="relative flex shrink-0 flex-col gap-4 border-b border-border bg-muted/40 p-5 md:w-[300px] md:gap-6 md:border-b-0 md:border-r md:p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-border md:h-11 md:w-11">
            <Image
              src="/images/green.svg"
              alt="VaakuOS"
              width={24}
              height={24}
              className="h-6 w-6 md:h-7 md:w-7"
            />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">
              VaakuOS Integrations
            </p>
            <p className="text-xs text-muted-foreground">Connector Team</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
            Request an integration
          </h2>
          <p className="mt-1.5 hidden text-sm leading-relaxed text-muted-foreground md:block">
            Tell us which tool you want to connect. We&apos;ll scope it and get
            back to you with a path to go live.
          </p>
        </div>

        <ul className="flex flex-col gap-3 text-sm text-foreground">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <li key={perk.text} className="flex items-start gap-2.5 md:gap-3">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="leading-snug text-muted-foreground">
                  {perk.text}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="rounded-xl border border-primary/20 bg-primary/[0.06] p-3.5 md:mt-auto">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
            Typical turnaround
          </p>
          <p className="text-sm font-medium text-foreground">
            We respond within one business day.
          </p>
        </div>
      </aside>

      {/* ── Interaction panel ── */}
      <div className="relative flex flex-1 flex-col bg-card">
        {submitted ? (
          <SuccessState
            toolName={formData.toolName}
            isPage={isPage}
            onDone={onSuccess}
          />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
            <div className="border-b border-border px-5 py-4 md:px-7">
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                Tell us what to connect
              </h3>
              <p className="text-xs text-muted-foreground">
                The more detail you share, the faster we can scope it.
              </p>
            </div>

            <div className="flex-1 space-y-5 p-5 text-left md:p-7">
              <div>
                <Label htmlFor="ir-name" className={labelCls}>
                  Full name <span className="text-accent">*</span>
                </Label>
                <Input
                  id="ir-name"
                  placeholder="John Doe"
                  required
                  className={inputCls}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="ir-email" className={labelCls}>
                    Work email <span className="text-accent">*</span>
                  </Label>
                  <Input
                    id="ir-email"
                    type="email"
                    placeholder="john@company.com"
                    required
                    className={inputCls}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="ir-company" className={labelCls}>
                    Company / store
                  </Label>
                  <Input
                    id="ir-company"
                    placeholder="Acme Store"
                    className={inputCls}
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="ir-tool" className={labelCls}>
                    Tool / app to integrate{" "}
                    <span className="text-accent">*</span>
                  </Label>
                  <Input
                    id="ir-tool"
                    placeholder="e.g. Gorgias, Klaviyo"
                    required
                    className={inputCls}
                    value={formData.toolName}
                    onChange={(e) =>
                      setFormData({ ...formData, toolName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="ir-website" className={labelCls}>
                    Tool website
                  </Label>
                  <Input
                    id="ir-website"
                    type="url"
                    placeholder="https://"
                    className={inputCls}
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="ir-category" className={labelCls}>
                  Category <span className="text-accent">*</span>
                </Label>
                <Select
                  required
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                >
                  <SelectTrigger
                    id="ir-category"
                    className="h-11 rounded-lg border-input focus:ring-2 focus:ring-primary/25 focus:ring-offset-0"
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ir-usecase" className={labelCls}>
                  What&apos;s your use case?
                </Label>
                <Textarea
                  id="ir-usecase"
                  placeholder="Which data should sync, and what workflow should it power?"
                  className="min-h-[96px] resize-none rounded-lg border-input bg-background px-3.5 py-3 text-sm leading-relaxed transition-colors placeholder:text-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-0 focus-visible:border-primary/50"
                  value={formData.useCase}
                  onChange={(e) =>
                    setFormData({ ...formData, useCase: e.target.value })
                  }
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="group h-12 w-full rounded-lg text-sm font-semibold shadow-lg shadow-primary/15"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Submit request
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </div>

            <div className="mt-auto flex items-center gap-1.5 border-t border-border px-5 py-3.5 text-xs text-muted-foreground md:px-7">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
              No commitment · We respond within one business day.
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

function SuccessState({
  toolName,
  isPage,
  onDone,
}: {
  toolName: string;
  isPage: boolean;
  onDone?: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10 ring-8 ring-success/5">
        <Check className="h-10 w-10 text-success" />
      </div>
      <h3 className="mb-3 text-2xl font-semibold tracking-tight">
        Request received!
      </h3>
      <p className="mb-8 max-w-sm leading-relaxed text-muted-foreground">
        Thanks for flagging {toolName ? <strong>{toolName}</strong> : "this"}.
        Our team will review your request and let you know if it makes our
        product roadmap.
      </p>
      {isPage ? (
        <Button variant="outline" className="rounded-lg" asChild>
          <Link href="/integrations">← Back to integrations</Link>
        </Button>
      ) : (
        <Button className="rounded-lg" onClick={onDone}>
          Done
        </Button>
      )}
    </div>
  );
}
