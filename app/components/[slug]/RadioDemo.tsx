"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Group", "Sizes", "States"] as const;

function Radio({ on, size = "rdM", disabled, onClick }: { on: boolean; size?: string; disabled?: boolean; onClick?: () => void }) {
  return (
    <button type="button" role="radio" aria-checked={on} disabled={disabled} onClick={onClick}
      className={`${s.oradio} ${s[size as keyof typeof s]} ${on ? s.oradioOn : ""}`} />
  );
}

export default function RadioDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Group");
  const [plan, setPlan] = useState("Pro");
  const [sz, setSz] = useState("M");

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Radio examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Group" && (
          <>
            <div className={s.subLabel}>One of many — click to choose</div>
            <div role="radiogroup" aria-label="Plan" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["Starter", "Free forever"], ["Pro", "For growing teams"], ["Enterprise", "SLAs and SSO"]].map(([name, desc]) => (
                <label key={name} className={s.selRow}>
                  <Radio on={plan === name} onClick={() => setPlan(name)} />
                  <span className={s.selText}><span className={s.selTitle}>{name}</span><span className={s.selDesc}>{desc}</span></span>
                </label>
              ))}
            </div>
          </>
        )}
        {tab === "Sizes" && (
          <>
            <div className={s.subLabel}>Sizes</div>
            <div className={s.btnRow}><span className={s.rowLabel}>L · 22px</span><Radio on={sz === "L"} size="rdL" onClick={() => setSz("L")} /></div>
            <div className={s.btnRow}><span className={s.rowLabel}>M · 18px</span><Radio on={sz === "M"} size="rdM" onClick={() => setSz("M")} /></div>
            <div className={s.btnRow}><span className={s.rowLabel}>S · 15px</span><Radio on={sz === "S"} size="rdS" onClick={() => setSz("S")} /></div>
          </>
        )}
        {tab === "States" && (
          <>
            <div className={s.subLabel}>States</div>
            <div className={s.btnRow}><span className={s.rowLabel}>Off</span><Radio on={false} /></div>
            <div className={s.btnRow}><span className={s.rowLabel}>On</span><Radio on={true} /><span className={s.stateBadge}>warm dot springs in</span></div>
            <div className={s.btnRow}><span className={s.rowLabel}>Disabled</span><Radio on={false} disabled /><Radio on={true} disabled /></div>
          </>
        )}
      </div>
    </div>
  );
}
