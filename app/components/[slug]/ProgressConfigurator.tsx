"use client";

import { useState } from "react";
import s from "../docs.module.css";

const SHAPE = ["Bar", "Circular"] as const;
const SIZES = ["S", "M", "L"] as const;
const MODE = ["Determinate", "Indeterminate"] as const;
const LABEL = ["With", "Without"] as const;
const SZ: Record<string, string> = { S: "oprogSm", M: "", L: "oprogLg" };

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

function Ring({ pct }: { pct: number }) {
  const size = 68, r = size / 2 - 6, circ = 2 * Math.PI * r;
  return (
    <span className={s.oprogRingWrap} style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle className={s.oprogRingTrack} cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={5} />
        <circle className={s.oprogRingFill} cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={5} strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)} />
      </svg>
      <span className={s.oprogRingText}>{pct}%</span>
    </span>
  );
}

export default function ProgressConfigurator() {
  const [shape, setShape] = useState("Bar");
  const [size, setSize] = useState("M");
  const [mode, setMode] = useState("Determinate");
  const [label, setLabel] = useState("With");
  const [value, setValue] = useState(62);
  const indet = mode === "Indeterminate";
  const szCls = SZ[size] ? s[SZ[size] as keyof typeof s] : "";
  const props = [`variant="${shape.toLowerCase()}"`, indet ? "indeterminate" : `value={${value}}`, shape === "Bar" && size !== "M" ? `size="${size.toLowerCase()}"` : "", label === "With" && !indet ? "showValue" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Shape" options={SHAPE} value={shape} onPick={setShape} />
        <Chips label="Mode" options={MODE} value={mode} onPick={setMode} />
        {shape === "Bar" && <Chips label="Size" options={SIZES} value={size} onPick={setSize} />}
        <Chips label="Label" options={LABEL} value={label} onPick={setLabel} />
        {!indet && <div className={s.configGroup}><span className={s.configLabel}>Value</span><input type="range" min={0} max={100} value={value} onChange={(e) => setValue(+e.target.value)} aria-label="Value" style={{ accentColor: "#ff7a00" }} /></div>}
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          {shape === "Circular"
            ? <Ring pct={indet ? 25 : value} />
            : <div className={`${s.oprog} ${szCls} ${indet ? s.oprogIndet : ""}`} style={{ maxWidth: 260 }}>
                {label === "With" && !indet && <div className={s.oprogHead}><span>Progress</span><b>{value}%</b></div>}
                <div className={s.oprogBar}><div className={s.oprogFill} style={indet ? undefined : { width: `${value}%` }} /></div>
              </div>}
        </div>
        <div className={s.configCode}>{"<"}<b>Progress</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
