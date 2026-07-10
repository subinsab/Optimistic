"use client";

import { useEffect, useRef, useState } from "react";
import s from "../docs.module.css";

/* severity icons — line, currentColor (coloured by the tone class) */
const Info = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10 9v5M10 6.4v.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>);
const Check = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M6.4 10.2l2.4 2.4 4.8-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Warn = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3.2 17.6 16.4H2.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M10 8.4v3.4M10 14v.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>);
const Err = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M7.5 7.5l5 5M12.5 7.5l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);
const X = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);
const Bell = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5.5 14C5.5 14 7 12.4 7 8A3 3 0 0 1 13 8C13 12.4 14.5 14 14.5 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M8.3 14a1.7 1.7 0 0 0 3.4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);

const DOT_COLOR: Record<Severity, string> = { info: "#6b8aff", success: "#4fce8b", warning: "#ffc457", error: "#f2777b" };

export type Severity = "info" | "success" | "warning" | "error";
export const SEVERITIES: Severity[] = ["info", "success", "warning", "error"];
export const SEV_ICON: Record<Severity, React.ReactNode> = { info: <Info />, success: <Check />, warning: <Warn />, error: <Err /> };
const SEV_CLASS: Record<Severity, string> = { info: "onInfo", success: "onSuccess", warning: "onWarn", error: "onError" };

export function Notification({ severity = "info", bar = false, title, children, actions, onClose, dismissible, role = "status", progress = false }:
  { severity?: Severity; bar?: boolean; title?: string; children?: React.ReactNode; actions?: React.ReactNode; onClose?: () => void; dismissible?: boolean; role?: "status" | "alert"; progress?: boolean }) {
  const showClose = dismissible || !!onClose;
  return (
    <div className={`${s.onotif} ${s[SEV_CLASS[severity]]} ${bar ? s.onBar : ""}`} role={role}>
      <span className={s.onIcon}>{SEV_ICON[severity]}</span>
      <div className={s.onBody}>
        {title && <div className={s.onTitle}>{title}</div>}
        {children && <div className={s.onText}>{children}</div>}
        {actions && <div className={s.onActions}>{actions}</div>}
      </div>
      {showClose && <button type="button" className={s.onClose} aria-label="Dismiss" onClick={onClose}><X /></button>}
      {progress && <span className={s.onProgress} />}
    </div>
  );
}

const TABS = ["Severities", "With actions", "Bar accent", "Bell", "Toast stack"] as const;

const CENTER: { id: number; severity: Severity; title: string; time: string }[] = [
  { id: 1, severity: "success", title: "Changes published — live and reconciled", time: "2m ago" },
  { id: 2, severity: "warning", title: "Storage almost full (92%)", time: "1h ago" },
  { id: 3, severity: "info", title: "A new version is available", time: "3h ago" },
  { id: 4, severity: "error", title: "Publish failed — draft kept intact", time: "Yesterday" },
];

export function BellCenter({ bare = false }: { bare?: boolean }) {
  const [open, setOpen] = useState(false);
  const [readIds, setReadIds] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const unread = CENTER.filter((n) => !readIds.includes(n.id)).length;
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", h); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open]);
  const trigger = bare ? `${s.onBellBare} ${open ? s.onBellBareOn : ""}` : `${s.onBell} ${open ? s.onBellOn : ""}`;
  return (
    <div className={s.onBellWrap} ref={ref}>
      <button type="button" className={trigger} aria-label={`Notifications, ${unread} unread`}
        aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Bell />
        {unread > 0 && <span className={s.onBellCount}>{unread}</span>}
      </button>
      {open && (
        <div className={s.onCenter} role="dialog" aria-label="Notifications">
          <div className={s.onCenterHead}>
            <span className={s.onCenterTitle}>Notifications</span>
            <button type="button" className={s.onCenterClear} disabled={unread === 0}
              onClick={() => setReadIds(CENTER.map((n) => n.id))}>Mark all read</button>
          </div>
          <div className={s.onCenterList}>
            {CENTER.map((n) => {
              const isUnread = !readIds.includes(n.id);
              return (
                <button key={n.id} type="button" className={`${s.onCenterRow} ${isUnread ? s.onCenterUnread : ""}`}
                  onClick={() => setReadIds((r) => (r.includes(n.id) ? r : [...r, n.id]))}>
                  <span className={s.onCenterDot} style={{ background: isUnread ? DOT_COLOR[n.severity] : "#2a2b30" }} />
                  <span className={s.onCenterBody}>
                    <span className={s.onCenterRowTitle}>{n.title}</span>
                    <span className={s.onCenterTime}>{n.time}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const SAMPLE: Record<Severity, { title: string; msg: string }> = {
  info: { title: "New version available", msg: "Reload to get the latest tokens and components." },
  success: { title: "Changes published", msg: "Your update is live and reconciled across every consumer." },
  warning: { title: "Storage almost full", msg: "You're at 92% of your plan. Free up space to keep syncing." },
  error: { title: "Publish failed", msg: "Two tokens couldn't be resolved. Your draft was kept intact." },
};

let seq = 0;

export default function NotificationDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Severities");
  const [toasts, setToasts] = useState<{ id: number; severity: Severity; leaving?: boolean }[]>([]);
  const timers = useRef<Record<number, number>>({});

  const dismiss = (id: number) => {
    window.clearTimeout(timers.current[id]);
    setToasts((t) => t.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 200);
  };
  const push = (severity: Severity) => {
    const id = ++seq;
    setToasts((t) => [{ id, severity }, ...t].slice(0, 4));
    timers.current[id] = window.setTimeout(() => dismiss(id), 5000);
  };
  useEffect(() => () => Object.values(timers.current).forEach((t) => window.clearTimeout(t)), []);

  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Notification examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab}>
        {tab === "Severities" && (
          <>
            <div className={s.subLabel}>Four semantic tones — info, success, warning, error</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 460 }}>
              {SEVERITIES.map((sev) => (
                <Notification key={sev} severity={sev} title={SAMPLE[sev].title}>{SAMPLE[sev].msg}</Notification>
              ))}
            </div>
          </>
        )}
        {tab === "With actions" && (
          <>
            <div className={s.subLabel}>A title, message, resolving actions and a dismiss</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 460 }}>
              <Notification severity="warning" title="Verification required" onClose={() => {}}
                actions={<><button type="button" className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Verify now</button><button type="button" className={`${s.obtn} ${s.sm} ${s.vGhost}`}>Later</button></>}>
                Confirm your email to unlock publishing.
              </Notification>
              <Notification severity="error" title="Publish failed" onClose={() => {}}
                actions={<><button type="button" className={`${s.obtn} ${s.sm} ${s.vPrimary}`}>Retry</button><button type="button" className={`${s.obtn} ${s.sm} ${s.vGhost}`}>View log</button></>}>
                Two tokens couldn&apos;t be resolved. Your draft was kept intact.
              </Notification>
            </div>
          </>
        )}
        {tab === "Bar accent" && (
          <>
            <div className={s.subLabel}>Quieter style — panel background, coloured left bar</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 460 }}>
              {SEVERITIES.map((sev) => (
                <Notification key={sev} severity={sev} bar title={SAMPLE[sev].title} onClose={() => {}}>{SAMPLE[sev].msg}</Notification>
              ))}
            </div>
          </>
        )}
        {tab === "Bell" && (
          <>
            <div className={s.subLabel}>A bell with an unread count opens the notification center — click a row, or mark all read</div>
            <div className={s.onStage} style={{ minHeight: 340 }}>
              <div className={s.onStageHint}>Click the bell, top-right.</div>
              <div className={s.onBellStage}><BellCenter /></div>
            </div>
          </>
        )}
        {tab === "Toast stack" && (
          <>
            <div className={s.subLabel}>Push one — it stacks top-right and auto-dismisses in 5s</div>
            <div className={s.btnRow} style={{ gap: 10, flexWrap: "wrap" }}>
              {SEVERITIES.map((sev) => (
                <button key={sev} type="button" className={`${s.obtn} ${s.sm} ${s.vGhost}`} onClick={() => push(sev)}>{sev}</button>
              ))}
              <button type="button" className={`${s.obtn} ${s.sm} ${s.vWarm}`} onClick={() => push("success")}>Publish</button>
            </div>
            <div className={s.onStage} style={{ marginTop: 14 }}>
              {toasts.length === 0 && <div className={s.onStageHint}>Notifications appear here, newest on top.</div>}
              <div className={s.onToaster}>
                {toasts.map((t) => (
                  <div key={t.id} className={t.leaving ? s.onToastOut : s.onToast}>
                    <Notification severity={t.severity} progress title={SAMPLE[t.severity].title} onClose={() => dismiss(t.id)}>
                      {SAMPLE[t.severity].msg}
                    </Notification>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
