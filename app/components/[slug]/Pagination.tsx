"use client";

import s from "../docs.module.css";
import { pageList } from "./PaginationDemo";

/* the reusable numbered pagination — same .opag specimen the Pagination page
   documents, extracted so any surface (e.g. the Icon browser) can page a set. */

const Chevron = ({ dir }: { dir: "l" | "r" }) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"
    style={{ transform: dir === "l" ? "rotate(180deg)" : "none" }}>
    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Pagination({ page, total, onChange, ariaLabel = "Pagination" }:
  { page: number; total: number; onChange: (p: number) => void; ariaLabel?: string }) {
  if (total <= 1) return null;
  const go = (p: number) => onChange(Math.min(total, Math.max(1, p)));
  return (
    <nav className={s.opag} aria-label={ariaLabel}>
      <button className={`${s.opagItem} ${s.opagArrow}`} onClick={() => go(page - 1)} disabled={page === 1} aria-label="Previous"><Chevron dir="l" /></button>
      {pageList(page, total).map((p, i) =>
        p === "…"
          ? <span key={`e${i}`} className={s.opagEllipsis}>…</span>
          : <button key={p} className={`${s.opagItem} ${p === page ? s.opagOn : ""}`} aria-current={p === page ? "page" : undefined} onClick={() => go(p)}>{p}</button>
      )}
      <button className={`${s.opagItem} ${s.opagArrow}`} onClick={() => go(page + 1)} disabled={page === total} aria-label="Next"><Chevron dir="r" /></button>
    </nav>
  );
}
