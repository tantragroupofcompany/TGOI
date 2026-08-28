/**
 * TGOI — Leadership public data (Phase 2).
 *
 * Detailed leadership profiles for the /leadership page. All names, photos,
 * and narrative text below are clearly-identified placeholders to be replaced
 * with verified information before public launch. Nothing here invents
 * factual claims about real individuals.
 *
 * This structure is designed to migrate cleanly to a database in Phases 4–5
 * and to support unlimited future leadership members.
 */

export type LeaderProfile = {
  /** Stable identifier used for anchors and as a DB primary key later. */
  id: string;
  /** Short role label shown on the profile (e.g. "FOUNDER"). */
  role: string;
  /** Placeholder full name. */
  name: string;
  /** Path to a published photo, or null to render the placeholder art. */
  photo: string | null;
  /** Accessible description of the photo / placeholder. */
  photoAlt: string;
  /** Professional biography. */
  biography: string;
  /** Heading for the profile's personal insight (varies by role). */
  insightHeading: string;
  /** The personal insight / vision / philosophy / strategy statement. */
  insightStatement: string;
  /** Heading for the leader's message. */
  messageHeading: string;
  /** The leader's message text. */
  message: string;
};

export const founder: LeaderProfile = {
  id: "founder",
  role: "FOUNDER",
  name: "[ Founder Full Name ]",
  photo: null,
  photoAlt:
    "Professional photo of the Founder of Tantra Group of Industries (placeholder)",
  biography:
    "As the Founder of Tantra Group of Industries, [Founder Full Name] established the group with a clear purpose — to build businesses that solve real problems, create opportunities, and contribute to long-term economic growth. With a focus on innovation, resilience, and integrity, the Founder laid the foundation for a growing portfolio of ventures built to last.",
  insightHeading: "Leadership Vision",
  insightStatement:
    "To build businesses that create lasting value — combining entrepreneurial vision with sound execution, so every venture strengthens communities, empowers people, and shapes a prosperous future.",
  messageHeading: "Founder Message",
  message:
    "We are building Tantra Group of Industries on the belief that business can be a force for good. Our purpose is simple: create opportunities — for customers, for our people, and for the communities we serve. [Personal message from the Founder to be published.]",
};

export const chairman: LeaderProfile = {
  id: "chairman",
  role: "CHAIRMAN",
  name: "[ Chairman Full Name ]",
  photo: null,
  photoAlt:
    "Professional photo of the Chairman of Tantra Group of Industries (placeholder)",
  biography:
    "As Chairman of Tantra Group of Industries, [Chairman Full Name] oversees governance, partnerships, and the strategic direction of the group. The Chairman ensures that each business operates with responsibility, transparency, and a long-term view — safeguarding the group's values and reputation as it grows.",
  insightHeading: "Leadership Philosophy",
  insightStatement:
    "Sustainable growth is built on trust, sound governance, and responsible stewardship. We grow only in ways that protect our people, our partners, and the communities that place their confidence in us.",
  messageHeading: "Chairman Message",
  message:
    "The strength of a business group lies in its values and the trust it earns every day. On behalf of the Board, I reaffirm our commitment to responsible leadership, ethical business, and lasting value creation. [Personal message from the Chairman to be published.]",
};

export const ceoMd: LeaderProfile = {
  id: "ceo-md",
  role: "CEO & MANAGING DIRECTOR",
  name: "[ CEO & MD Full Name ]",
  photo: null,
  photoAlt:
    "Professional photo of the CEO & Managing Director of Tantra Group of Industries (placeholder)",
  biography:
    "As Chief Executive Officer and Managing Director, [CEO & MD Full Name] drives the day-to-day operations and growth of Tantra Group of Industries. The CEO leads venture development, operational excellence, and the disciplined execution of strategy — turning ideas into scalable, well-managed businesses.",
  insightHeading: "Business Strategy",
  insightStatement:
    "Our strategy is to build a diversified, future-ready portfolio — launching ventures that are digitally enabled, operationally efficient, and positioned for sustainable, long-term growth across multiple industries.",
  messageHeading: "Leadership Message",
  message:
    "Every company we build reflects the group's standards — innovation, discipline, and a genuine commitment to the people we serve. We are focused on executing well and creating businesses that endure. [Personal message from the CEO & MD to be published.]",
};

/** Ordered list used to render the /leadership page sections. */
export const leadershipProfiles: LeaderProfile[] = [founder, chairman, ceoMd];