"use client";

import { useLayoutEffect, useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["Auto-grow", "Counter", "States"] as const;
const MAX = 140;

function AutoGrow() {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [v, setV] = useState("This textarea grows as you type, then stops trapping the scroll.");
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 220) + "px";
  }, [v]);
  return (
    <textarea ref={ref} className={`${s.otextarea} ${s.otaNoResize}`} value={v}
      onChange={(e) => setV(e.target.value)} placeholder="Start writing…" aria-label="Auto-growing note" />
  );
}

export default function TextareaDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Auto-grow");
  const [text, setText] = useState("Ship early, reconcile honestly.");
  const over = text.length > MAX;

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Textarea examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Auto-grow" && (
          <>
            <div className={s.subLabel}>Height follows the content, capped so it never runs away</div>
            <div className={s.inField}><AutoGrow /></div>
          </>
        )}
        {tab === "Counter" && (
          <>
            <div className={s.subLabel}>A live count; the field turns red past the limit</div>
            <div className={s.inField}>
              <textarea className={`${s.otextarea} ${over ? s.otaErr : ""}`} value={text}
                onChange={(e) => setText(e.target.value)} aria-label="Bio" placeholder="Say something…" />
              <div className={s.inLabelRow}>
                {over && <span className={`${s.inMsg} ${s.inMsgErr}`}>Over the limit</span>}
                <span className={s.inCount} style={over ? { color: "#eb4a4f" } : undefined}>{text.length} / {MAX}</span>
              </div>
            </div>
          </>
        )}
        {tab === "States" && (
          <>
            <div className={s.subLabel}>Default, error, success and disabled</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 560 }}>
              <div className={s.inField}><span className={s.inLabel}>Default</span><textarea className={s.otextarea} defaultValue="" placeholder="Notes…" aria-label="Default" /></div>
              <div className={s.inField}><span className={s.inLabel}>Error</span><textarea className={`${s.otextarea} ${s.otaErr}`} defaultValue="Too short" aria-label="Error" /><span className={`${s.inMsg} ${s.inMsgErr}`}>Please add more detail.</span></div>
              <div className={s.inField}><span className={s.inLabel}>Success</span><textarea className={`${s.otextarea} ${s.otaOk}`} defaultValue="Looks thorough and clear." aria-label="Success" /><span className={`${s.inMsg} ${s.inMsgOk}`}>Saved.</span></div>
              <div className={s.inField}><span className={s.inLabel}>Disabled</span><textarea className={s.otextarea} defaultValue="Read only" disabled aria-label="Disabled" /></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
