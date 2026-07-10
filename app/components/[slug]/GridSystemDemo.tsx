"use client";

import { useState } from "react";
import s from "../docs.module.css";

type Sys = { name: string; cols: number; gutter: number; margin: number; frame: number; bp: string; container: string;
  gLabel: string; mLabel: string; side: number; content: number; card: number; cards: number };

const SYSTEMS: Sys[] = [
  { name: "Mobile", cols: 4, gutter: 16, margin: 16, frame: 360, bp: "< 768px", container: "fluid", gLabel: "16px", mLabel: "16px", side: 4, content: 4, card: 2, cards: 2 },
  { name: "Tablet", cols: 8, gutter: 20, margin: 28, frame: 560, bp: "768 – 1023px", container: "fluid", gLabel: "24px", mLabel: "32px", side: 2, content: 6, card: 4, cards: 2 },
  { name: "Web", cols: 12, gutter: 20, margin: 32, frame: 680, bp: "≥ 1024px", container: "1320px max", gLabel: "24px", mLabel: "clamp(24,5vw,64)", side: 3, content: 9, card: 3, cards: 4 },
];

function ColumnGrid({ sys }: { sys: Sys }) {
  return (
    <div className={s.grsFrame} style={{ maxWidth: sys.frame }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${sys.cols}, 1fr)`, gap: sys.gutter, padding: `0 ${sys.margin}px` }}>
        {Array.from({ length: sys.cols }, (_, i) => <div key={i} className={s.grsCol}>{i + 1}</div>)}
      </div>
    </div>
  );
}

function SampleLayout({ sys }: { sys: Sys }) {
  const grid = { display: "grid", gridTemplateColumns: `repeat(${sys.cols}, 1fr)`, gap: sys.gutter, padding: `0 ${sys.margin}px` } as const;
  return (
    <div className={s.grsFrame} style={{ maxWidth: sys.frame }}>
      <div style={{ ...grid, rowGap: sys.gutter }}>
        <div className={`${s.grsPanel} ${s.grsPanelWarm}`} style={{ gridColumn: `span ${sys.cols}` }}>Header · span {sys.cols}</div>
        <div className={`${s.grsPanel} ${s.grsPanelTall}`} style={{ gridColumn: `span ${sys.side}` }}>Sidebar · {sys.side}</div>
        <div className={`${s.grsPanel} ${s.grsPanelTall}`} style={{ gridColumn: `span ${sys.content}` }}>Content · {sys.content}</div>
        {Array.from({ length: sys.cards }, (_, i) => (
          <div key={i} className={s.grsPanel} style={{ gridColumn: `span ${sys.card}` }}>Card · {sys.card}</div>
        ))}
      </div>
    </div>
  );
}

export default function GridSystemDemo() {
  const [tab, setTab] = useState("Web");
  const sys = SYSTEMS.find((x) => x.name === tab)!;
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Grid systems">
        {SYSTEMS.map((x) => (
          <button key={x.name} role="tab" aria-selected={tab === x.name}
            className={`${s.demoTab} ${tab === x.name ? s.demoTabOn : ""}`} onClick={() => setTab(x.name)}>{x.name}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab} style={{ minHeight: 360 }}>
        <div className={s.subLabel}>The {sys.name.toLowerCase()} grid — {sys.cols} columns</div>
        <ColumnGrid sys={sys} />
        <div className={s.grsSpec}><b>{sys.cols} columns</b> · {sys.gLabel} gutter · {sys.mLabel} margin · {sys.container}</div>
        <div className={s.grsSubLabel}>Same layout, this grid</div>
        <SampleLayout sys={sys} />
      </div>
    </div>
  );
}
