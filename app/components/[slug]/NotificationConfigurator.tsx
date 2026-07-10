"use client";

import { useState } from "react";
import s from "../docs.module.css";
import { Notification, type Severity } from "./NotificationDemo";

const SEVERITY = ["info", "success", "warning", "error"];
const STYLE = ["Filled", "Bar"];
const TOGGLE = ["On", "Off"];

const MSG: Record<string, { title: string; msg: string }> = {
  info: { title: "New version available", msg: "Reload to get the latest components." },
  success: { title: "Changes published", msg: "Your update is live and reconciled." },
  warning: { title: "Storage almost full", msg: "You're at 92% of your plan." },
  error: { title: "Publish failed", msg: "Two tokens couldn't be resolved." },
};

function Chips({ label, options, value, onPick }: { label: string; options: readonly string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className={s.configGroup}><span className={s.configLabel}>{label}</span>
      <div className={s.configChips} role="radiogroup" aria-label={label}>
        {options.map((o) => <button key={o} type="button" role="radio" aria-checked={value === o}
          className={`${s.configChip} ${value === o ? s.configChipOn : ""}`} onClick={() => onPick(o)}>{o}</button>)}
      </div>
    </div>
  );
}

export default function NotificationConfigurator() {
  const [severity, setSeverity] = useState("warning");
  const [style, setStyle] = useState("Filled");
  const [title, setTitle] = useState("On");
  const [actions, setActions] = useState("On");
  const [dismiss, setDismiss] = useState("On");
  const bar = style === "Bar";
  const hasTitle = title === "On";
  const hasActions = actions === "On";
  const hasClose = dismiss === "On";
  const sample = MSG[severity];
  const props = [
    `severity="${severity}"`,
    bar ? "bar" : "",
    hasTitle ? `title="${sample.title}"` : "",
    hasActions ? "actions={…}" : "",
    hasClose ? "onDismiss={fn}" : "",
  ].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Severity" options={SEVERITY} value={severity} onPick={setSeverity} />
        <Chips label="Style" options={STYLE} value={style} onPick={setStyle} />
        <Chips label="Title" options={TOGGLE} value={title} onPick={setTitle} />
        <Chips label="Actions" options={TOGGLE} value={actions} onPick={setActions} />
        <Chips label="Dismissible" options={TOGGLE} value={dismiss} onPick={setDismiss} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div style={{ width: "100%", maxWidth: 340 }}>
            <Notification severity={severity as Severity} bar={bar} title={hasTitle ? sample.title : undefined}
              onClose={hasClose ? () => {} : undefined}
              actions={hasActions ? <><button type="button" className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Fix</button><button type="button" className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Dismiss</button></> : undefined}>
              {sample.msg}
            </Notification>
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>Notification</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
