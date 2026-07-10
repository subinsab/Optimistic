"use client";

import { useState } from "react";
import s from "../docs.module.css";

const CONTENT = ["Image", "Initials", "Icon"] as const;
const SIZES = ["XS", "SM", "MD", "LG", "XL"] as const;
const SHAPE = ["Circle", "Square"] as const;
const STATUS = ["None", "Online", "Idle", "Busy"] as const;
const SZ: Record<string, string> = { XS: "avXs", SM: "avSm", MD: "avMd", LG: "avLg", XL: "avXl" };
const ST: Record<string, string> = { Online: "oindOnline", Idle: "oindIdle", Busy: "oindBusy" };

const face = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(28,64%,55%)"/><stop offset="1" stop-color="hsl(60,58%,38%)"/></linearGradient></defs><rect width="80" height="80" fill="url(#g)"/><circle cx="40" cy="31" r="14" fill="rgba(255,255,255,.9)"/><path d="M16 80c0-15 11-25 24-25s24 10 24 25z" fill="rgba(255,255,255,.9)"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};
const User = () => (<svg width="55%" height="55%" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8.5" r="3.6" stroke="currentColor" strokeWidth="1.6" /><path d="M5 20c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);

function Chips({ label, options, value, onPick }: { label: string; options: readonly string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className={s.configGroup}><span className={s.configLabel}>{label}</span>
      <div className={s.configChips} role="radiogroup" aria-label={label}>
        {options.map((o) => <button key={o} type="button" role="radio" aria-checked={value === o}
          className={`${s.configChip} ${value === o ? s.configChipOn : ""}`} onClick={() => onPick(o)}>{o}</button>)}
      </div>
    </div>
  );
}

export default function AvatarConfigurator() {
  const [content, setContent] = useState("Initials");
  const [size, setSize] = useState("LG");
  const [shape, setShape] = useState("Circle");
  const [status, setStatus] = useState("Online");
  const szCls = s[SZ[size] as keyof typeof s];
  const shapeCls = shape === "Square" ? s.oavatarSq : "";
  const av = (
    <span className={`${s.oavatar} ${szCls} ${shapeCls} ${content === "Initials" ? s.avWarm : ""}`} style={content === "Icon" ? { color: "#767b87" } : undefined}>
      {content === "Image" && <img className={s.oavatarImg} src={face()} alt="" />}
      {content === "Initials" && "AL"}
      {content === "Icon" && <User />}
    </span>
  );
  const props = [content === "Image" ? `src="…"` : content === "Initials" ? `initials="AL"` : "icon", `size="${size.toLowerCase()}"`, shape === "Square" ? `shape="square"` : "", status !== "None" ? `status="${status.toLowerCase()}"` : ""].filter(Boolean).join(" ");
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Content" options={CONTENT} value={content} onPick={setContent} />
        <Chips label="Size" options={SIZES} value={size} onPick={setSize} />
        <Chips label="Shape" options={SHAPE} value={shape} onPick={setShape} />
        <Chips label="Status" options={STATUS} value={status} onPick={setStatus} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          {status === "None" ? av : <span className={s.oindDotAnchor}>{av}<span className={`${s.oind} ${s[ST[status] as keyof typeof s]} ${s.oindRing} ${s.oindLg}`} /></span>}
        </div>
        <div className={s.configCode}>{"<"}<b>Avatar</b> {props} {"/>"}</div>
      </div>
    </div>
  );
}
