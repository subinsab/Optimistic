"use client";

import { useState } from "react";
import s from "../docs.module.css";

const SELECT = ["Single", "Multiple"] as const;
const SIZES = ["S", "M", "L"] as const;
const COUNT = ["Off", "On"] as const;
const STATE = ["Default", "Selected"] as const;
const SZ: Record<string, string> = { S: "opillSm", M: "", L: "opillLg" };
const Check = () => (<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>);

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

export default function PillsConfigurator() {
  const [select, setSelect] = useState("Single");
  const [size, setSize] = useState("M");
  const [count, setCount] = useState("Off");
  const [state, setState] = useState("Selected");
  const [text, setText] = useState("Active");
  const on = state === "Selected";
  const multi = select === "Multiple";
  const szCls = SZ[size] ? s[SZ[size] as keyof typeof s] : "";
  const props = [multi ? `role="checkbox"` : `role="radio"`, size !== "M" ? `size="${size.toLowerCase()}"` : "", on ? "selected" : "", count === "On" ? "count={24}" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Selection" options={SELECT} value={select} onPick={setSelect} />
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="Count" options={COUNT} value={count} onPick={setCount} />
        <Chips label="State" options={STATE} value={state} onPick={setState} />
        <div className={s.configGroup}><span className={s.configLabel}>Label</span><input className={s.configInput} value={text} maxLength={18} onChange={(e) => setText(e.target.value)} aria-label="Label" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <span className={`${s.opill} ${szCls} ${on ? s.opillOn : ""}`} style={{ cursor: "default" }}>
            {multi && on && <Check />}
            {text || "Pill"}
            {count === "On" && <span className={s.opillCount}>24</span>}
          </span>
        </div>
        <div className={s.configCode}>{"<"}<b>Pill</b> {props}{">"}{text || "Pill"}{"</"}<b>Pill</b>{">"}</div>
      </div>
    </div>
  );
}
