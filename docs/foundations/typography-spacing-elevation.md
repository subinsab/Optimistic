# Typography, spacing, elevation, radius

## Typography

- **Inter** exclusively (system fallbacks in the font stack). **Fragment Mono** for code, tokens, hex.
- **Two weights only:** Regular (400), Bold (700). Never Light/Medium/SemiBold/Black.
- **Named scale only** — D1–D3, H1–H6, B1–B4, S1–S5, T1–T2. No arbitrary sizes.
- **Composite `text-style.*` tokens** bundle family + weight + size + line-height + letter-spacing for each role (`heading-3`, `body-3`, `label`, `eyebrow`, `badge`, `table-header`, `code`, …). Use these as Figma text styles and as the basis for `.yds-text-*` utilities.

| Token | Use |
|---|---|
| `text-style.display-1..3` | Hero / marketing |
| `text-style.heading-1..6` | Page titles, section + card headers |
| `text-style.body-1..4` | Paragraphs, form content |
| `text-style.label` | Form labels, button text (S1, 13/700) |
| `text-style.helper` | Helper / error (S2, 12/400) |
| `text-style.eyebrow` | ALL CAPS section labels (S3, 11/700) |
| `text-style.table-header` | ALL CAPS column headers (T1, 10/700) |

Source: [`tokens/primitive/typography.json`](../../tokens/primitive/typography.json), [`tokens/semantic/typography.json`](../../tokens/semantic/typography.json).

## Spacing

8px base unit. **Tokens only**, never arbitrary px. `space.025` (2px) → `space.1000` (80px). Related elements get smaller spacing; unrelated get larger. See [`dimension.json`](../../tokens/primitive/dimension.json).

| Scope | Range | Tokens |
|---|---|---|
| Tight internal | 2–8px | `space.025`–`space.100` |
| Component padding | 12–24px | `space.150`–`space.300` |
| Section / page | 32–80px | `space.400`–`space.1000` |

## Border radius

`radius.none` → `radius.full` (9999px). Buttons/inputs = `radius.md` (6px); default cards = `radius.xl` (12px); modals = `radius.2xl` (16px); pills/avatars/toggles = `radius.full`. Match child radius to parent minus padding.

## Elevation

Token-only shadows, mapped to z-layers. Higher layer ⇒ greater shadow.

| Token | Layer |
|---|---|
| `shadow.none` | Page surface |
| `shadow.sm` | Cards, panels |
| `shadow.md` | Dropdowns, card hover |
| `shadow.lg` | Popovers, date pickers |
| `shadow.xl` | Modals, drawers |
| `shadow.2xl` | Toasts |
| `shadow.inner` | Pressed / recessed |
| `shadow.focus` / `shadow.focus-error` | Focus rings |

Source: [`tokens/semantic/elevation.json`](../../tokens/semantic/elevation.json).

## Breakpoints & grid

Mobile-first, `min-width` only. `xs` 320 → `3xl` 1536. Grid: 4 cols (mobile) → 8 (md) → 12 (lg+). Content margin 20 → 40 → 56px. Tokens in [`tokens/semantic/layout.json`](../../tokens/semantic/layout.json).
