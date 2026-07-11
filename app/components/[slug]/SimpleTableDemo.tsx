"use client";

import { Table, type Column } from "../../../optimistic-ui/components/table/table";
import { DEMO_ROWS, type Row } from "./tableData";
import "./gridScope.css";
import s from "../docs.module.css";

const COLS: Column<Row>[] = [
  { key: "auditor", header: "Name of Auditor", sortable: true },
  { key: "bank", header: "Bank name" },
  { key: "sector", header: "Sector" },
  { key: "category", header: "Doc. category" },
  { key: "winnings", header: "Winnings", align: "right", sortable: true, value: (r) => r.winnings, render: (r) => "₹" + r.winnings.toLocaleString("en-IN") },
  { key: "size", header: "Doc Size", align: "right" },
];

export default function SimpleTableDemo() {
  return (
    <div className={s.demoPanel}>
      <div className="gridScopeWrap">
        <div className="gridScope" data-mode="dark">
          <Table<Row> columns={COLS} data={DEMO_ROWS.slice(0, 6)} getRowId={(r) => r.id} />
        </div>
        <span className={s.oupHint} style={{ display: "block" }}>The whole component from just <code>{`{ columns, data }`}</code>: sort a header, and that is it. Everything else is opt-in.</span>
      </div>
    </div>
  );
}
