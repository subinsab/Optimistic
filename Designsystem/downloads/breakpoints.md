# Yubi Market — Breakpoints Token Reference for Claude

> **How to use:** Upload this file to Claude and say "Use the Yubi Market breakpoint system." Claude will reference these exact tokens, values, and rules for any responsive layout work.

**Version:** 1.0.0 | **Breakpoints:** 7 | **Strategy:** Mobile-First | **Range:** 320px → 1536px

---

## Rules Claude Must Follow

1. **Mobile-first always** — write base styles for `xs` (320px), then override upward with `min-width` queries. Never write desktop-first `max-width` overrides.
2. **Named tokens only** — reference breakpoints by name (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`). Never use arbitrary pixel values in media queries.
3. **Navigation** — at `xs`/`sm`/`md` use a hamburger drawer; at `lg`+ use a fixed sidebar.
4. **Grid transitions** — 4 columns at `xs`/`sm`, 8 columns at `md`, 12 columns at `lg`+.
5. **Content margin** — 20px at `xs`/`sm`, 40px at `md`, 56px at `lg`+.
6. **No max-width queries** — avoid `@media (max-width: ...)` patterns. They create override debt.
7. **Typography scaling** — headings scale at breakpoints; always reference type scale tokens, not px values.

---

## Breakpoint Scale

| Token | Width | Device Target |
|---|---|---|
| `xs` | 320px | Small phones, portrait · base styles apply |
| `sm` | 480px | Large phones, landscape mode |
| `md` | 768px | Tablets, portrait · layout shifts begin |
| `lg` | 1024px | Tablets landscape, small laptops |
| `xl` | 1280px | Standard desktop · 12-col grid active |
| `2xl` | 1440px | Large monitors, full-HD displays |
| `3xl` | 1536px | Wide / ultra-wide screens, TV displays |

---

## Layout Behaviour

| Feature | xs / sm ≤ 767px | md 768–1023px | lg / xl 1024–1439px | 2xl / 3xl ≥ 1440px |
|---|---|---|---|---|
| Navigation | Hamburger drawer | Hamburger drawer | Fixed sidebar | Fixed sidebar |
| Grid columns | 4 | 8 | 12 | 12 |
| Content margin | 20px | 40px | 56px | 56px |
| Card layout | Single column | 2 columns | 3–4 columns | 4+ columns |
| Table display | Scroll / stacked | Scroll / stacked | Full table | Full table |
| Modal width | 100vw (bottom sheet) | 480px | 560px | 640px |
| Sidebar width | Off-canvas | Off-canvas | 240px | 272px |

---

## Responsive Typography

| Heading | xs / sm ≤ 767px | md 768–1023px | lg+ ≥ 1024px | Weight |
|---|---|---|---|---|
| h1 | 28px (H2 token) | 36px (H1 token) | 48px (D3 token) | 700 |
| h2 | 22px | 28px | 36px | 700 |
| h3 | 18px | 22px | 28px | 700 |

---

## Mobile-First Pattern

```css
/* Correct ✓ — base styles apply to xs, then override up */
.card {
  padding: var(--space-4);
  display: block;
  border-radius: var(--radius-lg);
}

@media (min-width: 768px) {
  .card {
    padding: var(--space-6);
  }
}

@media (min-width: 1024px) {
  .card {
    padding: var(--space-8);
  }
}

/* Wrong ✗ — desktop-first creates needless overrides */
.card {
  padding: var(--space-8);
}
@media (max-width: 767px) {
  .card {
    padding: var(--space-4); /* overriding creates debt */
  }
}
```

---

## CSS Custom Properties

```css
:root {
  --bp-xs:  320px;
  --bp-sm:  480px;
  --bp-md:  768px;
  --bp-lg:  1024px;
  --bp-xl:  1280px;
  --bp-2xl: 1440px;
  --bp-3xl: 1536px;
}

/* Usage */
@media (min-width: 768px)  { /* md and up */ }
@media (min-width: 1024px) { /* lg and up */ }
@media (min-width: 1280px) { /* xl and up */ }
@media (min-width: 1440px) { /* 2xl and up */ }
```

---

*Yubi Market Design System · Breakpoints Token Reference v1.0.0*
*Upload this file to Claude for full breakpoints system context.*
