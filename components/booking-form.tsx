"use client";

import { FormEvent, useState } from "react";
import { bookingEmail } from "../lib/site-data";

export function BookingForm() {
  const [prepared, setPrepared] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Booking inquiry from ${form.get("name")}`;
    const body = [
      `Name: ${form.get("name")}`,
      `Organization: ${form.get("organization")}`,
      `Email: ${form.get("email")}`,
      `Event type: ${form.get("eventType")}`,
      `Audience size: ${form.get("audienceSize")}`,
      `Preferred date: ${form.get("preferredDate")}`,
      "",
      "Message:",
      String(form.get("message")),
    ].join("\n");

    setPrepared(true);
    window.location.href = `mailto:${bookingEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          Your name
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          Organization
          <input name="organization" type="text" autoComplete="organization" />
        </label>
      </div>

      <div className="form-row">
        <label>
          Work email
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Event type
          <select name="eventType" defaultValue="Workshop">
            <option>Workshop</option>
            <option>Keynote talk</option>
            <option>Leadership session</option>
            <option>School or organization event</option>
            <option>Creative consultation</option>
          </select>
        </label>
      </div>

      <div className="form-row">
        <label>
          Audience size
          <input name="audienceSize" type="text" placeholder="Around 50 people" />
        </label>
        <label>
          Preferred date
          <input name="preferredDate" type="date" />
        </label>
      </div>

      <label>
        Tell us what you are planning
        <textarea
          name="message"
          rows={6}
          placeholder="Share the goal, audience, location, and what you would love participants to leave with."
          required
        />
      </label>

      <div className="form-submit-row">
        <button className="button button-dark" type="submit">
          Prepare booking email
        </button>
        <p className="form-note">
          {prepared
            ? "Your email app should open with the inquiry ready to send."
            : "This opens your email app with the inquiry ready to send."}
        </p>
      </div>
    </form>
  );
}
