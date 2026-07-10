# Search — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Forms (25/54) | **Status:** Stable

---

## Overview

Search input with optional suggestions dropdown. Includes search-icon prefix, clear button, keyword highlighting in results, and keyboard navigation (↑ ↓ Enter Esc). Five variants: default, small, large, pill, and underline bar.

---

## Variants

| Variant  | Modifier class       | Description                              |
|----------|----------------------|------------------------------------------|
| Default  | `.ym-search`         | 40px height, 10px border-radius          |
| Small    | `.ym-search-sm`      | 34px height, 8px radius                  |
| Large    | `.ym-search-lg`      | 48px height, 12px radius                 |
| Pill     | `.ym-search-pill`    | 100px border-radius (capsule shape)      |
| Bar      | `.ym-search-bar`     | Borderless except bottom, transparent bg |

---

## Measurements

| Property               | Value                           |
|------------------------|---------------------------------|
| Height (sm)            | 34px                            |
| Height (default)       | 40px                            |
| Height (lg)            | 48px                            |
| Font                   | 14px / 400                      |
| Padding                | 0 40px (icon + clear gutters)   |
| Border                 | 1.5px solid var(--border)       |
| Border radius          | 10px (default), 100px (pill)    |
| Focus border           | #4065C5                         |
| Focus ring             | 0 0 0 3px rgba(64,101,197,.14)  |
| Clear button           | 22px circle, right 10px         |
| Dropdown offset        | 6px below input                 |
| Dropdown radius        | 12px                            |
| Dropdown shadow        | 0 8px 32px rgba(0,0,0,.12)      |
| Result item padding    | 9px 14px                        |
| Result title           | 13px / 600                      |
| Result subtitle        | 11px / 400 / text-3             |

---

## HTML

```html
<!-- Basic search -->
<div class="ym-search" role="search">
  <span class="ym-search-icon" aria-hidden="true">
    <!-- 16px search SVG -->
  </span>
  <input
    class="ym-search-input"
    type="search"
    placeholder="Search loans, borrowers…"
    aria-label="Search"
    aria-controls="searchDropdown"
    aria-autocomplete="list"
    oninput="handleSearchInput(this)"
    onkeydown="handleSearchKey(event)"
  />
  <button class="ym-search-clear" aria-label="Clear search" onclick="clearSearch()">
    <!-- × SVG -->
  </button>

  <!-- Suggestions dropdown -->
  <div class="ym-search-dropdown" id="searchDropdown" role="listbox">
    <div class="search-dropdown-section">Recent</div>
    <div class="search-dropdown-item" role="option">
      <div class="item-icon"><!-- SVG --></div>
      <div class="item-label">
        <div class="item-title">Working Capital Loan</div>
        <div class="item-sub">Loan type · #WCL-2024</div>
      </div>
      <span class="item-shortcut">↵</span>
    </div>
  </div>
</div>
```

---

## CSS

```css
.ym-search { position: relative; display: flex; align-items: center; }
.ym-search-icon { position: absolute; left: 14px; color: var(--text-3); pointer-events: none; }
.ym-search-input {
  width: 100%; height: 40px; padding: 0 40px;
  font-size: 14px;
  background: var(--bg-panel); border: 1.5px solid var(--border); border-radius: 10px;
  color: var(--text-1); outline: none;
  transition: border-color 160ms, box-shadow 160ms;
}
.ym-search-input:focus { border-color: #4065C5; box-shadow: 0 0 0 3px rgba(64,101,197,.14); }
.ym-search-clear {
  position: absolute; right: 10px;
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--border); border: none; display: none;
  align-items: center; justify-content: center; cursor: pointer;
}
.ym-search-input:not(:placeholder-shown) + .ym-search-clear { display: flex; }

.ym-search-dropdown {
  position: absolute; top: calc(100% + 6px); left: 0; right: 0;
  background: var(--bg-panel); border: 1px solid var(--border);
  border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,.12); z-index: 100; display: none;
}
.ym-search-dropdown.open { display: block; }
.search-dropdown-section { padding: 8px 14px 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--text-3); }
.search-dropdown-item { display: flex; align-items: center; gap: 10px; padding: 9px 14px; cursor: pointer; }
.search-dropdown-item:hover { background: var(--bg-inset); }
mark.search-highlight { background: rgba(64,101,197,.2); color: #4065C5; border-radius: 2px; }

/* Size variants */
.ym-search-sm .ym-search-input { height: 34px; font-size: 13px; border-radius: 8px; }
.ym-search-lg .ym-search-input { height: 48px; font-size: 15px; border-radius: 12px; }
.ym-search-pill .ym-search-input { border-radius: 100px; }
.ym-search-bar .ym-search-input { border-radius: 0; border: none; border-bottom: 1.5px solid var(--border); background: transparent; }
.ym-search-bar .ym-search-input:focus { box-shadow: none; border-bottom-color: #4065C5; }
```

---

## JavaScript

```javascript
const RESULTS = [
  { title: 'Working Capital Loan', sub: 'Loan type' },
  { title: 'Invoice Discounting', sub: 'Product category' },
  { title: 'Aditya Birla Finance', sub: 'Lender · AAA rated' },
];

function highlight(text, query) {
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')})`, 'gi');
  return text.replace(re, '<mark class="search-highlight">$1</mark>');
}

function handleSearchInput(input) {
  const query = input.value.trim().toLowerCase();
  const dropdown = document.getElementById('searchDropdown');
  if (!query) { dropdown.classList.remove('open'); return; }
  const filtered = RESULTS.filter(r => r.title.toLowerCase().includes(query));
  dropdown.innerHTML = filtered.length
    ? filtered.map(r => `<div class="search-dropdown-item">
        <div class="item-label"><div class="item-title">${highlight(r.title, query)}</div></div>
      </div>`).join('')
    : `<div class="search-no-results">No results for "${query}"</div>`;
  dropdown.classList.add('open');
}

function handleSearchKey(e) {
  const items = [...document.querySelectorAll('.search-dropdown-item')];
  const cur = items.findIndex(i => i.classList.contains('highlighted'));
  if      (e.key === 'ArrowDown') { e.preventDefault(); items[cur]?.classList.remove('highlighted'); items[Math.min(cur+1, items.length-1)]?.classList.add('highlighted'); }
  else if (e.key === 'ArrowUp')   { e.preventDefault(); items[cur]?.classList.remove('highlighted'); items[Math.max(cur-1, 0)]?.classList.add('highlighted'); }
  else if (e.key === 'Enter' && cur >= 0) { items[cur].click(); }
  else if (e.key === 'Escape') { document.getElementById('searchDropdown').classList.remove('open'); }
}
```

---

## Accessibility

- Wrap in `role="search"` landmark
- Input: `aria-label="Search"`, `aria-controls="dropdownId"`, `aria-autocomplete="list"`, `aria-expanded="true/false"`
- Dropdown: `role="listbox"`, each item `role="option"`, highlighted item `aria-selected="true"`
- Clear button: `aria-label="Clear search"`
- Section header in dropdown: `aria-label` or `role="group"` with label

---

## Related Components

- **Input** (`input.html`) — base text input
- **Filter** (`filter.html`) — collapsible filter groups
- **Popover** (`popover.html`) — floating container pattern used by dropdown

---

*Yubi Market Design System · Search v1.0.0 · Internal Use*
