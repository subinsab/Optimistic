"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TONES = ["Neutral", "Warm", "Success", "Info", "Danger"] as const;
const KINDS = ["Removable", "Static"] as const;
const SIZES = ["S", "M", "L"] as const;
const TC: Record<string, string> = { Neutral: "", Warm: "otagWarm", Success: "otagSuccess", Info: "otagInfo", Danger: "otagDanger" };
const SZ: Record<string, string> = { S: "otagSm", M: "", L: "otagLg" };
const X = () => (<svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);

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

export default function TagsConfigurator() {
  const [tone, setTone] = useState("Neutral");
  const [kind, setKind] = useState("Removable");
  const [size, setSize] = useState("M");
  const [text, setText] = useState("design");
  const removable = kind === "Removable";
  const toneCls = TC[tone] ? s[TC[tone] as keyof typeof s] : "";
  const szCls = SZ[size] ? s[SZ[size] as keyof typeof s] : "";
  const props = [tone !== "Neutral" ? `tone="${tone.toLowerCase()}"` : "", size !== "M" ? `size="${size.toLowerCase()}"` : "", removable ? "onRemove={fn}" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Tone" options={TONES} value={tone} onPick={setTone} />
        <Chips label="Kind" options={KINDS} value={kind} onPick={setKind} />
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <div className={s.configGroup}><span className={s.configLabel}>Text</span><input className={s.configInput} value={text} maxLength={20} onChange={(e) => setText(e.target.value)} aria-label="Text" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <span className={`${s.otag} ${!removable ? s.otagStatic : ""} ${toneCls} ${szCls}`}>
            {text || "tag"}
            {removable && <button type="button" className={s.otagX} aria-label="Remove"><X /></button>}
          </span>
        </div>
        <div className={s.configCode}>{"<"}<b>Tag</b> {props}{">"}{text || "tag"}{"</"}<b>Tag</b>{">"}</div>
      </div>
    </div>
  );
}
