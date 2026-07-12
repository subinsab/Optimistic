/**
 * Blog collection data layer.
 * Stand-in for a CMS/database "Blog" collection. When a real CMS is wired up,
 * replace the body of getPublishedArticles() with the fetch/query; the page
 * only depends on this async contract.
 */

/* An article body is an ordered list of blocks. A block with no `type` (just
   heading + paragraphs) is prose, so older posts keep rendering unchanged.
   Richer blocks add leads, quotes, lists, callouts and visuals. A "visual"
   block names an interactive component by key (see _visuals/registry). */
export type Block =
  | { type?: "prose"; heading?: string; paragraphs: string[] }
  | { type: "lead"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; heading?: string; ordered?: boolean; items: string[] }
  | { type: "callout"; tone?: "note" | "warn" | "tip"; title?: string; body: string }
  | { type: "visual"; kind: string; caption?: string };

export type ArticleBlock = Block; // back-compat alias

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
  cover?: string; // opt-in bespoke cover (e.g. "optimism"); falls back to generative
  placeholder?: boolean;
  content?: Block[]; // article body, in order
};

const COLLECTION: Article[] = [
  {
    title: "What Optimism Means When You Build Interfaces",
    slug: "what-is-optimism",
    excerpt:
      "The name is not a mood. It is a technique: render the result first, reconcile with the server after. Here is why a whole system is built around it.",
    category: "Philosophy",
    publishedDate: "2026-07-10",
    readingTime: "7 min read",
    author: "Subin",
    featured: true,
    status: "Published",
    seed: 42,
    cover: "optimism",
    content: [
      { type: "lead", text: "Optimism, here, is not a personality trait or a marketing adjective. It is borrowed from a specific engineering pattern, the optimistic update, and it shapes both how the system is built and how it feels to use." },
      {
        heading: "The pattern in one sentence",
        paragraphs: [
          "When a person acts, show the result immediately, as if it has already succeeded. Then confirm with the server quietly in the background, and only if the server disagrees do you reconcile and correct the screen.",
          "Most interfaces do the opposite. You tap, a spinner appears, and the interface holds its breath until a server three hundred milliseconds away gives permission to update. For an action that almost always succeeds, that pause is pure friction. The optimistic update removes it by trusting the common case.",
        ],
      },
      { type: "visual", kind: "optimistic-demo", caption: "Toggle the two modes and tap the heart. Optimistic renders at 0ms; pessimistic waits for the round trip." },
      {
        heading: "Why the wait is the real enemy",
        paragraphs: [
          "The round trip to a server is a physical fact, but the human should almost never have to feel it. Latency you can see is latency that makes the product feel slow, even when the code is fast. Perceived performance is the only performance a user experiences.",
          "Optimistic rendering trades a tiny, rare cost (occasionally correcting the screen when the server says no) for a constant, felt benefit (every common action lands instantly). For likes, toggles, reorders, and adds, that trade is almost always worth making.",
        ],
      },
      { type: "callout", tone: "tip", title: "When to render optimistically", body: "Do it for actions that succeed the vast majority of the time and are cheap to reverse: likes, toggles, adds to a list, drag reorders. Wait for the server on actions that are rare, expensive, or dangerous: payments, destructive deletes, anything with legal weight." },
      {
        heading: "Honesty is the other half",
        paragraphs: [
          "Optimism without a plan for failure is just lying to the user. The pattern only works because it is paired with honest reconciliation: when the server disagrees, you roll the change back visibly and say what happened, rather than pretending it went through.",
          "That is the discipline the name is meant to carry. Render the result first because you have earned the confidence to, and keep your word when the rare failure arrives.",
        ],
      },
      { type: "quote", text: "Show the result first, then keep your word.", cite: "The optimistic contract" },
      {
        heading: "Why a design system carries the same name",
        paragraphs: [
          "A good design system behaves the same way. It renders the right thing first: install once, import, and the working defaults are already correct, accessible, and on-brand. You do not assemble a button from raw parts and hope; the system commits to a result on your behalf.",
          "Then it reconciles honestly over time. Governance, versioning, deprecation, and audits are the background confirmation that keeps the promise true as the product grows. The optimistic update is a UI pattern; run it at the scale of an organisation and it becomes a way to build a system.",
        ],
      },
      { type: "list", heading: "Where the pattern shows up in Optimistic", items: [
        "Components ship with correct defaults, so the fast path is the right path.",
        "The Let's talk form renders your message as sent the instant you submit, then reconciles with the mail service.",
        "Tokens let a screen render with intent now and re-theme later without a rewrite.",
        "Docs state what is built and what is not, so the promise is never oversold.",
      ] },
      {
        paragraphs: [
          "Optimism, then, is a bet that the common case is worth optimising for, made safe by a clear plan for the uncommon one. That is the whole philosophy, in the product and in the system that builds it.",
        ],
      },
    ],
  },
  {
    title: "The Headless Design System, Explained",
    slug: "headless-design-system",
    excerpt:
      "Separate the behaviour from the paint: one accessible logic core, many skins, every framework. Here is what headless actually buys you, and what it costs.",
    category: "Architecture",
    publishedDate: "2026-07-08",
    readingTime: "8 min read",
    author: "Subin",
    status: "Published",
    seed: 51,
    content: [
      { type: "lead", text: "Headless is one of those words that sounds like jargon until you have felt the problem it solves. The problem is that most component libraries fuse two very different things, behaviour and appearance, and then charge you twice every time either one needs to change." },
      {
        heading: "Coupled by default",
        paragraphs: [
          "A typical button component bakes three things into one file: the logic (focus, keyboard, pressed and loading states, the ARIA role), the structure, and the paint (colour, radius, padding, the exact shade of the hover). It looks tidy until the day you need a second brand, a new framework, or a visual refresh.",
          "Now every visual change risks the accessibility you already got right, and every behaviour fix has to be reapplied across each themed copy. Teams respond by forking, and a fork is where a design system quietly starts to die.",
        ],
      },
      {
        heading: "What headless actually means",
        paragraphs: [
          "A headless component owns the behaviour and nothing else. It manages state, keyboard interaction, focus, and accessibility, and exposes them through props and hooks. It has zero opinion about colour, shape, or spacing. You bring the skin.",
          "Split that way, the hard, invisible work (the part that is easy to get subtly wrong) is written once and audited once. The paint becomes a thin, swappable layer on top.",
        ],
      },
      { type: "visual", kind: "headless-diagram", caption: "One logic core. Switch the skin; the behaviour, focus, and accessibility never change." },
      { type: "callout", tone: "note", title: "Accessibility is the quiet win", body: "Keyboard support, focus management, and ARIA are where component bugs hide. In a headless core you solve them one time, and every brand and theme built on top inherits the fix. One accessibility review serves the whole product." },
      {
        heading: "Why it pays off: multi-brand and multi-framework",
        paragraphs: [
          "Once behaviour and paint are separate, a rebrand is a new skin rather than a rewrite. Two products can share one interaction model and look nothing alike. Support a new framework and you port the thin presentation layer, not the accessibility you already trust.",
          "This is exactly why the same button can read as calm and corporate in one product and loud and playful in another while behaving identically in both. The behaviour is a contract; the look is a choice.",
        ],
      },
      { type: "list", heading: "The division of labour", items: [
        "The core owns: state machine, keyboard and focus, ARIA roles and relationships, disabled and pending handling, event callbacks.",
        "The skin owns: colour, radius, spacing, typography, motion, density, iconography.",
        "Tokens sit between them, so the skin is driven by named decisions rather than hardcoded values.",
      ] },
      {
        heading: "The honest tradeoff",
        paragraphs: [
          "Pure headless asks more of you up front. Bare logic with no default styling is powerful and also a blank page, and a blank page is where consistency erodes. The answer is not to abandon headless; it is to ship a strong default skin on top of it.",
          "That is the line Optimistic walks. The behaviour is headless underneath, but you are handed a complete, on-brand skin so the fast path is a working component, not a wiring exercise. Keep the skin and you move fast; replace it and the behaviour still holds.",
        ],
      },
      { type: "quote", text: "Behaviour is a contract you keep. The look is a choice you make.", cite: "On headless architecture" },
      {
        paragraphs: [
          "Headless is not about having no styles. It is about deciding, on purpose, where behaviour ends and paint begins, and never letting one hold the other hostage again.",
        ],
      },
    ],
  },
  {
    title: "What Token Drift Is, and How to Design It Out",
    slug: "stop-token-drift",
    excerpt:
      "Drift starts with one hardcoded hex under deadline pressure. A year later you have four grays for one surface. The fix is architecture, not discipline.",
    category: "Design Tokens",
    publishedDate: "2026-07-05",
    readingTime: "6 min read",
    author: "Subin",
    status: "Published",
    seed: 13,
    content: [
      { type: "lead", text: "Token drift never announces itself. It starts with a single hardcoded value shipped under deadline pressure, and a year later the product has four slightly different grays for the same surface, with nobody able to say which one is canonical." },
      {
        heading: "It arrives one shortcut at a time",
        paragraphs: [
          "One hex typed straight into a component. Then a spacing tweak that skips the scale. Then a shadow that lives in exactly one file. Each shortcut is reasonable on its own and invisible in review. Together they are drift, and drift compounds silently until a redesign forces you to count the damage.",
          "You can feel it in the symptoms: colours that are almost but not quite the same, spacing that looks off by a pixel you cannot locate, a dark mode that is right on most screens and wrong on a few.",
        ],
      },
      { type: "visual", kind: "drift-demo", caption: "Ship a few tweaks in each mode. Hardcoded values scatter into different grays; a semantic token keeps every surface in lockstep." },
      {
        heading: "Drift is an architecture problem, not a discipline problem",
        paragraphs: [
          "Telling engineers to \"just use the tokens\" does not work, because drift is rarely carelessness. It is what happens when the token system cannot express what a screen actually needs. If there is no token for a hovered destructive action, someone will invent a value, and that invention is drift.",
          "So the fix is not more willpower. It is a layered architecture where the right token always exists and always resolves to one place.",
        ],
      },
      { type: "visual", kind: "token-layers", caption: "Three layers, each referencing only the one below. A rebrand becomes a single primitive swap, and drift has nowhere to hide." },
      {
        heading: "The three layers",
        paragraphs: [
          "Primitives define what values exist: the raw ramps and scales, named but opinion-free. Semantic tokens define what those values mean: surface, accent, danger, the intent behind a choice. Component tokens define where they apply: button background points at accent, card surface points at surface.",
          "When each layer only references the layer below, a theme change is a swap at the primitive level that ripples upward automatically. Nothing hardcodes a value, so nothing can drift away from it.",
        ],
      },
      { type: "callout", tone: "warn", title: "Missing tokens cause more drift than careless engineers", body: "Every state a screen needs but the system cannot name is a future hardcoded value. Before you blame the team, look for the gap in the token set. Fill the gap and the shortcut disappears with it." },
      {
        heading: "Automate the boundary",
        paragraphs: [
          "Architecture removes the reason to drift; automation removes the opportunity. Sync tokens from the source of truth into code on every change, generated and versioned like any other dependency. Then lint component styles for raw values so a stray hex fails the pull request instead of surfacing in an audit two quarters later.",
          "Once that pipeline exists, drift stops being a recurring cleanup project and becomes a build failure you fix in minutes. That is the difference between a system that erodes and one that compounds.",
        ],
      },
      { type: "list", ordered: true, heading: "A drift-proof pipeline", items: [
        "One source of truth for values (Figma variables or a tokens file), never a designer's memory.",
        "Generate platform tokens from it automatically on publish.",
        "Reference only semantic and component tokens in code, never raw values.",
        "Lint for hardcoded hex, px, and shadows so drift is caught in review.",
        "Version and review token changes exactly like code changes.",
      ] },
      { type: "quote", text: "Discipline fights drift and loses. Architecture makes drift impossible to introduce.", cite: "On design tokens" },
      {
        paragraphs: [
          "Drift is not a moral failing on the team. It is a structural gap in the system. Close the gap with layers and a pipeline, and the problem stops being something you clean up and becomes something you cannot create.",
        ],
      },
    ],
  },
  {
    title: "What It Takes to Make a Design System Teams Actually Use",
    slug: "design-system-adoption",
    excerpt:
      "Shipping tokens is easy. Turning them into a foundation every team reaches for takes structure, governance, and relentless consistency.",
    category: "Design Systems",
    publishedDate: "2026-06-24",
    readingTime: "8 min read",
    author: "Subin",
    status: "Published",
    seed: 7,
    content: [
      {
        paragraphs: [
          "Every design system starts the same way: a burst of enthusiasm, a Figma library, a tokens file, and a launch announcement. Six months later, half the teams have quietly forked the button and the other half never adopted it at all. The system did not fail because the components were bad. It failed because adoption was treated as a launch, not a practice.",
          "Adoption is earned one migration at a time. The teams that reach for a system do it because it is genuinely the fastest path to shipping, not because a mandate told them to.",
        ],
      },
      {
        heading: "Make the right thing the easy thing",
        paragraphs: [
          "If installing the system takes an afternoon of dependency wrangling, teams will copy and paste instead. The bar is one install, one import, working defaults. Every extra decision you push onto a product team is a reason for them to defer adoption to the next quarter.",
          "Semantic tokens are the quiet workhorse here. When a team styles with intent, surface, accent, danger, instead of raw values, their screens survive rebrands and theme changes without a single edit. That is a benefit they feel within weeks, and felt benefits drive adoption far better than governance docs.",
        ],
      },
      {
        heading: "Governance that serves, not gates",
        paragraphs: [
          "A contribution process that takes six weeks teaches teams to stop contributing. Treat the system like a product with users: publish a roadmap, triage requests in the open, and ship on a cadence teams can plan around.",
          "Measure adoption honestly (component coverage, token usage, forked variants) and treat every fork as a signal rather than a violation. Somewhere behind that fork is a use case the system does not serve yet.",
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
          "Plenty of teams have a component library and call it a design system. The two look similar, a package of buttons, inputs, and modals, but they behave completely differently under pressure. A library answers \"what can I render?\" A system answers \"what should this product look and behave like, everywhere, forever?\"",
        ],
      },
      {
        heading: "The shift is architectural",
        paragraphs: [
          "A library is a collection of endpoints. A system is a pipeline: foundations feed tokens, tokens feed components, components feed templates and platforms. When the layers are explicit, a change at any level propagates predictably instead of requiring a manual sweep across fifty screens.",
          "This is also where headless architecture earns its keep. Separating behaviour and accessibility from the visual skin means one accessibility review serves every brand and theme built on top of it.",
        ],
      },
      {
        heading: "Systems have operations",
        paragraphs: [
          "The real tell is operational: versioning policy, deprecation paths, contribution flow, release notes, adoption metrics. A library ships code; a system ships guarantees. Teams build on guarantees.",
          "If you are maintaining a library today, you do not need a rewrite to make the shift. You need to name the layers you already have, put contracts between them, and start treating consumers as customers.",
        ],
      },
    ],
  },
  {
    title: "Figma Variables as a Single Source of Truth",
    slug: "figma-variables-source-of-truth",
    excerpt:
      "Modes, collections, and aliases turn Figma into the canonical home for design decisions, synced straight to code.",
    category: "Figma Variables",
    publishedDate: "2026-06-03",
    readingTime: "6 min read",
    author: "Subin",
    status: "Published",
    seed: 31,
    content: [
      {
        paragraphs: [
          "For years, the canonical home of design decisions was a spreadsheet, a wiki page, or a designer's memory. Figma Variables changed that. Collections, modes, and aliases give design decisions a real data model, one that tooling can read, diff, and sync straight into code.",
        ],
      },
      {
        heading: "Collections and modes do the heavy lifting",
        paragraphs: [
          "A collection groups related decisions; modes express their contexts: light and dark, comfortable and compact, brand A and brand B. The moment a colour exists once with two mode values, instead of twice in two separate styles, theming stops being duplication and becomes selection.",
          "Aliases add the semantic layer: surface/raised points at gray/50 in light mode and gray/900 in dark. Designers work with intent, and the resolution to raw values happens in exactly one place.",
        ],
      },
      {
        heading: "From canvas to code",
        paragraphs: [
          "Because variables are structured data, the handoff can be a pipeline instead of a conversation. Export on publish, transform into platform tokens, and open a pull request automatically. Design review and code review become the same review.",
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
  readingTime: "soon",
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
