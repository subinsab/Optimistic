"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Basic", "Rich rows", "Right text", "Status", "Selectable"] as const;
const Chevron = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Check = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8.5l3.5 3.5L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);

const PEOPLE = [
  { id: "ada", name: "Ada Lovelace", role: "Design Lead", init: "AL", status: "PAID" },
  { id: "alan", name: "Alan Turing", role: "Engineering", init: "AT", status: "DUE" },
  { id: "grace", name: "Grace Hopper", role: "Systems", init: "GH", status: "PAID" },
];

export default function ListDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Basic");
  const [sel, setSel] = useState<string[]>(["alan"]);
  const toggle = (id: string) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="List examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Basic" && (
          <>
            <div className={s.subLabel}>A plain vertical collection, hairline between rows</div>
            <div className={s.olist}>
              {["Overview", "Members", "Billing", "Integrations"].map((t) => (
                <div key={t} className={s.olistRow}><span className={s.olistBody}><span className={s.olistTitle}>{t}</span></span></div>
              ))}
            </div>
          </>
        )}
        {tab === "Rich rows" && (
          <>
            <div className={s.subLabel}>Leading avatar, body, and a trailing slot</div>
            <div className={s.olist}>
              {PEOPLE.map((p) => (
                <div key={p.id} className={s.olistRow}>
                  <span className={s.olistLead}><span className={s.olistAvatar}>{p.init}</span></span>
                  <span className={s.olistBody}><span className={s.olistTitle}>{p.name}</span><span className={s.olistDesc}>{p.role}</span></span>
                  <span className={s.olistTrail}>
                    <span className={`${s.obadge} ${p.status === "PAID" ? s.bgSuccess : s.bgWarm}`}>{p.status}</span>
                    <Chevron />
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === "Right text" && (
          <>
            <div className={s.subLabel}>A trailing value, right-aligned in mono</div>
            <div className={s.olist}>
              {[["Invoice 4821", "Paid Jul 2", "$1,200"], ["Invoice 4822", "Due Jul 14", "$840"], ["Invoice 4823", "Overdue", "$2,050"]].map(([title, sub, amt]) => (
                <div key={title} className={s.olistRow}>
                  <span className={s.olistBody}><span className={s.olistTitle}>{title}</span><span className={s.olistDesc}>{sub}</span></span>
                  <span className={s.olistTrail}><span className={s.olistValue}>{amt}</span></span>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === "Status" && (
          <>
            <div className={s.subLabel}>A leading indicator dot with a right-aligned value</div>
            <div className={s.olist}>
              {[["API gateway", "oindOnline", "Operational", "99.98%"], ["Search cluster", "oindIdle", "Degraded", "97.2%"], ["Billing worker", "oindBusy", "Down", "—"]].map(([name, dot, state, up]) => (
                <div key={name} className={s.olistRow}>
                  <span className={s.olistLead}><span className={`${s.oind} ${s[dot as keyof typeof s]}`} /></span>
                  <span className={s.olistBody}><span className={s.olistTitle}>{name}</span><span className={s.olistDesc}>{state}</span></span>
                  <span className={s.olistTrail}><span className={s.olistValueMuted}>{up}</span></span>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === "Selectable" && (
          <>
            <div className={s.subLabel}>Click a row to select — the check confirms</div>
            <div className={s.olist}>
              {PEOPLE.map((p) => (
                <button key={p.id} type="button" className={`${s.olistRow} ${s.olistBtn}`} aria-pressed={sel.includes(p.id)} onClick={() => toggle(p.id)}>
                  <span className={s.olistLead}><span className={s.olistAvatar}>{p.init}</span></span>
                  <span className={s.olistBody}><span className={s.olistTitle}>{p.name}</span><span className={s.olistDesc}>{p.role}</span></span>
                  <span className={s.olistTrail} style={{ color: sel.includes(p.id) ? "#ff9d45" : "#3a3c42" }}><Check /></span>
                </button>
              ))}
            </div>
            <span className={s.oupHint} style={{ marginTop: 12, display: "block" }}>{sel.length} selected</span>
          </>
        )}
      </div>
    </div>
  );
}
