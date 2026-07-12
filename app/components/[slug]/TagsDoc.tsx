import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import TagsDemo from "./TagsDemo";
import TagsConfigurator from "./TagsConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Tag / Tags input. Dark design system: chip bg #16171B border #2A2A30, text #CFD3DA, radius 6, font .78rem. Removable tags show a trailing × button (16px, hover lightens); static tags omit it. Warm tone = translucent #FF7A00 tint. A tag-input field wraps tags + a bare text input: Enter adds, Backspace on empty removes the last, field shows a warm focus ring. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<span class="o-tag">design
  <button class="o-tag__x" aria-label="Remove design">×</button>
</span>
<span class="o-tag o-tag--static">read-only</span>

<div class="o-tag-field">
  <span class="o-tag">tokens<button class="o-tag__x">×</button></span>
  <input class="o-tag-input" placeholder="Add tag…" />
</div>` },
  { label: "CSS", code: `.o-tag {
  display: inline-flex; align-items: center; gap: 7px;
  font-size: .78rem; color: #cfd3da;
  padding: 4px 6px 4px 10px; border-radius: 6px;
  background: #16171b; border: 1px solid #2a2a30;
}
.o-tag__x {
  width: 16px; height: 16px; border-radius: 4px;
  display: grid; place-items: center; color: #767b87; cursor: pointer;
}
.o-tag__x:hover { color: #f4f5f6; background: rgba(255,255,255,.08); }` },
  { label: "React", code: `import { TagInput, Tag } from "@optimistic/ui";

<Tag onRemove={() => remove("design")}>design</Tag>
<Tag static>read-only</Tag>

<TagInput
  value={tags}
  onChange={setTags}
  placeholder="Add tag…"
/>  {/* Enter adds, Backspace removes the last */}` },
  { label: "Angular", code: `<o-tag (remove)="remove('design')">design</o-tag>
<o-tag static>read-only</o-tag>

<o-tag-input [(value)]="tags" placeholder="Add tag…"></o-tag-input>` },
  { label: "Async / API", code: `// Adding a tag hits the server; roll back if it is rejected.
async function add(label) {
  const optimistic = [...tags, label];
  setTags(optimistic);                 // show it immediately
  try {
    const r = await fetch("/api/labels", { method: "POST",
      body: JSON.stringify({ label }) });
    if (!r.ok) throw new Error();
  } catch {
    setTags(tags);                     // reconcile: remove it again
    toast.error("Could not add tag.");
  }
}` },
];

export default function TagsDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><TagsDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><TagsConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop / event</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>onRemove</td><td>() =&gt; void</td><td>Renders the × and fires on click</td></tr>
          <tr><td className={s.tokName}>tone</td><td>neutral · warm · success · info · danger</td><td>Grey by default, or a semantic tint</td></tr>
          <tr><td className={s.tokName}>size</td><td>S · M · L</td><td>Chip scale; M is the default</td></tr>
          <tr><td className={s.tokName}>static</td><td>boolean</td><td>Read-only, no × button</td></tr>
          <tr><td className={s.tokName}>Enter (field)</td><td>—</td><td>Commits the draft into a tag</td></tr>
          <tr><td className={s.tokName}>Backspace (empty)</td><td>—</td><td>Removes the last tag</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>Tags name and filter. For a selectable filter chip that toggles on click, use Pills; for read-only status, use Badge.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap}>
            <span className={s.otag} style={{ fontSize: "0.85rem", padding: "6px 8px 6px 12px" }}>design<button type="button" className={s.otagX}><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></button></span>
            <span className={s.anaMark} style={{ left: "10%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "44%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 30 }} /></span>
            <span className={s.anaMark} style={{ left: "78%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>3</b><i className={s.anaConn} style={{ height: 30 }} /></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Container</span><span className={s.anaDesc}>Soft chip: dark fill, hairline border, radius 6.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Label</span><span className={s.anaDesc}>Lower-case text, the tag&apos;s value.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Remove</span><span className={s.anaDesc}>Trailing × on editable tags; omitted when static.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span style={{ display: "flex", gap: 6 }}><span className={`${s.otag} ${s.otagStatic}`}>react</span><span className={`${s.otag} ${s.otagStatic}`}>tokens</span></span></div><p className={s.ddText}>Short, lower-case, one concept each. They scan as a set.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span className={`${s.otag} ${s.otagStatic}`}>This whole sentence as one tag</span></div><p className={s.ddText}>Don&apos;t pack a phrase into a tag. Tags are keywords, not descriptions.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><span className={s.otag}>removable<button type="button" className={s.otagX}><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg></button></span></div><p className={s.ddText}>Give editable tags a clear × and a Backspace shortcut.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span style={{ display: "flex", gap: 6 }}><span className={`${s.otag} ${s.otagStatic} ${s.otagWarm}`}>a</span><span className={`${s.otag} ${s.otagStatic}`}>b</span><span className={`${s.otag} ${s.otagStatic} ${s.otagWarm}`}>c</span></span></div><p className={s.ddText}>Don&apos;t colour tags at random. Reserve the warm tone for one real signal.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Filter input</div><div className={s.ctxStage}><div className={s.tagField} style={{ maxWidth: "none" }}><span className={s.otag}>open<button type="button" className={s.otagX}>×</button></span><span className={s.otag}>bug<button type="button" className={s.otagX}>×</button></span><span className={s.tagInput} style={{ color: "#565a62" }}>Add filter…</span></div></div><p className={s.ctxCaption}>Active filters as removable tags inside the search field.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · Article meta</div><div className={s.ctxStage}><span style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{["design-systems", "tokens", "figma"].map(t => <span key={t} className={`${s.otag} ${s.otagStatic}`}>{t}</span>)}</span></div><p className={s.ctxCaption}>Read-only topic tags under a title or card.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · Recipients</div><div className={s.ctxStage}><div className={s.tagField} style={{ maxWidth: "none" }}><span className={s.otag}>ada@team.com<button type="button" className={s.otagX}>×</button></span><span className={s.tagInput} style={{ color: "#565a62" }}>Add people…</span></div></div><p className={s.ctxCaption}>Email or people pickers commit each entry into a tag.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--tag-bg</td><td><span className={s.tokSwatch} style={{ background: "#16171b" }} />#16171B</td><td>Chip fill</td></tr>
          <tr><td className={s.tokName}>--tag-border</td><td><span className={s.tokSwatch} style={{ background: "#2a2a30" }} />#2A2A30</td><td>Hairline</td></tr>
          <tr><td className={s.tokName}>--tag-radius</td><td>6px</td><td>Chip corner</td></tr>
          <tr><td className={s.tokName}>--tag-warm</td><td><span className={s.tokSwatch} style={{ background: "#ff7a00" }} />#FF7A00 @14%</td><td>Warm tone tint</td></tr>
          <tr><td className={s.tokName}>--tag-x</td><td>16px</td><td>Remove button hit area</td></tr>
          <tr><td className={s.tokName}>--tag-field-focus</td><td>rgba(255,122,0,.14)</td><td>Field focus ring</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
