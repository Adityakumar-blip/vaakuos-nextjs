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
  ArrowRight,
  ChevronLeft,
  Clock,
  Video,
  Globe,
  CheckCircle2,
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

const inputCls =
  "h-11 rounded-lg border-input bg-background px-3.5 text-sm transition-colors placeholder:text-muted-foreground/50 focus-visible:ring-2 focus-visible:ring-primary/25 focus-visible:ring-offset-0 focus-visible:border-primary/50";

const labelCls = "mb-1.5 block text-sm font-medium text-foreground";

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

      toast.success("Demo Scheduled!", {
        description: `Confirming for ${format(selectedDate!, "PPP")} at ${selectedTime}.`,
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
        "flex flex-col overflow-hidden md:min-h-[540px] md:flex-row",
        isPage &&
          "mx-auto max-w-[900px] rounded-2xl border border-border bg-card shadow-xl shadow-foreground/[0.04]",
      )}
    >
      {/* ── Meeting summary panel ── */}
      <aside className="relative flex shrink-0 flex-col gap-4 border-b border-border bg-muted/40 p-5 md:w-[300px] md:gap-6 md:border-b-0 md:border-r md:p-7">
        {/* Host */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-base font-bold tracking-tight text-primary-foreground shadow-sm md:h-11 md:w-11">
            V
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">VaakuOS Team</p>
            <p className="text-xs text-muted-foreground">Product Specialist</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground md:text-xl">
            Product Walkthrough
          </h2>
          <p className="mt-1.5 hidden text-sm leading-relaxed text-muted-foreground md:block">
            A focused session showing how VaakuOS recovers abandoned revenue for
            your store.
          </p>
        </div>

        {/* Meeting meta — wraps inline on mobile, stacks on desktop */}
        <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-foreground md:flex-col md:gap-3">
          <li className="flex items-center gap-2 md:gap-3">
            <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span>15 min</span>
          </li>
          <li className="flex items-center gap-2 md:gap-3">
            <Video className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span>Google Meet</span>
          </li>
          <li className="flex items-center gap-2 md:gap-3">
            <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="md:inline">
              <span className="md:hidden">IST</span>
              <span className="hidden md:inline">India Standard Time</span>
            </span>
          </li>
        </ul>

        {/* Live selection */}
        {(selectedDate || selectedTime) && (
          <div className="rounded-xl border border-primary/20 bg-primary/[0.06] p-3.5 md:mt-auto">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
              Your selection
            </p>
            <p className="flex items-center gap-2 text-sm font-medium text-foreground">
              <CalendarIcon className="h-4 w-4 text-primary" />
              {selectedDate ? format(selectedDate, "EEE, MMM d") : "Pick a date"}
              {selectedTime && (
                <>
                  <span className="text-muted-foreground/50">·</span>
                  {selectedTime}
                </>
              )}
            </p>
          </div>
        )}
      </aside>

      {/* ── Interaction panel ── */}
      <div className="relative flex flex-1 flex-col bg-card">
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
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 md:px-7">
              <div className="flex items-center gap-2.5">
                {step === 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="-ml-1.5 h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
                    onClick={() => setStep(1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {step === 1 ? "Tell us about your brand" : "Pick a date & time"}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {step === 1
                      ? "We'll tailor the demo to your scale."
                      : "Choose a slot that works for you."}
                  </p>
                </div>
              </div>
              {/* Step pips */}
              <div className="flex shrink-0 items-center gap-1.5">
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    step >= 1 ? "w-5 bg-primary" : "w-3 bg-border",
                  )}
                />
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    step >= 2 ? "w-5 bg-primary" : "w-3 bg-border",
                  )}
                />
              </div>
            </div>

            <div className="flex-1 p-5 md:p-7">
              {step === 1 ? (
                <div className="space-y-5 text-left">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className={labelCls}>
                        First name <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        required
                        className={inputCls}
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className={labelCls}>
                        Last name <span className="text-accent">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        required
                        className={inputCls}
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className={labelCls}>
                      Business email <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="email"
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
                    <Label htmlFor="volume" className={labelCls}>
                      Monthly orders <span className="text-accent">*</span>
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
                        className="h-11 rounded-lg border-input focus:ring-2 focus:ring-primary/25 focus:ring-offset-0"
                      >
                        <SelectValue placeholder="Select order volume" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-500">0 – 500 orders/mo</SelectItem>
                        <SelectItem value="500-2000">500 – 2,000 orders/mo</SelectItem>
                        <SelectItem value="2000-5000">2,000 – 5,000 orders/mo</SelectItem>
                        <SelectItem value="5000+">5,000+ orders/mo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="group h-12 w-full rounded-lg text-sm font-semibold shadow-lg shadow-primary/15"
                  >
                    Continue to scheduling
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
                      className="rounded-xl border border-border bg-background shadow-sm"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <Label className="mb-2.5 block text-sm font-medium text-foreground">
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
                              "h-10 rounded-lg border text-sm font-semibold transition-all",
                              active
                                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                : "border-input bg-background text-foreground hover:border-primary/40 hover:bg-muted",
                            )}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="group mt-5 h-12 w-full rounded-lg text-sm font-semibold shadow-lg shadow-primary/15 lg:mt-auto"
                      disabled={isSubmitting || !selectedTime || !selectedDate}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Scheduling…
                        </>
                      ) : (
                        <>
                          Confirm booking
                          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-auto flex items-center gap-1.5 border-t border-border px-5 py-3.5 text-xs text-muted-foreground md:px-7">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-success" />
              No credit card required · We respond within one business day.
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
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10 ring-8 ring-success/5">
        <Check className="h-10 w-10 text-success" />
      </div>
      <h3 className="mb-3 text-2xl font-semibold tracking-tight">You&apos;re booked!</h3>
      <p className="mb-2 max-w-sm leading-relaxed text-muted-foreground">
        We&apos;ve sent a Google Meet invite and confirmation to your inbox.
      </p>
      {date && time && (
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground">
          <CalendarIcon className="h-4 w-4 text-primary" />
          {format(date, "PPP")} · {time}
        </div>
      )}
      {isPage ? (
        <Button variant="outline" className="rounded-lg" asChild>
          <Link href="/">← Back to home</Link>
        </Button>
      ) : (
        <Button className="rounded-lg" onClick={onDone}>
          Done
        </Button>
      )}
    </div>
  );
}
