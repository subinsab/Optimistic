# Yubi Market — Top Navigation Component Reference for Claude

> **How to use:** Upload this file to Claude and say "Use the Yubi Market top navigation component." Claude will reference these exact specs, tokens, and interaction rules.

**Version:** 1.0.0 | **Type:** Sticky Top Navigation Bar | **Height:** 40px

---

## Rules Claude Must Follow

1. **Height:** 40px — strict, never taller.
2. **Background:** `#FFFFFF` — always white, sticky top-0.
3. **Border:** `1px solid #EDEDED` bottom border only.
4. **Horizontal padding:** 36px each side (`px-9`).
5. **z-index:** 50 — sits above sidebar (z-10) and all content.
6. **Active tab:** Label turns `#FD7149` (brand orange) + 2px orange underline, animated scale-x.
7. **Inactive tab:** Label `#475467`, hover becomes `#344054`.
8. **Search:** Icon-only collapsed state → expands to 160px input on click. Border `#4065C5`, shadow `0 0 2px #4065C5`. Closes on input blur.
9. **Notification badge:** `#2C43AB` background, white text, `animate-pulse`, position absolute top-right of bell icon.
10. **Avatar:** 32×32px circle, initials text, background `#3F902B`. Profile dropdown on click.
11. **Font:** Inter Regular (400) for all labels, placeholders, and menu items.
12. **No underline on inactive hover** — only text color changes.

---

## Exact Measurements

| Property | Value |
|---|---|
| Height | 40px |
| Background | `#FFFFFF` |
| Bottom border | `1px solid #EDEDED` |
| Padding left/right | 36px |
| Tab gap | 16px |
| Tab padding | `8px 8px` |
| Tab font size | 14px |
| Tab font weight | 400 (Regular) |
| Active underline height | 2px |
| Active underline color | `#FD7149` |
| Right section gap | 8px |
| Search border radius | 6px |
| Search input width | 160px |
| Search height | 32px |
| Search padding | `6px 12px` |
| Icon size (search, bell, chevron) | 16×16px |
| Avatar size | 32×32px |
| Avatar border-radius | 50% (circle) |
| Badge font size | 10px |
| Badge min-width | 16px |
| Dropdown min-width | 160px |
| Dropdown border-radius | 8px |

---

## Colors

| Token | Hex | Use |
|---|---|---|
| Background | `#FFFFFF` | Topbar surface |
| Bottom border | `#EDEDED` | Divider below topbar |
| Active tab text | `#FD7149` | Active nav tab label |
| Active underline | `#FD7149` | Active tab bottom indicator |
| Inactive tab text | `#475467` | Default tab label |
| Inactive tab hover | `#344054` | Hover tab label |
| Search border | `#4065C5` | Search input border + shadow |
| Bell + chevron icon | `#344054` | Icon stroke color |
| Search icon default | `#9AA4B2` | Collapsed search icon |
| Search icon focused | `#121926` | Expanded search icon |
| Notification badge bg | `#2C43AB` | Badge background |
| Notification badge text | `#FFFFFF` | Badge text |
| Avatar background | `#3F902B` | Success green |
| Avatar text | `#FFFFFF` | Avatar initials |
| Dropdown item text | `#475467` | Menu item default |
| Dropdown item hover | `#344054` | Menu item hover text |
| Dropdown logout | `#CD3546` | Destructive action text |

---

## Navigation Tabs

| ID | Label |
|---|---|
| Home | Home |
| Client | Client |
| Portfolio | Portfolio |
| Transactions | Transactions |
| Reports | Reports |

---

## Interaction Pattern

```
Default state:
  Active tab: label #FD7149 + underline visible (scaleX: 1, opacity: 1)
  Inactive tabs: label #475467, no underline

On tab click:
  Clicked tab → active (label #FD7149, underline animates in)
  Previous active → inactive (underline scaleX: 0, opacity: 0)
  Transition: 300ms

Search closed (default):
  16px search icon button (color #9AA4B2)
  hover: bg #F9FAFB, scale 1.1

Search open (on icon click):
  Animates in from right (fade + slide)
  Border: 1px solid #4065C5
  Box shadow: 0px 0px 2px #4065C5
  Input auto-focused
  On blur: collapses back to icon

Notification bell:
  Bell icon 16px, color #344054
  Badge: absolute position, number "22", pulsing
  On click: (implement notification panel)

Profile avatar:
  Circle, initials "AS", bg #3F902B
  ChevronDown rotates 180° when open
  Dropdown items: Profile, Settings, [divider], Logout
  Overlay: click outside to close
```

---

## SVG Path — Search Icon (16×16)

```
Icon: search-md (fill rule: evenodd)
d="M7.31624 2.35897C4.57842 2.35897 2.35897 4.57842 2.35897 7.31624C2.35897 10.0541
4.57842 12.2735 7.31624 12.2735C8.65683 12.2735 9.87313 11.7414 10.7654 10.8768
C10.7808 10.8558 10.7979 10.8358 10.8169 10.8169C10.8358 10.7979 10.8558 10.7808
10.8768 10.7654C11.7414 9.87313 12.2735 8.65683 12.2735 7.31624C12.2735 4.57842
10.0541 2.35897 7.31624 2.35897ZM11.8939 11.1687C12.7708 10.1278 13.2991 8.78374
13.2991 7.31624C13.2991 4.01197 10.6205 1.33333 7.31624 1.33333C4.01197 1.33333
1.33333 4.01197 1.33333 7.31624C1.33333 10.6205 4.01197 13.2991 7.31624 13.2991
C8.78374 13.2991 10.1278 12.7708 11.1687 11.8939L13.7912 14.5165C13.9915 14.7167
14.3162 14.7167 14.5165 14.5165C14.7167 14.3162 14.7167 13.9915 14.5165 13.7912
L11.8939 11.1687Z"
Fill rule: evenodd
Color: customizable (default #9AA4B2, focused #121926)
```

---

## CSS Reference

```css
.topnav {
  height: 40px;
  background: #FFFFFF;
  border-bottom: 1px solid #EDEDED;
  padding: 0 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
}

.topnav-tabs { display: flex; align-items: center; gap: 16px; }

.topnav-tab {
  position: relative;
  padding: 8px;
  height: 40px;
  display: flex; align-items: center;
  cursor: pointer;
  border: none; background: transparent;
  border-radius: 6px;
  transition: background 200ms;
}
.topnav-tab:hover { background: #F9FAFB; }

.topnav-tab-label {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #475467;
  transition: color 200ms;
}
.topnav-tab.is-active .topnav-tab-label { color: #FD7149; }
.topnav-tab:hover .topnav-tab-label { color: #344054; }
.topnav-tab.is-active:hover .topnav-tab-label { color: #FD7149; }

.topnav-underline {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: #FD7149;
  transform: scaleX(0);
  opacity: 0;
  transition: transform 300ms, opacity 300ms;
}
.topnav-tab.is-active .topnav-underline {
  transform: scaleX(1);
  opacity: 1;
}

.topnav-right { display: flex; align-items: center; gap: 8px; }

.topnav-search-box {
  border: 1px solid #4065C5;
  border-radius: 6px;
  box-shadow: 0px 0px 2px #4065C5;
  height: 32px;
  display: flex; align-items: center;
  padding: 6px 12px;
  gap: 8px;
}

.topnav-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: #3F902B;
  color: #fff;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
}

.topnav-badge {
  position: absolute;
  top: -4px; right: -4px;
  background: #2C43AB;
  color: #fff;
  font-size: 10px;
  padding: 0 4px;
  border-radius: 2px;
  min-width: 16px;
  text-align: center;
  border: 1px solid #fff;
  animation: pulse 2s infinite;
}
```

---

*Yubi Market Design System · Top Navigation Component Reference v1.0.0*
*Upload this file to Claude for full topnav component context.*
