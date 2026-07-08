"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TONES = ["Default", "Quiet"] as const;
const KINDS = ["Inline", "Standalone", "External"] as const;
const noNav = (e: React.MouseEvent) => e.preventDefault();
const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Ext = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M6 3h7v7M13 3L6 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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

export default function LinkConfigurator() {
  const [tone, setTone] = useState("Default");
  const [kind, setKind] = useState("Standalone");
  const [text, setText] = useState("Browse components");
  const standalone = kind === "Standalone";
  const external = kind === "External";
  const cls = `${s.olink} ${tone === "Quiet" ? s.olinkQuiet : ""} ${(standalone || external) ? s.olinkStandalone : ""} ${external ? s.olinkExternal : ""}`;
  const props = [tone === "Quiet" ? `tone="quiet"` : "", standalone ? "standalone" : "", external ? `external href="…"` : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Tone" options={TONES} value={tone} onPick={setTone} />
        <Chips label="Kind" options={KINDS} value={kind} onPick={setKind} />
        <div className={s.configGroup}><span className={s.configLabel}>Text</span><input className={s.configInput} value={text} maxLength={28} onChange={(e) => setText(e.target.value)} aria-label="Text" /></div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <a href="#" onClick={noNav} className={cls}>
            {text || "link"}
            {standalone && <Arrow />}
            {external && <Ext />}
          </a>
        </div>
        <div className={s.configCode}>{"<"}<b>Link</b> {props}{">"}{text || "link"}{"</"}<b>Link</b>{">"}</div>
      </div>
    </div>
  );
}
