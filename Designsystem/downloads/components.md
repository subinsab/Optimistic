# Yubi Market Design System — Components Reference
> v1.0.0 · 45 components · 7 categories

Upload this file to Claude to get exact specs, variants, tokens, and production-ready code for every component.

---

## Table of Contents

| # | Component | Category | Status |
|---|-----------|----------|--------|
| 10 | [Side Navigation](#side-navigation) | Navigation | Stable |
| 11 | [Top Navigation](#top-navigation) | Navigation | Stable |
| 12 | [Breadcrumbs](#breadcrumbs) | Navigation | Stable |
| 13 | [Tabs](#tabs) | Navigation | Stable |
| 14 | [Pagination](#pagination) | Navigation | Stable |
| 15 | [Link](#link) | Navigation | Stable |
| 16 | [Button](#button) | Forms | Stable |
| 17 | [Input](#input) | Forms | Stable |
| 18 | [Textarea](#textarea) | Forms | Stable |
| 19 | [Checkbox](#checkbox) | Forms | Stable |
| 20 | [Radio](#radio) | Forms | Stable |
| 21 | [Toggle](#toggle) | Forms | Stable |
| 22 | [Dropdown / Select](#dropdown--select) | Forms | Stable |
| 23 | [Date Picker](#date-picker) | Forms | Stable |
| 24 | [Time Picker](#time-picker) | Forms | Stable |
| 25 | [Search](#search) | Forms | Stable |
| 26 | [Slider](#slider) | Forms | Stable |
| 27 | [Pin Input / OTP](#pin-input--otp) | Forms | Stable |
| 28 | [Upload](#upload) | Forms | Stable |
| 29 | [Table](#table) | Data Display | Stable |
| 30 | [List](#list) | Data Display | Stable |
| 31 | [Avatar](#avatar) | Data Display | Stable |
| 32 | [Badge](#badge) | Data Display | Stable |
| 33 | [Tags](#tags) | Data Display | Stable |
| 34 | [Pills](#pills) | Data Display | Stable |
| 35 | [Indicator](#indicator) | Data Display | Stable |
| 36 | [Logo](#logo) | Data Display | Stable |
| 37 | [Snackbar / Toast](#snackbar--toast) | Feedback | Stable |
| 38 | [Loader](#loader) | Feedback | Stable |
| 39 | [Notification](#notification) | Feedback | Stable |
| 40 | [Stepper](#stepper) | Feedback | Stable |
| 41 | [Modal / Dialog](#modal--dialog) | Overlays | Stable |
| 42 | [Drawer](#drawer) | Overlays | Stable |
| 43 | [Popover](#popover) | Overlays | Stable |
| 44 | [Tooltip](#tooltip) | Overlays | Stable |
| 45 | [Bottom Sheet](#bottom-sheet) | Overlays | Stable |
| 46 | [Accordion](#accordion) | Layout | Stable |
| 47 | [Divider](#divider) | Layout | Stable |
| 48 | [Filter](#filter) | Layout | Stable |
| 49 | [FAB](#fab--floating-action-button) | Layout | Stable |
| 50 | [Menu](#menu) | Layout | Stable |
| 51 | [Icon](#icon) | Layout | Stable |
| 52 | [Grid](#grid) | Layout | Stable |

---

## Design Tokens

```css
/* Colors */
--accent:       #FE5104   /* Primary orange — CTAs, active states */
--accent-dim:   rgba(254,81,4,.10)
--accent-text:  #C23600
--bg-page:      #f3f3f3
--bg-panel:     #ffffff
--bg-inset:     #f3f3f3
--bg-hover:     #f7f7f7
--text-1:       #111111   /* Primary text */
--text-2:       #555555   /* Secondary text */
--text-3:       #8a8a8a   /* Placeholder / hint */
--text-4:       #c0c0c0   /* Disabled / decorative */
--border:       #e7e7e7
--border-strong:#cccccc

/* Semantic palette */
--green:  #3F902B   /* Success */
--red:    #CD3546   /* Error / danger */
--blue:   #4065C5   /* Info / secondary */
--amber:  #D98F00   /* Warning */

/* Layout */
--sidebar-w: 272px
--topbar-h:  56px
--font: 'Inter', system-ui, sans-serif
--mono: 'Fragment Mono', monospace
```

---

## Navigation

---

### Side Navigation
**File:** `sidebar.html` · **#:** 10

Fixed left sidebar. Houses primary application navigation with grouped sections and active state highlighting. Dark-themed by default.

**Anatomy:**
- `.sidebar` — `position: fixed; width: 272px; height: calc(100vh - 56px)`
- `.nav-group` — logical grouping with label
- `.nav-group-label` — 10px uppercase, `--text-4`
- `.nav-item` — 7px/20px padding, `border-left: 2px solid transparent`
- `.nav-item.active` — `color: --accent; border-left-color: --accent; background: --accent-dim`
- `.nav-num` — monospace item number, `--text-4`
- `.nav-sub` — indented sub-item, `padding-left: 48px`

**States:** Default · Hover · Active  
**Themes:** Light · Dark (`--bg-sidebar: #111111` in dark)

```html
<aside class="sidebar" id="sidebar">
  <div class="sidebar-inner">
    <nav>
      <div class="nav-group">
        <span class="nav-group-label">Navigation</span>
        <a class="nav-item active" href="button.html">
          <span class="nav-num">16</span>Button
        </a>
        <a class="nav-item" href="input.html">
          <span class="nav-num">17</span>Input
        </a>
      </div>
    </nav>
  </div>
</aside>
```

---

### Top Navigation
**File:** `topnav.html` · **#:** 11

Application top bar. Always 56px tall, contains logo, nav links, and user actions.

**Variants:** Default-Yubi · Style_05 · Style_02  
**States:** Default · Disabled  
**Options:** Icon Left · Icon Right · Badge

```html
<header class="topbar">
  <div class="topbar-left">
    <a class="topbar-logo" href="preview.html"><!-- SVG logo --></a>
    <div class="topbar-sep"></div>
    <span class="topbar-label">Page Name</span>
  </div>
  <div class="topbar-right">
    <span class="topbar-badge">v1.0.0</span>
    <button class="icon-btn"><!-- theme toggle --></button>
  </div>
</header>
```

**CSS:**
```css
.topbar { position: fixed; top: 0; left: 0; right: 0; height: 56px;
  background: var(--bg-topbar); border-bottom: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px; z-index: 200; }
```

---

### Breadcrumbs
**File:** `breadcrumbs.html` · **#:** 12

Hierarchical path showing current location. Each item is a clickable link except the last (current page).

**Variants:** Truncated · Active  
**Types:** underline · without_underline

```html
<nav class="ym-breadcrumb">
  <span class="bc-item">Home</span>
  <span class="bc-sep">/</span>
  <span class="bc-item">Portfolio</span>
  <span class="bc-sep">/</span>
  <span class="bc-item active">KYC Documents</span>
</nav>
```

---

### Tabs
**File:** `tabs.html` · **#:** 13

Content switching within a section. Underline active indicator. Animated transition.

**Sizes:** M  
**Types:** underline  
**States:** Focus · Active · Default

```html
<div class="ym-tabs" id="tabs-1">
  <button class="ym-tab active" onclick="switchTab('tabs-1', this)">Overview</button>
  <button class="ym-tab" onclick="switchTab('tabs-1', this)">Transactions</button>
  <button class="ym-tab" onclick="switchTab('tabs-1', this)">Documents</button>
</div>
<div class="ym-tab-content active">Overview content</div>
<div class="ym-tab-content">Transactions content</div>
<div class="ym-tab-content">Documents content</div>

<script>
function switchTab(tabsId, btn) {
  const tabs = document.getElementById(tabsId);
  const allTabs = tabs.querySelectorAll('.ym-tab');
  const allPanels = tabs.parentElement.querySelectorAll('.ym-tab-content');
  allTabs.forEach((t, i) => {
    t.classList.toggle('active', t === btn);
    if (allPanels[i]) allPanels[i].classList.toggle('active', t === btn);
  });
}
</script>
```

---

### Pagination
**File:** `pagination.html` · **#:** 14

Navigate paginated data sets. Supports truncation for large page counts.

**Types:** standard · Icon Button  
**States:** Focus · Active · Default

```html
<!-- Standard -->
<div class="ym-pagination">
  <button class="pg-btn" disabled>‹</button>
  <button class="pg-btn active">1</button>
  <button class="pg-btn">2</button>
  <button class="pg-btn">3</button>
  <span style="color:var(--text-4);padding:0 4px">…</span>
  <button class="pg-btn">12</button>
  <button class="pg-btn">›</button>
</div>

<!-- Compact -->
<div class="ym-pagination">
  <button class="pg-btn">‹ Prev</button>
  <span style="font-size:12px;color:var(--text-3);padding:0 10px">Page 3 of 12</span>
  <button class="pg-btn">Next ›</button>
</div>
```

---

### Link
**File:** `link.html` · **#:** 15

Inline navigation element. Used within body text, tables, and descriptions.

**Sizes:** M · L  
**Types:** underline · without_underline

```html
<!-- Default -->
<span class="ym-link">View loan details</span>

<!-- Muted -->
<span class="ym-link link-muted">transaction history</span>

<!-- With icon -->
<span class="ym-link" style="display:inline-flex;align-items:center;gap:4px">
  Download statement
  <svg width="12" height="12"><!-- download icon --></svg>
</span>
```

---

## Forms & Inputs

---

### Button
**File:** `button.html` · **#:** 16

Primary action trigger. Four types — Filled, Ghost, Icon-only, Loader. Six colour variants. Three sizes.

**Variants:** Primary `#FE5104` · Blue `#4065C5` · Green `#3F902B` · Red `#CD3546` · Dark `#121926` · Ghost  
**Sizes:** L `44px` · M `36px` · S `28px`  
**States:** Default · Hover · Active · Disabled · Loading

```html
<!-- Filled -->
<button class="ym-btn btn-primary btn-m">Primary</button>
<button class="ym-btn btn-blue btn-m">Blue</button>
<button class="ym-btn btn-green btn-m">Success</button>
<button class="ym-btn btn-red btn-m">Delete</button>
<button class="ym-btn btn-dark btn-m">Dark</button>

<!-- Ghost -->
<button class="ym-btn btn-ghost-primary btn-m">Ghost Primary</button>
<button class="ym-btn btn-ghost-blue btn-m">Ghost Blue</button>

<!-- Sizes -->
<button class="ym-btn btn-primary btn-l">Large</button>
<button class="ym-btn btn-primary btn-m">Medium</button>
<button class="ym-btn btn-primary btn-s">Small</button>

<!-- Icon-only (square) -->
<button class="ym-btn btn-sq-m btn-dark">
  <svg><!-- icon --></svg>
</button>

<!-- Loading state -->
<button class="ym-btn btn-primary btn-m">
  <span class="btn-spinner"></span>
  Processing…
</button>

<!-- Disabled -->
<button class="ym-btn btn-primary btn-m" disabled>Disabled</button>
```

**Token map:**
| Class | Background | Text |
|-------|-----------|------|
| `btn-primary` | `#FE5104` | `#fff` |
| `btn-blue` | `#4065C5` | `#fff` |
| `btn-green` | `#3F902B` | `#fff` |
| `btn-red` | `#CD3546` | `#fff` |
| `btn-dark` | `#121926` | `#fff` |

---

### Input
**File:** `input.html` · **#:** 17

Single-line text field. Supports label, helper text, icons, and all validation states.

**States:** Default · Focus (`border: --accent`) · Error (`#CD3546`) · Disabled (opacity .5)  
**Types:** text · password · email · number

```html
<!-- Default -->
<div class="ym-input-wrap">
  <label class="ym-label">Full Name</label>
  <input class="ym-input" type="text" placeholder="e.g. Ashid Shaji">
  <span class="ym-input-hint">As per PAN card</span>
</div>

<!-- With left icon -->
<div class="ym-input-wrap">
  <label class="ym-label">Email</label>
  <div class="ym-input-icon-wrap">
    <svg class="ym-input-icon"><!-- icon --></svg>
    <input class="ym-input" type="email" placeholder="you@example.com">
  </div>
</div>

<!-- Error state -->
<div class="ym-input-wrap">
  <label class="ym-label">PAN Number</label>
  <input class="ym-input input-error" value="INVALID">
  <span class="ym-input-hint hint-error">Invalid PAN format</span>
</div>

<!-- Disabled -->
<input class="ym-input" value="Read only value" disabled>
```

---

### Textarea
**File:** `textarea.html` · **#:** 18

Multi-line text input. Vertically resizable. Same states as Input.

```html
<div class="ym-input-wrap">
  <label class="ym-label">Remarks</label>
  <textarea class="ym-textarea" placeholder="Add notes…"></textarea>
  <span class="ym-input-hint">Max 500 characters</span>
</div>
```

---

### Checkbox
**File:** `checkbox.html` · **#:** 19

Multi-select control. Three visual states. Supports group lists.

**States:** Unchecked · Checked · Indeterminate · Disabled

```html
<!-- Unchecked -->
<div class="ym-check-wrap" onclick="toggleCheck(this)">
  <div class="ym-check-box"></div>
  <span class="ym-check-label">Option label</span>
</div>

<!-- Checked (add class + SVG) -->
<div class="ym-check-wrap checked">
  <div class="ym-check-box">
    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path d="M1 4l3 3 5-6" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <span class="ym-check-label">Checked</span>
</div>

<!-- Indeterminate -->
<div class="ym-check-wrap indeterminate">
  <div class="ym-check-box">
    <svg width="10" height="2" viewBox="0 0 10 2" fill="none">
      <path d="M1 1h8" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </div>
  <span class="ym-check-label">Indeterminate</span>
</div>

<!-- Disabled -->
<div class="ym-check-wrap disabled">
  <div class="ym-check-box"></div>
  <span class="ym-check-label">Disabled</span>
</div>
```

---

### Radio
**File:** `radio.html` · **#:** 20

Single-select from a group. Always used in a group of 2+.

```html
<div class="ym-radio-group">
  <div class="ym-radio-wrap checked" onclick="selectRadio(0)">
    <div class="ym-radio-dot">
      <div class="ym-radio-inner"></div>
    </div>
    <span>Home Loan</span>
  </div>
  <div class="ym-radio-wrap" onclick="selectRadio(1)">
    <div class="ym-radio-dot">
      <div class="ym-radio-inner"></div>
    </div>
    <span>Personal Loan</span>
  </div>
</div>

<script>
function selectRadio(idx) {
  document.querySelectorAll('.ym-radio-wrap')
    .forEach((w, i) => w.classList.toggle('checked', i === idx));
}
</script>
```

---

### Toggle
**File:** `toggle.html` · **#:** 21

Binary on/off switch. Used for settings and preferences.

**States:** Off · On · Disabled

```html
<!-- Off -->
<div class="ym-toggle-track" onclick="this.classList.toggle('on')">
  <div class="ym-toggle-thumb"></div>
</div>

<!-- On (add class) -->
<div class="ym-toggle-track on" onclick="this.classList.toggle('on')">
  <div class="ym-toggle-thumb"></div>
</div>

<!-- With label -->
<div class="ym-toggle-wrap" style="justify-content:space-between">
  <span>Email notifications</span>
  <div class="ym-toggle-track on" onclick="this.classList.toggle('on')">
    <div class="ym-toggle-thumb"></div>
  </div>
</div>
```

---

### Dropdown / Select
**File:** `dropdown.html` · **#:** 22

Select from a predefined list of options.

```html
<div class="ym-input-wrap">
  <label class="ym-label">Loan Purpose</label>
  <select class="ym-select">
    <option>Select purpose…</option>
    <option>Home Purchase</option>
    <option>Home Renovation</option>
    <option>Debt Consolidation</option>
  </select>
</div>
```

---

### Date Picker
**File:** `datepicker.html` · **#:** 23

Calendar-based date selection. Supports date range and single date modes.

**Types:** Single · Range  
**States:** Default · Open · Disabled

```html
<div class="ym-input-wrap">
  <label class="ym-label">Application Date</label>
  <input class="ym-input" type="date">
</div>
```

---

### Time Picker
**File:** `timepicker.html` · **#:** 24

Hour/minute time selection. 12h and 24h formats.

```html
<div class="ym-input-wrap">
  <label class="ym-label">Appointment Time</label>
  <input class="ym-input" type="time">
</div>
```

---

### Search
**File:** `search.html` · **#:** 25

Search input with leading icon. Used in data tables, lists, and global search.

```html
<div class="ym-search-field">
  <svg class="search-icon" width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" stroke-width="1.4"/>
    <path d="M10 10l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
  </svg>
  <input class="ym-search-input" placeholder="Search clients, loans, documents…">
</div>
```

**CSS:**
```css
.ym-search-field { position: relative; display: flex; align-items: center; }
.ym-search-input {
  height: 38px; border: 1.5px solid var(--border); border-radius: 8px;
  padding: 0 12px 0 34px; font-size: 13.5px; width: 100%;
  background: var(--bg-panel); outline: none;
}
.ym-search-input:focus { border-color: var(--accent); }
```

---

### Slider
**File:** `slider.html` · **#:** 26

Range input for numeric values. Uses `accent-color` CSS property for native styling.

```html
<div class="ym-input-wrap">
  <div style="display:flex;justify-content:space-between">
    <label class="ym-label">Loan Amount</label>
    <span id="val" style="font-weight:700;color:var(--accent)">₹25L</span>
  </div>
  <input type="range" class="ym-range" min="1" max="100" value="25"
    oninput="document.getElementById('val').textContent='₹'+this.value+'L'">
  <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-4)">
    <span>₹1L</span><span>₹100L</span>
  </div>
</div>
```

---

### Pin Input / OTP
**File:** `pininput.html` · **#:** 27

Individual digit inputs for OTP / PIN entry. Auto-advances focus on input. Backspace moves focus back.

**Lengths:** 4 · 6 · 8 digits  
**States:** Default · Error

```html
<div class="ym-pin">
  <input class="ym-pin-digit" maxlength="1"
    oninput="pinNext(this)" onkeydown="pinBack(event,this)">
  <input class="ym-pin-digit" maxlength="1"
    oninput="pinNext(this)" onkeydown="pinBack(event,this)">
  <input class="ym-pin-digit" maxlength="1"
    oninput="pinNext(this)" onkeydown="pinBack(event,this)">
  <input class="ym-pin-digit" maxlength="1"
    oninput="pinNext(this)" onkeydown="pinBack(event,this)">
  <input class="ym-pin-digit" maxlength="1"
    oninput="pinNext(this)" onkeydown="pinBack(event,this)">
  <input class="ym-pin-digit" maxlength="1"
    oninput="pinNext(this)" onkeydown="pinBack(event,this)">
</div>

<script>
function pinNext(input) {
  if (input.value.length === 1) {
    const next = input.nextElementSibling;
    if (next?.classList.contains('ym-pin-digit')) next.focus();
  }
}
function pinBack(e, input) {
  if (e.key === 'Backspace' && !input.value) {
    const prev = input.previousElementSibling;
    if (prev?.classList.contains('ym-pin-digit')) { prev.focus(); prev.value = ''; }
  }
}
</script>
```

---

### Upload
**File:** `upload.html` · **#:** 28

Drag-and-drop file dropzone with upload progress, per-file status, and error handling.

**Dropzone:** `2px dashed border` · accent border on hover/drag  
**Progress:** `3px bar` · green = done · accent = uploading · red = error

```html
<!-- Dropzone -->
<div class="ym-upload-zone"
  ondragover="this.classList.add('drag-over')"
  ondragleave="this.classList.remove('drag-over')">
  <div class="ym-upload-label">Drop files here or click to browse</div>
  <div class="ym-upload-sub">PDF, JPG, PNG, XLSX · Max 10 MB per file</div>
</div>

<!-- File item — success -->
<div class="ym-file-item">
  <div class="ym-file-icon file-pdf">PDF</div>
  <div class="ym-file-info">
    <div class="ym-file-name">PAN_Card.pdf</div>
    <div class="ym-file-size">124 KB</div>
    <div class="ym-file-progress">
      <div class="ym-file-progress-fill" style="background:#3F902B;width:100%"></div>
    </div>
  </div>
  <!-- success icon -->
</div>
```

---

## Data Display

---

### Table
**File:** `table.html` · **#:** 29

Data grid for structured information. Supports hover rows, status badges, and sorted headers.

```html
<table class="ym-table">
  <thead>
    <tr>
      <th>Client Name</th>
      <th>Loan ID</th>
      <th>Amount</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ashid Shaji</td>
      <td><code>LAP-2024-031</code></td>
      <td>₹45,00,000</td>
      <td><span class="ym-badge badge-success">Approved</span></td>
    </tr>
  </tbody>
</table>
```

---

### List
**File:** `list.html` · **#:** 30

Vertical list of items with avatar, title, subtitle, and trailing meta.

```html
<div class="ym-list">
  <div class="ym-list-item">
    <div class="list-avatar" style="background:#4065C5">AS</div>
    <div>
      <div class="list-title">Ashid Shaji</div>
      <div class="list-sub">Home Loan · ₹45L</div>
    </div>
    <span class="ym-badge badge-success list-meta">Active</span>
  </div>
</div>
```

---

### Avatar
**File:** `avatar.html` · **#:** 31

User identity representation. Initials or image. Five sizes. Status indicator dot.

**Sizes:** xs `24px` · s `32px` · m `40px` · l `52px` · xl `64px`  
**Status:** online `#3F902B` · away `#D98F00` · offline `--border-strong`

```html
<!-- Initials -->
<div class="ym-avatar av-m">AS</div>

<!-- With status -->
<div class="ym-avatar av-m" style="overflow:visible">
  AS
  <span class="av-status av-online"></span>
</div>

<!-- Stack -->
<div class="av-stack">
  <div class="ym-avatar av-m">AS</div>
  <div class="ym-avatar av-m" style="background:#3F902B">PN</div>
  <div class="ym-avatar av-m" style="background:#CD3546">RK</div>
  <div class="ym-avatar av-m" style="background:var(--border-strong);color:var(--text-2)">+3</div>
</div>
```

---

### Badge
**File:** `badge.html` · **#:** 32

Semantic status label. Small pill shape. Always paired with a dot or used standalone.

**Variants:** success · error · warning · info · neutral

```html
<span class="ym-badge badge-success"><span class="badge-dot"></span>Approved</span>
<span class="ym-badge badge-error"><span class="badge-dot"></span>Rejected</span>
<span class="ym-badge badge-warning"><span class="badge-dot"></span>Review</span>
<span class="ym-badge badge-info"><span class="badge-dot"></span>Processing</span>
<span class="ym-badge badge-neutral"><span class="badge-dot"></span>Draft</span>
```

**Token map:**
| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| success | `rgba(63,144,43,.12)` | `#2E7020` | `rgba(63,144,43,.25)` |
| error | `rgba(205,53,70,.1)` | `#B82E3C` | `rgba(205,53,70,.25)` |
| warning | `rgba(217,143,0,.1)` | `#A86F00` | `rgba(217,143,0,.25)` |
| info | `rgba(64,101,197,.1)` | `#3054B0` | `rgba(64,101,197,.25)` |
| neutral | `--bg-inset` | `--text-2` | `--border` |

---

### Tags
**File:** `tags.html` · **#:** 33

Removable label chips. Used for categorising records and applied filters.

```html
<!-- Default (removable) -->
<span class="ym-tag">
  Home Loan
  <button class="ym-tag-remove">×</button>
</span>

<!-- Colour variants (no remove) -->
<span class="ym-tag tag-blue">KYC Pending</span>
<span class="ym-tag tag-green">Verified</span>
<span class="ym-tag tag-orange">High Risk</span>
```

---

### Pills
**File:** `pills.html` · **#:** 34

Toggle-able filter/category chips. Rounded border, active accent state.

```html
<button class="ym-pill pill-active" onclick="this.classList.toggle('pill-active')">All</button>
<button class="ym-pill" onclick="this.classList.toggle('pill-active')">Home Loan</button>
<button class="ym-pill" onclick="this.classList.toggle('pill-active')">Personal Loan</button>
```

---

### Indicator
**File:** `indicator.html` · **#:** 35

Dot + text status line. Used in lists, tables, and detail views.

```html
<span class="ym-indicator">
  <span class="ind-dot ind-success"></span>
  KYC Verified — Documents approved
</span>
<span class="ym-indicator">
  <span class="ind-dot ind-error"></span>
  Payment failed — Retry required
</span>
<span class="ym-indicator">
  <span class="ind-dot ind-warning"></span>
  Review pending
</span>
```

---

### Logo
**File:** `logo.html` · **#:** 36

Yubi Markets brand mark. SVG with separate wordmark and symbol.

**Variants:** Full · Symbol-only · Wordmark-only  
**Themes:** Light · Dark (auto-inverts with `currentColor`)

---

## Feedback

---

### Snackbar / Toast
**File:** `snackbar.html` · **#:** 37

Transient bottom notification. Dark background, icon, message, and action link.

**Types:** success · error · info · warning  
**Duration:** 3–5s auto-dismiss (implement with `setTimeout`)

```html
<div class="ym-snackbar">
  <div class="snack-icon snack-success">✓</div>
  <span>Loan application submitted successfully.</span>
  <span class="snack-action">View</span>
</div>
```

**Show/hide pattern:**
```js
function showSnackbar(message, type = 'success') {
  const el = document.createElement('div');
  el.className = 'ym-snackbar';
  el.innerHTML = `<div class="snack-icon snack-${type}">✓</div><span>${message}</span>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}
```

---

### Loader
**File:** `loader.html` · **#:** 38

Three loading patterns: spinner, dot-pulse, skeleton shimmer.

**Types:** Spinner · Dots · Skeleton · Progress bar

```html
<!-- Spinner (3 sizes) -->
<div class="ym-spinner sp-sm"></div>   <!-- 18px -->
<div class="ym-spinner sp-md"></div>   <!-- 28px -->
<div class="ym-spinner sp-lg"></div>   <!-- 40px -->

<!-- Dot pulse -->
<div class="ym-dots">
  <div class="ym-dot"></div>
  <div class="ym-dot"></div>
  <div class="ym-dot"></div>
</div>

<!-- Skeleton -->
<div class="ym-skeleton" style="height:14px;width:200px;border-radius:4px"></div>

<!-- Progress bar -->
<div class="ym-progress-bar">
  <div class="ym-progress-fill" style="width:65%"></div>
</div>
```

---

### Notification
**File:** `notification.html` · **#:** 39

Card-style alert with icon, title, and description. Higher persistence than snackbar.

**Types:** success · error · info

```html
<div class="ym-notif">
  <div class="notif-icon notif-success">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l4 4 6-8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div>
    <div class="notif-title">Disbursement complete</div>
    <div class="notif-desc">₹2.4Cr transferred to borrower account.</div>
  </div>
</div>
```

---

### Stepper
**File:** `stepper.html` · **#:** 40

Horizontal step progress indicator for multi-step flows.

**States per step:** pending · active · done

```html
<div class="ym-stepper">
  <div class="step-item done">
    <div class="step-circle">✓</div>
    <div class="step-label">Personal Info</div>
  </div>
  <div class="step-item active">
    <div class="step-circle">2</div>
    <div class="step-label">Documents</div>
  </div>
  <div class="step-item">
    <div class="step-circle">3</div>
    <div class="step-label">KYC</div>
  </div>
  <div class="step-item">
    <div class="step-circle">4</div>
    <div class="step-label">Review</div>
  </div>
</div>
```

---

## Overlays

---

### Modal / Dialog
**File:** `modal.html` · **#:** 41

Blocking dialog. Centred, with backdrop. Title + body + footer actions.

```html
<!-- Trigger -->
<button class="ym-btn btn-primary btn-m" onclick="openModal('myModal')">Open Modal</button>

<!-- Modal HTML -->
<div class="ym-modal-overlay" id="myModal" onclick="if(event.target===this)closeModal('myModal')">
  <div class="ym-modal">
    <div class="ym-modal-header">
      <h3 class="ym-modal-title">Confirm Disbursement</h3>
      <button class="ym-modal-close" onclick="closeModal('myModal')">×</button>
    </div>
    <div class="ym-modal-body">
      You are about to disburse ₹45,00,000 to <strong>Ashid Shaji</strong>.
    </div>
    <div class="ym-modal-footer">
      <button class="ym-btn btn-ghost-primary btn-m" onclick="closeModal('myModal')">Cancel</button>
      <button class="ym-btn btn-primary btn-m">Confirm</button>
    </div>
  </div>
</div>

<script>
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
</script>
```

---

### Drawer
**File:** `drawer.html` · **#:** 42

Side panel that slides in from the right. Used for detail views and filter panels.

```html
<div class="ym-drawer" id="myDrawer">
  <div class="ym-drawer-header">
    <h3>Client Details</h3>
    <button onclick="closeDrawer('myDrawer')">×</button>
  </div>
  <div class="ym-drawer-body">
    <!-- content -->
  </div>
</div>

<script>
function openDrawer(id) { document.getElementById(id).classList.add('open'); }
function closeDrawer(id) { document.getElementById(id).classList.remove('open'); }
</script>
```

---

### Popover
**File:** `popover.html` · **#:** 43

Click-triggered contextual panel above/below an element. Richer content than tooltip.

```html
<div class="ym-popover-wrap" onclick="this.classList.toggle('open')">
  <button class="ym-btn btn-ghost-primary btn-m">User info</button>
  <div class="ym-popover">
    <div class="popover-title">Ashid Shaji</div>
    <div class="popover-body">Senior RM · HDFC Bank · Mumbai</div>
  </div>
</div>
```

---

### Tooltip
**File:** `tooltip.html` · **#:** 44

Hover-triggered text hint. Dark background, arrow pointer. Never interactive content.

```html
<div class="ym-tooltip-wrap">
  <button class="ym-btn btn-primary btn-m">Hover me</button>
  <div class="ym-tooltip">Approve disbursement</div>
</div>
```

**Rule:** Tooltip text must be under 60 characters. Never use for interactive content — use Popover instead.

---

### Bottom Sheet
**File:** `bottomsheet.html` · **#:** 45

Mobile-first action sheet sliding up from bottom. Handle bar at top.

```html
<div class="ym-bottom-sheet" id="mySheet">
  <div class="bs-handle"></div>
  <div class="bs-title">Choose Action</div>
  <div class="bs-desc">Select what to do with this record.</div>
  <button class="ym-btn btn-primary btn-m" style="width:100%">Approve</button>
  <button class="ym-btn btn-ghost-primary btn-m" style="width:100%;margin-top:8px">Cancel</button>
</div>
```

---

## Layout & Structure

---

### Accordion
**File:** `accordion.html` · **#:** 46

Collapsible content sections. One or multiple open at a time.

```html
<div class="ym-acc-item" id="acc1">
  <button class="ym-acc-header" onclick="toggleAcc('acc1')">
    What documents are required?
    <svg class="ym-acc-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 4l5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
  </button>
  <div class="ym-acc-body">
    <div class="ym-acc-inner">
      PAN card, Aadhaar, salary slips, bank statements, and property documents.
    </div>
  </div>
</div>

<script>
function toggleAcc(id) { document.getElementById(id)?.classList.toggle('open'); }
</script>
```

---

### Divider
**File:** `divider.html` · **#:** 47

Horizontal rule or labelled section separator.

```html
<!-- Plain -->
<hr class="ym-divider">

<!-- With label -->
<div class="ym-divider-label">or continue with</div>

<!-- Section label -->
<div class="ym-divider-label">Personal Information</div>
```

---

### Filter
**File:** `filter.html` · **#:** 48

Horizontal row of filter chips. Toggle-able, with caret icon indicating dropdown.

```html
<div class="ym-filter-bar">
  <button class="ym-filter-chip active" onclick="this.classList.toggle('active')">
    All Clients
    <svg class="filter-caret" width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 3l3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
    </svg>
  </button>
  <button class="ym-filter-chip" onclick="this.classList.toggle('active')">Status</button>
  <button class="ym-filter-chip" onclick="this.classList.toggle('active')">Loan Type</button>
  <button class="ym-filter-chip" onclick="this.classList.toggle('active')">Date Range</button>
</div>
```

---

### FAB — Floating Action Button
**File:** `fab.html` · **#:** 49

Circular primary action button. Floats above content. Three sizes + extended variant.

**Sizes:** sm `40px` · md `52px` · lg `60px`  
**Extended:** Pill-shaped with icon + label

```html
<!-- Standard -->
<button class="ym-fab fab-md">
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 3v14M3 10h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
  </svg>
</button>

<!-- Extended -->
<button class="ym-fab fab-ext">
  <svg width="16" height="16"><!-- icon --></svg>
  Add Client
</button>
```

---

### Menu
**File:** `menu.html` · **#:** 50

Contextual dropdown list. Triggered on click. Supports icons, dividers, and danger items.

```html
<div class="ym-menu">
  <div class="menu-item">View Details</div>
  <div class="menu-item">Edit Client</div>
  <div class="menu-item">Download</div>
  <div class="menu-divider"></div>
  <div class="menu-item danger">Delete Record</div>
</div>
```

---

### Icon
**File:** `icon.html` · **#:** 51

SVG icon system. All icons are `16×16` or `20×20` inline SVGs using `currentColor`.

**Sizes:** 12 · 14 · 16 · 20 · 24  
**Usage rule:** Always use `currentColor` stroke/fill so icons inherit text colour.

```html
<!-- Standard usage -->
<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M..." stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>

<!-- With colour -->
<svg width="16" height="16" style="color: var(--accent)">...</svg>
```

---

### Illustration
**File:** `illustration.html` · **#:** 52

Scene illustrations for empty states, onboarding flows, feature callouts, and marketing surfaces. 80 SVGs across 16 categories, all using `currentColor` for accent theming.

**ViewBox:** 200 × 200px
**Categories:** AI · Astronomy · Blockchain · Communication · Documents · Electronics · Finance · Gaming · Gym · Insurance · Law · Money · Sci-Fi · Shopping · Sports · Transport

```html
<!-- Inline SVG with accent colour -->
<div style="color: var(--accent); width: 120px; height: 120px;">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="120" height="120">
    <!-- illustration SVG content -->
  </svg>
</div>
```

---

### Grid
**File:** `gridcomp.html` · **#:** 53

Layout grid system. 12-column with configurable gaps and breakpoints.

**Breakpoints:** mobile `< 810px` · tablet `810–1199px` · desktop `≥ 1200px`  
**Columns:** 4 (mobile) · 8 (tablet) · 12 (desktop)  
**Gutter:** 16px (mobile) · 24px (tablet) · 32px (desktop)

```css
.grid-12 { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
.col-1 { grid-column: span 1; }
.col-2 { grid-column: span 2; }
.col-3 { grid-column: span 3; }
.col-4 { grid-column: span 4; }
.col-6 { grid-column: span 6; }
.col-8 { grid-column: span 8; }
.col-12 { grid-column: span 12; }
```

---


### Command Menu
**File:** `commandmenu.html` · **#:** 16 / Navigation

Searchable command palette overlay triggered by ⌘K. Groups results by category with keyboard navigation.

```html
<div class="ym-cmd-box">
  <div class="ym-cmd-search">
    <input placeholder="Search commands..." />
  </div>
  <div class="ym-cmd-results">
    <div class="ym-cmd-group-label">Navigation</div>
    <div class="ym-cmd-item highlighted">
      <div class="ym-cmd-icon"><!-- SVG --></div>
      <div class="ym-cmd-item-text">
        <div class="ym-cmd-item-name">Dashboard</div>
      </div>
      <span class="ym-cmd-kbd">⌘1</span>
    </div>
  </div>
</div>
```

---

### Split Button
**File:** `splitbutton.html` · **#:** 18 / Forms

Primary action + secondary dropdown trigger in one button group. Three variants: default (accent), ghost, danger.

```html
<div class="ym-split-btn">
  <button class="ym-split-main">Export Report</button>
  <div class="ym-split-divider"></div>
  <button class="ym-split-caret" onclick="toggleSplit(this)">▾</button>
  <div class="split-dropdown">
    <button class="split-dd-item">Export as CSV</button>
    <button class="split-dd-item">Export as PDF</button>
  </div>
</div>
```

---

### Choicebox
**File:** `choicebox.html` · **#:** 26 / Forms

Card-style selection for mutually exclusive (radio) or independent (checkbox) choices. Use for plan/tier selection, onboarding settings.

```html
<div class="ym-choicebox-group">
  <div class="ym-choicebox selected" onclick="selectChoice(this,'group1')">
    <div class="ym-choicebox-indicator"><div class="ym-choicebox-dot"></div></div>
    <div class="ym-choicebox-content">
      <div class="ym-choicebox-label">12 months</div>
      <div class="ym-choicebox-desc">Higher monthly EMI</div>
    </div>
  </div>
</div>
```

---

### Combobox
**File:** `combobox.html` · **#:** 30 / Forms

Searchable dropdown for lists with more than 7–8 options. Filters items on input, shows an empty state, supports clearable selection.

```html
<div class="ym-combobox">
  <div class="ym-combobox-input-wrap">
    <input class="ym-combobox-input" placeholder="Search industry..."
           oninput="filterCombobox('cbx',this.value)" />
    <span class="ym-combobox-arrow"><!-- chevron --></span>
  </div>
  <div class="ym-combobox-list open">
    <div class="ym-combobox-item selected">Banking &amp; Finance</div>
    <div class="ym-combobox-item">Technology</div>
    <div class="ym-combobox-empty">No results</div>
  </div>
</div>
```

---

### Skeleton
**File:** `skeleton.html` · **#:** 36 / Data Display

Shimmer loading placeholder that mimics content shape. Prevents layout shift during data fetches.

```html
<!-- Text lines -->
<div class="ym-skeleton ym-sk-title" style="width:55%"></div>
<div class="ym-skeleton ym-sk-text" style="width:100%"></div>
<div class="ym-skeleton ym-sk-text" style="width:80%"></div>

<!-- Avatar + lines -->
<div style="display:flex;gap:12px;align-items:center">
  <div class="ym-skeleton ym-sk-avatar"></div>
  <div style="flex:1">
    <div class="ym-skeleton ym-sk-text" style="width:50%"></div>
    <div class="ym-skeleton ym-sk-text" style="width:80%"></div>
  </div>
</div>
```

---

### Keyboard Input
**File:** `keyboardinput.html` · **#:** 37 / Data Display

Inline `<kbd>` representation of keys and shortcuts. Use in docs, tooltips, and command palette items.

```html
<!-- Single key -->
<kbd class="ym-kbd">Enter</kbd>

<!-- Key combo -->
<span class="ym-kbd-combo">
  <kbd class="ym-kbd">⌘</kbd>
  <span class="ym-kbd-sep">+</span>
  <kbd class="ym-kbd">K</kbd>
</span>
```

---

### Progress
**File:** `progress.html` · **#:** 41 / Feedback

Linear progress bar for determinate and indeterminate states. Four semantic variants (default, success, warning, error) and three sizes.

```html
<div class="ym-progress">
  <div class="ym-progress-label"><span>Uploading</span><span>45%</span></div>
  <div class="ym-progress-track">
    <div class="ym-progress-fill" style="width:45%"></div>
  </div>
</div>

<!-- Indeterminate -->
<div class="ym-progress-track">
  <div class="ym-progress-fill indeterminate"></div>
</div>
```

---

### Callout
**File:** `callout.html` · **#:** 43 / Feedback

Inline semantic message with icon, title, body, and optional dismiss button. Four variants: info, success, warning, error.

```html
<div class="ym-callout callout-warning">
  <div class="ym-callout-icon"><!-- warning SVG --></div>
  <div class="ym-callout-body">
    <div class="ym-callout-title">EMI due in 3 days</div>
    <div class="ym-callout-desc">Payment of ₹42,500 due 15 May 2025.</div>
  </div>
  <button class="ym-callout-dismiss" onclick="this.closest('.ym-callout').remove()">×</button>
</div>
```

---

### Empty State
**File:** `emptystate.html` · **#:** 45 / Feedback

Shown when a page or list has no data. Illustration slot + title + description + optional CTA. Compact variant for cards.

```html
<div class="ym-empty">
  <div class="ym-empty-illustration"><!-- SVG --></div>
  <div class="ym-empty-title">No transactions found</div>
  <div class="ym-empty-desc">Adjust filters or create a new transaction.</div>
  <button class="ym-empty-cta">New Transaction</button>
</div>

<!-- Compact -->
<div class="ym-empty compact">...</div>
```

---

### Code Block
**File:** `codeblock.html` · **#:** 57 / Layout

Dark-surface pre-formatted code with language label, syntax token coloring, and one-click copy button.

```html
<div class="ym-code-block">
  <div class="ym-code-header">
    <span class="ym-code-lang">JavaScript</span>
    <button class="ym-code-copy-btn" onclick="copyBlock(this)">Copy</button>
  </div>
  <div class="ym-code-body">
    <span class="cb-kw">const</span> <span class="cb-var">x</span> = 42;
  </div>
</div>
```

---

## Global Interaction Patterns

### Theme Toggle
```js
function toggleTheme() {
  const h = document.documentElement;
  const next = h.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  h.setAttribute('data-theme', next);
  localStorage.setItem('ym-theme', next);
}

// FOUC prevention — place as first child of <head>
(function() {
  const t = localStorage.getItem('ym-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', t);
})();
```

### Sidebar Toggle (mobile)
```js
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('overlay').classList.toggle('show');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('show');
}
```

---

*Yubi Market Design System — v1.0.0 — Generated 2026-04-08*
