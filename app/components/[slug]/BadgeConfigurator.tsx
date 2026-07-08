"use client";

import { useState } from "react";
import s from "../docs.module.css";

const VARIANTS = ["Neutral", "Brand", "Success", "Error", "Info", "Warning", "Solid", "Outline"] as const;
const SHAPES = ["Label", "Dot + label", "Count"] as const;
const SIZES = ["S", "M", "L"] as const;
const VC: Record<string, string> = { Neutral: "bgNeutral", Brand: "bgWarm", Success: "bgSuccess", Error: "bgError", Info: "bgInfo", Warning: "bgWarning", Solid: "bgSolid", Outline: "bgOutline" };
const SZ: Record<string, string> = { S: "bgSm", M: "", L: "bgLg" };

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

export default function BadgeConfigurator() {
  const [variant, setVariant] = useState("Success");
  const [shape, setShape] = useState("Dot + label");
  const [size, setSize] = useState("M");
  const [text, setText] = useState("Active");
  const isCount = shape === "Count";
  const szCls = SZ[size] ? s[SZ[size] as keyof typeof s] : "";
  const cls = isCount
    ? `${s.obadge} ${s.bgCount} ${szCls}`
    : `${s.obadge} ${s[VC[variant] as keyof typeof s]} ${shape === "Dot + label" ? s.bgDot : ""} ${szCls}`;
  const props = [`variant="${variant.toLowerCase()}"`, size !== "M" ? `size="${size.toLowerCase()}"` : "", shape === "Dot + label" ? "dot" : "", isCount ? "count" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Variant" options={VARIANTS} value={variant} onPick={setVariant} />
        <Chips label="Shape" options={SHAPES} value={shape} onPick={setShape} />
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <div className={s.configGroup}><span className={s.configLabel}>Text</span><input className={s.configInput} value={text} maxLength={16} onChange={(e) => setText(e.target.value)} aria-label="Text" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}><span className={cls}>{isCount ? (text || "3") : (text || "Label").toUpperCase()}</span></div>
        <div className={s.configCode}>{"<"}<b>Badge</b> {props}{">"}{text || "Label"}{"</"}<b>Badge</b>{">"}</div>
      </div>
    </div>
  );
}
