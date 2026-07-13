"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import s from "./DocsTheme.module.css";
import docs from "./docs.module.css";

type Theme = "dark" | "light";
const KEY = "optimistic-docs-theme";

const Ctx = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: "dark",
  setTheme: () => {},
});

/**
 * Dark/light preview for the component docs, scoped to ONLY the
 * "Live Demo — Fully Interactive" stage (not the surrounding page). The toggle
 * lives in the page header; this provider carries the state and stamps the
 * chosen theme onto that one demo stage, found by its label. Preference is
 * remembered across pages.
 */
export function DocsThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const pathname = usePathname();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Theme | null;
      if (saved === "light" || saved === "dark") setThemeState(saved);
    } catch {}
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(KEY, t);
    } catch {}
  };

  // stamp the theme on the Live Demo stage(s). Every interactive demo renders a
  // `.demoPanel` container, so we target that class directly rather than matching
  // label text (which varies per component). Retry across a few frames because
  // the demo mounts a tick after the page.
  useEffect(() => {
    let raf = 0;
    const apply = (tries = 0) => {
      const stages = document.querySelectorAll<HTMLElement>(`.${docs.demoPanel}`);
      if (stages.length) {
        stages.forEach((stage) => {
          stage.setAttribute("data-demo-theme", theme);
          // The kit DataGrid renders inside a `.gridScope` that reads the kit's
          // own tokens keyed on data-mode (not the docs --color-ink-* scale), so
          // flip that too. Skip scopes that ship their own mode switcher
          // (a `.gridModeBtn` in the same wrapper) — those are user-controlled.
          stage.querySelectorAll<HTMLElement>(".gridScope").forEach((scope) => {
            const wrap = scope.closest(".gridScopeWrap") ?? scope.parentElement;
            const selfControlled = wrap?.querySelector(".gridModeBtn");
            if (!selfControlled) scope.setAttribute("data-mode", theme === "light" ? "light" : "dark");
          });
        });
      } else if (tries < 16) raf = requestAnimationFrame(() => apply(tries + 1));
    };
    apply();
    return () => cancelAnimationFrame(raf);
  }, [theme, pathname]);

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export function DocsThemeToggle() {
  const { theme, setTheme } = useContext(Ctx);
  return (
    <div className={s.toggle} role="group" aria-label="Live demo theme">
      <button
        type="button"
        className={s.opt}
        data-on={theme === "dark"}
        aria-pressed={theme === "dark"}
        onClick={() => setTheme("dark")}
      >
        <MoonIcon />
        <span>Dark</span>
      </button>
      <button
        type="button"
        className={s.opt}
        data-on={theme === "light"}
        aria-pressed={theme === "light"}
        onClick={() => setTheme("light")}
      >
        <SunIcon />
        <span>Light</span>
      </button>
    </div>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
