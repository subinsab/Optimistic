/**
 * Blog collection data layer (Section J).
 * Stand-in for a CMS/database "Blog" collection. When a real CMS is wired up,
 * replace the body of getPublishedArticles() with the fetch/query — the page
 * only depends on this async contract. Falls back to placeholders gracefully.
 */
export type ArticleBlock = {
  heading?: string;
  paragraphs: string[];
};

export type Article = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedDate: string; // ISO yyyy-mm-dd
  readingTime: string;
  author: string;
  featured?: boolean;
  status: "Published" | "Draft";
  seed: number; // drives the procedural cover art
  placeholder?: boolean;
  content?: ArticleBlock[]; // article body, in order
};

const COLLECTION: Article[] = [
  {
    title: "What It Takes to Make a Design System Teams Actually Use",
    slug: "design-system-adoption",
    excerpt:
      "Shipping tokens is easy. Turning them into a foundation every team reaches for requires structure, governance, and relentless consistency.",
    category: "Design Systems",
    publishedDate: "2026-06-24",
    readingTime: "8 min read",
    author: "Subin",
    featured: true,
    status: "Published",
    seed: 7,
    content: [
      {
        paragraphs: [
          "Every design system starts the same way: a burst of enthusiasm, a Figma library, a tokens file, and a launch announcement. Six months later, half the teams have quietly forked the button and the other half never adopted it at all. The system didn't fail because the components were bad — it failed because adoption was treated as a launch, not a practice.",
          "Adoption is earned one migration at a time. The teams that reach for a system do it because it is genuinely the fastest path to shipping — not because a mandate told them to.",
        ],
      },
      {
        heading: "Make the right thing the easy thing",
        paragraphs: [
          "If installing the system takes an afternoon of dependency wrangling, teams will copy-paste instead. The bar is one install, one import, working defaults. Every extra decision you push onto a product team is a reason for them to defer adoption to the next quarter.",
          "Semantic tokens are the quiet workhorse here. When a team styles with intent — surface, accent, danger — instead of raw values, their screens survive rebrands and theme changes without a single edit. That is a benefit they feel within weeks, and felt benefits drive adoption far better than governance docs.",
        ],
      },
      {
        heading: "Governance that serves, not gates",
        paragraphs: [
          "A contribution process that takes six weeks teaches teams to stop contributing. Treat the system like a product with users, publish a roadmap, triage requests in the open, and ship on a cadence teams can plan around.",
          "Measure adoption honestly — component coverage, token usage, forked variants — and treat every fork as a signal, not a violation. Somewhere behind that fork is a use case the system doesn't serve yet.",
        ],
      },
    ],
  },
  {
    title: "Why Your Tokens Drift — and How to Stop It",
    slug: "stop-token-drift",
    excerpt:
      "Drift creeps in the moment a value is hardcoded. Here's how semantic tokens and automated sync keep every surface aligned.",
    category: "Design Tokens",
    publishedDate: "2026-06-18",
    readingTime: "4 min read",
    author: "Subin",
    status: "Published",
    seed: 13,
    content: [
      {
        paragraphs: [
          "Token drift never announces itself. It starts with one hardcoded hex value shipped under deadline pressure, then a spacing tweak that skips the scale, then a shadow that exists only in one file. A year later the product has four slightly different grays for the same surface and nobody remembers which one is canonical.",
        ],
      },
      {
        heading: "Drift is an architecture problem",
        paragraphs: [
          "Telling engineers to \"use the tokens\" doesn't work, because drift isn't a discipline failure — it's what happens when the token system can't express what a screen needs. If there's no semantic token for a hovered destructive action, someone will invent a value, and that invention is drift.",
          "The fix is a semantic layer between primitives and components. Primitives define what values exist; semantic tokens define what they mean; component tokens define where they apply. When each layer only references the layer below, a rebrand is a primitive swap and drift has nowhere to hide.",
        ],
      },
      {
        heading: "Automate the boundary",
        paragraphs: [
          "Sync tokens from the source of truth into code on every change — generated, versioned, and reviewed like any other dependency. Then lint for raw values in component styles so drift is caught in the pull request, not in an audit two quarters later.",
          "Once the pipeline is in place, drift stops being a cleanup project and becomes a build failure. That's the difference between a system that erodes and one that compounds.",
        ],
      },
    ],
  },
  {
    title: "From Components to Systems: The Real Shift",
    slug: "components-to-systems",
    excerpt:
      "A component library is not a design system. The difference is architecture, governance, and a single source of truth.",
    category: "Component Architecture",
    publishedDate: "2026-06-11",
    readingTime: "5 min read",
    author: "Subin",
    status: "Published",
    seed: 21,
    content: [
      {
        paragraphs: [
          "Plenty of teams have a component library and call it a design system. The two look similar — a package of buttons, inputs, and modals — but they behave completely differently under pressure. A library answers \"what can I render?\"; a system answers \"what should this product look and behave like, everywhere, forever?\"",
        ],
      },
      {
        heading: "The shift is architectural",
        paragraphs: [
          "A library is a collection of endpoints. A system is a pipeline: foundations feed tokens, tokens feed components, components feed templates and platforms. When the layers are explicit, a change at any level propagates predictably instead of requiring a manual sweep across fifty screens.",
          "This is also where headless architecture earns its keep. Separating behavior and accessibility from visual skin means one accessibility review serves every brand and theme built on top of it.",
        ],
      },
      {
        heading: "Systems have operations",
        paragraphs: [
          "The real tell is operational: versioning policy, deprecation paths, contribution flow, release notes, adoption metrics. A library ships code; a system ships guarantees. Teams build on guarantees.",
          "If you're maintaining a library today, you don't need a rewrite to make the shift — you need to name the layers you already have, put contracts between them, and start treating consumers as customers.",
        ],
      },
    ],
  },
  {
    title: "Figma Variables as a Single Source of Truth",
    slug: "figma-variables-source-of-truth",
    excerpt:
      "Modes, collections, and aliases turn Figma into the canonical home for design decisions — synced straight to code.",
    category: "Figma Variables",
    publishedDate: "2026-06-03",
    readingTime: "6 min read",
    author: "Subin",
    status: "Published",
    seed: 31,
    content: [
      {
        paragraphs: [
          "For years, the canonical home of design decisions was a spreadsheet, a wiki page, or a designer's memory. Figma Variables changed that: collections, modes, and aliases give design decisions a real data model — one that tooling can read, diff, and sync straight into code.",
        ],
      },
      {
        heading: "Collections and modes do the heavy lifting",
        paragraphs: [
          "A collection groups related decisions; modes express their contexts — light and dark, comfortable and compact, brand A and brand B. The moment a color exists once with two mode values, instead of twice in two styles, theming stops being duplication and becomes selection.",
          "Aliases add the semantic layer: surface/raised points at gray/50 in light mode and gray/900 in dark. Designers work with intent, and the resolution to raw values happens in exactly one place.",
        ],
      },
      {
        heading: "From canvas to code",
        paragraphs: [
          "Because variables are structured data, the handoff can be a pipeline instead of a conversation. Export on publish, transform into platform tokens, and open a pull request automatically — design review and code review become the same review.",
          "The destination is a single source of truth that both sides trust: designers change a variable, engineers merge a diff, and every platform re-themes without anyone re-drawing or re-typing a value.",
        ],
      },
    ],
  },
];

export const PLACEHOLDER: Article = {
  title: "More insights coming soon",
  slug: "#",
  excerpt:
    "New articles on tokens, variables, governance, and automation are on the way.",
  category: "Coming Soon",
  publishedDate: "",
  readingTime: "—",
  author: "",
  status: "Published",
  seed: 3,
  placeholder: true,
};

/** Published articles, newest first. Swap the body for a real CMS query later. */
export async function getPublishedArticles(): Promise<Article[]> {
  return COLLECTION.filter((a) => a.status === "Published").sort(
    (a, b) => +new Date(b.publishedDate) - +new Date(a.publishedDate)
  );
}

/** Single published article by slug, or null. Swap for a real CMS query later. */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return (
    COLLECTION.find((a) => a.status === "Published" && a.slug === slug) ?? null
  );
}
