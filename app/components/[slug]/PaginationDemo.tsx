"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["Numbered", "Compact", "Simple", "Page size"] as const;
const Chevron = ({ dir }: { dir: "l" | "r" }) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"
    style={{ transform: dir === "l" ? "rotate(180deg)" : "none" }}>
    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Caret = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Tick = () => (<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);

/** compact rows-per-page select; opens upward so it fits a footer */
function PageSize({ value, options, onChange }: { value: number; options: number[]; onChange: (v: number) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", h); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open]);
  return (
    <div className={`${s.odd} ${open ? s.oddOpen : ""}`} style={{ width: "auto" }} ref={ref}>
      <button type="button" className={s.oddTrigger} style={{ width: "auto", height: 32, padding: "0 10px", gap: 6 }}
        aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span>{value}</span><span className={s.oddChevron}><Caret /></span>
      </button>
      {open && (
        <div className={s.omenu} style={{ left: 0, right: "auto", minWidth: 84 }} role="listbox">
          {options.map((o) => (
            <button key={o} type="button" role="option" aria-selected={o === value}
              className={`${s.omenuOpt} ${o === value ? s.omenuOptOn : ""}`} onClick={() => { onChange(o); setOpen(false); }}>
              {o}{o === value && <span className={s.omenuCheck}><Tick /></span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** page list with ellipses: 1 … c-1 c c+1 … total */
export function pageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const lo = Math.max(2, current - 1);
  const hi = Math.min(total - 1, current + 1);
  if (lo > 2) out.push("…");
  for (let p = lo; p <= hi; p++) out.push(p);
  if (hi < total - 1) out.push("…");
  out.push(total);
  return out;
}

export default function PaginationDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Numbered");
  const [page, setPage] = useState(4);
  const total = 12;
  const go = (p: number) => setPage(Math.min(total, Math.max(1, p)));

  // page-size variant
  const TOTAL_ITEMS = 240;
  const [size, setSize] = useState(20);
  const [sPage, setSPage] = useState(1);
  const sTotal = Math.ceil(TOTAL_ITEMS / size);
  const from = (sPage - 1) * size + 1;
  const to = Math.min(sPage * size, TOTAL_ITEMS);
  const sGo = (p: number) => setSPage(Math.min(sTotal, Math.max(1, p)));

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Pagination styles">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab} style={tab === "Page size" ? { minHeight: 240 } : undefined}>
        <div className={s.subLabel}>{tab === "Page size" ? `Rows per page changes the range and page count` : `Page ${page} of ${total}`}</div>
        {tab === "Numbered" && (
          <nav className={s.opag} aria-label="Pagination">
            <button className={`${s.opagItem} ${s.opagArrow}`} onClick={() => go(page - 1)} disabled={page === 1} aria-label="Previous"><Chevron dir="l" /></button>
            {pageList(page, total).map((p, i) =>
              p === "…"
                ? <span key={`e${i}`} className={s.opagEllipsis}>…</span>
                : <button key={p} className={`${s.opagItem} ${p === page ? s.opagOn : ""}`} aria-current={p === page ? "page" : undefined} onClick={() => go(p)}>{p}</button>
            )}
            <button className={`${s.opagItem} ${s.opagArrow}`} onClick={() => go(page + 1)} disabled={page === total} aria-label="Next"><Chevron dir="r" /></button>
          </nav>
        )}
        {tab === "Compact" && (
          <nav className={s.opag} aria-label="Pagination">
            <button className={`${s.opagItem} ${s.opagArrow}`} onClick={() => go(page - 1)} disabled={page === 1} aria-label="Previous"><Chevron dir="l" /></button>
            <span className={s.opagInfo}>Page {page} of {total}</span>
            <button className={`${s.opagItem} ${s.opagArrow}`} onClick={() => go(page + 1)} disabled={page === total} aria-label="Next"><Chevron dir="r" /></button>
          </nav>
        )}
        {tab === "Simple" && (
          <nav className={s.opag} aria-label="Pagination">
            <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={() => go(page - 1)} disabled={page === 1}>Previous</button>
            <span className={s.opagInfo}>{page} / {total}</span>
            <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={() => go(page + 1)} disabled={page === total}>Next</button>
          </nav>
        )}
        {tab === "Page size" && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", width: "100%", maxWidth: 540 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className={s.opagInfo} style={{ margin: 0 }}>Rows per page</span>
              <PageSize value={size} options={[10, 20, 50]} onChange={(v) => { setSize(v); setSPage(1); }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className={s.opagInfo} style={{ margin: 0 }}>{from}–{to} of {TOTAL_ITEMS}</span>
              <nav className={s.opag} aria-label="Pagination">
                <button className={`${s.opagItem} ${s.opagArrow}`} onClick={() => sGo(sPage - 1)} disabled={sPage === 1} aria-label="Previous"><Chevron dir="l" /></button>
                <button className={`${s.opagItem} ${s.opagArrow}`} onClick={() => sGo(sPage + 1)} disabled={sPage === sTotal} aria-label="Next"><Chevron dir="r" /></button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
