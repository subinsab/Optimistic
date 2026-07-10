"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GROUPS } from "./_data/registry";
import s from "./docs.module.css";

/*
   The docs rail — same taxonomy and numbering as the reference system
   (Foundations 01–08, Components 09 with categories, Layouts 10),
   restyled: mono labels, hairlines, warm tick on the active item.
*/

export default function SidebarNav() {
  const pathname = usePathname();
  const isActive = (slug: string) => pathname === `/components/${slug}`;
  let num = 0;
  const nn = () => String(++num).padStart(2, "0");

  return (
    <nav className={s.sideNav} aria-label="Component library">
      {GROUPS.map((g, gi) => (
        <div key={g.label} className={s.navGroup}>
          {gi > 0 && <div className={s.navDivider} aria-hidden="true" />}
          <span className={s.navGroupLabel}>{g.label}</span>
          {g.label === "Components" && (
            <Link
              href="/components"
              className={`${s.navItem} ${pathname === "/components" ? s.navOn : ""}`}
            >
              <span className={s.navNum}>{nn()}</span>
              All components
            </Link>
          )}
          {g.categories.map((c) => (
            <div key={c.label || g.label}>
              {c.label && <span className={s.navCat}>{c.label}</span>}
              {c.entries.map((e) => (
                <Link
                  key={e.slug}
                  href={`/components/${e.slug}`}
                  className={`${s.navItem} ${c.label ? s.navSub : ""} ${isActive(e.slug) ? s.navOn : ""}`}
                >
                  {!c.label && <span className={s.navNum}>{g.numbered || g.label === "Layouts" ? nn() : ""}</span>}
                  {e.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
}
