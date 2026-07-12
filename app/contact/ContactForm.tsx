"use client";

import { useRef, useState } from "react";
import CtaButton from "../_components/CtaButton";
import s from "./contact.module.css";

/*
   The form practices what the site preaches: submitting renders the
   success state INSTANTLY (the optimistic part), then the real POST to
   Web3Forms reconciles the proof label with an honest round-trip, or
   surfaces a failure with a direct-email fallback.

   Delivery: Web3Forms (https://web3forms.com) mails each submission to
   hello@theoptimisticdesigner.com. Create a free access key for that
   address and expose it as NEXT_PUBLIC_WEB3FORMS_KEY (Vercel env var +
   local .env.local). No key set → the form falls back to email us direct.
*/

const TOPICS = ["Adopting the system", "Partnership", "Contributing", "Something else"];
// Web3Forms access key for hello@theoptimisticdesigner.com. Public by design
// (it ships in the client bundle); override with NEXT_PUBLIC_WEB3FORMS_KEY.
const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "1ae07b82-bb99-4c33-990d-6766a4206324";
const INBOX = "hello@theoptimisticdesigner.com";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [status, setStatus] = useState<"sync" | "ok" | "err">("sync");
  const [rtt, setRtt] = useState(0);
  const timers = useRef<number[]>([]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.set("topic", topic);
    data.set("subject", `New Optimistic enquiry · ${topic}`);
    data.set("from_name", "Optimistic · Let's talk");

    setSent(true); // instant · the optimistic part
    setStatus("sync");
    const t0 = performance.now();

    if (!KEY) { // not configured yet: keep the honest direct-email fallback
      timers.current.push(window.setTimeout(() => setStatus("err"), 200));
      return;
    }
    data.set("access_key", KEY);
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) { setRtt(Math.round(performance.now() - t0)); setStatus("ok"); }
      else setStatus("err");
    } catch { setStatus("err"); }
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
          {status === "sync" && <span className={s.stSync}>POST /submit · optimistic</span>}
          {status === "ok" && <span className={s.stOk}>● delivered · {rtt}ms</span>}
          {status === "err" && <span className={s.stSync}>● pending · email fallback</span>}
        </span>
        <p className={s.successBody}>
          {status === "err" ? (
            <>Your message showed up here before the server confirmed. We could not
            reach the mail service just now, so please send it straight to{" "}
            <a className={s.inlineLink} href={`mailto:${INBOX}`}>{INBOX}</a>.</>
          ) : (
            <>Your message showed up here before any server said so, and it is on its
            way to our inbox. We will reply from{" "}
            <a className={s.inlineLink} href={`mailto:${INBOX}`}>{INBOX}</a>.</>
          )}
        </p>
        <button
          className={s.again}
          type="button"
          onClick={() => { setSent(false); setStatus("sync"); }}
        >
          Write another <span aria-hidden="true">→</span>
        </button>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={submit}>
      {/* honeypot · bots fill this, humans never see it */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} aria-hidden="true" />

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
