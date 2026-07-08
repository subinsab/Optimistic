"use client";

import { useState } from "react";
import s from "../docs.module.css";

const TABS = ["Basic", "Range", "Stepped", "Sizes", "Precise"] as const;
const fill = (v: number, min = 0, max = 100) => {
  const pct = ((v - min) / (max - min)) * 100;
  return { background: `linear-gradient(to right, #ff7a00 ${pct}%, #242428 ${pct}%)` };
};

/* two overlapping native ranges + a track/fill; thumbs stay grabbable, track doesn't block */
function DualSlider({ min, max, from, to, onChange }:
  { min: number; max: number; from: number; to: number; onChange: (v: [number, number]) => void }) {
  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className={s.osliderDual}>
      <span className={s.osliderDualTrack} />
      <span className={s.osliderDualFill} style={{ left: `${pct(from)}%`, width: `${pct(to) - pct(from)}%` }} />
      <input type="range" min={min} max={max} value={from} aria-label="From"
        onChange={(e) => onChange([Math.min(+e.target.value, to), to])} />
      <input type="range" min={min} max={max} value={to} aria-label="To"
        onChange={(e) => onChange([from, Math.max(+e.target.value, from)])} />
    </div>
  );
}

export default function SliderDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Basic");
  const [vol, setVol] = useState(64);
  const [size, setSize] = useState(40);
  const [price, setPrice] = useState(250);
  const [range, setRange] = useState<[number, number]>([120, 380]);

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Slider examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Basic" && (
          <>
            <div className={s.subLabel}>Drag, or use ← → — the fill follows</div>
            <div className={s.osliderField}>
              <div className={s.osliderRow}>
                <input type="range" className={s.oRange} min={0} max={100} value={vol}
                  onChange={(e) => setVol(+e.target.value)} style={fill(vol)} aria-label="Volume" />
                <span className={s.osliderVal}>{vol}%</span>
              </div>
            </div>
          </>
        )}
        {tab === "Range" && (
          <>
            <div className={s.subLabel}>Two handles for a from–to range, with precise entry</div>
            <div className={s.osliderField}>
              <DualSlider min={0} max={500} from={range[0]} to={range[1]} onChange={setRange} />
              <div className={s.osliderFromTo}>
                <span>FROM</span>
                <input type="number" className={s.osliderNum} min={0} max={range[1]} value={range[0]}
                  onChange={(e) => setRange([Math.min(Math.max(0, +e.target.value || 0), range[1]), range[1]])} aria-label="From value" />
                <span>TO</span>
                <input type="number" className={s.osliderNum} min={range[0]} max={500} value={range[1]}
                  onChange={(e) => setRange([range[0], Math.max(Math.min(500, +e.target.value || 0), range[0])])} aria-label="To value" />
              </div>
              <span className={s.oupHint}>${range[0]} – ${range[1]}</span>
            </div>
          </>
        )}
        {tab === "Sizes" && (
          <>
            <div className={s.subLabel}>Track and thumb scale — S · M · L</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 300 }}>
              <input type="range" className={`${s.oRange} ${s.oRangeSm}`} defaultValue={40} style={fill(40)} aria-label="Small" />
              <input type="range" className={s.oRange} defaultValue={60} style={fill(60)} aria-label="Medium" />
              <input type="range" className={`${s.oRange} ${s.oRangeLg}`} defaultValue={80} style={fill(80)} aria-label="Large" />
            </div>
          </>
        )}
        {tab === "Stepped" && (
          <>
            <div className={s.subLabel}>Snaps to steps of 10, with tick labels</div>
            <div className={s.osliderField}>
              <input type="range" className={s.oRange} min={0} max={100} step={10} value={size}
                onChange={(e) => setSize(+e.target.value)} style={fill(size)} aria-label="Size" />
              <div className={s.osliderTicks}>{[0, 20, 40, 60, 80, 100].map((t) => <span key={t}>{t}</span>)}</div>
            </div>
          </>
        )}
        {tab === "Precise" && (
          <>
            <div className={s.subLabel}>Slide by feel, or type the exact value</div>
            <div className={s.osliderField}>
              <div className={s.osliderRow}>
                <input type="range" className={s.oRange} min={0} max={500} value={price}
                  onChange={(e) => setPrice(+e.target.value)} style={fill(price, 0, 500)} aria-label="Budget" />
                <input type="number" className={s.osliderNum} min={0} max={500} value={price}
                  onChange={(e) => setPrice(Math.min(500, Math.max(0, +e.target.value || 0)))} aria-label="Budget exact" />
              </div>
              <span className={s.oupHint}>Budget: ${price} of $500</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
