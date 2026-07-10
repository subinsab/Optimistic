"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Sizes", "States", "Group"] as const;

function Box({ state = "off", size = "chkM", disabled, onClick, err }: {
  state?: "off" | "on" | "ind"; size?: string; disabled?: boolean; onClick?: () => void; err?: boolean;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={state === "ind" ? "mixed" : state === "on"}
      disabled={disabled}
      onClick={onClick}
      className={`${s.ochk} ${s[size as keyof typeof s]} ${state === "on" ? s.ochkOn : state === "ind" ? s.ochkInd : ""} ${err ? s.ochkErr : ""}`}
    />
  );
}

export default function CheckboxDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Sizes");
  const [items, setItems] = useState([true, false, true]);
  const all = items.every(Boolean);
  const some = items.some(Boolean) && !all;
  const [x, setX] = useState<"off" | "on">("on");

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Checkbox examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Sizes" && (
          <>
            <div className={s.subLabel}>Sizes — click to check</div>
            <div className={s.btnRow}><span className={s.rowLabel}>L · 22px</span><Box state={x} size="chkL" onClick={() => setX(v => v === "on" ? "off" : "on")} /></div>
            <div className={s.btnRow}><span className={s.rowLabel}>M · 18px</span><Box state={x} size="chkM" onClick={() => setX(v => v === "on" ? "off" : "on")} /></div>
            <div className={s.btnRow}><span className={s.rowLabel}>S · 15px</span><Box state={x} size="chkS" onClick={() => setX(v => v === "on" ? "off" : "on")} /></div>
          </>
        )}
        {tab === "States" && (
          <>
            <div className={s.subLabel}>States</div>
            <div className={s.btnRow}><span className={s.rowLabel}>Off</span><Box state="off" /></div>
            <div className={s.btnRow}><span className={s.rowLabel}>On</span><Box state="on" /><span className={s.stateBadge}>warm #FF7A00</span></div>
            <div className={s.btnRow}><span className={s.rowLabel}>Indeterminate</span><Box state="ind" /><span className={s.stateBadge}>parent of a mixed group</span></div>
            <div className={s.btnRow}><span className={s.rowLabel}>Error</span><Box state="off" err /><span className={s.stateBadge}>required but unchecked</span></div>
            <div className={s.btnRow}><span className={s.rowLabel}>Disabled</span><Box state="off" disabled /><Box state="on" disabled /></div>
          </>
        )}
        {tab === "Group" && (
          <>
            <div className={s.subLabel}>Parent / children — live indeterminate</div>
            <label className={s.selRow} style={{ marginBottom: 10 }}>
              <Box state={all ? "on" : some ? "ind" : "off"} onClick={() => setItems(all ? [false, false, false] : [true, true, true])} />
              <span className={s.selTitle}>Select all clients</span>
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 28 }}>
              {["Acme Corp", "Globex", "Initech"].map((n, i) => (
                <label key={n} className={s.selRow}>
                  <Box state={items[i] ? "on" : "off"} onClick={() => setItems(v => v.map((b, j) => j === i ? !b : b))} />
                  <span className={s.selTitle}>{n}</span>
                </label>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
