"use client";

import { useState } from "react";
import s from "../docs.module.css";

const LEN = ["4", "5", "6"] as const;
const SIZES = ["S", "M", "L"] as const;
const MASK = ["Digits", "Masked"] as const;
const STATES = ["Default", "Error", "Success"] as const;
const SZ: Record<string, string> = { S: "opinSm", M: "", L: "opinLg" };

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

export default function PinInputConfigurator() {
  const [len, setLen] = useState("4");
  const [size, setSize] = useState("M");
  const [mask, setMask] = useState("Digits");
  const [state, setState] = useState("Default");
  const tone = state === "Error" ? s.opinErr : state === "Success" ? s.opinOk : "";
  const szCls = SZ[size] ? s[SZ[size] as keyof typeof s] : "";
  const masked = mask === "Masked";
  const sample = ["4", "8", "1", "9", "2", "0"].slice(0, +len);
  const props = [`length={${len}}`, size !== "M" ? `size="${size.toLowerCase()}"` : "", masked ? "mask" : "", state === "Error" ? `status="error"` : state === "Success" ? `status="success"` : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Length" options={LEN} value={len} onPick={setLen} />
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="Masking" options={MASK} value={mask} onPick={setMask} />
        <Chips label="State" options={STATES} value={state} onPick={setState} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={`${s.opin} ${tone} ${szCls}`}>
            {sample.map((d, i) => (
              <span key={i} className={`${s.opinCell} ${s.opinCellFilled}`} style={{ display: "grid", placeItems: "center" }}>{masked ? "•" : d}</span>
            ))}
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>PinInput</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
