import Link from "next/link";
import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const linkStyle = { color: "#5b8cff", textDecoration: "underline", textUnderlineOffset: 2, fontWeight: 500 } as const;

/* what the system is made of */
const PILLARS: [string, string][] = [
  ["Tokens as the source of truth", "Every colour, size, space and type style is a token. A generator turns them into CSS variables, so one change moves the whole system at once. Nothing is hard-coded."],
  ["Eight foundations", "Colour, typography, spacing, grid, elevation, border radius and breakpoints. The short vocabulary every component is built from."],
  ["A component library", "Documented pieces with a live demo, an engineering contract, and copy-ready code. You own the source, shadcn-style, not a locked package."],
  ["Dark-first and monochrome", "A near-black field with one warm accent (#FF7A00). Structure comes from hairlines and spacing, so a single warm element can carry the attention."],
  ["Multi-framework", "The same tokens feed React, Angular and plain HTML, so the look stays identical wherever it ships."],
  ["Built to be read by AI", "Named for its role, structured and documented so an assistant can extend it without guesswork. It is made to be worked on with Claude."],
];

/* where to go next */
const NEXT: [string, string, string, string][] = [
  ["01", "Read the philosophy", "The name is the method. See why an interface should render the result first and reconcile after.", "/philosophy"],
  ["02", "Follow How to Use", "System requirements, install steps, and how to consume every foundation with var(--token).", "/components/principles"],
  ["03", "Explore the foundations", "Start with the Color System, then Typography and Spacing. Each page is a short, practical reference.", "/components/colors"],
  ["04", "Compose with components", "Buttons, inputs, navigation and more, each with a live demo and copy-ready code.", "/components/button"],
];

export default function IntroductionDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Welcome</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 660 }}><strong style={{ color: "#e7e9ee" }}>Optimistic</strong> is a dark-first, token-driven design system for building interfaces that feel fast and honest. It is headless and plug-and-play: one set of tokens and components that ships to React, Angular and plain HTML, documented so both people and AI can extend it. This page is the short version. When you are ready to build, head to <Link href="/components/principles" style={linkStyle}>How to Use</Link>.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Why it is called Optimistic</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 660 }}>The name comes from the <strong style={{ color: "#e7e9ee" }}>optimistic update</strong>, the engineering pattern where an interface shows the result of an action the instant you take it, then quietly reconciles with the server. It carries three meanings from the Latin <em>optimus</em>: the optimist&apos;s belief, the optimistic-update method, and the optimum result. One line: <strong style={{ color: "#e7e9ee" }}>assume the best outcome, then ship it.</strong> The whole system is built in that temperament, and the <Link href="/philosophy" style={linkStyle}>philosophy</Link> tells the long story.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>What is inside</div><div className={s.secBody}>
        <div className={s.fnCards}>{PILLARS.map(([t, d]) => (
          <div key={t} className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>{t}</div><p className={s.fnCardText}>{d}</p></div>
        ))}</div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Where to start</div><div className={s.secBody}>
        <div>{NEXT.map(([n, t, d, href]) => (
          <div key={n} className={s.fnLayer}>
            <span className={s.fnLayerBadge} style={{ width: "auto" }}>{n}</span>
            <span className={s.fnLayerText}><Link href={href} style={{ ...linkStyle, color: "#e7e9ee", textDecoration: "none" }}><b>{t}</b></Link>. {d} <Link href={href} style={linkStyle}>Open ↗</Link></span>
          </div>
        ))}</div>
      </div></section></Reveal>

      <RelatedSection related={related} />
    </>
  );
}
