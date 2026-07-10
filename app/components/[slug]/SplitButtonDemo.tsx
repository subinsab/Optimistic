"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["Primary", "Brand", "Ghost"] as const;
const VAR: Record<string, string> = { Primary: "vPrimary", Brand: "vWarm", Ghost: "vGhost" };
const Chevron = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Save = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 3h8l2 2v8H3V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M6 3v3h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);
const OPTIONS = [
  { label: "Save and duplicate", icon: <Save /> },
  { label: "Save as template", icon: <Save /> },
  { label: "Save and close", icon: <Save /> },
];

function Split({ variant, onChoose }: { variant: string; onChoose: (l: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", h);
    document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open]);
  const v = s[VAR[variant] as keyof typeof s];
  return (
    <div className={`${s.osplit} ${open ? s.osplitOpen : ""}`} ref={ref}>
      <button type="button" className={`${s.obtn} ${s.m} ${v} ${s.osplitMain}`} onClick={() => onChoose("Save")}>Save</button>
      <button type="button" className={`${s.obtn} ${s.m} ${v} ${s.osplitToggle}`} aria-haspopup="menu" aria-expanded={open} aria-label="More save options" onClick={() => setOpen((o) => !o)}><Chevron /></button>
      {open && (
        <div className={s.osplitMenu} role="menu">
          {OPTIONS.map((o) => (
            <button key={o.label} role="menuitem" className={s.osplitOpt} onClick={() => { onChoose(o.label); setOpen(false); }}>
              {o.icon}{o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SplitButtonDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Primary");
  const [last, setLast] = useState("");
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Split button variants">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        <div className={s.subLabel}>Primary click acts; the chevron opens alternatives</div>
        {/* reserve room so the open menu stays inside the clipped demo panel */}
        <div className={s.btnRow} style={{ gap: 16, minHeight: 210, alignItems: "flex-start" }}>
          <Split variant={tab} onChoose={setLast} />
          {last && <span className={s.stateBadge}>ran: {last}</span>}
        </div>
      </div>
    </div>
  );
}
