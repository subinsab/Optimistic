"use client";

import { useRef, useState } from "react";
import s from "../docs.module.css";

/* live Toggle specimen — sizes, states, and the optimistic-update behavior */

const TABS = ["Sizes", "With label", "Optimistic"] as const;
const net = (ms = 650, fail = 0) =>
  new Promise<void>((res, rej) => setTimeout(() => (Math.random() < fail ? rej() : res()), ms));

function Switch({
  on, onClick, size = "otM", disabled,
}: { on: boolean; onClick?: () => void; size?: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      className={`${s.otoggle} ${s[size as keyof typeof s]} ${on ? s.otOn : ""}`}
      onClick={onClick}
    />
  );
}

export default function ToggleDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Sizes");
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  // optimistic
  const [on, setOn] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const busy = useRef(false);
  const push = (l: string) => setLog((x) => [l, ...x].slice(0, 4));
  const flip = async () => {
    if (busy.current) return;
    busy.current = true;
    const next = !on;
    setOn(next); // optimistic
    push(`PUT /settings · optimistic (${next ? "on" : "off"})`);
    try {
      await net(650, 0.3);
      push("● reconciled 200");
    } catch {
      setOn(!next);
      push("✕ 503 · rolled back");
    } finally {
      busy.current = false;
    }
  };

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Toggle examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>

      <div className={s.demoStage} key={tab}>
        {tab === "Sizes" && (
          <>
            <div className={s.subLabel}>Sizes — click to flip</div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>L · 28px</span>
              <Switch on={a} onClick={() => setA((v) => !v)} size="otL" />
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>M · 24px</span>
              <Switch on={a} onClick={() => setA((v) => !v)} size="otM" />
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>S · 19px</span>
              <Switch on={a} onClick={() => setA((v) => !v)} size="otS" />
            </div>
            <div className={s.subLabel}>States</div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Off</span>
              <Switch on={false} size="otM" />
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>On</span>
              <Switch on={true} size="otM" />
              <span className={s.stateBadge}>warm #FF7A00 when on</span>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Disabled</span>
              <Switch on={false} size="otM" disabled />
              <Switch on={true} size="otM" disabled />
            </div>
          </>
        )}

        {tab === "With label" && (
          <>
            <div className={s.subLabel}>Toggle with text</div>
            <div className={s.btnRow}>
              <span className={s.otRow}>
                <Switch on={b} onClick={() => setB((v) => !v)} size="otM" />
                <span className={s.otText}>
                  <span className={s.otTitle}>Email notifications</span>
                  <span className={s.otDesc}>Send a receipt after every transaction.</span>
                </span>
              </span>
            </div>
            <div className={s.btnRow}>
              <span className={s.otRow}>
                <Switch on={a} onClick={() => setA((v) => !v)} size="otM" />
                <span className={s.otTitle}>Two-factor authentication</span>
                <span className={`${s.otStatus} ${a ? s.otStatusOn : s.otStatusOff}`}>{a ? "on" : "off"}</span>
              </span>
            </div>
            <p className={s.ddText} style={{ padding: 0, border: 0, marginTop: 8 }}>
              The whole row is the target: label and control share one click.
            </p>
          </>
        )}

        {tab === "Optimistic" && (
          <>
            <div className={s.subLabel}>The optimistic update — flip it</div>
            <div className={s.btnRow}>
              <span className={s.otRow}>
                <Switch on={on} onClick={flip} size="otL" />
                <span className={s.otText}>
                  <span className={s.otTitle}>Sync across devices</span>
                  <span className={s.otDesc}>State flips instantly; the server confirms a beat later.</span>
                </span>
              </span>
            </div>
            <div className={s.behLog} style={{ marginTop: 12, maxHeight: 84 }}>
              {log.length ? log.map((l, i) => <span key={i}>{l}</span>) : <span>press the toggle to fire a request</span>}
            </div>
            <p className={s.ddText} style={{ padding: 0, border: 0, marginTop: 8 }}>
              One in three requests fails on purpose. Watch it flip back and log the truth.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
