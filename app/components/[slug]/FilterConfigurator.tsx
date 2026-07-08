"use client";

import { useState } from "react";
import s from "../docs.module.css";

/* Filter configuration playground — configure a quick-filter trigger */

const STATES = ["Empty", "Active"] as const;
const COUNTS = ["1", "2", "5"] as const;
const Caret = () => (<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const XIcon = () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);

function Chips({ label, options, value, onPick }: { label: string; options: readonly string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className={s.configGroup}>
      <span className={s.configLabel}>{label}</span>
      <div className={s.configChips} role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button key={o} type="button" role="radio" aria-checked={value === o}
            className={`${s.configChip} ${value === o ? s.configChipOn : ""}`} onClick={() => onPick(o)}>{o}</button>
        ))}
      </div>
    </div>
  );
}

export default function FilterConfigurator() {
  const [label, setLabel] = useState("Status");
  const [state, setState] = useState("Active");
  const [count, setCount] = useState("2");

  const active = state === "Active";
  const props = [
    `label="${label}"`,
    active ? `selected={${count}}` : "",
    active ? "clearable" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="State" options={STATES} value={state} onPick={setState} />
        {active && <Chips label="Selected count" options={COUNTS} value={count} onPick={setCount} />}
        <div className={s.configGroup}>
          <span className={s.configLabel}>Label</span>
          <input className={s.configInput} value={label} maxLength={20} onChange={(e) => setLabel(e.target.value)} aria-label="Filter label" />
        </div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <span className={`${s.ofilChip} ${active ? s.ofilChipOn : ""}`}>
            {label || "Filter"}
            {active && <span className={s.ofilChipCount}>{count}</span>}
            <span className={s.ofilChipCaret}><Caret /></span>
            {active && <span className={s.ofilChipClear} aria-hidden="true"><XIcon /></span>}
          </span>
        </div>
        <div className={s.configCode} aria-label="Generated code">
          {"<"}<b>QuickFilter</b> {props} {"/>"}
        </div>
      </div>
    </div>
  );
}
