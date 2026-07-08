"use client";

import { useState } from "react";
import s from "../docs.module.css";

/* live Input specimen — tabs mirror the Button page style */

const TABS = ["Sizes", "States", "Icon & Affix", "Validation"] as const;

const Search = ({ w = 15 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const Check = ({ w = 13 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Warn = ({ w = 13 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 1.5 15 14H1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M8 6.5v3.5M8 12v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export default function InputDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Sizes");
  const [pwVisible, setPwVisible] = useState(false);
  const [email, setEmail] = useState("ada@team");
  const emailOk = /.+@.+\..+/.test(email);

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Input examples">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={s.demoStage} key={tab}>
        {tab === "Sizes" && (
          <>
            <div className={s.subLabel}>Sizes</div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>L · 44px</span>
              <input className={`${s.oinput} ${s.inL}`} placeholder="you@company.com" defaultValue="" aria-label="Large" />
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>M · 36px</span>
              <input className={`${s.oinput} ${s.inM}`} placeholder="you@company.com" aria-label="Medium" />
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>S · 28px</span>
              <input className={`${s.oinput} ${s.inS}`} placeholder="you@company.com" aria-label="Small" />
            </div>
          </>
        )}

        {tab === "States" && (
          <>
            <div className={s.subLabel}>States</div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Default</span>
              <input className={`${s.oinput} ${s.inM}`} placeholder="Placeholder" aria-label="Default" />
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Filled</span>
              <input className={`${s.oinput} ${s.inM}`} defaultValue="Ada Lovelace" aria-label="Filled" />
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Focus</span>
              <input className={`${s.oinput} ${s.inM}`} defaultValue="Click me" autoFocus={false} aria-label="Focus" />
              <span className={s.stateBadge}>warm ring on focus</span>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Disabled</span>
              <input className={`${s.oinput} ${s.inM}`} defaultValue="Locked" disabled aria-label="Disabled" />
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Read-only</span>
              <input className={`${s.oinput} ${s.inM}`} defaultValue="ORD-4821" readOnly aria-label="Read only" />
            </div>
          </>
        )}

        {tab === "Icon & Affix" && (
          <>
            <div className={s.subLabel}>Leading icon</div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Search</span>
              <span className={s.inWrap}>
                <span className={s.inIcon}><Search /></span>
                <input className={`${s.oinput} ${s.inM} ${s.inHasIcon}`} placeholder="Search clients…" aria-label="Search" />
              </span>
            </div>
            <div className={s.subLabel}>Trailing affix</div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Unit</span>
              <span className={s.inWrap}>
                <input className={`${s.oinput} ${s.inM} ${s.inHasAffix}`} defaultValue="2,500" aria-label="Amount" />
                <span className={s.inAffix}>USD</span>
              </span>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Password</span>
              <span className={s.inWrap}>
                <input
                  className={`${s.oinput} ${s.inM} ${s.inHasAffix}`}
                  type={pwVisible ? "text" : "password"}
                  defaultValue="optimistic"
                  aria-label="Password"
                />
                <button className={s.inAffix + " " + s.inAffixBtn} type="button" onClick={() => setPwVisible((v) => !v)}>
                  {pwVisible ? "hide" : "show"}
                </button>
              </span>
            </div>
          </>
        )}

        {tab === "Validation" && (
          <>
            <div className={s.subLabel}>Live validation — type an email</div>
            <div className={s.inField}>
              <span className={s.inLabel}>Work email</span>
              <span className={s.inWrap}>
                <input
                  className={`${s.oinput} ${s.inM} ${email.length === 0 ? "" : emailOk ? s.inOk : s.inErr}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  aria-invalid={email.length > 0 && !emailOk}
                />
              </span>
              {email.length > 0 && (
                emailOk ? (
                  <span className={`${s.inMsg} ${s.inMsgOk}`}><Check /> Looks good.</span>
                ) : (
                  <span className={`${s.inMsg} ${s.inMsgErr}`}><Warn /> Enter a complete email address.</span>
                )
              )}
            </div>
            <div className={s.subLabel}>Static examples</div>
            <div className={s.inField}>
              <span className={s.inLabel}>Success</span>
              <input className={`${s.oinput} ${s.inM} ${s.inOk}`} defaultValue="ada@team.com" aria-label="Valid" />
              <span className={`${s.inMsg} ${s.inMsgOk}`}><Check /> Verified.</span>
            </div>
            <div className={s.inField}>
              <span className={s.inLabel}>Error</span>
              <input className={`${s.oinput} ${s.inM} ${s.inErr}`} defaultValue="not-an-email" aria-label="Invalid" aria-invalid="true" />
              <span className={`${s.inMsg} ${s.inMsgErr}`}><Warn /> That address is missing an @.</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
