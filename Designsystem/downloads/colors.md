# Yubi Market — Color Token Reference for Claude

> **How to use:** Upload this file to Claude and say "Use the Yubi Market color system." Claude will reference these exact tokens, hex values, and rules for any UI work.

**Version:** 1.0.0 | **Palettes:** 15 | **Semantic tokens:** 40+ | **Last updated:** 2026-03-18

---

## Quick Reference — Key Values

| Purpose | Token | Hex |
|---|---|---|
| Primary action / brand | `color.action.brand.default` | `#FD7149` |
| Brand hover | `color.action.brand.hover` | `#FD5E32` |
| Brand active/pressed | `color.action.brand.active` | `#FC3A04` |
| Page background | `color.bg.page` | `#F8FAFC` |
| Card / panel | `color.bg.panel` | `#FFFFFF` |
| Primary text | `color.text.primary` | `#121926` |
| Secondary text | `color.text.secondary` | `#697586` |
| Default border | `color.border.default` | `#E3E8EF` |
| Focus ring | `color.border.focus` | `#81AFF2` |
| Success | `color.feedback.success.icon` | `#3F902B` |
| Error | `color.feedback.error.icon` | `#CD3546` |
| Warning | `color.feedback.warning.icon` | `#F79009` |
| Info / Special | `color.action.special.default` | `#4065C5` |

---

## Rules Claude Must Follow

1. **Always use tokens, never raw hex** in component code. Raw hex is only acceptable in the token definition itself.
2. **Max 1 brand primary** (`#FD7149`) per interactive section — use secondary/ghost variants for supporting actions.
3. **Warning text on white:** `yellow.500` (#F79009) fails WCAG AA for small text. Use `yellow.700` (#B85008) for body-sized warning text.
4. **Brand orange on white** (#FD7149) is AA-Large only — don't use as small body text color.
5. **Focus rings** must always use `color.border.focus` (`#81AFF2`). Never a custom value.
6. **Feedback sets** must always be applied as a full set: bg + border + icon + text. Never use a single feedback color in isolation.
7. **Neutral text** hierarchy: primary (#121926) → secondary (#697586) → muted (#9AA3B2) → disabled (#CDD5DF).

---

## Core Color Palettes (Primitives)

### Brand — Orange

| Token | Hex |
|---|---|
| `brand.50` | `#FFF3EE` |
| `brand.100` | `#FFE4D6` |
| `brand.200` | `#FFC9AD` |
| `brand.300` | `#FFAA80` |
| `brand.400` | `#FD8A5E` |
| `brand.500` | `#FD7149` ← primary |
| `brand.600` | `#FD5E32` ← hover |
| `brand.700` | `#FC3A04` ← active |
| `brand.800` | `#C92E00` |
| `brand.900` | `#9A2300` |

### Red (Error)

| Token | Hex |
|---|---|
| `red.50` | `#FFF1F1` |
| `red.100` | `#FFE0E0` |
| `red.200` | `#FFBFBF` |
| `red.300` | `#FF9090` |
| `red.400` | `#FF5C5C` |
| `red.500` | `#E02828` |
| `red.600` | `#CD3546` ← error default |
| `red.700` | `#A81C31` |
| `red.800` | `#871426` |
| `red.900` | `#65101C` |

### Green (Success)

| Token | Hex |
|---|---|
| `green.50` | `#F0FDF4` |
| `green.100` | `#DCFCE8` |
| `green.200` | `#B8F5D0` |
| `green.300` | `#82ECA8` |
| `green.400` | `#4ADE80` |
| `green.500` | `#22C55E` |
| `green.600` | `#3F902B` ← success default |
| `green.700` | `#15803D` |
| `green.800` | `#166534` |
| `green.900` | `#14532D` |

### Yellow (Warning / Caution)

| Token | Hex |
|---|---|
| `yellow.50` | `#FFFBEB` |
| `yellow.100` | `#FFF0C2` |
| `yellow.200` | `#FEDF84` |
| `yellow.300` | `#FCC840` |
| `yellow.400` | `#F9B812` |
| `yellow.500` | `#F79009` ← caution default |
| `yellow.600` | `#DC6B02` |
| `yellow.700` | `#B85008` ← AA-safe text |
| `yellow.800` | `#953D0C` |
| `yellow.900` | `#7A3010` |

### Blue (Info / Special)

| Token | Hex |
|---|---|
| `blue.50` | `#EFF6FF` |
| `blue.100` | `#DBEAFE` |
| `blue.200` | `#BFDBFE` |
| `blue.300` | `#93C5FD` |
| `blue.400` | `#60A5FA` |
| `blue.500` | `#3B82F6` |
| `blue.600` | `#4065C5` ← special default |
| `blue.700` | `#1D4ED8` |
| `blue.800` | `#1E40AF` |
| `blue.900` | `#1E3A8A` |

### Purple

| Token | Hex |
|---|---|
| `purple.50` | `#FAF5FF` |
| `purple.200` | `#E9D5FF` |
| `purple.400` | `#C084FC` |
| `purple.600` | `#9333EA` ← default |
| `purple.700` | `#7E22CE` |
| `purple.900` | `#581C87` |

### Pink

| Token | Hex |
|---|---|
| `pink.50` | `#FFF0F7` |
| `pink.300` | `#FF7DC0` |
| `pink.500` | `#E0178B` ← default |
| `pink.700` | `#950D5D` |

### Teal

| Token | Hex |
|---|---|
| `teal.50` | `#F0FDFB` |
| `teal.300` | `#5EEAD4` |
| `teal.500` | `#14B8A6` |
| `teal.600` | `#0D9488` ← default |
| `teal.800` | `#115E59` |

### Cyan

| Token | Hex |
|---|---|
| `cyan.50` | `#ECFEFF` |
| `cyan.300` | `#67E8F9` |
| `cyan.500` | `#06B6D4` |
| `cyan.600` | `#0891B2` ← default |

### Indigo

| Token | Hex |
|---|---|
| `indigo.50` | `#EEF2FF` |
| `indigo.400` | `#818CF8` |
| `indigo.500` | `#6366F1` |
| `indigo.600` | `#4F46E5` ← default |

### Maroon

| Token | Hex |
|---|---|
| `maroon.50` | `#FFF0F0` |
| `maroon.500` | `#C01E1E` |
| `maroon.600` | `#9E1717` ← default |
| `maroon.700` | `#7C1212` |

### Lime (Brand Accent)

| Token | Hex |
|---|---|
| `lime.50` | `#FAFEE7` |
| `lime.400` | `#DCDC5B` ← brand accent (logo) |
| `lime.600` | `#9EA32A` |

### Sky (Brand Accent / Focus)

| Token | Hex |
|---|---|
| `sky.50` | `#EFF8FF` |
| `sky.400` | `#81AFF2` ← brand accent (logo) + focus ring |
| `sky.600` | `#3A7ED8` |

### Neutral — Cool Gray

| Token | Hex | Role |
|---|---|---|
| `neutral.0` | `#FFFFFF` | White |
| `neutral.50` | `#F8FAFC` | Page background |
| `neutral.100` | `#F1F5F9` | Inset / code bg |
| `neutral.200` | `#E3E8EF` | Card border |
| `neutral.300` | `#CDD5DF` | Strong border |
| `neutral.400` | `#9AA3B2` | Muted / disabled text |
| `neutral.500` | `#697586` | Body text |
| `neutral.600` | `#4B5565` | Supporting text |
| `neutral.700` | `#364152` | Dark label |
| `neutral.800` | `#202939` | Near-black |
| `neutral.900` | `#121926` | Headline text |

### Neutral — Warm Gray

| Token | Hex |
|---|---|
| `warmgray.50` | `#FAFAFA` |
| `warmgray.200` | `#EDEDED` |
| `warmgray.500` | `#737373` |
| `warmgray.700` | `#404040` |
| `warmgray.900` | `#171717` |

---

## Semantic Tokens

### Action

| Token | Hex | Maps to |
|---|---|---|
| `color.action.brand.default` | `#FD7149` | brand.500 |
| `color.action.brand.hover` | `#FD5E32` | brand.600 |
| `color.action.brand.active` | `#FC3A04` | brand.700 |
| `color.action.brand.disabled` | `#FFC9AD` | brand.200 |
| `color.action.brand.subtle` | `#FFF3EE` | brand.50 |
| `color.action.secondary.default` | `#E3E8EF` | neutral.200 |
| `color.action.secondary.hover` | `#CDD5DF` | neutral.300 |
| `color.action.danger.default` | `#CD3546` | red.600 |
| `color.action.danger.hover` | `#A81C31` | red.700 |
| `color.action.danger.subtle` | `#FFF1F1` | red.50 |
| `color.action.special.default` | `#4065C5` | blue.600 |
| `color.action.special.hover` | `#1D4ED8` | blue.700 |

### Background

| Token | Hex | Maps to |
|---|---|---|
| `color.bg.page` | `#F8FAFC` | neutral.50 |
| `color.bg.panel` | `#FFFFFF` | neutral.0 |
| `color.bg.inset` | `#F1F5F9` | neutral.100 |
| `color.bg.subtle` | `#E3E8EF` | neutral.200 |
| `color.bg.brand.subtle` | `#FFF3EE` | brand.50 |
| `color.bg.brand.bold` | `#FD7149` | brand.500 |
| `color.bg.special.subtle` | `#EFF6FF` | blue.50 |
| `color.bg.special.bold` | `#4065C5` | blue.600 |
| `color.bg.overlay` | `rgba(0,0,0,0.45)` | — |

### Text

| Token | Hex | Maps to |
|---|---|---|
| `color.text.primary` | `#121926` | neutral.900 |
| `color.text.secondary` | `#697586` | neutral.500 |
| `color.text.muted` | `#9AA3B2` | neutral.400 |
| `color.text.disabled` | `#CDD5DF` | neutral.300 |
| `color.text.inverse` | `#FFFFFF` | neutral.0 |
| `color.text.brand` | `#FD7149` | brand.500 |
| `color.text.link` | `#4065C5` | blue.600 |
| `color.text.success` | `#3F902B` | green.600 |
| `color.text.error` | `#CD3546` | red.600 |
| `color.text.warning` | `#B85008` | yellow.700 |
| `color.text.info` | `#4065C5` | blue.600 |

### Border

| Token | Hex | Maps to |
|---|---|---|
| `color.border.default` | `#E3E8EF` | neutral.200 |
| `color.border.strong` | `#CDD5DF` | neutral.300 |
| `color.border.focus` | `#81AFF2` | sky.400 |
| `color.border.brand` | `#FD7149` | brand.500 |
| `color.border.success` | `#3F902B` | green.600 |
| `color.border.error` | `#CD3546` | red.600 |
| `color.border.warning` | `#F79009` | yellow.500 |
| `color.border.info` | `#4065C5` | blue.600 |

---

## Feedback Token Sets

Use the full set together — bg + border + icon + text.

### Success
| Token | Hex |
|---|---|
| `color.feedback.success.bg` | `#F0FDF4` |
| `color.feedback.success.border` | `#B8F5D0` |
| `color.feedback.success.icon` | `#3F902B` |
| `color.feedback.success.text` | `#166534` |

### Error
| Token | Hex |
|---|---|
| `color.feedback.error.bg` | `#FFF1F1` |
| `color.feedback.error.border` | `#FFBFBF` |
| `color.feedback.error.icon` | `#CD3546` |
| `color.feedback.error.text` | `#871426` |

### Warning
| Token | Hex |
|---|---|
| `color.feedback.warning.bg` | `#FFFBEB` |
| `color.feedback.warning.border` | `#FEDF84` |
| `color.feedback.warning.icon` | `#F79009` |
| `color.feedback.warning.text` | `#7A3010` |

### Info
| Token | Hex |
|---|---|
| `color.feedback.info.bg` | `#EFF6FF` |
| `color.feedback.info.border` | `#BFDBFE` |
| `color.feedback.info.icon` | `#4065C5` |
| `color.feedback.info.text` | `#1E3A8A` |

---

## Chart Colors

### Categorical (use in order for data series)
1. `#FD7149` — Brand Orange
2. `#4065C5` — Special Blue
3. `#3F902B` — Green
4. `#F79009` — Amber
5. `#9333EA` — Purple
6. `#0D9488` — Teal
7. `#E0178B` — Pink
8. `#6366F1` — Indigo
9. `#14B8A6` — Cyan
10. `#C01E1E` — Maroon
11. `#FD5E32` — Brand–2
12. `#60A5FA` — Sky
13. `#22C55E` — Mint
14. `#DCDC5B` — Lime
15. `#C084FC` — Violet
16. `#5EEAD4` — Aqua
17. `#FF7DC0` — Rose
18. `#818CF8` — Periwinkle
19. `#FCC840` — Gold
20. `#697586` — Slate

### Sequential Scales
- **Brand:** `#FFF3EE` → `#FD7149` → `#9A2300`
- **Blue:** `#EFF6FF` → `#4065C5` → `#1E3A8A`
- **Green:** `#F0FDF4` → `#3F902B` → `#14532D`

### Feedback Chart Colors
| State | Default | Light | Muted | Subtle |
|---|---|---|---|---|
| Success | `#3F902B` | `#22C55E` | `#82ECA8` | `#DCFCE8` |
| Error | `#CD3546` | `#E02828` | `#FF9090` | `#FFE0E0` |
| Warning | `#F79009` | `#F9B812` | `#FCC840` | `#FFF0C2` |
| Info | `#4065C5` | `#3B82F6` | `#93C5FD` | `#DBEAFE` |

---

## CSS Custom Properties

```css
:root {
  /* Brand */
  --color-brand-50: #FFF3EE; --color-brand-100: #FFE4D6;
  --color-brand-200: #FFC9AD; --color-brand-300: #FFAA80;
  --color-brand-400: #FD8A5E; --color-brand-500: #FD7149;
  --color-brand-600: #FD5E32; --color-brand-700: #FC3A04;
  --color-brand-800: #C92E00; --color-brand-900: #9A2300;

  /* Red */
  --color-red-50: #FFF1F1; --color-red-200: #FFBFBF;
  --color-red-400: #FF5C5C; --color-red-600: #CD3546;
  --color-red-700: #A81C31; --color-red-800: #871426;

  /* Green */
  --color-green-50: #F0FDF4; --color-green-200: #B8F5D0;
  --color-green-400: #4ADE80; --color-green-600: #3F902B;
  --color-green-700: #15803D; --color-green-800: #166534;

  /* Yellow */
  --color-yellow-50: #FFFBEB; --color-yellow-200: #FEDF84;
  --color-yellow-500: #F79009; --color-yellow-700: #B85008;
  --color-yellow-900: #7A3010;

  /* Blue */
  --color-blue-50: #EFF6FF; --color-blue-200: #BFDBFE;
  --color-blue-400: #60A5FA; --color-blue-600: #4065C5;
  --color-blue-700: #1D4ED8; --color-blue-900: #1E3A8A;

  /* Neutral */
  --color-neutral-0: #FFFFFF; --color-neutral-50: #F8FAFC;
  --color-neutral-100: #F1F5F9; --color-neutral-200: #E3E8EF;
  --color-neutral-300: #CDD5DF; --color-neutral-400: #9AA3B2;
  --color-neutral-500: #697586; --color-neutral-600: #4B5565;
  --color-neutral-700: #364152; --color-neutral-800: #202939;
  --color-neutral-900: #121926;

  /* Semantic — Action */
  --color-action-brand:         #FD7149;
  --color-action-brand-hover:   #FD5E32;
  --color-action-brand-active:  #FC3A04;
  --color-action-brand-subtle:  #FFF3EE;
  --color-action-danger:        #CD3546;
  --color-action-special:       #4065C5;

  /* Semantic — Background */
  --color-bg-page:         #F8FAFC;
  --color-bg-panel:        #FFFFFF;
  --color-bg-inset:        #F1F5F9;
  --color-bg-brand-subtle: #FFF3EE;
  --color-bg-brand-bold:   #FD7149;
  --color-bg-overlay:      rgba(0,0,0,0.45);

  /* Semantic — Text */
  --color-text-primary:   #121926;
  --color-text-secondary: #697586;
  --color-text-muted:     #9AA3B2;
  --color-text-disabled:  #CDD5DF;
  --color-text-inverse:   #FFFFFF;
  --color-text-brand:     #FD7149;
  --color-text-link:      #4065C5;
  --color-text-success:   #3F902B;
  --color-text-error:     #CD3546;
  --color-text-warning:   #B85008;

  /* Semantic — Border */
  --color-border-default: #E3E8EF;
  --color-border-strong:  #CDD5DF;
  --color-border-focus:   #81AFF2;
  --color-border-brand:   #FD7149;
  --color-border-error:   #CD3546;

  /* Feedback */
  --color-success-bg: #F0FDF4; --color-success-border: #B8F5D0;
  --color-success-icon: #3F902B; --color-success-text: #166534;

  --color-error-bg: #FFF1F1; --color-error-border: #FFBFBF;
  --color-error-icon: #CD3546; --color-error-text: #871426;

  --color-warning-bg: #FFFBEB; --color-warning-border: #FEDF84;
  --color-warning-icon: #F79009; --color-warning-text: #7A3010;

  --color-info-bg: #EFF6FF; --color-info-border: #BFDBFE;
  --color-info-icon: #4065C5; --color-info-text: #1E3A8A;
}
```

---

*Yubi Market Design System · Color Token Reference v1.0.0*
*Upload this file to Claude for full color system context.*
