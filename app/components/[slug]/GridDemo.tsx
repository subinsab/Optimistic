"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["12 columns", "Common spans", "Dashboard", "Content + sidebar"] as const;

function Cell({ span, children, quiet, tall }: { span: number; children?: React.ReactNode; quiet?: boolean; tall?: boolean }) {
  return (
    <div
      className={`${s.ogridCell} ${quiet ? s.ogridCellQuiet : ""} ${tall ? s.ogridCellTall : ""}`}
      style={{ gridColumn: `span ${span}` }}
    >
      {children}
    </div>
  );
}

const STATS = [
  { label: "Components", value: "54", delta: "↑ 6 documented" },
  { label: "Tokens", value: "1,284", delta: "↑ 40 this week" },
  { label: "Coverage", value: "89%", delta: "↑ 4% vs target" },
  { label: "Sync", value: "Live", delta: "● reconciled" },
];

export default function GridDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("12 columns");
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Grid examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "12 columns" && (
          <div className={s.ogridDemo}>
            <div className={s.ogridBlock}>
              <div className={s.ogridBlockHead}><span className={s.ogridBlockLabel}>Twelve equal tracks</span><span className={s.ogridBlockMeta}>repeat(12, 1fr) · gap 12px</span></div>
              <div className={s.ogridRow}>{Array.from({ length: 12 }, (_, i) => <Cell key={i} span={1}>1</Cell>)}</div>
            </div>
            <div className={s.ogridBlock}>
              <div className={s.ogridBlockHead}><span className={s.ogridBlockLabel}>Halves &amp; thirds</span><span className={s.ogridBlockMeta}>6+6 · 4+4+4</span></div>
              <div className={s.ogridRow}><Cell span={6}>6</Cell><Cell span={6}>6</Cell></div>
              <div className={s.ogridRow} style={{ marginTop: 8 }}><Cell span={4}>4</Cell><Cell span={4}>4</Cell><Cell span={4}>4</Cell></div>
            </div>
          </div>
        )}
        {tab === "Common spans" && (
          <div className={s.ogridDemo}>
            <div className={s.ogridBlock}>
              <div className={s.ogridBlockHead}><span className={s.ogridBlockLabel}>Quarters</span><span className={s.ogridBlockMeta}>3+3+3+3</span></div>
              <div className={s.ogridRow}>{[3, 3, 3, 3].map((n, i) => <Cell key={i} span={n}>{n}</Cell>)}</div>
            </div>
            <div className={s.ogridBlock}>
              <div className={s.ogridBlockHead}><span className={s.ogridBlockLabel}>Two-thirds split</span><span className={s.ogridBlockMeta}>8+4</span></div>
              <div className={s.ogridRow}><Cell span={8}>8</Cell><Cell span={4}>4</Cell></div>
            </div>
            <div className={s.ogridBlock}>
              <div className={s.ogridBlockHead}><span className={s.ogridBlockLabel}>Offset start</span><span className={s.ogridBlockMeta}>span 6 · start col 4</span></div>
              <div className={s.ogridRow}><div className={s.ogridCell} style={{ gridColumn: "4 / span 6" }}>centered 6</div></div>
            </div>
          </div>
        )}
        {tab === "Dashboard" && (
          <div className={s.ogridDemo}>
            <div className={s.ogridBlock}>
              <div className={s.ogridBlockHead}><span className={s.ogridBlockLabel}>KPI row</span><span className={s.ogridBlockMeta}>4 × span 3</span></div>
              <div className={s.ogridRow}>
                {STATS.map((st) => (
                  <div key={st.label} className={s.ogridStat} style={{ gridColumn: "span 3" }}>
                    <span className={s.ogridStatLabel}>{st.label}</span>
                    <span className={s.ogridStatValue}>{st.value}</span>
                    <span className={s.ogridStatDelta}>{st.delta}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "Content + sidebar" && (
          <div className={s.ogridDemo}>
            <div className={s.ogridBlock}>
              <div className={s.ogridBlockHead}><span className={s.ogridBlockLabel}>Main + rail</span><span className={s.ogridBlockMeta}>8+4 · collapses under md</span></div>
              <div className={s.ogridRow}>
                <div className={s.ogridPanel} style={{ gridColumn: "span 8" }}>Main content area — <span style={{ fontFamily: "var(--font-mono)", color: "#767b87" }}>col-8</span></div>
                <div className={s.ogridPanel} style={{ gridColumn: "span 4" }}>Sidebar — <span style={{ fontFamily: "var(--font-mono)", color: "#767b87" }}>col-4</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
