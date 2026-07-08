"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["Bar", "Circular", "Indeterminate", "Page load"] as const;

/* NProgress-style top bar: trickles up, never hits 100 until the load finishes */
function PageLoad() {
  const [pct, setPct] = useState(0);
  const [on, setOn] = useState(false);
  const trickle = useRef<number | undefined>(undefined);
  const timers = useRef<number[]>([]);
  const start = () => {
    timers.current.forEach(clearTimeout);
    window.clearInterval(trickle.current);
    setOn(true); setPct(10);
    trickle.current = window.setInterval(() => {
      setPct((p) => (p >= 92 ? p : p + Math.max(0.6, (92 - p) * 0.14)));
    }, 380);
    timers.current = [
      window.setTimeout(() => { window.clearInterval(trickle.current); setPct(100); }, 2500),
      window.setTimeout(() => setOn(false), 2900),
      window.setTimeout(() => setPct(0), 3300),
    ];
  };
  useEffect(() => () => { window.clearInterval(trickle.current); timers.current.forEach(clearTimeout); }, []);
  return (
    <>
      <div className={s.oprogViewport}>
        <div className={s.oprogTop} role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label="Page loading">
          <div className={s.oprogTopFill} style={{ width: `${pct}%`, opacity: on ? 1 : 0 }} />
        </div>
        <div className={s.oprogChrome}><i /><i /><i /><span className={s.oprogUrl}>optimistic.design/components</span></div>
        <div className={s.oprogBody}>
          <div className={s.oprogSkeleton} style={{ width: "45%", height: 14 }} />
          <div className={s.oprogSkeleton} style={{ width: "92%" }} />
          <div className={s.oprogSkeleton} style={{ width: "80%" }} />
          <div className={s.oprogSkeleton} style={{ width: "88%" }} />
        </div>
      </div>
      <div className={s.btnRow} style={{ gap: 14, marginTop: 16 }}>
        <button className={`${s.obtn} ${s.sm} ${s.vWarm}`} onClick={start}>Reload page</button>
        <span className={s.stateBadge}>{on ? `loading ${Math.round(pct)}%` : "idle"}</span>
      </div>
    </>
  );
}

function Ring({ pct, size = 72 }: { pct: number; size?: number }) {
  const r = size / 2 - 6;
  const circ = 2 * Math.PI * r;
  const done = pct >= 100;
  return (
    <span className={s.oprogRingWrap} style={{ width: size, height: size }}>
      <svg width={size} height={size} className={s.oprogRing} style={{ transform: "rotate(-90deg)" }}>
        <circle className={s.oprogRingTrack} cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={5} />
        <circle className={s.oprogRingFill} cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={5}
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
          style={done ? { stroke: "#1fa35c" } : undefined} />
      </svg>
      <span className={s.oprogRingText}>{pct}%</span>
    </span>
  );
}

export default function ProgressDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Bar");
  const [pct, setPct] = useState(38);
  const timer = useRef<number | undefined>(undefined);
  const run = () => {
    setPct(0);
    window.clearInterval(timer.current);
    timer.current = window.setInterval(() => {
      setPct((p) => {
        if (p >= 100) { window.clearInterval(timer.current); return 100; }
        return Math.min(100, p + 7);
      });
    }, 260);
  };
  useEffect(() => () => window.clearInterval(timer.current), []);

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Progress examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Bar" && (
          <>
            <div className={s.subLabel}>Determinate movement toward a visible end</div>
            <div className={s.oprog}>
              <div className={s.oprogHead}><span>Uploading files</span><b>{pct}%</b></div>
              <div className={s.oprogBar}><div className={`${s.oprogFill} ${pct >= 100 ? s.oprogFillDone : ""}`} style={{ width: `${pct}%` }} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} /></div>
            </div>
            <div className={s.btnRow} style={{ gap: 12, marginTop: 18 }}>
              <button className={`${s.obtn} ${s.sm} ${s.vWarm}`} onClick={run}>Start</button>
              <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={() => setPct(38)}>Reset</button>
            </div>
            <div className={s.subLabel}>Sizes — S · M · L</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 300 }}>
              <div className={`${s.oprog} ${s.oprogSm}`}><div className={s.oprogBar}><div className={s.oprogFill} style={{ width: "55%" }} /></div></div>
              <div className={s.oprog}><div className={s.oprogBar}><div className={s.oprogFill} style={{ width: "55%" }} /></div></div>
              <div className={`${s.oprog} ${s.oprogLg}`}><div className={s.oprogBar}><div className={s.oprogFill} style={{ width: "55%" }} /></div></div>
            </div>
          </>
        )}
        {tab === "Circular" && (
          <>
            <div className={s.subLabel}>The same value as a ring, with a centred readout</div>
            <div className={s.btnRow} style={{ gap: 28, alignItems: "center" }}>
              <Ring pct={pct} />
              <Ring pct={100} size={56} />
              <button className={`${s.obtn} ${s.sm} ${s.vWarm}`} onClick={run}>Start</button>
            </div>
          </>
        )}
        {tab === "Indeterminate" && (
          <>
            <div className={s.subLabel}>When the end is unknown, the bar slides</div>
            <div className={`${s.oprog} ${s.oprogIndet}`}>
              <div className={s.oprogBar}><div className={s.oprogFill} /></div>
            </div>
            <span className={s.oupHint} style={{ marginTop: 12, display: "block" }}>Prefer a determinate bar whenever you can measure progress.</span>
          </>
        )}
        {tab === "Page load" && (
          <>
            <div className={s.subLabel}>A thin top bar for navigation and page loads — reload to run it</div>
            <PageLoad />
          </>
        )}
      </div>
    </div>
  );
}
