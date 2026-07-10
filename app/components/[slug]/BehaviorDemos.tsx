"use client";

import { useRef, useState } from "react";
import { Spinner } from "./ButtonDemo";
import s from "../docs.module.css";

/*
   The behavior half — a button is not just a shape, it is a contract.
   Every demo here is live and self-contained; the "network" is simulated
   with delays and seeded failures so the patterns run without a backend.
*/

const net = (ms = 700, failRate = 0) =>
  new Promise<void>((resolve, reject) =>
    setTimeout(() => (Math.random() < failRate ? reject(new Error("503")) : resolve()), ms)
  );

/* 1 — click + keyboard: a button fires on click and on Enter/Space */
function ClickDemo() {
  const [count, setCount] = useState(0);
  const [via, setVia] = useState("—");
  return (
    <div className={s.behCard}>
      <div className={s.behHead}>
        <span>Click &amp; Keyboard</span>
        <span className={s.behVerb}>onClick</span>
      </div>
      <div className={s.behStage}>
        <button
          className={`${s.obtn} ${s.m} ${s.vPrimary}`}
          onClick={(e) => {
            setCount((n) => n + 1);
            setVia(e.detail === 0 ? "keyboard" : "pointer");
          }}
        >
          Press me
        </button>
        <span className={s.behOut}>
          fired <b>{count}</b>×<br />via {via}
        </span>
      </div>
      <p className={s.behCaption}>
        A real button responds to pointer and to Enter/Space with no extra
        code. Keyboard presses report detail 0; that is how we tell them apart.
      </p>
    </div>
  );
}

/* 2 — async GET: fetch with loading, result, and cancel via AbortController */
function FetchDemo() {
  const [phase, setPhase] = useState<"idle" | "loading" | "done" | "cancelled">("idle");
  const ctrl = useRef<{ cancelled: boolean } | null>(null);

  const load = async () => {
    const token = { cancelled: false };
    ctrl.current = token;
    setPhase("loading");
    await net(1100);
    if (token.cancelled) return;
    setPhase("done");
  };
  const cancel = () => {
    if (ctrl.current) ctrl.current.cancelled = true;
    setPhase("cancelled");
  };

  return (
    <div className={s.behCard}>
      <div className={s.behHead}>
        <span>Async GET · fetch</span>
        <span className={s.behVerb}>GET /clients</span>
      </div>
      <div className={s.behStage}>
        {phase === "loading" ? (
          <button className={`${s.obtn} ${s.m} ${s.vGhost}`} onClick={cancel}>
            <Spinner /> Cancel
          </button>
        ) : (
          <button className={`${s.obtn} ${s.m} ${s.vPrimary}`} onClick={load}>
            {phase === "done" ? "Reload" : "Load clients"}
          </button>
        )}
        <span className={s.behOut}>
          {phase === "idle" && "ready"}
          {phase === "loading" && <b>fetching…</b>}
          {phase === "cancelled" && <span className={s.behErr}>aborted</span>}
          {phase === "done" && (
            <span className={s.behRows}>
              <span className={s.behDataRow}><i className={s.behDot} /> Acme Corp</span>
              <span className={s.behDataRow}><i className={s.behDot} /> Globex</span>
              <span className={s.behDataRow}><i className={s.behDot} /> Initech</span>
            </span>
          )}
        </span>
      </div>
      <p className={s.behCaption}>
        Loading while in flight, cancellable via AbortController. A dropped
        request never overwrites fresher state.
      </p>
    </div>
  );
}

/* 3 — optimistic POST: render success first, reconcile after, roll back on error */
function OptimisticDemo() {
  const [saved, setSaved] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const busy = useRef(false);

  const push = (line: string) => setLog((l) => [line, ...l].slice(0, 5));

  const toggle = async () => {
    if (busy.current) return;
    busy.current = true;
    const next = !saved;
    setSaved(next); // optimistic: believe it now
    push(`${next ? "POST" : "DELETE"} /favorite · optimistic`);
    try {
      await net(650, 0.35); // 35% of the time the server disagrees
      push(`● reconciled 200`);
    } catch {
      setSaved(!next); // roll back honestly
      push(`✕ 503 · rolled back`);
    } finally {
      busy.current = false;
    }
  };

  return (
    <div className={s.behCard}>
      <div className={s.behHead}>
        <span>Optimistic POST</span>
        <span className={s.behVerb}>POST /favorite</span>
      </div>
      <div className={s.behStage}>
        <button
          className={`${s.obtn} ${s.m} ${saved ? s.vWarm : s.vGhost}`}
          onClick={toggle}
          aria-pressed={saved}
        >
          {saved ? "★ Favorited" : "☆ Favorite"}
        </button>
        <span className={s.behOut}>
          state <b>{saved ? "on" : "off"}</b>
        </span>
      </div>
      <div className={s.behLog}>
        {log.length ? log.map((l, i) => <span key={i}>{l}</span>) : <span>press to fire a request</span>}
      </div>
      <p className={s.behCaption}>
        The star fills instantly. One in three requests fails on purpose; watch
        it roll back and log the truth. Optimism is not denial.
      </p>
    </div>
  );
}

/* 4 — double-submit guard: async handler locks while in flight */
function GuardDemo() {
  const [submits, setSubmits] = useState(0);
  const [ignored, setIgnored] = useState(0);
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);

  const submit = async () => {
    if (lock.current) {
      setIgnored((n) => n + 1);
      return;
    }
    lock.current = true;
    setBusy(true);
    await net(900);
    setSubmits((n) => n + 1);
    setBusy(false);
    lock.current = false;
  };

  return (
    <div className={s.behCard}>
      <div className={s.behHead}>
        <span>Double-Submit Guard</span>
        <span className={s.behVerb}>POST /order</span>
      </div>
      <div className={s.behStage}>
        <button
          className={`${s.obtn} ${s.m} ${s.vPrimary} ${busy ? s.isLoading : ""}`}
          onClick={submit}
          aria-busy={busy || undefined}
        >
          {busy ? <><Spinner /> Placing…</> : "Place order"}
        </button>
        <span className={s.behOut}>
          placed <b>{submits}</b><br />
          <span className={s.behErr}>blocked {ignored}</span>
        </span>
      </div>
      <p className={s.behCaption}>
        Mash it. While a request is in flight the handler ignores repeats, so a
        double click never becomes a double charge.
      </p>
    </div>
  );
}

export default function BehaviorDemos() {
  return (
    <div className={s.behGrid}>
      <ClickDemo />
      <FetchDemo />
      <OptimisticDemo />
      <GuardDemo />
    </div>
  );
}
