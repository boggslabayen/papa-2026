import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Robert Labayen, a creative leader, artist, speaker, songwriter, and painter from the Philippines.",
};

const roles = [
  ["Creative leader", "Turning strategy, craft, and human insight into work people can feel."],
  ["Speaker", "Making big ideas clear, generous, and useful for the people in the room."],
  ["Artist", "Painting, songwriting, and creative practice that keep curiosity alive."],
  ["Guide", "Helping teams find the courage and language to make their next move."],
];

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero about-hero section-shell">
        <div className="page-hero-copy">
          <p className="eyebrow">About Robert</p>
          <h1>Creativity is a way of paying attention.</h1>
          <p>
            Robert Labayen is a Philippine creative leader, artist, and speaker
            whose work brings together imagination, meaning, and the deeply human
            business of moving people.
          </p>
        </div>
        <div className="page-hero-image image-stage image-stage-rose">
          <img src="/images/robert/portrait-white.png" alt="Robert Labayen in a light blazer" />
          <p className="image-caption">Creative leadership / Art / A life in ideas</p>
        </div>
      </section>

      <section className="story-section section-shell section-pad">
        <p className="eyebrow">The through line</p>
        <div className="story-grid">
          <h2>Make the idea clear. Make the work matter. Bring people with you.</h2>
          <div className="prose-stack">
            <p>
              Robert has established himself in the Philippine advertising and
              creative industry by working where vision meets execution: shaping
              ideas, leading creative teams, and turning communication into something
              people can understand and remember.
            </p>
            <p>
              Beyond the boardroom and the brief, he writes songs and paints. Those
              practices are not side notes. They are part of the same curiosity about
              emotion, form, rhythm, and what makes an idea stay with us.
            </p>
            <p>
              Today, Robert brings that perspective to talks and workshops for teams,
              leaders, schools, and organizations. He does not arrive with a generic
              formula. He listens for what the room needs and builds from there.
            </p>
          </div>
        </div>
      </section>

      <section className="roles-section section-pad">
        <div className="section-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">One person, many practices</p>
              <h2>A wider creative life makes for a richer room.</h2>
            </div>
          </div>
          <div className="roles-grid">
            {roles.map(([title, copy], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-visual-break section-shell">
        <div className="about-visual-copy">
          <p className="eyebrow">Robert in the room</p>
          <h2>Warmth without fluff. Energy without noise.</h2>
          <p>
            The best session is not a performance delivered at people. It is an
            encounter that gives them new language, fresh confidence, and something
            useful to do next.
          </p>
          <a className="button button-dark" href="/talks">
            Explore the sessions
          </a>
        </div>
        <div className="about-visual-image image-stage image-stage-gold">
          <img src="/images/robert/composed.png" alt="Robert Labayen standing thoughtfully" />
        </div>
      </section>
    </main>
  );
}
