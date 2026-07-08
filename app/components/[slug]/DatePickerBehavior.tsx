"use client";

import { useRef, useState } from "react";
import s from "../docs.module.css";
import { Calendar, fmt } from "./DatePickerDemo";

/* live behavior — an optimistic reschedule with a min constraint (no past
   dates) and full keyboard navigation inherited from the Calendar. */

const net = (ms = 650, fail = 0.3) =>
  new Promise<void>((res, rej) => setTimeout(() => (Math.random() < fail ? rej() : res()), ms));

export default function DatePickerBehavior() {
  const today = new Date();
  const [scheduled, setScheduled] = useState<Date>(today);
  const [log, setLog] = useState<string[]>([]);
  const busy = useRef(false);
  const push = (l: string) => setLog((x) => [l, ...x].slice(0, 5));

  const reschedule = async (v: Date) => {
    if (busy.current) return;
    busy.current = true;
    const prev = scheduled;
    setScheduled(v); // optimistic
    push(`PATCH /events/42 · optimistic → ${fmt(v)}`);
    try {
      await net(650, 0.3);
      push("● reconciled 200");
    } catch {
      setScheduled(prev);
      push("✕ 409 conflict · rolled back");
    } finally {
      busy.current = false;
    }
  };

  return (
    <div className={s.behCard}>
      <div className={s.behHead}>
        <span>Optimistic reschedule · min = today</span>
        <span className={s.behVerb}>PATCH</span>
      </div>
      <div className={s.behStage} style={{ alignItems: "flex-start", gap: 20 }}>
        <Calendar mode="single" min={today} initialDate={today} footer={false} onChange={(v) => reschedule(v as Date)} />
        <div style={{ flex: 1, minWidth: 160, display: "flex", flexDirection: "column", gap: 10 }}>
          <div className={s.behOut} style={{ marginLeft: 0, textAlign: "left" }}>
            Event is on <b>{fmt(scheduled)}</b>
          </div>
          <div className={s.behLog} style={{ borderTop: 0, padding: 0, maxHeight: 120 }}>
            {log.length ? log.map((l, i) => <span key={i}>{l}</span>) : <span>pick a new date to reschedule</span>}
          </div>
        </div>
      </div>
      <div className={s.behCaption}>
        Past dates are struck through and unclickable. Rescheduling reflects instantly, then the server confirms —
        one in three attempts hits a conflict and honestly rolls back. Arrow keys, PageUp/Down and Home/End all navigate.
      </div>
    </div>
  );
}
