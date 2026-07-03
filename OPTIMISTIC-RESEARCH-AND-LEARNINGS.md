# Optimistic — Design System: Research, Inputs & Learnings

> A consolidated record of everything provided and learned while planning and
> building the **Optimistic** design system and its marketing site.
> Last updated: 2026‑06‑29.

---

## 1. Project Overview

- **Name:** Optimistic (referred to as "optimistic").
- **What it is:** A design system with a strong **philosophy** built around it as its foundation.
- **Positioning themes:** AI‑friendly, plug‑and‑play components, reduce go‑to‑market (GTM) time, idea → shipped UI faster.
- **Target frameworks:** Components must ship for **React, Angular, and both** — plus HTML/CSS and a Figma kit. Tokens are framework‑agnostic (plain CSS variables) so they feed every framework.

---

## 2. Site Structure (original brief)

1. **"optimism" landing page** — the 5 W questions answered at a high level (why we're building, AI‑friendly, reduce GTM, plug‑and‑play, etc.).
   - Content reference: Material 3 (https://m3.material.io/)
   - Style reference: Armory (https://armory.framer.ai/)
2. **Philosophy** — a strong, well‑written philosophy section. Great writing matters.
3. **Components** — full component list (below); each documented with the 19‑point template.
4. **Community** — join / establish community, contribute.
5. **Let's talk** — contact.

---

## 3. The 5 W's (landing-page framing)

| W | Question | High‑level answer |
|---|----------|-------------------|
| **Why** | Why build Optimistic? | Collapse the distance between a good idea and shipped UI; stop rebuilding the same button. |
| **What** | What is it? | A complete, token‑driven system: foundations, accessible components, production code for React + Angular, with Figma + docs in sync. |
| **Who** | Who is it for? | Designers, engineers, and the AI agents building alongside them — one shared source of truth. |
| **When** | When to use it? | From first wireframe to final ship and every iteration between. |
| **Where** | Where does it run? | Anywhere the web does — React, Angular, plain HTML, Figma, AI tooling. |

---

## 4. Component Documentation Template (19‑point structure)

Every component page should include, in this order:

1. Sizing
2. Spacing
3. Usage
4. UX principles
5. UI principles
6. Motion
7. Motion principles
8. Why
9. Usage
10. What to do and what not to do
11. Download component (package + demo, Figma links)
12. Production code (HTML, CSS, React, Angular)
13. Tokens
14. Foundations
15. Anatomy
16. Types
17. Constraints
18. Do's and don'ts
19. Demo display with multiple use cases

---

## 5. Component & Foundation Scope

Modeled on the reference build at `~/Downloads/yubi-market-design-system 2` (one HTML page per item + shared `styles.css`).

**Foundations:** Color · Typography · Spacing · Radius · Elevation · Grid · Breakpoints · Icon · Logo · Illustration · Principles

**Components (~55):** accordion, avatar, badge, bottomsheet, breadcrumbs, button, callout, chatinterface, checkbox, choicebox, codeblock, combobox, commandmenu, datepicker, divider, drawer, dropdown, emptystate, fab, filter, form‑layout, grid, indicator, input, keyboardinput, link, list, loader, menu, modal, notification, pagination, pills, pininput, popover, progress, radio, search, sidebar, sidemenu+navbar, skeleton, slider, snackbar, splitbutton, stepper, table, tabs, tags, textarea, timepicker, toggle, tooltip, topnav, upload

**Example flows / screens:** auth · add‑client‑flow · dashboard (my‑clients) · my‑clients

---

## 6. Reference Design Systems (benchmarks)

Study these for structure, documentation depth, philosophy, and patterns:

- Ant Design — https://ant.design/
- Shopify Polaris — https://polaris-react.shopify.com/getting-started
- IBM Carbon — https://carbondesignsystem.com/
- Apple Human Interface Guidelines — https://developer.apple.com/design/human-interface-guidelines
- Twilio Paste — https://paste.twilio.design/introduction/about-paste
- Material 3 — https://m3.material.io/
- Atlassian Design — https://atlassian.design/get-started
- Uber Base (a11y‑first) — https://base.uber.com/6d2425e9f/p/4462ce-a11y-first-process
- Microsoft Fluent 2 (accessibility) — https://fluent2.microsoft.design/accessibility

> The Uber Base and Fluent links point specifically at **accessibility** material — a signal that a11y should be a first‑class concern in Optimistic.

---

## 7. Build Plan (agreed order)

1. **Website** — site shell + the "optimism" landing page. ✅
2. **Component template** — the reusable 19‑point documentation page. ⏳
3. **Create components** — build ONE component first, then a "go" before each next set.
4. **Other pages** — Philosophy, Community, Let's talk, foundations. (largely covered)

**Working rules:** build incrementally, **pause for confirmation** between steps and between component sets; **ask before building**.

---

## 8. Tech Stack (decisions)

- **Docs/marketing site:** **Next.js 16** (App Router, TypeScript, Turbopack), **no Tailwind** — plain CSS + CSS‑variable design tokens (kept framework‑agnostic so the same tokens can later feed React **and** Angular components).
- **Fonts:** **Inter** (sans / display feel via light weights) + **Geist Mono** (monospace, labels, spec‑style titles).
- **3D / WebGL:** Three.js + React Three Fiber (for the particle hero background).
- **Default theme:** dark (with light theme + toggle, persisted to `localStorage`).

---

## 9. Brand & Visual Direction

- **Original DS brand ("dawn"):** sunrise gradient — Amber `#FFB020` → Coral `#FF6B6B` → Violet `#8B5CF6`. Used across the design‑system pages.
- **Premium AI‑agency palette (scoped to the premium home):** Background `#070707`, Surface `#111111`, Borders `rgba(255,255,255,0.08)`, Primary text `#FFFFFF`, Secondary `#A0A0A0`, Accent **Electric Blue `#5B8CFF`**, Secondary **Purple `#8A5CFF`**, Glow `rgba(91,140,255,0.25)`.
- **Token system:** fluid type scale via `clamp()`, 4px spacing scale, radius scale, motion tokens (durations + easings), light/dark theme blocks — all as CSS variables.

---

## 10. Learnings & Decisions (captured along the way)

### Typography
- **Match Armory's type system:** large headings in **Inter Display feel at LIGHT weights (300–500)**, not heavy bold; **Geist Mono** for eyebrows, section labels, stat labels, and spec‑style card titles (e.g. "Prime Logic"–style titles).
- "Inter Display" isn't a separate Google Fonts family (it's Inter's large optical size); use **Inter at light weights** for the equivalent elegant display look.

### Fonts wiring (Next.js gotcha)
- The `next/font` CSS variables must be placed on the **`<html>`** element, not `<body>`. If `--font-sans`/`--font-mono` (composed at `:root`) reference a `var(--font-inter)` that is only defined on `<body>`, the nested `var()` resolves at the declaration site → **invalid → falls back to serif/Times**. Putting the font‑variable classes on `<html>` fixes it.

### WebGL particle background
- Render via **React Three Fiber**; ~**160k GPU points** with a custom **GLSL** shader: simplex‑noise wave + **mouse repulsion with smooth (lerped) return** + additive glow (blue→purple). Orthographic camera.
- The R3F `<Canvas>` **cannot SSR** — load it through a client wrapper with `next/dynamic` `ssr:false`, with a CSS‑gradient fallback behind it. Cap DPR for smooth 60fps.

### Premium interaction kit
- Scroll‑reveal (IntersectionObserver), **count‑up numbers** on view, **cursor‑follow ambient glow**, **3D card tilt** with cursor‑tracked border glow, magnetic/lift buttons with sliding arrows, marquee logo strip, FAQ accordion.

### Project hygiene
- The project directory name has capitals, which **npm rejects** for `create-next-app`; scaffold into a lowercase subdir then move files up.

---

## 11. Premium Landing Spec (the "$100M AI company" brief)

**Design style:** enterprise‑luxury, dark UI (`#070707`), large bold typography, massive whitespace, minimalist, Apple × Linear × Vercel × Framer quality, clean geometric layouts, thin grid lines, frosted‑glass cards, soft radial gradients, premium shadows, smooth motion, high‑contrast type — technical yet approachable.

**Typography targets:** Headline 120–140px extra‑bold tight tracking · Body 18–20px · Section titles 48–64px · fonts in the Inter / Geist / Satoshi family.

**Layout:** full‑viewport hero · sticky transparent nav · 120–180px section spacing · 12‑column responsive grid · 24–32px radii · editorial, breathing layout.

**Sections:** Hero · Trusted by · Services · AI Capabilities · Interactive Workflow · Case Studies · Technology Stack · Metrics · Testimonials · Pricing · FAQ · Newsletter · Footer.

**Cards:** rounded glass, animated border glow, hover lift, soft blur, inner shadow, animated icons.

**Motion:** fade‑in, scroll reveal, scale 0.95→1, parallax, floating gradients, cursor‑follow glow, magnetic buttons, ripple, card tilt, number count‑up, section transitions, image zoom — 300–600ms easing, spring physics.

**Visual elements:** abstract neural networks, particle systems, gradient mesh, wireframe globes, AI node graphs, data‑flow animations, glass morphism, floating UI panels, minimal charts, 3D depth, noise texture, animated gradients.

**Buttons:** rounded pill, glass, gradient border, hover glow, micro‑scale, arrow nudges on hover.

**Images:** futuristic AI illustrations, abstract data viz, minimal dashboard mockups, 3D translucent shapes — **never stock people**.

**UI feel:** calm · confident · technical · luxury · minimal · editorial · premium SaaS · future‑ready.

**Performance:** optimized GPU‑accelerated transforms, lazy‑loaded assets, smooth 60fps scrolling, no layout shift; perfect on desktop, tablet‑optimized, mobile‑first, fluid typography.

### Bonus — WebGL hero prompt
> Fullscreen WebGL hero using Three.js / React Three Fiber. 150,000–300,000 tiny glowing particles arranged into a soft abstract gradient wave. On hover, nearby particles repel outward with spring physics and smoothly return. Subtle Perlin‑noise animation, depth parallax, bloom, ambient glow; varying particle opacity/size for depth. GPU shaders for high performance, smooth easing, 60fps. Premium, futuristic, elegant, minimal — like a luxury AI company's landing page.

---

## 12. Home Page — Section‑by‑Section Build Plan

Build the home **one section at a time** (A → B → C …), matching the Armory layout the user annotated, then move to other pages. Match **layout + interactions**; use **original/placeholder content + CSS‑generated visuals** (content swapped in later).

**Section map (top → bottom):**

- **A** — Hero (headline, nav, animated background)
- **B** — Intro paragraph + 4 feature‑icon row
- **C / D** — Stat callout band (e.g. 12ms / 18× / 99%)
- **E** — Dark "spark / bolt" feature section
- **F** — "Proven solutions" list rows
- **G / H / I** — "Build at scale": heading + UI‑mockup/sphere visual + feature columns
- **J / K** — "Optimized for performance": charts + big % stat card
- **L** — "Built for the long term": large visual + feature list
- **M / N / O** — "Engineered for autonomy": image cards + logo/icon grid
- **P / Q** — "Trusted by the pioneers": testimonial cards
- **R** — "Insights" blog cards
- FAQ "Common inquiries"
- CTA "Get smarter…"
- Giant wordmark footer

---

## 13. Intellectual‑Property Approach

- Armory is a **commercial Framer template**. Replicate only its **layout, structure, interactions, and overall feel** — write **original copy** and build **own/CSS‑generated visuals**; do **not** reproduce its proprietary text or image assets.
- Reference design systems (Ant, Polaris, Carbon, M3, etc.) are for **learning structure and best practices**, not verbatim copying.

---

## 14. Installed Skills (tooling)

Design/build skills installed to `~/.claude/skills/`: frontend‑design, ui‑ux‑pro‑max, theme‑factory, brand‑guidelines, canvas‑design, algorithmic‑art, web‑artifacts‑builder, webapp‑testing, skill‑creator, mcp‑builder, claude‑api, docx, pptx, xlsx, pdf, doc‑coauthoring, internal‑comms, slack‑gif‑creator.

---

## 15. Final Build State (home page)

The home page (`app/page.tsx`, styles `app/home.module.css`) is now a scroll page:

### Section A — full-screen live voxel city (`app/_components/CityScene.tsx`, lazy-loaded via `CityBackground.tsx`)
- **Stack:** Three.js + React Three Fiber, instanced for performance; charcoal `#111` background + fog; soft studio lighting + soft shadows.
- **Layout:** non-square grid **18 cols (X) × 14 rows (Z)**, ~30% wider than deep. Modular paved base + huge ground plane so the floor fills the viewport (no black side/bottom gaps).
- **Roads:** main (6u) + secondary (4u), white dashed center lines, zebra crossings. **One-way per road**; vehicles use **car-following** so they never overlap.
- **Buildings:** crisp tiled window textures (nearest-filter, no blur). Random mix of **B1 small**, **B3 office (+service tower)**, **B4 tall tower (vertical pilasters)**, and **half-size adjacent shop rows (2–3 units, no windows, striped awnings)**. Downtown cluster = navy slab towers + cream art-deco landmark.
- **Greenery:** ~3,000 instanced small trees + ~120 big trees (lush), green plots on empty lots.
- **Life:** multicolor cars, **green/blue buses**, yellow auto-rickshaws, vans, motorbikes — all with **tyres**; elevated **flyover** with its own traffic; **two-sided traffic lights** that cycle in sync; ~140 **slow pedestrians** on sidewalks (kept clear of vehicles).
- **Overlay copy:** eyebrow + "Build interfaces, **optimistically.**" (neon-orange `#ff7a1a` highlight) + subtext, with a scroll cue.

### Section B — editorial scroll-reveal (`app/_components/ScrollRevealText.tsx`)
- 3-column editorial layout: big heading (left), product **mockup card** (center, "Optimistic · Playground"), statement + mono **Features** list (right).
- Signature **grey→white per-word text reveal driven by scroll** on the heading and statement.

### Key technical learnings (this build)
- **Claude Preview runs the page hidden** → `requestAnimationFrame` is paused, so WebGL canvases don't paint/animate in the in-app preview (only DOM sections do). Everything renders in a real focused browser tab. Verify WebGL live, not via preview screenshots.
- R3F `<Canvas>` can't SSR → load via `next/dynamic` `ssr:false`. R3F doesn't auto-aim the camera → call `camera.lookAt()`.
- For a big instanced city: share building textures (no per-mesh clones), cap people/tree shadows, widen vehicle spacing — keeps it ~60fps.
- Run: `npm run dev` in the project → http://localhost:3000.

### Other site routes (built earlier)
`/philosophy`, `/components` (66-entry index), `/community`, `/contact` — shared SiteNav + Footer via `app/layout.tsx`; design-system token foundation in `app/globals.css`.

### Separate deliverable
`../vaultshield` — standalone Vite + React + Tailwind + Framer-Motion **VaultShield** hero (unrelated password-manager spec the user provided); not part of the Optimistic app.

---

*End of document.*
