"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Single", "Multiple", "With icon"] as const;

const Radio = ({ on }: { on: boolean }) => (
  <span className={`${s.oradio} ${s.rdM} ${on ? s.oradioOn : ""}`} aria-hidden="true" />
);
const Check = ({ on }: { on: boolean }) => (
  <span className={`${s.ochk} ${s.chkM} ${on ? s.ochkOn : ""}`} aria-hidden="true" />
);
const Bolt = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
);

const PLANS = [
  { id: "starter", title: "Starter", desc: "Free forever, for solo work." },
  { id: "pro", title: "Pro", desc: "For growing teams and shared systems." },
  { id: "scale", title: "Scale", desc: "SLAs, SSO and priority support." },
];

export default function ChoiceboxDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Single");
  const [plan, setPlan] = useState("pro");
  const [multi, setMulti] = useState<string[]>(["tokens"]);
  const toggle = (id: string) => setMulti((m) => (m.includes(id) ? m.filter((x) => x !== id) : [...m, id]));

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Choicebox examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Single" && (
          <>
            <div className={s.subLabel}>One choice — the whole card is the target</div>
            <div className={s.ochoiceGroup} role="radiogroup" aria-label="Plan">
              {PLANS.map((p) => (
                <button key={p.id} type="button" role="radio" aria-checked={plan === p.id}
                  className={`${s.ochoice} ${plan === p.id ? s.ochoiceOn : ""}`} onClick={() => setPlan(p.id)}>
                  <span className={s.ochoiceMark}><Radio on={plan === p.id} /></span>
                  <span className={s.ochoiceBody}><span className={s.ochoiceTitle}>{p.title}</span><span className={s.ochoiceDesc}>{p.desc}</span></span>
                </button>
              ))}
            </div>
          </>
        )}
        {tab === "Multiple" && (
          <>
            <div className={s.subLabel}>Several at once — checkboxes, not radios</div>
            <div className={s.ochoiceGroup} role="group" aria-label="Topics">
              {[["tokens", "Design tokens", "Colour, type and spacing scales."], ["a11y", "Accessibility", "Contrast, focus and semantics."], ["motion", "Motion", "Transitions and reduced-motion."]].map(([id, title, desc]) => (
                <button key={id} type="button" role="checkbox" aria-checked={multi.includes(id)}
                  className={`${s.ochoice} ${multi.includes(id) ? s.ochoiceOn : ""}`} onClick={() => toggle(id)}>
                  <span className={s.ochoiceMark}><Check on={multi.includes(id)} /></span>
                  <span className={s.ochoiceBody}><span className={s.ochoiceTitle}>{title}</span><span className={s.ochoiceDesc}>{desc}</span></span>
                </button>
              ))}
            </div>
          </>
        )}
        {tab === "With icon" && (
          <>
            <div className={s.subLabel}>A leading glyph anchors each option</div>
            <div className={s.ochoiceGrid}>
              {[["react", "React", "Hooks + JSX"], ["angular", "Angular", "Signals + DI"]].map(([id, title, desc]) => (
                <button key={id} type="button" role="radio" aria-checked={plan === id}
                  className={`${s.ochoice} ${plan === id ? s.ochoiceOn : ""}`} onClick={() => setPlan(id)}>
                  <span className={s.ochoiceIcon}><Bolt /></span>
                  <span className={s.ochoiceBody}><span className={s.ochoiceTitle}>{title}</span><span className={s.ochoiceDesc}>{desc}</span></span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
