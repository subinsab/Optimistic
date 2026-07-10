"use client";

import { useState } from "react";
import s from "../docs.module.css";

const VARIANTS = ["Primary", "Brand", "Ghost"] as const;
const SIZES = ["S", "M", "L"] as const;
const VAR: Record<string, string> = { Primary: "vPrimary", Brand: "vWarm", Ghost: "vGhost" };
const SZ: Record<string, string> = { S: "sm", M: "m", L: "l" };
const Chevron = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
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

export default function SplitButtonConfigurator() {
  const [variant, setVariant] = useState("Primary");
  const [size, setSize] = useState("M");
  const [text, setText] = useState("Save");
  const v = s[VAR[variant] as keyof typeof s];
  const sz = s[SZ[size] as keyof typeof s];
  const props = [`variant="${variant === "Brand" ? "brand" : variant.toLowerCase()}"`, size !== "M" ? `size="${size.toLowerCase()}"` : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Variant" options={VARIANTS} value={variant} onPick={setVariant} />
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <div className={s.configGroup}><span className={s.configLabel}>Label</span><input className={s.configInput} value={text} maxLength={16} onChange={(e) => setText(e.target.value)} aria-label="Label" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={s.osplit}>
            <button type="button" className={`${s.obtn} ${sz} ${v} ${s.osplitMain}`}>{text || "Action"}</button>
            <button type="button" className={`${s.obtn} ${sz} ${v} ${s.osplitToggle}`} aria-label="More options"><Chevron /></button>
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>SplitButton</b> {props}{">"}{text || "Action"}{"</"}<b>SplitButton</b>{">"}</div>
      </div>
    </div>
  );
}
