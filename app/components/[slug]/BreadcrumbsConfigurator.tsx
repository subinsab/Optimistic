"use client";

import { useState } from "react";
import s from "../docs.module.css";
import { Sep, type SepKind } from "./BreadcrumbsDemo";

const SEP = ["Chevron", "Slash", "Arrow", "Dot"] as const;
const ICONS = ["Off", "On"] as const;
const TRUNC = ["Full", "Collapsed"] as const;
const MENUS = ["Off", "On"] as const;
const noNav = (e: React.MouseEvent) => e.preventDefault();
const Home = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 7L8 2.5 13.5 7M4 6v7.5h8V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Caret = () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);

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
  const [menus, setMenus] = useState("Off");
  const kind = sep.toLowerCase() as SepKind;
  const crumbs = trunc === "Collapsed" ? ["Home", "…", "Data Display"] : ["Home", "Components", "Data Display"];
  const props = [`separator="${kind}"`, icons === "On" ? "showIcons" : "", menus === "On" ? "siblingMenus" : "", trunc === "Collapsed" ? "maxItems={4}" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Separator" options={SEP} value={sep} onPick={setSep} />
        <Chips label="Icons" options={ICONS} value={icons} onPick={setIcons} />
        <Chips label="Sibling menus" options={MENUS} value={menus} onPick={setMenus} />
        <Chips label="Overflow" options={TRUNC} value={trunc} onPick={setTrunc} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <nav className={s.obc} aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c} style={{ display: "inline-flex", alignItems: "center" }}>
                <a href="#" onClick={noNav} className={s.obcItem}>{icons === "On" && i === 0 && <Home />} {c}</a>
                {menus === "On" && c !== "…" && <button type="button" className={s.obcCaret} aria-label={`Switch ${c}`}><Caret /></button>}
                <Sep kind={kind} />
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
