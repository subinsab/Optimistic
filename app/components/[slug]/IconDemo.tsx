"use client";

import { useMemo, useState } from "react";
import {
  Sparkles, Bell, Search, Heart, ChartColumn, LayoutGrid,
  Terminal, RefreshCw, Plus, ArrowRight, Check, Code, type LucideIcon,
} from "lucide-react";
import { DynamicIcon, iconNames } from "lucide-react/dynamic";
import s from "../docs.module.css";
import Pagination from "./Pagination";
import { FEATURED, WEIGHT_STROKE, SIZE_PX } from "./iconGlyphs";

/* curated names → statically-imported components, so the doc's fixed spots
   render on the server with no pop-in. The full set is loaded lazily below. */
const STATIC: Record<string, LucideIcon> = {
  sparkles: Sparkles, bell: Bell, search: Search, heart: Heart,
  "chart-column": ChartColumn, "layout-grid": LayoutGrid, terminal: Terminal,
  "refresh-cw": RefreshCw, plus: Plus, "arrow-right": ArrowRight, check: Check, code: Code,
};

export function LineIcon({ name, px = 24, weight = "Regular" }:
  { name: string; px?: number; weight?: string }) {
  const sw = WEIGHT_STROKE[weight] ?? 2;
  const Static = STATIC[name];
  if (Static) return <Static className={s.oicon} size={px} strokeWidth={sw} absoluteStrokeWidth aria-hidden="true" />;
  return <DynamicIcon name={name as never} className={s.oicon} size={px} strokeWidth={sw} absoluteStrokeWidth aria-hidden="true" />;
}

const TILE_R: Record<string, number> = { 24: 6, 32: 8, 40: 10, 48: 12, 56: 14 };

export function IconTile({ name, tile = 40, surface = "dark", weight = "Regular" }:
  { name: string; tile?: number; surface?: "dark" | "light"; weight?: string }) {
  return (
    <span className={`${s.oiconTile} ${surface === "light" ? s.oiconTileLight : s.oiconTileDark}`}
      style={{ width: tile, height: tile, borderRadius: TILE_R[tile] ?? 10 }}>
      <LineIcon name={name} px={Math.round(tile * 0.55)} weight={weight} />
    </span>
  );
}

const TABS = ["Library", "Sizes", "Tiles", "Weights"] as const;
const SIZE_STEPS: [string, number][] = Object.entries(SIZE_PX);
const TOTAL = iconNames.length;

const PAGE_SIZE = 96;

function LibraryBrowser() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [copied, setCopied] = useState<string | null>(null);
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return term ? iconNames.filter((n) => n.includes(term)) : iconNames;
  }, [q]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const cur = Math.min(page, totalPages);
  const shown = filtered.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : (cur - 1) * PAGE_SIZE + 1;
  const to = Math.min(cur * PAGE_SIZE, filtered.length);
  const copy = async (n: string) => {
    try { await navigator.clipboard.writeText(n); } catch { /* clipboard blocked */ }
    setCopied(n);
    window.setTimeout(() => setCopied((c) => (c === n ? null : c)), 1600);
  };
  return (
    <>
      <div className={s.oiconSearchRow}>
        <input className={s.oiconSearch} value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }}
          placeholder={`Search ${TOTAL.toLocaleString()} icons…`} aria-label="Search icons" />
        {copied
          ? <span className={s.oiconCopied}>Copied “{copied}” ✓</span>
          : <span className={s.oiconCount}>{from.toLocaleString()}–{to.toLocaleString()} of {filtered.length.toLocaleString()}</span>}
      </div>
      <div className={s.oiconGrid}>
        {shown.map((n) => (
          <button key={n} type="button" title={`${n} — click to copy`} aria-label={`Copy name ${n}`}
            className={`${s.oiconChip} ${copied === n ? s.oiconChipCopied : ""}`} onClick={() => copy(n)}>
            <DynamicIcon name={n as never} size={24} strokeWidth={2} absoluteStrokeWidth className={s.oicon}
              fallback={() => <span className={s.oiconSkel} />} aria-hidden="true" />
          </button>
        ))}
        {filtered.length === 0 && <div className={s.oiconEmpty}>No icon matches “{q}”.</div>}
      </div>
      {totalPages > 1 && (
        <div className={s.oiconPager}>
          <Pagination page={cur} total={totalPages} onChange={setPage} ariaLabel="Icon library pages" />
        </div>
      )}
    </>
  );
}

export default function IconDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Library");
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Icon examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Library" && (
          <>
            <div className={s.subLabel}>The open Lucide set — {TOTAL.toLocaleString()} line icons, one colour. Click any icon to copy its name.</div>
            <LibraryBrowser />
          </>
        )}
        {tab === "Sizes" && (
          <>
            <div className={s.subLabel}>Six steps, xs → 2xl — the stroke scales with the box</div>
            <div className={s.oiconRow}>
              {SIZE_STEPS.map(([label, px]) => (
                <div key={label} className={s.oiconSizeCell}>
                  <LineIcon name="sparkles" px={px} />
                  <span className={s.oiconName}>{label} · {px}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === "Tiles" && (
          <>
            <div className={s.subLabel}>The same glyph in a tile — dark and light surfaces, one colour on each</div>
            <div className={s.oiconRow}>
              {(["dark", "light"] as const).map((surface) => (
                <div key={surface} className={s.oiconTileGroup}>
                  <div className={s.oiconTileGroupRow}>
                    {FEATURED.slice(0, 4).map((n) => (
                      <IconTile key={n} name={n} tile={40} surface={surface} />
                    ))}
                  </div>
                  <span className={s.oiconName}>{surface}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === "Weights" && (
          <>
            <div className={s.subLabel}>Three stroke weights — the 24px box never changes</div>
            <div className={s.oiconRow}>
              {["Light", "Regular", "Bold"].map((wt) => (
                <div key={wt} className={s.oiconSizeCell}>
                  <LineIcon name="search" px={40} weight={wt} />
                  <span className={s.oiconName}>{wt}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
