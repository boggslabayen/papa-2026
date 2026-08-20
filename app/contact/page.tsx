import type { Metadata } from "next";
import { BookingForm } from "../../components/booking-form";

export const metadata: Metadata = {
  title: "Book Robert",
  description:
    "Inquire about booking Robert Labayen for a keynote, creative workshop, leadership session, or organization event.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="contact-hero section-shell">
        <div className="contact-hero-copy">
          <p className="eyebrow">Book Robert</p>
          <h1>Tell us about the room you want to move.</h1>
          <p>
            Share the context, the people, and the change you would love to create.
            We will help shape an engagement that fits.
          </p>
        </div>
        <div className="contact-hero-image image-stage image-stage-gold">
          <img src="/images/robert/welcoming-white.png" alt="Robert Labayen welcoming an audience" />
        </div>
      </section>

      <section className="contact-content section-shell section-pad">
        <aside className="contact-aside">
          <p className="eyebrow">A helpful starting point</p>
          <h2>What to include</h2>
          <ul>
            <li>Your audience and its current challenge</li>
            <li>The kind of event or working session</li>
            <li>The date, location, and available time</li>
            <li>What success should feel like afterward</li>
          </ul>
          <div className="contact-note">
            <span>Formats</span>
            <p>Keynotes, one-hour talks, and tailored 4-16 hour workshops.</p>
          </div>
        </aside>
        <div className="contact-form-wrap">
          <BookingForm />
        </div>
      </section>
    </main>
  );
}
