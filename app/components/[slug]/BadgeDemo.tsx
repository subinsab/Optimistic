"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Variants", "Count & Dot", "Live count"] as const;
const Bell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" stroke="#cfd3da" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M10 20a2 2 0 0 0 4 0" stroke="#cfd3da" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export default function BadgeDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Variants");
  const [n, setN] = useState(3);

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Badge examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Variants" && (
          <>
            <div className={s.subLabel}>Semantic variants</div>
            <div className={s.btnRow} style={{ gap: 10, flexWrap: "wrap" }}>
              <span className={`${s.obadge} ${s.bgNeutral}`}>NEUTRAL</span>
              <span className={`${s.obadge} ${s.bgWarm}`}>BRAND</span>
              <span className={`${s.obadge} ${s.bgSuccess}`}>SUCCESS</span>
              <span className={`${s.obadge} ${s.bgError}`}>ERROR</span>
              <span className={`${s.obadge} ${s.bgInfo}`}>INFO</span>
              <span className={`${s.obadge} ${s.bgWarning}`}>WARNING</span>
            </div>
            <div className={s.subLabel}>Solid, outline &amp; with a dot</div>
            <div className={s.btnRow} style={{ gap: 10, flexWrap: "wrap" }}>
              <span className={`${s.obadge} ${s.bgSolid}`}>LIVE</span>
              <span className={`${s.obadge} ${s.bgOutline}`}>OUTLINE</span>
              <span className={`${s.obadge} ${s.bgSuccess} ${s.bgDot}`}>ACTIVE</span>
              <span className={`${s.obadge} ${s.bgNeutral} ${s.bgDot}`}>DRAFT</span>
              <span className={`${s.obadge} ${s.bgError} ${s.bgDot}`}>DOWN</span>
            </div>
            <div className={s.subLabel}>Sizes — S · M · L</div>
            <div className={s.btnRow} style={{ gap: 10, alignItems: "center" }}>
              <span className={`${s.obadge} ${s.bgSuccess} ${s.bgSm}`}>SMALL</span>
              <span className={`${s.obadge} ${s.bgSuccess}`}>MEDIUM</span>
              <span className={`${s.obadge} ${s.bgSuccess} ${s.bgLg}`}>LARGE</span>
            </div>
          </>
        )}
        {tab === "Count & Dot" && (
          <>
            <div className={s.subLabel}>Count badges</div>
            <div className={s.btnRow} style={{ gap: 12 }}>
              <span className={`${s.obadge} ${s.bgCount}`}>1</span>
              <span className={`${s.obadge} ${s.bgCount}`}>12</span>
              <span className={`${s.obadge} ${s.bgCount}`}>99+</span>
            </div>
            <div className={s.subLabel}>Anchored to an element</div>
            <div className={s.btnRow} style={{ gap: 24 }}>
              <span className={s.bgAnchor}><Bell /><span className={`${s.obadge} ${s.bgCount}`}>5</span></span>
              <span className={s.bgAnchor}><Bell /><span className={`${s.obadge} ${s.bgCount}`} style={{ background: "#eb4a4f" }}>!</span></span>
            </div>
          </>
        )}
        {tab === "Live count" && (
          <>
            <div className={s.subLabel}>Count reacts to state</div>
            <div className={s.btnRow} style={{ gap: 20 }}>
              <span className={s.bgAnchor}><Bell />{n > 0 && <span className={`${s.obadge} ${s.bgCount}`}>{n > 99 ? "99+" : n}</span>}</span>
              <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={() => setN(v => v + 1)}>+1</button>
              <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={() => setN(0)}>Clear</button>
              <span className={s.stateBadge}>hides at zero, caps at 99+</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
