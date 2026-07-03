"use client";

import { useState } from "react";
import styles from "./contact.module.css";

const TOPICS = ["Adopting Optimistic", "Partnership", "Contributing", "Something else"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState(TOPICS[0]);

  if (sent) {
    return (
      <div className={styles.success} role="status">
        <div className={styles.successMark}>✓</div>
        <h3 className="h3">Thanks — message noted.</h3>
        <p className={styles.successBody}>
          This demo form doesn&apos;t send anything yet. In the meantime, reach
          us directly at{" "}
          <a className={styles.inlineLink} href="mailto:hello@optimistic.design">
            hello@optimistic.design
          </a>
          .
        </p>
        <button className="btn-ghost" type="button" onClick={() => setSent(false)}>
          Write another →
        </button>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className={styles.row}>
        <Field label="Name" id="name">
          <input id="name" name="name" className={styles.input} placeholder="Ada Lovelace" required />
        </Field>
        <Field label="Email" id="email">
          <input id="email" name="email" type="email" className={styles.input} placeholder="ada@team.com" required />
        </Field>
      </div>

      <Field label="What's this about?" id="topic">
        <div className={styles.chips} role="radiogroup" aria-label="Topic">
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={topic === t}
              className={`${styles.chip} ${topic === t ? styles.chipActive : ""}`}
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
          className={styles.textarea}
          rows={5}
          placeholder="Tell us what you're building…"
          required
        />
      </Field>

      <button className="btn-primary" type="submit">Send message</button>
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
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      {children}
    </div>
  );
}
