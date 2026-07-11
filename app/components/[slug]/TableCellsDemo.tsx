"use client";

import { useState } from "react";
import { Table, type Column } from "../../../optimistic-ui/components/table/table";
import { Avatar, AvatarGroup } from "../../../optimistic-ui/components/avatar/avatar";
import { Badge } from "../../../optimistic-ui/components/badge/badge";
import { Tag } from "../../../optimistic-ui/components/tag/tag";
import { Progress } from "../../../optimistic-ui/components/progress/progress";
import { Toggle } from "../../../optimistic-ui/components/toggle/toggle";
import { Indicator } from "../../../optimistic-ui/components/indicator/indicator";
import { Button } from "../../../optimistic-ui/components/button/button";
import { Link } from "../../../optimistic-ui/components/link/link";
import { Tabs } from "../../../optimistic-ui/components/tabs/tabs";
import { Pill } from "../../../optimistic-ui/components/pill/pill";
import { Icon } from "../../../optimistic-ui/components/icon/icon";
import { MoreHorizontal, Star } from "lucide-react";
import "./tableCellsShowcase.css";

type Row = {
  id: string; name: string; owner: string; status: "Active" | "Pending" | "Paused";
  progress: number; plan: string; team: string[]; live: boolean; tags: string[]; rating: number; spark: number[]; enabled: boolean;
};
const ROWS: Row[] = [
  { id: "1", name: "GreenLeaf Financial", owner: "Ivy Lane", status: "Active", progress: 82, plan: "Enterprise", team: ["Ivy Lane", "Ravi Kumar", "Mia Ono"], live: true, tags: ["Finance", "Priority"], rating: 5, spark: [3, 5, 4, 6, 7, 8], enabled: true },
  { id: "2", name: "Pro Property", owner: "Ravi Kumar", status: "Pending", progress: 47, plan: "Growth", team: ["Sam Lee", "Kai Ito"], live: false, tags: ["Realty"], rating: 3, spark: [6, 5, 5, 4, 5, 4], enabled: false },
  { id: "3", name: "Nova Retail", owner: "Mia Ono", status: "Active", progress: 66, plan: "Growth", team: ["Ada Ng", "Leo Fox", "Mia Ono", "Ivy Lane"], live: true, tags: ["Retail", "New"], rating: 4, spark: [4, 4, 5, 6, 6, 7], enabled: true },
  { id: "4", name: "Alro Kroperty", owner: "Sam Lee", status: "Paused", progress: 23, plan: "Starter", team: ["Sam Lee"], live: false, tags: ["Realty"], rating: 2, spark: [7, 6, 5, 4, 3, 3], enabled: false },
];

const toneOf = (st: Row["status"]) => (st === "Active" ? "success" : st === "Pending" ? "warning" : "neutral");

function Spark({ data }: { data: number[] }) {
  const w = 64, h = 22, max = Math.max(...data), min = Math.min(...data), rng = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / rng) * (h - 4) - 2}`).join(" ");
  const up = data[data.length - 1] >= data[0];
  return <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true" style={{ display: "block" }}><polyline points={pts} fill="none" stroke={up ? "var(--success-text)" : "var(--danger-text)"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/* the "Table" tab · plain text cells */
const PLAIN: Column<Row>[] = [
  { key: "name", header: "Company", sortable: true },
  { key: "owner", header: "Owner" },
  { key: "status", header: "Status" },
  { key: "progress", header: "Progress", align: "right", render: (r) => `${r.progress}%` },
  { key: "plan", header: "Plan" },
];

/* the "Cells" tab · each column renders a different kit component */
const CELLS: Column<Row>[] = [
  { key: "name", header: "Company · avatar", width: 210, render: (r) => <span className="tcCell"><Avatar name={r.name} size="sm" /> {r.name}</span> },
  { key: "team", header: "Team · avatar group", width: 130, render: (r) => <AvatarGroup>{r.team.map((n) => <Avatar key={n} name={n} size="sm" />)}</AvatarGroup> },
  { key: "status", header: "Status · badge", render: (r) => <Badge tone={toneOf(r.status)} dot>{r.status}</Badge> },
  { key: "live", header: "Live · dot", render: (r) => <span className="tcCell" style={{ gap: 8 }}><Indicator tone={r.live ? "success" : "neutral"} pulse={r.live} /> {r.live ? "Live" : "Idle"}</span> },
  { key: "tags", header: "Labels · tags", width: 170, render: (r) => <span className="tcTags">{r.tags.map((t) => <Tag key={t}>{t}</Tag>)}</span> },
  { key: "rating", header: "Rating · stars", width: 120, render: (r) => <span className="tcCell" style={{ gap: 2 }}>{[0, 1, 2, 3, 4].map((i) => <Icon key={i} icon={Star} size={13} fill={i < r.rating ? "currentColor" : "none"} style={{ color: i < r.rating ? "var(--accent)" : "var(--text-faint)" }} />)}</span> },
  { key: "progress", header: "Progress · bar", width: 180, render: (r) => <span className="tcProg"><Progress value={r.progress} /><span>{r.progress}%</span></span> },
  { key: "spark", header: "Trend · sparkline", width: 100, render: (r) => <Spark data={r.spark} /> },
  { key: "enabled", header: "Alerts · toggle", width: 100, render: (r) => <Toggle defaultChecked={r.enabled} aria-label="Alerts" /> },
  { key: "plan", header: "Plan · link", render: (r) => <Link href="#" onClick={(e) => e.preventDefault()}>{r.plan}</Link> },
  { key: "action", header: "Actions · buttons", align: "right", render: () => <span className="tcActions"><Button variant="warm" size="sm">Review</Button><Button variant="ghost" size="sm" className="tcIcon" aria-label="More"><Icon icon={MoreHorizontal} size={16} /></Button></span> },
];

export default function TableCellsDemo() {
  const [tab, setTab] = useState("table");
  const [mode, setMode] = useState<"dark" | "light">("dark");
  return (
    <div className="tcScope" data-mode={mode}>
      <div className="tcHead">
        <Tabs tabs={[{ id: "table", label: "Table" }, { id: "cells", label: "Cells" }]} value={tab} onValueChange={setTab} />
        <div style={{ display: "inline-flex", gap: 6 }}>
          {(["dark", "light"] as const).map((m) => (
            <Pill key={m} selected={mode === m} onClick={() => setMode(m)} style={{ textTransform: "capitalize" }}>{m}</Pill>
          ))}
        </div>
      </div>
      <Table<Row> columns={tab === "table" ? PLAIN : CELLS} data={ROWS} getRowId={(r) => r.id} />
    </div>
  );
}
