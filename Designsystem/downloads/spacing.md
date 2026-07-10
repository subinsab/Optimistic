# Yubi Market — Spacing Token Reference for Claude

> **How to use:** Upload this file to Claude and say "Use the Yubi Market spacing system." Claude will reference these exact tokens, values, and rules for any UI work.

**Version:** 1.0.0 | **Base Unit:** 8px | **Scale Steps:** 14 | **Token Prefix:** `space.*`

---

## Rules Claude Must Follow

1. **8px base unit** — all spacing is a multiple of 8px (or a fractional sub-step: 2px, 4px, 6px for tight internals).
2. **Tokens only** — never use arbitrary px values. Always reference a named `space.*` token.
3. **Small (2–8px)** — use for tight internal component spacing: icon-to-label gaps, inline badge padding, input icon offsets.
4. **Medium (12–24px)** — use for component padding (buttons, cards, form fields), gaps between elements within a component.
5. **Large (32–80px)** — use for section separation, page margins, content area padding.
6. **Consistency** — elements that are related should have smaller spacing between them; unrelated elements should have larger spacing (proximity principle).
7. **No custom spacing** — if a value isn't in the scale, use the nearest token. Never invent spacing outside the scale.
8. **Vertical rhythm** — stacks of content should use consistent spacing tokens, not a mix of arbitrary values.

---

## Base Unit

| Property | Value |
|---|---|
| **Base unit** | 8px |
| **Sub-steps** | 2px, 4px, 6px (for tight component internals only) |
| **CSS var** | `--space-base: 8px` |
| **Token prefix** | `space.*` |

All multipliers reference 8px: `space.200` = 2 × 8px = 16px.

---

## Full Scale

### Small — Tight component internals

| Name | Token | Multiplier | Pixels | Use for |
|---|---|---|---|---|
| 2 | `space.025` | 0.25× | 2px | Icon margin, divider offset |
| 4 | `space.050` | 0.5× | 4px | Icon-to-label gap, badge padding |
| 6 | `space.075` | 0.75× | 6px | Chip padding, tight tag gap |
| 8 | `space.100` | 1× (base) | 8px | Inner padding, icon button spacing |

### Medium — Component padding & element gaps

| Name | Token | Multiplier | Pixels | Use for |
|---|---|---|---|---|
| 12 | `space.150` | 1.5× | 12px | Button padding (sm), input icon gap |
| 16 | `space.200` | 2× | 16px | Button padding (md), card inner gap |
| 20 | `space.250` | 2.5× | 20px | Form field padding, list item gap |
| 24 | `space.300` | 3× | 24px | Card padding, section header gap |

### Large — Section & layout spacing

| Name | Token | Multiplier | Pixels | Use for |
|---|---|---|---|---|
| 32 | `space.400` | 4× | 32px | Between form sections, card stack gap |
| 40 | `space.500` | 5× | 40px | Sidebar padding, modal padding |
| 48 | `space.600` | 6× | 48px | Page section gap, hero bottom padding |
| 64 | `space.800` | 8× | 64px | Between major page sections |
| 80 | `space.1000` | 10× | 80px | Page top/bottom padding on desktop |

---

## Component Spacing Patterns

### Button
| Size | Padding | Token |
|---|---|---|
| Small | 6px 12px | `space.075 space.150` |
| Medium | 8px 16px | `space.100 space.200` |
| Large | 12px 24px | `space.150 space.300` |

### Form Field
| Part | Spacing | Token |
|---|---|---|
| Label → Input gap | 4px | `space.050` |
| Input padding | 8px 12px | `space.100 space.150` |
| Input → Helper text | 4px | `space.050` |
| Between fields | 16px | `space.200` |

### Card
| Part | Spacing | Token |
|---|---|---|
| Card padding | 24px | `space.300` |
| Title → Body gap | 8px | `space.100` |
| Body → Action gap | 16px | `space.200` |
| Card-to-card gap | 16px | `space.200` |

### Table
| Part | Spacing | Token |
|---|---|---|
| Cell padding | 12px 16px | `space.150 space.200` |
| Header padding | 8px 16px | `space.100 space.200` |

### Navigation
| Part | Spacing | Token |
|---|---|---|
| Nav item padding | 8px 12px | `space.100 space.150` |
| Section group gap | 24px | `space.300` |
| Sidebar padding | 16px | `space.200` |

### Modal / Dialog
| Part | Spacing | Token |
|---|---|---|
| Modal padding | 32px | `space.400` |
| Header → Body | 20px | `space.250` |
| Body → Footer | 24px | `space.300` |

---

## Proximity Principles

### Arrange by Similarity
Keep similar/related items spaced tightly together (`space.050`–`space.100`). This signals that they belong to the same group. For example: status chips in a table row, icon + label pairs, grouped form fields.

### Organise by Closeness
Items that are related should be closer together than items that are unrelated. For example, a document title should be `space.050` from its metadata, but `space.400` from the next document.

### Establish Structure and Ranking
Use spacing to create visual hierarchy:
- Within a component: `space.050`–`space.150`
- Between components: `space.200`–`space.300`
- Between sections: `space.400`–`space.600`
- Between page blocks: `space.800`–`space.1000`

---

## CSS Custom Properties

```css
:root {
  --space-base: 8px;

  /* Small */
  --space-025: 2px;
  --space-050: 4px;
  --space-075: 6px;
  --space-100: 8px;

  /* Medium */
  --space-150: 12px;
  --space-200: 16px;
  --space-250: 20px;
  --space-300: 24px;

  /* Large */
  --space-400: 32px;
  --space-500: 40px;
  --space-600: 48px;
  --space-800: 64px;
  --space-1000: 80px;
}
```

---

*Yubi Market Design System · Spacing Token Reference v1.0.0*
*Upload this file to Claude for full spacing system context.*
