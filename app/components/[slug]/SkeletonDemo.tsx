"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["Text", "Media", "Live swap"] as const;

export default function SkeletonDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Text");
  const [loading, setLoading] = useState(true);
  const timer = useRef<number | undefined>(undefined);
  const reload = () => {
    setLoading(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLoading(false), 1800);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Skeleton examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Text" && (
          <>
            <div className={s.subLabel}>Lines mirror the shape of the text to come</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
              <div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "40%", height: 15 }} />
              <div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "100%" }} />
              <div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "92%" }} />
              <div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "78%" }} />
            </div>
          </>
        )}
        {tab === "Media" && (
          <>
            <div className={s.subLabel}>Avatar, image and card placeholders</div>
            <div style={{ display: "flex", gap: 26, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div className={s.oskelRow}>
                <div className={`${s.oskel} ${s.oskelCircle}`} style={{ width: 40, height: 40 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <div className={`${s.oskel} ${s.oskelLine}`} style={{ width: 120 }} />
                  <div className={`${s.oskel} ${s.oskelLine}`} style={{ width: 80, height: 9 }} />
                </div>
              </div>
              <div className={s.oskelCard}>
                <div className={`${s.oskel} ${s.oskelBox}`} style={{ width: "100%", height: 96 }} />
                <div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "70%" }} />
                <div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "90%", height: 9 }} />
              </div>
            </div>
          </>
        )}
        {tab === "Live swap" && (
          <>
            <div className={s.subLabel}>Structure first, content on arrival — reload to see</div>
            <div className={s.oskelCard} style={{ minHeight: 132 }}>
              {loading ? (
                <>
                  <div className={s.oskelRow}>
                    <div className={`${s.oskel} ${s.oskelCircle}`} style={{ width: 38, height: 38 }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                      <div className={`${s.oskel} ${s.oskelLine}`} style={{ width: 130 }} />
                      <div className={`${s.oskel} ${s.oskelLine}`} style={{ width: 84, height: 9 }} />
                    </div>
                  </div>
                  <div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "100%" }} />
                  <div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "82%" }} />
                </>
              ) : (
                <>
                  <div className={s.oskelRow}>
                    <span className={`${s.oavatar} ${s.avMd} ${s.avWarm}`}>AL</span>
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <span className={s.olistTitle}>Ada Lovelace</span>
                      <span className={s.olistDesc}>Design Lead · online</span>
                    </div>
                  </div>
                  <p className={s.olistDesc} style={{ whiteSpace: "normal", lineHeight: 1.6 }}>Optimism is a stance, not a mood — ship the success state first, then reconcile.</p>
                </>
              )}
            </div>
            <div className={s.btnRow} style={{ gap: 12, marginTop: 14 }}>
              <button className={`${s.obtn} ${s.sm} ${s.vWarm}`} onClick={reload}>Reload</button>
              <span className={s.stateBadge}>{loading ? "loading…" : "loaded"}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
