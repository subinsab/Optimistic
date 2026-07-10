"use client";

import { useState } from "react";
import s from "../docs.module.css";

const VARIANT = ["Circle", "Extended"] as const;
const SIZE = ["Regular", "Small"] as const;
const Plus = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>);

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

export default function FabConfigurator() {
  const [variant, setVariant] = useState("Circle");
  const [size, setSize] = useState("Regular");
  const [label, setLabel] = useState("New project");
  const ext = variant === "Extended";
  const props = [ext ? `label="${label}"` : "", size === "Small" && !ext ? `size="sm"` : "", "icon={<Plus />}"].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Variant" options={VARIANT} value={variant} onPick={setVariant} />
        {!ext && <Chips label="Size" options={SIZE} value={size} onPick={setSize} />}
        {ext && <div className={s.configGroup}><span className={s.configLabel}>Label</span><input className={s.configInput} value={label} maxLength={18} onChange={(e) => setLabel(e.target.value)} aria-label="Label" /></div>}
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          {ext
            ? <button className={`${s.ofab} ${s.ofabExt}`} style={{ pointerEvents: "none" }}><Plus /> {label || "Action"}</button>
            : <button className={`${s.ofab} ${size === "Small" ? s.ofabSm : ""}`} style={{ pointerEvents: "none" }} aria-label="Add"><Plus /></button>}
        </div>
        <div className={s.configCode}>{"<"}<b>FAB</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
