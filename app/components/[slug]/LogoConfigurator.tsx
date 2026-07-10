"use client";

import { useState } from "react";
import Logo from "../../_components/Logo";
import s from "../docs.module.css";

const CONTENT = ["Mark", "Lockup"] as const;
const CONTAINER = ["Bare", "Chip"] as const;
const SIZES = ["S", "M", "L"] as const;
const SZ: Record<string, number> = { S: 24, M: 36, L: 56 };

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

export default function LogoConfigurator() {
  const [content, setContent] = useState("Mark");
  const [container, setContainer] = useState("Bare");
  const [size, setSize] = useState("M");
  const n = SZ[size];
  const lockup = content === "Lockup";
  const chip = container === "Chip";
  const mark = <Logo size={n} withWordmark={lockup && !chip} />;
  const props = [chip ? "chip" : "", lockup && !chip ? "wordmark" : "", `size={${n}}`].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Content" options={CONTENT} value={content} onPick={setContent} />
        <Chips label="Container" options={CONTAINER} value={container} onPick={setContainer} />
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          {chip
            ? <span className={s.ologoChip} style={{ width: n + 34, height: n + 34, borderRadius: (n + 34) * 0.25 }}><Logo size={n} withWordmark={false} /></span>
            : mark}
        </div>
        <div className={s.configCode}>{"<"}<b>Logo</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
