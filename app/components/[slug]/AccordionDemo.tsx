"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Joined", "Separate", "Multi-open"] as const;
const Chevron = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>);

const ITEMS = [
  { q: "What is an optimistic update?", a: "Render the success state the moment an action is taken, then reconcile with the server — rolling back only if it fails. It makes an interface feel instant." },
  { q: "How is spacing scaled?", a: "Everything sits on a 4px base grid. Components snap to multiples of 4 so vertical rhythm stays even across the whole system." },
  { q: "Where does the one warm pixel go?", a: "Exactly one warm accent per view — the primary action. Everything else steps back so that single light points forward." },
];

function Item({ q, a, open, onToggle, index }: { q: string; a: string; open: boolean; onToggle: () => void; index: number }) {
  return (
    <div className={`${s.oaccItem} ${open ? s.oaccOpen : ""}`}>
      <button type="button" className={s.oaccHead} aria-expanded={open} onClick={onToggle}>
        <span className={s.oaccNum}>{String(index + 1).padStart(2, "0")}</span>
        {q}
        <span className={s.oaccChevron}><Chevron /></span>
      </button>
      <div className={s.oaccBody}><div><div className={s.oaccBodyInner}>{a}</div></div></div>
    </div>
  );
}

export default function AccordionDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Joined");
  const [single, setSingle] = useState<number | null>(0);
  const [multi, setMulti] = useState<number[]>([0]);
  const toggleMulti = (i: number) => setMulti((m) => (m.includes(i) ? m.filter((x) => x !== i) : [...m, i]));

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Accordion examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Joined" && (
          <>
            <div className={s.subLabel}>Connected rows in one card — one open at a time</div>
            <div className={`${s.oacc} ${s.oaccJoined}`}>
              {ITEMS.map((it, i) => (
                <Item key={it.q} q={it.q} a={it.a} index={i} open={single === i} onToggle={() => setSingle(single === i ? null : i)} />
              ))}
            </div>
          </>
        )}
        {tab === "Separate" && (
          <>
            <div className={s.subLabel}>Each section is its own card, with gaps</div>
            <div className={`${s.oacc} ${s.oaccSeparate}`}>
              {ITEMS.map((it, i) => (
                <Item key={it.q} q={it.q} a={it.a} index={i} open={single === i} onToggle={() => setSingle(single === i ? null : i)} />
              ))}
            </div>
          </>
        )}
        {tab === "Multi-open" && (
          <>
            <div className={s.subLabel}>Several can stay open at once</div>
            <div className={`${s.oacc} ${s.oaccJoined}`}>
              {ITEMS.map((it, i) => (
                <Item key={it.q} q={it.q} a={it.a} index={i} open={multi.includes(i)} onToggle={() => toggleMulti(i)} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
