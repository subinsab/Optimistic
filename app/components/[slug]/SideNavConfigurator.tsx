"use client";

import { useState } from "react";
import Logo from "../../_components/Logo";
import s from "../docs.module.css";

const STATE = ["Expanded", "Collapsed"] as const;
const VARIANT = ["Rounded", "Square", "Floating"] as const;
const ICONS = ["On", "Off"] as const;
const LOGO = ["On", "Off"] as const;
const VC: Record<string, string> = { Rounded: "", Square: "osnavFlat", Floating: "osnavFloat" };
const Home = () => (<svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M3 9l7-6 7 6M5 8v9h10V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Grid = () => (<svg width="17" height="17" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /><rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" /></svg>);

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

export default function SideNavConfigurator() {
  const [state, setState] = useState("Expanded");
  const [variant, setVariant] = useState("Rounded");
  const [icons, setIcons] = useState("On");
  const [logo, setLogo] = useState("On");
  const collapsed = state === "Collapsed";
  const vc = VC[variant] ? s[VC[variant] as keyof typeof s] : "";
  const showIcons = icons === "On" || collapsed;
  const props = [collapsed ? "collapsed" : "", variant !== "Rounded" ? `variant="${variant.toLowerCase()}"` : "", icons === "Off" ? "icons={false}" : "", logo === "Off" ? "logo={false}" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="State" options={STATE} value={state} onPick={setState} />
        <Chips label="Variant" options={VARIANT} value={variant} onPick={setVariant} />
        <Chips label="Icons" options={ICONS} value={icons} onPick={setIcons} />
        <Chips label="Logo" options={LOGO} value={logo} onPick={setLogo} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <nav className={`${s.osnav} ${collapsed ? s.osnavCollapsed : ""} ${vc}`}>
            {logo === "On" && <div className={s.osnavBrand}><Logo size={20} withWordmark={false} /><span className={s.osnavBrandName}>Optimistic</span></div>}
            <span className={`${s.osnavItem} ${s.osnavOn}`}>{showIcons && <span className={s.osnavIcon}><Home /></span>}<span className={s.osnavText}>Overview</span></span>
            <span className={s.osnavItem}>{showIcons && <span className={s.osnavIcon}><Grid /></span>}<span className={s.osnavText}>Projects</span><span className={`${s.osnavBadge} ${s.obadge} ${s.bgCount}`}>3</span></span>
          </nav>
        </div>
        <div className={s.configCode}>{"<"}<b>SideNav</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
