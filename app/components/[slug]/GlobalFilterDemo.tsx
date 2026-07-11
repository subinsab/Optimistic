"use client";

import { useEffect, useRef, useState } from "react";
import { Table, type Column } from "../../../optimistic-ui/components/table/table";
import { DEMO_ROWS, type Row } from "./tableData";
import { QuickFilter, FSearch, FSliders } from "./FilterDemo";
import "./gridScope.css";
import s from "../docs.module.css";

const COLS: Column<Row>[] = [
  { key: "auditor", header: "Name of Auditor", sortable: true },
  { key: "bank", header: "Bank name" },
  { key: "sector", header: "Sector" },
  { key: "category", header: "Doc. category" },
  { key: "winnings", header: "Winnings", align: "right", sortable: true, value: (r) => r.winnings, render: (r) => "₹" + r.winnings.toLocaleString("en-IN") },
];

const uniq = (k: keyof Row) => Array.from(new Set(DEMO_ROWS.map((r) => String(r[k])))).sort();
type FKey = "bank" | "sector" | "category";
const SECTIONS: { key: FKey; label: string }[] = [
  { key: "bank", label: "Bank name" },
  { key: "sector", label: "Sector" },
  { key: "category", label: "Doc. category" },
];

const XIcon = () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);

export default function GlobalFilterDemo() {
  const [search, setSearch] = useState("");
  const [f, setF] = useState<Record<FKey, string[]>>({ bank: [], sector: [], category: [] });
  const [allOpen, setAllOpen] = useState(false);
  const set = (k: FKey, v: string[]) => setF((p) => ({ ...p, [k]: v }));
  const toggle = (k: FKey, o: string) => set(k, f[k].includes(o) ? f[k].filter((x) => x !== o) : [...f[k], o]);
  const active = f.bank.length + f.sector.length + f.category.length + (search ? 1 : 0);
  const clearAll = () => { setSearch(""); setF({ bank: [], sector: [], category: [] }); };

  // saved filters
  type Saved = { name: string; f: Record<FKey, string[]>; search: string };
  const [saved, setSaved] = useState<Saved[]>([]);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (saving) nameRef.current?.focus(); }, [saving]);
  const doSave = () => { const n = name.trim(); if (!n) return; setSaved((s2) => [...s2, { name: n, f: { bank: [...f.bank], sector: [...f.sector], category: [...f.category] }, search }]); setName(""); setSaving(false); };
  const applySaved = (sv: Saved) => { setF({ bank: [...sv.f.bank], sector: [...sv.f.sector], category: [...sv.f.category] }); setSearch(sv.search); };
  const removeSaved = (i: number) => setSaved((s2) => s2.filter((_, j) => j !== i));

  const rows = DEMO_ROWS.filter((r) => {
    if (search && !Object.values(r).some((v) => String(v).toLowerCase().includes(search.toLowerCase()))) return false;
    return SECTIONS.every((sec) => f[sec.key].length === 0 || f[sec.key].includes(String(r[sec.key])));
  });

  return (
    <div className={s.demoPanel} style={{ position: "relative" }}>
      <div className="gridScopeWrap">
        <div className={s.ofilBar} style={{ position: "relative", zIndex: 6 }}>
          <div className={s.ofilSearch}>
            <FSearch />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search here" aria-label="Search" />
          </div>
          {SECTIONS.map((sec) => (
            <QuickFilter key={sec.key} label={sec.label} options={uniq(sec.key)} value={f[sec.key]} onChange={(v) => set(sec.key, v)} />
          ))}
          <button type="button" className={s.ofilAll} style={{ position: "relative", zIndex: 12 }} onClick={() => setAllOpen(true)}>
            <FSliders /> All filters {active > 0 && <span className={s.ofilChipCount}>{active}</span>}
          </button>
          {active > 0 && <button type="button" className={s.ofilClearAll} style={{ position: "relative", zIndex: 12 }} onClick={clearAll}>Clear all</button>}
        </div>

        <div className="gridScope" data-mode="dark">
          <Table<Row> columns={COLS} data={rows} getRowId={(r) => r.id} title={`${rows.length} Data Subject Tickets`} pageSize={8} />
        </div>
        <span className={s.oupHint} style={{ display: "block" }}>A <strong>filter bar</strong> above the table: a search, quick-filter dropdowns per column, and <strong>All filters</strong>. Filtering is instant.</span>
      </div>

      <div className={`${s.ovScrim} ${allOpen ? s.ovScrimOn : ""}`} style={{ padding: 0, zIndex: 30 }} onClick={() => setAllOpen(false)} aria-hidden={!allOpen}>
        <div className={`${s.ofilDrawer} ${allOpen ? s.ofilDrawerOpen : ""}`} role="dialog" aria-label="All filters" onClick={(e) => e.stopPropagation()}>
          <div className={`${s.ofilPanel} ${s.ofilPanelFlush}`}>
            <div className={s.ofilPanelHead}>
              <FSliders />
              <span className={s.ofilPanelTitle}>All filters</span>
              {active > 0 && <span className={s.ofilChipCount}>{active}</span>}
              <button type="button" className={s.ofilPanelClose} aria-label="Close" onClick={() => setAllOpen(false)}><XIcon /></button>
            </div>
            {saved.length > 0 && (
              <div style={{ padding: "10px 15px", borderBottom: "1px solid #1e1f24", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-ink-text-3)", width: "100%" }}>Saved</span>
                {saved.map((sv, i) => (
                  <span key={sv.name + i} className={s.ofilSavedChip} role="button" tabIndex={0} style={{ cursor: "pointer" }} onClick={() => applySaved(sv)} onKeyDown={(e) => { if (e.key === "Enter") applySaved(sv); }}>
                    {sv.name}
                    <button type="button" className={s.ofilSavedX} aria-label={`Remove ${sv.name}`} onClick={(e) => { e.stopPropagation(); removeSaved(i); }}><XIcon /></button>
                  </span>
                ))}
              </div>
            )}
            <div className={s.ofilBody} style={{ maxHeight: "none" }}>
              {SECTIONS.map((sec) => (
                <div key={sec.key} className={`${s.ofilSection} ${s.ofilSectionOpen}`}>
                  <div className={s.ofilSectionHead} style={{ cursor: "default" }}>
                    {sec.label}
                    {f[sec.key].length > 0 && <span className={s.ofilSectionDot} />}
                  </div>
                  <div className={s.ofilSectionBody}>
                    {uniq(sec.key).map((o) => (
                      <button key={o} type="button" role="checkbox" aria-checked={f[sec.key].includes(o)} className={s.ofilOption} onClick={() => toggle(sec.key, o)}>
                        <span className={`${s.ochk} ${s.chkS} ${f[sec.key].includes(o) ? s.ochkOn : ""}`} aria-hidden="true" /> {o}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={s.ofilFoot}>
              {saving ? (
                <div className={s.ofilSaveForm}>
                  <input ref={nameRef} className={s.ofilSaveInput} value={name} placeholder="Name this filter" maxLength={30}
                    onChange={(e) => setName(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") doSave(); if (e.key === "Escape") { setSaving(false); setName(""); } }} aria-label="Filter name" />
                  <button type="button" className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={() => { setSaving(false); setName(""); }}>Cancel</button>
                  <button type="button" className={`${s.obtn} ${s.sm} ${s.vPrimary}`} disabled={!name.trim()} onClick={doSave}>Save</button>
                </div>
              ) : (
                <>
                  <button type="button" className={s.ofilSave} disabled={active === 0} onClick={() => setSaving(true)}>Save filter</button>
                  <button type="button" className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={clearAll}>Clear all</button>
                  <button type="button" className={`${s.obtn} ${s.sm} ${s.vWarm}`} onClick={() => setAllOpen(false)}>Apply</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
