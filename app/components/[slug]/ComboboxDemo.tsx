"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["Filter", "No match", "Async"] as const;
const FRUITS = ["Apple", "Apricot", "Avocado", "Banana", "Blackberry", "Blueberry", "Cherry", "Cranberry", "Date", "Dragonfruit", "Elderberry", "Fig", "Grape", "Guava", "Kiwi", "Lemon", "Lime", "Mango", "Melon", "Orange", "Papaya", "Peach", "Pear", "Plum"];

function highlight(text: string, q: string) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text;
  return (<>{text.slice(0, i)}<span className={s.ocomboMatch}>{text.slice(i, i + q.length)}</span>{text.slice(i + q.length)}</>);
}

function Combo({ items }: { items: string[] }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const results = useMemo(() => items.filter((i) => i.toLowerCase().includes(q.toLowerCase())), [items, q]);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);
  useEffect(() => setActive(0), [q]);
  const commit = (v: string) => { setQ(v); setOpen(false); };
  return (
    <div className={s.ocombo} ref={ref}>
      <span className={s.inWrap}>
        <input
          className={`${s.oinput} ${s.inM}`}
          value={q}
          placeholder="Search fruit…"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setOpen(true); setActive((a) => Math.min(a + 1, results.length - 1)); }
            if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
            if (e.key === "Enter" && results[active]) { e.preventDefault(); commit(results[active]); }
            if (e.key === "Escape") setOpen(false);
          }}
        />
      </span>
      {open && (
        <div className={s.omenu} role="listbox">
          {results.length === 0
            ? <div className={s.omenuEmpty}>No fruit matches “{q}”.</div>
            : results.map((r, i) => (
              <button key={r} type="button" role="option" aria-selected={i === active}
                className={`${s.omenuOpt} ${i === active ? s.omenuActive : ""}`}
                onMouseEnter={() => setActive(i)} onClick={() => commit(r)}>
                {highlight(r, q)}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

export default function ComboboxDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Filter");
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Combobox examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab} style={{ minHeight: 360 }}>
        {tab === "Filter" && (<><div className={s.subLabel}>Type to filter — the match is highlighted, ↑↓ to move</div><Combo items={FRUITS} /></>)}
        {tab === "No match" && (<><div className={s.subLabel}>An honest empty state, never a dead dropdown</div><Combo items={["Apple", "Banana", "Cherry"]} /></>)}
        {tab === "Async" && (<><div className={s.subLabel}>Same field, backed by a small set (try “berry”)</div><Combo items={FRUITS.filter(f => f.toLowerCase().includes("berry"))} /></>)}
      </div>
    </div>
  );
}
