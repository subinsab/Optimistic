import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import LoaderDemo from "./LoaderDemo";
import LoaderConfigurator from "./LoaderConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Loader. Dark design system: a spinner ring — #2A2A30 track with a warm #FF7A00 top arc, spinning at 0.7s linear, in three sizes (16/22/34, border 2/2.5/3). Also a three-dot variant that bounces warm dots in sequence. Optional trailing label in #9AA0A8. Used inline in buttons (inherits currentColor) and as a panel overlay. Honours prefers-reduced-motion by slowing right down. role=status. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<span class="o-loader" role="status" aria-label="Loading"></span>

<span class="o-loader-row" role="status">
  <span class="o-loader"></span> Loading your workspace…
</span>

<span class="o-loader-dots" role="status"><span></span><span></span><span></span></span>` },
  { label: "CSS", code: `.o-loader {
  width: 22px; height: 22px; border-radius: 50%;
  border: 2.5px solid #2a2a30; border-top-color: #ff7a00;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .o-loader { animation-duration: 2s; }
}` },
  { label: "React", code: `import { Loader } from "@optimistic/ui";

<Loader size="md" />
<Loader label="Loading your workspace…" />
<Loader variant="dots" />

// inside a button — inherits currentColor
<Button loading>Saving…</Button>` },
  { label: "Angular", code: `<o-loader size="md"></o-loader>
<o-loader label="Loading…"></o-loader>
<o-loader variant="dots"></o-loader>` },
  { label: "Async / API", code: `// Show the loader only after a beat, so fast responses don't flash it.
function useDelayedLoading(active, delay = 250) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!active) return setShow(false);
    const t = setTimeout(() => setShow(true), delay);  // skip quick loads
    return () => clearTimeout(t);
  }, [active]);
  return show;
}

const loading = useDelayedLoading(isFetching);
return loading ? <Loader label="Fetching…" /> : <Results data={data} />;` },
];

export default function LoaderDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><LoaderDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><LoaderConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>variant</td><td>spinner · dots</td><td>Ring, or three bouncing dots</td></tr>
          <tr><td className={s.tokName}>size</td><td>S · M · L</td><td>16 / 22 / 34px (spinner)</td></tr>
          <tr><td className={s.tokName}>label</td><td>string</td><td>Trailing text; also the accessible name</td></tr>
          <tr><td className={s.tokName}>role</td><td>status</td><td>Announced politely to assistive tech</td></tr>
          <tr><td className={s.tokName}>reduced-motion</td><td>—</td><td>Slows the animation right down</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Use a Loader for an indeterminate wait. When you know how far along it is, show Progress; when the shape of the result is known, prefer a Skeleton.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <span className={s.oloaderRow}><span className={`${s.oloader} ${s.oloaderLg}`} /> Loading…</span>
            <span className={s.anaMark} style={{ left: "14%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "70%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Spinner</span><span className={s.anaDesc}>Track ring with one warm rotating arc.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Label</span><span className={s.anaDesc}>Optional text, doubling as the accessible name.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span className={s.oloaderRow}><span className={s.oloader} /> Loading results…</span></div><p className={s.ddText}>Say what is loading. A labelled spinner reassures.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div style={{ display: "flex", gap: 16 }}><span className={s.oloader} /><span className={s.oloader} /><span className={s.oloader} /></div></div><p className={s.ddText}>Don&apos;t scatter spinners across a page. One wait, one loader.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><button className={`${s.obtn} ${s.m} ${s.vWarm}`} style={{ pointerEvents: "none" }}><span className={`${s.oloader} ${s.oloaderSm}`} style={{ borderTopColor: "#1a0e04", borderColor: "rgba(26,14,4,.3)", borderTopWidth: 2 }} /> Saving…</button></div><p className={s.ddText}>Put the loader inside the action that&apos;s working, and disable it.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.oloaderOverlay} style={{ padding: 14 }}><span className={`${s.oloader} ${s.oloaderSm}`} /></div></div><p className={s.ddText}>Don&apos;t block a whole screen for a tiny fetch. Prefer a Skeleton.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Button</div><div className={s.ctxStage}><button className={`${s.obtn} ${s.m} ${s.vPrimary}`} style={{ pointerEvents: "none" }}><span className={`${s.oloader} ${s.oloaderSm}`} style={{ borderTopColor: "#121212", borderColor: "rgba(18,18,18,.25)", borderTopWidth: 2 }} /> Submitting</button></div><p className={s.ctxCaption}>Inline in a button during an async submit.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Panel</div><div className={s.ctxStage}><div className={s.oloaderOverlay} style={{ width: "100%", padding: 22 }}><span className={s.oloaderRow}><span className={s.oloader} /> Loading…</span></div></div><p className={s.ctxCaption}>Centered in a panel while its content loads.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Typing</div><div className={s.ctxStage}><span className={s.oloaderDots}><span /><span /><span /></span></div><p className={s.ctxCaption}>Dots for a chat &quot;typing&quot; or streaming response.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--ldr-size</td><td>16 / 22 / 34px</td><td>Spinner diameters</td></tr>
          <tr><td className={s.tokName}>--ldr-track</td><td><span className={s.tokSwatch} style={{ background: "#2a2a30" }} />#2A2A30</td><td>Ring track</td></tr>
          <tr><td className={s.tokName}>--ldr-arc</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>Rotating warm arc</td></tr>
          <tr><td className={s.tokName}>--ldr-speed</td><td>0.7s linear</td><td>Rotation period</td></tr>
          <tr><td className={s.tokName}>--ldr-label</td><td><span className={s.tokSwatch} style={{ background: "#9aa0a8" }} />#9AA0A8</td><td>Trailing label</td></tr>
          <tr><td className={s.tokName}>--ldr-reduced</td><td>2s</td><td>Slowed period under reduced-motion</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
