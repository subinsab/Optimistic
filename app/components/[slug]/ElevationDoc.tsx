import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const LEVELS: { name: string; use: string; shadow: string; label: string; border?: boolean }[] = [
  { name: "Flat", use: "Most surfaces", shadow: "none", label: "hairline only", border: true },
  { name: "Raised", use: "Cards that lift", shadow: "0 1px 2px rgba(0,0,0,.35)", label: "shadow-1" },
  { name: "Overlay", use: "Menus, popovers", shadow: "0 8px 24px rgba(0,0,0,.42)", label: "shadow-2" },
  { name: "Modal", use: "Dialogs, toasts", shadow: "0 16px 40px rgba(0,0,0,.5)", label: "shadow-3" },
];

export default function ElevationDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>Depth without drama</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640 }}>On a dark field, most separation is a <strong style={{ color: "#e7e9ee" }}>hairline</strong> — one pixel of #1E1E1E — not a shadow. Shadows are reserved for things that genuinely float above the page and need to say so. Four levels, and you rarely need more than the first two.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>The levels</div><div className={s.secBody}>
        <div className={s.fnElevRow}>
          {LEVELS.map((l) => (
            <div key={l.name} className={s.fnElevCard} style={{ boxShadow: l.shadow === "none" ? undefined : l.shadow, borderColor: l.border ? "#1e1e1e" : "#262a30" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "0.82rem", color: "#e7e9ee", fontWeight: 500 }}>{l.name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#767b87", marginTop: 4 }}>{l.label}</div>
                <div style={{ fontSize: "0.68rem", color: "#767b87", marginTop: 6 }}>{l.use}</div>
              </div>
            </div>
          ))}
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Tokens</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--elevation-0</td><td>1px solid #1E1E1E</td><td>Flat — the default hairline</td></tr>
          <tr><td className={s.tokName}>--shadow-1</td><td>0 1px 2px rgba(0,0,0,.35)</td><td>Raised — a card that lifts</td></tr>
          <tr><td className={s.tokName}>--shadow-2</td><td>0 8px 24px rgba(0,0,0,.42)</td><td>Overlay — menus, popovers</td></tr>
          <tr><td className={s.tokName}>--shadow-3</td><td>0 16px 40px rgba(0,0,0,.5)</td><td>Modal — dialogs, toasts</td></tr>
          <tr><td className={s.tokName}>--shadow-focus</td><td>0 0 0 3px rgba(255,122,0,.14)</td><td>The one warm ring, for focus</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Rules</div><div className={s.secBody}>
        <div className={s.fnCards}>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>Hairline first</div><p className={s.fnCardText}>Try a #1E1E1E border before a shadow. Structure should read from lines and spacing, not from drop shadows.</p></div>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>One layer per context</div><p className={s.fnCardText}>An overlay sits at shadow-2; a modal at shadow-3. Don&apos;t nest shadowed things inside shadowed things.</p></div>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>Warm is only for focus</div><p className={s.fnCardText}>The single warm ring belongs to keyboard focus. Never tint an elevation shadow for decoration.</p></div>
        </div>
      </div></section></Reveal>

      <RelatedSection related={related} />
    </>
  );
}
