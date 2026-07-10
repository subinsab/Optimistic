import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import IllustrationDemo from "./IllustrationDemo";
import IllustrationConfigurator from "./IllustrationConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import { Illustration, SCENE_NAMES } from "./illustrationScenes";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Illustration — a generic, SINGLE-COLOUR line-art set for empty, error and success states. Each scene is drawn on one 200×160 box, stroked with currentColor (fill none), round line-caps and joins — the same line language as the icons, scaled up. One colour only: no accent, no fill, so a scene reads on any surface (light strokes on dark, dark strokes on light). Ship ~20 generic scenes: not-found (404), no-results, empty, error, success, offline, no-messages, no-notifications, no-files, no-data, no-images, upload, no-access, maintenance, coming-soon, no-connection, cart-empty, welcome, complete, no-comments. Three sizes (80/120/160). Compose inside an empty state (illustration + title + text + action). Deliver React + inline SVG + CSS.");

const CODE = [
  { label: "HTML", code: `<figure class="o-illus" aria-hidden="true">
  <svg viewBox="0 0 200 160" width="120" height="96"
       fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round">
    <circle cx="100" cy="80" r="40" />
    <polyline points="82,82 95,96 120,64" />   <!-- e.g. success -->
  </svg>
</figure>` },
  { label: "CSS", code: `.o-illus svg {
  display: block;
  fill: none;
  stroke: currentColor;          /* single colour — inherits text colour */
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* one asset, either surface — currentColor does the theming */
.panel--dark  .o-illus { color: #e7e9ee; }
.panel--light .o-illus { color: #1a1a1a; }` },
  { label: "React", code: `import { Illustration } from "@optimistic/ui";

<Illustration name="not-found" size={160} />
<Illustration name="no-results" size={120} />

// composed into an empty state
<EmptyState
  illustration={<Illustration name="empty" />}
  title="No projects yet"
  action={<Button variant="warm">New project</Button>}
/>` },
  { label: "Angular", code: `<o-illustration name="not-found" [size]="160"></o-illustration>
<o-illustration name="no-results" [size]="120"></o-illustration>
<o-illustration name="empty"></o-illustration>` },
  { label: "Async / API", code: `// An illustration is presentational — no state, no events. It's inline SVG,
// single colour, so it inherits currentColor and needs no image request and
// no second asset per theme.
//
// Keep the set small and generic: ~20 scenes cover most empty, error and
// success moments — reuse them rather than drawing a scene per screen.
//
// Decorative by default (aria-hidden). When the illustration IS the message
// (a full-page 404), give the figure role="img" and an aria-label.
<figure role="img" aria-label="Page not found"> … </figure>` },
];

/* anatomy: the scene inside its bounding box, single colour */
function AnatomyIllus() {
  return (
    <div style={{ position: "relative", width: 200, color: "#e7e9ee" }}>
      <svg viewBox="0 0 200 160" width={200} height={160} style={{ position: "absolute", inset: 0 }} aria-hidden="true">
        <rect x={1} y={1} width={198} height={158} rx={10} fill="none" stroke="#5b8cff" strokeWidth={1} strokeDasharray="4 4" opacity={0.5} />
      </svg>
      <div style={{ position: "relative" }}><Illustration name="not-found" size={200} /></div>
    </div>
  );
}

export default function IllustrationDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><IllustrationDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><IllustrationConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>name</td><td>string</td><td>One of {SCENE_NAMES.length} generic scenes (not-found, no-results…)</td></tr>
          <tr><td className={s.tokName}>size</td><td>number = 120</td><td>Rendered px; the scene is a 200×160 box</td></tr>
          <tr><td className={s.tokName}>title</td><td>string</td><td>Present ⇒ role=img &amp; labelled; absent ⇒ aria-hidden</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>An illustration holds no state and fires no events — it&apos;s inline SVG, one colour. Because every stroke is <strong>currentColor</strong>, the same scene reads on a dark or a light surface with no second asset. Keep the set small: {SCENE_NAMES.length} generic scenes cover most empty, error and success moments.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 240 }}>
            <div style={{ display: "flex", justifyContent: "center" }}><AnatomyIllus /></div>
            <span className={s.anaMark} style={{ left: "4%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 40 }} /></span>
            <span className={s.anaMark} style={{ left: "42%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 96 }} /></span>
            <span className={s.anaMark} style={{ left: "76%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 70 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Bounding box</span><span className={s.anaDesc}>Every scene is composed inside the same 200×160 frame.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Stroke</span><span className={s.anaDesc}>2px in currentColor — one colour, never filled.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Round cap &amp; join</span><span className={s.anaDesc}>Soft ends match the icon family at a larger scale.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span style={{ display: "inline-flex", gap: 22 }}><span style={{ color: "#e7e9ee", display: "inline-flex" }}><Illustration name="success" size={72} /></span><span style={{ background: "#f2f2ef", borderRadius: 8, padding: 6, color: "#1a1a1a", display: "inline-flex" }}><Illustration name="success" size={72} /></span></span></div><p className={s.ddText}>Draw once in currentColor and let the surface decide. One asset, both themes.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><svg viewBox="0 0 200 160" width={72} height={58} fill="#e7e9ee"><path d="M100 40 L150 126 H50 Z" /></svg></div><p className={s.ddText}>Don&apos;t fill the shapes solid. Illustrations are line art, like the icons.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span style={{ color: "#e7e9ee", display: "inline-flex" }}><Illustration name="not-found" size={72} /></span></div><p className={s.ddText}>Reach for a generic scene. {SCENE_NAMES.length} cover most empty, error and success states.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><svg viewBox="0 0 200 160" width={72} height={58} fill="none" strokeWidth={2} strokeLinecap="round"><circle cx={100} cy={80} r={40} stroke="#f472b6" /><path d="M100 58 L110 80 L100 102 L90 80 Z" stroke="#7dd3fc" /></svg></div><p className={s.ddText}>Don&apos;t colour parts individually. Illustrations are a single colour.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Empty state</div><div className={s.ctxStage}><div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#e7e9ee" }}><Illustration name="empty" size={84} /><span style={{ fontSize: "0.82rem", fontWeight: 500 }}>No projects yet</span></div></div><p className={s.ctxCaption}>Anchoring a first-run, zero-data screen.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · 404 page</div><div className={s.ctxStage}><div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#e7e9ee" }}><Illustration name="not-found" size={84} /><span style={{ fontSize: "0.82rem", fontWeight: 500 }}>Page not found</span></div></div><p className={s.ctxCaption}>Softening a dead end without alarming the reader.</p></div>
          <div className={s.ctxCard} style={{ background: "#f2f2ef", borderColor: "#dcdcd6" }}><div className={s.ctxKicker} style={{ color: "#6a6a63" }}>C · On a light surface</div><div className={s.ctxStage} style={{ background: "#f2f2ef" }}><span style={{ color: "#1a1a1a", display: "inline-flex" }}><Illustration name="no-results" size={84} /></span></div><p className={s.ctxCaption} style={{ color: "#6a6a63" }}>The same scene, dark strokes — no separate light asset.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--illus-box</td><td>200 × 160</td><td>The viewBox every scene is drawn in</td></tr>
          <tr><td className={s.tokName}>--illus-stroke</td><td>2px</td><td>Line weight, matching the icon family</td></tr>
          <tr><td className={s.tokName}>--illus-cap</td><td>round</td><td>Line-cap and line-join</td></tr>
          <tr><td className={s.tokName}>--illus-color</td><td>currentColor</td><td>Single colour — inherits the surface&apos;s text colour</td></tr>
          <tr><td className={s.tokName}>--illus-size</td><td>80 · 120 · 160</td><td>The three rendered steps</td></tr>
          <tr><td className={s.tokName}>--illus-count</td><td>{SCENE_NAMES.length} scenes</td><td>Generic empty / error / success states</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
