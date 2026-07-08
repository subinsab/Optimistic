# Button — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Forms (16/54) | **Status:** Stable

---

## Overview

Triggers actions and events across the interface. Buttons communicate calls to action to the user and allow them to interact with pages in a variety of ways. Use **Primary** for the main CTA, **Secondary** for alternative actions, **Tertiary** for low-emphasis interactions, **Error** for destructive operations, **Success** for confirmations, and **Special** for branding moments.

---

## Variants

| Variant   | Background    | Text    | Border        | Use Case                        |
|-----------|---------------|---------|---------------|---------------------------------|
| Primary   | `#FE5104`     | `#fff`  | none          | Main call-to-action             |
| Secondary | transparent   | `#FE5104` | `1.5px solid #FE5104` | Alternative action    |
| Tertiary  | transparent   | `#475467` | none        | Low-emphasis / ghost            |
| Error     | `#CD3546`     | `#fff`  | none          | Destructive action              |
| Success   | `#3F902B`     | `#fff`  | none          | Confirmation / positive action  |
| Special   | `#121926`     | `#fff`  | none          | Brand / high-contrast moment    |

---

## Sizes

| Size | Height | Horizontal Padding | Font Size | Icon Size |
|------|--------|-------------------|-----------|-----------|
| L    | 44px   | 20px              | 16px      | 16–18px   |
| M    | 36px   | 16px              | 14px      | 14–16px   |
| S    | 28px   | 12px              | 12px      | 12–14px   |

---

## Measurements

| Property         | Value              |
|------------------|--------------------|
| Border radius    | 8px                |
| Icon gap         | 8px                |
| Font weight      | 600 (SemiBold)     |
| Font family      | Inter          |
| Transition       | 150ms ease         |
| Active transform | scale(0.97)        |
| Disabled opacity | 0.4                |
| Spinner size     | 14 × 14px          |
| Spinner border   | 2px                |

---

## States

- **Default** — base style per variant
- **Hover** — slightly darker background or light tint overlay
- **Active / Pressed** — `transform: scale(0.97)`
- **Disabled** — `opacity: 0.4`, `cursor: not-allowed`, no pointer events
- **Loading** — spinner (14px, white) + optional "Loading…" label, button not clickable

---

## Color Tokens

| Token              | Light Mode  | Dark Mode   | Usage                    |
|--------------------|-------------|-------------|--------------------------|
| `--accent`         | `#FE5104`   | `#FE5104`   | Primary button bg        |
| `--accent-hover`   | `#E84800`   | `#E84800`   | Primary hover bg         |
| `--checked`        | `#4065C5`   | `#4065C5`   | Checked / selected state |
| `--error`          | `#CD3546`   | `#CD3546`   | Error button bg          |
| `--success`        | `#3F902B`   | `#3F902B`   | Success button bg        |
| `--special`        | `#121926`   | `#1E2836`   | Special button bg        |

---

## Anatomy

1. **Container** — `<button>` or `<a>` element with `.ym-btn`, variant class, and size class
2. **Leading Icon** (optional) — 14–18px SVG, gap: 8px
3. **Label** — Inter SemiBold, single line
4. **Trailing Icon** (optional) — same spec as leading
5. **Spinner** (loading state) — 14px circle, white border, animated rotation

---

## Usage Rules

- Always use **Primary** for one dominant action per view
- Never use more than one Primary button in the same button group
- **Secondary** and **Tertiary** work alongside Primary for secondary actions
- Use **Error** only for destructive, irreversible actions (delete, remove, revoke)
- Icon-only buttons must include `aria-label` for accessibility
- Loading state disables the button and replaces/prepends label with spinner

---

## HTML

```html
<!-- Primary Large -->
<button class="ym-btn primary btn-l">Primary</button>

<!-- Secondary Medium -->
<button class="ym-btn secondary btn-m">Secondary</button>

<!-- Tertiary Small -->
<button class="ym-btn tertiary btn-s">Tertiary</button>

<!-- Error Medium -->
<button class="ym-btn error btn-m">Delete</button>

<!-- Success Medium -->
<button class="ym-btn success btn-m">Confirm</button>

<!-- Special Medium -->
<button class="ym-btn special btn-m">Special</button>

<!-- With Icon (Medium) -->
<button class="ym-btn primary btn-m">
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M7.5 1v13M1 7.5h13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
  </svg>
  Add Client
</button>

<!-- Disabled -->
<button class="ym-btn primary btn-m" disabled>Disabled</button>

<!-- Loading -->
<button class="ym-btn primary btn-m" disabled>
  <span class="btn-spinner"></span>
  Loading…
</button>
```

---

## CSS

```css
.ym-btn {
  font-family: 'Inter', -apple-system, sans-serif;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 150ms, opacity 150ms, transform 100ms, box-shadow 150ms;
  white-space: nowrap;
  text-decoration: none;
}
.ym-btn:active:not(:disabled) { transform: scale(0.97); }
.ym-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* Sizes */
.ym-btn.btn-l { height: 44px; padding: 0 20px; font-size: 16px; }
.ym-btn.btn-m { height: 36px; padding: 0 16px; font-size: 14px; }
.ym-btn.btn-s { height: 28px; padding: 0 12px; font-size: 12px; }

/* Variants */
.ym-btn.primary   { background: #FE5104; color: #fff; }
.ym-btn.primary:hover:not(:disabled)   { background: #E84800; }

.ym-btn.secondary { background: transparent; border: 1.5px solid #FE5104; color: #FE5104; }
.ym-btn.secondary:hover:not(:disabled) { background: rgba(254,81,4,.06); }

.ym-btn.tertiary  { background: transparent; color: #475467; }
.ym-btn.tertiary:hover:not(:disabled)  { background: var(--bg-inset); color: #344054; }

.ym-btn.error   { background: #CD3546; color: #fff; }
.ym-btn.error:hover:not(:disabled)   { background: #B82E3C; }

.ym-btn.success { background: #3F902B; color: #fff; }
.ym-btn.success:hover:not(:disabled) { background: #347824; }

.ym-btn.special { background: #121926; color: #fff; }
.ym-btn.special:hover:not(:disabled) { background: #0A1018; }

/* Loading spinner */
.btn-spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: btnSpin 0.7s linear infinite;
  flex-shrink: 0;
}
@keyframes btnSpin { to { transform: rotate(360deg); } }
```

---

## React

```tsx
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'special';
type ButtonSize = 'l' | 'm' | 's';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'm',
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`ym-btn ${variant} btn-${size} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner" aria-hidden="true" />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
};

// Usage
// <Button variant="primary" size="m">Add Client</Button>
// <Button variant="error" size="m" loading>Deleting…</Button>
// <Button variant="secondary" size="l" leftIcon={<PlusIcon />}>Create</Button>
```

---

## Accessibility

- Use `<button>` for actions, `<a>` for navigation
- Disabled state: `disabled` attribute (no need for `aria-disabled` separately)
- Loading state: add `aria-busy="true"` on the button
- Icon-only buttons: always add `aria-label="Description"`
- Focus ring is inherited from `styles.css` global focus styles (`outline: 2px solid var(--accent)`)

---

## Related Components

- **Input** (`input.html`) — text field often paired with a submit button
- **Toggle** (`toggle.html`) — boolean on/off action, alternative to button
- **Dropdown** (`dropdown.html`) — button that opens a menu of actions
- **FAB** (`fab.html`) — floating action button for primary screen action
- **Modal** (`modal.html`) — confirmation dialogs typically contain Error + Tertiary buttons

---

*Yubi Market Design System · Button v1.0.0 · Internal Use*
