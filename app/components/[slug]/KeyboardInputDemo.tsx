"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Keys", "Combos", "Sizes"] as const;
const Kbd = ({ children, size = "" }: { children: React.ReactNode; size?: string }) => <kbd className={`${s.okbd} ${size}`}>{children}</kbd>;
const Combo = ({ keys, size = "" }: { keys: string[]; size?: string }) => (
  <span className={s.okbdCombo}>{keys.map((k, i) => (<span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>{i > 0 && <span className={s.okbdPlus}>+</span>}<Kbd size={size}>{k}</Kbd></span>))}</span>
);

export default function KeyboardInputDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Keys");
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Keyboard input examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Keys" && (
          <>
            <div className={s.subLabel}>Single keys, rendered as keys</div>
            <div className={s.btnRow} style={{ gap: 10 }}>
              {["⌘", "⇧", "⌥", "⌃", "↵", "⎋", "⌫", "⇥", "A", "?"].map((k) => <Kbd key={k}>{k}</Kbd>)}
            </div>
            <div className={s.subLabel}>Arrow keys</div>
            <div className={s.btnRow} style={{ gap: 8 }}>{["←", "↑", "↓", "→"].map((k) => <Kbd key={k}>{k}</Kbd>)}</div>
          </>
        )}
        {tab === "Combos" && (
          <>
            <div className={s.subLabel}>Chords joined with a muted plus</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 12, color: "#9aa0a8", fontSize: "0.85rem" }}><Combo keys={["⌘", "K"]} /> Command menu</span>
              <span style={{ display: "flex", alignItems: "center", gap: 12, color: "#9aa0a8", fontSize: "0.85rem" }}><Combo keys={["⌘", "⇧", "P"]} /> Command palette</span>
              <span style={{ display: "flex", alignItems: "center", gap: 12, color: "#9aa0a8", fontSize: "0.85rem" }}><Combo keys={["G", "P"]} /> Go to Projects</span>
            </div>
          </>
        )}
        {tab === "Sizes" && (
          <>
            <div className={s.subLabel}>Small · Medium · Large</div>
            <div className={s.btnRow} style={{ gap: 20, alignItems: "center" }}>
              <Combo keys={["⌘", "S"]} size={s.okbdSm} />
              <Combo keys={["⌘", "S"]} />
              <Combo keys={["⌘", "S"]} size={s.okbdLg} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
