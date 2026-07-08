"use client";

import { useState } from "react";
import Logo from "../../_components/Logo";
import s from "../docs.module.css";

const TABS = ["Fixed", "Collapsible", "Icon rail", "Tree", "Variants"] as const;
const I = {
  home: <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M3 9l7-6 7 6M5 8v9h10V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  grid: <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /></svg>,
  users: <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="7" r="2.6" stroke="currentColor" strokeWidth="1.5" /><path d="M3 16c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M14 11.6c1.7.3 3 1.7 3 3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  chart: <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M3 17V3M3 17h14M7 13v-3M11 13V7M15 13v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  cog: <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  chevron: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  caret: <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
};

function Rail({ collapsed, active, onPick, onToggle, showIcons = true, brand = false, variant = "", indicator = true }:
  { collapsed?: boolean; active: string; onPick: (v: string) => void; onToggle?: () => void; showIcons?: boolean; brand?: boolean; variant?: string; indicator?: boolean }) {
  const item = (icon: keyof typeof I, label: string, opts: { badge?: string; isNew?: boolean } = {}) => (
    <button key={label} type="button" className={`${s.osnavItem} ${active === label ? s.osnavOn : ""}`} aria-current={active === label ? "page" : undefined} onClick={() => onPick(label)} title={collapsed ? label : undefined}>
      {showIcons && <span className={s.osnavIcon}>{I[icon]}</span>}
      <span className={s.osnavText}>{label}</span>
      {opts.badge && <span className={`${s.osnavBadge} ${s.obadge} ${s.bgCount}`}>{opts.badge}</span>}
      {opts.isNew && <span className={s.osnavNew}>New</span>}
    </button>
  );
  return (
    <nav className={`${s.osnav} ${collapsed ? s.osnavCollapsed : ""} ${indicator ? "" : s.osnavNoIndicator} ${variant}`} aria-label="Primary">
      {brand && <div className={s.osnavBrand}><Logo size={22} withWordmark={false} /><span className={s.osnavBrandName}>Optimistic</span></div>}
      {item("home", "Overview")}
      {item("grid", "Projects", { badge: "3" })}
      {item("users", "Team")}
      {item("chart", "Analytics", { isNew: true })}
      <div className={s.osnavSpacer} />
      {item("cog", "Settings")}
      {onToggle && (
        <button type="button" className={`${s.osnavItem} ${s.osnavToggle}`} onClick={onToggle} aria-label={collapsed ? "Expand" : "Collapse"}>
          <span className={s.osnavIcon} style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>{I.chevron}</span>
          <span className={s.osnavText}>Collapse</span>
        </button>
      )}
    </nav>
  );
}

const TREE = [
  { label: "Overview", icon: "home" as const },
  { label: "Projects", icon: "grid" as const, children: ["Active", "Archived", "Templates"] },
  { label: "Team", icon: "users" as const, children: ["Members", "Roles", "Invites"] },
  { label: "Settings", icon: "cog" as const },
];

function TreeRail() {
  const [open, setOpen] = useState<string[]>(["Projects"]);
  const [active, setActive] = useState("Active");
  const toggle = (l: string) => setOpen((o) => (o.includes(l) ? o.filter((x) => x !== l) : [...o, l]));
  return (
    <nav className={s.osnav} aria-label="Primary">
      {TREE.map((n) => (
        <div key={n.label} className={n.children && open.includes(n.label) ? s.osnavOpen : ""}>
          <button type="button" className={`${s.osnavItem} ${!n.children && active === n.label ? s.osnavOn : ""}`}
            aria-expanded={n.children ? open.includes(n.label) : undefined}
            onClick={() => (n.children ? toggle(n.label) : setActive(n.label))}>
            <span className={s.osnavIcon}>{I[n.icon]}</span>
            <span className={s.osnavText}>{n.label}</span>
            {n.children && <span className={s.osnavChevron}>{I.caret}</span>}
          </button>
          {n.children && (
            <div className={`${s.osnavSub} ${open.includes(n.label) ? s.osnavSubOpen : ""}`}>
              <div><div className={s.osnavSubList}>
                {n.children.map((c) => (
                  <button key={c} type="button" className={`${s.osnavSubItem} ${active === c ? s.osnavSubOn : ""}`} aria-current={active === c ? "page" : undefined} onClick={() => setActive(c)}>{c}</button>
                ))}
              </div></div>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

export default function SideNavDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Fixed");
  const [active, setActive] = useState("Overview");
  const [collapsed, setCollapsed] = useState(false);
  const [indicator, setIndicator] = useState(true);
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Side navigation examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Fixed" && (
          <>
            <div className={s.subLabel}>The full rail — toggle the active indicator bar</div>
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
              <Rail active={active} onPick={setActive} indicator={indicator} />
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", paddingTop: 4 }}>
                <button type="button" role="switch" aria-checked={indicator} onClick={() => setIndicator((v) => !v)}
                  className={`${s.otoggle} ${s.otS} ${indicator ? s.otOn : ""}`} />
                <span className={s.otTitle} style={{ fontSize: "0.82rem" }}>Left indicator</span>
              </label>
            </div>
          </>
        )}
        {tab === "Collapsible" && (<><div className={s.subLabel}>Toggle to an icons-only rail — {collapsed ? "collapsed" : "expanded"}</div><Rail collapsed={collapsed} active={active} onPick={setActive} onToggle={() => setCollapsed((c) => !c)} /></>)}
        {tab === "Icon rail" && (<><div className={s.subLabel}>Icons only, always — labels surface on hover as tooltips</div><Rail collapsed active={active} onPick={setActive} /></>)}
        {tab === "Tree" && (<><div className={s.subLabel}>Nested groups that expand in place</div><TreeRail /></>)}
        {tab === "Variants" && (
          <>
            <div className={s.subLabel}>Rounded, square (flush) and floating</div>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ textAlign: "center" }}><Rail active={active} onPick={setActive} brand={false} /><div className={s.ostepSub} style={{ marginTop: 8 }}>rounded</div></div>
              <div style={{ textAlign: "center" }}><Rail active={active} onPick={setActive} brand={false} variant={s.osnavFlat} /><div className={s.ostepSub} style={{ marginTop: 8 }}>square / flush</div></div>
              <div style={{ textAlign: "center" }}><Rail active={active} onPick={setActive} brand={false} variant={s.osnavFloat} /><div className={s.ostepSub} style={{ marginTop: 8 }}>floating</div></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
