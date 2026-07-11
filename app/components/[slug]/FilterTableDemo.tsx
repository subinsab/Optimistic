"use client";

import { Table, type Column } from "../../../optimistic-ui/components/table/table";
import { DEMO_ROWS, type Row } from "./tableData";
import "./gridScope.css";
import s from "../docs.module.css";

const COLS: Column<Row>[] = [
  { key: "auditor", header: "Name of Auditor", sortable: true },
  { key: "bank", header: "Bank name", filterable: true },
  { key: "sector", header: "Sector", filterable: true },
  { key: "category", header: "Doc. category", filterable: true },
  { key: "winnings", header: "Winnings", align: "right", sortable: true, value: (r) => r.winnings, render: (r) => "₹" + r.winnings.toLocaleString("en-IN") },
];

export default function FilterTableDemo() {
  return (
    <div className={s.demoPanel}>
      <div className="gridScopeWrap">
        <div className="gridScope" data-mode="dark">
          <Table<Row> columns={COLS} data={DEMO_ROWS} getRowId={(r) => r.id} filterTags pageSize={8} />
        </div>
        <span className={s.oupHint} style={{ display: "block" }}>Click the funnel on <strong>Bank name</strong>, <strong>Sector</strong> or <strong>Doc. category</strong> and pick a value. Each selection appears as a removable tag above the table.</span>
      </div>
    </div>
  );
}
