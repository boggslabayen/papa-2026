"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { button, buttonDark, cn } from "@/lib/styles";
import { createBookingInquiry } from "@/lib/firebase/booking";

export function BookingForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const labelClass =
    "flex flex-col gap-[0.55rem] font-mono text-[0.64rem] font-bold uppercase tracking-[0.04em]";
  const fieldClass =
    "w-full rounded-none border-0 border-b border-ink bg-transparent px-0 py-[0.9rem] font-body text-[0.95rem] normal-case tracking-normal outline-none focus:border-coral focus:shadow-[0_2px_0_#f05f4b]";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    setStatus("submitting");

    try {
      await createBookingInquiry({
        name: String(form.get("name") ?? "").trim(),
        organization: String(form.get("organization") ?? "").trim(),
        email: String(form.get("email") ?? "").trim(),
        eventType: String(form.get("eventType") ?? ""),
        audienceSize: String(form.get("audienceSize") ?? "").trim(),
        preferredDate: String(form.get("preferredDate") ?? ""),
        message: String(form.get("message") ?? "").trim(),
      });

      formElement.reset();
      setStatus("success");
    } catch (error) {
      console.error("Unable to submit booking inquiry", error);
      setStatus("error");
    }
  }

  return (
    <form className="flex flex-col gap-[1.3rem]" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-[1.3rem] max-[560px]:grid-cols-1">
        <label className={labelClass}>
          Your name
          <input
            className={fieldClass}
            name="name"
            type="text"
            autoComplete="name"
            required
          />
        </label>
        <label className={labelClass}>
          Organization
          <input
            className={fieldClass}
            name="organization"
            type="text"
            autoComplete="organization"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-[1.3rem] max-[560px]:grid-cols-1">
        <label className={labelClass}>
          Work email
          <input
            className={fieldClass}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>
        <label className={labelClass}>
          Event type
          <select
            className={fieldClass}
            name="eventType"
            defaultValue="Workshop"
          >
            <option>Workshop</option>
            <option>Keynote talk</option>
            <option>Leadership session</option>
            <option>School or organization event</option>
            <option>Creative consultation</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-[1.3rem] max-[560px]:grid-cols-1">
        <label className={labelClass}>
          Audience size
          <input
            className={fieldClass}
            name="audienceSize"
            type="text"
            placeholder="Around 50 people"
          />
        </label>
        <label className={labelClass}>
          Preferred date
          <input className={fieldClass} name="preferredDate" type="date" />
        </label>
      </div>

      <label className={labelClass}>
        Tell us what you are planning
        <textarea
          className={cn(
            fieldClass,
            "mt-[0.4rem] min-h-[11rem] resize-y border border-ink p-4",
          )}
          name="message"
          rows={6}
          placeholder="Share the goal, audience, location, and what you would love participants to leave with."
          required
        />
      </label>

      <div className="mt-4 flex items-center gap-6 max-[560px]:flex-col max-[560px]:items-start">
        <button
          className={cn(button, buttonDark)}
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting"
            ? "Sending inquiry..."
            : "Send booking inquiry"}
        </button>
        <p
          aria-live="polite"
          className="m-0 max-w-[17rem] text-[0.72rem] text-muted"
        >
          {status === "success" &&
            "Thanks. Your booking inquiry has been sent."}
          {status === "error" &&
            "We could not send your inquiry. Please try again."}
          {(status === "idle" || status === "submitting") &&
            "We will get back to you as soon as possible."}
        </p>
      </div>
    </form>
  );
}
