"use client";

import { useEffect, useState } from "react";

/**
 * Loads the page section by section, in order.
 *
 * Every heavy visual wrapped in DeferMount registers itself on mount. A single
 * shared scheduler then mounts them one at a time, in registration order (which
 * is top-to-bottom DOM order), during the browser's idle time. So instead of
 * building every canvas synchronously in one blocking chunk on first render,
 * the page fills in from the top down, staying responsive throughout, and
 * everything is mounted before you scroll (no on-scroll pop-in).
 *
 * The wrapper overlays its (positioned) parent with position:absolute inset:0,
 * so it adds no layout of its own and nothing shifts whether the child is
 * mounted yet or not.
 */

type Job = () => void;
const queue: Job[] = [];
let running = false;

const idle: (cb: () => void) => void =
  typeof window !== "undefined" && "requestIdleCallback" in window
    ? (cb) => (window as unknown as { requestIdleCallback: (c: () => void, o?: { timeout: number }) => void }).requestIdleCallback(cb, { timeout: 250 })
    : (cb) => setTimeout(cb, 48);

function pump() {
  const job = queue.shift();
  if (job) job();
  if (queue.length) idle(pump);
  else running = false;
}

function enqueue(job: Job) {
  queue.push(job);
  if (!running) {
    running = true;
    idle(pump);
  }
}

export default function DeferMount({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let alive = true;
    enqueue(() => { if (alive) setShow(true); });
    return () => { alive = false; };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0 }} aria-hidden={!show || undefined}>
      {show ? children : null}
    </div>
  );
}
