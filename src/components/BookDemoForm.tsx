"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Loader2,
  Calendar as CalendarIcon,
  ChevronLeft,
  Clock,
  Video,
  Globe,
  Check,
} from "lucide-react";
import Link from "next/link";
import { addDays, format } from "date-fns";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:30 AM",
  "01:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
];

interface BookDemoFormProps {
  onSuccess?: () => void;
  isPage?: boolean;
}

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

const inputCls = (hasError: boolean) =>
  cn(
    "h-11 rounded-lg border bg-white px-3.5 text-base text-ink placeholder:text-ink/40 md:text-sm",
    "focus-visible:ring-0 focus-visible:ring-offset-0",
    focusRing,
    hasError ? "border-error" : "border-line",
  );

const labelCls = "mb-1.5 block text-sm font-medium text-ink";

type StepOneField = "firstName" | "lastName" | "email";

function fieldMessage(field: StepOneField, validity: ValidityState) {
  if (validity.valueMissing) {
    return {
      firstName: "Enter your first name.",
      lastName: "Enter your last name.",
      email: "Enter your business email.",
    }[field];
  }
  if (validity.typeMismatch && field === "email") return "Enter a valid email, like you@company.com.";
  return "Check this field and try again.";
}

export const BookDemoForm = ({ onSuccess, isPage = false }: BookDemoFormProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    addDays(new Date(), 1),
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    volume: "",
  });
  const [errors, setErrors] = useState<Partial<Record<StepOneField, string>>>({});

  function handleInvalid(field: StepOneField) {
    return (e: React.InvalidEvent<HTMLInputElement>) => {
      e.preventDefault();
      setErrors((prev) => ({ ...prev, [field]: fieldMessage(field, e.currentTarget.validity) }));
    };
  }

  function clearError(field: StepOneField) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setIsSubmitting(true);
    try {
      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000").replace(/\/+$/, "");
      const response = await fetch(`${baseUrl}/demo-bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          date: selectedDate,
          time: selectedTime,
        }),
      });

      if (!response.ok) throw new Error("Failed to book demo");

      toast.success("Walkthrough booked", {
        description: `Confirming for ${format(selectedDate!, "PPP")} at ${selectedTime}.`,
      });
      setIsSubmitting(false);
      setSubmitted(true);
    } catch {
      setIsSubmitting(false);
      toast.error("That didn't go through.", {
        description: "Try again, or email info@vaakuos.com and we'll set it up directly.",
      });
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden md:min-h-[540px] md:flex-row",
        isPage &&
          "mx-auto max-w-[900px] rounded-3xl border border-line bg-white shadow-[0_1px_0_rgb(var(--ink)/0.06),0_28px_56px_-28px_rgb(var(--ink)/0.3)]",
      )}
    >
      {/* ── Meeting summary panel ── */}
      <aside className="relative flex shrink-0 flex-col gap-4 border-b border-line bg-mint-soft/40 p-5 md:w-[300px] md:gap-6 md:border-b-0 md:border-r md:p-7">
        {/* Host */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest text-base font-bold tracking-tight text-paper md:h-11 md:w-11">
            V
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-ink">VaakuOS team</p>
            <p className="text-xs text-ink/65">Product specialist</p>
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg font-bold leading-snug tracking-[-0.01em] text-ink md:text-xl">
            Product walkthrough
          </h2>
          <p className="mt-1.5 hidden text-sm leading-relaxed text-ink/70 md:block">
            A call about the channels your customers use and the follow-ups you want to
            automate — WhatsApp, email, Instagram or Messenger.
          </p>
        </div>

        {/* Meeting meta — wraps inline on mobile, stacks on desktop */}
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-ink md:flex-col md:gap-3">
          <li className="flex items-center gap-2 md:gap-3">
            <Clock className="h-4 w-4 shrink-0 text-ink/50" aria-hidden="true" />
            <span>15 min</span>
          </li>
          <li className="flex items-center gap-2 md:gap-3">
            <Video className="h-4 w-4 shrink-0 text-ink/50" aria-hidden="true" />
            <span>Google Meet</span>
          </li>
          <li className="flex items-center gap-2 md:gap-3">
            <Globe className="h-4 w-4 shrink-0 text-ink/50" aria-hidden="true" />
            <span className="md:inline">
              <span className="md:hidden">IST</span>
              <span className="hidden md:inline">India Standard Time</span>
            </span>
          </li>
        </ul>

        <div className="hidden md:mt-auto md:block">
          <p className="text-sm font-semibold text-ink">What we&apos;ll cover</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-ink/70">
            <li>The channels your customers use, and who replies today.</li>
            <li>The first follow-up worth automating for your business.</li>
            <li>What your message volumes cost on Meta&apos;s rates.</li>
          </ul>
        </div>

        {/* Live selection */}
        {step === 2 && (selectedDate || selectedTime) && (
          <div className="rounded-xl border border-forest/20 bg-white p-3.5 md:mt-auto">
            <p className="mb-1 text-sm font-semibold text-forest">Your slot</p>
            <p className="flex items-center gap-2 text-sm font-medium text-ink">
              <CalendarIcon className="h-4 w-4 text-forest" aria-hidden="true" />
              {selectedDate ? format(selectedDate, "EEE, MMM d") : "Pick a date"}
              {selectedTime ? <span>at {selectedTime}</span> : <span className="text-ink/65">— pick a time</span>}
            </p>
          </div>
        )}
      </aside>

      {/* ── Interaction panel ── */}
      <div className="relative flex flex-1 flex-col bg-white">
        {submitted ? (
          <SuccessState
            date={selectedDate}
            time={selectedTime}
            isPage={isPage}
            onDone={onSuccess}
          />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
            {/* Step header */}
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-7">
              <div className="flex items-center gap-2.5">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    aria-label="Back to your details"
                    className={cn(
                      "-ml-1.5 flex h-8 w-8 items-center justify-center rounded-lg text-ink/60 transition-colors hover:bg-mint-soft hover:text-ink",
                      focusRing,
                    )}
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
                <div>
                  <h3 className="font-display text-base font-bold tracking-[-0.01em] text-ink">
                    {step === 1 ? "Tell us about your business" : "Pick a date & time"}
                  </h3>
                  <p className="text-xs text-ink/65">
                    {step === 1
                      ? "We'll tailor the walkthrough to your team."
                      : "Choose a slot that works for you."}
                  </p>
                </div>
              </div>
              <p className="shrink-0 text-sm font-semibold text-ink/65">Step {step} of 2</p>
            </div>

            <div className="flex-1 p-5 md:p-7">
              {step === 1 ? (
                <div className="space-y-5 text-left">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className={labelCls}>
                        First name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        className={inputCls(!!errors.firstName)}
                        value={formData.firstName}
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? "firstName-error" : undefined}
                        onInvalid={handleInvalid("firstName")}
                        onChange={(e) => {
                          setFormData({ ...formData, firstName: e.target.value });
                          clearError("firstName");
                        }}
                      />
                      {errors.firstName && (
                        <p id="firstName-error" role="alert" className="mt-1.5 text-sm text-error">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className={labelCls}>
                        Last name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        className={inputCls(!!errors.lastName)}
                        value={formData.lastName}
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? "lastName-error" : undefined}
                        onInvalid={handleInvalid("lastName")}
                        onChange={(e) => {
                          setFormData({ ...formData, lastName: e.target.value });
                          clearError("lastName");
                        }}
                      />
                      {errors.lastName && (
                        <p id="lastName-error" role="alert" className="mt-1.5 text-sm text-error">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className={labelCls}>
                      Business email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@yourbusiness.com"
                      required
                      className={inputCls(!!errors.email)}
                      value={formData.email}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      onInvalid={handleInvalid("email")}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        clearError("email");
                      }}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="mt-1.5 text-sm text-error">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="volume" className={labelCls}>
                      Customers you message a month
                    </Label>
                    <Select
                      required
                      value={formData.volume}
                      onValueChange={(value) =>
                        setFormData({ ...formData, volume: value })
                      }
                    >
                      <SelectTrigger
                        id="volume"
                        className={cn(
                          "h-11 rounded-lg border-line bg-white text-ink",
                          "focus:ring-0 focus:ring-offset-0",
                          focusRing,
                        )}
                      >
                        <SelectValue placeholder="Pick a range" />
                      </SelectTrigger>
                      <SelectContent className="border-line bg-white text-ink">
                        <SelectItem value="0-500" className="focus:bg-mint-soft focus:text-ink">
                          Up to 500
                        </SelectItem>
                        <SelectItem value="500-2000" className="focus:bg-mint-soft focus:text-ink">
                          500 to 2,000
                        </SelectItem>
                        <SelectItem value="2000-5000" className="focus:bg-mint-soft focus:text-ink">
                          2,000 to 5,000
                        </SelectItem>
                        <SelectItem value="5000+" className="focus:bg-mint-soft focus:text-ink">
                          More than 5,000
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className={cn(
                      "h-12 w-full rounded-full bg-forest text-base font-semibold text-paper shadow-none hover:bg-ink",
                      focusRing,
                    )}
                  >
                    Continue to scheduling
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-6 text-left lg:flex-row">
                  <div className="flex justify-center lg:justify-start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={{ before: new Date() }}
                      className="rounded-xl border border-line bg-white"
                      classNames={{
                        caption_label: "text-sm font-semibold tracking-tight text-ink",
                        nav_button:
                          "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white text-ink/60 transition-colors hover:bg-mint-soft hover:text-ink disabled:pointer-events-none disabled:opacity-30",
                        head_cell: "w-9 text-xs font-semibold text-ink/60",
                        day: "inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium text-ink transition-colors hover:bg-mint-soft aria-selected:opacity-100",
                        day_selected:
                          "bg-forest font-semibold text-paper shadow-sm hover:bg-forest hover:text-paper focus:bg-forest focus:text-paper",
                        day_today: "font-bold text-forest after:bg-forest aria-selected:after:bg-paper",
                        day_outside: "text-ink/30",
                        day_disabled: "text-ink/25 hover:bg-transparent",
                      }}
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <Label className="mb-2.5 block text-sm font-medium text-ink">
                      {selectedDate ? format(selectedDate, "EEEE, MMM d") : "Select a date"}
                    </Label>
                    <div className="grid max-h-[230px] grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-2">
                      {timeSlots.map((time) => {
                        const active = selectedTime === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={cn(
                              "h-10 rounded-lg border text-sm font-semibold transition-colors",
                              focusRing,
                              active
                                ? "border-forest bg-forest text-paper"
                                : "border-line bg-white text-ink hover:border-forest/40 hover:bg-mint-soft/50",
                            )}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>

                    <Button
                      type="submit"
                      className={cn(
                        "mt-5 h-12 w-full rounded-full bg-forest text-base font-semibold text-paper shadow-none hover:bg-ink lg:mt-auto",
                        focusRing,
                      )}
                      disabled={isSubmitting || !selectedTime || !selectedDate}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                          Booking…
                        </>
                      ) : (
                        "Book my walkthrough"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-auto flex items-center gap-1.5 border-t border-line px-5 py-3.5 text-xs text-ink/65 md:px-7">
              <Check className="h-3.5 w-3.5 shrink-0 text-forest" aria-hidden="true" />
              You&apos;ll get a Google Meet invite by email as soon as you book.
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

function SuccessState({
  date,
  time,
  isPage,
  onDone,
}: {
  date?: Date;
  time: string | null;
  isPage: boolean;
  onDone?: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-mint-soft">
        <Check className="h-10 w-10 text-forest" aria-hidden="true" />
      </div>
      <h3 className="mb-3 font-display text-2xl font-bold tracking-[-0.02em] text-ink">You&apos;re booked.</h3>
      <p className="mb-2 max-w-sm leading-relaxed text-ink/70">
        We&apos;ve emailed you a Google Meet invite. Bring the channels you use
        today and we&apos;ll map your first follow-up together.
      </p>
      {date && time && (
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink">
          <CalendarIcon className="h-4 w-4 text-forest" aria-hidden="true" />
          {format(date, "PPP")} at {time}
        </div>
      )}
      {isPage ? (
        <Link
          href="/"
          className="text-base font-semibold text-forest underline decoration-forest/30 underline-offset-4 transition-colors hover:decoration-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          Back to home
        </Link>
      ) : (
        <Button
          onClick={onDone}
          className="h-11 rounded-full bg-forest px-6 text-paper shadow-none hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          Done
        </Button>
      )}
    </div>
  );
}
