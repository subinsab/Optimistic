import type { Metadata } from "next";
import Reveal from "../_components/Reveal";
import OptimisticHeart from "../_components/OptimisticHeart";
import CtaButton from "../_components/CtaButton";
import s from "./philosophy.module.css";

export const metadata: Metadata = {
  title: "Philosophy — Optimistic",
  description:
    "What the name Optimistic means, the optimistic-update method inside it, and the five tenets every token answers to.",
};

/* pixel-family glyphs (same 8px grid as the logo O and the heart) */
const P = ({ c, r, cls }: { c: number; r: number; cls?: string }) => (
  <rect className={cls} x={c * 8} y={r * 8} width={6} height={6} rx={1.5} />
);

const ICO = {
  /* belief: a pixel sun on the horizon; it rises on hover */
  sun: (
    <svg className={`${s.layerIco}`} viewBox="0 0 38 38" aria-hidden="true">
      <P c={0} r={4} /><P c={1} r={4} /><P c={2} r={4} /><P c={3} r={4} /><P c={4} r={4} />
      <P c={1} r={3} cls={s.rise} /><P c={2} r={3} cls={s.rise} /><P c={3} r={3} cls={s.rise} />
      <P c={2} r={2} cls={`${s.rise} ${s.key}`} />
    </svg>
  ),
  /* method: the pixel heart; it fills in before anything confirms */
  heart: (
    <svg className={`${s.layerIco} ${s.icoHeart}`} viewBox="0 0 54 46" aria-hidden="true">
      {([
        [1, 0], [2, 0], [4, 0], [5, 0],
        [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
        [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
        [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
        [2, 4], [3, 4], [4, 4],
        [3, 5],
      ] as [number, number][]).map(([c, r]) => <P key={`${c}-${r}`} c={c} r={r} />)}
    </svg>
  ),
  /* result: ascending bars; the summit pixel lights up */
  bars: (
    <svg className={`${s.layerIco}`} viewBox="0 0 38 38" aria-hidden="true">
      <P c={1} r={4} />
      <P c={2} r={3} /><P c={2} r={4} />
      <P c={3} r={2} /><P c={3} r={3} /><P c={3} r={4} />
      <P c={4} r={1} cls={`${s.rise} ${s.key}`} /><P c={4} r={2} /><P c={4} r={3} /><P c={4} r={4} />
    </svg>
  ),
};

const TICO = [
  /* render first: forward arrow, head nudges ahead */
  <svg key="t1" className={`${s.tenetIco} ${s.icoArrow}`} viewBox="0 0 38 38" aria-hidden="true">
    <P c={0} r={2} /><P c={1} r={2} /><P c={2} r={2} />
    <P c={2} r={1} cls={s.head} /><P c={3} r={2} cls={`${s.head} ${s.key}`} /><P c={2} r={3} cls={s.head} />
  </svg>,
  /* compounds: a cluster, one unit joining from up-right */
  <svg key="t2" className={`${s.tenetIco} ${s.icoJoin}`} viewBox="0 0 38 38" aria-hidden="true">
    <P c={1} r={2} /><P c={2} r={2} /><P c={1} r={3} /><P c={2} r={3} />
    <P c={3} r={1} cls={`${s.join} ${s.key}`} />
  </svg>,
  /* one light: a grid where a single pixel carries the warmth */
  <svg key="t3" className={`${s.tenetIco} ${s.icoLight}`} viewBox="0 0 38 38" aria-hidden="true">
    <P c={1} r={1} /><P c={2} r={1} /><P c={3} r={1} cls={s.key} />
    <P c={1} r={2} /><P c={2} r={2} /><P c={3} r={2} />
    <P c={1} r={3} /><P c={2} r={3} /><P c={3} r={3} />
  </svg>,
  /* legible: code brackets, spreading open */
  <svg key="t4" className={`${s.tenetIco} ${s.icoBrackets}`} viewBox="0 0 38 38" aria-hidden="true">
    <P c={1} r={1} cls={s.bl} /><P c={0} r={2} cls={s.bl} /><P c={1} r={3} cls={s.bl} />
    <P c={3} r={1} cls={s.br} /><P c={4} r={2} cls={`${s.br} ${s.key}`} /><P c={3} r={3} cls={s.br} />
  </svg>,
  /* reconcile: two lanes shearing back into agreement */
  <svg key="t5" className={`${s.tenetIco} ${s.icoSync}`} viewBox="0 0 38 38" aria-hidden="true">
    <P c={0} r={1} cls={s.top} /><P c={1} r={1} cls={s.top} /><P c={2} r={1} cls={s.top} /><P c={3} r={1} cls={`${s.top} ${s.key}`} />
    <P c={1} r={3} cls={s.bot} /><P c={2} r={3} cls={s.bot} /><P c={3} r={3} cls={s.bot} /><P c={4} r={3} cls={s.bot} />
  </svg>,
];

/* the three layers of the name — belief, method, result */
const LAYERS = [
  {
    n: "01",
    kicker: "Belief",
    title: "The Optimist",
    body: "From the Latin optimus, the best. The optimist is not naive; they simply refuse to design for failure first. Every good interface begins with someone who believes the finished thing is worth building.",
  },
  {
    n: "02",
    kicker: "Method",
    title: "The Optimistic Update",
    body: "Engineers render success before the server confirms it. The heart fills in, the count ticks up, and the proof catches up a beat later. We named the whole system after this pattern. It is belief, made technical.",
  },
  {
    n: "03",
    kicker: "Result",
    title: "The Optimum",
    body: "The same root gives us the optimum: the best state actually reachable. A system that assumes the best and reconciles honestly tends to arrive there sooner than one that waits for permission.",
  },
];

/* the five tenets every token answers to */
const TENETS = [
  {
    n: "01",
    title: "Render the future first",
    body: "Show the finished state before every confirmation arrives. Waiting is a design decision, and we decide against it wherever honesty allows.",
  },
  {
    n: "02",
    title: "Optimism compounds in small units",
    body: "A pixel becomes a glyph, a token becomes a component, a component becomes a product. We invest at the smallest scale, because that is where consistency is cheapest and belief multiplies.",
  },
  {
    n: "03",
    title: "One light is enough",
    body: "The system is monochrome with a single warm accent, always up and to the right. Restraint keeps attention honest, and the one light tells you where tomorrow is.",
  },
  {
    n: "04",
    title: "Legible to humans and machines",
    body: "Every decision is written once, in a form a designer, an engineer and an AI can read without translation. What cannot be parsed cannot be trusted.",
  },
  {
    n: "05",
    title: "Reconcile honestly",
    body: "Optimism is not denial. When the server disagrees, the interface corrects itself in the open. Rollbacks, deprecations and changelogs are part of the promise, not exceptions to it.",
  },
];

export default function PhilosophyPage() {
  return (
    <main className={s.page}>
      <div className={s.grain} aria-hidden="true" />
      <div className={s.vlines} aria-hidden="true" />

      {/* ── hero: the one-liner ── */}
      <header className={s.hero}>
        <div className={s.inner}>
          <Reveal>
            <span className={s.eyebrow}>
              <i className={s.hatch} /> PHILOSOPHY
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className={s.heroTitle}>
              Assume the best outcome.
              <br />
              <span className={s.warm}>Then ship it.</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className={s.lead}>
              Optimistic is named after a pattern, not a personality. This page
              is the reasoning: what the name means, the method inside it, and
              the five tenets every token answers to.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ── the name: three layers ── */}
      <section className={s.section}>
        <div className={s.inner}>
          <Reveal>
            <span className={s.eyebrow}>
              <i className={s.hatch} /> ONE WORD, THREE LAYERS
            </span>
            <h2 className={s.title}>Everything is in the name.</h2>
          </Reveal>
        </div>
        <div className={s.layerRow}>
          {LAYERS.map((l, i) => (
            <Reveal key={l.n} delay={i * 90}>
              <article className={s.layerCell}>
                {[ICO.sun, ICO.heart, ICO.bars][i]}
                <span className={s.layerNum}>{l.n} · {l.kicker.toUpperCase()}</span>
                <h3 className={s.layerTitle}>{l.title}</h3>
                <p className={s.layerBody}>{l.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── the method, live ── */}
      <section className={s.section}>
        <div className={s.inner}>
          <Reveal>
            <span className={s.eyebrow}>
              <i className={s.hatch} /> THE METHOD, LIVE
            </span>
            <h2 className={s.title}>Do not take our word for it.</h2>
            <p className={s.lead}>
              This heart is real. Click it: the interface believes you
              instantly, and the proof arrives a beat later. Every component in
              the system carries that manner, from a like button to a release.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <div className={s.demo}>
              <OptimisticHeart />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── the five tenets ── */}
      <section className={s.section}>
        <div className={s.inner}>
          <Reveal>
            <span className={s.eyebrow}>
              <i className={s.hatch} /> THE TENETS
            </span>
            <h2 className={s.title}>Five tenets, one temperament.</h2>
          </Reveal>
          <div className={s.tenets}>
            {TENETS.map((t, i) => (
              <Reveal key={t.n} delay={i * 60}>
                <article className={s.tenetRow}>
                  <span className={s.tenetSide}>
                    {TICO[i]}
                    <span className={s.tenetNum}>//{t.n}</span>
                  </span>
                  <h3 className={s.tenetTitle}>{t.title}</h3>
                  <p className={s.tenetBody}>{t.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── closing: the proof ── */}
      <section className={`${s.section} ${s.closing}`}>
        <div className={s.inner}>
          <Reveal>
            <span className={s.eyebrow}>
              <i className={s.hatch} /> THE PROOF
            </span>
            <h2 className={s.title}>Philosophy is cheap. Ours compiles.</h2>
            <p className={s.lead}>
              Every tenet on this page is enforced by a token, a component or a
              pipeline. Read the beliefs, then open the build.
            </p>
            <div className={s.ctaRow}>
              <CtaButton href="/components">Browse the components</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
