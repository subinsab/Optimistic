import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const SCALE: [string, number | string, string][] = [
  ["radius-0", 0, "Structural panels, tables, code"],
  ["radius-2", 2, "Inputs, small fields"],
  ["radius-6", 6, "Chips, tags, hit areas"],
  ["radius-8", 8, "Buttons, menu items"],
  ["radius-10", 10, "Cards, notifications"],
  ["radius-12", 12, "Panels, modals"],
  ["radius-16", 16, "Large surfaces"],
  ["radius-full", 999, "Pills, avatars, toggles"],
];

export default function RadiusDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal><section className={s.docSection}><div className={s.secLabel}>From sharp to soft</div><div className={s.secBody}>
        <p className={s.fnCardText} style={{ maxWidth: 640 }}>Radius carries tone. <strong style={{ color: "#e7e9ee" }}>Sharp</strong> corners read as structure — panels, tables, the code block. <strong style={{ color: "#e7e9ee" }}>Soft</strong> corners read as something you touch — buttons, chips, cards. And <strong style={{ color: "#e7e9ee" }}>full</strong> rounding is reserved for identity: pills, avatars, the toggle knob.</p>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>The scale</div><div className={s.secBody}>
        <div className={s.fnRadiusRow}>
          {SCALE.map(([name, px]) => (
            <div key={name} className={s.fnRadiusCell}>
              <div className={s.fnRadiusBox} style={{ borderRadius: px }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.66rem", color: "#cfd3da" }}>{name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "#767b87", marginTop: 2 }}>{px === 999 ? "999" : `${px}px`}</div>
              </div>
            </div>
          ))}
        </div>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>When each is right</div><div className={s.secBody}>
        <table className={s.tokTable}><thead><tr><th>Token</th><th>Value</th><th>Where</th></tr></thead><tbody>
          {SCALE.map(([name, px, use]) => (
            <tr key={name}><td className={s.tokName}>--{name}</td><td>{px === 999 ? "999px" : `${px}px`}</td><td>{use}</td></tr>
          ))}
        </tbody></table>
      </div></section></Reveal>

      <Reveal><section className={s.docSection}><div className={s.secLabel}>Rules</div><div className={s.secBody}>
        <div className={s.fnCards}>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>Sharp for structure</div><p className={s.fnCardText}>Full-bleed panels, tables and the code block stay square. Rounding a structural edge makes it feel like a floating widget.</p></div>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>Nest smaller inside larger</div><p className={s.fnCardText}>A radius-8 button inside a radius-12 card. An inner radius should never exceed its container&apos;s.</p></div>
          <div className={s.fnCard}><div className={s.fnCardTitle} style={{ marginTop: 0 }}>Full means identity</div><p className={s.fnCardText}>Reserve 999px for pills, avatars and toggles — shapes that are meant to read as round, not just soft.</p></div>
        </div>
      </div></section></Reveal>

      <RelatedSection related={related} />
    </>
  );
}
