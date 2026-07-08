"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["Actions", "Sections", "Standalone"] as const;
const Dots = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="3" r="1.4" fill="currentColor" /><circle cx="8" cy="8" r="1.4" fill="currentColor" /><circle cx="8" cy="13" r="1.4" fill="currentColor" /></svg>);
const I = {
  edit: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5l2 2L6 12l-2.5.5L4 10l7.5-7.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>,
  copy: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M3 10V4a1 1 0 0 1 1-1h6" stroke="currentColor" strokeWidth="1.4" /></svg>,
  move: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 5.5h5l1 1.5H14v6H2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>,
  share: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="12" cy="4" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="4" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" /><path d="M6 7l4-2M6 9l4 2" stroke="currentColor" strokeWidth="1.4" /></svg>,
  trash: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 4.5h10M6 4.5V3h4v1.5M4.5 4.5l.5 8h6l.5-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>,
};

function Menu({ standalone = false }: { standalone?: boolean }) {
  const [open, setOpen] = useState(standalone);
  const [last, setLast] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open || standalone) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", h); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open, standalone]);
  const pick = (l: string) => { setLast(l); if (!standalone) setOpen(false); };
  const panel = (
    <div className={`${s.omenu} ${standalone ? s.omenuStandalone : ""}`} role="menu" style={standalone ? undefined : { minWidth: 210 }}>
      <button role="menuitem" className={s.omenuOpt} onClick={() => pick("Edit")}><span className={s.omenuIcon}>{I.edit}</span>Edit<span className={s.omenuKbd}>E</span></button>
      <button role="menuitem" className={s.omenuOpt} onClick={() => pick("Duplicate")}><span className={s.omenuIcon}>{I.copy}</span>Duplicate<span className={s.omenuKbd}>⌘D</span></button>
      <button role="menuitem" className={s.omenuOpt} onClick={() => pick("Move")}><span className={s.omenuIcon}>{I.move}</span>Move to…</button>
      <div className={s.omenuDivider} />
      <button role="menuitem" className={`${s.omenuOpt} ${s.omenuOptDanger}`} onClick={() => pick("Delete")}><span className={s.omenuIcon}>{I.trash}</span>Delete<span className={s.omenuKbd}>⌫</span></button>
    </div>
  );
  if (standalone) return <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>{panel}{last && <span className={s.stateBadge}>ran: {last}</span>}</div>;
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 14 }} ref={ref}>
      <button type="button" className={`${s.obtn} ${s.m} ${s.vGhost}`} style={{ width: 40, padding: 0 }} aria-haspopup="menu" aria-expanded={open} aria-label="Open menu" onClick={() => setOpen((o) => !o)}><Dots /></button>
      {open && panel}
      {last && <span className={s.stateBadge}>ran: {last}</span>}
    </div>
  );
}

function SectionMenu() {
  return (
    <div className={`${s.omenu} ${s.omenuStandalone}`} role="menu">
      <div className={s.omenuGroupLabel}>This file</div>
      <button role="menuitem" className={s.omenuOpt}><span className={s.omenuIcon}>{I.edit}</span>Rename</button>
      <button role="menuitem" className={s.omenuOpt}><span className={s.omenuIcon}>{I.copy}</span>Duplicate</button>
      <div className={s.omenuDivider} />
      <div className={s.omenuGroupLabel}>Share</div>
      <button role="menuitem" className={s.omenuOpt}><span className={s.omenuIcon}>{I.share}</span>Get link<span className={s.omenuKbd}>⌘L</span></button>
      <button role="menuitem" className={s.omenuOpt}><span className={s.omenuIcon}>{I.move}</span>Move to…</button>
      <div className={s.omenuDivider} />
      <button role="menuitem" className={`${s.omenuOpt} ${s.omenuOptDanger}`}><span className={s.omenuIcon}>{I.trash}</span>Delete</button>
    </div>
  );
}

export default function MenuDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Actions");
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Menu examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab} style={tab === "Actions" ? { minHeight: 290 } : undefined}>
        {tab === "Actions" && (
          <>
            <div className={s.subLabel}>A trigger opens contextual actions — click the ⋮</div>
            <Menu />
          </>
        )}
        {tab === "Sections" && (
          <>
            <div className={s.subLabel}>Grouped with labels and dividers</div>
            <SectionMenu />
          </>
        )}
        {tab === "Standalone" && (
          <>
            <div className={s.subLabel}>The panel itself — icons, shortcuts, a danger row</div>
            <Menu standalone />
          </>
        )}
      </div>
    </div>
  );
}
