import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const SCALE: [string, number][] = [
  ["space-0", 0], ["space-1", 4], ["space-2", 8], ["space-3", 12], ["space-4", 16],
  ["space-5", 20], ["space-6", 24], ["space-8", 32], ["space-10", 40],
  ["space-12", 48], ["space-16", 64], ["space-20", 80], ["space-25", 100],
];

export default function SpacingDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>A four-pixel base</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640 }}>Every gap, pad and margin is a multiple of <strong style={{ color: "#e7e9ee" }}>4px</strong>. One small scale, used everywhere, is what makes unrelated screens feel like one product. When whitespace can do the work, it does — a line is added only when spacing alone doesn&apos;t read as a break.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>The scale</div><div className={s.secBody}>
        <div className={s.fnScale}>{SCALE.map(([name, px]) => (
          <div key={name} className={s.fnScaleRow}>
            <span className={s.fnScaleLabel}>{name}</span>
            <span className={s.fnScaleLabel} style={{ width: 44, color: "#9aa0a8" }}>{px}px</span>
            <span className={s.fnBar} style={{ width: px }} />
          </div>
        ))}</div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Section rhythm</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640, marginBottom: 18 }}>Page sections breathe on a fluid rhythm, measured against real reference sites so the cadence never feels cramped or empty.</p>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead><tbody>
          <tr><td className={s.tokName}>--section-pad</td><td>clamp(64px, 8vh, 100px)</td><td>Vertical padding each side of a section</td></tr>
          <tr><td className={s.tokName}>--section-statement</td><td>clamp(100px, 14vh, 156px)</td><td>Deliberate breathing room around a statement</td></tr>
          <tr><td className={s.tokName}>--inline-pad</td><td>clamp(24px, 5vw, 64px)</td><td>Horizontal page gutter</td></tr>
          <tr><td className={s.tokName}>--cta-pad</td><td>clamp(80px, 10vh, 128px)</td><td>A step up, for the closing call to action</td></tr>
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Rules</div><div className={s.secBody}>
        <div className={s.fnCards}>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>Stay on the scale</div><p className={s.fnCardText}>Reach for a token, not an arbitrary pixel. If a value isn&apos;t on the 4px grid, it&apos;s almost always the wrong value.</p></div>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>Spacing before lines</div><p className={s.fnCardText}>Separate content with whitespace first. A #1E1E1E hairline is a last resort, not a default.</p></div>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>Pad from the inside</div><p className={s.fnCardText}>Cards and controls own their padding; layouts own the gaps between them. Never fake spacing with empty elements.</p></div>
        </div>
      </div></section></Reveal>

      <RelatedSection related={related} />
    </>
  );
}
