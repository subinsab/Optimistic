"use client";

import { useRef, useState } from "react";
import s from "../docs.module.css";
import { TimePicker, fmtTime, type Time } from "./TimePickerDemo";

/* live behavior — an optimistic "set reminder" that reflects the new time
   instantly and reconciles with the server, rolling back on failure. */

const net = (ms = 600, fail = 0.3) =>
  new Promise<void>((res, rej) => setTimeout(() => (Math.random() < fail ? rej() : res()), ms));

export default function TimePickerBehavior() {
  const [reminder, setReminder] = useState<Time>({ h: 9, m: 0 });
  const [log, setLog] = useState<string[]>([]);
  const busy = useRef(false);
  const push = (l: string) => setLog((x) => [l, ...x].slice(0, 5));

  const change = async (v: Time) => {
    const prev = reminder;
    setReminder(v); // optimistic
    if (busy.current) return;
    busy.current = true;
    push(`PUT /reminders/7 · optimistic → ${fmtTime(v)}`);
    try {
      await net(600, 0.3);
      push("● reconciled 200");
    } catch {
      setReminder(prev);
      push("✕ 500 · rolled back");
    } finally {
      busy.current = false;
    }
  };

  return (
    <div className={s.behCard}>
      <div className={s.behHead}>
        <span>Optimistic reminder time</span>
        <span className={s.behVerb}>PUT</span>
      </div>
      <div className={s.behStage} style={{ alignItems: "flex-start", gap: 20 }}>
        <TimePicker initial={{ h: 9, m: 0 }} step={1} footer={false} onChange={change} />
        <div style={{ flex: 1, minWidth: 160, display: "flex", flexDirection: "column", gap: 10 }}>
          <div className={s.behOut} style={{ marginLeft: 0, textAlign: "left" }}>
            Reminder at <b>{fmtTime(reminder)}</b>
          </div>
          <div className={s.behLog} style={{ borderTop: 0, padding: 0, maxHeight: 120 }}>
            {log.length ? log.map((l, i) => <span key={i}>{l}</span>) : <span>change the time to fire a request</span>}
          </div>
        </div>
      </div>
      <div className={s.behCaption}>
        The new time reflects the instant you pick it; the server confirms a beat later. One in three writes
        fails on purpose and honestly rolls back to the last saved time.
      </div>
    </div>
  );
}
