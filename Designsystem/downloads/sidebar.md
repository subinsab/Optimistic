# Yubi Market — Side Navigation Component Reference for Claude

> **How to use:** Upload this file to Claude and say "Use the Yubi Market side navigation component." Claude will reference these exact specs, tokens, and interaction rules.

**Version:** 1.0.0 | **Type:** Collapsible Side Navigation | **Behavior:** Hover-to-expand

---

## Rules Claude Must Follow

1. **Collapsed width:** 72px — only icons visible, no labels.
2. **Expanded width:** 240px — triggered on `mouseenter`, collapsed on `mouseleave`.
3. **Animation:** 300ms, `cubic-bezier(0.4, 0.0, 0.2, 1)` easing on all transitions.
4. **Logo morphs:** Icon-only logo shown when collapsed; full "Yubi Market" wordmark shown when expanded.
5. **Active state:** Active nav item label text turns `#FD7149` (brand orange). No background change on active.
6. **Hover state:** Inactive items get `#F9FAFB` background on hover (200ms transition). Active item has no hover background.
7. **Icon containers:** 32×32px, border `0.5px solid #EEF2F6`, `border-radius: 6px`.
8. **Icons:** 16×16px SVG, centered within icon container.
9. **Vista icon:** Gradient stroke `#FF5401 → #FFAA0D` (diagonal, 105.6°).
10. **All other icons:** Black stroke, `strokeWidth: 1.3`, `strokeLinecap: round`, `strokeLinejoin: round`.
11. **Labels:** Font Inter Medium (500), 12px, line-height 18px, `white-space: nowrap`, `overflow: hidden`.
12. **Z-axis:** Sidebar sits at `z-index: 10` and overlays content when expanded.

---

## Exact Measurements

| Property | Value |
|---|---|
| Collapsed width | 72px |
| Expanded width | 240px |
| Height | 100vh |
| Background | `#FFFFFF` |
| Right border | `1px solid #EDEDED` |
| Vertical padding (top & bottom) | 40px |
| Horizontal padding (left & right) | 24px |
| Logo container height | 32px |
| Logo bottom margin | 32px |
| Nav items gap | 12px |
| Nav item height | 32px |
| Nav item border-radius | 6px |
| Icon container size | 32×32px |
| Icon container border | `0.5px solid #EEF2F6` |
| Icon container border-radius | 6px |
| Icon size | 16×16px |
| Gap: icon → label | 8px |

---

## Colors

| Token | Hex | Use |
|---|---|---|
| Sidebar background | `#FFFFFF` | Sidebar surface |
| Right border | `#EDEDED` | Divides sidebar from content |
| Icon border | `#EEF2F6` | Icon container border |
| Active label | `#FD7149` | Active nav item text |
| Inactive label | `#121926` | Default nav item text |
| Hover background | `#F9FAFB` | Inactive item hover |
| Vista gradient start | `#FF5401` | Vista icon gradient |
| Vista gradient end | `#FFAA0D` | Vista icon gradient |

---

## Navigation Items

| ID | Label | Icon | Special |
|---|---|---|---|
| Vista | Vista | stars-02 | Gradient stroke (#FF5401 → #FFAA0D) |
| Bonds | Bonds | bond (document) | Black stroke |
| MutualFunds | Mutual Funds | bar-chart-circle-01 | Black stroke |
| FixedDeposits | Fixed Deposits | coins-stacked-03 | Black stroke |
| Insurance | Insurance | shield/frame | Black stroke |

---

## Interaction Pattern

```
Default (collapsed):
  width: 72px
  Logo: YM symbol icon visible (20.823×13.714px)
  Labels: hidden (width:0, opacity:0)
  Icons: visible

On mouseenter (expand):
  width: 240px → animate 300ms cubic-bezier(0.4,0,0.2,1)
  Logo: YM symbol fades out (opacity:0), full wordmark fades in (opacity:1)
  Labels: width:auto + opacity:1 → animate 300ms cubic-bezier(0.4,0,0.2,1)

On mouseleave (collapse):
  Reverses all expand animations

Click nav item:
  Active item label → color: #FD7149
  All other labels → color: #121926
  No background change on active item
  Background reset on previously active hover
```

---

## Logo SVG Paths (YM Symbol)

```svg
<!-- Yellow quarter-circle -->
<path d="M7.10887 0C7.10887 1.80099 7.46361 3.58434 8.15282 5.24823C8.84204 6.91212 9.85224 8.42397 11.1257 9.69746C12.3993 10.971 13.9111 11.9811 15.575 12.6703C17.239 13.3596 19.0223 13.7143 20.8233 13.7143V7.10878..." fill="#DCDC5B" />

<!-- Orange quarter-circle -->
<path d="M0 13.7143C1.80101 13.7143 3.58438 13.3596 5.2483 12.6703..." fill="#FE5104" />

<!-- Blue triangle -->
<path d="M13.7145 0L13.7142 0.0844125C13.7033 1.85669 13.349 3.61034..." fill="#81AFF2" />
```

---

## Nav Icon SVG Paths

```
Vista (stars-02):
M8.66602 2L9.82213 5.00591...
Gradient: linearGradient x1=6.5,y1=4 → x2=12.5,y2=12.5, #FF5401 → #FFAA0D

Bonds (document icon):
Fill path: M9.84398 15.79L7.98398 12.54...
Stroke path: M7.31667 6.65H3.31667...

Mutual Funds (bar-chart-circle):
M5.33398 8.66927V11.3359M10.6673 7.33594V11.3359M8.00065 4.66927V11.3359...

Fixed Deposits (coins-stacked):
M8.66732 3.33333C8.66732 4.06971 7.02569 4.66667...

Insurance (shield):
M8.00119 2C9.55841 3.37772 11.5908 4.09504...
```

---

## CSS Custom Properties

```css
.sidenav {
  width: 72px;
  height: 100vh;
  background: #FFFFFF;
  border-right: 1px solid #EDEDED;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: width 300ms cubic-bezier(0.4, 0.0, 0.2, 1);
  position: relative;
  z-index: 10;
  flex-shrink: 0;
}

.sidenav:hover {
  width: 240px;
}

.sidenav-logo {
  height: 32px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
}

.sidenav-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidenav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 200ms;
  border: none;
  background: transparent;
  padding: 0;
  width: 100%;
}

.sidenav-item:hover:not(.is-active) {
  background: #F9FAFB;
}

.sidenav-icon {
  width: 32px;
  height: 32px;
  border: 0.5px solid #EEF2F6;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sidenav-label {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  opacity: 0;
  transition: width 300ms cubic-bezier(0.4,0,0.2,1), opacity 300ms cubic-bezier(0.4,0,0.2,1);
  color: #121926;
}

.sidenav-item.is-active .sidenav-label {
  color: #FD7149;
}

.sidenav:hover .sidenav-label {
  width: auto;
  opacity: 1;
}
```

---

*Yubi Market Design System · Side Navigation Component Reference v1.0.0*
*Upload this file to Claude for full sidebar component context.*
