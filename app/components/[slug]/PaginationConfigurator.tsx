"use client";

import { useState } from "react";
import s from "../docs.module.css";
import { pageList } from "./PaginationDemo";

const SIZES = ["S", "M", "L"] as const;
const SZ: Record<string, string> = { S: "opagSm", M: "", L: "opagLg" };
const TOTALS = ["8", "12", "24"] as const;
const Chevron = ({ dir }: { dir: "l" | "r" }) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"
    style={{ transform: dir === "l" ? "rotate(180deg)" : "none" }}>
    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Chips({ label, options, value, onPick }: { label: string; options: readonly string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className={s.configGroup}><span className={s.configLabel}>{label}</span>
      <div className={s.configChips} role="radiogroup" aria-label={label}>
        {options.map((o) => <button key={o} type="button" role="radio" aria-checked={value === o}
          className={`${s.configChip} ${value === o ? s.configChipOn : ""}`} onClick={() => onPick(o)}>{o}</button>)}
      </div>
    </div>
  );
}

export default function PaginationConfigurator() {
  const [size, setSize] = useState("M");
  const [totalStr, setTotalStr] = useState("12");
  const [page, setPage] = useState(4);
  const total = Number(totalStr);
  const szCls = SZ[size] ? s[SZ[size] as keyof typeof s] : "";
  const go = (p: number) => setPage(Math.min(total, Math.max(1, p)));
  const pick = (t: string) => { setTotalStr(t); setPage(Math.min(page, Number(t))); };
  const props = [`total={${total}}`, `page={${page}}`, size !== "M" ? `size="${size.toLowerCase()}"` : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="Total pages" options={TOTALS} value={totalStr} onPick={pick} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <nav className={`${s.opag} ${szCls}`} aria-label="Pagination">
            <button className={`${s.opagItem} ${s.opagArrow}`} onClick={() => go(page - 1)} disabled={page === 1} aria-label="Previous"><Chevron dir="l" /></button>
            {pageList(page, total).map((p, i) =>
              p === "…"
                ? <span key={`e${i}`} className={s.opagEllipsis}>…</span>
                : <button key={p} type="button" className={`${s.opagItem} ${p === page ? s.opagOn : ""}`} onClick={() => go(p)}>{p}</button>
            )}
            <button className={`${s.opagItem} ${s.opagArrow}`} onClick={() => go(page + 1)} disabled={page === total} aria-label="Next"><Chevron dir="r" /></button>
          </nav>
        </div>
        <div className={s.configCode}>{"<"}<b>Pagination</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
