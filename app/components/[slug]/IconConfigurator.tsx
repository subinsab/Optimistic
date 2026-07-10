"use client";

import { useState } from "react";
import s from "../docs.module.css";
import { LineIcon } from "./IconDemo";
import { FEATURED, SIZE_PX } from "./iconGlyphs";

const SIZES = Object.keys(SIZE_PX);
const WEIGHTS = ["Light", "Regular", "Bold"];
const SURFACE = ["Dark", "Light"];

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

export default function IconConfigurator() {
  const [glyph, setGlyph] = useState("sparkles");
  const [size, setSize] = useState("lg");
  const [weight, setWeight] = useState("Regular");
  const [surface, setSurface] = useState("Dark");
  const px = SIZE_PX[size];
  const light = surface === "Light";
  const wProp = weight !== "Regular" ? ` weight="${weight.toLowerCase()}"` : "";
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Glyph" options={FEATURED} value={glyph} onPick={setGlyph} />
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="Weight" options={WEIGHTS} value={weight} onPick={setWeight} />
        <Chips label="Surface" options={SURFACE} value={surface} onPick={setSurface} />
      </div>
      <div className={s.configRight}>
        <div className={`${s.configPreview} ${light ? s.oiconPreviewLight : ""}`}>
          <span style={{ color: light ? "#1a1a1a" : "#e7e9ee", display: "inline-flex" }}>
            <LineIcon name={glyph} px={Math.round(px * 1.8)} weight={weight} />
          </span>
        </div>
        <div className={s.configCode}>{"<"}<b>Icon</b> name=&quot;{glyph}&quot; size=&quot;{size}&quot;{wProp} {"/>"}</div>
      </div>
    </div>
  );
}
