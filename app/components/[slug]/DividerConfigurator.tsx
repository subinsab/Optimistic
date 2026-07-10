"use client";

import { useState } from "react";
import s from "../docs.module.css";

const ORIENT = ["Horizontal", "Vertical"] as const;
const STYLE = ["Solid", "Dashed"] as const;
const LABEL = ["None", "Label"] as const;

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

export default function DividerConfigurator() {
  const [orient, setOrient] = useState("Horizontal");
  const [style, setStyle] = useState("Solid");
  const [label, setLabel] = useState("None");
  const [text, setText] = useState("Or");
  const vertical = orient === "Vertical";
  const hasLabel = label === "Label" && !vertical;
  const props = [vertical ? `orientation="vertical"` : "", style === "Dashed" ? `variant="dashed"` : "", hasLabel ? `label="${text}"` : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Orientation" options={ORIENT} value={orient} onPick={setOrient} />
        <Chips label="Style" options={STYLE} value={style} onPick={setStyle} />
        {!vertical && <Chips label="Label" options={LABEL} value={label} onPick={setLabel} />}
        {hasLabel && <div className={s.configGroup}><span className={s.configLabel}>Text</span><input className={s.configInput} value={text} maxLength={16} onChange={(e) => setText(e.target.value)} aria-label="Text" /></div>}
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          {vertical
            ? <div style={{ display: "flex", alignItems: "center", gap: 14, height: 40, color: "#9aa0a8" }}><span>Left</span><span className={s.odivVert} />
                <span>Right</span></div>
            : hasLabel
              ? <div className={s.odivLabel} style={{ width: "100%", maxWidth: 260 }}>{text || "Or"}</div>
              : <hr className={`${s.odiv} ${style === "Dashed" ? s.odivDashed : ""}`} style={{ maxWidth: 260 }} />}
        </div>
        <div className={s.configCode}>{"<"}<b>Divider</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
