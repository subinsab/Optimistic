"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["Basic", "Grouped", "Multi-select", "Left / right", "States"] as const;
const Chevron = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Check = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);

function useDismiss(open: boolean, close: () => void, ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) close(); };
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("mousedown", h); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open, close, ref]);
}

/* Multi-select with a Clear / Confirm footer; selections are a draft until confirmed */
function MultiSelect({ options, value, onChange, placeholder = "Select…" }:
  { options: string[]; value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string[]>(value);
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(open, () => setOpen(false), ref);
  useEffect(() => { if (open) setDraft(value); }, [open, value]);
  const toggle = (o: string) => setDraft((d) => (d.includes(o) ? d.filter((x) => x !== o) : [...d, o]));
  const label = value.length === 0 ? placeholder : value.length <= 2 ? value.join(", ") : `${value.length} selected`;
  return (
    <div className={`${s.odd} ${open ? s.oddOpen : ""}`} ref={ref}>
      <button type="button" className={s.oddTrigger} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span className={`${s.oddValue} ${value.length === 0 ? s.oddPlaceholder : ""}`}>{label}</span>
        <span className={s.oddChevron}><Chevron /></span>
      </button>
      {open && (
        <div className={s.omenu} role="listbox" aria-multiselectable="true">
          {options.map((o) => (
            <button key={o} type="button" role="option" aria-selected={draft.includes(o)} className={s.omenuOpt} onClick={() => toggle(o)}>
              <span className={`${s.ochk} ${s.chkS} ${draft.includes(o) ? s.ochkOn : ""}`} aria-hidden="true" />
              {o}
            </button>
          ))}
          <div className={s.oddFooter}>
            <span className={s.oddFooterCount}>{draft.length} selected</span>
            <button type="button" className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={() => setDraft([])}>Clear</button>
            <button type="button" className={`${s.obtn} ${s.sm} ${s.vPrimary}`} onClick={() => { onChange(draft); setOpen(false); }}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* Options with a left label and a right-aligned sub-value */
function SplitSelect({ options, value, onChange, placeholder = "Select…" }:
  { options: { label: string; sub: string }[]; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(open, () => setOpen(false), ref);
  return (
    <div className={`${s.odd} ${open ? s.oddOpen : ""}`} ref={ref}>
      <button type="button" className={s.oddTrigger} aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span className={`${s.oddValue} ${!value ? s.oddPlaceholder : ""}`}>{value || placeholder}</span>
        <span className={s.oddChevron}><Chevron /></span>
      </button>
      {open && (
        <div className={s.omenu} role="listbox">
          {options.map((o) => (
            <button key={o.label} type="button" role="option" aria-selected={value === o.label}
              className={`${s.omenuOpt} ${value === o.label ? s.omenuOptOn : ""}`} onClick={() => { onChange(o.label); setOpen(false); }}>
              {o.label}<span className={s.oddOptSub}>{o.sub}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Select({ options, value, onChange, placeholder = "Select…", disabled, groups }:
  { options?: string[]; value: string; onChange: (v: string) => void; placeholder?: string; disabled?: boolean; groups?: { label: string; items: string[] }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", h); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open]);
  const opt = (o: string) => (
    <button key={o} type="button" role="option" aria-selected={value === o}
      className={`${s.omenuOpt} ${value === o ? s.omenuOptOn : ""}`} onClick={() => { onChange(o); setOpen(false); }}>
      {o}{value === o && <span className={s.omenuCheck}><Check /></span>}
    </button>
  );
  return (
    <div className={`${s.odd} ${open ? s.oddOpen : ""}`} ref={ref}>
      <button type="button" className={s.oddTrigger} aria-haspopup="listbox" aria-expanded={open} disabled={disabled} onClick={() => setOpen((o) => !o)}>
        <span className={`${s.oddValue} ${!value ? s.oddPlaceholder : ""}`}>{value || placeholder}</span>
        <span className={s.oddChevron}><Chevron /></span>
      </button>
      {open && (
        <div className={s.omenu} role="listbox">
          {groups
            ? groups.map((g) => (<div key={g.label}><div className={s.omenuGroupLabel}>{g.label}</div>{g.items.map(opt)}</div>))
            : options!.map(opt)}
        </div>
      )}
    </div>
  );
}

export default function DropdownDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Basic");
  const [fruit, setFruit] = useState("");
  const [tz, setTz] = useState("Berlin");
  const [langs, setLangs] = useState<string[]>(["React", "Angular"]);
  const [zone, setZone] = useState("Berlin");

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Dropdown examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab} style={{ minHeight: 360 }}>
        {tab === "Basic" && (
          <>
            <div className={s.subLabel}>Pick one from a short, known list</div>
            <Select options={["Apple", "Banana", "Cherry", "Dragonfruit", "Elderberry"]} value={fruit} onChange={setFruit} placeholder="Choose a fruit" />
          </>
        )}
        {tab === "Grouped" && (
          <>
            <div className={s.subLabel}>Options organised under labels</div>
            <Select value={tz} onChange={setTz} groups={[
              { label: "Europe", items: ["London", "Berlin", "Lisbon"] },
              { label: "Americas", items: ["New York", "São Paulo"] },
            ]} />
          </>
        )}
        {tab === "Multi-select" && (
          <>
            <div className={s.subLabel}>Check several, then Confirm — or Clear to reset</div>
            <MultiSelect options={["React", "Angular", "Vue", "Svelte", "Solid"]} value={langs} onChange={setLangs} placeholder="Choose frameworks" />
          </>
        )}
        {tab === "Left / right" && (
          <>
            <div className={s.subLabel}>A left label with a right-aligned value</div>
            <SplitSelect value={zone} onChange={setZone} options={[
              { label: "London", sub: "GMT+0" },
              { label: "Berlin", sub: "GMT+1" },
              { label: "Dubai", sub: "GMT+4" },
              { label: "Tokyo", sub: "GMT+9" },
              { label: "New York", sub: "GMT−5" },
            ]} />
          </>
        )}
        {tab === "States" && (
          <>
            <div className={s.subLabel}>Placeholder, selected and disabled</div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Select options={["One", "Two"]} value="" onChange={() => {}} placeholder="Placeholder" />
              <Select options={["One", "Two"]} value="Two" onChange={() => {}} disabled />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
