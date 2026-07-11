"use client";

import { useRef, useState, useEffect } from "react";
import { Table, type Column } from "../../../optimistic-ui/components/table/table";
import { DEMO_ROWS, type Row } from "./tableData";
import "./gridScope.css";
import s from "../docs.module.css";

const CATS = ["Certificate", "Financial Statements", "Legal Documents", "Training Manuals", "Tax Filings", "Project Plans", "HR Records", "Invoice Financing", "Supply Financing", "Asset-Based Lending", "Equipment Financing"].map((c) => ({ label: c, value: c }));

type Charge = Record<string, React.ReactNode> & { id: string; detail: string; assets: string; amount: string; roi: string; type: string };
const CHARGE_COLS: Column<Charge>[] = [
  { key: "detail", header: "Charge details" },
  { key: "assets", header: "Assets under charge" },
  { key: "amount", header: "Amount", align: "right" },
  { key: "roi", header: "ROI", align: "right" },
  { key: "type", header: "Type" },
  { key: "link", header: "Charges", render: () => <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "var(--accent)" }}>View details</a> },
];
const CHARGES: Charge[] = [
  { id: "a", detail: "Consortium Finance", assets: "Charge on immovable property or any interest therein", amount: "2,00,00,000", roi: "12%", type: "Creation" },
  { id: "b", detail: "Modification Finance", assets: "Charge on immovable, any interest therein", amount: "42,00,000", roi: "8.93%", type: "Modification" },
];

type Instalment = Record<string, React.ReactNode> & { id: string; due: string; amount: string; status: string };
const INSTALMENT_COLS: Column<Instalment>[] = [
  { key: "due", header: "Due date" },
  { key: "amount", header: "Amount", align: "right" },
  { key: "status", header: "Status" },
];
const INSTALMENTS: Instalment[] = [
  { id: "i1", due: "01 Apr 2024", amount: "10,00,000", status: "Paid" },
  { id: "i2", due: "01 Jul 2024", amount: "10,00,000", status: "Due" },
];
const TOTALS: Row = { id: "totals", auditor: "25 auditors", bank: "7 banks", sector: "", category: "", reg: "", invested: "", investedTs: 0, winnings: 6_540_000, size: "≈ 2.3 GB" };

type FeatKey = "toolbar" | "pagination" | "selection" | "editing" | "masterDetail" | "columnGroups" | "advancedFilter" | "globalFilter" | "settings" | "columnFilters" | "floatingFilters" | "columnResizing" | "columnHover" | "rowNumbers" | "rowDraggable" | "pinnedColumns" | "pinnedRows" | "statusBar" | "zebra" | "rtl";
const FEATURES: [FeatKey, string][] = [
  ["toolbar", "Toolbar + Search"],
  ["pagination", "Pagination"],
  ["selection", "Row Selection"],
  ["editing", "Cell Editing"],
  ["masterDetail", "Master / Detail"],
  ["columnGroups", "Column Groups"],
  ["advancedFilter", "Advanced Filter"],
  ["globalFilter", "Global Filter Bar"],
  ["settings", "Settings Panel"],
  ["columnFilters", "Column Filters"],
  ["floatingFilters", "Floating Filters"],
  ["columnResizing", "Column Resizing"],
  ["columnHover", "Column Hover"],
  ["rowNumbers", "Row Numbers"],
  ["rowDraggable", "Row Drag"],
  ["pinnedColumns", "Column Pinning"],
  ["pinnedRows", "Row Pinning"],
  ["statusBar", "Status Bar"],
  ["zebra", "Zebra Stripes"],
  ["rtl", "Right To Left"],
];
// clean by default: accordion + the essentials on, the rest tucked inside Grid Features
const DEFAULTS: Record<FeatKey, boolean> = {
  toolbar: true, pagination: true, selection: true, editing: true, masterDetail: true,
  columnGroups: true, advancedFilter: true, globalFilter: true, settings: true, columnFilters: true, floatingFilters: false,
  columnResizing: true, columnHover: false, rowNumbers: false, rowDraggable: false, pinnedColumns: false,
  pinnedRows: false, statusBar: false, zebra: false, rtl: false,
};

const Gear = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 4.5h7M11.5 4.5H14M2 11.5h2.5M7 11.5h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /><circle cx="10" cy="4.5" r="1.6" stroke="currentColor" strokeWidth="1.4" /><circle cx="6" cy="11.5" r="1.6" stroke="currentColor" strokeWidth="1.4" /></svg>);
const Tick = ({ on }: { on: boolean }) => (
  <span className={`gridChk${on ? " on" : ""}`} aria-hidden="true">{on && <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}</span>
);

export default function TableDemo() {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  const [density, setDensity] = useState<"compact" | "default" | "comfortable">("default");
  const [corners, setCorners] = useState<"round" | "square">("round");
  const [feat, setFeat] = useState<Record<FeatKey, boolean>>(DEFAULTS);
  const [panel, setPanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const on = (k: FeatKey) => feat[k];
  const toggle = (k: FeatKey) => setFeat((f) => ({ ...f, [k]: !f[k] }));

  useEffect(() => {
    if (!panel) return;
    const close = (e: MouseEvent) => { if (!panelRef.current?.contains(e.target as Node)) setPanel(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [panel]);

  const g = (name: string) => (on("columnGroups") ? { group: name } : {});
  const columns: Column<Row>[] = [
    { key: "auditor", header: "Name of Auditor", ...g("Auditor"), sortable: true, width: 210, ...(on("pinnedColumns") ? { pinned: "left" as const } : {}) },
    { key: "bank", header: "Bank name", ...g("Auditor"), width: 160, ...(on("columnFilters") ? { filterable: true } : {}), ...(on("editing") ? { editable: true } : {}) },
    { key: "sector", header: "Sector", ...g("Auditor"), width: 150, ...(on("columnFilters") ? { filterable: true } : {}) },
    { key: "category", header: "Doc. category", ...g("Filing"), width: 190, ...(on("columnFilters") ? { filterable: true } : {}), ...(on("editing") ? { editable: true, editor: "select" as const, options: CATS, validate: (v: string) => (v === "Policies" ? "Policies is not an allowed document category" : null) } : {}) },
    { key: "reg", header: "Firm Reg. number", ...g("Filing"), width: 170, ...(on("editing") ? { editable: true, validate: (v: string) => (v.trim().length < 3 ? "Reg. number is too short" : null) } : {}) },
    { key: "invested", header: "Invested on", ...g("Filing"), width: 150, sortable: true, value: (r) => r.investedTs, render: (r) => r.invested },
    { key: "winnings", header: "Winnings", ...g("Totals"), align: "right", width: 150, type: "number", sortable: true, value: (r) => r.winnings, render: (r) => "₹" + r.winnings.toLocaleString("en-IN") },
    { key: "size", header: "Doc Size", ...g("Totals"), align: "right", width: 120, ...(on("pinnedColumns") ? { pinned: "right" as const } : {}) },
  ];

  return (
    <div className={s.demoPanel}>
      <div className="gridScopeWrap">
        <div className="gridCtlRow">
          <div className="gridModeRow" role="tablist" aria-label="Theme">
            {(["dark", "light"] as const).map((m) => (
              <button key={m} role="tab" aria-selected={mode === m} className={`gridModeBtn${mode === m ? " on" : ""}`} onClick={() => setMode(m)}>{m === "dark" ? "◑ Dark" : "◐ Daylight"}</button>
            ))}
          </div>
          <div className="gridModeRow" role="tablist" aria-label="Density">
            {(["compact", "default", "comfortable"] as const).map((d) => (
              <button key={d} role="tab" aria-selected={density === d} className={`gridModeBtn${density === d ? " on" : ""}`} onClick={() => setDensity(d)}>{d[0].toUpperCase() + d.slice(1)}</button>
            ))}
          </div>
          <div className="gridModeRow" role="tablist" aria-label="Corners">
            {(["round", "square"] as const).map((c) => (
              <button key={c} role="tab" aria-selected={corners === c} className={`gridModeBtn${corners === c ? " on" : ""}`} onClick={() => setCorners(c)}>{c === "round" ? "Round" : "Rectangle"}</button>
            ))}
          </div>
          <div className="gridFeatWrap" ref={panelRef}>
            <button className={`gridFeatBtn${panel ? " on" : ""}`} aria-expanded={panel} onClick={() => setPanel((p) => !p)}><Gear /> Table Features</button>
            {panel && (
              <div className="gridFeatPanel" role="menu">
                {FEATURES.map(([k, label]) => (
                  <button key={k} role="menuitemcheckbox" aria-checked={on(k)} className="gridFeatOpt" onClick={() => toggle(k)}>
                    <Tick on={on(k)} /> {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="gridScope" data-mode={mode}>
          <Table<Row>
            columns={columns}
            data={DEMO_ROWS}
            getRowId={(r) => r.id}
            title={on("toolbar") ? "2340 Data Subject Tickets" : undefined}
            searchable={on("toolbar")}
            advancedFilter={on("advancedFilter")}
            globalFilter={on("globalFilter")}
            corners={corners}
            settings={on("settings")}
            selectable={on("selection")}
            editable={on("editing")}
            renderDetail={on("masterDetail") ? (r) => (
              <Table<Charge>
                columns={CHARGE_COLS}
                data={CHARGES}
                getRowId={(c) => `${r.id}-${c.id}`}
                caption={`Charges filed against ${r.auditor} — expand a charge for its instalments`}
                stickyHeader={false}
                renderDetail={(charge) => <Table<Instalment> columns={INSTALMENT_COLS} data={INSTALMENTS} getRowId={(x) => `${r.id}-${charge.id}-${x.id}`} caption={`Instalment schedule · ${charge.detail}`} stickyHeader={false} />}
              />
            ) : undefined}
            pageSize={on("pagination") ? 10 : undefined}
            pageSizeOptions={on("pagination") ? [5, 10, 20] : undefined}
            density={density}
            appearance={on("zebra") ? "zebra" : "line"}
            pinnedRows={on("pinnedRows") ? { bottom: [TOTALS] } : undefined}
            rowNumbers={on("rowNumbers")}
            rowDraggable={on("rowDraggable")}
            resizable={on("columnResizing")}
            columnHover={on("columnHover")}
            floatingFilters={on("floatingFilters")}
            statusBar={on("statusBar")}
            rtl={on("rtl")}
          />
        </div>

        <span className={s.oupHint} style={{ display: "block" }}>Open <strong>Table Features</strong> to switch capabilities on and off, try the <strong>Advanced Filter</strong> (build a query like “Name does not equal …”), expand a row, scroll sideways, or change rows-per-page.</span>
      </div>
    </div>
  );
}
