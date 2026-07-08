"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["Basic", "Truncated", "With icons"] as const;
const noNav = (e: React.MouseEvent) => e.preventDefault();
const Sep = () => (<span className={s.obcSep}><svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>);
const Home = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 7L8 2.5 13.5 7M4 6v7.5h8V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Folder = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 4.5h4l1.2 1.5H14v6.5H2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>);

const FULL = ["Home", "Workspace", "Projects", "Design System", "Components", "Avatar"];

function TruncMenu({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", h); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open]);
  return (
    <span ref={ref} style={{ position: "relative", display: "inline-flex" }}>
      <button type="button" className={s.obcItem} aria-haspopup="true" aria-expanded={open} aria-label="Show hidden path" onClick={() => setOpen((o) => !o)}>…</button>
      {open && (
        <div className={s.obcMenu} role="menu">
          {items.map((c) => (
            <a key={c} href="#" onClick={(e) => { noNav(e); setOpen(false); }} role="menuitem" className={s.omenuOpt}><span className={s.omenuIcon}><Folder /></span>{c}</a>
          ))}
        </div>
      )}
    </span>
  );
}

export default function BreadcrumbsDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Basic");
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Breadcrumbs examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab} style={tab === "Truncated" ? { minHeight: 190 } : undefined}>
        {tab === "Basic" && (
          <>
            <div className={s.subLabel}>The full trail, current page not a link</div>
            <nav className={s.obc} aria-label="Breadcrumb">
              {["Home", "Components", "Data Display"].map((c) => (
                <span key={c} style={{ display: "inline-flex", alignItems: "center" }}>
                  <a href="#" onClick={noNav} className={s.obcItem}>{c}</a><Sep />
                </span>
              ))}
              <span className={`${s.obcItem} ${s.obcCurrent}`} aria-current="page">Avatar</span>
            </nav>
          </>
        )}
        {tab === "Truncated" && (
          <>
            <div className={s.subLabel}>Long paths collapse — click … to see the rest</div>
            <nav className={s.obc} aria-label="Breadcrumb">
              <a href="#" onClick={noNav} className={s.obcItem}><Home /> {FULL[0]}</a><Sep />
              <TruncMenu items={FULL.slice(1, -2)} /><Sep />
              <a href="#" onClick={noNav} className={s.obcItem}>{FULL[FULL.length - 2]}</a><Sep />
              <span className={`${s.obcItem} ${s.obcCurrent}`} aria-current="page">{FULL[FULL.length - 1]}</span>
            </nav>
            <div className={s.subLabel}>A single long crumb truncates with an ellipsis</div>
            <nav className={s.obc} aria-label="Breadcrumb">
              <a href="#" onClick={noNav} className={s.obcItem}>Projects</a><Sep />
              <a href="#" onClick={noNav} className={s.obcItem}><span className={s.obcTrunc}>Q3 Marketing Website Redesign</span></a><Sep />
              <span className={`${s.obcItem} ${s.obcCurrent}`} aria-current="page">Overview</span>
            </nav>
          </>
        )}
        {tab === "With icons" && (
          <>
            <div className={s.subLabel}>A leading home icon and folder glyphs</div>
            <nav className={s.obc} aria-label="Breadcrumb">
              <a href="#" onClick={noNav} className={s.obcItem}><Home /> Home</a><Sep />
              <a href="#" onClick={noNav} className={s.obcItem}><Folder /> Projects</a><Sep />
              <span className={`${s.obcItem} ${s.obcCurrent}`} aria-current="page">Roadmap</span>
            </nav>
          </>
        )}
      </div>
    </div>
  );
}
