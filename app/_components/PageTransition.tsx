"use client";

import { usePathname } from "next/navigation";
import s from "./PageTransition.module.css";

/**
 * Plays a short fade-and-rise whenever the route changes, so navigations feel
 * intentional instead of an instant swap.
 *
 * Keying a wrapper on the route remounts it on navigation, which replays the CSS
 * animation. The key granularity controls WHAT remounts:
 *  - keyBy="segment" (root): only the top-level area (/, /components, /blog...),
 *    so moving between component pages does NOT remount the shared sidebar.
 *  - keyBy="full" (inside the components layout): every path, so the doc content
 *    transitions on each component while the persistent sidebar stays put.
 */
export default function PageTransition({
  children,
  keyBy = "full",
}: {
  children: React.ReactNode;
  keyBy?: "full" | "segment";
}) {
  const pathname = usePathname();
  const routeKey =
    keyBy === "segment" ? "/" + (pathname.split("/")[1] ?? "") : pathname;
  return (
    <div key={routeKey} className={s.page}>
      {children}
    </div>
  );
}
