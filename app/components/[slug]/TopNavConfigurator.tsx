"use client";

import { useState } from "react";
import Logo from "../../_components/Logo";
import s from "../docs.module.css";

const VARIANT = ["Fixed", "Floating"] as const;
const LOGO = ["On", "Off"] as const;
const CLIENT = ["On", "Off"] as const;
const SEARCH = ["With", "Without"] as const;
const CTA = ["With", "Without"] as const;
const SearchIcon = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
const Caret = () => (<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);

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

export default function TopNavConfigurator() {
  const [variant, setVariant] = useState("Fixed");
  const [logo, setLogo] = useState("On");
  const [client, setClient] = useState("On");
  const [search, setSearch] = useState("With");
  const [cta, setCta] = useState("With");
  const props = [variant === "Floating" ? `variant="floating"` : "", logo === "Off" ? "logo={false}" : "", client === "On" ? "clientSwitcher" : "", search === "With" ? "search" : "", cta === "With" ? "cta={<Button/>}" : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Variant" options={VARIANT} value={variant} onPick={setVariant} />
        <Chips label="Logo" options={LOGO} value={logo} onPick={setLogo} />
        <Chips label="Client switcher" options={CLIENT} value={client} onPick={setClient} />
        <Chips label="Search" options={SEARCH} value={search} onPick={setSearch} />
        <Chips label="CTA" options={CTA} value={cta} onPick={setCta} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview} style={{ alignItems: "stretch", padding: "24px 16px" }}>
          <nav className={`${s.otnav} ${variant === "Floating" ? s.otnavFloat : ""}`} style={{ background: "#0e0f12", gap: 12, minWidth: 0 }}>
            {logo === "On" && <span className={s.otnavBrand}><Logo size={20} withWordmark={false} /> Optimistic</span>}
            {client === "On" && (
              <span className={s.otnavClient} style={{ alignSelf: "center" }}>
                <span className={s.otnavClientDot} style={{ background: "#3e63dd" }}>A</span>Acme<span className={s.otnavClientCaret}><Caret /></span>
              </span>
            )}
            <div className={s.otnavLinks}><span className={`${s.otnavLink} ${s.otnavOn}`}>Home</span><span className={s.otnavLink}>Docs</span></div>
            <div className={s.otnavRight} style={{ minWidth: 0 }}>
              {search === "With" && <span className={s.otnavSearch} style={{ width: "auto" }}><SearchIcon /> Search</span>}
              {cta === "With" && <button className={`${s.obtn} ${s.sm} ${s.vWarm}`}>New</button>}
              <span className={`${s.oavatar} ${s.avSm} ${s.avBlue}`}>AL</span>
            </div>
          </nav>
        </div>
        <div className={s.configCode}>{"<"}<b>TopNav</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
