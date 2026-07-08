"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "../../_components/Logo";
import s from "../docs.module.css";

const TABS = ["App bar", "Mega menu", "Mobile"] as const;
const SearchIcon = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
const Bell = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M5 9a5 5 0 0 1 10 0c0 4 1.5 5 1.5 5h-13S5 13 5 9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M8.5 17a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>);
const Caret = () => (<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const CaretR = () => (<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const Menu = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);
const Close = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>);

function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) close(); };
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("mousedown", h); document.addEventListener("keydown", k);
    return () => { document.removeEventListener("mousedown", h); document.removeEventListener("keydown", k); };
  }, [open, close]);
  return ref;
}

/* search collapses to a pill and expands to a real input on click (1.2) */
function SearchBox() {
  const [expanded, setExpanded] = useState(false);
  const [q, setQ] = useState("");
  const ref = useDismiss(expanded, () => { if (!q) setExpanded(false); });
  return (
    <div className={`${s.otnavSearchWrap} ${expanded ? s.otnavSearchOpen : ""}`} ref={ref}>
      {expanded ? (
        <div className={s.otnavSearchField}>
          <SearchIcon />
          <input
            autoFocus
            className={s.otnavSearchInput}
            value={q}
            placeholder="Search projects, people, docs…"
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Escape") { setQ(""); setExpanded(false); } }}
            aria-label="Search"
          />
          {q && <button type="button" className={s.otnavSearchClear} aria-label="Clear" onClick={() => setQ("")}><Close /></button>}
        </div>
      ) : (
        <button type="button" className={s.otnavSearch} onClick={() => setExpanded(true)}>
          <SearchIcon /> <span className={s.otnavSearchLabel}>Search</span><span className={s.ocmdEsc} style={{ marginLeft: "auto" }}>⌘K</span>
        </button>
      )}
    </div>
  );
}

function Notifications() {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  const items = [["Ada shared “Q3 plan”", "2m ago", true], ["Build #418 passed", "1h ago", true], ["Invoice 4821 paid", "Yesterday", false]] as const;
  return (
    <div className={s.otnavPop} ref={ref}>
      <button type="button" className={s.otnavIconBtn} aria-haspopup="menu" aria-expanded={open} aria-label="Notifications" onClick={() => setOpen((o) => !o)}>
        <Bell /><span className={s.otnavNotifDot} />
      </button>
      {open && (
        <div className={`${s.otnavMenu} ${s.otnavMenuWide}`} role="menu">
          <div className={s.otnavMenuHead}><span className={s.otnavMenuName}>Notifications</span><span className={s.ocmdKbd} style={{ marginLeft: "auto" }}>2 new</span></div>
          {items.map(([t, time, unread]) => (
            <div key={t} className={s.otnavNotifItem}>
              <span className={unread ? s.otnavNotifUnread : s.otnavNotifRead} />
              <span className={s.otnavNotifBody}>
                <span className={s.otnavNotifText}>{t}</span>
                <span className={s.otnavNotifTime}>{time}</span>
              </span>
            </div>
          ))}
          <div className={s.omenuDivider} />
          <button role="menuitem" className={s.omenuOpt} style={{ justifyContent: "center", color: "#9aa0a8" }}>View all</button>
        </div>
      )}
    </div>
  );
}

function Profile() {
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  return (
    <div className={s.otnavPop} ref={ref}>
      <button type="button" className={s.otnavAvatarBtn} aria-haspopup="menu" aria-expanded={open} aria-label="Account" onClick={() => setOpen((o) => !o)}>
        <span className={`${s.oavatar} ${s.avSm} ${s.avWarm}`}>AL</span>
      </button>
      {open && (
        <div className={s.otnavMenu} role="menu">
          <div className={s.otnavMenuHead}>
            <span className={`${s.oavatar} ${s.avSm} ${s.avWarm}`}>AL</span>
            <span className={s.otnavMenuText}>
              <span className={s.otnavMenuName}>Ada Lovelace</span>
              <span className={s.otnavMenuMail}>ada@team.com</span>
            </span>
          </div>
          <button role="menuitem" className={s.omenuOpt}>Profile</button>
          <button role="menuitem" className={s.omenuOpt}>Settings<span className={s.omenuKbd}>⌘,</span></button>
          <button role="menuitem" className={s.omenuOpt}>Billing</button>
          <div className={s.omenuDivider} />
          <button role="menuitem" className={`${s.omenuOpt} ${s.omenuOptDanger}`}>Sign out</button>
        </div>
      )}
    </div>
  );
}

/* an app-bar link that opens a dropdown (L1) with a nested flyout (L2) — 1.6 */
function ProjectsMenu() {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState(false);
  const ref = useDismiss(open, () => { setOpen(false); setSub(false); });
  return (
    <div className={s.otnavPop} ref={ref}>
      <button type="button" className={`${s.otnavLink} ${open ? s.otnavOn : ""}`} aria-expanded={open} aria-haspopup="menu" onClick={() => setOpen((o) => !o)} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>Projects <Caret /></button>
      {open && (
        <div className={`${s.otnavMenu} ${s.otnavMenuAlignLeft}`} role="menu" style={{ minWidth: 200 }}>
          <div className={s.ocmdGroup}>Level 1</div>
          <button role="menuitem" className={s.omenuOpt}>All projects</button>
          <button role="menuitem" className={s.omenuOpt}>Active</button>
          <button role="menuitem" className={s.omenuOpt}>Archived</button>
          <div className={s.omenuDivider} />
          <div className={s.otnavSubWrap} onMouseEnter={() => setSub(true)} onMouseLeave={() => setSub(false)}>
            <button role="menuitem" className={s.omenuOpt} aria-expanded={sub} aria-haspopup="menu">Templates<span className={s.otnavSubCaret}><CaretR /></span></button>
            {sub && (
              <div className={s.otnavFlyout} role="menu">
                <div className={s.ocmdGroup}>Level 2</div>
                {["Blank", "Dashboard", "Landing page"].map((t) => (
                  <button key={t} role="menuitem" className={s.omenuOpt}>{t}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const MEGA: Record<string, { label: string; desc: string }[]> = {
  Platform: [{ label: "Analytics", desc: "Dashboards & reports" }, { label: "Automation", desc: "Workflows & rules" }],
  Developers: [{ label: "API", desc: "REST & webhooks" }, { label: "SDKs", desc: "React, Angular, Swift" }],
  Resources: [{ label: "Docs", desc: "Guides & reference" }, { label: "Changelog", desc: "What's new" }],
};

function MegaMenu() {
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState("Platform");
  const ref = useDismiss(open, () => setOpen(false));
  return (
    <div className={s.otnavPop} ref={ref}>
      <button type="button" className={`${s.otnavLink} ${open ? s.otnavOn : ""}`} aria-expanded={open} onClick={() => setOpen((o) => !o)} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>Products <Caret /></button>
      {open && (
        <div className={s.otnavMega}>
          <div className={s.otnavMegaL1}>
            {Object.keys(MEGA).map((c) => (
              <button key={c} type="button" className={`${s.otnavMegaRow} ${cat === c ? s.otnavMegaRowOn : ""}`} onMouseEnter={() => setCat(c)}>{c}<CaretR /></button>
            ))}
          </div>
          <div className={s.otnavMegaL2}>
            <div className={s.otnavMegaL2Label}>{cat}</div>
            {MEGA[cat].map((it) => (
              <div key={it.label} className={s.otnavMegaItem}><span className={s.otnavMegaTitle}>{it.label}</span><span className={s.otnavMegaDesc}>{it.desc}</span></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TopNavDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("App bar");
  const [active, setActive] = useState("Overview");
  const [drawer, setDrawer] = useState(false);
  return (
    <div className={s.demoPanel}>
      <div className={s.demoTabs} role="tablist" aria-label="Top navigation examples">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t}
            className={`${s.demoTab} ${tab === t ? s.demoTabOn : ""}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>
      <div className={s.demoStage} key={tab} style={tab === "App bar" ? { minHeight: 470 } : tab === "Mega menu" ? { minHeight: 320 } : undefined}>
        {tab === "App bar" && (
          <>
            <div className={s.subLabel}>Links with an L1/L2 dropdown, expanding search, notifications and profile</div>
            <nav className={s.otnav} aria-label="Global">
              <span className={s.otnavBrand}><Logo size={22} withWordmark={false} /></span>
              <div className={s.otnavLinks}>
                <button type="button" className={`${s.otnavLink} ${active === "Overview" ? s.otnavOn : ""}`} onClick={() => setActive("Overview")}>Overview</button>
                <ProjectsMenu />
                <button type="button" className={`${s.otnavLink} ${active === "Team" ? s.otnavOn : ""}`} onClick={() => setActive("Team")}>Team <span className={s.otnavNew}>New</span></button>
              </div>
              <div className={s.otnavRight}>
                <SearchBox />
                <Notifications />
                <Profile />
              </div>
            </nav>
          </>
        )}
        {tab === "Mega menu" && (
          <>
            <div className={s.subLabel}>Click a link to open L1; hover a category for L2</div>
            <nav className={s.otnav} aria-label="Global">
              <span className={s.otnavBrand}><Logo size={22} withWordmark={false} /> Optimistic</span>
              <div className={s.otnavLinks}>
                <MegaMenu />
                <button type="button" className={s.otnavLink}>Pricing</button>
                <button type="button" className={s.otnavLink}>Docs</button>
              </div>
              <div className={s.otnavRight}><button className={`${s.obtn} ${s.sm} ${s.vWarm}`}>Sign up</button></div>
            </nav>
          </>
        )}
        {tab === "Mobile" && (
          <>
            <div className={s.subLabel}>Links collapse behind a hamburger + left drawer — tap ☰, close with ✕</div>
            <div className={s.otnavMockPhone}>
              <nav className={`${s.otnav} ${s.otnavMobile}`}>
                <button className={s.otnavHamburger} aria-label="Open menu" onClick={() => setDrawer(true)}><Menu /></button>
                <span className={s.otnavBrand} style={{ margin: "0 auto" }}><Logo size={20} withWordmark={false} /></span>
                <span className={`${s.oavatar} ${s.avSm} ${s.avWarm}`}>AL</span>
              </nav>
              {drawer && (
                <>
                  <div className={s.otnavDrawerBackdrop} onClick={() => setDrawer(false)} />
                  <div className={s.otnavDrawer}>
                    <div className={s.otnavDrawerHead}>
                      <span className={s.osnavBrand} style={{ padding: 0 }}><Logo size={20} withWordmark={false} /><span className={s.osnavBrandName}>Optimistic</span></span>
                      <button className={s.otnavDrawerClose} aria-label="Close menu" onClick={() => setDrawer(false)}><Close /></button>
                    </div>
                    {["Overview", "Projects", "Team", "Analytics"].map((l) => (
                      <button key={l} type="button" className={`${s.osnavItem} ${active === l ? s.osnavOn : ""}`} onClick={() => { setActive(l); setDrawer(false); }}><span className={s.osnavText}>{l}</span></button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
