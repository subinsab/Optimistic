"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["As you type", "Clearable", "Empty"] as const;
const SearchIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
const X = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);
const Doc = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 2h5l3 3v9H4V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M9 2v3h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>);

const DATA = [
  { title: "Color System", meta: "Foundations" },
  { title: "Button", meta: "Forms" },
  { title: "Combobox", meta: "Forms" },
  { title: "Callout", meta: "Feedback" },
  { title: "Command Menu", meta: "Navigation" },
  { title: "Checkbox", meta: "Forms" },
  { title: "Table", meta: "Data Display" },
  { title: "Tabs", meta: "Navigation" },
];

export function SearchField({ withClear, initial = "", autoFocus, placeholder = "Search components…", onCollapse }:
  { withClear?: boolean; initial?: string; autoFocus?: boolean; placeholder?: string; onCollapse?: () => void }) {
  const [q, setQ] = useState(initial);
  const [open, setOpen] = useState(initial.length > 0);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const results = useMemo(() => q ? DATA.filter((d) => d.title.toLowerCase().includes(q.toLowerCase())) : [], [q]);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        if (!q && onCollapse) onCollapse(); // empty + collapsible ⇒ collapse the whole field
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [q, onCollapse]);
  useEffect(() => setActive(0), [q]);
  return (
    <div className={s.osearch} ref={ref}>
      <span className={s.inWrap}>
        <span className={s.inIcon}><SearchIcon /></span>
        <input
          autoFocus={autoFocus}
          className={`${s.oinput} ${s.inM} ${s.inHasIcon} ${withClear && q ? s.inHasAffix : ""}`}
          value={q}
          placeholder={placeholder}
          type="search"
          role="searchbox"
          aria-label="Search"
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => q && setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
            if (e.key === "Enter" && results[active]) { setQ(results[active].title); setOpen(false); }
            if (e.key === "Escape") { if (q) { setQ(""); setOpen(false); } else onCollapse?.(); }
          }}
        />
        {withClear && q && (
          <button type="button" className={`${s.inAffix} ${s.inAffixBtn}`} aria-label="Clear" onClick={() => { setQ(""); setOpen(false); }}><X /></button>
        )}
      </span>
      {open && q && (
        <div className={s.omenu} role="listbox">
          {results.length === 0
            ? <div className={s.omenuEmpty}>No components match “{q}”.</div>
            : results.map((r, i) => (
              <button key={r.title} type="button" role="option" aria-selected={i === active}
                className={`${s.osearchResult} ${i === active ? s.omenuActive : ""}`}
                onMouseEnter={() => setActive(i)} onClick={() => { setQ(r.title); setOpen(false); }}>
                <span className={s.osearchResIcon}><Doc /></span>
                <span className={s.osearchResText}><span className={s.osearchResTitle}>{r.title}</span><span className={s.osearchResMeta}>{r.meta}</span></span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default function SearchDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("As you type");
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Search examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab} style={{ minHeight: 360 }}>
        {tab === "As you type" && (<><div className={s.subLabel}>Results answer live — try “ta” or “co”</div><SearchField initial="co" /></>)}
        {tab === "Clearable" && (<><div className={s.subLabel}>A clear button appears once there is a query</div><SearchField withClear initial="button" /></>)}
        {tab === "Empty" && (<><div className={s.subLabel}>No result is a message, not a blank void</div><SearchField initial="zzz" /></>)}
      </div>
    </div>
  );
}
