"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

/* live behavior demos for Input — debounced async check + controlled count */

const TAKEN = ["ada", "admin", "root", "test"];

function DebouncedCheck() {
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "ok" | "taken">("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (name.trim().length < 3) { setState("idle"); return; }
    setState("checking");
    timer.current = window.setTimeout(() => {
      setState(TAKEN.includes(name.trim().toLowerCase()) ? "taken" : "ok");
    }, 500);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [name]);

  const cls = state === "taken" ? s.inErr : state === "ok" ? s.inOk : "";
  return (
    <div className={s.behCard}>
      <div className={s.behHead}><span>Debounced Async</span><span className={s.behVerb}>GET /username</span></div>
      <div className={s.behStage} style={{ display: "block" }}>
        <div className={s.inField} style={{ maxWidth: "none" }}>
          <span className={s.inLabel}>Username</span>
          <input
            className={`${s.oinput} ${s.inM} ${cls}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="try 'ada' or your name"
            aria-invalid={state === "taken"}
          />
          <span className={s.inMsg}>
            {state === "idle" && <span className={s.inHint}>Type 3+ characters.</span>}
            {state === "checking" && <span className={s.inHint}>Checking…</span>}
            {state === "ok" && <span className={s.inMsgOk}>Available.</span>}
            {state === "taken" && <span className={s.inMsgErr}>Already taken.</span>}
          </span>
        </div>
      </div>
      <p className={s.behCaption}>Keystrokes are debounced 500ms; only the last one hits the network. A stale reply never overwrites a fresher one.</p>
    </div>
  );
}

function CharCount() {
  const [val, setVal] = useState("Ships fast.");
  const max = 40;
  const over = val.length > max;
  return (
    <div className={s.behCard}>
      <div className={s.behHead}><span>Controlled + Count</span><span className={s.behVerb}>value / onChange</span></div>
      <div className={s.behStage} style={{ display: "block" }}>
        <div className={s.inField} style={{ maxWidth: "none" }}>
          <span className={s.inLabelRow}>
            <span className={s.inLabel}>Headline</span>
            <span className={s.inCount} style={{ color: over ? "#eb4a4f" : undefined }}>{val.length}/{max}</span>
          </span>
          <input
            className={`${s.oinput} ${s.inM} ${over ? s.inErr : ""}`}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            aria-invalid={over}
          />
          {over && <span className={`${s.inMsg} ${s.inMsgErr}`}>{val.length - max} over the limit.</span>}
        </div>
      </div>
      <p className={s.behCaption}>Fully controlled: the count and the limit warning react to every keystroke, never lagging the value.</p>
    </div>
  );
}

export default function InputBehavior() {
  return (
    <div className={s.behGrid}>
      <DebouncedCheck />
      <CharCount />
    </div>
  );
}
