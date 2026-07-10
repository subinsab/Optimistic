"use client";

import { useState } from "react";
import s from "../docs.module.css";

const SHAPE = ["Line", "Circle", "Box"] as const;
const WIDTH = ["Full", "Three-quarter", "Half"] as const;
const SHIMMER = ["On", "Off"] as const;
const WMAP: Record<string, string> = { Full: "100%", "Three-quarter": "75%", Half: "50%" };

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

export default function SkeletonConfigurator() {
  const [shape, setShape] = useState("Line");
  const [width, setWidth] = useState("Three-quarter");
  const [shimmer, setShimmer] = useState("On");
  const isCircle = shape === "Circle";
  const cls = shape === "Circle" ? s.oskelCircle : shape === "Box" ? s.oskelBox : s.oskelLine;
  const style: React.CSSProperties = isCircle
    ? { width: 56, height: 56 }
    : shape === "Box" ? { width: WMAP[width], height: 80 } : { width: WMAP[width], height: 14 };
  const props = [`variant="${shape.toLowerCase()}"`, !isCircle ? `width="${WMAP[width]}"` : "", shimmer === "Off" ? "shimmer={false}" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Shape" options={SHAPE} value={shape} onPick={setShape} />
        <Chips label="Width" options={WIDTH} value={width} onPick={setWidth} />
        <Chips label="Shimmer" options={SHIMMER} value={shimmer} onPick={setShimmer} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div style={{ width: "100%", maxWidth: 260 }}>
            <div className={`${s.oskel} ${cls} ${shimmer === "Off" ? s.oskelStatic : ""}`} style={style} />
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>Skeleton</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
