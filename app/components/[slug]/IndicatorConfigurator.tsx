"use client";

import { useState } from "react";
import s from "../docs.module.css";

const STATUS = ["Online", "Idle", "Busy", "Offline"] as const;
const PULSE = ["Static", "Pulse"] as const;
const LABEL = ["With", "Dot only"] as const;
const CLS: Record<string, string> = { Online: "oindOnline", Idle: "oindIdle", Busy: "oindBusy", Offline: "oindOffline" };

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

export default function IndicatorConfigurator() {
  const [status, setStatus] = useState("Online");
  const [pulse, setPulse] = useState("Static");
  const [label, setLabel] = useState("With");
  const canPulse = status === "Online" && pulse === "Pulse";
  const dotCls = canPulse ? `${s.oind} ${s.oindLive}` : `${s.oind} ${s[CLS[status] as keyof typeof s]}`;
  const props = [`status="${status.toLowerCase()}"`, canPulse ? "pulse" : "", label === "With" ? `label="${status}"` : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Status" options={STATUS} value={status} onPick={setStatus} />
        <Chips label="Motion" options={PULSE} value={pulse} onPick={setPulse} />
        <Chips label="Label" options={LABEL} value={label} onPick={setLabel} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          {label === "With"
            ? <span className={s.oindRow} style={{ fontSize: "0.95rem" }}><span className={dotCls} />{status}</span>
            : <span className={dotCls} style={{ width: 12, height: 12 }} />}
        </div>
        <div className={s.configCode}>{"<"}<b>Indicator</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
