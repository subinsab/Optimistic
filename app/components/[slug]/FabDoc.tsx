import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import FabDemo from "./FabDemo";
import FabConfigurator from "./FabConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic FAB (floating action button). Dark design system: a 56px warm #FF7A00 circle with a dark glyph and a soft warm shadow, floating bottom-right for a screen's one primary verb; hover lifts, press scales. A small 44px size, an extended pill variant (icon + label), and a speed-dial that fans out mini secondary actions (44px #16171B) with labels — the plus rotates 45° to a close. One FAB per screen. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<button class="o-fab" aria-label="New project"><PlusIcon /></button>

<button class="o-fab o-fab--extended"><PlusIcon /> New project</button>` },
  { label: "CSS", code: `.o-fab {
  display: grid; place-items: center; width: 56px; height: 56px; border-radius: 50%;
  background: #ff7a00; color: #1a0e04; border: 0; cursor: pointer;
  box-shadow: 0 10px 26px rgba(255,122,0,.3);
  transition: transform .15s, filter .15s;
}
.o-fab:hover { filter: brightness(1.06); transform: translateY(-1px); }
.o-fab:active { transform: scale(.96); }
.o-fab--extended { width: auto; height: 52px; border-radius: 999px; padding: 0 22px; gap: 10px; }` },
  { label: "React", code: `import { FAB } from "@optimistic/ui";

<FAB icon={<Plus />} aria-label="New project" onClick={create} />
<FAB icon={<Plus />} label="New project" />        // extended

<FAB.SpeedDial icon={<Plus />}>
  <FAB.Action icon={<Doc />} label="New doc" onClick={newDoc} />
  <FAB.Action icon={<Upload />} label="Upload" onClick={upload} />
</FAB.SpeedDial>` },
  { label: "Angular", code: `<o-fab icon="plus" aria-label="New project" (click)="create()"></o-fab>
<o-fab icon="plus" label="New project"></o-fab>

<o-fab-speed-dial icon="plus">
  <o-fab-action icon="doc" label="New doc" (click)="newDoc()"></o-fab-action>
</o-fab-speed-dial>` },
  { label: "Async / API", code: `// Keep it clear of content and honour the safe area on mobile.
<button
  class="o-fab"
  style={{
    position: "fixed",
    right: "max(20px, env(safe-area-inset-right))",
    bottom: "max(20px, env(safe-area-inset-bottom))",
  }}
  onClick={create}
  aria-label="New project"
>
  <Plus />
</button>

// Hide it on scroll-down, reveal on scroll-up, so it never covers a read.` },
];

export default function FabDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const Plus = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>);
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><FabDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><FabConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>icon</td><td>ReactNode</td><td>The single primary glyph</td></tr>
          <tr><td className={s.tokName}>label</td><td>string</td><td>Turns it into the extended pill</td></tr>
          <tr><td className={s.tokName}>size</td><td>regular · sm</td><td>56 / 44px circle</td></tr>
          <tr><td className={s.tokName}>SpeedDial</td><td>Action[]</td><td>Fans out mini secondary actions</td></tr>
          <tr><td className={s.tokName}>aria-label</td><td>string</td><td>Required — the icon needs a name</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>One FAB per screen, for its single most important verb. For inline or multiple actions use a Button; for a menu of actions use a Menu.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <button className={s.ofab} style={{ pointerEvents: "none" }} aria-label="Add"><Plus /></button>
            <span className={s.anaMark} style={{ left: "50%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "88%", top: 62 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 14 }} /><b className={s.anaBadge}>2</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Glyph</span><span className={s.anaDesc}>One verb, dark on the warm circle.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Shadow</span><span className={s.anaDesc}>A soft warm lift, floating above content.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><button className={s.ofab} style={{ pointerEvents: "none" }} aria-label="Add"><Plus /></button></div><p className={s.ddText}>One warm FAB for the screen&apos;s single most important action.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div style={{ display: "flex", gap: 12 }}><button className={`${s.ofab} ${s.ofabSm}`} style={{ pointerEvents: "none" }} aria-label="a"><Plus /></button><button className={`${s.ofab} ${s.ofabSm}`} style={{ pointerEvents: "none" }} aria-label="b"><Plus /></button></div></div><p className={s.ddText}>Don&apos;t float two FABs. One primary verb per screen.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><button className={`${s.ofab} ${s.ofabExt}`} style={{ pointerEvents: "none" }}><Plus /> Create</button></div><p className={s.ddText}>Use the extended pill on empty states, where a label helps.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><button className={s.ofab} style={{ pointerEvents: "none", background: "#16171b", color: "#9aa0a8" }} aria-label="x"><Plus /></button></div><p className={s.ddText}>Don&apos;t make it grey. The FAB is the one warm light.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Bottom-right</div><div className={s.ctxStage}><div style={{ position: "relative", width: "100%", height: 80, border: "1px solid #1a1a1a", borderRadius: 8 }}><button className={`${s.ofab} ${s.ofabSm}`} style={{ position: "absolute", right: 10, bottom: 10, pointerEvents: "none" }} aria-label="Add"><Plus /></button></div></div><p className={s.ctxCaption}>Pinned bottom-right, clear of the content.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Empty state</div><div className={s.ctxStage}><button className={`${s.ofab} ${s.ofabExt}`} style={{ pointerEvents: "none" }}><Plus /> First project</button></div><p className={s.ctxCaption}>The extended FAB anchoring a zero-data screen.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Speed dial</div><div className={s.ctxStage}><div className={s.ofabStack} style={{ pointerEvents: "none" }}><button className={`${s.ofab} ${s.ofabSm} ${s.ofabOpen}`} aria-label="Add"><Plus /></button><button className={`${s.ofabMini}`} style={{ width: 38, height: 38 }} aria-label="a"><Plus /></button></div></div><p className={s.ctxCaption}>Fanning out a few related creation actions.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--fab-size</td><td>56px · 44px</td><td>Regular and small circle</td></tr>
          <tr><td className={s.tokName}>--fab-bg</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00</td><td>The one warm surface</td></tr>
          <tr><td className={s.tokName}>--fab-text</td><td><span className={s.tokSwatch} style={{ background: "#1a0e04" }} />#1A0E04</td><td>Dark glyph</td></tr>
          <tr><td className={s.tokName}>--fab-shadow</td><td>0 10px 26px /.3</td><td>Warm lift</td></tr>
          <tr><td className={s.tokName}>--fab-mini</td><td>44px · #16171B</td><td>Speed-dial action</td></tr>
          <tr><td className={s.tokName}>--fab-offset</td><td>20px + safe-area</td><td>Distance from the edge</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
