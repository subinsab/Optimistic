import type { Metadata } from "next";
import Reveal from "../_components/Reveal";
import ContactForm from "./ContactForm";
import s from "./contact.module.css";

export const metadata: Metadata = {
  title: "Let's talk — Optimistic",
  description:
    "Adopting the system, proposing a partnership, or just curious? Two minutes here starts the conversation.",
};

/* pixel-family glyphs for the channels */
const P = ({ c, r, cls }: { c: number; r: number; cls?: string }) => (
  <rect className={cls} x={c * 8} y={r * 8} width={6} height={6} rx={1.5} />
);

const CHANNELS = [
  {
    label: "Email",
    value: "hello@theoptimisticdesigner.com",
    href: "mailto:hello@theoptimisticdesigner.com",
    icon: (
      <svg className={`${s.chIco} ${s.icoSend}`} viewBox="0 0 38 38" aria-hidden="true">
        {/* paper plane: a diagonal that wants to leave */}
        <P c={0} r={4} /><P c={1} r={3} /><P c={2} r={2} />
        <P c={3} r={1} cls={s.tip} /><P c={4} r={0} cls={`${s.tip} ${s.key}`} />
        <P c={1} r={4} /><P c={2} r={4} />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/optimistic",
    href: "https://github.com",
    icon: (
      <svg className={`${s.chIco} ${s.icoMerge}`} viewBox="0 0 38 38" aria-hidden="true">
        {/* merge: two branches joining */}
        <P c={1} r={0} /><P c={5} r={0} cls={s.key} />
        <P c={1} r={1} /><P c={5} r={1} />
        <P c={2} r={2} /><P c={4} r={2} />
        <P c={3} r={3} /><P c={3} r={4} />
      </svg>
    ),
  },
  {
    label: "Community",
    value: "Join the conversation",
    href: "/community",
    icon: (
      <svg className={`${s.chIco} ${s.icoNodes}`} viewBox="0 0 38 38" aria-hidden="true">
        {/* three people, one constellation */}
        <P c={2} r={0} cls={s.key} />
        <P c={0} r={3} /><P c={4} r={3} />
        <P c={1} r={2} cls={s.ln} /><P c={3} r={2} cls={s.ln} /><P c={2} r={3} cls={s.ln} />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <main className={s.page}>
      <div className={s.grain} aria-hidden="true" />

      {/* ── hero ── */}
      <header className={s.hero}>
        <div className={s.inner}>
          <Reveal>
            <span className={s.eyebrow}>
              <i className={s.hatch} /> LET&apos;S TALK
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className={s.heroTitle}>
              Tell us what
              <br />
              <span className={s.warm}>you&apos;re building.</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className={s.lead}>
              Adopting the system, proposing a partnership, or just curious how
              deep the tokens go. Two minutes here starts it.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ── form + channels ── */}
      <section className={s.section}>
        <div className={`${s.inner} ${s.layout}`}>
          <Reveal className={s.formCol}>
            <ContactForm />
          </Reveal>

          <Reveal delay={140}>
            <aside className={s.aside}>
              <span className={s.asideLabel}>OTHER DOORS</span>
              <ul className={s.channels}>
                {CHANNELS.map((c) => (
                  <li key={c.label}>
                    <a href={c.href} className={s.channel}>
                      {c.icon}
                      <span className={s.chMeta}>
                        <span className={s.chLabel}>{c.label}</span>
                        <span className={s.chValue}>{c.value}</span>
                      </span>
                      <span className={s.chArrow} aria-hidden="true">→</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className={s.note}>
                We reply within two business days, usually sooner.
              </p>
            </aside>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
