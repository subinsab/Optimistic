import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import LinkDemo from "./LinkDemo";
import LinkConfigurator from "./LinkConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Link. Dark design system: inline links are warm (#FF9D45) with a translucent warm underline that solidifies on hover; a quiet tone uses #CFD3DA text and a #333336 underline for secondary trails. Standalone links drop the underline, add weight and a trailing arrow that nudges 3px right on hover. External links carry a small box-arrow glyph and rel='noreferrer noopener'. 3px warm focus-visible ring. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<a href="/principles" class="o-link">design principles</a>
<a href="/changelog" class="o-link o-link--quiet">changelog</a>

<a href="/components" class="o-link o-link--standalone">
  Browse all components
  <svg class="o-link__arrow">…</svg>
</a>

<a href="https://figma.com" class="o-link o-link--external"
   target="_blank" rel="noreferrer noopener">Figma file</a>` },
  { label: "CSS", code: `.o-link {
  color: #ff9d45; text-decoration: none;
  border-bottom: 1px solid rgba(255,122,0,.35);
  transition: color .18s, border-color .18s;
}
.o-link:hover { color: #ffb066; border-bottom-color: #ff9d45; }
.o-link--quiet { color: #cfd3da; border-bottom-color: #333336; }
.o-link--standalone {
  border-bottom: 0; font-weight: 500;
  display: inline-flex; align-items: center; gap: 6px;
}
.o-link--standalone:hover .o-link__arrow { transform: translateX(3px); }
.o-link:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(255,122,0,.32); }` },
  { label: "React", code: `import { Link } from "@optimistic/ui";

<Link href="/principles">design principles</Link>
<Link href="/changelog" tone="quiet">changelog</Link>

<Link href="/components" standalone>Browse all components</Link>
<Link href="https://figma.com" external>Figma file</Link>

// framework routing: pass the router's component through
<Link href="/pricing" as={NextLink}>Pricing</Link>` },
  { label: "Angular", code: `<a oLink routerLink="/principles">design principles</a>
<a oLink routerLink="/changelog" tone="quiet">changelog</a>
<a oLink routerLink="/components" standalone>Browse all components</a>
<a oLink href="https://figma.com" external>Figma file</a>` },
  { label: "Async / API", code: `// A link is a promise: never route to a dead end. Prefetch on intent
// so the destination is warm by the time the click lands.
function SmartLink({ href, children }) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onMouseEnter={() => router.prefetch(href)}   // hover = likely click
      onFocus={() => router.prefetch(href)}        // keyboard, too
    >
      {children}
    </Link>
  );
}

// External links always carry rel to close the tab-nabbing hole:
// rel="noreferrer noopener" is set for you when external is passed.` },
];

export default function LinkDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const Arrow = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M8 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>);
  const Ext = () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3h7v7M13 3L6 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>);
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer"><i>◇</i> Open the Figma file ↗</a>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><LinkDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><LinkConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>href</td><td>string</td><td>Destination; renders a real anchor</td></tr>
          <tr><td className={s.tokName}>tone</td><td>default · quiet</td><td>Warm primary, or grey secondary trail</td></tr>
          <tr><td className={s.tokName}>standalone</td><td>boolean</td><td>Drops the underline, adds a nudging arrow</td></tr>
          <tr><td className={s.tokName}>external</td><td>boolean</td><td>Adds the glyph, target and rel=&quot;noreferrer noopener&quot;</td></tr>
          <tr><td className={s.tokName}>as</td><td>ElementType</td><td>Swap in a router Link for client navigation</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>A link navigates; it never performs an action. If a click submits, deletes or toggles, use a Button styled as a link, not a link.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <span className={`${s.olink} ${s.olinkStandalone}`} style={{ fontSize: "1rem", pointerEvents: "none" }}>Browse components<Arrow /></span>
            <span className={s.anaMark} style={{ left: "20%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "80%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "50%", top: 34 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 14 }} /><b className={s.anaBadge}>3</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Label</span><span className={s.anaDesc}>The destination named as text, warm or quiet.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Affordance</span><span className={s.anaDesc}>Underline inline, or a trailing arrow when standalone.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Focus ring</span><span className={s.anaDesc}>3px warm ring on focus-visible, keyboard only.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span className={s.olinkProse} style={{ fontSize: "0.85rem" }}>See the <span className={s.olink}>colour system</span> for the full scale.</span></div><p className={s.ddText}>Wrap the words that name the destination. The link text is the label.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span className={s.olinkProse} style={{ fontSize: "0.85rem" }}>For the colour system, <span className={s.olink}>click here</span>.</span></div><p className={s.ddText}>Don&apos;t link &quot;click here&quot;. It fails screen readers and says nothing scanned alone.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span className={`${s.olink} ${s.olinkStandalone} ${s.olinkExternal}`} style={{ pointerEvents: "none" }}>Open in Figma<Ext /></span></div><p className={s.ddText}>Mark links that leave the site so a new tab is never a surprise.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span className={`${s.obtn} ${s.sm} ${s.vWarm}`} style={{ pointerEvents: "none" }}>Learn more</span></div><p className={s.ddText}>Don&apos;t dress navigation as a solid button. A link goes; a button does.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · In prose</div><div className={s.ctxStage}><span className={s.olinkProse} style={{ fontSize: "0.86rem" }}>Every token is documented. Start with the <span className={s.olink}>foundations</span>, then the <span className={`${s.olink} ${s.olinkQuiet}`}>components</span>.</span></div><p className={s.ctxCaption}>Inline links stay in the reading flow; quiet tone marks the lesser of two.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Card footer</div><div className={s.ctxStage}><div style={{ width: "100%" }}><span className={s.mockTitle} style={{ width: "58%" }} /><span className={s.mockLine} style={{ width: "90%", marginTop: 8 }} /><a className={`${s.olink} ${s.olinkStandalone}`} style={{ marginTop: 12, pointerEvents: "none" }}>Read more<Arrow /></a></div></div><p className={s.ctxCaption}>A standalone link ends a card, its arrow pointing to what is next.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Footer column</div><div className={s.ctxStage}><div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{["Privacy", "Terms", "Status"].map(t => <span key={t} className={`${s.olink} ${s.olinkQuiet}`} style={{ pointerEvents: "none", width: "fit-content" }}>{t}</span>)}</div></div><p className={s.ctxCaption}>Quiet links stack in footers where they support, not lead.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--link-color</td><td><span className={s.tokSwatch} style={{ background: "#ff9d45" }} />#FF9D45</td><td>Default inline link text</td></tr>
          <tr><td className={s.tokName}>--link-underline</td><td>rgba(255,122,0,.35)</td><td>Resting underline, solid on hover</td></tr>
          <tr><td className={s.tokName}>--link-quiet</td><td><span className={s.tokSwatch} style={{ background: "#cfd3da" }} />#CFD3DA</td><td>Secondary tone text</td></tr>
          <tr><td className={s.tokName}>--link-quiet-line</td><td><span className={s.tokSwatch} style={{ background: "#333336" }} />#333336</td><td>Quiet underline</td></tr>
          <tr><td className={s.tokName}>--link-arrow</td><td>3px nudge · .18s</td><td>Standalone arrow travel on hover</td></tr>
          <tr><td className={s.tokName}>--link-focus</td><td>rgba(255,122,0,.32)</td><td>3px focus-visible ring</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
