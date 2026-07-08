"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import s from "../docs.module.css";

/* ── the shared, dependency-free Time Picker ──
   column selectors for hours / minutes / period, 12h + 24h, a minute
   step, and keyboard support. Exported for the configurator, behavior
   demos and field example to reuse. */

export type Time = { h: number; m: number }; // h in 0-23, m in 0-59
const pad = (n: number) => String(n).padStart(2, "0");
export const fmtTime = (t: Time, hour12 = true) => {
  if (!hour12) return `${pad(t.h)}:${pad(t.m)}`;
  const hd = ((t.h + 11) % 12) + 1;
  return `${hd}:${pad(t.m)} ${t.h < 12 ? "AM" : "PM"}`;
};

/* a scroll-wheel column: the option nearest the centre is the selection.
   scrolling snaps and selects; clicking selects too. */
function Column({ label, items, value, render, onPick }: {
  label: string; items: number[]; value: number; render: (n: number) => string; onPick: (n: number) => void;
}) {
  const colRef = useRef<HTMLDivElement>(null);
  const selRef = useRef<HTMLButtonElement>(null);
  const lock = useRef(false);   // true while we scroll programmatically
  const lockT = useRef<ReturnType<typeof setTimeout>>(undefined);
  const scrollT = useRef<ReturnType<typeof setTimeout>>(undefined);

  const centerSelected = () => {
    const c = colRef.current, o = selRef.current;
    if (!c || !o) return;
    lock.current = true;
    c.scrollTop = o.offsetTop - c.clientHeight / 2 + o.clientHeight / 2;
    clearTimeout(lockT.current);
    lockT.current = setTimeout(() => { lock.current = false; }, 120);
  };

  useEffect(centerSelected, [value]);

  const onScroll = () => {
    if (lock.current) return;
    clearTimeout(scrollT.current);
    scrollT.current = setTimeout(() => {
      const c = colRef.current;
      if (!c) return;
      const center = c.scrollTop + c.clientHeight / 2;
      let bestN = value, bestD = Infinity;
      c.querySelectorAll<HTMLElement>("[data-n]").forEach((el) => {
        const mid = el.offsetTop + el.clientHeight / 2;
        const d = Math.abs(mid - center);
        if (d < bestD) { bestD = d; bestN = Number(el.dataset.n); }
      });
      if (bestN !== value) onPick(bestN);
      else centerSelected(); // snap exactly to the current value
    }, 110);
  };

  return (
    <div className={s.otimeColWrap}>
      <span className={s.otimeColLabel}>{label}</span>
      <div className={s.otimeCol} ref={colRef} role="listbox" aria-label={label} onScroll={onScroll}>
        {items.map((n) => (
          <button
            key={n}
            data-n={n}
            ref={n === value ? selRef : null}
            type="button"
            role="option"
            aria-selected={n === value}
            className={`${s.otimeOpt} ${n === value ? s.otimeOptOn : ""}`}
            onClick={() => onPick(n)}
          >
            <span className={s.otimeVal}>{render(n)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function TimePicker({
  hour12 = true,
  step = 1,
  initial = { h: 9, m: 0 },
  onChange,
  footer = true,
  footerActions,
}: {
  hour12?: boolean;
  step?: number;
  initial?: Time;
  onChange?: (t: Time) => void;
  footer?: boolean;
  footerActions?: ReactNode;
}) {
  const [t, setT] = useState<Time>(initial);
  const set = (next: Time) => { setT(next); onChange?.(next); };

  const period = t.h < 12 ? "AM" : "PM";
  const hd = ((t.h + 11) % 12) + 1;

  const hourItems = hour12 ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : Array.from({ length: 24 }, (_, i) => i);
  // minutes run 0 → 59 in `step` increments (step 1 = every minute)
  const minuteItems = Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step);

  const pickHour = (val: number) => {
    if (hour12) {
      const base = val % 12; // 12 -> 0
      set({ ...t, h: period === "PM" ? base + 12 : base });
    } else set({ ...t, h: val });
  };
  const pickPeriod = (p: "AM" | "PM") => {
    const base = t.h % 12;
    set({ ...t, h: p === "PM" ? base + 12 : base });
  };

  return (
    <div className={s.otime}>
      <div className={s.otimeHead} suppressHydrationWarning>{fmtTime(t, hour12)}</div>
      <div className={s.otimeCols}>
        <Column label="Hr" items={hourItems} value={hour12 ? hd : t.h} render={(n) => (hour12 ? String(n) : pad(n))} onPick={pickHour} />
        <span className={s.otimeSep} aria-hidden="true">:</span>
        <Column label="Min" items={minuteItems} value={t.m} render={pad} onPick={(n) => set({ ...t, m: n })} />
        {hour12 && (
          <div className={s.otimePeriod}>
            <span className={s.otimeColLabel}>&nbsp;</span>
            <div className={s.otimePeriodBtns}>
              {(["AM", "PM"] as const).map((p) => (
                <button key={p} type="button" className={`${s.otimePeriodBtn} ${period === p ? s.otimePeriodOn : ""}`} aria-pressed={period === p} onClick={() => pickPeriod(p)}>{p}</button>
              ))}
            </div>
          </div>
        )}
      </div>
      {footer && (
        <div className={s.otimeFoot}>
          {footerActions ?? (
            <>
              <span className={s.otimeReadout}>{fmtTime(t, hour12)}</span>
              <button type="button" className={s.otimeNow} onClick={() => { const d = new Date(); const mm = Math.round(d.getMinutes() / step) * step % 60; set({ h: d.getHours(), m: mm }); }}>Now</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ── tabbed live demo ── */
const TABS = ["12-hour", "24-hour", "In a field"] as const;

function TimeField({ confirm = false }: { confirm?: boolean }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Time | null>(null);
  const draft = useRef<Time>({ h: 9, m: 0 });
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", h); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open]);

  const onCal = (t: Time) => { draft.current = t; if (!confirm) setValue(t); };

  return (
    <div className={s.opopAnchor} ref={ref} style={{ display: "block", width: 184 }}>
      <button type="button" className={`${s.oinput} ${s.inM}`} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", color: value ? "#e7e9ee" : "#565a62" }} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {value ? fmtTime(value) : "Pick a time"}
        <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.3" /><path d="M9 5.5V9l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {/* transparent popover wrapper so the picker's own card is the only
          surface — matching the standalone time modules exactly */}
      <div className={`${s.opop} ${s.opopBottom} ${open ? s.opopOpen : ""}`} style={{ width: 184, marginLeft: 0, left: 0, background: "transparent", border: 0, boxShadow: "0 18px 48px rgba(0,0,0,.5)" }} role="dialog" aria-label="Choose time">
        <span className={s.opopArrow} style={{ left: 24, marginLeft: 0, background: "#0e0f12", borderColor: "#1e1f24" }} aria-hidden="true" />
        <TimePicker
          onChange={onCal}
          footer
          footerActions={confirm ? (
            <span className={s.dateFieldBtns}>
              <button type="button" className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={() => setOpen(false)}>Cancel</button>
              <button type="button" className={`${s.obtn} ${s.sm} ${s.vPrimary}`} onClick={() => { setValue(draft.current); setOpen(false); }}>Apply</button>
            </span>
          ) : undefined}
        />
      </div>
    </div>
  );
}

export default function TimePickerDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("12-hour");
  const [confirm, setConfirm] = useState(false);
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Time picker examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab} style={tab === "In a field" ? { minHeight: 450 } : undefined}>
        {tab === "12-hour" && (
          <>
            <div className={s.subLabel}>Scroll each column; the selection snaps to centre. AM / PM on the right</div>
            <div style={{ display: "flex", justifyContent: "center" }}><TimePicker hour12 step={1} /></div>
          </>
        )}
        {tab === "24-hour" && (
          <>
            <div className={s.subLabel}>The 24-hour clock — no period column, hours run 00–23</div>
            <div style={{ display: "flex", justifyContent: "center" }}><TimePicker hour12={false} step={1} /></div>
          </>
        )}
        {tab === "In a field" && (
          <>
            <div className={s.subLabel}>Collapsed into an input — the same picker in a popover. Add a confirm button to stage the pick behind Apply</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                <button type="button" role="switch" aria-checked={confirm} onClick={() => setConfirm((v) => !v)}
                  className={`${s.otoggle} ${s.otS} ${confirm ? s.otOn : ""}`} />
                <span className={s.otTitle} style={{ fontSize: "0.82rem" }}>Confirm button</span>
              </label>
              <TimeField key={confirm ? "c" : "n"} confirm={confirm} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
