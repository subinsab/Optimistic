"use client";

import { useState } from "react";
import { useCfg, claudeUrl } from "./configStore";
import s from "../docs.module.css";

/* "Start building with Claude" — asks which build you want:
   the instance you configured below, or the full component fresh */

export default function ClaudeBuild() {
  const [open, setOpen] = useState(false);
  const cfg = useCfg();

  return (
    <div className={s.claudeWrap}>
      <button
        type="button"
        className={s.resChip}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <i>✳</i> Start building with Claude {open ? "−" : "+"}
      </button>
      {open && (
        <div className={s.claudePanel}>
          <a className={s.claudeOpt} href={claudeUrl(cfg)} target="_blank" rel="noreferrer">
            <span className={s.claudeOptTitle}>Build my configuration ↗</span>
            <span className={s.claudeOptSub}>
              {cfg.variant} · {cfg.size} · &quot;{cfg.label}&quot; · {cfg.type} · {cfg.state} → {cfg.target}
            </span>
            <span className={s.claudeOptNote}>uses your choices from the Configuration section below</span>
          </a>
          <a className={s.claudeOpt} href={claudeUrl()} target="_blank" rel="noreferrer">
            <span className={s.claudeOptTitle}>Start fresh — the full component ↗</span>
            <span className={s.claudeOptSub}>every variant, size, state and the whole behavior contract</span>
          </a>
        </div>
      )}
    </div>
  );
}
