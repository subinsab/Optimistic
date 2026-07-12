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
        heading: "The cost of getting it wrong",
        paragraphs: [
          "The pattern is not free of risk, and honesty means naming the risk. When you render before you confirm, you are occasionally wrong, and the user briefly saw a result that did not hold. Handled badly, that is worse than a spinner, because it feels like the product lied. Handled well, with a visible rollback and a clear message, it is a rare and understandable correction.",
          "So the discipline is proportional to the stakes. Optimism is right for a like and wrong for a wire transfer. The skill is knowing which action you are looking at, and never rendering ahead of a truth you cannot afford to be wrong about.",
        ],
      },
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
    cover: "headless",
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
        heading: "Where pure headless goes wrong",
        paragraphs: [
          "The failure mode of headless is not technical; it is the blank page. Hand a team bare logic with no styling and consistency erodes immediately, because every team paints the button differently and you are back to the drift you were trying to escape. Freedom without a default is just fragmentation with extra steps.",
          "The fix is not to abandon the separation but to ship a strong default skin on top of it. Keep the skin and you get consistency for free; replace it deliberately for a second brand and the behaviour underneath never moves. Headless is the foundation, not the whole house.",
        ],
      },
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
    cover: "drift",
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
        heading: "Catch drift where it is born",
        paragraphs: [
          "Drift is cheapest to fix at the moment it is typed and most expensive to fix once it has shipped and spread. That argues for moving the catch as early as possible: a lint rule that fails a raw hex in the editor and the pull request, before the value ever reaches a screen. The earlier the guardrail, the smaller the cleanup.",
          "This is also what makes the fix durable. Architecture removes the reason to drift, but a lint removes the opportunity, and the two together turn a recurring cleanup project into a problem you simply stop being able to create.",
        ],
      },
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
    readingTime: "11 min read",
    author: "Subin",
    status: "Published",
    seed: 7,
    cover: "adoption",
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
      { type: "visual", kind: "scale-fan", caption: "Adoption is not one launch to everyone. It is one team at a time, each inheriting what the last one proved." },
      { type: "callout", tone: "tip", title: "Ship a migration, not a mandate", body: "The most persuasive adoption artifact is a real pull request that deletes code. Migrate one screen for a team, show the diff, and let the reduction in lines make the argument that a memo never could." },
      {
        heading: "Adoption is a curve, not a launch",
        paragraphs: [
          "The launch is the least important day. What matters is the slope after it: does each week bring another migrated surface, or does the graph go flat while teams quietly keep their forks? A system that is adopted looks like a rising line of coverage, not a single spike of announcements.",
          "Plan for the curve. Pick a first team whose success others will notice, help them migrate for real, and turn that into the reference every later team points at.",
        ],
      },
      {
        heading: "Migrate the busiest surfaces first",
        paragraphs: [
          "It is tempting to start adoption on a quiet corner where a mistake is cheap. That is exactly backwards. The busiest, most visible surfaces are where the system earns its reputation and where the inconsistencies hurt most, so a win there converts skeptics fastest.",
          "High-traffic migrations also surface the real gaps early, while you still have the attention and goodwill to close them. A flawless migration of a page nobody visits proves nothing.",
        ],
      },
      { type: "list", heading: "Signals that adoption is real", items: [
        "Component coverage rising month over month, not just at launch.",
        "Forked variants trending down as gaps get filled upstream.",
        "New surfaces built on the system by default, without being asked.",
        "Requests arriving through the contribution path instead of private workarounds.",
      ] },
      { type: "quote", text: "A launch is an announcement. Adoption is a slope. Watch the slope.", cite: "On adoption" },
    ],
  },
  {
    title: "From Components to Systems: The Real Shift",
    slug: "components-to-systems",
    excerpt:
      "A component library is not a design system. The difference is architecture, governance, and a single source of truth.",
    category: "Component Architecture",
    publishedDate: "2026-06-11",
    readingTime: "8 min read",
    author: "Subin",
    status: "Published",
    seed: 21,
    cover: "components",
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
      { type: "visual", kind: "token-layers", caption: "The shift made concrete: foundations feed tokens, tokens feed components. A change at any level propagates instead of being swept by hand." },
      { type: "callout", tone: "note", title: "You can make the shift without a rewrite", body: "A system is not a bigger library; it is a library with contracts around it. Name the layers you already have, write down what each guarantees to the one above, and you have started the shift with the code you already own." },
      {
        heading: "The tell is what happens on change",
        paragraphs: [
          "Change one primitive and watch what happens. In a library, you open fifty files and hope you found them all. In a system, you edit one value and it propagates through the layers to every screen, because nothing downstream held a copy. The difference is not the components; it is whether the layers are wired or merely adjacent.",
          "That is why a system survives a rebrand and a library dreads one. The rebrand is a swap at the bottom of a system, and a manual sweep across a library.",
        ],
      },
      {
        heading: "Contracts are the real product",
        paragraphs: [
          "The most valuable thing a system ships is not a component; it is a set of promises. This token means surface everywhere. This component owns focus and accessibility. This version will not break you until the next major. Teams do not build on code they have to re-verify; they build on guarantees they can plan around.",
          "Write those contracts down and honor them, and consumers become customers who invest in you. Break them quietly and you are back to a library that people copy out of instead of building on.",
        ],
      },
      { type: "list", heading: "Library versus system", items: [
        "A library answers what can I render. A system answers what should this product be, everywhere.",
        "A library ships components. A system ships tokens, components, and the contracts between them.",
        "A library is versioned by accident. A system is versioned on purpose, with deprecations and runway.",
        "A library is adopted by copy-paste. A system is adopted because building on it is the fast path.",
      ] },
      { type: "quote", text: "A library is a collection of endpoints. A system is a set of promises with components attached.", cite: "On components and systems" },
    ],
  },
  {
    title: "Figma Variables as a Single Source of Truth",
    slug: "figma-variables-source-of-truth",
    excerpt:
      "Modes, collections, and aliases turn Figma into the canonical home for design decisions, synced straight to code.",
    category: "Figma Variables",
    publishedDate: "2026-06-03",
    readingTime: "9 min read",
    author: "Subin",
    status: "Published",
    seed: 31,
    cover: "figma",
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
      { type: "visual", kind: "token-pipeline", caption: "Because variables are data, the handoff is a build: export on publish, transform to platform tokens, open a pull request." },
      { type: "callout", tone: "tip", title: "Name for intent, not appearance", body: "Call the alias accent, not orange. The day the brand color changes, an intent-named variable simply updates, while an appearance-named one becomes a lie that every file quietly repeats." },
      {
        heading: "Modes turn duplication into selection",
        paragraphs: [
          "Before variables, a themed product was a pile of near-duplicates: a light style and a dark style, a comfortable spacing and a compact one, kept in sync by discipline alone. Modes collapse those copies into one decision viewed under different settings. The value exists once; the mode chooses which resolution applies.",
          "This is what makes theming stop being a maintenance burden. You are no longer keeping two sets of styles agreeing; you are selecting a mode on a single set that cannot disagree with itself.",
        ],
      },
      {
        heading: "The handoff becomes a diff",
        paragraphs: [
          "The oldest friction in product work is the handoff: a designer decides, an engineer re-types the decision somewhere else, and the two slowly drift. When the decision lives as a variable, the handoff is a diff instead of a dictation. The designer changes the source, the pipeline opens a pull request, and the engineer reviews a change rather than transcribing one.",
          "Design review and code review become the same review, over the same artifact. That is the moment design and code stop being two copies of the truth and become one.",
        ],
      },
      { type: "list", ordered: true, heading: "Set up variables that actually sync", items: [
        "Model primitives as raw variables, and semantics as aliases that point at them.",
        "Express light, dark, brand, and density as modes, never as separate styles.",
        "Design against the aliases, so frames inherit every future theme change.",
        "Export on publish and generate platform tokens from the variables.",
        "Open a pull request automatically, so the sync is reviewed like code.",
      ] },
      { type: "quote", text: "The variable is the decision. The mode is the context. The pull request is the handoff.", cite: "On Figma variables" },
    ],
  },
  {
    title: "What Optimistic Is, in One Read",
    slug: "what-is-optimistic",
    excerpt:
      "A dark-first, token-driven design system built on one idea: render the right thing first, and reconcile honestly after. Here is the whole picture.",
    category: "Overview",
    publishedDate: "2026-07-06",
    readingTime: "5 min read",
    author: "Subin",
    status: "Published",
    seed: 83,
    cover: "overview",
    content: [
      { type: "lead", text: "Optimistic is a design system with a point of view. It is dark-first, driven by tokens, and organised around a single engineering idea borrowed from the interface it helps you build: the optimistic update." },
      { heading: "The idea in the name", paragraphs: [
        "An optimistic update shows the result of an action immediately, then confirms with the server in the background and reconciles only if something went wrong. Optimistic the system behaves the same way: install it and the correct, accessible, on-brand result is already rendered, then governance keeps that promise true over time.",
        "So the name is not decoration. It describes both how the components feel to use and how the system is meant to be run.",
      ] },
      { type: "visual", kind: "optimistic-demo", caption: "The pattern the whole system is named after. Render first, reconcile after." },
      { heading: "What is actually in the box", paragraphs: [
        "Three things, layered. Tokens hold every visual decision as references, so one change reaches every screen. Components own behaviour and accessibility as a headless core with a complete default skin on top. Documentation states plainly what is built and what is not, so the promise is never oversold.",
        "Around those sits the operations that turn a library into a system: versioning, deprecation, and audits.",
      ] },
      { type: "list", heading: "What Optimistic optimises for", items: [
        "The fast path is the correct path: install, import, ship.",
        "Screens survive rebrands because they style with intent, not values.",
        "Accessibility is solved once in the core and inherited everywhere.",
        "Honesty: the docs and the system tell you the truth about their state.",
      ] },
      {
        heading: "Dark-first is a decision, not a default",
        paragraphs: [
          "Optimistic starts from a near-black field with a single warm accent, because that is where focused product work increasingly lives and because constraint is a feature. One accent color forces hierarchy to come from structure and type rather than from a scatter of hues. The result reads as calm and intentional instead of busy.",
          "Light is supported as a mode, not bolted on as an afterthought. Because color lives in the semantic layer, the same components render correctly in either, and neither is a second-class citizen.",
        ],
      },
      { type: "quote", text: "Render the right thing first. Reconcile honestly after. That is the product and the system.", cite: "The Optimistic idea" },
      { paragraphs: [ "If you read one thing into the name, read this: optimism here is a technique, made safe by a plan for the rare case where it is wrong." ] },
    ],
  },
  {
    title: "How to Use Optimistic in Your Product",
    slug: "using-optimistic",
    excerpt:
      "Install once, import, ship. The fast path is a working, accessible, on-brand component, not a wiring exercise. Here is the whole workflow.",
    category: "Guides",
    publishedDate: "2026-06-28",
    readingTime: "6 min read",
    author: "Subin",
    status: "Published",
    seed: 67,
    cover: "using",
    content: [
      { type: "lead", text: "The measure of a design system is how little you have to do to get the right result. With Optimistic, the shortest path, install and import, is already the correct one." },
      { heading: "Own the code, not a black box", paragraphs: [
        "Optimistic installs like a set of source files you own, not an opaque dependency you fight. You add the components you need, they land in your codebase, and you can read and change every line. Nothing is hidden behind a version bump you cannot inspect.",
        "That ownership matters the first time you need a component to do something its author did not anticipate. You are editing real, legible code, not overriding a library from the outside.",
      ] },
      { type: "visual", kind: "install-steps", caption: "Three steps from nothing to a shipped screen. The defaults are accessible and on-brand out of the box." },
      { heading: "Style with tokens, not values", paragraphs: [
        "Once the components are in, resist the urge to reach for a raw hex or pixel. Style with the semantic tokens: surface, accent, danger, the spacing scale. A screen built this way re-themes for free and survives a rebrand without edits.",
        "This is the single habit that separates a product that ages well from one that drifts. The components make it the easy habit, because the tokens are already wired underneath them.",
      ] },
      { type: "callout", tone: "note", title: "Keep the skin, or replace it", body: "The behaviour is headless underneath: focus, keyboard, and accessibility are solved in the core. Keep the default skin and you move fast. Replace it for a second brand and the behaviour still holds. You never trade one for the other." },
      { heading: "Compose upward", paragraphs: [
        "Real product UI is not single components; it is compositions. A pricing card is a Card plus a Button plus tokens. A data view is a Table with cell renderers. Build your product-specific pieces by composing the primitives, and keep those compositions in your own layer.",
        "When you do, upgrades stay clean: the primitives improve underneath, and your compositions inherit the improvement without a rewrite.",
      ] },
      {
        heading: "Upgrade without fear",
        paragraphs: [
          "Owning the code does not mean freezing it. When a component improves upstream, you pull the change into files you can read and diff, so an upgrade is a review rather than a leap of faith. You see exactly what moved before it ships.",
          "Because your product-specific pieces are compositions on top of the primitives, they rarely need to change when the primitives do. The improvement lands underneath them and they inherit it for free.",
        ],
      },
      { type: "quote", text: "The right thing should be the least work. Everything else is just discipline you should not need.", cite: "On adoption" },
    ],
  },
  {
    title: "How to Build a Token Design System That Holds",
    slug: "token-design-system",
    excerpt:
      "Tokens are not a color list. They are a three-layer contract that lets one decision reach every screen, and survive a rebrand without a rewrite.",
    category: "Design Tokens",
    publishedDate: "2026-07-02",
    readingTime: "7 min read",
    author: "Subin",
    status: "Published",
    seed: 61,
    cover: "tokens",
    content: [
      { type: "lead", text: "A token system is not a palette with nicer names. It is a contract between design and code that says: every visual decision lives in exactly one place, and everything downstream refers back to it." },
      { heading: "Names are not tokens", paragraphs: [
        "Renaming #FF7A00 to ember-500 changes nothing on its own. You still have a raw value that a component can hardcode, and a hundred places that can drift from it. A token becomes useful only when it is a reference that resolves, not a label you paste.",
        "The unit of value in a token system is the reference. brand-button-bg does not contain a color; it points at accent, which points at ember-500. Change the primitive and the button follows, because it never held a color of its own.",
      ] },
      { type: "visual", kind: "token-layers", caption: "Three layers, each referring only to the one below. Values live at the bottom; meaning and application sit above." },
      { heading: "The three layers, and why order matters", paragraphs: [
        "Primitives answer what values exist: the raw ramps, named and opinion-free. Semantic tokens answer what they mean: surface, accent, danger, the intent behind a choice. Component tokens answer where they apply: button background, card surface, input border.",
        "The rule that makes it hold is strict: each layer may reference only the layer beneath it. Components never touch primitives. Semantics never touch components. Break that rule once and you have reintroduced the coupling tokens were meant to remove.",
      ] },
      { type: "callout", tone: "tip", title: "Design for the states, not just the swatches", body: "Most drift comes from missing tokens, not careless ones. A hovered destructive button, a disabled input on a raised surface: if the token does not exist, someone invents a value. Enumerate the real states first and the shortcuts disappear." },
      { heading: "Modes are just another axis", paragraphs: [
        "Light and dark, comfortable and compact, brand A and brand B: these are not separate token sets, they are modes of the same semantic layer. surface resolves to one primitive in light and another in dark. The component never knows which mode it is in, and never has to.",
        "That is the whole payoff. A theme change becomes a swap at the primitive level, and it ripples up automatically through semantics and components to every screen.",
      ] },
      { type: "visual", kind: "token-pipeline", caption: "The source lives in Figma variables; a build turns it into platform tokens. Design review and code review become the same review." },
      { type: "list", ordered: true, heading: "A token system that holds", items: [
        "One source of truth for values, never a designer's memory.",
        "Three layers, each referencing only the one below.",
        "Semantic names for intent, so screens survive rebrands.",
        "Modes as an axis of the semantic layer, not duplicate sets.",
        "Generated into code on publish, and linted so raw values fail review.",
      ] },
      {
        heading: "Where teams get the layers wrong",
        paragraphs: [
          "The most common mistake is letting a component reference a primitive directly, skipping the semantic layer because it is quicker in the moment. It works until the rebrand, when that one component ignores the new theme because it was pointing at a raw value the whole time. One shortcut, one screen that will not re-theme.",
          "The second mistake is a semantic layer that just renames primitives one to one: surface equals gray-900 and nothing more. Semantics earn their place by encoding intent that can change per mode, not by being an alias with extra steps. If your semantic layer has no modes, it is not yet doing its job.",
        ],
      },
      { type: "quote", text: "A token is not a value with a nicer name. It is a promise that the value lives somewhere else.", cite: "On token architecture" },
    ],
  },
  {
    title: "Integrating Optimistic With Claude",
    slug: "integrate-with-claude",
    excerpt:
      "A design system is the perfect context for an AI coding agent. Give Claude your tokens, components, and rules, and generation stays on-system by construction.",
    category: "AI Workflow",
    publishedDate: "2026-06-20",
    readingTime: "6 min read",
    author: "Subin",
    status: "Published",
    seed: 73,
    cover: "claude",
    content: [
      { type: "lead", text: "An AI agent is only as good as the context it is given. A design system is unusually good context: a bounded vocabulary of tokens, a known set of components, and explicit rules about how they combine." },
      { heading: "Why a system beats a blank page for AI", paragraphs: [
        "Ask a model to build UI with no constraints and it invents: new colors, new spacing, a fourth kind of button. That is drift, generated at machine speed. Give it a design system and the space of valid answers collapses to the ones you actually want.",
        "The tokens tell it which values are allowed. The components tell it which parts exist. The rules tell it how they fit. Generation stops being invention and becomes assembly.",
      ] },
      { type: "visual", kind: "claude-loop", caption: "Describe, generate, review. The context you provide is what keeps each generation inside the system." },
      { heading: "Make the context machine-readable", paragraphs: [
        "Point the agent at the real artifacts: the tokens file, the component source, and a short rules document (style with semantic tokens, compose don't fork, never hardcode a value). Because Optimistic ships as code you own, the agent can read the actual implementations, not a summary of them.",
        "The clearer and more structured that context, the less the model guesses. A good rules file is worth more than a long prompt.",
      ] },
      { type: "callout", tone: "warn", title: "Keep the guardrails in the pipeline", body: "AI speeds up the common case; it does not remove the need for verification. Keep the same lint that fails a raw hex in review, and it will catch a stray value whether a human or a model typed it." },
      { heading: "The loop, not the one-shot", paragraphs: [
        "The value is not a single perfect generation; it is a fast loop. Describe a screen, get system-aware code, review the diff, and refine. Each pass stays on-system because the context does not change between passes.",
        "Run that loop inside a real design system and an agent becomes what it should be: a very fast, very literal teammate who already read your styleguide.",
      ] },
      {
        heading: "What good context actually contains",
        paragraphs: [
          "Three things earn their place in the context you give an agent. The token vocabulary, so it knows which values are legal. The component inventory with real signatures, so it composes what exists instead of inventing look-alikes. And a short rules file that states the non-negotiables in plain language: semantic tokens only, compose don't fork, never hardcode.",
          "Everything else is noise that dilutes the signal. A tight, current context beats an exhaustive one, because the model weighs what you show it, and showing it stale examples teaches it stale habits.",
        ],
      },
      { type: "quote", text: "Constraints are not what slow a model down. They are what make its output usable.", cite: "On AI and design systems" },
    ],
  },
  {
    title: "Working in Figma With Optimistic",
    slug: "figma-workflow",
    excerpt:
      "Variables, modes, and aliases turn Figma into the source of truth. Design a decision once and every mode, and every platform, follows.",
    category: "Figma",
    publishedDate: "2026-06-14",
    readingTime: "6 min read",
    author: "Subin",
    status: "Published",
    seed: 79,
    cover: "figmaflow",
    content: [
      { type: "lead", text: "The point of Figma variables is not tidier files. It is that a design decision can exist once, as data, and be read straight into code instead of retyped." },
      { heading: "One variable, every mode", paragraphs: [
        "A color used to live twice: once as a light style, once as a dark one, kept in sync by hand. As a variable with modes, it lives once and resolves per context. Switch the mode and the whole canvas re-themes, because nothing was duplicated to begin with.",
        "Density, brand, and platform are just more modes on the same variables. The design stops being many near-copies and becomes one design viewed under different settings.",
      ] },
      { type: "visual", kind: "token-pipeline", caption: "Variables are structured data, so the handoff is a build, not a conversation." },
      { heading: "Aliases are the semantic layer", paragraphs: [
        "Raw variables (gray-50, ember-500) are primitives. Aliases (surface, accent) are the semantic layer, and they are where designers should actually work. Paint with surface, not with a specific gray, and your frames inherit every future theme decision automatically.",
        "This mirrors the code exactly. When designers alias and engineers reference the same semantic names, the two sides are finally speaking one language.",
      ] },
      { type: "callout", tone: "tip", title: "Name for intent, not appearance", body: "Call it accent, not orange. The day the brand color changes, an intent-named variable just updates; an appearance-named one becomes a lie that every file quietly repeats." },
      { heading: "From canvas to code, automatically", paragraphs: [
        "Because variables are data, publishing them can trigger a build: export, transform into platform tokens, and open a pull request. The designer changes a variable, the engineer reviews a diff, and every platform re-themes without anyone redrawing a screen.",
        "That is the whole promise of a single source of truth. Not that design and code agree today, but that they cannot silently disagree tomorrow.",
      ] },
      {
        heading: "Collections keep the model legible",
        paragraphs: [
          "As variables multiply, structure is what keeps them usable. Group primitives, semantics, and component decisions into separate collections, so a designer reaching for a color sees intent-named aliases first and raw ramps only when they mean to. A flat list of three hundred variables is technically a source of truth and practically a swamp.",
          "Good collection structure also mirrors the token layers in code, which keeps the two sides aligned as both grow. When the Figma model and the code model share a shape, the sync stays simple.",
        ],
      },
      { type: "quote", text: "Design once, resolve everywhere. The variable is the decision; the mode is the context.", cite: "On Figma variables" },
    ],
  },
  {
    title: "Why Adopt a Design System at All",
    slug: "why-optimistic",
    excerpt:
      "The case for a system is not consistency for its own sake. It is speed, lower cost, and screens that do not rot. Here is the honest argument.",
    category: "Design Systems",
    publishedDate: "2026-06-17",
    readingTime: "6 min read",
    author: "Subin",
    status: "Published",
    seed: 89,
    cover: "why",
    content: [
      { type: "lead", text: "The weakest reason to adopt a design system is that things should match. Consistency is a symptom of a good system, not the point of one. The point is that the same team ships more, faster, at lower cost, with fewer regressions." },
      { heading: "Ad hoc parts have a compounding tax", paragraphs: [
        "Without a system, every screen re-decides the same things: what a button looks like, how a modal traps focus, which gray a card uses. Each decision is cheap once and ruinous a hundred times, because they drift apart and someone has to reconcile them later.",
        "That reconciliation is invisible on any single ticket and enormous across a year. It is the tax you pay for having no shared answer.",
      ] },
      { type: "visual", kind: "drift-demo", caption: "The cost made visible: hardcoded values scatter, a shared token holds. Multiply by every surface." },
      { heading: "A system converts decisions into defaults", paragraphs: [
        "The move a system makes is simple: decide once, then make that decision the default everywhere. A button is not re-argued; it is imported. Accessibility is not re-implemented; it is inherited. The team spends its judgement on the product, not on re-deriving the basics.",
        "That is where the speed comes from. Not from working harder, but from stopping the re-work.",
      ] },
      { type: "callout", tone: "note", title: "The benefit is felt, not mandated", body: "Teams adopt a system when it is genuinely the fastest way to ship, not because a policy says so. If adoption needs enforcement, the system is not yet easier than the alternative. Fix that, not the policy." },
      { heading: "What you actually buy", paragraphs: [
        "Three things, concretely: less time from brief to shipped screen, less engineering spent rebuilding the same UI per team, and fewer accessibility and visual regressions because the hard parts are solved centrally.",
        "None of those is consistency. Consistency is just what it looks like from the outside.",
      ] },
      {
        heading: "The honest costs of a system",
        paragraphs: [
          "A system is not free, and pretending otherwise is how they lose trust. There is real upfront investment to build the foundations, an ongoing cost to maintain and govern them, and a discipline tax on teams who must compose and contribute rather than improvise. Those costs are the reason a system has to be genuinely easier than the alternative to survive.",
          "The case still holds, because the cost of not having one is larger and hidden: the same work redone per team, the drift reconciled later, the accessibility bugs fixed five times. A system moves cost from invisible and recurring to visible and shrinking. That trade is the whole argument.",
        ],
      },
      { type: "quote", text: "Consistency is the shadow a good system casts. Chase the system, not the shadow.", cite: "On why systems" },
    ],
  },
  {
    title: "How to Use a Design System Effectively",
    slug: "using-a-design-system-effectively",
    excerpt:
      "A great system still fails in careless hands. Using one well is a small set of habits: compose don't fork, token don't hardcode, contribute don't route around.",
    category: "Guides",
    publishedDate: "2026-06-05",
    readingTime: "6 min read",
    author: "Subin",
    status: "Published",
    seed: 107,
    cover: "effective",
    content: [
      { type: "lead", text: "The best design system in the world still drifts if the people using it route around it. Using one well is not about rules; it is about a few habits that keep the system trustworthy for everyone else." },
      { heading: "Compose, do not fork", paragraphs: [
        "The most damaging habit is the private fork: copying a component to make one small change. It feels faster and it is, exactly once. After that it is a permanent liability that never receives another fix or improvement from the source.",
        "When a component does not do what you need, compose around it or file the gap. A fork solves your problem and quietly weakens the system for everyone.",
      ] },
      { type: "visual", kind: "practice-list", caption: "The habits that keep a system healthy, and the two that quietly erode it." },
      { heading: "Token, do not hardcode", paragraphs: [
        "Every raw value you type is a future drift and a screen that will not survive the next theme change. Style with semantic tokens even when a hardcoded value would be quicker, because the quick version is the one you pay for later.",
        "If the token you need does not exist, that is not permission to hardcode. It is a gap worth reporting.",
      ] },
      { type: "callout", tone: "tip", title: "Treat a missing token as a bug report", body: "The gaps you hit are the most valuable feedback the system gets. A reported gap makes the system better for everyone; a silent workaround makes it worse for everyone. Same effort, opposite outcome." },
      { heading: "Contribute, do not route around", paragraphs: [
        "A healthy system has a short path from need to contribution. Use it. When you push a fix or a new variant upstream, you convert your one-off effort into a shared asset, and you keep the source of truth actually true.",
        "The teams that get the most from a system are the ones that treat it as something they help maintain, not just something they consume.",
      ] },
      {
        heading: "Read the system before you extend it",
        paragraphs: [
          "Most reinvention happens because someone did not know the part already existed. Before building a new component or a new token, spend the five minutes to check what is there. The fastest teams treat the system's documentation as the first stop, not the last resort, and it saves them from shipping the third slightly different modal.",
          "Learning the vocabulary pays compound interest. Once you know the tokens and the components by name, composing on the system becomes faster than improvising against it, which is the entire point.",
        ],
      },
      { type: "quote", text: "A system is only as good as the habits of the people who use it. Compose, token, contribute.", cite: "On using systems well" },
    ],
  },
  {
    title: "How a Design System Accelerates Go-to-Market",
    slug: "gtm-acceleration",
    excerpt:
      "Speed to market is a UI problem more often than teams admit. A system turns weeks of assembly into days of composition.",
    category: "Business",
    publishedDate: "2026-06-09",
    readingTime: "5 min read",
    author: "Subin",
    status: "Published",
    seed: 97,
    cover: "gtm",
    content: [
      { type: "lead", text: "Most go-to-market delays are not strategy problems; they are assembly problems. The idea is ready, the interface is not, because someone is still deciding what a button looks like on the new page." },
      { heading: "The bottleneck is the last mile", paragraphs: [
        "Landing pages, onboarding flows, and pricing tables are where launches stall. Each one re-solves layout, states, and styling from close to zero, and each one waits on design review to catch the inconsistencies that re-solving introduced.",
        "A system removes that last mile. The parts already exist, already pass review, already match. Assembly replaces invention.",
      ] },
      { type: "visual", kind: "ship-bars", caption: "The same brief, three starting points. The system is the difference between weeks and days." },
      { heading: "Faster loops, not just faster builds", paragraphs: [
        "The compounding win is iteration speed. When a variant is a composition of existing parts, you can ship it, measure it, and change it in the time it used to take to build the first version. Marketing stops queuing behind engineering for pixel work.",
        "Speed to first ship matters. Speed to the tenth iteration matters more, and that is where a system pulls away.",
      ] },
      { type: "callout", tone: "tip", title: "Give marketing the same parts", body: "The fastest GTM teams build campaign pages from the same components as the product. One system across product and marketing means a launch page looks and behaves like the thing it is selling, on day one." },
      {
        heading: "Consistency is a trust signal at launch",
        paragraphs: [
          "Speed is the obvious benefit; credibility is the quiet one. A launch page that looks and behaves like the product it is selling signals that the company is coherent, and prospects read that coherence as trustworthiness before they read a word of copy. A page stitched from off-brand parts signals the opposite, no matter how good the offer.",
          "Because the same system powers product and marketing, that trust signal is free. You are not spending extra effort to look consistent; you are simply unable to look inconsistent.",
        ],
      },
      { type: "quote", text: "You cannot go to market faster than you can build the page. Fix the page and the calendar follows.", cite: "On GTM" },
    ],
  },
  {
    title: "Operating With 30% Less Front-End Engineering Cost",
    slug: "engineering-cost",
    excerpt:
      "The UI layer is quietly rebuilt over and over across teams. A system collapses that duplicated effort into shared, maintained parts.",
    category: "Business",
    publishedDate: "2026-05-30",
    readingTime: "6 min read",
    author: "Subin",
    status: "Published",
    seed: 101,
    cover: "cost",
    content: [
      { type: "lead", text: "Front-end cost hides in plain sight. It is not one big line item; it is the same work done slightly differently by every team, plus the maintenance of all those near-duplicates forever." },
      { heading: "Where the money actually goes", paragraphs: [
        "Count the real spend and a pattern appears: rebuilding common components, reconciling visual inconsistencies, fixing the same accessibility bug in five places, and the review time spent catching all of it. None of this ships product value. All of it recurs.",
        "A system attacks the recurrence. Build the button once, fix the bug once, review the pattern once, and every team inherits the result.",
      ] },
      { type: "visual", kind: "cost-bars", caption: "Relative front-end effort as the UI layer stops being rebuilt per team. The gap is maintenance you no longer pay." },
      { heading: "The saving is maintenance, not heroics", paragraphs: [
        "The headline number does not come from anyone typing faster. It comes from deleting duplicated work: fewer components to maintain, fewer inconsistencies to reconcile, fewer regressions to chase. That is why the saving compounds instead of being a one-time cut.",
        "It also redirects senior time. Engineers who were maintaining the fifth modal are now on product problems only your company has.",
      ] },
      { type: "callout", tone: "note", title: "Measure before you claim", body: "A number like thirty percent is real only if you baseline it. Track component coverage, forked variants, and time-to-ship before and after. Let the system earn the figure instead of asserting it." },
      { type: "list", heading: "The cost the system removes", items: [
        "Rebuilding the same components on every team.",
        "Reconciling grays, spacing, and states that drifted apart.",
        "Fixing one accessibility bug in many separate copies.",
        "Review time spent catching all of the above.",
      ] },
      {
        heading: "The cost curve bends the other way",
        paragraphs: [
          "Without a system, front-end cost rises with every new team and surface, because each one adds more UI to build and more near-duplicates to maintain. With a system, the curve bends: the foundations are a fixed investment, and each new surface draws on them at a shrinking marginal cost. The savings are not a one-time cut; they compound as you grow.",
          "That is why the number gets better over time rather than worse. You are not trimming a budget once; you are changing the shape of the cost curve.",
        ],
      },
      { type: "quote", text: "You do not cut front-end cost by working faster. You cut it by stopping the same work from happening twice.", cite: "On engineering cost" },
    ],
  },
  {
    title: "How a Design System Scales, and Where It Breaks",
    slug: "scaling-a-design-system",
    excerpt:
      "Scaling is not adding more components. It is keeping one source of truth trustworthy as teams, platforms, and brands multiply.",
    category: "Design Systems",
    publishedDate: "2026-05-24",
    readingTime: "7 min read",
    author: "Subin",
    status: "Published",
    seed: 103,
    cover: "scale",
    content: [
      { type: "lead", text: "A design system does not scale by growing bigger. It scales by staying trustworthy: one source of truth that more teams, platforms, and brands can lean on without it bending under the weight." },
      { heading: "Marginal cost is the real metric", paragraphs: [
        "The question is not how many components you have. It is what the ninth surface costs once you have eight. In a system that scales, that cost trends toward zero, because the new surface inherits tokens, components, and accessibility already decided.",
        "When the marginal cost of a new surface starts rising instead of falling, the system has stopped scaling, whatever its component count says.",
      ] },
      { type: "visual", kind: "scale-fan", caption: "One source feeding many surfaces. Scaling means the next surface is nearly free." },
      { heading: "The layers absorb the growth", paragraphs: [
        "Scale stresses the boundaries. A new brand stresses the token layer; if colors are intent-named, it is a mode, not a fork. A new framework stresses the component layer; if behaviour is headless, you port the skin, not the accessibility. A new platform stresses the pipeline; if tokens are generated, it is another output target.",
        "Each axis of growth is absorbed by the layer built for it, provided the layers were kept honest.",
      ] },
      { type: "callout", tone: "warn", title: "Governance is what actually breaks", body: "Systems rarely fail on technology. They fail when contribution takes six weeks, requests vanish, and teams fork to survive. Scale the process, not just the code: open triage, a real cadence, and forks treated as signal." },
      { heading: "Scaling is a trust problem", paragraphs: [
        "At small scale you can hold the system in your head. At large scale you cannot, so teams rely on guarantees instead: versioning they can plan around, deprecations that give them runway, and audits that keep the source of truth true.",
        "Those guarantees are the actual product once you scale. The components are just the most visible part of it.",
      ] },
      {
        heading: "Documentation is the interface that scales",
        paragraphs: [
          "At small scale, people learn the system by asking the person who built it. That does not survive growth. The artifact that scales is documentation: honest, current, and specific about what is built, what is not, and how to use each part. A system nobody can learn without a meeting has already hit its ceiling.",
          "Good docs are also the first line of governance. When the right way is easy to find and unambiguous, teams follow it, and the source of truth stays true without anyone policing it.",
        ],
      },
      { type: "quote", text: "A system scales when the next surface is nearly free, and it stops the moment forking is faster than contributing.", cite: "On scale" },
    ],
  },
  {
    title: "What a Design Audit Is, and How to Run One",
    slug: "design-audit",
    excerpt:
      "An audit is not a redesign. It is an inventory of what your product actually renders, ranked by how much each inconsistency hurts.",
    category: "Process",
    publishedDate: "2026-05-18",
    readingTime: "6 min read",
    author: "Subin",
    status: "Published",
    seed: 109,
    cover: "audit",
    content: [
      { type: "lead", text: "A design audit is not an opinion about how the product should look. It is a factual inventory of how it looks right now: every color, spacing, component, and state actually in use, and where they disagree." },
      { heading: "Inventory before judgement", paragraphs: [
        "The first pass is counting, not fixing. Pull every distinct value the product renders: how many grays, how many button variants, how many modal implementations, how many spacings between 12 and 16 pixels. The raw counts are usually the shock that motivates the work.",
        "Only once you can see the real inventory does it make sense to decide what should be canonical and what is drift.",
      ] },
      { type: "visual", kind: "audit-findings", caption: "A findings list, ranked by harm: accessibility and drift first, cosmetic duplicates after." },
      { heading: "Rank by harm, not by ease", paragraphs: [
        "Not all inconsistencies are equal. A contrast failure is an accessibility defect that can exclude real users; four grays for one surface is drift that costs maintenance; two near-identical spacings is cosmetic. Rank findings by how much each one hurts, then fix in that order.",
        "This is what keeps an audit from becoming a cosmetic cleanup that misses the defects that actually matter.",
      ] },
      { type: "callout", tone: "warn", title: "An audit without a pipeline just repeats", body: "Cleaning up today does nothing about tomorrow. Pair every audit with the architecture and lint that stop the same drift from returning, or you will run the identical audit again in two quarters." },
      { heading: "Turn findings into tokens", paragraphs: [
        "The output of a good audit is not a slide deck; it is a set of decisions encoded into the system. Each canonical value becomes a token, each canonical pattern becomes a component, and each defect becomes a fix plus the guardrail that prevents its return.",
        "Done that way, an audit is not a recurring chore. It is the moment a product's real state gets folded back into its source of truth.",
      ] },
      {
        heading: "Automate the parts a person cannot hold",
        paragraphs: [
          "A human auditor is good at judgement and bad at counting. Flip the work to match. Let tooling enumerate the raw inventory, every color, spacing, and shadow the codebase actually renders, and reserve the human for deciding what should be canonical. Counting by hand is where audits get abandoned halfway.",
          "Once the inventory is generated rather than gathered, the audit becomes repeatable. You can run it every release and watch the numbers move, instead of treating it as a heroic one-off that decays the moment it ends.",
        ],
      },
      { type: "quote", text: "An audit measures reality. A system is what keeps reality from drifting again.", cite: "On design audits" },
    ],
  },
  {
    title: "How to Automate a Design System",
    slug: "automate-a-design-system",
    excerpt:
      "The parts that survive are the parts a machine maintains. Automate the pipeline from source of truth to every platform, and drift loses its opening.",
    category: "Automation",
    publishedDate: "2026-05-12",
    readingTime: "7 min read",
    author: "Subin",
    status: "Published",
    seed: 113,
    cover: "automate",
    content: [
      { type: "lead", text: "Manual steps in a design system are where it slowly dies. Anything a person has to remember to do, they will eventually forget under deadline. Automation is how a system keeps its promises without depending on anyone's memory." },
      { heading: "Automate the boundary, not the taste", paragraphs: [
        "You do not automate the design decisions; those are human judgement. You automate the boundary around them: turning the decided values into code, propagating them to every platform, and catching anything that violates them.",
        "That distinction keeps automation useful. It removes toil and enforcement, and leaves the actual design to people.",
      ] },
      { type: "visual", kind: "token-pipeline", caption: "Source to platforms, on publish. The transform is code, versioned like any other." },
      { heading: "The pipeline, end to end", paragraphs: [
        "It has a small number of stages. Export the source of truth on publish. Transform it into platform tokens for web, iOS, and Android. Open a pull request automatically so changes are reviewed like code. Lint component styles so a raw hex or pixel fails the build. Version and release on a cadence teams can plan around.",
        "Each stage removes a manual step that used to be a place for drift to enter.",
      ] },
      { type: "callout", tone: "tip", title: "Make drift a build failure", body: "The highest-leverage automation is the humble lint. When a hardcoded value fails a pull request instead of surfacing in an audit two quarters later, drift stops being a cleanup project and becomes a five-minute fix." },
      { heading: "AI is the newest stage, not a replacement", paragraphs: [
        "Generation belongs in the pipeline, not outside it. An agent that reads your tokens and components can scaffold on-system code quickly, and the same lint that guards human commits guards its output too. Speed at the front, guardrails at the back.",
        "The goal never changes: the system keeps itself true, so people can spend their attention on the product rather than on policing consistency.",
      ] },
      { type: "list", ordered: true, heading: "A design system that maintains itself", items: [
        "Export the source of truth on publish.",
        "Generate platform tokens automatically.",
        "Open a pull request for every change, reviewed like code.",
        "Lint for raw values so drift fails the build.",
        "Version and release on a predictable cadence.",
      ] },
      {
        heading: "Start with one stage, not the whole pipeline",
        paragraphs: [
          "The pipeline sounds like a large project, which is how it never gets started. It should not be built all at once. Ship one stage that removes real pain, usually the lint that fails a raw value in review, and let it prove itself. Each stage you add earns the next by removing a manual step people were tired of.",
          "Automation is most trustworthy when it grows this way, one honest improvement at a time, rather than arriving as a big framework everyone has to adopt on faith.",
        ],
      },
      { type: "quote", text: "The parts of a system that last are the parts a machine maintains. Everything manual is borrowed time.", cite: "On automation" },
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
