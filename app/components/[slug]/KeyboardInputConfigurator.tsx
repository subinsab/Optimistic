"use client";

import { useState } from "react";
import s from "../docs.module.css";

const SIZES = ["S", "M", "L"] as const;
const KEYS = ["⌘ K", "⌘ ⇧ P", "G P", "↵"] as const;
const SZ: Record<string, string> = { S: "okbdSm", M: "", L: "okbdLg" };

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

export default function KeyboardInputConfigurator() {
  const [size, setSize] = useState("M");
  const [combo, setCombo] = useState("⌘ K");
  const szCls = SZ[size] ? s[SZ[size] as keyof typeof s] : "";
  const keys = combo.split(" ");
  const props = [size !== "M" ? `size="${size.toLowerCase()}"` : "", `keys={[${keys.map((k) => `"${k}"`).join(", ")}]}`].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="Combo" options={KEYS} value={combo} onPick={setCombo} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <span className={s.okbdCombo}>
            {keys.map((k, i) => (<span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>{i > 0 && <span className={s.okbdPlus}>+</span>}<kbd className={`${s.okbd} ${szCls}`}>{k}</kbd></span>))}
          </span>
        </div>
        <div className={s.configCode}>{"<"}<b>Kbd</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
