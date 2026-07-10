"use client";

import { useState } from "react";
import s from "../docs.module.css";
import { Illustration, SCENE_NAMES } from "./illustrationScenes";

const SIZES = ["80", "120", "160"];
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

export default function IllustrationConfigurator() {
  const [scene, setScene] = useState("not-found");
  const [size, setSize] = useState("120");
  const [surface, setSurface] = useState("Dark");
  const light = surface === "Light";
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Scene" options={SCENE_NAMES} value={scene} onPick={setScene} />
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="Surface" options={SURFACE} value={surface} onPick={setSurface} />
      </div>
      <div className={s.configRight}>
        <div className={`${s.configPreview} ${light ? s.oillPreviewLight : ""}`}>
          <span style={{ color: light ? "#1a1a1a" : "#e7e9ee", display: "inline-flex" }}>
            <Illustration name={scene} size={Number(size)} />
          </span>
        </div>
        <div className={s.configCode}>{"<"}<b>Illustration</b> name=&quot;{scene}&quot; size={`{${size}}`} {"/>"}</div>
      </div>
    </div>
  );
}
