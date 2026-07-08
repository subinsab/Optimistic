"use client";

import { useState } from "react";
import s from "../docs.module.css";

const KIND = ["Spinner", "Dots"] as const;
const SIZES = ["S", "M", "L"] as const;
const LABEL = ["None", "Label"] as const;
const SZ: Record<string, string> = { S: "oloaderSm", M: "", L: "oloaderLg" };

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

export default function LoaderConfigurator() {
  const [kind, setKind] = useState("Spinner");
  const [size, setSize] = useState("M");
  const [label, setLabel] = useState("None");
  const [text, setText] = useState("Loading…");
  const szCls = SZ[size] ? s[SZ[size] as keyof typeof s] : "";
  const el = kind === "Dots"
    ? <span className={s.oloaderDots}><span /><span /><span /></span>
    : <span className={`${s.oloader} ${szCls}`} />;
  const props = [`variant="${kind.toLowerCase()}"`, kind === "Spinner" && size !== "M" ? `size="${size.toLowerCase()}"` : "", label === "Label" ? `label="${text}"` : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Variant" options={KIND} value={kind} onPick={setKind} />
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="Label" options={LABEL} value={label} onPick={setLabel} />
        <div className={s.configGroup}><span className={s.configLabel}>Text</span><input className={s.configInput} value={text} maxLength={24} onChange={(e) => setText(e.target.value)} aria-label="Text" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          {label === "Label"
            ? <span className={s.oloaderRow} role="status">{el} {text || "Loading…"}</span>
            : <span role="status" aria-label="Loading">{el}</span>}
        </div>
        <div className={s.configCode}>{"<"}<b>Loader</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
