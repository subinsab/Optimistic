"use client";

import { useRef, useState } from "react";
import CtaButton from "../_components/CtaButton";
import s from "./contact.module.css";

/*
   The form practices what the site preaches: submitting renders the
   success state INSTANTLY (the optimistic part), then the proof label
   catches up a plausible round-trip later. And per the fifth tenet it
   reconciles honestly: this demo form stores nothing, and says so.
*/

const TOPICS = ["Adopting the system", "Partnership", "Contributing", "Something else"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [status, setStatus] = useState<"sync" | "ok" | null>(null);
  const [rtt, setRtt] = useState(0);
  const timers = useRef<number[]>([]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true); // instant — the optimistic part
    setStatus("sync");
    const ms = 140 + Math.floor(Math.random() * 160);
    setRtt(ms);
    timers.current.push(window.setTimeout(() => setStatus("ok"), ms));
  };

  if (sent) {
    return (
      <div className={s.success} role="status">
        <svg className={s.check} viewBox="0 0 46 38" aria-hidden="true">
          {([[0, 2], [1, 3], [2, 4], [3, 3], [4, 2], [5, 1]] as [number, number][]).map(([c, r]) => (
            <rect key={`${c}-${r}`} x={c * 8} y={r * 8} width={6} height={6} rx={1.5} />
          ))}
        </svg>
        <h3 className={s.successTitle}>Rendered first.</h3>
        <span className={s.successStatus} aria-hidden="true">
          {status === "sync" && <span className={s.stSync}>POST /v1/messages · optimistic</span>}
          {status === "ok" && <span className={s.stOk}>● reconciled · {rtt}ms</span>}
        </span>
        <p className={s.successBody}>
          Your message showed up here before any server said so. That is how we
          build, and it is how we listen. One honest note: this demo form
          stores nothing yet, so for now reach us directly at{" "}
          <a className={s.inlineLink} href="mailto:hello@theoptimisticdesigner.com">
            hello@theoptimisticdesigner.com
          </a>
          .
        </p>
        <button
          className={s.again}
          type="button"
          onClick={() => { setSent(false); setStatus(null); }}
        >
          Write another <span aria-hidden="true">→</span>
        </button>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={submit}>
      <div className={s.row}>
        <Field label="Name" id="name">
          <input id="name" name="name" className={s.input} placeholder="Ada Lovelace" required />
        </Field>
        <Field label="Email" id="email">
          <input id="email" name="email" type="email" className={s.input} placeholder="ada@team.com" required />
        </Field>
      </div>

      <Field label="What is this about?" id="topic">
        <div className={s.chips} role="radiogroup" aria-label="Topic">
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={topic === t}
              className={`${s.chip} ${topic === t ? s.chipOn : ""}`}
              onClick={() => setTopic(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Message" id="message">
        <textarea
          id="message"
          name="message"
          className={s.textarea}
          rows={5}
          placeholder="Tell us what you're building…"
          required
        />
      </Field>

      <div className={s.sendRow}>
        <CtaButton type="submit">Send message</CtaButton>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>{label}</label>
      {children}
    </div>
  );
}
