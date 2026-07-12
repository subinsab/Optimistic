import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import AccordionDemo from "./AccordionDemo";
import AccordionConfigurator from "./AccordionConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Accordion. Dark design system: collapsible sections with a full-width header button (mono index, title, a chevron that rotates 90° when open) and a body that expands via a grid-rows 0fr→1fr transition. Two layouts — joined (connected rows in one #0E0F12 card with #1A1A1A hairlines) and separate (each section its own bordered card with gaps). Single-open by default; an allow-multiple option. aria-expanded, honours reduced-motion. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-acc o-acc--joined">
  <div class="o-acc__item is-open">
    <button class="o-acc__head" aria-expanded="true">
      <span class="o-acc__num">01</span> What is an optimistic update?
      <svg class="o-acc__chevron">…</svg>
    </button>
    <div class="o-acc__body"><div><div class="o-acc__inner">…</div></div></div>
  </div>
</div>` },
  { label: "CSS", code: `.o-acc__head {
  display: flex; align-items: center; gap: 12px; width: 100%;
  padding: 15px 16px; background: none; border: 0; cursor: pointer; color: #eceef1;
}
.o-acc__chevron { margin-left: auto; transition: transform .22s; }
.o-acc__item.is-open .o-acc__chevron { transform: rotate(90deg); }
/* smooth height with grid rows */
.o-acc__body { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .25s ease; }
.o-acc__item.is-open .o-acc__body { grid-template-rows: 1fr; }
.o-acc__body > div { overflow: hidden; }` },
  { label: "React", code: `import { Accordion } from "@optimistic/ui";

<Accordion variant="joined" defaultOpen={0}>
  <Accordion.Item title="What is an optimistic update?">…</Accordion.Item>
  <Accordion.Item title="How is spacing scaled?">…</Accordion.Item>
</Accordion>

<Accordion variant="separate" allowMultiple>…</Accordion>` },
  { label: "Angular", code: `<o-accordion variant="joined" [defaultOpen]="0">
  <o-accordion-item title="What is an optimistic update?">…</o-accordion-item>
  <o-accordion-item title="How is spacing scaled?">…</o-accordion-item>
</o-accordion>` },
  { label: "Async / API", code: `// Load a section's body only when it first opens (lazy panels).
function Section({ id, title }) {
  const [open, setOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["section", id],
    queryFn: () => fetchSection(id),
    enabled: open,                       // don't fetch until expanded
  });
  return (
    <Accordion.Item title={title} onToggle={setOpen}>
      {data ? <Body {...data} /> : <Skeleton count={3} />}
    </Accordion.Item>
  );
}` },
];

export default function AccordionDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const Chevron = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>);
  const item = (num: string, q: string, openState: boolean) => (
    <div key={q} className={`${s.oaccItem} ${openState ? s.oaccOpen : ""}`} style={{ pointerEvents: "none" }}>
      <span className={s.oaccHead}><span className={s.oaccNum}>{num}</span>{q}<span className={s.oaccChevron}><Chevron /></span></span>
      <div className={s.oaccBody}><div><div className={s.oaccBodyInner}>A short answer, revealed when this section is open.</div></div></div>
    </div>
  );
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><AccordionDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><AccordionConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>variant</td><td>joined · separate</td><td>Connected rows, or discrete cards</td></tr>
          <tr><td className={s.tokName}>allowMultiple</td><td>boolean</td><td>Keep several sections open at once</td></tr>
          <tr><td className={s.tokName}>defaultOpen</td><td>number</td><td>Index open on first render</td></tr>
          <tr><td className={s.tokName}>Item.title</td><td>ReactNode</td><td>The always-visible header</td></tr>
          <tr><td className={s.tokName}>Enter / Space</td><td>—</td><td>Toggle the focused section</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>An Accordion hides secondary detail until asked for. For peer views use Tabs; for a step-by-step flow use a Stepper.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 340 }}>
            <div className={`${s.oacc} ${s.oaccJoined}`}>{item("01", "Open section", true)}{item("02", "Closed section", false)}</div>
            <span className={s.anaMark} style={{ left: "10%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "50%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "90%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Index</span><span className={s.anaDesc}>Optional mono number for ordered sets.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Header</span><span className={s.anaDesc}>Full-width button; the whole row toggles.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Chevron</span><span className={s.anaDesc}>Rotates 90° to show open state.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={`${s.oacc} ${s.oaccJoined}`} style={{ maxWidth: 220 }}>{item("01", "Billing", true)}</div></div><p className={s.ddText}>Use it for secondary detail — FAQs, settings groups, fine print.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={`${s.oacc} ${s.oaccSeparate}`} style={{ maxWidth: 220, gap: 6 }}>{["A","B"].map(q=>item("", q, false))}</div></div><p className={s.ddText}>Don&apos;t hide primary content behind a click. Keep essentials visible.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={`${s.oacc} ${s.oaccJoined}`} style={{ maxWidth: 220 }}>{item("01", "First truth", true)}{item("02", "Second", false)}</div></div><p className={s.ddText}>Keep one section open at a time so focus stays on one truth.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={`${s.oacc} ${s.oaccJoined}`} style={{ maxWidth: 220 }}>{item("", "One lonely row", false)}</div></div><p className={s.ddText}>Don&apos;t wrap a single section in an accordion. Just show it.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · FAQ</div><div className={s.ctxStage}><div className={`${s.oacc} ${s.oaccJoined}`} style={{ width: "100%" }}>{item("01", "How do refunds work?", false)}{item("02", "Is my data secure?", false)}</div></div><p className={s.ctxCaption}>Frequently-asked questions, one answer at a time.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Settings</div><div className={s.ctxStage}><div className={`${s.oacc} ${s.oaccSeparate}`} style={{ width: "100%" }}>{item("", "Notifications", true)}</div></div><p className={s.ctxCaption}>Grouped settings as separate, collapsible cards.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Order summary</div><div className={s.ctxStage}><div className={`${s.oacc} ${s.oaccJoined}`} style={{ width: "100%" }}>{item("", "Shipping details", false)}</div></div><p className={s.ctxCaption}>Progressive disclosure in a checkout or form.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--acc-head-pad</td><td>15px 16px</td><td>Header padding</td></tr>
          <tr><td className={s.tokName}>--acc-card</td><td><span className={s.tokSwatch} style={{ background: "#0e0f12" }} />#0E0F12</td><td>Section surface</td></tr>
          <tr><td className={s.tokName}>--acc-divider</td><td><span className={s.tokSwatch} style={{ background: "#1a1a1a" }} />#1A1A1A</td><td>Hairline in joined mode</td></tr>
          <tr><td className={s.tokName}>--acc-hover</td><td><span className={s.tokSwatch} style={{ background: "#131418" }} />#131418</td><td>Header hover fill</td></tr>
          <tr><td className={s.tokName}>--acc-chevron</td><td>90° · .22s</td><td>Open rotation</td></tr>
          <tr><td className={s.tokName}>--acc-ease</td><td>grid-rows .25s</td><td>Body expand transition</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
