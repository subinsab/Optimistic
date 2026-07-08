"use client";

import { useRef, useState } from "react";
import s from "../docs.module.css";

/* live behavior — toggling a filter narrows the list INSTANTLY (optimistic),
   then a debounced request reconciles the real result set. */

const ITEMS = [
  { name: "Homepage hero", status: "Live" },
  { name: "Pricing table", status: "Draft" },
  { name: "Footer nav", status: "Live" },
  { name: "Onboarding", status: "In review" },
  { name: "Changelog", status: "Draft" },
  { name: "Search modal", status: "Live" },
  { name: "Settings form", status: "In review" },
];
const STATUSES = ["Live", "Draft", "In review"];
const Check = ({ on }: { on: boolean }) => <span className={`${s.ochk} ${s.chkS} ${on ? s.ochkOn : ""}`} aria-hidden="true" />;

export default function FilterBehavior() {
  const [sel, setSel] = useState<string[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const t = useRef<ReturnType<typeof setTimeout>>(undefined);
  const push = (l: string) => setLog((x) => [l, ...x].slice(0, 5));

  const toggle = (st: string) => {
    const next = sel.includes(st) ? sel.filter((x) => x !== st) : [...sel, st];
    setSel(next); // optimistic: list re-filters immediately
    clearTimeout(t.current);
    t.current = setTimeout(() => {
      const q = next.length ? next.map((x) => x.toLowerCase().replace(" ", "_")).join(",") : "all";
      push(`GET /items?status=${q}`);
      setTimeout(() => push(`● 200 · ${filtered(next).length} results · ${40 + Math.floor(Math.random() * 60)}ms`), 400);
    }, 250);
  };
  const filtered = (s: string[]) => (s.length ? ITEMS.filter((i) => s.includes(i.status)) : ITEMS);
  const shown = filtered(sel);

  return (
    <div className={s.behCard}>
      <div className={s.behHead}>
        <span>Optimistic filtering · status</span>
        <span className={s.behVerb}>GET</span>
      </div>
      <div className={s.behStage} style={{ alignItems: "flex-start", gap: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 120 }}>
          {STATUSES.map((st) => (
            <button key={st} type="button" role="checkbox" aria-checked={sel.includes(st)} className={s.ofilOption} onClick={() => toggle(st)}>
              <Check on={sel.includes(st)} /> {st}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: 150, display: "flex", flexDirection: "column", gap: 8 }}>
          <div className={s.behOut} style={{ marginLeft: 0, textAlign: "left" }}>
            <b>{shown.length}</b> of {ITEMS.length} shown
          </div>
          <div className={s.behLog} style={{ borderTop: 0, padding: 0, maxHeight: 100 }}>
            {log.length ? log.map((l, i) => <span key={i}>{l}</span>) : <span>toggle a status to filter</span>}
          </div>
        </div>
      </div>
      <div className={s.behCaption}>
        The list narrows the instant you toggle a filter — no spinner, no wait. A debounced request follows and
        reconciles the real result count. Filtering should feel like it happens in the browser, because it does.
      </div>
    </div>
  );
}
