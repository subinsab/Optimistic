"use client";

import { useState } from "react";
import s from "../docs.module.css";

const SPAN = ["3", "4", "6", "8", "12"] as const;
const GAP = ["sm", "default", "lg"] as const;
const OFFSET = ["0", "1", "2", "3"] as const;

const GAP_PX: Record<string, number> = { sm: 12, default: 24, lg: 32 };

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

export default function GridConfigurator() {
  const [span, setSpan] = useState("4");
  const [gap, setGap] = useState("default");
  const [offset, setOffset] = useState("0");
  const spanN = Number(span);
  const offN = Number(offset);
  const start = offN + 1;
  const gapPx = GAP_PX[gap];
  const gapProp = gap === "default" ? "" : ` gap="${gap}"`;
  const offProp = offN > 0 ? ` offset={${offN}}` : "";
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Span" options={SPAN} value={span} onPick={setSpan} />
        <Chips label="Gap" options={GAP} value={gap} onPick={setGap} />
        <Chips label="Offset" options={OFFSET} value={offset} onPick={setOffset} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={s.ogridRow} style={{ gap: gapPx, width: "100%", maxWidth: 320 }}>
            {Array.from({ length: 12 }, (_, i) => {
              const active = i >= offN && i < offN + spanN;
              if (i === offN) return (
                <div key="active" className={s.ogridCell} style={{ gridColumn: `${start} / span ${spanN}` }}>{spanN}</div>
              );
              if (active) return null;
              return <div key={i} className={`${s.ogridCell} ${s.ogridCellQuiet}`} style={{ gridColumn: "span 1" }} />;
            })}
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>Col</b> span={`{${spanN}}`}{gapProp}{offProp} {"/>"}</div>
      </div>
    </div>
  );
}
