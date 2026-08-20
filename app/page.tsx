import type { Metadata } from "next";
import { journalPosts, workshops } from "../lib/site-data";

export const metadata: Metadata = {
  title: "Creative Workshops That Move People",
  description:
    "Meet Robert Labayen, a Philippine creative leader, artist, and speaker helping teams create, communicate, and lead with meaning.",
};

const outcomes = [
  "Braver creative thinking",
  "Clearer communication",
  "More meaningful leadership",
  "Stronger team culture",
  "Ideas people remember",
];

export default function Home() {
  return (
    <main>
      <section className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow">Robert Labayen / Creative leader + artist</p>
          <h1>
            Make room for <em>better</em> ideas.
          </h1>
          <p className="hero-intro">
            Talks and workshops that help people think braver, lead with meaning,
            and communicate so good ideas can move.
          </p>
          <div className="button-row">
            <a className="button button-dark" href="/contact">
              Book a workshop
            </a>
            <a className="text-link" href="/talks">
              Explore the talks <span>+</span>
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Portrait of Robert Labayen">
          <span className="hero-orbit hero-orbit-one" />
          <span className="hero-orbit hero-orbit-two" />
          <img src="/images/robert/hero.png" alt="Robert Labayen in a rose blazer, looking ahead" />
          <p className="image-caption">Creative mind / Human point of view</p>
        </div>
      </section>

      <section className="role-strip" aria-label="Robert Labayen's creative roles">
        <span>Creative leader</span>
        <span>Speaker</span>
        <span>Artist</span>
        <span>Songwriter</span>
        <span>Painter</span>
      </section>

      <section className="intro-grid section-shell section-pad">
        <div className="intro-statement">
          <p className="eyebrow">A lifetime of creative practice</p>
          <h2>A seasoned creative mind, still deeply curious.</h2>
        </div>
        <div className="intro-body">
          <p>
            Robert Labayen has built a life around ideas: shaping brands, leading
            creative people, writing songs, making art, and helping audiences see
            familiar problems with fresh eyes.
          </p>
          <p>
            His sessions bring that range into the room. They are thoughtful,
            practical, warm, and made for people who want their work to mean more.
          </p>
          <a className="text-link" href="/about">
            Meet Robert <span>+</span>
          </a>
        </div>
        <div className="intro-portrait image-stage image-stage-blue">
          <img src="/images/robert/portrait-close.png" alt="Close portrait of Robert Labayen" />
        </div>
      </section>

      <section className="talks-preview section-pad">
        <div className="section-heading section-shell">
          <div>
            <p className="eyebrow">Signature talks + workshops</p>
            <h2>Six ways to move a room forward.</h2>
          </div>
          <p>
            Choose a keynote, a focused one-hour talk, or a deeper workshop shaped
            around your team and its real challenges.
          </p>
        </div>

        <div className="workshop-grid section-shell">
          {workshops.map((workshop) => (
            <a
              className={`workshop-card card-${workshop.tone}`}
              href={`/talks#${workshop.slug}`}
              key={workshop.slug}
            >
              <span className="card-number">{workshop.number}</span>
              <div>
                <h3>{workshop.title}</h3>
                <p>{workshop.subtitle}</p>
              </div>
              <span className="card-plus">+</span>
            </a>
          ))}
        </div>
      </section>

      <section className="practice-section section-shell section-pad">
        <div className="practice-image image-stage image-stage-lime">
          <img
            src="/images/robert/speaking-open.png"
            alt="Robert Labayen speaking with open hands"
          />
          <span className="practice-label">Ideas become useful when people can act on them.</span>
        </div>
        <div className="practice-copy">
          <p className="eyebrow">Inside every session</p>
          <h2>Inspiration with somewhere to go.</h2>
          <p>
            Robert pairs stories and creative perspective with tools people can
            bring back to the next brief, meeting, presentation, or hard decision.
          </p>
          <ul className="outcome-list">
            {outcomes.map((outcome, index) => (
              <li key={outcome}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="journal-preview section-pad">
        <div className="section-heading section-shell">
          <div>
            <p className="eyebrow">From Robert's journal</p>
            <h2>Notes on ideas, people, and making things matter.</h2>
          </div>
          <a className="text-link" href="/journal">
            Read the journal <span>+</span>
          </a>
        </div>

        <div className="journal-grid section-shell">
          {journalPosts.map((post, index) => (
            <article className={`journal-card journal-card-${index + 1}`} key={post.slug}>
              <div className="journal-meta">
                <span>{post.category}</span>
                <span>{post.date}</span>
              </div>
              <h3>
                <a href={`/journal/${post.slug}`}>{post.title}</a>
              </h3>
              <p>{post.excerpt}</p>
              <a className="card-read" href={`/journal/${post.slug}`}>
                Read note +
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta section-shell">
        <div className="home-cta-copy">
          <p className="eyebrow">Bring Robert into the room</p>
          <h2>What could your team see differently?</h2>
          <p>
            Tell us about the people, the moment, and the shift you want to create.
            We will shape the right session together.
          </p>
          <a className="button button-light" href="/contact">
            Start a conversation
          </a>
        </div>
        <div className="home-cta-image">
          <img src="/images/robert/inviting.png" alt="Robert Labayen extending an inviting hand" />
        </div>
      </section>
    </main>
  );
}
