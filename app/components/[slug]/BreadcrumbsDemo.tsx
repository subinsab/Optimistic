"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["Basic", "Separators", "Overflow", "Menus", "Icons"] as const;
const noNav = (e: React.MouseEvent) => e.preventDefault();

const Chevron = () => (<svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Arrow = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Caret = () => (<svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Home = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 7L8 2.5 13.5 7M4 6v7.5h8V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Folder = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 4.5h4l1.2 1.5H14v6.5H2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>);

export type SepKind = "chevron" | "slash" | "arrow" | "dot";
export function Sep({ kind = "chevron" }: { kind?: SepKind }) {
  if (kind === "slash") return <span className={s.obcSep} style={{ padding: "0 4px" }}>/</span>;
  if (kind === "dot") return <span className={s.obcSep} style={{ padding: "0 5px" }}>·</span>;
  if (kind === "arrow") return <span className={s.obcSep}><Arrow /></span>;
  return <span className={s.obcSep}><Chevron /></span>;
}

function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) close(); };
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("mousedown", h); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open, close]);
  return ref;
}

/* ── one reusable, fully navigable trail ──
   Every crumb is a real link: click it (or a hidden … item, or a sibling)
   and the trail actually moves. Supports separators, icons, middle-collapse,
   and per-crumb sibling menus. */
function Trail({ path: init, sep = "chevron", home = false, folders = false, collapse = false, tag, siblings }:
  { path: string[]; sep?: SepKind; home?: boolean; folders?: boolean; collapse?: boolean; tag?: string; siblings?: Record<number, string[]> }) {
  const [items, setItems] = useState(init);
  const [cur, setCur] = useState(init.length - 1);
  const [ov, setOv] = useState(false);
  const [sib, setSib] = useState<number | null>(null);
  const ovRef = useDismiss(ov, () => setOv(false));
  const sibRef = useDismiss(sib !== null, () => setSib(null));
  const path = items.slice(0, cur + 1);
  const go = (i: number) => { setCur(i); setOv(false); setSib(null); };
  const swap = (i: number, name: string) => { setItems((p) => p.map((x, j) => (j === i ? name : x))); setSib(null); };
  const icon = (i: number) => (home && i === 0 ? <Home /> : folders && i > 0 ? <Folder /> : null);

  const linkCrumb = (label: string, i: number, key: string) => {
    const sibs = siblings?.[i];
    return (
      <span key={key} style={{ display: "inline-flex", alignItems: "center", position: "relative" }} ref={sib === i ? sibRef : undefined}>
        <a href="#" onClick={(e) => { noNav(e); go(i); }} className={s.obcItem}>{icon(i)} {label}</a>
        {sibs && (
          <button type="button" className={s.obcCaret} aria-haspopup="menu" aria-expanded={sib === i} aria-label={`Switch ${label}`}
            onClick={() => setSib((v) => (v === i ? null : i))}><Caret /></button>
        )}
        {sibs && sib === i && (
          <div className={s.obcMenu} role="menu">
            {sibs.map((n) => (
              <a key={n} href="#" onClick={(e) => { noNav(e); swap(i, n); }} role="menuitem"
                className={`${s.omenuOpt} ${n === label ? s.omenuOptOn : ""}`}>{n}</a>
            ))}
          </div>
        )}
        <Sep kind={sep} />
      </span>
    );
  };
  const current = (label: string, i: number) => (
    <span key="cur" className={`${s.obcItem} ${s.obcCurrent}`} aria-current="page">{icon(i)} {label}</span>
  );

  let parts: React.ReactNode[];
  if (collapse && path.length > 4) {
    const hidden = path.slice(1, -2).map((label, i) => ({ label, idx: 1 + i }));
    parts = [
      linkCrumb(path[0], 0, "first"),
      <span key="menu" ref={ovRef} style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
        <button type="button" className={s.obcItem} aria-haspopup="true" aria-expanded={ov} aria-label="Show hidden path" onClick={() => setOv((o) => !o)}>…</button>
        {ov && (
          <div className={s.obcMenu} role="menu">
            {hidden.map((h) => (
              <a key={h.label} href="#" onClick={(e) => { noNav(e); go(h.idx); }} role="menuitem" className={s.omenuOpt}><span className={s.omenuIcon}><Folder /></span>{h.label}</a>
            ))}
          </div>
        )}
        <Sep kind={sep} />
      </span>,
      linkCrumb(path[path.length - 2], cur - 1, "prev"),
      current(path[path.length - 1], path.length - 1),
    ];
  } else {
    parts = path.map((label, i) => (i === path.length - 1 ? current(label, i) : linkCrumb(label, i, String(i))));
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      <nav className={s.obc} aria-label="Breadcrumb">{parts}</nav>
      {tag && <span className={s.obcKindTag}>{tag}</span>}
      {cur < items.length - 1 && <button type="button" className={s.obcReset} onClick={() => setCur(items.length - 1)}>Reset</button>}
    </div>
  );
}

const FULL = ["Home", "Workspace", "Projects", "Design System", "Components", "Avatar"];
const SIBLINGS: Record<number, string[]> = { 1: ["Foundations", "Components", "Layouts"], 2: ["Navigation", "Forms", "Data Display", "Feedback", "Overlays"] };

export default function BreadcrumbsDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Basic");
  const stageH = tab === "Overflow" ? 330 : tab === "Menus" ? 300 : undefined;
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Breadcrumbs examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab} style={stageH ? { minHeight: stageH } : undefined}>
        {tab === "Basic" && (
          <>
            <div className={s.subLabel}>A working trail — click any crumb to navigate up to it</div>
            <Trail path={["Home", "Components", "Data Display", "Avatar"]} home />
          </>
        )}
        {tab === "Separators" && (
          <>
            <div className={s.subLabel}>Four separator styles — chevron, slash, arrow, dot. All navigable.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {(["chevron", "slash", "arrow", "dot"] as SepKind[]).map((k) => (
                <Trail key={k} path={["Home", "Components", "Data Display", "Avatar"]} sep={k} tag={k} />
              ))}
            </div>
          </>
        )}
        {tab === "Overflow" && (
          <>
            <div className={s.subLabel}>A single over-long crumb truncates with an ellipsis</div>
            <nav className={s.obc} aria-label="Breadcrumb">
              <a href="#" onClick={noNav} className={s.obcItem}>Projects</a><Sep />
              <a href="#" onClick={noNav} className={s.obcItem}><span className={s.obcTrunc}>Q3 Marketing Website Redesign</span></a><Sep />
              <span className={`${s.obcItem} ${s.obcCurrent}`} aria-current="page">Overview</span>
            </nav>
            <div className={s.subLabel} style={{ marginTop: 24 }}>Long paths collapse to a … menu — pick a hidden crumb to jump there</div>
            <Trail path={FULL} home folders collapse />
          </>
        )}
        {tab === "Menus" && (
          <>
            <div className={s.subLabel}>Any crumb can open its siblings — switch, then navigate. Fully live.</div>
            <Trail path={["Home", "Components", "Data Display", "Avatar"]} home siblings={SIBLINGS} />
          </>
        )}
        {tab === "Icons" && (
          <>
            <div className={s.subLabel}>A leading home icon and folder glyphs — still a working trail</div>
            <Trail path={["Home", "Projects", "Roadmap"]} home folders />
          </>
        )}
      </div>
    </div>
  );
}
