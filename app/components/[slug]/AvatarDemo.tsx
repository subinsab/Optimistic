"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

const TABS = ["Image", "Initials", "Icon", "Group"] as const;
const SIZES = [["avXs", "XS"], ["avSm", "SM"], ["avMd", "MD"], ["avLg", "LG"], ["avXl", "XL"]] as const;

const face = (h1: number, h2: number) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${h1},64%,55%)"/><stop offset="1" stop-color="hsl(${h2},58%,38%)"/></linearGradient></defs><rect width="80" height="80" fill="url(#g)"/><circle cx="40" cy="31" r="14" fill="rgba(255,255,255,.9)"/><path d="M16 80c0-15 11-25 24-25s24 10 24 25z" fill="rgba(255,255,255,.9)"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};
const User = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8.5" r="3.6" stroke="currentColor" strokeWidth="1.6" />
    <path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const SHOWN = [
  { init: "AL", tint: "", img: 28 },
  { init: "AT", tint: "avBlue" },
  { init: "GH", tint: "avGreen", img: 140 },
  { init: "KJ", tint: "avPurple" },
];
const HIDDEN = [
  { name: "Margaret Hamilton", init: "MH", tint: "avWarm" },
  { name: "Barbara Liskov", init: "BL", tint: "avBlue" },
  { name: "Radia Perlman", init: "RP", tint: "avGreen" },
  { name: "Sophie Wilson", init: "SW", tint: "avPurple" },
  { name: "Karen Spärck Jones", init: "KS", tint: "" },
];

function AvatarGroup() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", h); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open]);
  return (
    <div className={s.oavatarStack} ref={ref}>
      <div className={s.oavatarGroup}>
        {SHOWN.map((p) => (
          <span key={p.init} className={`${s.oavatar} ${s.avMd} ${p.tint ? s[p.tint as keyof typeof s] : ""}`}>
            {p.img != null ? <img className={s.oavatarImg} src={face(p.img, p.img + 45)} alt="" /> : p.init}
          </span>
        ))}
        <button type="button" className={`${s.oavatar} ${s.avMd} ${s.oavatarMore} ${s.oavatarMoreBtn}`}
          aria-haspopup="true" aria-expanded={open} aria-label={`Show ${HIDDEN.length} more`} onClick={() => setOpen((o) => !o)}>
          +{HIDDEN.length}
        </button>
      </div>
      {open && (
        <div className={`${s.oavatarPop} ${HIDDEN.length > 5 ? s.oavatarPopScroll : ""}`} role="menu">
          <div className={s.oavatarPopLabel}>{HIDDEN.length} more</div>
          {HIDDEN.map((p) => (
            <div key={p.init} className={s.oavatarPopRow} role="menuitem">
              <span className={`${s.oavatar} ${s.avSm} ${p.tint ? s[p.tint as keyof typeof s] : ""}`}>{p.init}</span>
              <span className={s.oavatarPopName}>{p.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AvatarDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Image");
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Avatar examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Image" && (
          <>
            <div className={s.subLabel}>A photo, cover-fit and clipped — five sizes</div>
            <div className={s.btnRow} style={{ gap: 16 }}>
              {SIZES.map(([cls], i) => (
                <span key={cls} className={`${s.oavatar} ${s[cls as keyof typeof s]}`}>
                  <img className={s.oavatarImg} src={face(28 + i * 40, 60 + i * 40)} alt="Team member" />
                </span>
              ))}
            </div>
            <div className={s.subLabel}>Rounded-square variant</div>
            <div className={s.btnRow} style={{ gap: 12 }}>
              <span className={`${s.oavatar} ${s.oavatarSq} ${s.avLg}`}><img className={s.oavatarImg} src={face(200, 250)} alt="" /></span>
              <span className={`${s.oavatar} ${s.oavatarSq} ${s.avMd}`}><img className={s.oavatarImg} src={face(20, 60)} alt="" /></span>
            </div>
          </>
        )}
        {tab === "Initials" && (
          <>
            <div className={s.subLabel}>Initials fall back when there is no photo</div>
            <div className={s.btnRow} style={{ gap: 16 }}>
              <span className={`${s.oavatar} ${s.avMd} ${s.avWarm}`}>AL</span>
              <span className={`${s.oavatar} ${s.avMd} ${s.avBlue}`}>AT</span>
              <span className={`${s.oavatar} ${s.avMd} ${s.avGreen}`}>GH</span>
              <span className={`${s.oavatar} ${s.avMd} ${s.avPurple}`}>KJ</span>
              <span className={`${s.oavatar} ${s.avMd}`}>MR</span>
            </div>
            <div className={s.subLabel}>With a presence indicator</div>
            <div className={s.btnRow} style={{ gap: 20 }}>
              <span className={s.oindDotAnchor}>
                <span className={`${s.oavatar} ${s.avLg} ${s.avWarm}`}>AL</span>
                <span className={`${s.oind} ${s.oindOnline} ${s.oindRing} ${s.oindLg}`} />
              </span>
              <span className={s.oindDotAnchor}>
                <span className={`${s.oavatar} ${s.avLg} ${s.avBlue}`}>AT</span>
                <span className={`${s.oind} ${s.oindIdle} ${s.oindRing} ${s.oindLg}`} />
              </span>
            </div>
          </>
        )}
        {tab === "Icon" && (
          <>
            <div className={s.subLabel}>A generic glyph for unknown or system users</div>
            <div className={s.btnRow} style={{ gap: 16 }}>
              <span className={`${s.oavatar} ${s.avSm}`} style={{ color: "#767b87" }}><User size={16} /></span>
              <span className={`${s.oavatar} ${s.avMd}`} style={{ color: "#767b87" }}><User size={20} /></span>
              <span className={`${s.oavatar} ${s.avLg}`} style={{ color: "#767b87" }}><User size={26} /></span>
              <span className={`${s.oavatar} ${s.avLg} ${s.avWarm}`}><User size={26} /></span>
            </div>
          </>
        )}
        {tab === "Group" && (
          <>
            <div className={s.subLabel}>Overlapping stack, capped with a +N — click it to see the rest</div>
            {/* reserve room so the popover stays inside the clipped demo panel */}
            <div style={{ minHeight: 300 }}><AvatarGroup /></div>
          </>
        )}
      </div>
    </div>
  );
}
