"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface IntegrationRequestFormProps {
  onSuccess?: () => void;
  isPage?: boolean;
}

type FormData = {
  name: string;
  email: string;
  company: string;
  toolName: string;
  website: string;
  category: string;
  useCase: string;
};

const categories = [
  "E-commerce / storefront",
  "CRM",
  "Marketing / email & SMS",
  "Helpdesk / support",
  "Automation / workflow",
  "Analytics / data",
  "Other",
];

const perks = [
  "Native plugin or OAuth connector",
  "Signed webhooks and retry queues",
  "Routed into the tools you already run",
];

// what to ask for when a required field is empty
const fieldLabel: Record<string, string> = {
  name: "your full name",
  email: "a work email",
  toolName: "the tool you want to connect",
  category: "a category",
};

function messageFor(el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
  if (el.validity.valueMissing) return `Enter ${fieldLabel[el.name] ?? "this field"}.`;
  if (el.validity.typeMismatch && el.name === "email") return "Enter a valid email address.";
  if (el.validity.typeMismatch && el.name === "website") return "Enter a full URL, like https://example.com.";
  return "Check this field and try again.";
}

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";
const inputCls = `h-11 w-full rounded-lg border border-line bg-paper px-3.5 text-base text-ink placeholder:text-ink/40 transition-colors focus:border-forest focus:outline-none ${focusRing}`;
const labelCls = "mb-1.5 block text-sm font-semibold text-ink";
const errorCls = "mt-1.5 text-sm font-semibold text-ink";

export function IntegrationRequestForm({ onSuccess, isPage = false }: IntegrationRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    toolName: "",
    website: "",
    category: "",
    useCase: "",
  });

  const setField =
    (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      const nextErrors: Partial<Record<keyof FormData, string>> = {};
      Array.from(form.elements).forEach((el) => {
        if (
          (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) &&
          el.name &&
          !el.checkValidity()
        ) {
          nextErrors[el.name as keyof FormData] = messageFor(el);
        }
      });
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000").replace(/\/+$/, "");
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
      toast.error("Something went wrong.", {
        description: "Please try again later or contact support.",
      });
    }
  };

  return (
    <div
      className={`flex flex-col overflow-hidden border border-line md:min-h-[560px] md:flex-row ${
        isPage ? "mx-auto max-w-[900px] rounded-2xl" : ""
      }`}
    >
      <aside className="flex shrink-0 flex-col gap-5 border-b border-line bg-mint-soft p-6 md:w-[280px] md:border-b-0 md:border-r md:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
            <Image src="/images/green.svg" alt="" width={22} height={22} aria-hidden="true" />
          </div>
          <p className="text-sm font-semibold text-ink">VaakuOS integrations</p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold tracking-[-0.01em] text-ink">Request an integration</h2>
          <p className="mt-2 hidden text-sm leading-6 text-ink/70 md:block">
            Tell us which tool you want to connect. We&rsquo;ll scope it and
            get back to you with a path to go live.
          </p>
        </div>

        <ul className="space-y-3 text-sm text-ink/80">
          {perks.map((perk) => (
            <li key={perk} className="border-t border-ink/10 pt-3 first:border-t-0 first:pt-0">
              {perk}
            </li>
          ))}
        </ul>

        <p className="mt-auto text-sm font-semibold text-forest">We respond within one business day.</p>
      </aside>

      <div className="flex flex-1 flex-col bg-paper">
        {submitted ? (
          <SuccessState toolName={formData.toolName} isPage={isPage} onDone={onSuccess} />
        ) : (
          <form noValidate onSubmit={handleSubmit} className="flex flex-1 flex-col">
            <div className="border-b border-line px-6 py-5 md:px-8">
              <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-ink">Tell us what to connect</h3>
              <p className="text-sm text-ink/65">The more detail you share, the faster we can scope it.</p>
            </div>

            <div className="flex-1 space-y-5 p-6 md:p-8">
              <div>
                <label htmlFor="ir-name" className={labelCls}>
                  Full name
                </label>
                <input
                  id="ir-name"
                  name="name"
                  placeholder="Jane Doe"
                  required
                  className={inputCls}
                  value={formData.name}
                  onChange={setField("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "ir-name-error" : undefined}
                />
                {errors.name && (
                  <p id="ir-name-error" className={errorCls}>
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ir-email" className={labelCls}>
                    Work email
                  </label>
                  <input
                    id="ir-email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    required
                    className={inputCls}
                    value={formData.email}
                    onChange={setField("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "ir-email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="ir-email-error" className={errorCls}>
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="ir-company" className={labelCls}>
                    Company or store
                  </label>
                  <input
                    id="ir-company"
                    name="company"
                    placeholder="Acme Co"
                    className={inputCls}
                    value={formData.company}
                    onChange={setField("company")}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ir-tool" className={labelCls}>
                    Tool or app to integrate
                  </label>
                  <input
                    id="ir-tool"
                    name="toolName"
                    placeholder="e.g. Gorgias, Klaviyo"
                    required
                    className={inputCls}
                    value={formData.toolName}
                    onChange={setField("toolName")}
                    aria-invalid={Boolean(errors.toolName)}
                    aria-describedby={errors.toolName ? "ir-tool-error" : undefined}
                  />
                  {errors.toolName && (
                    <p id="ir-tool-error" className={errorCls}>
                      {errors.toolName}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="ir-website" className={labelCls}>
                    Tool website
                  </label>
                  <input
                    id="ir-website"
                    name="website"
                    type="url"
                    placeholder="https://"
                    className={inputCls}
                    value={formData.website}
                    onChange={setField("website")}
                    aria-invalid={Boolean(errors.website)}
                    aria-describedby={errors.website ? "ir-website-error" : undefined}
                  />
                  {errors.website && (
                    <p id="ir-website-error" className={errorCls}>
                      {errors.website}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="ir-category" className={labelCls}>
                  Category
                </label>
                <div className="relative">
                  <select
                    id="ir-category"
                    name="category"
                    required
                    className={`${inputCls} appearance-none pr-10`}
                    value={formData.category}
                    onChange={setField("category")}
                    aria-invalid={Boolean(errors.category)}
                    aria-describedby={errors.category ? "ir-category-error" : undefined}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50"
                  />
                </div>
                {errors.category && (
                  <p id="ir-category-error" className={errorCls}>
                    {errors.category}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="ir-usecase" className={labelCls}>
                  What&rsquo;s your use case?
                </label>
                <textarea
                  id="ir-usecase"
                  name="useCase"
                  placeholder="Which data should sync, and what should it trigger?"
                  className={`${inputCls} h-24 resize-none py-3`}
                  value={formData.useCase}
                  onChange={setField("useCase")}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex h-12 w-full items-center justify-center rounded-full bg-forest px-8 text-base font-semibold text-paper transition-colors hover:bg-ink disabled:opacity-60 ${focusRing}`}
              >
                {isSubmitting ? "Submitting…" : "Submit request"}
              </button>
            </div>

            <div className="mt-auto border-t border-line px-6 py-4 text-sm text-ink/65 md:px-8">
              No commitment. We respond within one business day.
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

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
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-mint-soft">
        <Check className="h-8 w-8 text-forest" aria-hidden="true" />
      </div>
      <h3 className="font-display text-2xl font-bold tracking-[-0.01em] text-ink">Request received</h3>
      <p className="mt-3 max-w-sm leading-relaxed text-ink/70">
        Thanks for flagging {toolName ? <strong>{toolName}</strong> : "this"}.
        We&rsquo;ll review it and let you know if it makes our roadmap.
      </p>
      {isPage ? (
        <Link
          href="/integrations"
          className={`mt-8 text-base font-semibold text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest ${focusRing}`}
        >
          Browse integrations
        </Link>
      ) : (
        <button
          type="button"
          onClick={onDone}
          className={`mt-8 inline-flex h-11 items-center rounded-full bg-forest px-6 text-sm font-semibold text-paper hover:bg-ink ${focusRing}`}
        >
          Done
        </button>
      )}
    </div>
  );
}
