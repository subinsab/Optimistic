"use client";

import { useState } from "react";
import s from "../docs.module.css";

/* the live Button specimen — tabs mirror the reference page
   (Filled / Ghost / Icon / Loading), rows show sizes, variants, states */

const TABS = ["Filled", "Ghost", "Icon", "Loading"] as const;

export const Plus = ({ w = 14 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
const ArrowR = ({ w = 14 }: { w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Spinner = () => <span className={s.spinner} aria-hidden="true" />;

export default function ButtonDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Filled");

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Button variants">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className={s.demoStage} key={tab}>
        {tab === "Filled" && (
          <>
            <div className={s.subLabel}>Sizes — Primary</div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>L · 44px</span>
              <button className={`${s.obtn} ${s.l} ${s.vPrimary}`}>Label</button>
              <button className={`${s.obtn} ${s.l} ${s.vPrimary}`}><Plus /> Label</button>
              <button className={`${s.obtn} ${s.l} ${s.vPrimary}`}>Label <ArrowR /></button>
              <button className={`${s.obtn} ${s.l} ${s.vPrimary}`} disabled>Disabled</button>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>M · 36px</span>
              <button className={`${s.obtn} ${s.m} ${s.vPrimary}`}>Label</button>
              <button className={`${s.obtn} ${s.m} ${s.vPrimary}`}><Plus w={13} /> Label</button>
              <button className={`${s.obtn} ${s.m} ${s.vPrimary}`}>Label <ArrowR w={13} /></button>
              <button className={`${s.obtn} ${s.m} ${s.vPrimary}`} disabled>Disabled</button>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>S · 28px</span>
              <button className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Label</button>
              <button className={`${s.obtn} ${s.sm} ${s.vPrimary}`}><Plus w={11} /> Label</button>
              <button className={`${s.obtn} ${s.sm} ${s.vPrimary}`} disabled>Disabled</button>
            </div>

            <div className={s.subLabel}>Variants — M size</div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Primary</span>
              <button className={`${s.obtn} ${s.m} ${s.vPrimary}`}>Primary</button>
              <span className={s.stateBadge}>#F4F4F5</span>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Brand</span>
              <button className={`${s.obtn} ${s.m} ${s.vWarm}`}>The one light</button>
              <span className={s.stateBadge}>#FF7A00 · one per view</span>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Gradient</span>
              <button className={`${s.obtn} ${s.m} ${s.vGradient}`}>Gradient</button>
              <span className={s.stateBadge}>#FFB020 → #FF5E00 · hero moments only</span>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Quiet</span>
              <button className={`${s.obtn} ${s.m} ${s.vQuiet}`}>Quiet</button>
              <span className={s.stateBadge}>text only</span>
            </div>

            <div className={s.subLabel}>Semantic — status actions</div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Success</span>
              <button className={`${s.obtn} ${s.m} ${s.vSuccess}`}>Approve</button>
              <span className={s.stateBadge}>#1FA35C · white label</span>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Error</span>
              <button className={`${s.obtn} ${s.m} ${s.vError}`}>Delete</button>
              <span className={s.stateBadge}>#EB4A4F · destructive, confirm first</span>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Info</span>
              <button className={`${s.obtn} ${s.m} ${s.vInfo}`}>Learn more</button>
              <span className={s.stateBadge}>#3E63DD · white, 5.21:1</span>
            </div>
          </>
        )}

        {tab === "Ghost" && (
          <>
            <div className={s.subLabel}>Sizes — Ghost</div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>L · 44px</span>
              <button className={`${s.obtn} ${s.l} ${s.vGhost}`}>Label</button>
              <button className={`${s.obtn} ${s.l} ${s.vGhost}`}><Plus /> Label</button>
              <button className={`${s.obtn} ${s.l} ${s.vGhost}`} disabled>Disabled</button>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>M · 36px</span>
              <button className={`${s.obtn} ${s.m} ${s.vGhost}`}>Label</button>
              <button className={`${s.obtn} ${s.m} ${s.vGhost}`}><Plus w={13} /> Label</button>
              <button className={`${s.obtn} ${s.m} ${s.vGhost}`} disabled>Disabled</button>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>S · 28px</span>
              <button className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Label</button>
              <button className={`${s.obtn} ${s.sm} ${s.vGhost}`} disabled>Disabled</button>
            </div>

            <div className={s.subLabel}>On busy surfaces</div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Hairline</span>
              <button className={`${s.obtn} ${s.m} ${s.vGhost}`}>Secondary action</button>
              <span className={s.stateBadge}>border #333336</span>
            </div>
          </>
        )}

        {tab === "Icon" && (
          <>
            <div className={s.subLabel}>Icon only — all sizes</div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Primary</span>
              <button className={`${s.obtn} ${s.l} ${s.iconOnly} ${s.vPrimary}`} aria-label="Add"><Plus /></button>
              <button className={`${s.obtn} ${s.m} ${s.iconOnly} ${s.vPrimary}`} aria-label="Add"><Plus w={13} /></button>
              <button className={`${s.obtn} ${s.sm} ${s.iconOnly} ${s.vPrimary}`} aria-label="Add"><Plus w={11} /></button>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Ghost</span>
              <button className={`${s.obtn} ${s.l} ${s.iconOnly} ${s.vGhost}`} aria-label="Add"><Plus /></button>
              <button className={`${s.obtn} ${s.m} ${s.iconOnly} ${s.vGhost}`} aria-label="Add"><Plus w={13} /></button>
              <button className={`${s.obtn} ${s.sm} ${s.iconOnly} ${s.vGhost}`} aria-label="Add"><Plus w={11} /></button>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Brand</span>
              <button className={`${s.obtn} ${s.m} ${s.iconOnly} ${s.vWarm}`} aria-label="Add"><Plus w={13} /></button>
              <span className={s.stateBadge}>icon-only needs aria-label</span>
            </div>
          </>
        )}

        {tab === "Loading" && (
          <>
            <div className={s.subLabel}>Loading — label stays, width stays</div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>L · 44px</span>
              <button className={`${s.obtn} ${s.l} ${s.vPrimary} ${s.isLoading}`} aria-busy="true"><Spinner /> Saving</button>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>M · 36px</span>
              <button className={`${s.obtn} ${s.m} ${s.vPrimary} ${s.isLoading}`} aria-busy="true"><Spinner /> Saving</button>
              <button className={`${s.obtn} ${s.m} ${s.vWarm} ${s.isLoading}`} aria-busy="true"><Spinner /> Shipping</button>
              <button className={`${s.obtn} ${s.m} ${s.vGhost} ${s.isLoading}`} aria-busy="true"><Spinner /> Syncing</button>
            </div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>S · 28px</span>
              <button className={`${s.obtn} ${s.sm} ${s.vSuccess} ${s.isLoading}`} aria-busy="true"><Spinner /> Approving</button>
              <span className={s.stateBadge}>aria-busy · pointer-events none</span>
            </div>

            <div className={s.subLabel}>The optimistic rule</div>
            <div className={s.btnRow}>
              <span className={s.rowLabel}>Prefer</span>
              <span className={s.stateBadge}>render success first; reserve loading for waits honesty requires</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
