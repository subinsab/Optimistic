import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import SkeletonDemo from "./SkeletonDemo";
import SkeletonConfigurator from "./SkeletonConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Skeleton. Dark design system: placeholder shapes on a #16171B fill with a soft left-to-right shimmer (a translucent white gradient sweeping every 1.4s). Primitives — line (11px, radius 5), circle, and box (radius 9) — composed into text blocks, avatars and cards that mirror the real layout. Honours prefers-reduced-motion by dropping the shimmer. Swap to real content the moment it arrives, with no layout shift. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-skel o-skel--line" style="width:40%"></div>
<div class="o-skel o-skel--line"></div>
<div class="o-skel o-skel--line" style="width:78%"></div>

<div class="o-skel o-skel--circle" style="width:40px;height:40px"></div>` },
  { label: "CSS", code: `.o-skel { position: relative; overflow: hidden; background: #16171b; border-radius: 6px; }
.o-skel::after {
  content: ""; position: absolute; inset: 0; transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,.055), transparent);
  animation: shimmer 1.4s ease-in-out infinite;
}
@keyframes shimmer { 100% { transform: translateX(100%); } }
@media (prefers-reduced-motion: reduce) { .o-skel::after { animation: none; } }` },
  { label: "React", code: `import { Skeleton } from "@optimistic/ui";

<Skeleton width="40%" height={15} />
<Skeleton variant="circle" width={40} height={40} />
<Skeleton variant="box" height={96} />

// gate real content behind the same layout
{loading ? <CardSkeleton /> : <Card data={data} />}` },
  { label: "Angular", code: `<o-skeleton width="40%" [height]="15"></o-skeleton>
<o-skeleton variant="circle" [width]="40" [height]="40"></o-skeleton>
<o-skeleton variant="box" [height]="96"></o-skeleton>` },
  { label: "Async / API", code: `// Match the skeleton to the real layout so nothing shifts on load.
function UserCard({ id }) {
  const { data, isLoading } = useUser(id);
  if (isLoading) return (
    <div className="card">
      <div className="row">
        <Skeleton variant="circle" width={38} height={38} />
        <div><Skeleton width={130} /><Skeleton width={84} height={9} /></div>
      </div>
      <Skeleton /><Skeleton width="82%" />
    </div>
  );
  return <RealUserCard user={data} />;   // same box, filled in
}` },
];

export default function SkeletonDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><SkeletonDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><SkeletonConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>variant</td><td>line · circle · box</td><td>The primitive shape</td></tr>
          <tr><td className={s.tokName}>width / height</td><td>number | string</td><td>Match the real element it stands in for</td></tr>
          <tr><td className={s.tokName}>shimmer</td><td>boolean</td><td>The sweeping highlight; on by default</td></tr>
          <tr><td className={s.tokName}>count</td><td>number</td><td>Repeat lines for a text block</td></tr>
          <tr><td className={s.tokName}>reduced-motion</td><td>—</td><td>Drops the shimmer, keeps the shape</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Use a Skeleton when you know the shape of what&apos;s loading. For an unmeasurable or shapeless wait use a Loader; for measurable work use Progress.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 280 }}>
            <div className={s.oskelRow}>
              <div className={`${s.oskel} ${s.oskelCircle}`} style={{ width: 40, height: 40 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                <div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "70%" }} />
                <div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "45%", height: 9 }} />
              </div>
            </div>
            <span className={s.anaMark} style={{ left: "10%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "60%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Shape</span><span className={s.anaDesc}>A primitive sized to the real element.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Shimmer</span><span className={s.anaDesc}>A soft sweep signalling &quot;loading&quot;, not stuck.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div style={{ width: "100%", maxWidth: 200, display: "flex", flexDirection: "column", gap: 9 }}><div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "100%" }} /><div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "80%" }} /></div></div><p className={s.ddText}>Vary line widths so the block reads like real paragraphs.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div style={{ width: "100%", maxWidth: 200, display: "flex", flexDirection: "column", gap: 9 }}><div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "100%" }} /><div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "100%" }} /></div></div><p className={s.ddText}>Don&apos;t make every line full-width. It reads as a solid block.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.oskelRow}><div className={`${s.oskel} ${s.oskelCircle}`} style={{ width: 32, height: 32 }} /><div className={`${s.oskel} ${s.oskelLine}`} style={{ width: 90 }} /></div></div><p className={s.ddText}>Mirror the real layout so nothing jumps when content lands.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span className={s.oloaderRow}><span className={s.oloader} /> Loading…</span></div><p className={s.ddText}>Don&apos;t use a lone spinner where the shape is known. Show structure.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Card</div><div className={s.ctxStage}><div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 9 }}><div className={`${s.oskel} ${s.oskelBox}`} style={{ width: "100%", height: 70 }} /><div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "60%" }} /></div></div><p className={s.ctxCaption}>Media cards while the image and title load.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · List row</div><div className={s.ctxStage}><div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>{[0,1].map(i=><div key={i} className={s.oskelRow}><div className={`${s.oskel} ${s.oskelCircle}`} style={{ width: 30, height: 30 }} /><div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "70%" }} /></div>)}</div></div><p className={s.ctxCaption}>Repeated rows for a loading list or table.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Text block</div><div className={s.ctxStage}><div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}><div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "40%", height: 14 }} /><div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "100%" }} /><div className={`${s.oskel} ${s.oskelLine}`} style={{ width: "88%" }} /></div></div><p className={s.ctxCaption}>Article and detail views before the copy arrives.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--skel-bg</td><td><span className={s.tokSwatch} style={{ background: "#16171b" }} />#16171B</td><td>Placeholder fill</td></tr>
          <tr><td className={s.tokName}>--skel-shimmer</td><td>rgba(255,255,255,.055)</td><td>Sweeping highlight</td></tr>
          <tr><td className={s.tokName}>--skel-speed</td><td>1.4s</td><td>Shimmer period</td></tr>
          <tr><td className={s.tokName}>--skel-line-h</td><td>11px</td><td>Default line height</td></tr>
          <tr><td className={s.tokName}>--skel-radius</td><td>5px line · 9px box</td><td>Corner per shape</td></tr>
          <tr><td className={s.tokName}>--skel-reduced</td><td>no shimmer</td><td>Reduced-motion fallback</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
