import type { Metadata } from "next";
import { workshops } from "../../lib/site-data";

export const metadata: Metadata = {
  title: "Talks & Workshops",
  description:
    "Explore Robert Labayen's signature talks and workshops on creativity, leadership, presentations, team culture, motivation, and communication.",
};

export default function TalksPage() {
  return (
    <main>
      <section className="page-hero talks-hero section-shell">
        <div className="page-hero-copy">
          <p className="eyebrow">Talks + workshops</p>
          <h1>A good room leaves with more than applause.</h1>
          <p>
            Robert's sessions are designed to change the conversation after the
            conversation: practical, energizing experiences shaped around your people.
          </p>
          <a className="button button-dark" href="/contact">
            Find the right session
          </a>
        </div>
        <div className="page-hero-image image-stage image-stage-lime">
          <img src="/images/robert/speaking-open.png" alt="Robert Labayen speaking with energy" />
          <p className="image-caption">Keynotes / 1-hour talks / 4-16 hour workshops</p>
        </div>
      </section>

      <section className="sessions-list section-shell section-pad">
        {workshops.map((workshop) => (
          <article className={`session-row session-${workshop.tone}`} id={workshop.slug} key={workshop.slug}>
            <div className="session-number">{workshop.number}</div>
            <div className="session-title">
              <p className="eyebrow">{workshop.subtitle}</p>
              <h2>{workshop.title}</h2>
            </div>
            <div className="session-details">
              <p className="session-summary">{workshop.summary}</p>
              <dl>
                <div>
                  <dt>Best for</dt>
                  <dd>{workshop.audience}</dd>
                </div>
                <div>
                  <dt>Takeaways</dt>
                  <dd>{workshop.outcomes.join(" / ")}</dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <dd>{workshop.format}</dd>
                </div>
              </dl>
              <a className="text-link" href={`/contact?session=${workshop.slug}`}>
                Ask about this session <span>+</span>
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="tailored-section section-shell">
        <div className="tailored-image image-stage image-stage-coral">
          <img src="/images/robert/idea-dice-wide.png" alt="Robert Labayen holding a red idea die" />
        </div>
        <div className="tailored-copy">
          <p className="eyebrow">Built for your context</p>
          <h2>The topic is the start. Your people shape the session.</h2>
          <p>
            Every engagement can be tuned for the audience, industry, timing, and
            challenge. Share what is happening inside the organization and what you
            want people to think, feel, or do differently afterward.
          </p>
          <a className="button button-light" href="/contact">
            Plan your engagement
          </a>
        </div>
      </section>
    </main>
  );
}
