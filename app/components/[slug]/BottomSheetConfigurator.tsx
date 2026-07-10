"use client";

import { useState } from "react";
import s from "../docs.module.css";

/* Bottom Sheet configuration playground — the sheet sits open at the
   bottom of a bounded phone-ish frame. */

const HEIGHTS = ["Compact", "Default"] as const;
const CONTENTS = ["Action list", "Detail + footer"] as const;
const HANDLES = ["With handle", "None"] as const;

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

export default function BottomSheetConfigurator() {
  const [height, setHeight] = useState("Default");
  const [content, setContent] = useState("Detail + footer");
  const [handle, setHandle] = useState("With handle");
  const [title, setTitle] = useState("Component details");

  const list = content === "Action list";
  const compact = height === "Compact";
  const hasHandle = handle === "With handle";

  const props = [
    compact ? `size="compact"` : "",
    hasHandle ? "" : "handle={false}",
    !list ? `title="${title}"` : "",
    list ? `actions={["Share", "Duplicate", "Delete"]}` : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Height" options={HEIGHTS} value={height} onPick={setHeight} />
        <Chips label="Content" options={CONTENTS} value={content} onPick={setContent} />
        <Chips label="Handle" options={HANDLES} value={handle} onPick={setHandle} />
        {!list && (
          <div className={s.configGroup}>
            <span className={s.configLabel}>Title</span>
            <input className={s.configInput} value={title} maxLength={28} onChange={(e) => setTitle(e.target.value)} aria-label="Sheet title" />
          </div>
        )}
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview} style={{ padding: 0 }}>
          <div style={{ position: "relative", width: "100%", height: 300, overflow: "hidden", borderRadius: 2 }}>
            <div className={`${s.osheet} ${s.osheetOpen}`} style={{ boxShadow: "none", maxHeight: compact ? "48%" : "78%" }}>
              {hasHandle && <div className={s.osheetGrab} aria-hidden="true" />}
              {list ? (
                <div className={s.ovBody} style={{ paddingTop: hasHandle ? 6 : 14, display: "flex", flexDirection: "column", gap: 2 }}>
                  {["Share", "Duplicate"].map((r) => (
                    <span key={r} className={`${s.obtn} ${s.m} ${s.vQuiet}`} style={{ justifyContent: "flex-start", width: "100%" }}>{r}</span>
                  ))}
                  <span className={`${s.obtn} ${s.m} ${s.vQuiet}`} style={{ justifyContent: "flex-start", width: "100%", color: "#eb4a4f" }}>Delete</span>
                </div>
              ) : (
                <>
                  <div className={s.ovHead} style={{ paddingTop: hasHandle ? 8 : 18 }}>
                    <div><div className={s.ovTitle} style={{ fontSize: "0.92rem" }}>{title || "Untitled"}</div><div className={s.ovSub}>Subtitle</div></div>
                    <span className={s.ovClose} aria-hidden="true"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></span>
                  </div>
                  <div className={s.ovBody}>Content rises from the bottom, within thumb reach.</div>
                  <div className={s.ovFoot} style={{ borderTop: "1px solid #1e1f24" }}>
                    <span className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Cancel</span>
                    <span className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Confirm</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={s.configCode} aria-label="Generated code">
          {"<"}<b>BottomSheet</b> {props} {"/>"}
        </div>
      </div>
    </div>
  );
}
