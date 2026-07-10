"use client";

import { useState } from "react";
import s from "../docs.module.css";

/* Popover configuration playground — the preview shows the panel itself,
   with header and footer toggled; placement flows to the generated code. */

const PLACES = ["Below", "Above", "Beside"] as const;
const HEADERS = ["With header", "Body only"] as const;
const FOOTERS = ["With actions", "None"] as const;

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

export default function PopoverConfigurator() {
  const [place, setPlace] = useState("Below");
  const [header, setHeader] = useState("With header");
  const [footer, setFooter] = useState("With actions");
  const [title, setTitle] = useState("Filter by status");

  const hasHeader = header === "With header";
  const hasFooter = footer === "With actions";

  const props = [
    `placement="${place === "Beside" ? "right" : place === "Above" ? "top" : "bottom"}"`,
    hasHeader ? `title="${title}"` : "",
    hasFooter ? `actions={["Reset", "Apply"]}` : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Placement" options={PLACES} value={place} onPick={setPlace} />
        <Chips label="Header" options={HEADERS} value={header} onPick={setHeader} />
        <Chips label="Footer" options={FOOTERS} value={footer} onPick={setFooter} />
        {hasHeader && (
          <div className={s.configGroup}>
            <span className={s.configLabel}>Title</span>
            <input className={s.configInput} value={title} maxLength={28} onChange={(e) => setTitle(e.target.value)} aria-label="Popover title" />
          </div>
        )}
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div className={`${s.opop} ${s.opopOpen}`} style={{ position: "relative", width: 240 }}>
            {hasHeader && (
              <div className={s.opopHead}><span className={s.opopTitle}>{title || "Untitled"}</span></div>
            )}
            <div className={s.opopBody} style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: hasHeader ? 9 : 13 }}>
              {["Live", "In review", "Archived"].map((r, i) => (
                <label key={r} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span className={`${s.ochk} ${s.chkS} ${i !== 2 ? s.ochkOn : ""}`} aria-hidden="true" />
                  <span style={{ fontSize: "0.8rem", color: "#cfd3da" }}>{r}</span>
                </label>
              ))}
            </div>
            {hasFooter && (
              <div className={s.opopFoot}>
                <span className={`${s.obtn} ${s.sm} ${s.vQuiet}`}>Reset</span>
                <span className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Apply</span>
              </div>
            )}
          </div>
        </div>
        <div className={s.configCode} aria-label="Generated code">
          {"<"}<b>Popover</b> {props} {"/>"}
        </div>
      </div>
    </div>
  );
}
