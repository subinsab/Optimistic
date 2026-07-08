"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Statuses", "Live", "On elements"] as const;
const STATUS: Record<string, string> = { Online: "oindOnline", Idle: "oindIdle", Busy: "oindBusy", Offline: "oindOffline" };

export default function IndicatorDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Statuses");
  const [live, setLive] = useState(true);

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Indicator examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Statuses" && (
          <>
            <div className={s.subLabel}>One dot, four meanings</div>
            <div className={s.btnRow} style={{ gap: 26 }}>
              {Object.entries(STATUS).map(([label, cls]) => (
                <span key={label} className={s.oindRow}><span className={`${s.oind} ${s[cls as keyof typeof s]}`} />{label}</span>
              ))}
            </div>
          </>
        )}
        {tab === "Live" && (
          <>
            <div className={s.subLabel}>A pulse for &quot;now&quot; — toggle it</div>
            <div className={s.btnRow} style={{ gap: 20 }}>
              <span className={s.oindRow}><span className={live ? `${s.oind} ${s.oindLive}` : `${s.oind} ${s.oindOffline}`} />{live ? "Live" : "Ended"}</span>
              <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={() => setLive((v) => !v)}>{live ? "End stream" : "Go live"}</button>
              <span className={s.stateBadge}>pulse respects reduced-motion</span>
            </div>
          </>
        )}
        {tab === "On elements" && (
          <>
            <div className={s.subLabel}>Anchored to an avatar or a label</div>
            <div className={s.btnRow} style={{ gap: 28 }}>
              <span className={s.oindDotAnchor}>
                <span className={s.olistAvatar} style={{ width: 40, height: 40 }}>AL</span>
                <span className={`${s.oind} ${s.oindOnline} ${s.oindRing} ${s.oindLg}`} />
              </span>
              <span className={s.oindDotAnchor}>
                <span className={s.olistAvatar} style={{ width: 40, height: 40 }}>AT</span>
                <span className={`${s.oind} ${s.oindIdle} ${s.oindRing} ${s.oindLg}`} />
              </span>
              <span className={`${s.obadge} ${s.bgNeutral}`} style={{ gap: 7 }}><span className={`${s.oind} ${s.oindBusy}`} />DND</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
