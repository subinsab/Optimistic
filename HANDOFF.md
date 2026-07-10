# Optimistic — Session Handoff (resume here)

_Paste this whole file into a new chat to continue exactly from here. Written 2026-07-08._

---

## 0. First rules (read before doing anything)

- **AGENTS.md rule:** this is a modified Next.js — read `node_modules/next/dist/docs/` before writing Next code. (App Router; dynamic route `params` is a **Promise** — `await params`.)
- **Hold until go:** propose, then wait for explicit user go. Build **one thing at a time**.
- **Voice:** NEVER use em-dashes (—) in any site/doc/UI copy. Natural human sentences. 20% metaphor / 20% philosophical / 60% on-point.
- **Dark-only site.** Theme toggle removed; `data-theme=dark` forced. Don't re-add a toggle.
- **Git:** branch **`Feature2`**, working LOCAL-ONLY, **everything uncommitted** (all this design-system work). NEVER push unless told. `main` also holds a separate Yubi monorepo under `packages/` — don't clobber. **A local commit is very overdue — offer one at the next natural stop.**

## 1. What this is

**"Optimistic"** — a free/open-source, headless, atomic design system. Named after the *optimistic-update* UI pattern (render success first, reconcile after). Brand: dark field (#0B0B0B) + small pixel units + exactly **one warm accent #FF7A00** placed up-and-to-the-right. Site = Next.js (App Router) + CSS modules. Fonts: **Inter** (variable, Display via `font-variation-settings:"opsz" 32`) + **Geist Mono**.

## 2. Site pages — ALL BUILT & on brand

Home (`app/page.tsx` §A–§K), Philosophy, Community, Contact/"Let's talk", Blog, and the **Components docs area** (`app/components/`). Nav CTA is the only above-fold action on home.

Shared systems (don't regress): titles = Inter Display w300 `clamp(2.2rem,1rem+4vw,4.6rem)` ls -0.04em #f4f5f6; leads 1.15rem lh1.65 #9aa0a8; eyebrows mono 0.7rem ls .22em #8a8f9a. Section padding-block `clamp(64px,8vh,100px)`. Hairlines #1e1e1e; page bg #0B0B0B; inset panels #0e0f12.

## 3. ★ COMPONENT PAGES — LOCKED CANONICAL TEMPLATE = the Button page

**User directive: every component page replicates the Button page 1:1. Do NOT change the section set/order without explicit go.**

**Canonical 9-section order** (all in `<X>Doc.tsx`): 1) Resource row (Figma link + "Start building with Claude"). 2) Live Demo — Fully Interactive (tabbed client `<X>Demo.tsx`). 3) Configuration (`<X>Configurator.tsx`: chip controls + live preview on dot-grid + framework-aware code line). 4) Behavior — The Engineering Contract (Props table + Events/keyboard table + live behavior demos incl. an optimistic/async one — often a `<X>Behavior.tsx`). 5) Anatomy (specimen + numbered parts). 6) Do's & Don'ts (2-col `.ddGrid`). 7) In context: Examples (3 `.ctxCard`). 8) Measurements & Tokens (`.tokTable`). 9) Code (`CodeTabs`: HTML/CSS/React/Angular/Async·API). → then `RelatedSection`.

**Anatomy pointer system:** BLUE numbered layer = `.anaBadge` (bg #3e63dd) + connector (dashed #5b8cff), legend `.anaNum #5b8cff`; orange highlights mark elements. Two connector helpers: Button/Toggle style = `.anaMark` (badge above, vertical `.anaConn`, inline `height`); overlay/picker style = `.ovAnaWrap` + `.ovAnaMark` (horizontal dashed `.ovAnaLine`, `.ovAnaFlip` to point left). **Connectors MUST touch each part — VERIFY BY MEASUREMENT (getBoundingClientRect), never eyeball.** GOTCHA: a specimen whose root has `overflow-y:auto` (e.g. `.omodal`) computes overflow-x to auto and CLIPS badges that stick out — add inline `overflow:visible` on the anatomy specimen.

**Architecture:** `app/components/[slug]/page.tsx` dispatches `slug → <X>Doc` else `Scaffold`. Shared: `CodeTabs.tsx`, `RelatedSection.tsx`. **Registry = single source of truth `app/components/_data/registry.ts`** (8 Foundations numbered / 54 Components in 6 cats / 2 Layouts; `built:true` drives "● documented" vs "in assembly"). Docs shell = `layout.tsx` + `SidebarNav.tsx`. **ALL component CSS is in one file `app/components/docs.module.css`** (`.obtn`/`.oinput`/`.otoggle`/`.ochk`/`.oradio`/`.obadge`/`.otag`/`.ocallout` + per-component families like `.ocal*` date, `.otime*` time, `.ofil*` filter, `.ov*` overlays).

**Colour rules (all components):** warm/brand **#FF7A00**, ONE per view. Colored-fill buttons/controls use WHITE label+icon (user's look-over-AA choice); white-bg Primary #F4F4F5 keeps dark #121212; Quiet = #9aa0a8. Semantic: success #1FA35C, error #EB4A4F, info/blue #3E63DD. Sizes L/M/S = 44/36/28. Checkboxes/selection use the warm check.

## 4. DONE — ~48 of 54 components (READ registry.ts for the live list)

**Navigation (100%):** sidebar, topnav, breadcrumbs, tabs, pagination, link, commandmenu. **Forms:** button, splitbutton, input, textarea, checkbox, radio, choicebox, toggle, dropdown, combobox, search, slider, pininput, upload, **datepicker, timepicker**. **Data Display:** list, avatar, badge, tags, pills, indicator, logo, skeleton, keyboardinput. **Feedback:** snackbar, loader, progress, callout, stepper, emptystate. **Overlays (100%):** modal, drawer, popover, tooltip, bottomsheet. **Layout:** accordion, divider, **filter**, fab, menu.

Recently built / heavily iterated (2026-07-07 → 07-08):
- **Overlays batch** (modal/drawer/popover/tooltip/bottomsheet): all render INSIDE a bounded `.ovStage` (not the viewport) so `.demoPanel{overflow:hidden}` never clips them; shared `.ov*` chrome (scrim/head/body/foot); tooltip is pure-CSS `:hover`+`:focus-within`.
- **Date Picker** (`DatePickerDemo.tsx` exports reusable `Calendar`): day/month/year jump views, single + range, min/max, keyboard, `fmtSlash` DD/Mon/YYYY. "In a field" tab = a configurable playground (Size S/M/L, Mode, Auto close, Confirm button); clear-on-hover trigger (a `<div role=button>` so the clear `<button>` doesn't nest); confirm variant stages behind Cancel/Apply.
- **Time Picker** (`TimePickerDemo.tsx` exports `TimePicker`): scroll-wheel columns (hr/min/period). Cells now share the **date-picker day spec: 32×32, 0.8rem, radius 8**, selected fills orange via `.otimeVal`; `.otime` width 184, wheel 136 (4 rows), AM/PM centred on the selected row, ratio ~1.33. Hours 1–12, minutes 0–59 (step 1 default). Field variant = transparent `.opop` wrapper so the picker's own card is the only surface (matches standalone). Confirm-button config via `footerActions` prop (Cancel/Apply replace the readout+Now, in-card).
- **Filter** (`FilterDemo.tsx`, from user Figma refs): 3 parts — horizontal **bar** (search + controlled `QuickFilter` chips + All filters + Clear all), **quick-filter trigger** (`.ofilChip` `<div role=button>` + blue count `.ofilChipCount` + caret + clear ✕ → `.opop` checkbox dropdown), and vertical **panel** (`.ofilPanel`: head+count+close, tabs w/ warm underline that switch content via `TAB_SECTIONS`, collapsible sections w/ search + capped-6 list + "+N more", footer Save/Clear/Apply). "All filters" opens the panel as a right **drawer** (`.ofilDrawer` slide + `.ovScrim`, `FilterPanel flush`). "Save filter" = inline name form → removable saved chips. Panel variants: `rounded`/`closable` props → **Square variant** (`.ofilPanelSquare`, no radius, no close) for embedding flush. Colour map: count/view-active/section-dot = blue #3e63dd; tab-underline + Apply = warm; link actions #5b8cff.

## 5. NEXT — continue here (user's priority order)

Build the next batch (same 9-section template + 4-file pattern `<X>Demo` + `<X>Configurator` + `<X>Behavior` + `<X>Doc`, wire `page.tsx` dispatch + set `built:true` in registry):
**Grid** (slug `gridcomp`) · **Code Block** (slug `codeblock`) · **Table** · **Notification** · **Icon** · **Illustration**.

Also open: the **8 Foundations pages** (colors/typography/spacing/grid/elevation/radius/breakpoints/principles — still Scaffold) + 2 **Layouts** (sidemenu-with-navbar, form-layout); CMS wiring for /blog (articles.ts has em-dashes to strip when touched); warm-arc logo propagation decision; **the local commit**.

## 6. HOW TO WORK (hard-won recipes)

- **Verify visually.** `preview_start` name **"optimistic"** (port 3000; Next 16 = ONE `next dev` per dir — if "another server running", it's another chat's → `kill <PID>` then start). `preview_eval` to navigate/measure DOM, `preview_screenshot` to see it, `preview_console_logs` errors.
- **The preview tab doesn't paint rAF/CSS transitions in the background** — an open overlay/dropdown reads `opacity:0` mid-transition even when correct. To verify final state: inject `*{transition:none!important}` then screenshot, or test the cascade with a synthetic element. CSS `:hover` ignores synthetic `mouseover` — use programmatic `.focus()` + `:focus-within`, and React `onMouseEnter` fires on a `mouseover` dispatch (not `mouseenter`).
- **Measure, don't eyeball** anatomy connectors and alignment via `getBoundingClientRect`.
- **Controlled `<input>` in preview:** set `Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,val)` then dispatch `new Event('input',{bubbles:true})` — a stale element ref (after tab switches) won't update React; re-query the element first.
- **Nested-button hydration trap:** never put a `<button>` inside a `<button>` (e.g. a clear ✕ inside a chip/field trigger). Make the outer element a `<div role="button" tabIndex=0>` with Enter/Space handlers.
- **Overflow clipping:** demos live in `.demoPanel{overflow:hidden}`; anything that opens (popover/dropdown/drawer) must fit — bump the tab's `demoStage` `minHeight` (measure `pop.bottom - stage.top`) or bound it in a relative `overflow:hidden` wrapper.
- **Console buffer is STICKY** — it keeps old errors across reloads and even on unrelated pages, and `console.clear()` doesn't clear it. To confirm a fix, install your OWN `console.error` counter before interacting, or re-fetch the route HTML. A "no console logs" after a real fix is trustworthy; a persistent identical error on a page that can't produce it is stale.
- **`page.tsx` imports EVERY `<X>Doc`** — one bad JSX import breaks ALL `[slug]` routes. Check tag balance on dense one-line JSX.
- **Round all computed SVG coords** (2dp) — raw trig floats break hydration.
- **Same-URL `window.location.href` may NOT reload** (Next soft-nav / no-op) — navigate via a different route first to force a fresh mount when you need clean state.

## 7. Auto-memory

A detailed live memory auto-loads in this project (`optimistic-handoff.md` = the ▶ RESUME block with full per-component detail/history, plus `optimistic-branding.md`, `optimistic-design-system.md`, etc.). **That memory is the finest-grained source; this HANDOFF.md is the portable snapshot.** On resume, trust `registry.ts` for the live built-list over any prose here.
