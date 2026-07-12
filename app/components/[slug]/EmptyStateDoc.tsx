import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import EmptyStateDemo from "./EmptyStateDemo";
import EmptyStateConfigurator from "./EmptyStateConfigurator";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Empty State. Dark design system: a centred column on a #0C0D10 stage — a 56px rounded icon tile (#16171B, warm or error tinted per intent), an optional mono error code (404 / 500), a title (#F2F3F5), a supporting line (#9AA0A8), and up to two actions (ghost secondary + warm primary). Covers no-data (first use), no-results (search), 404, generic error, and first-run/onboarding — each with a forward-pointing action. Deliver React + CSS.");

const CODE = [
  { label: "HTML", code: `<div class="o-empty">
  <span class="o-empty__icon"><BoxIcon /></span>
  <span class="o-empty__title">No projects yet</span>
  <span class="o-empty__text">Projects you create will show up here.</span>
  <div class="o-empty__actions">
    <button class="o-btn o-btn--brand">New project</button>
  </div>
</div>` },
  { label: "CSS", code: `.o-empty {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  gap: 5px; padding: 42px 26px; max-width: 400px;
}
.o-empty__icon {
  width: 56px; height: 56px; border-radius: 15px; display: grid; place-items: center;
  background: #16171b; border: 1px solid #242428; color: #767b87;
}
.o-empty__icon--error { border-color: rgba(235,74,79,.35); color: #f2777b; }
.o-empty__actions { display: flex; gap: 10px; margin-top: 16px; }` },
  { label: "React", code: `import { EmptyState } from "@optimistic/ui";

<EmptyState
  icon={<Box />}
  title="No projects yet"
  description="Projects you create will show up here."
  action={{ label: "New project", onClick: create }}
/>

<EmptyState tone="error" code="500"
  title="Something went wrong"
  action={{ label: "Retry", onClick: retry }} />` },
  { label: "Angular", code: `<o-empty-state
  title="No projects yet"
  description="Projects you create will show up here."
  actionLabel="New project"
  (action)="create()">
  <box-icon icon></box-icon>
</o-empty-state>` },
  { label: "Async / API", code: `// Tell the three empty cases apart — they are not the same screen.
function Results({ query, data, error, isLoading }) {
  if (isLoading) return <Skeleton.List />;
  if (error)     return <EmptyState tone="error" code={error.status}
                     title="Couldn't load results" action={{ label: "Retry", onClick: refetch }} />;
  if (!data.length && query)
                 return <EmptyState icon={<Search />} title={\`No matches for "\${query}"\`}
                     action={{ label: "Clear search", onClick: clear }} />;
  if (!data.length)
                 return <EmptyState icon={<Box />} title="No items yet"
                     action={{ label: "Create one", onClick: create }} />;
  return <List items={data} />;
}` },
];

export default function EmptyStateDoc({ related }: { related: typeof ALL_ENTRIES }) {
  const Box = () => (<svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M14 3l10 5.5v11L14 25 4 19.5v-11L14 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M4 8.5l10 5.5 10-5.5M14 14v11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>);
  return (
    <>
      <Reveal delay={80}><div className={s.resRow}>
        <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer"><i>✳</i> Start building with Claude ↗</a>
      </div></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Live Demo — Fully Interactive</div><div className={s.secBody}><EmptyStateDemo /></div></section></Reveal>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Configuration</div><div className={s.secBody}><EmptyStateConfigurator /></div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Behavior — The Engineering Contract</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Prop</th><th>Type</th><th>Notes</th></tr></thead><tbody>
          <tr><td className={s.tokName}>icon</td><td>ReactNode</td><td>The 56px glyph tile</td></tr>
          <tr><td className={s.tokName}>title / description</td><td>string</td><td>What&apos;s missing, and why</td></tr>
          <tr><td className={s.tokName}>tone</td><td>neutral · warm · error</td><td>Tints the icon for onboarding vs failure</td></tr>
          <tr><td className={s.tokName}>code</td><td>string</td><td>Optional error code (404, 500)</td></tr>
          <tr><td className={s.tokName}>action / secondaryAction</td><td>{"{ label, onClick }"}</td><td>A warm primary and optional ghost</td></tr>
        </tbody></table>
        <p className={s.ddText} style={{ padding: "16px 0 0", border: 0 }}>An Empty State fills a zero-data or error moment with a way forward. For a transient message use a Snackbar; while data loads use a Skeleton.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Anatomy</div><div className={s.secBody}>
        <div className={s.anatomy}>
          <div className={s.anatomyStage}><div className={s.specimenWrap} style={{ width: 300 }}>
            <div className={s.oempty} style={{ padding: 0 }}>
              <span className={s.oemptyIcon}><Box /></span>
              <span className={s.oemptyTitle} style={{ fontSize: "0.98rem" }}>No projects yet</span>
              <span className={s.oemptyText} style={{ fontSize: "0.82rem" }}>Projects you create will show up here.</span>
              <div className={s.oemptyActions}><span className={`${s.obtn} ${s.sm} ${s.vWarm}`}>New project</span></div>
            </div>
            <span className={s.anaMark} style={{ left: "50%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>1</b><i className={s.anaConn} style={{ height: 44 }} /></span>
            <span className={s.anaMark} style={{ left: "35%", top: -40 }} aria-hidden="true"><b className={s.anaBadge}>2</b><i className={s.anaConn} style={{ height: 101 }} /></span>
            <span className={s.vAnaMarkTop} style={{ left: "60%", top: 150 }} aria-hidden="true"><i className={s.vAnaConnV} style={{ height: 30 }} /><b className={s.anaBadge}>3</b></span>
          </div></div>
          <div className={s.anaList}>
            <div className={s.anaItem}><span className={s.anaNum}>1</span><span className={s.anaName}>Icon</span><span className={s.anaDesc}>A glyph that names the situation.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>2</span><span className={s.anaName}>Copy</span><span className={s.anaDesc}>A title and one honest, plain line.</span></div>
            <div className={s.anaItem}><span className={s.anaNum}>3</span><span className={s.anaName}>Action</span><span className={s.anaDesc}>The one warm step that moves forward.</span></div>
          </div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Do&apos;s and Don&apos;ts</div><div className={s.secBody}>
        <div className={s.ddGrid}>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.oempty} style={{ padding: 8, gap: 4 }}><span className={s.oemptyTitle} style={{ fontSize: "0.88rem" }}>No invoices yet</span><span className={s.oemptyText} style={{ fontSize: "0.78rem" }}>Send your first one to get paid.</span><div className={s.oemptyActions} style={{ marginTop: 8 }}><span className={`${s.obtn} ${s.sm} ${s.vWarm}`}>New invoice</span></div></div></div><p className={s.ddText}>Always give a way forward — the empty state should point somewhere.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><span className={s.oemptyText}>No data.</span></div><p className={s.ddText}>Don&apos;t leave a bare &quot;No data&quot;. That&apos;s a dead end, not a state.</p></div>
          <div className={`${s.ddCard} ${s.ddDo}`}><div className={s.ddHead}>✓ Do</div><div className={s.ddStage}><div className={s.oempty} style={{ padding: 8, gap: 4 }}><span className={s.oemptyCode}>Error 500</span><span className={s.oemptyTitle} style={{ fontSize: "0.88rem" }}>Something went wrong</span></div></div><p className={s.ddText}>Own errors plainly, add a code, and offer Retry.</p></div>
          <div className={`${s.ddCard} ${s.ddDont}`}><div className={s.ddHead}>✕ Don&apos;t</div><div className={s.ddStage}><div className={s.oempty} style={{ padding: 8, gap: 4 }}><span className={s.oemptyTitle} style={{ fontSize: "0.82rem" }}>Uh-oh! 🙈 A wild error appeared!!!</span></div></div><p className={s.ddText}>Don&apos;t be cutesy about failure. Be clear, calm and useful.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>In context: Examples</div><div className={s.secBody}>
        <div className={s.ctxGrid}>
          <div className={s.ctxCard}><div className={s.ctxKicker}>A · Empty table</div><div className={s.ctxStage}><div className={s.oempty} style={{ padding: 10, gap: 3 }}><span className={`${s.oemptyIcon}`} style={{ width: 40, height: 40 }}><Box /></span><span className={s.oemptyTitle} style={{ fontSize: "0.82rem" }}>No results</span></div></div><p className={s.ctxCaption}>Inside a table or list that has no rows to show.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>B · 404 page</div><div className={s.ctxStage}><div className={s.oempty} style={{ padding: 10, gap: 3 }}><span className={s.oemptyCode}>Error 404</span><span className={s.oemptyTitle} style={{ fontSize: "0.82rem" }}>Page not found</span><div className={s.oemptyActions} style={{ marginTop: 6 }}><span className={`${s.obtn} ${s.sm} ${s.vWarm}`}>Home</span></div></div></div><p className={s.ctxCaption}>A full-page 404 with a route back home.</p></div>
          <div className={s.ctxCard}><div className={s.ctxKicker}>C · First run</div><div className={s.ctxStage}><div className={s.oempty} style={{ padding: 10, gap: 3 }}><span className={`${s.oemptyIcon} ${s.oemptyIconWarm}`} style={{ width: 40, height: 40 }}><Box /></span><span className={s.oemptyTitle} style={{ fontSize: "0.82rem" }}>Welcome</span></div></div><p className={s.ctxCaption}>Onboarding the first time a surface is opened.</p></div>
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Measurements &amp; Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--empty-icon</td><td>56px · radius 15</td><td>Glyph tile</td></tr>
          <tr><td className={s.tokName}>--empty-bg</td><td><span className={s.tokSwatch} style={{ background: "#0c0d10" }} />#0C0D10</td><td>Stage background</td></tr>
          <tr><td className={s.tokName}>--empty-title</td><td><span className={s.tokSwatch} style={{ background: "#f2f3f5" }} />#F2F3F5</td><td>Heading colour</td></tr>
          <tr><td className={s.tokName}>--empty-warm</td><td>rgba(255,122,0,.07)</td><td>Onboarding icon tint</td></tr>
          <tr><td className={s.tokName}>--empty-error</td><td>rgba(235,74,79,.07)</td><td>Failure icon tint</td></tr>
          <tr><td className={s.tokName}>--empty-pad</td><td>42px 26px</td><td>Column padding</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Code</div><div className={s.secBody}><CodeTabs tabs={CODE} /></div></section></Reveal>
      <RelatedSection related={related} />
    </>
  );
}
