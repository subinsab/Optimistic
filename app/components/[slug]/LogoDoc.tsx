import Reveal from "../../_components/Reveal";
import Logo from "../../_components/Logo";
import type { ALL_ENTRIES } from "../_data/registry";
import LogoDemo from "./LogoDemo";
import LogoConfigurator from "./LogoConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Logo. Dark design system: a pixel-O — a two-deep ring drawn on a 9×9 grid of #F4F4F5 squares, with exactly one warm #FF7A00 pixel at 45° (the 'one warm pixel' rule). Ships as a bare mark, a mark + 'Optimistic' wordmark lockup, and a rounded-chip app icon on #1C1C1E. Keep generous clear space (one grid unit all around); never recolour, stretch, rotate or add effects. Deliver React + CSS/SVG.");

const CODE = [
  { label: "HTML", code: `<span class="o-logo">
  <svg viewBox="0 0 56 56"><!-- 9-grid pixel ring, one #ff7a00 cell --></svg>
  <span class="o-logo__word">Optimistic</span>
</span>

<!-- app icon -->
<span class="o-logo-chip"><svg viewBox="0 0 56 56">…</svg></span>` },
  { label: "CSS", code: `.o-logo { display: inline-flex; align-items: center; gap: 10px; }
.o-logo__word { font-weight: 700; font-size: 17px; letter-spacing: -.02em; }
.o-logo-chip {
  display: inline-grid; place-items: center;
  background: #1c1c1e; border-radius: 25%;   /* superellipse-ish tile */
}
/* pixels: #f4f4f5, one #ff7a00 accent at 45deg — never restyled */` },
  { label: "React", code: `import { Logo } from "@optimistic/ui";

<Logo size={24} withWordmark />     // lockup
<Logo size={64} />                  // bare mark
<Logo size={52} chip />             // app-icon tile`,
  },
  { label: "Angular", code: `<o-logo [size]="24" withWordmark></o-logo>
<o-logo [size]="64"></o-logo>
<o-logo [size]="52" chip></o-logo>` },
  { label: "Async / API", code: `// The mark is deterministic geometry, computed once — no assets to load,
// no layout shift. Round coordinates so SSR and client hydrate identically.
const N = 9, C = 4, R_IN = 2.5, R_OUT = 4.55;   // grid + ring radii
const ACCENT = [6, 2];                           // the one warm pixel (45°)

// It scales to any size from a single <svg viewBox="0 0 56 56"> — the
// favicon, the nav mark and a hero lockup are the same source of truth.` },
];

export default function LogoDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><LogoDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><LogoConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>size</td><td>number</td><td>Height of the mark in px; never below 20</td></tr>
          <tr><td className={s.tokName}>withWordmark</td><td>boolean</td><td>Show the &quot;Optimistic&quot; lockup</td></tr>
          <tr><td className={s.tokName}>chip</td><td>boolean</td><td>Set the mark in a rounded app-icon tile</td></tr>
          <tr><td className={s.tokName}>accent</td><td>fixed</td><td>Exactly one warm pixel at 45° — not configurable</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>The Logo is the brand&apos;s signature: one mark, one warm pixel, from a single SVG source. It is not an Icon or an Avatar and never restyled.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <Logo size={72} withWordmark={false} />
            <span className={s.anaMark} style={{ left: "50%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "90%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Pixel ring</span><span className={s.anaDesc}>A two-deep O on a 9×9 grid, #F4F4F5 squares.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Warm pixel</span><span className={s.anaDesc}>One #FF7A00 cell at 45° — the whole brand idea.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Clear space &amp; minimum size</div><div className={s.secBody}>
        <div className={s.ddGrid} style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>Clear space</div><div className={s.ctxStage}><span className={s.ologoClearBox}><span className={s.ologoClearGuide} /><Logo size={44} withWordmark={false} /></span></div><p className={s.ctxCaption}>Keep one grid unit of empty space on every side.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>Minimum size</div><div className={s.ctxStage}><span style={{ display: "flex", gap: 16, alignItems: "flex-end" }}><span style={{ textAlign: "center" }}><Logo size={20} withWordmark={false} /><div className={s.ostepSub} style={{ marginTop: 6 }}>20px min</div></span><span style={{ textAlign: "center" }}><Logo size={16} withWordmark={false} /><div className={s.ostepSub} style={{ marginTop: 6, color: "#f2777b" }}>too small</div></span></span></div><p className={s.ctxCaption}>Below 20px the pixel grid blurs — use the chip instead.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><Logo size={30} /></div><p className={s.ddText}>Use the mark as shipped, on a dark field with room to breathe.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span style={{ transform: "rotate(12deg)", display: "inline-block" }}><Logo size={40} withWordmark={false} /></span></div><p className={s.ddText}>Don&apos;t rotate, skew or flip the mark. It sits square, always.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span className={s.ologoChip} style={{ width: 52, height: 52, borderRadius: 13 }}><Logo size={32} withWordmark={false} /></span></div><p className={s.ddText}>Use the rounded chip for app tiles and small favicons.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span style={{ filter: "hue-rotate(140deg)", display: "inline-block" }}><Logo size={40} withWordmark={false} /></span></div><p className={s.ddText}>Don&apos;t recolour it. One warm pixel is the entire point.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--logo-grid</td><td>9 × 9</td><td>Pixel grid the ring is drawn on</td></tr>
          <tr><td className={s.tokName}>--logo-pixel</td><td><span className={s.tokSwatch} style={{ background: "#f4f4f5" }} />#F4F4F5</td><td>Ring squares</td></tr>
          <tr><td className={s.tokName}>--logo-accent</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>The one warm pixel (45°)</td></tr>
          <tr><td className={s.tokName}>--logo-chip-bg</td><td><span className={s.tokSwatch} style={{ background: "#1c1c1e" }} />#1C1C1E</td><td>App-icon tile fill</td></tr>
          <tr><td className={s.tokName}>--logo-min</td><td>20px</td><td>Smallest legible mark</td></tr>
          <tr><td className={s.tokName}>--logo-clear</td><td>1 grid unit</td><td>Minimum clear space all sides</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
