"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Single", "Multiple", "With counts", "Sizes"] as const;
const Check = () => (<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>);

export default function PillsDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Single");
  const [one, setOne] = useState("All");
  const [many, setMany] = useState<string[]>(["React", "Angular"]);
  const toggle = (v: string) => setMany((m) => (m.includes(v) ? m.filter((x) => x !== v) : [...m, v]));

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Pills examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Single" && (
          <>
            <div className={s.subLabel}>Pick one — like a filter tab row</div>
            <div className={s.opills} role="radiogroup" aria-label="Status">
              {["All", "Active", "Draft", "Archived"].map((v) => (
                <button key={v} type="button" role="radio" aria-checked={one === v}
                  className={`${s.opill} ${one === v ? s.opillOn : ""}`} onClick={() => setOne(v)}>{v}</button>
              ))}
            </div>
          </>
        )}
        {tab === "Multiple" && (
          <>
            <div className={s.subLabel}>Toggle several — a check marks each on</div>
            <div className={s.opills} role="group" aria-label="Frameworks">
              {["React", "Angular", "Vue", "Svelte", "Solid"].map((v) => (
                <button key={v} type="button" role="checkbox" aria-checked={many.includes(v)}
                  className={`${s.opill} ${many.includes(v) ? s.opillOn : ""}`} onClick={() => toggle(v)}>
                  {many.includes(v) && <Check />}{v}
                </button>
              ))}
            </div>
            <span className={s.oupHint} style={{ marginTop: 12, display: "block" }}>{many.length} selected</span>
          </>
        )}
        {tab === "With counts" && (
          <>
            <div className={s.subLabel}>Each pill carries how many it matches</div>
            <div className={s.opills} role="radiogroup" aria-label="Priority">
              {[["Open", 24], ["In review", 8], ["Blocked", 3], ["Done", 112]].map(([v, n]) => (
                <button key={v as string} type="button" role="radio" aria-checked={one === v}
                  className={`${s.opill} ${one === v ? s.opillOn : ""}`} onClick={() => setOne(v as string)}>
                  {v}<span className={s.opillCount}>{n}</span>
                </button>
              ))}
            </div>
          </>
        )}
        {tab === "Sizes" && (
          <>
            <div className={s.subLabel}>Chip scale — S · M · L</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
              <div className={s.opills}>
                <span className={`${s.opill} ${s.opillSm} ${s.opillOn}`}>Small</span>
                <span className={`${s.opill} ${s.opillSm}`}>Active<span className={s.opillCount}>8</span></span>
              </div>
              <div className={s.opills}>
                <span className={`${s.opill} ${s.opillOn}`}>Medium</span>
                <span className={s.opill}>Active<span className={s.opillCount}>8</span></span>
              </div>
              <div className={s.opills}>
                <span className={`${s.opill} ${s.opillLg} ${s.opillOn}`}>Large</span>
                <span className={`${s.opill} ${s.opillLg}`}>Active<span className={s.opillCount}>8</span></span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
