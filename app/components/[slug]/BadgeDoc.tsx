import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import BadgeDemo from "./BadgeDemo";
import BadgeConfigurator from "./BadgeConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Badge. Dark design system: pill, mono 0.62rem uppercase, padding 4/8, radius 999. Variants: neutral (#1A1A1F/#CFD3DA), brand (warm tint #FF7A00), success #1FA35C, error #EB4A4F, info #3E63DD — each a translucent tint fill + matching border + light text; plus solid warm. Optional leading dot (currentColor). Count variant = min-width 18px warm circle, white text, hides at 0, caps at 99+. Anchored count sits top-right of an element with a 2px page-colour ring. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<span class="o-badge o-badge--success has-dot">ACTIVE</span>
<span class="o-badge o-badge--count">5</span>

<span class="o-badge-anchor">
  <BellIcon />
  <span class="o-badge o-badge--count">5</span>
</span>` },
  { label: "CSS", code: `.o-badge {
  display: inline-flex; align-items: center; gap: 5px;
  font: 500 .62rem/1 var(--mono); letter-spacing: .06em;
  padding: 4px 8px; border-radius: 999px; border: 1px solid transparent;
}
.o-badge--success {
  background: rgba(31,163,92,.16); color: #4fce8b;
  border-color: rgba(31,163,92,.4);
}
.o-badge.has-dot::before {
  content: ""; width: 5px; height: 5px; border-radius: 50%;
  background: currentColor;
}` },
  { label: "React", code: `import { Badge } from "@optimistic/ui";

<Badge variant="success" dot>Active</Badge>
<Badge variant="error">Down</Badge>
<Badge count={unread} max={99} />        // hides at 0, caps 99+

<Badge count={unread} anchor>
  <BellIcon />
</Badge>` },
  { label: "Angular", code: `<o-badge variant="success" dot>Active</o-badge>
<o-badge [count]="unread" [max]="99"></o-badge>` },
  { label: "Async / API", code: `// A count badge reflects live server state (poll or socket).
useEffect(() => {
  const es = new EventSource("/api/notifications/stream");
  es.onmessage = (e) => setUnread(JSON.parse(e.data).count);
  return () => es.close();
}, []);

// <Badge count={unread} anchor><BellIcon /></Badge>
// Renders nothing at 0, "99+" past the cap — no layout shift.` },
];

export default function BadgeDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><BadgeDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><BadgeConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>variant</td><td>neutral·brand·success·error·info·warning·solid·outline</td><td>Semantic role and colour</td></tr>
          <tr><td className={s.tokName}>size</td><td>S · M · L</td><td>Pill scale; M is the default</td></tr>
          <tr><td className={s.tokName}>dot</td><td>boolean</td><td>Leading status dot in currentColor</td></tr>
          <tr><td className={s.tokName}>count / max</td><td>number / number</td><td>Numeric badge; hides at 0, caps at max+</td></tr>
          <tr><td className={s.tokName}>anchor</td><td>boolean</td><td>Positions the count top-right of children</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Badges are read-only. They label or count; they are never a click target — wrap them in a Button or Link if action is needed.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <span className={`${s.obadge} ${s.bgSuccess} ${s.bgDot}`} style={{ fontSize: "0.8rem", padding: "7px 13px" }}>ACTIVE</span>
            <span className={s.anaMark} style={{ left: "16%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "62%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "50%", top: 34 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 14 }} /><b className={s.anaBadge}>3</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Dot</span><span className={s.anaDesc}>Optional status dot in the text colour.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Label</span><span className={s.anaDesc}>Mono, uppercase, one short word.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Container</span><span className={s.anaDesc}>Pill: tinted fill + hairline border per variant.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span className={`${s.obadge} ${s.bgSuccess} ${s.bgDot}`}>PAID</span></div><p className={s.ddText}>One short word, uppercase. The status reads in a glance.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span className={`${s.obadge} ${s.bgSuccess}`} style={{ textTransform: "none" }}>Payment received successfully</span></div><p className={s.ddText}>Don&apos;t put a sentence in a badge. Long copy belongs in a Callout.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span className={s.bgAnchor}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" stroke="#cfd3da" strokeWidth="1.6" strokeLinejoin="round" /></svg><span className={`${s.obadge} ${s.bgCount}`}>9</span></span></div><p className={s.ddText}>Anchor a count to the thing it counts; hide it at zero.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span style={{ display: "flex", gap: 6 }}><span className={`${s.obadge} ${s.bgWarm}`}>NEW</span><span className={`${s.obadge} ${s.bgSuccess}`}>HOT</span><span className={`${s.obadge} ${s.bgError}`}>SALE</span></span></div><p className={s.ddText}>Don&apos;t stack many coloured badges. Competing accents lose all meaning.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Table cell</div><div className={s.ctxStage}><div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>{[["Invoice 4821", "bgSuccess", "PAID"], ["Invoice 4822", "bgWarm", "DUE"], ["Invoice 4823", "bgError", "LATE"]].map(([r, v, t]) => <span key={r} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span className={s.otTitle} style={{ fontSize: "0.8rem" }}>{r}</span><span className={`${s.obadge} ${s[v as keyof typeof s]}`}>{t}</span></span>)}</div></div><p className={s.ctxCaption}>Status per row, right-aligned, one colour system across the table.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Nav count</div><div className={s.ctxStage}><span style={{ display: "flex", alignItems: "center", gap: 8 }}><span className={s.otTitle} style={{ fontSize: "0.85rem" }}>Inbox</span><span className={`${s.obadge} ${s.bgCount}`}>12</span></span></div><p className={s.ctxCaption}>Unread counts beside a nav label, capped and hidden at zero.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · On an avatar</div><div className={s.ctxStage}><span className={s.bgAnchor}><span style={{ width: 36, height: 36, borderRadius: "50%", background: "#26262b", display: "grid", placeItems: "center", color: "#9aa0a8", fontSize: "0.8rem" }}>AL</span><span className={`${s.obadge} ${s.bgCount}`} style={{ background: "#1fa35c", minWidth: 12, height: 12, padding: 0 }} /></span></div><p className={s.ctxCaption}>A bare dot shows presence without a number.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--bdg-pad</td><td>4px 8px</td><td>Label badge padding</td></tr>
          <tr><td className={s.tokName}>--bdg-font</td><td>0.62rem mono, .06em</td><td>Uppercase label</td></tr>
          <tr><td className={s.tokName}>--bdg-success</td><td><span className={s.tokSwatch} style={{ background: "#1fa35c" }} />#1FA35C</td><td>Tint fill + border + text</td></tr>
          <tr><td className={s.tokName}>--bdg-error</td><td><span className={s.tokSwatch} style={{ background: "#eb4a4f" }} />#EB4A4F</td><td>Tint fill + border + text</td></tr>
          <tr><td className={s.tokName}>--bdg-count</td><td>18px · #FF7A00</td><td>Warm circle, white number</td></tr>
          <tr><td className={s.tokName}>--bdg-anchor-ring</td><td>2px page bg</td><td>Separates count from its host</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
