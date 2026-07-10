"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

/* ── icons ── */
const Search = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
const Caret = () => (<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const XIcon = () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);
const Sliders = () => (<svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 5h8M14 5h1M3 9h1M7 9h8M3 13h5M11 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="5" r="1.6" stroke="currentColor" strokeWidth="1.5" /><circle cx="5.5" cy="9" r="1.6" stroke="currentColor" strokeWidth="1.5" /><circle cx="9.5" cy="13" r="1.6" stroke="currentColor" strokeWidth="1.5" /></svg>);

function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) close(); };
    const k = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("mousedown", h); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open, close]);
  return ref;
}

const NAMES = ["Prince Jazzbo", "Bridget St John", "Spacemen 3", "Boptronics", "Tim Gruchy", "Sandoz", "Hanoi", "Ho Chi Minh City", "Da Nang", "Nha Trang", "Hue", "Can Tho"];
const STATUS = ["Live", "In review", "Draft", "Archived", "Scheduled"];
const OWNERS = ["Ada Lovelace", "Grace Hopper", "Alan Turing", "Katherine Johnson"];
const TYPES = ["Component", "Token", "Layout", "Pattern"];

function Check({ on }: { on: boolean }) {
  return <span className={`${s.ochk} ${s.chkS} ${on ? s.ochkOn : ""}`} aria-hidden="true" />;
}

/* the quick-filter trigger — controlled so the bar can clear it */
function QuickFilter({ label, options, value, onChange }: { label: string; options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  const toggle = (o: string) => onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);
  return (
    <div className={s.opopAnchor} ref={ref}>
      <div
        className={`${s.ofilChip} ${value.length ? s.ofilChipOn : ""} ${open ? s.ofilChipOpen : ""}`}
        role="button" tabIndex={0} aria-haspopup="listbox" aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen((o) => !o); } }}
      >
        {label}
        {value.length > 0 && <span className={s.ofilChipCount}>{value.length}</span>}
        <span className={s.ofilChipCaret}><Caret /></span>
        {value.length > 0 && (
          <button type="button" className={s.ofilChipClear} aria-label={`Clear ${label}`} onClick={(e) => { e.stopPropagation(); onChange([]); }}><XIcon /></button>
        )}
      </div>
      <div className={`${s.opop} ${s.opopBottom} ${open ? s.opopOpen : ""}`} style={{ width: 210, left: 0, marginLeft: 0 }} role="listbox" aria-label={label}>
        <span className={s.opopArrow} style={{ left: 20, marginLeft: 0 }} aria-hidden="true" />
        <div className={s.ofilDropList}>
          {options.map((o) => (
            <button key={o} type="button" role="option" aria-selected={value.includes(o)} className={s.ofilDropOption} onClick={() => toggle(o)}>
              <Check on={value.includes(o)} /> {o}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── the vertical filter panel — tabs switch content, sections collapse,
   Save filter asks for a name ── */
const TAB_SECTIONS: Record<string, { label: string; options: string[] }[]> = {
  Tab1: [{ label: "Label one", options: NAMES }, { label: "Label two", options: STATUS }, { label: "Label three", options: OWNERS }],
  Tab2: [{ label: "Label four", options: TYPES }, { label: "Label five", options: STATUS }],
  Tab3: [{ label: "Label six", options: OWNERS }, { label: "Label seven", options: NAMES }],
};

function FilterPanel({ flush = false, rounded = true, closable = true, onClose }: { flush?: boolean; rounded?: boolean; closable?: boolean; onClose?: () => void }) {
  const [tab, setTab] = useState("Tab1");
  const [openSec, setOpenSec] = useState<string[]>(["Label one"]);
  const [sel, setSel] = useState<Record<string, string[]>>({ "Label one": ["Bridget St John", "Sandoz"], "Label two": ["Live"] });
  const [showAll, setShowAll] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState<string[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (saving) nameRef.current?.focus(); }, [saving]);

  const toggleSec = (l: string) => setOpenSec((o) => (o.includes(l) ? o.filter((x) => x !== l) : [...o, l]));
  const toggleOpt = (sec: string, o: string) => setSel((sState) => {
    const cur = sState[sec] || [];
    return { ...sState, [sec]: cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o] };
  });
  const total = Object.values(sel).reduce((n, a) => n + a.length, 0);
  const doSave = () => { const n = name.trim(); if (!n) return; setSaved((s2) => [...s2, n]); setName(""); setSaving(false); };

  return (
    <div className={`${s.ofilPanel} ${flush ? s.ofilPanelFlush : ""} ${!rounded ? s.ofilPanelSquare : ""}`}>
      <div className={s.ofilPanelHead}>
        <Sliders />
        <span className={s.ofilPanelTitle}>All filters</span>
        {total > 0 && <span className={s.ofilChipCount}>{total}</span>}
        {closable && <button type="button" className={s.ofilPanelClose} aria-label="Close" onClick={onClose}><XIcon /></button>}
      </div>
      <div className={s.ofilTabs} role="tablist">
        {Object.keys(TAB_SECTIONS).map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} className={`${s.ofilTab} ${tab === t ? s.ofilTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      {saved.length > 0 && (
        <div className={s.ofilSaved}>
          {saved.map((n, i) => (
            <span key={n + i} className={s.ofilSavedChip}>
              {n}
              <button type="button" className={s.ofilSavedX} aria-label={`Remove ${n}`} onClick={() => setSaved((s2) => s2.filter((_, j) => j !== i))}><XIcon /></button>
            </span>
          ))}
        </div>
      )}
      <div className={s.ofilBody}>
        {TAB_SECTIONS[tab].map((sec) => {
          const isOpen = openSec.includes(sec.label);
          const selected = sel[sec.label] || [];
          const q = (query[sec.label] || "").toLowerCase();
          const filtered = sec.options.filter((o) => o.toLowerCase().includes(q));
          const visible = showAll[sec.label] ? filtered : filtered.slice(0, 6);
          return (
            <div key={sec.label} className={`${s.ofilSection} ${isOpen ? s.ofilSectionOpen : ""}`}>
              <button type="button" className={s.ofilSectionHead} aria-expanded={isOpen} onClick={() => toggleSec(sec.label)}>
                {sec.label}
                {selected.length > 0 && <span className={s.ofilSectionDot} />}
                <span className={s.ofilSectionChevron}><Caret /></span>
              </button>
              {isOpen && (
                <div className={s.ofilSectionBody}>
                  {sec.options.length > 6 && (
                    <div className={`${s.ofilSearch} ${s.ofilSectionSearch}`} style={{ width: "100%" }}>
                      <Search />
                      <input value={query[sec.label] || ""} placeholder="Search here" onChange={(e) => setQuery((s2) => ({ ...s2, [sec.label]: e.target.value }))} aria-label={`Search ${sec.label}`} />
                    </div>
                  )}
                  {visible.map((o) => (
                    <button key={o} type="button" role="checkbox" aria-checked={selected.includes(o)} className={s.ofilOption} onClick={() => toggleOpt(sec.label, o)}>
                      <Check on={selected.includes(o)} /> {o}
                    </button>
                  ))}
                  {filtered.length > 6 && (
                    <button type="button" className={s.ofilMore} onClick={() => setShowAll((s2) => ({ ...s2, [sec.label]: !s2[sec.label] }))}>
                      {showAll[sec.label] ? "Show less" : `+${filtered.length - 6} more`}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={s.ofilFoot}>
        {saving ? (
          <div className={s.ofilSaveForm}>
            <input ref={nameRef} className={s.ofilSaveInput} value={name} placeholder="Name this filter" maxLength={30}
              onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") doSave(); if (e.key === "Escape") setSaving(false); }} aria-label="Filter name" />
            <button type="button" className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={() => { setSaving(false); setName(""); }}>Cancel</button>
            <button type="button" className={`${s.obtn} ${s.sm} ${s.vPrimary}`} disabled={!name.trim()} onClick={doSave}>Save</button>
          </div>
        ) : (
          <>
            <button type="button" className={s.ofilSave} onClick={() => setSaving(true)}>Save filter</button>
            <button type="button" className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={() => setSel({})}>Clear all</button>
            <button type="button" className={`${s.obtn} ${s.sm} ${s.vWarm}`} onClick={onClose}>Apply</button>
          </>
        )}
      </div>
    </div>
  );
}

/* ── the horizontal filter bar ── */
type BarState = { Status: string[]; Owner: string[]; Type: string[] };
const EMPTY_BAR: BarState = { Status: [], Owner: [], Type: [] };

function FilterBar() {
  const [filters, setFilters] = useState<BarState>({ Status: ["Live", "Draft"], Owner: [], Type: [] });
  const [panelOpen, setPanelOpen] = useState(false);
  const set = (k: keyof BarState, v: string[]) => setFilters((f) => ({ ...f, [k]: v }));
  const active = filters.Status.length + filters.Owner.length + filters.Type.length;

  return (
    <div className={s.ofilStage} style={{ minHeight: 400 }}>
      <div className={s.ofilBar}>
        <div className={s.ofilSearch}>
          <Search />
          <input placeholder="Search here" aria-label="Search" />
        </div>
        <QuickFilter label="Status" options={STATUS} value={filters.Status} onChange={(v) => set("Status", v)} />
        <QuickFilter label="Owner" options={OWNERS} value={filters.Owner} onChange={(v) => set("Owner", v)} />
        <QuickFilter label="Type" options={TYPES} value={filters.Type} onChange={(v) => set("Type", v)} />
        <button type="button" className={s.ofilAll} onClick={() => setPanelOpen(true)}>
          <Sliders /> All filters {active > 0 && <span className={s.ofilChipCount}>{active}</span>}
        </button>
        <button type="button" className={s.ofilClearAll} onClick={() => setFilters(EMPTY_BAR)}>Clear all</button>
      </div>
      {/* "All filters" opens the panel as a right-hand drawer */}
      <div className={`${s.ovScrim} ${panelOpen ? s.ovScrimOn : ""}`} style={{ padding: 0 }} onClick={() => setPanelOpen(false)} aria-hidden={!panelOpen}>
        <div className={`${s.ofilDrawer} ${panelOpen ? s.ofilDrawerOpen : ""}`} role="dialog" aria-label="All filters" onClick={(e) => e.stopPropagation()}>
          <FilterPanel flush onClose={() => setPanelOpen(false)} />
        </div>
      </div>
    </div>
  );
}

const TABS = ["Filter bar", "Filter panel", "Quick filter"] as const;

export default function FilterDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Filter bar");
  const [panelVariant, setPanelVariant] = useState("Card");
  const square = panelVariant === "Square";
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Filter examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab} style={{ minHeight: tab === "Filter panel" ? 560 : tab === "Filter bar" ? 460 : 340 }}>
        {tab === "Filter bar" && (
          <>
            <div className={s.subLabel}>Search, quick filters, Clear all, and All filters — which opens the panel as a drawer</div>
            <FilterBar />
          </>
        )}
        {tab === "Filter panel" && (
          <>
            <div className={s.subLabel}>The full panel — tabs, collapsible sections, Save filter. The square variant drops the rounded corners and close, for embedding flush in a container</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
              <div className={s.configChips} role="radiogroup" aria-label="Panel variant">
                {["Card", "Square"].map((v) => (
                  <button key={v} type="button" role="radio" aria-checked={panelVariant === v}
                    className={`${s.configChip} ${panelVariant === v ? s.configChipOn : ""}`} onClick={() => setPanelVariant(v)}>{v}</button>
                ))}
              </div>
              <FilterPanel key={panelVariant} rounded={!square} closable={!square} />
            </div>
          </>
        )}
        {tab === "Quick filter" && (
          <>
            <div className={s.subLabel}>The trigger, button-style — a count badge and clear ✕ appear once anything is picked</div>
            <div className={s.btnRow} style={{ gap: 12 }}>
              <QuickFilterUncontrolled label="Status" options={STATUS} initial={["Live", "Draft"]} />
              <QuickFilterUncontrolled label="Owner" options={OWNERS} />
              <QuickFilterUncontrolled label="Type" options={TYPES} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* a self-contained variant for the standalone trigger demo */
function QuickFilterUncontrolled({ label, options, initial = [] }: { label: string; options: string[]; initial?: string[] }) {
  const [value, setValue] = useState<string[]>(initial);
  return <QuickFilter label={label} options={options} value={value} onChange={setValue} />;
}
