"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import s from "../docs.module.css";

/* ── the shared, dependency-free Calendar ──
   day / month / year views (jump to month + year), single + range modes,
   min/max constraints, and full keyboard navigation. Exported for the
   configurator, behavior demos and field examples to reuse. */

export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export type CalRange = { start: Date | null; end: Date | null };
export const keyOf = (d: Date) => d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate();
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
export const fmt = (d: Date | null) => (d ? `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` : "—");

const ChevronL = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const ChevronR = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);

export function Calendar({
  mode = "single",
  weekStartsOn = 0,
  min,
  max,
  onChange,
  initialDate,
  footer = true,
}: {
  mode?: "single" | "range";
  weekStartsOn?: 0 | 1;
  min?: Date;
  max?: Date;
  onChange?: (v: Date | CalRange | null) => void;
  initialDate?: Date;
  footer?: boolean;
}) {
  const base = initialDate ?? new Date();
  const [view, setView] = useState<"days" | "months" | "years">("days");
  const [cursor, setCursor] = useState({ y: base.getFullYear(), m: base.getMonth() });
  const [single, setSingle] = useState<Date | null>(initialDate ?? null);
  const [range, setRange] = useState<CalRange>({ start: null, end: null });
  const [hover, setHover] = useState<Date | null>(null);
  const [focus, setFocus] = useState<Date>(base);
  const [mounted, setMounted] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const navFlag = useRef(false);
  useEffect(() => setMounted(true), []);

  const today = mounted ? new Date() : null;
  const disabled = (d: Date) => (min && keyOf(d) < keyOf(min)) || (max && keyOf(d) > keyOf(max)) || false;

  const cells = useMemo(() => {
    const first = new Date(cursor.y, cursor.m, 1);
    let lead = first.getDay() - weekStartsOn;
    if (lead < 0) lead += 7;
    const gridStart = new Date(cursor.y, cursor.m, 1 - lead);
    return [...Array(42)].map((_, i) => addDays(gridStart, i));
  }, [cursor, weekStartsOn]);

  const weekdays = [...Array(7)].map((_, i) => DOW[(i + weekStartsOn) % 7]);

  const pick = (d: Date) => {
    if (disabled(d)) return;
    if (mode === "single") {
      setSingle(d); onChange?.(d);
    } else {
      let next: CalRange;
      if (!range.start || range.end) next = { start: d, end: null };
      else next = keyOf(d) < keyOf(range.start) ? { start: d, end: range.start } : { start: range.start, end: d };
      setRange(next);
      onChange?.(next);
    }
  };

  // range endpoints incl. the live hover preview
  const rs = range.start;
  const re = range.end ?? (range.start && !range.end ? hover : null);
  const lo = rs && re ? (keyOf(rs) <= keyOf(re) ? rs : re) : rs;
  const hi = rs && re ? (keyOf(rs) <= keyOf(re) ? re : rs) : rs;

  useEffect(() => {
    if (!navFlag.current) return;
    navFlag.current = false;
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-k="${keyOf(focus)}"]`)?.focus();
  }, [focus, cursor]);

  const onKey = (e: React.KeyboardEvent) => {
    let next: Date | null = null;
    if (e.key === "ArrowRight") next = addDays(focus, 1);
    else if (e.key === "ArrowLeft") next = addDays(focus, -1);
    else if (e.key === "ArrowDown") next = addDays(focus, 7);
    else if (e.key === "ArrowUp") next = addDays(focus, -7);
    else if (e.key === "PageUp") next = new Date(focus.getFullYear(), focus.getMonth() - 1, focus.getDate());
    else if (e.key === "PageDown") next = new Date(focus.getFullYear(), focus.getMonth() + 1, focus.getDate());
    else if (e.key === "Home") next = addDays(focus, -((focus.getDay() - weekStartsOn + 7) % 7));
    else if (e.key === "End") next = addDays(focus, 6 - ((focus.getDay() - weekStartsOn + 7) % 7));
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(focus); return; }
    else return;
    e.preventDefault();
    navFlag.current = true;
    setFocus(next);
    if (next.getMonth() !== cursor.m || next.getFullYear() !== cursor.y) setCursor({ y: next.getFullYear(), m: next.getMonth() });
  };

  const step = (dir: number) => {
    if (view === "days") setCursor((c) => { const d = new Date(c.y, c.m + dir, 1); return { y: d.getFullYear(), m: d.getMonth() }; });
    else if (view === "months") setCursor((c) => ({ ...c, y: c.y + dir }));
    else setCursor((c) => ({ ...c, y: c.y + dir * 12 }));
  };

  const pageStart = Math.floor(cursor.y / 12) * 12;
  const title = view === "days" ? `${MONTHS[cursor.m]} ${cursor.y}` : view === "months" ? `${cursor.y}` : `${pageStart} – ${pageStart + 11}`;

  return (
    <div className={s.ocal}>
      <div className={s.ocalHead}>
        <button type="button" className={s.ocalNav} aria-label="Previous" onClick={() => step(-1)}><ChevronL /></button>
        <button type="button" className={s.ocalTitle} onClick={() => setView(view === "days" ? "months" : view === "months" ? "years" : "days")} aria-live="polite">
          {title}
        </button>
        <button type="button" className={s.ocalNav} aria-label="Next" onClick={() => step(1)}><ChevronR /></button>
      </div>

      {view === "days" && (
        <>
          <div className={s.ocalWkRow} aria-hidden="true">
            {weekdays.map((w, i) => <span key={i} className={s.ocalWk}>{w}</span>)}
          </div>
          <div className={s.ocalGrid} ref={gridRef} role="grid" onKeyDown={onKey} suppressHydrationWarning>
            {cells.map((d) => {
              const out = d.getMonth() !== cursor.m;
              const dis = disabled(d);
              const isToday = today && keyOf(d) === keyOf(today);
              const inR = mode === "range" && lo && hi && keyOf(d) >= keyOf(lo) && keyOf(d) <= keyOf(hi);
              const isLo = mode === "range" && lo && keyOf(d) === keyOf(lo);
              const isHi = mode === "range" && hi && keyOf(d) === keyOf(hi);
              const isSel = mode === "single" && single && keyOf(d) === keyOf(single);
              const cls = [
                s.ocalDay,
                out ? s.ocalMuted : "",
                dis ? s.ocalDisabled : "",
                isToday ? s.ocalToday : "",
                inR && !isLo && !isHi ? s.ocalInRange : "",
                isLo ? s.ocalRangeStart : "",
                isHi ? s.ocalRangeEnd : "",
                isSel ? s.ocalSel : "",
              ].filter(Boolean).join(" ");
              return (
                <button
                  key={keyOf(d)}
                  type="button"
                  data-k={keyOf(d)}
                  tabIndex={keyOf(d) === keyOf(focus) ? 0 : -1}
                  className={cls}
                  disabled={!!dis}
                  aria-current={isToday ? "date" : undefined}
                  aria-selected={!!(isSel || isLo || isHi)}
                  onClick={() => { setFocus(d); pick(d); }}
                  onMouseEnter={() => setHover(d)}
                  onMouseLeave={() => setHover(null)}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
        </>
      )}

      {view === "months" && (
        <div className={s.ocalCells}>
          {MONTHS_SHORT.map((m, i) => (
            <button key={m} type="button" className={`${s.ocalCell} ${i === cursor.m ? s.ocalCellOn : ""}`}
              onClick={() => { setCursor((c) => ({ ...c, m: i })); setView("days"); }}>{m}</button>
          ))}
        </div>
      )}

      {view === "years" && (
        <div className={s.ocalCells}>
          {[...Array(12)].map((_, i) => {
            const y = pageStart + i;
            return (
              <button key={y} type="button" className={`${s.ocalCell} ${y === cursor.y ? s.ocalCellOn : ""}`}
                onClick={() => { setCursor((c) => ({ ...c, y })); setView("months"); }}>{y}</button>
            );
          })}
        </div>
      )}

      {footer && (
        <div className={s.ocalFoot}>
          <span className={s.ocalReadout}>
            {mode === "single" ? fmt(single) : `${fmt(range.start)} → ${fmt(range.end)}`}
          </span>
          <button type="button" className={s.ocalTodayBtn} onClick={() => {
            const n = new Date(); setCursor({ y: n.getFullYear(), m: n.getMonth() }); setView("days"); setFocus(n);
          }}>Today</button>
        </div>
      )}
    </div>
  );
}

/* ── the tabbed live demo ── */
const TABS = ["Single date", "Date range", "In a field"] as const;

const CalIcon = () => (<svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2.5" y="3.5" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" /><path d="M2.5 7h13M6 2v3M12 2v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg>);
const ClearIcon = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);

const pad2 = (n: number) => String(n).padStart(2, "0");
/* DD/Mon/YYYY, e.g. 10/Jul/2026 */
const fmtSlash = (d: Date) => `${pad2(d.getDate())}/${MONTHS_SHORT[d.getMonth()]}/${d.getFullYear()}`;

function rangeLabel(v: CalRange | null) {
  if (!v || !v.start) return "Pick a range";
  const a = fmtSlash(v.start);
  const b = v.end ? fmtSlash(v.end) : "…";
  return `${a} – ${b}`;
}

const SIZECLS: Record<string, string> = { S: "inS", M: "inM", L: "inL" };

/* the picker collapsed into a field. size matches the input scale; `autoClose`
   dismisses on a committed pick; `confirm` stages behind Cancel / Apply. On
   hover a filled field swaps its calendar icon for a clear ✕ that empties the
   value and reopens the calendar. */
function DateField({ size = "M", mode = "single", autoClose = false, confirm = false }:
  { size?: string; mode?: "single" | "range"; autoClose?: boolean; confirm?: boolean }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Date | CalRange | null>(null);
  const [draft, setDraft] = useState<Date | CalRange | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", h); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open]);

  const onCal = (v: Date | CalRange | null) => {
    setDraft(v);
    if (confirm) return;
    if (mode === "single") { setValue(v); if (autoClose) setOpen(false); }
    else { const r = v as CalRange; if (r?.start && r.end) { setValue(v); if (autoClose) setOpen(false); } }
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(null); setDraft(null);
    setOpen(true); // clearing reopens the calendar
  };

  const hasValue = !!value;
  const label = !value
    ? (mode === "range" ? "Pick a range" : "Pick a date")
    : (mode === "range" ? rangeLabel(value as CalRange) : fmt(value as Date));
  const canApply = mode === "range" ? !!((draft as CalRange)?.start && (draft as CalRange)?.end) : !!draft;

  const width = mode === "range" ? (size === "S" ? 250 : 272) : (size === "S" ? 168 : 200);

  return (
    <div className={s.opopAnchor} ref={ref} style={{ display: "block", width }}>
      <div
        className={`${s.oinput} ${s[SIZECLS[size] as keyof typeof s]} ${s.dateTrigger} ${hasValue ? s.dateTriggerHasVal : ""}`}
        role="button" tabIndex={0} aria-haspopup="dialog" aria-expanded={open}
        style={{ color: value ? "var(--color-ink-text-1)" : "var(--color-ink-text-4)" }}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((o) => !o); } }}
      >
        <span className={s.dateTriggerLabel}>{label}</span>
        <span className={s.dateTriggerIcon}><CalIcon /></span>
        {hasValue && <button type="button" className={s.dateClearBtn} aria-label="Clear" onClick={clear}><ClearIcon /></button>}
      </div>
      <div className={`${s.opop} ${s.opopBottom} ${open ? s.opopOpen : ""}`} style={{ width: 268, marginLeft: 0, left: 0 }} role="dialog" aria-label={mode === "range" ? "Choose a date range" : "Choose a date"}>
        <span className={s.opopArrow} style={{ left: 24, marginLeft: 0 }} aria-hidden="true" />
        <Calendar mode={mode} footer={!confirm} onChange={onCal} />
        {confirm && (
          <div className={s.dateFieldActions}>
            {mode === "single" && <span className={s.ocalReadout}>{draft ? fmt(draft as Date) : "—"}</span>}
            <span className={s.dateFieldBtns}>
              <button type="button" className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={() => setOpen(false)}>Cancel</button>
              <button type="button" className={`${s.obtn} ${s.sm} ${s.vPrimary}`} disabled={!canApply} onClick={() => { if (draft) setValue(draft); setOpen(false); }}>Apply</button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* small inline controls for the field playground */
function FieldChips({ label, options, value, onPick }: { label: string; options: string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
      <span className={s.configLabel}>{label}</span>
      <div className={s.configChips}>
        {options.map((o) => (
          <button key={o} type="button" role="radio" aria-checked={value === o}
            className={`${s.configChip} ${value === o ? s.configChipOn : ""}`} onClick={() => onPick(o)}>{o}</button>
        ))}
      </div>
    </div>
  );
}
function FieldSwitch({ label, on, onToggle }: { label: string; on: boolean; onToggle: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
      <span className={s.configLabel}>{label}</span>
      <button type="button" role="switch" aria-checked={on} onClick={onToggle} className={`${s.otoggle} ${s.otM} ${on ? s.otOn : ""}`} />
    </div>
  );
}

export default function DatePickerDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Single date");
  const [fSize, setFSize] = useState("M");
  const [fMode, setFMode] = useState("Single");
  const [fAuto, setFAuto] = useState(false);
  const [fConfirm, setFConfirm] = useState(false);
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Date picker examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab} style={tab === "In a field" ? { minHeight: 580 } : undefined}>
        {tab === "Single date" && (
          <>
            <div className={s.subLabel}>Click the title to jump to months, then years — Home/End, arrows and PageUp/Down navigate</div>
            <div style={{ display: "flex", justifyContent: "center" }}><Calendar mode="single" /></div>
          </>
        )}
        {tab === "Date range" && (
          <>
            <div className={s.subLabel}>Pick a start, then an end — hover previews the span</div>
            <div style={{ display: "flex", justifyContent: "center" }}><Calendar mode="range" /></div>
          </>
        )}
        {tab === "In a field" && (
          <>
            <div className={s.subLabel}>The picker as an input — size the trigger and configure its behaviour. Hover a filled field to clear it</div>
            <div style={{ display: "flex", gap: 26, justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap", marginBottom: 26 }}>
              <FieldChips label="Size" options={["S", "M", "L"]} value={fSize} onPick={setFSize} />
              <FieldChips label="Mode" options={["Single", "Range"]} value={fMode} onPick={setFMode} />
              <FieldSwitch label="Auto close" on={fAuto} onToggle={() => setFAuto((v) => !v)} />
              <FieldSwitch label="Confirm button" on={fConfirm} onToggle={() => setFConfirm((v) => !v)} />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <DateField key={`${fSize}-${fMode}-${fAuto}-${fConfirm}`} size={fSize} mode={fMode === "Range" ? "range" : "single"} autoClose={fAuto} confirm={fConfirm} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
