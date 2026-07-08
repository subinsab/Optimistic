"use client";

import { useState } from "react";
import s from "../docs.module.css";

const SEP = ["Chevron", "Slash"] as const;
const ICONS = ["Off", "On"] as const;
const TRUNC = ["Full", "Collapsed"] as const;
const noNav = (e: React.MouseEvent) => e.preventDefault();
const Home = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 7L8 2.5 13.5 7M4 6v7.5h8V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>);

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

export default function BreadcrumbsConfigurator() {
  const [sep, setSep] = useState("Chevron");
  const [icons, setIcons] = useState("Off");
  const [trunc, setTrunc] = useState("Full");
  const Sep = () => sep === "Slash"
    ? <span className={s.obcSep} style={{ padding: "0 3px" }}>/</span>
    : <span className={s.obcSep}><svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>;
  const crumbs = trunc === "Collapsed" ? ["Home", "…", "Data Display"] : ["Home", "Components", "Data Display"];
  const props = [`separator="${sep.toLowerCase()}"`, icons === "On" ? "showIcons" : "", trunc === "Collapsed" ? "maxItems={4}" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Separator" options={SEP} value={sep} onPick={setSep} />
        <Chips label="Icons" options={ICONS} value={icons} onPick={setIcons} />
        <Chips label="Overflow" options={TRUNC} value={trunc} onPick={setTrunc} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <nav className={s.obc} aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c} style={{ display: "inline-flex", alignItems: "center" }}>
                <a href="#" onClick={noNav} className={s.obcItem}>{icons === "On" && i === 0 && <Home />} {c}</a><Sep />
              </span>
            ))}
            <span className={`${s.obcItem} ${s.obcCurrent}`} aria-current="page">Avatar</span>
          </nav>
        </div>
        <div className={s.configCode}>{"<"}<b>Breadcrumbs</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
