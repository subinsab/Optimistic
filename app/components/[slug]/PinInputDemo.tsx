"use client";

import { useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["Basic", "Sizes", "Paste", "States"] as const;

function Pin({ length = 4, masked = false, tone = "", size = "", onComplete }:
  { length?: number; masked?: boolean; tone?: string; size?: string; onComplete?: (code: string) => void }) {
  const [vals, setVals] = useState<string[]>(Array(length).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const set = (i: number, v: string) => {
    const next = [...vals];
    next[i] = v.slice(-1);
    setVals(next);
    if (v && i < length - 1) refs.current[i + 1]?.focus();
    if (next.every((x) => x)) onComplete?.(next.join(""));
  };
  const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !vals[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < length - 1) refs.current[i + 1]?.focus();
  };
  const onPaste = (e: React.ClipboardEvent) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length).split("");
    if (!digits.length) return;
    e.preventDefault();
    const next = Array(length).fill("").map((_, i) => digits[i] || "");
    setVals(next);
    refs.current[Math.min(digits.length, length - 1)]?.focus();
    if (next.every((x) => x)) onComplete?.(next.join(""));
  };
  return (
    <div className={`${s.opin} ${tone} ${size}`} onPaste={onPaste}>
      {vals.map((v, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className={`${s.opinCell} ${v ? s.opinCellFilled : ""}`}
          value={v ? (masked ? "•" : v) : ""}
          inputMode="numeric"
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => set(i, e.target.value.replace(/\D/g, ""))}
          onKeyDown={(e) => onKey(i, e)}
        />
      ))}
    </div>
  );
}

export default function PinInputDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Basic");
  const [done, setDone] = useState("");

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Pin input examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Basic" && (
          <>
            <div className={s.subLabel}>Type — focus jumps forward; Backspace jumps back</div>
            <Pin length={4} onComplete={setDone} />
            {done && <span className={s.stateBadge} style={{ marginTop: 14, display: "inline-block" }}>entered: {done}</span>}
          </>
        )}
        {tab === "Sizes" && (
          <>
            <div className={s.subLabel}>Cell size scales — S · M · L</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div><span className={s.inLabel} style={{ display: "block", marginBottom: 8 }}>Small</span><Pin length={4} size={s.opinSm} /></div>
              <div><span className={s.inLabel} style={{ display: "block", marginBottom: 8 }}>Medium</span><Pin length={4} /></div>
              <div><span className={s.inLabel} style={{ display: "block", marginBottom: 8 }}>Large</span><Pin length={4} size={s.opinLg} /></div>
            </div>
          </>
        )}
        {tab === "Paste" && (
          <>
            <div className={s.subLabel}>Paste a 6-digit code — it spreads across the cells</div>
            <Pin length={6} onComplete={setDone} />
            <span className={s.oupHint} style={{ marginTop: 12, display: "block" }}>Try copying “481920” and pasting into the first cell.</span>
          </>
        )}
        {tab === "States" && (
          <>
            <div className={s.subLabel}>Error and success mirror the Input states</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div><span className={s.inLabel} style={{ display: "block", marginBottom: 8 }}>Error</span><Pin length={4} tone={s.opinErr} /></div>
              <div><span className={s.inLabel} style={{ display: "block", marginBottom: 8 }}>Success</span><Pin length={4} tone={s.opinOk} /></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
