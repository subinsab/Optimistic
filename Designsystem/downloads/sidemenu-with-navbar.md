# Sidemenu with Navbar — Yubi Market Design System

> **Version:** 1.0.0 | **Category:** Layouts (53) | **Status:** Stable

---

## Overview

Full-page application shell for Yubi Market internal dashboards. Features a collapsible icon-rail sidebar that expands on hover using pure CSS, a horizontal tab-based topbar, a gradient hero banner, KPI card strip, filterable client table, and pagination row. All regions are independently contained — no JavaScript required for the sidebar interaction.

---

## Anatomy

| Region           | Element                                                                   |
|------------------|---------------------------------------------------------------------------|
| Sidebar          | Logo mark + wordmark, nav items with icons, bottom settings item          |
| Topbar           | Tab nav (Explore / Orders / Invoice / Reports / More), search, bell, avatar |
| Banner           | 146px gradient hero with page title                                       |
| KPI cards        | 4-column strip overlapping the banner with negative margin-top            |
| Filter bar       | Search input, Show/Alert/Tenor dropdowns, All Filters, Create Strategy    |
| Client table     | 6 columns: Name+PAN, Portfolio Value, SIP, Alert badge, Risk, Action      |
| Pagination       | Prev/Next arrows, page buttons, ellipsis, Go-to input, rows-per-page      |

---

## Measurements

| Property               | Value                                      |
|------------------------|--------------------------------------------|
| Sidebar collapsed width| 72px                                       |
| Sidebar expanded width | 220px (on hover)                           |
| Sidebar transition     | width 300ms ease-out                       |
| Logo mark size         | 22×22px                                    |
| Nav item height        | 36px                                       |
| Nav icon box           | 32×32px                                    |
| Nav icon size          | 16px                                       |
| Nav item radius        | 6px                                        |
| Nav item padding       | 0 6px                                      |
| Active color           | #FD7149                                    |
| Label transition       | max-width + opacity 300ms ease-out         |
| Topbar height          | 40px                                       |
| Active tab indicator   | 2px solid #FD7149 (bottom border)          |
| Banner height          | 146px                                      |
| Banner gradient        | 90deg, #4A90E2 → #7B68EE                   |
| Card overlap           | margin-top: -52px, z-index: 1              |
| Card border-radius     | 10px                                       |
| Card shadow            | 0 4px 16px rgba(0,0,0,.08)                 |
| Table header bg        | #F9FAFB                                    |
| Pagination active bg   | #4065C5                                    |
| Bell badge bg          | #2C43AB                                    |
| Avatar bg              | #3F902B                                    |

---

## HTML

```html
<div class="tpl-preview">

  <!-- Sidebar — expands on hover via CSS only -->
  <nav class="ym-sidenav">

    <!-- Logo: mark always visible, wordmark fades in on expand -->
    <div class="ym-logo-section">
      <div class="ym-logo-mark">
        <!-- 22×22 brand mark SVG -->
        <svg width="22" height="22" viewBox="0 0 29 30" fill="none">
          <path d="M11.1089 8C11.1089 9.801 11.4636 11.584 12.1528 13.248C12.842 14.912 13.8522 16.424 15.1257 17.698C16.3993 18.971 17.9111 19.981 19.575 20.67C21.239 21.36 23.0223 21.714 24.8233 21.714V15.109C23.8868 15.109 22.9595 14.947 22.0942 14.589C21.229 14.23 20.4428 13.705 19.7806 13.043C19.1184 12.381 18.5931 11.594 18.2347 10.729C17.8763 9.864 17.7145 8.937 17.7145 8H11.1089Z" fill="#DCDC5B"/>
          <path d="M4 21.714C5.801 21.714 7.584 21.36 9.248 20.67C10.912 19.981 12.424 18.971 13.698 17.698C14.971 16.424 15.981 14.912 16.671 13.248C17.36 11.584 17.714 9.801 17.714 8H11.109C11.109 8.937 10.947 9.864 10.589 10.729C10.23 11.594 9.705 12.381 9.043 13.043C8.381 13.705 7.594 14.23 6.729 14.589C5.864 14.947 4.937 15.109 4 15.109V21.714Z" fill="#FE5104"/>
          <path d="M17.714 8L17.714 8.084C17.703 9.857 17.349 11.61 16.671 13.248C16.116 14.588 15.353 15.829 14.412 16.926C13.471 15.829 12.708 14.588 12.153 13.248C11.464 11.584 11.109 9.801 11.109 8H17.714Z" fill="#81AFF2"/>
        </svg>
      </div>
      <span class="ym-logo-wordmark">Yubi markets</span>
    </div>

    <!-- Nav items -->
    <div class="ym-nav-items">
      <div class="ym-nav-item ym-active" onclick="setTplActive(this)">
        <div class="ym-icon-box"><!-- sparkle SVG --></div>
        <span class="ym-label">Vista</span>
      </div>
      <div class="ym-nav-item" onclick="setTplActive(this)">
        <div class="ym-icon-box"><!-- users SVG --></div>
        <span class="ym-label">Customers</span>
      </div>
      <div class="ym-nav-item" onclick="setTplActive(this)">
        <div class="ym-icon-box"><!-- box SVG --></div>
        <span class="ym-label">Parcels</span>
      </div>
      <div class="ym-nav-item" onclick="setTplActive(this)">
        <div class="ym-icon-box"><!-- scan-frame SVG --></div>
        <span class="ym-label">Scan</span>
      </div>
      <div class="ym-nav-item" onclick="setTplActive(this)">
        <div class="ym-icon-box"><!-- arrows SVG --></div>
        <span class="ym-label">Transit</span>
      </div>
      <div class="ym-nav-item" onclick="setTplActive(this)">
        <div class="ym-icon-box"><!-- bar-chart SVG --></div>
        <span class="ym-label">Analytics</span>
      </div>
      <div class="ym-nav-item" onclick="setTplActive(this)">
        <div class="ym-icon-box"><!-- card SVG --></div>
        <span class="ym-label">Financial</span>
      </div>
    </div>

    <!-- Bottom section -->
    <div class="ym-nav-bottom">
      <div class="ym-bottom-item">
        <div class="ym-icon-box"><!-- gear SVG --></div>
        <span class="ym-label">Settings</span>
      </div>
    </div>
  </nav>

  <!-- Main column -->
  <div class="tpl-main">

    <!-- Horizontal tab nav -->
    <nav class="tpl-topnav">
      <div class="tpl-tabs">
        <div class="tpl-tab active" onclick="setTplTab(this)">Explore</div>
        <div class="tpl-tab" onclick="setTplTab(this)">Orders</div>
        <div class="tpl-tab" onclick="setTplTab(this)">Invoice</div>
        <div class="tpl-tab" onclick="setTplTab(this)">Reports</div>
        <div class="tpl-more-btn">More ▾</div>
      </div>
      <div class="tpl-topnav-right">
        <div class="tpl-icon-btn"><!-- search SVG --></div>
        <div class="tpl-bell-wrap">
          <!-- bell SVG -->
          <span class="tpl-bell-badge">22</span>
        </div>
        <div class="tpl-avatar">AS</div>
      </div>
    </nav>

    <!-- Scrollable content -->
    <div class="tpl-content">

      <!-- Gradient banner -->
      <div class="tpl-banner">
        <span class="tpl-banner-title">Client Portfolios</span>
      </div>

      <!-- KPI cards — overlap banner -->
      <div class="tpl-portfolio-cards">
        <div class="tpl-portfolio-card">
          <div class="tpl-pc-label">Total AUM</div>
          <div class="tpl-pc-value">₹2,84,593</div>
          <div class="tpl-pc-sub">↑ 4.2% this month</div>
        </div>
        <div class="tpl-portfolio-card">
          <div class="tpl-pc-label">SIP Book</div>
          <div class="tpl-pc-value">₹12,450/mo</div>
          <div class="tpl-pc-sub">18 active SIPs</div>
        </div>
        <div class="tpl-portfolio-card">
          <div class="tpl-pc-label">Fixed-Tenor Book</div>
          <div class="tpl-pc-value">₹45,200</div>
          <div class="tpl-pc-sub">3 FDs maturing soon</div>
        </div>
        <div class="tpl-portfolio-card">
          <div class="tpl-pc-label">Alerts</div>
          <div class="tpl-pc-value" style="color:#991B1B;">8</div>
          <div class="tpl-pc-sub">2 high priority</div>
        </div>
      </div>

      <!-- Filter bar -->
      <div class="tpl-filter-bar">
        <input class="tpl-filter-search" type="text" placeholder="Search here">
        <select class="tpl-filter-select"><option>Show: 10</option></select>
        <select class="tpl-filter-select"><option>All alerts</option></select>
        <select class="tpl-filter-select"><option>Fixed-tenor</option></select>
        <button class="tpl-all-filters-btn">All Filters</button>
        <button class="tpl-create-btn">Create Strategy</button>
      </div>

      <!-- Client table -->
      <div class="tpl-table-wrap">
        <table class="tpl-table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Portfolio Value</th>
              <th>SIP</th>
              <th>Alert</th>
              <th>Risk</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="tpl-td-name">Rahul Mehta</div>
                <div class="tpl-td-sub">ABCPM1234R</div>
              </td>
              <td>₹12,40,000</td>
              <td>₹8,000/mo</td>
              <td><span class="alert-badge alert-green">Low Risk</span></td>
              <td>Moderate</td>
              <td><button class="tpl-analyse-btn">Analyse portfolio</button></td>
            </tr>
            <!-- Repeat rows as needed -->
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="tpl-pagination">
        <span class="tpl-pg-total">Total 150 items</span>
        <button class="tpl-pg-btn pg-disabled">‹</button>
        <button class="tpl-pg-btn pg-active">1</button>
        <button class="tpl-pg-btn">2</button>
        <button class="tpl-pg-btn">3</button>
        <span class="tpl-pg-ellipsis">…</span>
        <button class="tpl-pg-btn">15</button>
        <button class="tpl-pg-btn">›</button>
        <div class="tpl-pg-right">
          <span class="tpl-pg-go-label">Go to</span>
          <input class="tpl-pg-input" type="text" placeholder="1">
          <select class="tpl-pg-rows"><option>10 / page</option></select>
        </div>
      </div>

    </div><!-- /tpl-content -->
  </div><!-- /tpl-main -->
</div><!-- /tpl-preview -->
```

---

## CSS

```css
/* ── Preview shell ── */
.tpl-preview {
  height: 560px;
  display: flex;
  overflow: hidden;
  font-family: 'Inter', -apple-system, sans-serif;
}

/* ── Sidebar ── */
.ym-sidenav {
  width: 72px;
  height: 100%;
  background: #FFFFFF;
  border-right: 1px solid #E5E7EB;
  padding: 16px 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
  transition: width 300ms ease-out;
}
.ym-sidenav:hover { width: 220px; }

/* Logo */
.ym-logo-section {
  height: 32px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  overflow: hidden;
  flex-shrink: 0;
  padding: 0 6px;
  gap: 8px;
}
.ym-logo-mark {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.ym-logo-wordmark {
  font-size: 14px;
  font-weight: 600;
  color: #121926;
  white-space: nowrap;
  overflow: hidden;
  max-width: 0;
  opacity: 0;
  transition: max-width 300ms ease-out, opacity 250ms ease-out;
  letter-spacing: -0.01em;
}
.ym-sidenav:hover .ym-logo-wordmark { max-width: 160px; opacity: 1; }

/* Nav items */
.ym-nav-items { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.ym-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  border-radius: 6px;
  cursor: pointer;
  padding: 0 6px;
  white-space: nowrap;
  transition: background 150ms;
}
.ym-nav-item:hover:not(.ym-active) { background: #F9FAFB; }
.ym-active { /* active state applied by JS */ }
.ym-active .ym-icon-box { color: #FD7149; }
.ym-active .ym-label { color: #FD7149; font-weight: 500; }

.ym-icon-box {
  width: 32px; height: 32px;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  color: #344054;
}
.ym-label {
  font-size: 13px;
  font-weight: 400;
  color: #475467;
  white-space: nowrap;
  overflow: hidden;
  width: 0; max-width: 0; opacity: 0;
  transition: width 300ms ease-out, max-width 300ms ease-out, opacity 300ms ease-out;
}
.ym-sidenav:hover .ym-label { width: auto; max-width: 140px; opacity: 1; }

/* Bottom section */
.ym-nav-bottom {
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-top: 1px solid #E5E7EB;
  padding-top: 8px;
  margin-top: 8px;
}
.ym-bottom-item {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  border-radius: 6px;
  cursor: pointer;
  padding: 0 6px;
  white-space: nowrap;
  transition: background 150ms;
}
.ym-bottom-item:hover { background: #F9FAFB; }

/* ── Main column ── */
.tpl-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F9FAFB; }

/* ── Topnav ── */
.tpl-topnav {
  height: 40px;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 0 20px;
  flex-shrink: 0;
}
.tpl-tabs { display: flex; align-items: stretch; }
.tpl-tab {
  display: flex; align-items: center;
  padding: 0 11px;
  font-size: 13px; font-weight: 400; color: #475467;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 150ms, border-color 150ms;
}
.tpl-tab.active { color: #FD7149; border-bottom-color: #FD7149; font-weight: 500; }
.tpl-tab:hover:not(.active) { color: #344054; }

.tpl-topnav-right { display: flex; align-items: center; gap: 7px; }
.tpl-bell-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
.tpl-bell-badge {
  position: absolute; top: -5px; right: -7px;
  background: #2C43AB; color: #fff;
  font-size: 7px; font-weight: 700;
  padding: 1px 3px; border-radius: 7px;
  border: 1px solid #fff;
}
.tpl-avatar {
  width: 26px; height: 26px; border-radius: 50%;
  background: #3F902B; color: #fff;
  font-size: 9px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
}

/* ── Content ── */
.tpl-content { flex: 1; overflow-y: auto; background: #FFFFFF; }

/* Banner */
.tpl-banner {
  height: 146px;
  background: linear-gradient(90deg, #4A90E2 0%, #7B68EE 100%);
  display: flex; align-items: flex-end;
  padding: 0 20px 16px;
}
.tpl-banner-title { font-size: 16px; font-weight: 700; color: rgba(255,255,255,0.9); }

/* KPI cards */
.tpl-portfolio-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 0 20px;
  margin-top: -52px;
  position: relative;
  z-index: 1;
  margin-bottom: 14px;
}
.tpl-portfolio-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 10px;
  padding: 13px 14px;
  box-shadow: 0 4px 16px rgba(0,0,0,.08);
}
.tpl-pc-label { font-size: 9px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; color: #697586; margin-bottom: 4px; }
.tpl-pc-value { font-size: 15px; font-weight: 700; color: #121926; }
.tpl-pc-sub { font-size: 9px; color: #697586; margin-top: 2px; }

/* Filter bar */
.tpl-filter-bar { display: flex; align-items: center; gap: 7px; padding: 0 20px 10px; }
.tpl-filter-search {
  height: 30px; padding: 0 10px;
  font-size: 11px; color: #121926;
  background: #FFFFFF; border: 1px solid #CDD5DF; border-radius: 6px;
  outline: none; width: 160px;
}
.tpl-filter-select {
  height: 30px; padding: 0 20px 0 8px;
  font-size: 11px; color: #475467;
  background: #FFFFFF; border: 1px solid #CDD5DF;
  border-radius: 6px; appearance: none; cursor: pointer;
}
.tpl-all-filters-btn {
  height: 30px; padding: 0 10px;
  font-size: 11px; color: #475467;
  background: #FFFFFF; border: 1px solid #CDD5DF; border-radius: 6px; cursor: pointer;
}
.tpl-create-btn {
  height: 30px; padding: 0 12px;
  font-size: 11px; font-weight: 600;
  color: #FFFFFF; background: #FD7149;
  border: none; border-radius: 6px; cursor: pointer;
  margin-left: auto;
}

/* Table */
.tpl-table-wrap { padding: 0 20px 8px; }
.tpl-table { width: 100%; border-collapse: collapse; font-size: 11px; background: #FFFFFF; }
.tpl-table th {
  padding: 7px 10px; font-size: 9px; font-weight: 600;
  letter-spacing: .05em; text-transform: uppercase;
  color: #697586; border-bottom: 1px solid #E5E7EB;
  text-align: left; background: #F9FAFB;
}
.tpl-table td { padding: 7px 10px; border-bottom: 1px solid #F2F4F7; color: #344054; }
.tpl-table tr:hover td { background: #F9FAFB; }
.tpl-td-name { font-weight: 600; color: #121926; font-size: 11.5px; }
.tpl-td-sub { color: #697586; font-size: 9.5px; }

/* Alert badges */
.alert-badge { display: inline-flex; align-items: center; padding: 2px 6px; border-radius: 4px; font-size: 9.5px; font-weight: 600; }
.alert-red    { background: #FEE2E2; color: #991B1B; }
.alert-yellow { background: #FEF3C7; color: #92400E; }
.alert-blue   { background: #DBEAFE; color: #1E40AF; }
.alert-green  { background: #D1FAE5; color: #065F46; }

.tpl-analyse-btn {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 8px; font-size: 10px; font-weight: 500;
  color: #344054; background: #FFFFFF;
  border: 1px solid #D0D5DD; border-radius: 5px; cursor: pointer;
  box-shadow: 0 1px 2px rgba(16,24,40,.05);
}

/* Pagination */
.tpl-pagination {
  display: flex; align-items: center; gap: 5px;
  padding: 8px 20px; border-top: 1px solid #E5E7EB;
  font-size: 10.5px; color: #475467;
  background: #FFFFFF;
}
.tpl-pg-btn {
  width: 24px; height: 24px;
  border: 1px solid #D0D5DD; border-radius: 5px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 10.5px; color: #344054; background: #FFFFFF;
}
.tpl-pg-btn.pg-active { background: #4065C5; color: #fff; border-color: #4065C5; }
.tpl-pg-btn.pg-disabled { opacity: 0.35; cursor: default; }
.tpl-pg-right { display: flex; align-items: center; gap: 5px; margin-left: auto; }
.tpl-pg-input {
  width: 34px; height: 24px;
  border: 1px solid #CDD5DF; border-radius: 5px;
  text-align: center; font-size: 10.5px; outline: none;
}
.tpl-pg-rows {
  height: 24px; padding: 0 16px 0 6px;
  font-size: 10.5px; background: #FFFFFF;
  border: 1px solid #CDD5DF; border-radius: 5px;
  appearance: none; cursor: pointer;
}
```

---

## JavaScript

```javascript
// Switch active sidebar nav item
function setTplActive(el) {
  document.querySelectorAll('.ym-nav-item').forEach(i => i.classList.remove('ym-active'));
  el.classList.add('ym-active');
}

// Switch active topnav tab
function setTplTab(el) {
  document.querySelectorAll('.tpl-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}
```

> **Sidebar expand** is pure CSS via `.ym-sidenav:hover` — no JavaScript needed.

---

## Accessibility

- Sidebar `<nav>` with `aria-label="Main navigation"`
- Active nav item: `aria-current="page"` set by JS alongside the `.ym-active` class
- Topbar tabs: `role="tab"` with `aria-selected="true/false"`; wrap in `role="tablist"`
- Bell badge: wrap count in `<span class="sr-only">22 unread notifications</span>` alongside the visual badge
- Avatar button: `aria-label="User menu"` or `aria-haspopup="true"` if it opens a dropdown
- Filter inputs: each `<select>` and `<input>` should have an associated `<label>` or `aria-label`
- Table: `<thead>` with `<th scope="col">` for each column

---

## Related Components

- **Filter** (`filter.html`) — filter bar and dropdown patterns
- **Table** (`table.html`) — table with sort, selection, and row actions
- **Badge** (`badge.html`) — alert badge variants used in the table
- **Pagination** (`pagination.html`) — pagination row component
- **Tabs** (`tabs.html`) — horizontal tab nav used in the topbar

---

*Yubi Market Design System · Sidemenu with Navbar v1.0.0 · Internal Use*
