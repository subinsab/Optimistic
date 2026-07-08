"use client";

import { useState } from "react";
import s from "../docs.module.css";

/* Drawer configuration playground — the preview drawer sits open on the
   right of a bounded frame so its edge-anchoring reads clearly. */

const SIDES = ["Right", "Left"] as const;
const WIDTHS = ["Narrow", "Default", "Wide"] as const;
const FOOTERS = ["Actions", "None"] as const;
const WPX: Record<string, number> = { Narrow: 200, Default: 240, Wide: 280 };

function Chips({ label, options, value, onPick }: { label: string; options: readonly string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className={s.configGroup}>
      <span className={s.configLabel}>{label}</span>
      <div className={s.configChips} role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button key={o} type="button" role="radio" aria-checked={value === o}
            className={`${s.configChip} ${value === o ? s.configChipOn : ""}`} onClick={() => onPick(o)}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DrawerConfigurator() {
  const [side, setSide] = useState("Right");
  const [width, setWidth] = useState("Default");
  const [footer, setFooter] = useState("Actions");
  const [title, setTitle] = useState("Button · v3.2");

  const left = side === "Left";

  const props = [
    `side="${side.toLowerCase()}"`,
    `title="${title}"`,
    width !== "Default" ? `width="${width.toLowerCase()}"` : "",
    footer === "Actions" ? `actions={["Cancel", "Save"]}` : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Side" options={SIDES} value={side} onPick={setSide} />
        <Chips label="Width" options={WIDTHS} value={width} onPick={setWidth} />
        <Chips label="Footer" options={FOOTERS} value={footer} onPick={setFooter} />
        <div className={s.configGroup}>
          <span className={s.configLabel}>Title</span>
          <input className={s.configInput} value={title} maxLength={30} onChange={(e) => setTitle(e.target.value)} aria-label="Drawer title" />
        </div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview} style={{ padding: 0 }}>
          <div style={{ position: "relative", width: "100%", height: 280, overflow: "hidden", borderRadius: 2 }}>
            <div
              className={`${s.odrawer} ${left ? s.odrawerLeft : ""} ${s.odrawerOpen}`}
              style={{ position: "absolute", width: WPX[width], boxShadow: "none" }}
            >
              <div className={s.ovHead}>
                <div><div className={s.ovTitle} style={{ fontSize: "0.92rem" }}>{title || "Untitled"}</div><div className={s.ovSub}>Panel subtitle</div></div>
                <span className={s.ovClose} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                </span>
              </div>
              <div className={s.ovBody} style={{ flex: 1 }}>Detail content lives here, scrolling on its own.</div>
              {footer === "Actions" && (
                <div className={s.ovFoot} style={{ borderTop: "1px solid #1e1f24" }}>
                  <span className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Cancel</span>
                  <span className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Save</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={s.configCode} aria-label="Generated code">
          {"<"}<b>Drawer</b> {props} {"/>"}
        </div>
      </div>
    </div>
  );
}
