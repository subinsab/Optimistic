import type { Metadata } from "next";
import Reveal from "../_components/Reveal";
import OptimisticHeart from "../_components/OptimisticHeart";
import CtaButton from "../_components/CtaButton";
import s from "./community.module.css";

export const metadata: Metadata = {
  title: "Community — Optimistic",
  description:
    "Optimistic is built in the open. Propose components, contribute code, improve the docs, and land your first contribution within the hour.",
};

/* pixel-family glyphs (8px grid, same family as the logo O) */
const P = ({ c, r, cls }: { c: number; r: number; cls?: string }) => (
  <rect className={cls} x={c * 8} y={r * 8} width={6} height={6} rx={1.5} />
);

/* ways in — one glyph, one hover behaviour each */
const WAYS = [
  {
    title: "Propose a component",
    body: "Spotted a gap? Open a proposal with the use case and a sketch. If it helps teams ship, it belongs in the system.",
    icon: (
      <svg className={`${s.wayIco} ${s.icoPlus}`} viewBox="0 0 38 38" aria-hidden="true">
        <P c={2} r={0} /><P c={2} r={1} /><P c={2} r={3} /><P c={2} r={4} />
        <P c={0} r={2} /><P c={1} r={2} /><P c={3} r={2} /><P c={4} r={2} />
        <P c={2} r={2} cls={s.key} />
      </svg>
    ),
  },
  {
    title: "Contribute code",
    body: "Improve a React or Angular implementation, fix a token, tighten an accessibility path. Every pull request moves the system forward.",
    icon: (
      <svg className={`${s.wayIco} ${s.icoCode}`} viewBox="0 0 38 38" aria-hidden="true">
        <P c={1} r={1} cls={s.bl} /><P c={0} r={2} cls={s.bl} /><P c={1} r={3} cls={s.bl} />
        <P c={3} r={1} cls={s.br} /><P c={4} r={2} cls={`${s.br} ${s.key}`} /><P c={3} r={3} cls={s.br} />
      </svg>
    ),
  },
  {
    title: "Improve the docs",
    body: "Better examples, clearer anatomy, sharper do's and don'ts. Documentation is a first class contribution here, not an afterthought.",
    icon: (
      <svg className={`${s.wayIco} ${s.icoDocs}`} viewBox="0 0 38 38" aria-hidden="true">
        <P c={0} r={1} cls={s.d1} /><P c={1} r={1} cls={s.d1} /><P c={2} r={1} cls={s.d1} /><P c={3} r={1} cls={s.d1} /><P c={4} r={1} cls={`${s.d1} ${s.key}`} />
        <P c={0} r={2} cls={s.d2} /><P c={1} r={2} cls={s.d2} /><P c={2} r={2} cls={s.d2} />
        <P c={0} r={3} cls={s.d3} /><P c={1} r={3} cls={s.d3} /><P c={2} r={3} cls={s.d3} /><P c={3} r={3} cls={s.d3} />
      </svg>
    ),
  },
  {
    title: "Show what you built",
    body: "Shipped something with Optimistic? Share it. Real products are the best proof and the best inspiration.",
    icon: (
      <svg className={`${s.wayIco} ${s.icoEye}`} viewBox="0 0 38 38" aria-hidden="true">
        <P c={1} r={1} /><P c={2} r={1} /><P c={3} r={1} />
        <P c={0} r={2} /><P c={4} r={2} />
        <P c={1} r={3} /><P c={2} r={3} /><P c={3} r={3} />
        <P c={2} r={2} cls={`${s.pupil} ${s.key}`} />
      </svg>
    ),
  },
];

/* the first hour — a short path with a visible finish line */
const STEPS = [
  {
    n: "01",
    title: "Take the code",
    body: "Star the repo and clone it. Everything runs locally in one command; no gatekeeping, no setup maze.",
    cmd: "$ git clone optimistic/ui",
  },
  {
    n: "02",
    title: "Pick a first issue",
    body: "Issues tagged good-first are scoped to land in an evening, and a maintainer walks beside you the whole way.",
    cmd: "$ gh issue list -l good-first",
  },
  {
    n: "03",
    title: "Ship it",
    body: "Open the pull request. We review kindly, merge fast, and your name enters the changelog for good.",
    cmd: "$ gh pr create",
  },
];

const VALUES = [
  { n: "01", title: "Kind by default", body: "Critique the work, support the person. Optimism extends to how we treat each other." },
  { n: "02", title: "Open in the build", body: "Decisions happen in the open, with the reasoning attached. No black boxes." },
  { n: "03", title: "Ship over perfect", body: "We would rather release, learn and iterate than polish in private forever." },
];

export default function CommunityPage() {
  return (
    <main className={s.page}>
      <div className={s.grain} aria-hidden="true" />
      <div className={s.vlines} aria-hidden="true" />

      {/* ── hero: the community, counted live ── */}
      <header className={s.hero}>
        <div className={s.inner}>
          <Reveal>
            <span className={s.eyebrow}>
              <i className={s.hatch} /> COMMUNITY
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className={s.heroTitle}>
              Built in the open,
              <br />
              <span className={s.warm}>counted in the open.</span>
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className={s.lead}>
              A design system is a promise kept by many hands. These counters
              are live and honest; watch them move, then add yours.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className={s.heroChips}>
              <OptimisticHeart hint="click the heart" />
            </div>
          </Reveal>
        </div>
      </header>

      {/* ── ways in ── */}
      <section className={s.section}>
        <div className={s.inner}>
          <Reveal>
            <span className={s.eyebrow}>
              <i className={s.hatch} /> WAYS IN
            </span>
            <h2 className={s.title}>Every contribution counts.</h2>
          </Reveal>
        </div>
        <div className={s.wayRow}>
          {WAYS.map((w, i) => (
            <Reveal key={w.title} delay={i * 80}>
              <article className={s.wayCell}>
                {w.icon}
                <h3 className={s.wayTitle}>{w.title}</h3>
                <p className={s.wayBody}>{w.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── the first hour ── */}
      <section className={s.section}>
        <div className={s.inner}>
          <Reveal>
            <span className={s.eyebrow}>
              <i className={s.hatch} /> YOUR FIRST HOUR
            </span>
            <h2 className={s.title}>Stranger to contributor, three moves.</h2>
          </Reveal>
          <div className={s.steps}>
            {STEPS.map((t, i) => (
              <Reveal key={t.n} delay={i * 90}>
                <article className={s.stepRow}>
                  <span className={s.stepNum}>//{t.n}</span>
                  <div>
                    <h3 className={s.stepTitle}>{t.title}</h3>
                    <code className={s.cmd}>{t.cmd}</code>
                  </div>
                  <p className={s.stepBody}>{t.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── house rules ── */}
      <section className={s.section}>
        <div className={s.inner}>
          <Reveal>
            <span className={s.eyebrow}>
              <i className={s.hatch} /> HOUSE RULES
            </span>
            <h2 className={s.title}>Three values, no fine print.</h2>
          </Reveal>
          <div className={s.valueGrid}>
            {VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i * 80}>
                <article className={s.valueCell}>
                  <span className={s.valueNum}>{v.n}</span>
                  <h3 className={s.valueTitle}>{v.title}</h3>
                  <p className={s.valueBody}>{v.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── the first move ── */}
      <section className={`${s.section} ${s.closing}`}>
        <div className={s.inner}>
          <Reveal>
            <span className={s.eyebrow}>
              <i className={s.hatch} /> THE FIRST MOVE
            </span>
            <h2 className={s.title}>Start with a star.</h2>
            <p className={s.lead}>
              It costs nothing and tells us someone is watching. We will take
              it from there.
            </p>
            <div className={s.ctaRow}>
              <CtaButton href="https://github.com">Open GitHub</CtaButton>
              <a className={s.quietLink} href="/contact">
                Or just say hello <span aria-hidden="true">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
