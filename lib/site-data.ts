export type Workshop = {
  number: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  audience: string;
  outcomes: string[];
  format: string;
  tone: "coral" | "lime" | "gold" | "blue" | "rose" | "cream";
};

export const workshops: Workshop[] = [
  {
    number: "01",
    slug: "rapid-creative",
    title: "Rapid Creative",
    subtitle: "Techniques for quick idea generation",
    summary:
      "A lively, practical session for moving past the blank page and producing more useful ideas under real-world pressure.",
    audience: "Creative, brand, communications, and innovation teams",
    outcomes: ["Faster ideation", "Productive constraints", "Ideas worth testing"],
    format: "Keynote, 1-hour talk, or 4-16 hour workshop",
    tone: "coral",
  },
  {
    number: "02",
    slug: "leading-with-meaning",
    title: "Leading with Meaning",
    subtitle: "Leadership that inspires with vision and purpose",
    summary:
      "A human approach to leadership that helps people connect daily decisions to a shared and believable sense of purpose.",
    audience: "Leaders, managers, founders, and emerging leaders",
    outcomes: ["Clearer direction", "Purpose-led choices", "More inspired teams"],
    format: "Keynote, 1-hour talk, or tailored leadership workshop",
    tone: "lime",
  },
  {
    number: "03",
    slug: "show-and-tell-level-up",
    title: "Show and Tell Level Up",
    subtitle: "Presentations that connect and persuade",
    summary:
      "A sharper way to shape, simplify, and deliver presentations so an audience can follow the thinking and feel the point.",
    audience: "Presenters, strategists, account teams, educators, and leaders",
    outcomes: ["Stronger story flow", "Clearer delivery", "More persuasive ideas"],
    format: "1-hour talk or hands-on presentation workshop",
    tone: "gold",
  },
  {
    number: "04",
    slug: "team-one",
    title: "Team One",
    subtitle: "The culture of cohesion and inspiration",
    summary:
      "A workshop about the habits, language, and shared standards that turn a collection of talented people into one team.",
    audience: "Cross-functional teams, departments, and organizations in transition",
    outcomes: ["Shared ownership", "Better collaboration", "Healthier team culture"],
    format: "Talk, team session, or extended culture workshop",
    tone: "blue",
  },
  {
    number: "05",
    slug: "max-mode",
    title: "Max Mode",
    subtitle: "Breaking your own records",
    summary:
      "An energizing reflection on growth, self-belief, and the practical discipline of stretching beyond yesterday's best.",
    audience: "Organizations, schools, sales teams, and high-potential groups",
    outcomes: ["Fresh motivation", "Personal momentum", "A growth-minded practice"],
    format: "Keynote, motivational talk, or interactive session",
    tone: "rose",
  },
  {
    number: "06",
    slug: "captivate",
    title: "Captivate",
    subtitle: "Communication, persuasion, and infatuation",
    summary:
      "A creative look at why some messages hold attention, earn trust, and stay with people long after the moment has passed.",
    audience: "Brand, marketing, creative, sales, and communications teams",
    outcomes: ["More magnetic messages", "Human-centered persuasion", "Memorable delivery"],
    format: "Keynote, 1-hour talk, or communications workshop",
    tone: "cream",
  },
];

export type JournalPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  lead: string;
  paragraphs: string[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: "the-brief-is-a-door",
    title: "The Brief Is a Door, Not a Wall",
    category: "Creative Practice",
    date: "July 12, 2026",
    readTime: "5 min read",
    excerpt:
      "A brief gives an idea somewhere to begin. The best ones leave enough air for surprise to enter.",
    lead:
      "The first job of a creative person is not to decorate the brief. It is to discover the human question hiding inside it.",
    paragraphs: [
      "A useful brief creates focus without shrinking possibility. It tells us what must be true, who must care, and why the work matters now. Everything else is room to explore.",
      "When a team gets stuck, the answer is rarely to add more words. It is often to return to the simplest version of the problem and ask a better question about the person on the other side.",
      "Constraints can be generous. They stop us from wandering and give imagination something solid to push against. The trick is to treat the boundary as a beginning, not a verdict.",
    ],
  },
  {
    slug: "after-the-deck-closes",
    title: "What Teams Remember After the Deck Closes",
    category: "Leadership",
    date: "July 5, 2026",
    readTime: "4 min read",
    excerpt:
      "People may forget the slide. They remember whether the room made them feel capable of doing the work together.",
    lead:
      "A presentation can transfer information. A meaningful conversation can transfer belief.",
    paragraphs: [
      "Leaders often prepare for the moment they speak and overlook the moment after. That is when people decide whether the message belongs to them or remains only a line on a slide.",
      "Clarity helps. So does honesty. Teams respond when the direction is specific enough to act on and open enough for them to contribute their own intelligence.",
      "The best leadership communication does not end in applause. It ends with people knowing what they can do next, why it matters, and who will stand beside them while they do it.",
    ],
  },
  {
    slug: "make-things-that-matter",
    title: "A Small Note on Making Things That Matter",
    category: "Creative Life",
    date: "June 28, 2026",
    readTime: "3 min read",
    excerpt:
      "Craft asks for attention. Meaning asks that we place that attention somewhere worthy.",
    lead:
      "Not every idea needs to be loud. Some of the strongest work simply sees people clearly.",
    paragraphs: [
      "It is easy to confuse novelty with imagination. Novelty asks whether something has been seen before. Imagination asks whether something helps us see differently now.",
      "The work becomes meaningful when craft and care meet. One gives the idea shape. The other gives it a reason to exist in someone else's life.",
      "Make the thing well. But before that, decide what it is for. That small decision can change every choice that follows.",
    ],
  },
];

export const bookingEmail = "hello@robertlabayen.com";
