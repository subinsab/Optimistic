"use client";

import { useState } from "react";
import s from "../docs.module.css";

const VARIANTS = ["Line", "Pill", "Enclosed"] as const;
const SIZES = ["S", "M", "L"] as const;
const VC: Record<string, string> = { Line: "otabsLine", Pill: "otabsPill", Enclosed: "otabsEnclosed" };
const SZ: Record<string, string> = { S: "otabSm", M: "", L: "otabLg" };
const ITEMS = ["Overview", "Activity", "Settings"];

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

export default function TabsConfigurator() {
  const [variant, setVariant] = useState("Line");
  const [size, setSize] = useState("M");
  const [active, setActive] = useState("Activity");
  const szCls = SZ[size] ? s[SZ[size] as keyof typeof s] : "";
  const props = [`variant="${variant.toLowerCase()}"`, size !== "M" ? `size="${size.toLowerCase()}"` : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Variant" options={VARIANTS} value={variant} onPick={setVariant} />
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="Active" options={ITEMS} value={active} onPick={setActive} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={`${s.otabs} ${s[VC[variant] as keyof typeof s]} ${szCls}`} role="tablist">
            {ITEMS.map((t) => (
              <button key={t} type="button" role="tab" aria-selected={active === t}
                className={`${s.otab} ${active === t ? s.otabOn : ""}`} onClick={() => setActive(t)}>{t}</button>
            ))}
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>Tabs</b> {props}{">…</"}<b>Tabs</b>{">"}</div>
      </div>
    </div>
  );
}
