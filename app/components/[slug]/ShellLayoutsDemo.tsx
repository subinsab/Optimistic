"use client";

import { useState } from "react";
import { Card } from "../../../optimistic-ui/components/card/card";
import { Badge } from "../../../optimistic-ui/components/badge/badge";
import { Button } from "../../../optimistic-ui/components/button/button";
import { Table, type Column } from "../../../optimistic-ui/components/table/table";
import { Pill } from "../../../optimistic-ui/components/pill/pill";
import { Icon } from "../../../optimistic-ui/components/icon/icon";
import { Home, Handshake, Building2, BarChart3, Settings, Search } from "lucide-react";
import "./layoutShowcase.css";

/* ── content built from our Table + Cards ──────────────────────── */
type Row = { id: number; co: string; rating: string; rev: string };
const COLS: Column<Row>[] = [
  { key: "co", header: "Company" },
  { key: "rating", header: "Rating" },
  { key: "rev", header: "Revenue", align: "right" },
];
const ROWS: Row[] = [
  { id: 1, co: "GreenLeaf Financial", rating: "AAA", rev: "115 Cr" },
  { id: 2, co: "Pro Property", rating: "A+", rev: "51.5 Cr" },
  { id: 3, co: "Nova Retail", rating: "AAA", rev: "88 Cr" },
  { id: 4, co: "Alro Kroperty", rating: "AA", rev: "42 Cr" },
];

function StatMini({ label, value, dir, delta }: { label: string; value: string; dir: "up" | "down"; delta: string }) {
  return (
    <Card flush className="lyStat">
      <div className="lyStat__label">{label}</div>
      <div className="lyStat__val">{value}</div>
      <Badge tone={dir === "up" ? "success" : "danger"}>{delta}</Badge>
    </Card>
  );
}

function Content() {
  return (
    <div className="lyContent">
      <div className="lyCards">
        <StatMini label="Portfolio" value="24,592" dir="up" delta="3.5%" />
        <StatMini label="Active deals" value="128" dir="up" delta="12" />
        <StatMini label="At risk" value="6" dir="down" delta="2" />
      </div>
      <Table<Row> columns={COLS} data={ROWS} getRowId={(r) => String(r.id)} />
    </div>
  );
}

/* ── the four regions ──────────────────────────────────────────── */
function TopMenu() {
  return (
    <div className="lyTop">
      <div className="lyBrand"><i /> Optimistic</div>
      <div className="lyNav"><span className="on">Dashboard</span><span>Deals</span><span>Reports</span></div>
      <div className="lyTopR"><span className="lyPill"><Icon icon={Search} size={13} /> Search</span><span className="lyDot" /></div>
    </div>
  );
}
const LEFT = [
  { t: "Home", g: Home }, { t: "Deals", g: Handshake }, { t: "Companies", g: Building2 },
  { t: "Reports", g: BarChart3 }, { t: "Settings", g: Settings },
];
function LeftMenu() {
  return (
    <div className="lySide">
      {LEFT.map((it, i) => <div key={it.t} className={`lySideItem${i === 1 ? " on" : ""}`}><Icon icon={it.g} size={14} /> {it.t}</div>)}
    </div>
  );
}
function PageHeader() {
  return (
    <div className="lyHeader">
      <div><div className="lyCrumb">Deals / Marketplace</div><b>Marketplace</b></div>
      <Button variant="warm" size="sm" style={{ marginLeft: "auto" }}>New deal</Button>
    </div>
  );
}

/* ── the shell: compose regions by flag ────────────────────────── */
function Shell({ top, left, header }: { top?: boolean; left?: boolean; header?: boolean }) {
  return (
    <div className="lyFrame">
      {top && <TopMenu />}
      <div className="lyMain">
        {left && <LeftMenu />}
        <div className="lyCol">
          {header && <PageHeader />}
          <Content />
        </div>
      </div>
    </div>
  );
}

const LAYOUTS: { cap: string; top?: boolean; left?: boolean; header?: boolean }[] = [
  { cap: "01 · Top menu + left menu + content", top: true, left: true },
  { cap: "02 · Top menu + content", top: true },
  { cap: "03 · Left menu + content", left: true },
  { cap: "04 · Top menu + header + content", top: true, header: true },
  { cap: "05 · Left menu + header + content", left: true, header: true },
  { cap: "06 · Left menu + top menu + header + content", top: true, left: true, header: true },
];

export default function ShellLayoutsDemo() {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  return (
    <div className="lyScope" data-mode={mode}>
      <div className="lyToggleRow">
        <div style={{ display: "inline-flex", gap: 6 }}>
          {(["dark", "light"] as const).map((m) => (
            <Pill key={m} selected={mode === m} onClick={() => setMode(m)} style={{ textTransform: "capitalize" }}>{m}</Pill>
          ))}
        </div>
      </div>
      <div className="lyGrid">
        {LAYOUTS.map((l) => (
          <div key={l.cap} className="lyBlock">
            <div className="lyCap">{l.cap}</div>
            <Shell top={l.top} left={l.left} header={l.header} />
          </div>
        ))}
      </div>
    </div>
  );
}
