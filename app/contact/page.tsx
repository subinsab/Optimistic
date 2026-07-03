import type { Metadata } from "next";
import Reveal from "../_components/Reveal";
import ContactForm from "./ContactForm";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Let's talk — Optimistic",
  description:
    "Adopting Optimistic, partnering, or just curious? Get in touch — we'd love to talk.",
};

const CHANNELS = [
  { label: "Email", value: "hello@optimistic.design", href: "mailto:hello@optimistic.design" },
  { label: "GitHub", value: "github.com/optimistic", href: "https://github.com" },
  { label: "Community", value: "Join the chat", href: "/community" },
];

export default function ContactPage() {
  return (
    <main className="page-shell">
      <header className="page-head">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Let&apos;s talk</span>
            <h1 className="page-title">
              Let&apos;s build something <span className="gradient-text">optimistic.</span>
            </h1>
            <p className="page-lead">
              Adopting Optimistic, exploring a partnership, or just curious how it
              all fits together? Drop us a line.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="content-section">
        <div className="container">
          <div className={styles.layout}>
            <Reveal className={styles.formCol}>
              <ContactForm />
            </Reveal>

            <Reveal delay={120} className={styles.asideCol}>
              <aside className={styles.aside}>
                <h2 className="h3">Other ways to reach us</h2>
                <ul className={styles.channels}>
                  {CHANNELS.map((c) => (
                    <li key={c.label}>
                      <a href={c.href} className={styles.channel}>
                        <span className={styles.channelLabel}>{c.label}</span>
                        <span className={styles.channelValue}>{c.value}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <p className={styles.note}>
                  We usually reply within a couple of business days.
                </p>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
