"use client";

import { useState } from "react";
import Logo from "../../_components/Logo";
import s from "../docs.module.css";

const TABS = ["Lockup", "Mark", "App icon", "Sizes"] as const;

export default function LogoDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Lockup");
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Logo examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Lockup" && (
          <>
            <div className={s.subLabel}>Mark plus wordmark — the primary signature</div>
            <div className={s.ologoStage}><Logo size={34} /></div>
          </>
        )}
        {tab === "Mark" && (
          <>
            <div className={s.subLabel}>The bare pixel-O, one warm pixel at 45°</div>
            <div className={s.ologoStage}><Logo size={64} withWordmark={false} /></div>
          </>
        )}
        {tab === "App icon" && (
          <>
            <div className={s.subLabel}>The mark set in a rounded chip for app tiles and favicons</div>
            <div className={s.btnRow} style={{ gap: 20, justifyContent: "center" }}>
              <span className={s.ologoChip} style={{ width: 88, height: 88 }}><Logo size={52} withWordmark={false} /></span>
              <span className={s.ologoChip} style={{ width: 56, height: 56, borderRadius: 12 }}><Logo size={34} withWordmark={false} /></span>
              <span className={s.ologoChip} style={{ width: 36, height: 36, borderRadius: 9 }}><Logo size={22} withWordmark={false} /></span>
            </div>
          </>
        )}
        {tab === "Sizes" && (
          <>
            <div className={s.subLabel}>Scales cleanly; never below 20px where the grid blurs</div>
            <div className={s.btnRow} style={{ gap: 24, alignItems: "center" }}>
              {[24, 40, 64].map((n) => <Logo key={n} size={n} withWordmark={false} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
