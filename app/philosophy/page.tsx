import type { Metadata } from "next";
import Reveal from "../_components/Reveal";
import styles from "./philosophy.module.css";

export const metadata: Metadata = {
  title: "Philosophy — Optimistic",
  description:
    "The principles behind Optimistic: optimism as a method, the five W's, and the beliefs that shape every token and component.",
};

const FIVE_WS = [
  {
    w: "Why",
    q: "Why are we building Optimistic?",
    a: "Because the distance between a good idea and shipped UI is still too long. Optimistic compresses it — so teams spend their energy on the product, not on rebuilding the same button for the hundredth time.",
  },
  {
    w: "What",
    q: "What is it, exactly?",
    a: "A complete, token-driven design system: foundations, accessible components, and production code for React and Angular — paired with Figma and docs that stay in sync.",
  },
  {
    w: "Who",
    q: "Who is it for?",
    a: "Designers, engineers, and the AI agents now building alongside them. Predictable tokens and APIs mean humans and models read the same source of truth.",
  },
  {
    w: "When",
    q: "When do you reach for it?",
    a: "From the first wireframe to the final ship — and every iteration in between. Start fast, stay consistent, scale without rewrites.",
  },
  {
    w: "Where",
    q: "Where does it run?",
    a: "Anywhere the web does. The same tokens drive React, Angular, and plain HTML — and feed straight into AI tooling and Figma.",
  },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Optimism is a method, not a mood",
    body: "We design as if the best outcome is achievable — and then we remove every obstacle between a team and that outcome. Sensible defaults, fewer decisions, faster shipping.",
  },
  {
    n: "02",
    title: "Tokens are the source of truth",
    body: "Color, type, space, motion — all expressed as tokens before pixels. One change ripples everywhere, across every framework, with no drift.",
  },
  {
    n: "03",
    title: "Accessible is non-negotiable",
    body: "Contrast, focus, keyboard paths, and semantics are designed in from the first commit — never bolted on at the end.",
  },
  {
    n: "04",
    title: "Built for humans and machines",
    body: "Predictable APIs and semantic tokens make the system equally legible to a designer, an engineer, and an AI agent.",
  },
  {
    n: "05",
    title: "Document like you mean it",
    body: "Every component explains its sizing, anatomy, motion, do's and don'ts, and ships with real code. A system you can't understand is one you won't use.",
  },
  {
    n: "06",
    title: "Plug-and-play, everywhere",
    body: "Copy, install, ship. The same component is at home in React, Angular, or plain HTML — without a rewrite.",
  },
];

export default function PhilosophyPage() {
  return (
    <main className="page-shell">
      {/* ── HEADER ───────────────────────────────────────────── */}
      <header className="page-head">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Philosophy</span>
            <h1 className="page-title">
              Optimism, turned into a <span className="gradient-text">way of building.</span>
            </h1>
            <p className="page-lead">
              A design system should be able to explain itself — its reasons, its
              beliefs, and the bet it&apos;s making about the future. This is ours.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ── MANIFESTO ────────────────────────────────────────── */}
      <section className="content-section">
        <div className="container">
          <Reveal>
            <div className="prose">
              <p>
                <strong>
                  Most design systems are built out of fear — of inconsistency,
                  of chaos, of things breaking.
                </strong>{" "}
                Optimistic is built out of belief: that a team given the right
                foundations will build something better, faster, and kinder than
                they thought possible.
              </p>
              <p>
                We started from a simple frustration. The gap between &ldquo;we
                have an idea&rdquo; and &ldquo;it&apos;s live for users&rdquo; is
                still measured in weeks — most of it spent re-solving problems
                that were solved long ago. A button. A modal. A form that
                validates. Optimistic exists to collapse that gap.
              </p>
              <p>
                And the ground is shifting. The people building products now
                include the models building alongside them. A system that&apos;s
                only legible to humans is already behind. So we made Optimistic{" "}
                <strong>readable by both</strong> — semantic tokens, predictable
                APIs, and documentation precise enough for a machine and warm
                enough for a person.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FIVE W's ─────────────────────────────────────────── */}
      <section className="content-section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">The five W&apos;s</span>
            <h2 className="h2" style={{ marginTop: "var(--sp-3)" }}>
              The thinking, in five questions
            </h2>
          </Reveal>
          <div className={styles.wList}>
            {FIVE_WS.map((item, i) => (
              <Reveal key={item.w} delay={i * 60}>
                <article className={styles.wCard}>
                  <span className={styles.wTag}>{item.w}</span>
                  <div className={styles.wBody}>
                    <h3 className={styles.wQuestion}>{item.q}</h3>
                    <p className={styles.wAnswer}>{item.a}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ───────────────────────────────────────── */}
      <section className="content-section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Principles</span>
            <h2 className="h2" style={{ marginTop: "var(--sp-3)" }}>
              Six beliefs we build by
            </h2>
          </Reveal>
          <div className="grid-3" style={{ marginTop: "var(--sp-12)" }}>
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.n} delay={i * 50}>
                <article className="card">
                  <span className={styles.principleNum}>{p.n}</span>
                  <h3 className="h3" style={{ marginTop: "var(--sp-4)" }}>
                    {p.title}
                  </h3>
                  <p className={styles.principleBody}>{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
