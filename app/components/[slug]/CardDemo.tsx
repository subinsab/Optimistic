"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card, CardMedia, CardBody, CardTitle, CardDescription, CardFooter,
} from "../../../optimistic-ui/components/card/card";
import { Badge } from "../../../optimistic-ui/components/badge/badge";
import { Tag } from "../../../optimistic-ui/components/tag/tag";
import { Button } from "../../../optimistic-ui/components/button/button";
import { Progress } from "../../../optimistic-ui/components/progress/progress";
import { Avatar, AvatarGroup } from "../../../optimistic-ui/components/avatar/avatar";
import { Divider } from "../../../optimistic-ui/components/divider/divider";
import { Pill } from "../../../optimistic-ui/components/pill/pill";
import { Icon } from "../../../optimistic-ui/components/icon/icon";
import { Play, Pause, Heart, Landmark, Share2, ArrowRight, RefreshCw, Download, MoreHorizontal, Star, ChevronRight, ArrowUp, ArrowDown, Zap, Wifi, Wallet, CreditCard, ShoppingBag, Check, Users, Trophy } from "lucide-react";
import "./cardShowcase.css";

/* ── icons · the kit Icon component (Lucide) wrapping each glyph ── */
type IP = React.SVGProps<SVGSVGElement>;
const I = {
  play: (p: IP) => <Icon icon={Play} size={20} fill="currentColor" {...p} />,
  pause: (p: IP) => <Icon icon={Pause} size={20} fill="currentColor" {...p} />,
  heart: (p: IP) => <Icon icon={Heart} size={17} fill="currentColor" {...p} />,
  heartO: (p: IP) => <Icon icon={Heart} size={17} {...p} />,
  bank: (p: IP) => <Icon icon={Landmark} size={18} {...p} />,
  share: (p: IP) => <Icon icon={Share2} size={15} {...p} />,
  arrow: (p: IP) => <Icon icon={ArrowRight} size={15} {...p} />,
  refresh: (p: IP) => <Icon icon={RefreshCw} size={13} {...p} />,
  down: (p: IP) => <Icon icon={Download} size={16} {...p} />,
  dots: (p: IP) => <Icon icon={MoreHorizontal} size={18} {...p} />,
  star: (p: IP) => <Icon icon={Star} size={14} fill="currentColor" {...p} />,
  starO: (p: IP) => <Icon icon={Star} size={14} {...p} />,
  chevR: (p: IP) => <Icon icon={ChevronRight} size={14} {...p} />,
  triUp: (p: IP) => <Icon icon={ArrowUp} size={12} weight="bold" {...p} />,
  triDown: (p: IP) => <Icon icon={ArrowDown} size={12} weight="bold" {...p} />,
  bolt: (p: IP) => <Icon icon={Zap} size={16} fill="currentColor" {...p} />,
  wave: (p: IP) => <Icon icon={Wifi} size={18} {...p} />,
  wallet: (p: IP) => <Icon icon={Wallet} size={18} {...p} />,
  card: (p: IP) => <Icon icon={CreditCard} size={16} {...p} />,
  bag: (p: IP) => <Icon icon={ShoppingBag} size={16} {...p} />,
  check: (p: IP) => <Icon icon={Check} size={13} weight="bold" {...p} />,
  users: (p: IP) => <Icon icon={Users} size={13} {...p} />,
  trophy: (p: IP) => <Icon icon={Trophy} size={13} {...p} />,
};

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/* ── section wrapper ───────────────────────────────────────────── */
function Row({ label, hint, wide, children }: { label: string; hint: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>{label}</div>
        <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: 4 }}>{hint}</div>
      </div>
      <div className={`csGrid${wide ? " csGrid--wide" : ""}`}>{children}</div>
    </div>
  );
}

/* ── 1 · video card ────────────────────────────────────────────── */
function VideoCard() {
  const [playing, setPlaying] = useState(false);
  const [pct, setPct] = useState(28);
  const dur = 204;
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setPct((p) => (p >= 100 ? 0 : p + 0.35)), 80);
    return () => clearInterval(id);
  }, [playing]);
  return (
    <Card flush className="csVideo" data-playing={playing}>
      <CardMedia ratio="16/9">
        <div className="csVideoScene" />
        <div className="csVideoShade" />
        <Button variant="primary" className="csPlayPos csRoundLg" onClick={() => setPlaying((v) => !v)} aria-label={playing ? "Pause" : "Play"}>
          {playing ? <I.pause /> : <I.play style={{ marginLeft: 2 }} />}
        </Button>
        <div className="csVideoBar">
          <span className="csTime">{mmss((pct / 100) * dur)}</span>
          <div className="csTrack"><div className="csTrackFill" style={{ width: `${pct}%` }} /></div>
          <span className="csTime">{mmss(dur)}</span>
        </div>
      </CardMedia>
      <CardBody>
        <CardTitle>Optimistic UI, end to end</CardTitle>
        <CardDescription>How rendering the result first makes an interface feel instant.</CardDescription>
      </CardBody>
    </Card>
  );
}

/* ── 1 · audio card ────────────────────────────────────────────── */
function AudioCard() {
  const [playing, setPlaying] = useState(false);
  return (
    <Card className="csAudio" data-playing={playing}>
      <div className="csCover"><div className="csArt csArt--ember" /></div>
      <div className="csAudioMid">
        <h4>Ember, Slow Return</h4>
        <span>Northbound · 3:48</span>
        <div className="csWave">
          {[40, 70, 30, 90, 55, 100, 45, 75, 35, 85, 50, 65, 25].map((h, i) => (
            <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }} />
          ))}
        </div>
      </div>
      <Button variant="ghost" className="csRound" onClick={() => setPlaying((v) => !v)} aria-label={playing ? "Pause" : "Play"}>
        {playing ? <I.pause /> : <I.play style={{ marginLeft: 1 }} />}
      </Button>
    </Card>
  );
}

/* ── 1 · image card ────────────────────────────────────────────── */
function ImageCard({ art, cat, title, place, desc }: { art: string; cat: string; title: string; place: string; desc: string }) {
  const [liked, setLiked] = useState(false);
  return (
    <Card flush interactive>
      <CardMedia ratio="16/9">
        <div className={`csArt ${art}`} />
        <div className="csMediaTop">
          <Badge className="csBadgeOnMedia">{cat}</Badge>
          <Button variant="ghost" className={`csRound csOnMedia${liked ? " on" : ""}`} onClick={(e) => { e.stopPropagation(); setLiked((v) => !v); }} aria-label="Like">
            {liked ? <I.heart /> : <I.heartO />}
          </Button>
        </div>
      </CardMedia>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardDescription style={{ marginTop: 4 }}>{place}. {desc}</CardDescription>
        <CardFooter>
          <span className="csMeta">4 min read</span>
          <Button variant="ghost" size="sm" style={{ marginLeft: "auto" }} onClick={(e) => e.stopPropagation()}><I.share /> Share</Button>
        </CardFooter>
      </CardBody>
    </Card>
  );
}

/* ── 2 · tilt card ─────────────────────────────────────────────── */
function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(px - 0.5) * 16}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 16}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };
  const enter = () => ref.current?.style.setProperty("--lift", "1");
  const leave = () => { const el = ref.current; if (!el) return; el.style.setProperty("--lift", "0"); el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); };
  return (
    <div ref={ref} className="csTilt" data-lift onMouseMove={move} onMouseEnter={enter} onMouseLeave={leave}
      onMouseDown={enter} tabIndex={0}>
      <div className="csTilt__brand"><span>Optimistic</span><span>◈</span></div>
      <div className="csTilt__num">4291 · 0072 · 5580</div>
      <div className="csTilt__foot">
        <div><small>Member</small><b>Subin Wayanad</b></div>
        <div style={{ textAlign: "right" }}><small>Since</small><b>2026</b></div>
      </div>
    </div>
  );
}

/* ── 2 · flip card ─────────────────────────────────────────────── */
function FlipCard() {
  const [flipped, setFlipped] = useState(false);
  return (
    <button className="csFlip" data-flipped={flipped} onClick={() => setFlipped((v) => !v)} aria-pressed={flipped}>
      <div className="csFlip__inner">
        <div className="csFlip__face csFlip__front">
          <div className="csFlip__glow" />
          <Badge style={{ alignSelf: "flex-start" }}>This quarter</Badge>
          <div>
            <div className="csStat">+38%</div>
            <div className="csStatUp">▲ Optimistic renders</div>
          </div>
          <span className="csFlipHint"><I.refresh /> Tap to see the breakdown</span>
        </div>
        <div className="csFlip__face csFlip__back">
          <div className="csFlip__glow" />
          <div style={{ fontSize: "0.82rem", fontWeight: 600, marginBottom: 10 }}>Where it came from</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: "0.8rem", color: "var(--text-secondary)" }}>
            {[["Instant writes", "+21%"], ["Fewer spinners", "+11%"], ["Reconcile misses", "−6%"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between" }}><span>{k}</span><b style={{ color: "var(--text)" }}>{v}</b></div>
            ))}
          </div>
          <span className="csFlipHint" style={{ marginTop: "auto" }}><I.refresh /> Tap to flip back</span>
        </div>
      </div>
    </button>
  );
}

/* ── 2 · plain interactive kit card (shows the `interactive` prop) ─ */
function InteractiveCard() {
  return (
    <Card interactive onClick={() => {}} style={{ display: "flex", flexDirection: "column", gap: 12, minHeight: 190 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--accent-surface)", border: "1px solid var(--accent-border)", display: "grid", placeItems: "center", color: "var(--accent)" }}><I.down /></div>
        <I.arrow style={{ color: "var(--text-muted)" }} />
      </div>
      <div style={{ marginTop: "auto" }}>
        <CardTitle>Export the kit</CardTitle>
        <CardDescription>The whole card lifts on hover and takes a focus ring, so it reads as one target.</CardDescription>
      </div>
    </Card>
  );
}

/* ── 3 · cursor spotlight card ─────────────────────────────────── */
function SpotlightCard() {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} className="csSpot" onMouseMove={move}>
      <div className="csSpot__dots" />
      <Badge style={{ alignSelf: "flex-start" }}>Hover me</Badge>
      <div>
        <div style={{ fontSize: "1rem", fontWeight: 650, color: "var(--text)" }}>Cursor spotlight</div>
        <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: 6 }}>An ember glow tracks the pointer, lighting the surface where you look.</div>
      </div>
    </div>
  );
}

/* ── reusable parts (compose the archetypes below) ─────────────── */
function IconTile({ children }: { children: React.ReactNode }) { return <span className="csTile">{children}</span>; }

function TrendPill({ dir, children }: { dir: "up" | "down"; children: React.ReactNode }) {
  return <Badge tone={dir === "up" ? "success" : "danger"}>{dir === "up" ? <I.triUp /> : <I.triDown />}{children}</Badge>;
}

function Spark({ data, dir }: { data: number[]; dir: "up" | "down" }) {
  const w = 96, h = 30, max = Math.max(...data), min = Math.min(...data), rng = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / rng) * (h - 4) - 2}`).join(" ");
  return (<svg className="csSpark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true"><polyline points={pts} fill="none" stroke={dir === "up" ? "var(--success-text)" : "var(--danger-text)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}

function Ring({ pct }: { pct: number }) {
  const r = 32, c = 2 * Math.PI * r;
  return (<svg className="csRing" viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r={r} fill="none" stroke="var(--surface-chip)" strokeWidth="4" /><circle cx="36" cy="36" r={r} fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} transform="rotate(-90 36 36)" /></svg>);
}

/* ── 4 · payment-card visual ───────────────────────────────────── */
function PayCard() {
  return (
    <div className="csPayWrap">
      <div className="csPay">
        <div className="csPay__glow" />
        <div className="csPay__row"><span className="csPay__brand"><I.bolt /> Optimistic</span><I.wave /></div>
        <div className="csPay__num">4291<span>••••</span><span>••••</span>2579</div>
        <div className="csPay__row csPay__row--foot">
          <div><small>Card holder</small><b>Subin Wayanad</b></div>
          <div style={{ textAlign: "right" }}><small>Expires</small><b>12 / 28</b></div>
        </div>
      </div>
      <div className="csPayActions">
        <Button variant="warm" size="sm" style={{ flex: 1 }}><I.down style={{ transform: "rotate(180deg)", width: 15, height: 15 }} /> Top up</Button>
        <Button variant="ghost" size="sm" style={{ flex: 1 }}><I.arrow /> Transfer</Button>
      </div>
    </div>
  );
}

/* ── 4 · stat / KPI card (kit Card + parts) ────────────────────── */
function StatCard({ icon, label, value, caption, dir, delta }: { icon: React.ReactNode; label: string; value: string; caption: string; dir: "up" | "down"; delta: string }) {
  return (
    <Card>
      <div className="csStatTop"><IconTile>{icon}</IconTile><span className="csStatLabel">{label}</span></div>
      <div className="csStatVal">{value}</div>
      <div className="csStatFoot"><span className="csMeta">{caption}</span><TrendPill dir={dir}>{delta}</TrendPill></div>
    </Card>
  );
}

/* ── 4 · featured (accent-filled) balance card ─────────────────── */
function FeatureStatCard() {
  return (
    <Card className="csFeat">
      <div className="csRowBetween"><span className="csHd"><IconTile><I.wallet /></IconTile> My balance</span><Button variant="quiet" size="sm" aria-label="More"><I.dots /></Button></div>
      <div className="csFeat__sub">Wallet overview and spending</div>
      <div className="csFeat__val">48,920.32 <TrendPill dir="up">1.5%</TrendPill></div>
      <Divider className="csDiv" />
      <Button variant="quiet" size="sm" className="csFeatLink">See details <I.chevR /></Button>
    </Card>
  );
}

/* ── 4 · asset / ticker tile ───────────────────────────────────── */
function AssetTile({ sym, name, price, dir, delta, data, tint }: { sym: string; name: string; price: string; dir: "up" | "down"; delta: string; data: number[]; tint: string }) {
  const [fav, setFav] = useState(false);
  return (
    <div className="csAsset">
      <div className="csAsset__top">
        <span className="csAsset__ico" style={{ background: tint }}>{sym.slice(0, 1)}</span>
        <span className="csAsset__sym"><b>{sym}</b><small>{name}</small></span>
        <Button variant="ghost" className={`csRound csStar${fav ? " on" : ""}`} onClick={() => setFav((v) => !v)} aria-label="Favorite">{fav ? <I.star /> : <I.starO />}</Button>
      </div>
      <Spark data={data} dir={dir} />
      <div className="csAsset__foot"><span className="csAsset__price">{price}</span><TrendPill dir={dir}>{delta}</TrendPill></div>
    </div>
  );
}

/* ── 5 · profile card ──────────────────────────────────────────── */
function ProfileCard() {
  return (
    <Card>
      <div className="csProf__head"><span className="csStatLabel">Profile</span><Button variant="quiet" className="csRound" aria-label="Refresh"><I.refresh /></Button></div>
      <div className="csProf__av"><Ring pct={72} /><span className="csProf__pic">SW</span><span className="csProf__badge"><I.star /></span></div>
      <div className="csProf__name">Subin Wayanad</div>
      <div className="csMeta" style={{ textAlign: "center" }}>Design Manager</div>
      <div className="csPills"><Badge tone="neutral"><I.users /> 11</Badge><Badge tone="neutral"><I.check /> 56</Badge><Badge tone="neutral"><I.trophy /> 12</Badge></div>
    </Card>
  );
}

/* ── 5 · goal card ─────────────────────────────────────────────── */
function GoalCard() {
  const pct = 68;
  return (
    <Card>
      <div className="csGoal__head"><div><div className="csStatLabel">Team goal</div><div className="csMeta" style={{ marginTop: 4 }}>Ship the design system</div></div><AvatarGroup><Avatar name="Sam Lee" size="sm" /><Avatar name="Ada Ng" size="sm" /><Avatar name="Kai Ito" size="sm" /></AvatarGroup></div>
      <Progress value={pct} />
      <div className="csGoal__foot"><span className="csMeta">{pct}% complete</span><span className="csMeta">17 of 25 tasks</span></div>
    </Card>
  );
}

/* ── 5 · activity / transaction list card ──────────────────────── */
const TXNS: { ico: React.ReactNode; name: string; date: string; amt: string; pos: boolean }[] = [
  { ico: <I.arrow />, name: "Transfer to Yanuel Erik", date: "12 Jan 2026", amt: "30.00", pos: false },
  { ico: <I.bag />, name: "Shopping at Okemart", date: "11 Jan 2026", amt: "16.25", pos: false },
  { ico: <I.card />, name: "Receive from Yuliano Vidi", date: "07 Jan 2026", amt: "10.00", pos: true },
];
function TxnCard() {
  return (
    <Card flush>
      <div className="csTxn__head"><CardTitle>Recent activity</CardTitle><Button variant="ghost" size="sm">This week</Button></div>
      <div className="csTxn__list">
        {TXNS.map((t) => (
          <div className="csTxn__row" key={t.name}>
            <span className="csTxn__ico">{t.ico}</span>
            <span className="csTxn__mid"><b>{t.name}</b><small>{t.date}</small></span>
            <span className={`csTxn__amt${t.pos ? " is-pos" : ""}`}>{t.pos ? "+" : "-"}{t.amt}</span>
          </div>
        ))}
      </div>
      <Button variant="quiet" className="csMoreBtn">See more</Button>
    </Card>
  );
}

/* ── lending · loan card ───────────────────────────────────────── */
function LoanCard() {
  const repaid = 62;
  return (
    <Card>
      <div className="csRowBetween"><span className="csHd"><IconTile><I.bank /></IconTile> Personal loan</span><Badge tone="success" dot>Active</Badge></div>
      <div className="csLoan__amt">12,400 <small>outstanding</small></div>
      <Progress value={repaid} />
      <div className="csRowBetween csLoan__meta"><span className="csMeta">{repaid}% repaid</span><span className="csMeta">7,600 of 20,000</span></div>
      <Divider className="csDiv" />
      <div className="csRowBetween"><div><div className="csMeta">Next payment</div><div className="csLoan__next">420 · Jul 12</div></div><Button variant="warm" size="sm">Pay now</Button></div>
    </Card>
  );
}

/* ── lending · deal card ───────────────────────────────────────── */
function DealCard() {
  return (
    <Card>
      <div className="csRowBetween"><span className="csHd"><IconTile><I.bolt /></IconTile> Cashback deal</span><Badge tone="warning">Limited</Badge></div>
      <div className="csDeal__big">5% <small>back on groceries</small></div>
      <CardDescription style={{ marginTop: 0 }}>Auto-applied at checkout with any Optimistic card. Ends in 6 days.</CardDescription>
      <Divider className="csDiv" />
      <div className="csRowBetween"><span className="csMeta">Up to 200 / month</span><Button variant="warm" size="sm">Claim deal</Button></div>
    </Card>
  );
}

/* ── lending · loan-deal (pre-approved offer) card ─────────────── */
function LoanDealCard() {
  return (
    <Card>
      <div className="csRowBetween"><span className="csHd"><IconTile><I.wallet /></IconTile> Pre-approved</span><Badge tone="brand">3 days left</Badge></div>
      <div className="csDeal__big csAccent">25,000 <small>up to</small></div>
      <div className="csKV">
        <div><div className="csMeta">APR from</div><b>8.9%</b></div>
        <div><div className="csMeta">Term</div><b>36 mo</b></div>
        <div><div className="csMeta">Monthly</div><b>792</b></div>
      </div>
      <Divider className="csDiv" />
      <div className="csRowBetween" style={{ gap: 8 }}><Button variant="warm" size="sm" style={{ flex: 1 }}>Accept offer</Button><Button variant="ghost" size="sm" style={{ flex: 1 }}>Details</Button></div>
    </Card>
  );
}

/* ── lending · loan market (P2P listing) card ──────────────────── */
function LoanMarketCard() {
  const funded = 74;
  return (
    <Card>
      <div className="csRowBetween"><span className="csHd"><Avatar name="Nova Retail" size="sm" /> Nova Retail</span><Badge tone="success">A+ rated</Badge></div>
      <div className="csMkt__row">
        <div><div className="csMeta">Amount</div><b>50,000</b></div>
        <div><div className="csMeta">APR</div><b className="csAccent">11.4%</b></div>
        <div><div className="csMeta">Term</div><b>24 mo</b></div>
      </div>
      <Progress value={funded} />
      <div className="csRowBetween csLoan__meta"><span className="csMeta">{funded}% funded</span><div className="csMkt__inv"><AvatarGroup><Avatar name="Ivy Lane" size="sm" /><Avatar name="Ravi Kumar" size="sm" /><Avatar name="Mia Ono" size="sm" /></AvatarGroup><span className="csMeta">+12 lenders</span></div></div>
      <Divider className="csDiv" />
      <Button variant="warm" size="sm" style={{ width: "100%" }}>Fund this loan</Button>
    </Card>
  );
}

/* ── company · shared parts ────────────────────────────────────── */
function LogoTile({ initials, color, size = 44 }: { initials: string; color: string; size?: number }) {
  return <span className="csLogo csLogo2" style={{ background: color, width: size, height: size }}>{initials}</span>;
}
function MetaRow({ items }: { items: string[] }) {
  const out: React.ReactNode[] = [];
  items.forEach((t, i) => {
    if (i > 0) out.push(<i key={`d${i}`} className="csMetaDot" />);
    out.push(<span key={i}>{t}</span>);
  });
  return <div className="csMetaRow">{out}</div>;
}
function StripCell({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return <div className="csStrip__cell"><div className="csStrip__label">{label}</div><div className={`csStrip__val${accent ? " is-accent" : ""}`}>{value}</div></div>;
}

const CO_METRICS = [
  { label: "Revenue", value: "115 Cr" },
  { label: "EBITDA", value: "49.5 Cr" },
  { label: "Net worth", value: "20.3 Cr" },
  { label: "PAT", value: "8.4 Cr" },
  { label: "Debt", value: "12 Cr" },
  { label: "Valuation", value: "340 Cr" },
];

/* ── company · full profile card (footer buttons OR action links) ─ */
function CompanyCard({ variant, accentFirst }: { variant: "buttons" | "actions"; accentFirst?: boolean }) {
  return (
    <Card>
      <div className="csCoHd2">
        <LogoTile initials="GL" color="#3E63DD" size={46} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="csCoTop"><div className="csCoName2">GreenLeaf Financial</div><Badge tone="success" dot>AAA</Badge></div>
          <MetaRow items={["Chennai, TN", "Oil & Gas Finance", "Est. 2014"]} />
        </div>
      </div>
      <div className="csTagRow">{["Consumer", "Oil & Gas", "Chemical", "Paint"].map((t) => <Tag key={t}>{t}</Tag>)}</div>
      <div className="csStrip csStrip3">
        {CO_METRICS.map((m, i) => <StripCell key={m.label} label={m.label} value={m.value} accent={accentFirst && i < 2} />)}
      </div>
      {variant === "buttons" ? (
        <div className="csCoFoot">
          <Button variant="quiet" size="sm">View profile</Button>
          <Button variant="ghost" size="sm" style={{ marginLeft: "auto" }}>Compare</Button>
          <Button variant="warm" size="sm">Express interest</Button>
        </div>
      ) : (
        <div className="csCoFoot" style={{ justifyContent: "flex-end" }}>
          <Button variant="quiet" size="sm">Shortlist</Button>
          <Button variant="quiet" size="sm">Express interest</Button>
          <Button variant="quiet" size="sm" aria-label="More"><I.dots /></Button>
        </div>
      )}
    </Card>
  );
}

/* ── company · grouped stat card (two labelled sections) ───────── */
function GroupedStatCard() {
  return (
    <Card>
      <div className="csGrp__hd"><I.star style={{ color: "var(--accent)" }} /> <span>Available for you</span></div>
      <div className="csStrip csStripRow">
        <StripCell label="Value of loans" value="329 Cr" accent />
        <StripCell label="No. of loans" value="1234" />
      </div>
      <div className="csGrp__hd" style={{ marginTop: 18 }}><I.users /> <span>In discussion with others</span></div>
      <div className="csStrip csStripRow">
        <StripCell label="Value of loans" value="182 Cr" />
        <StripCell label="No. of loans" value="640" />
      </div>
    </Card>
  );
}

/* ── company · marketplace listing (vertical) ──────────────────── */
function CompanyListing({ initials, logo, rating, tone, revenue }: { initials: string; logo: string; rating: string; tone: "success" | "info"; revenue: string }) {
  return (
    <Card interactive>
      <div className="csCoHd2">
        <LogoTile initials={initials} color={logo} size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="csCoTop">
            <div className="csCoName2">Pro Property Maintenance</div>
            <div className="csRateBox"><span className="csStrip__label">CRISIL</span><Badge tone={tone}>{rating}</Badge></div>
          </div>
          <MetaRow items={["Chennai, TN", "Oil & Gas", "Est. 2015"]} />
        </div>
      </div>
      <div className="csTagRow">{["LLP", "EV startup"].map((t) => <Tag key={t}>{t}</Tag>)}</div>
      <div className="csStrip csStripRow">
        <StripCell label="Revenue" value={revenue} accent />
        <StripCell label="EBITDA" value="5.9 Cr" />
        <StripCell label="PAT" value="4.8 Cr" />
        <StripCell label="Net worth" value="5 Cr" />
      </div>
      <div className="csCoFoot">
        <span className="csMeta">Incorporated 23 Jun 2015</span>
        <Button variant="warm" size="sm" style={{ marginLeft: "auto" }}>Express interest</Button>
      </div>
    </Card>
  );
}

/* ── company · marketplace listing (wide, full-row) ────────────── */
function CompanyListingWide() {
  return (
    <Card interactive style={{ gridColumn: "1 / -1" }}>
      <div className="csWide2">
        <div className="csWideL">
          <div className="csCoHd2">
            <LogoTile initials="PP" color="#7A1F3D" size={44} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="csCoName2">Pro Property Maintenance</div>
              <MetaRow items={["Chennai, TN", "Oil & Gas", "Chemical & Paint", "Est. 2015"]} />
              <div className="csTagRow" style={{ margin: "10px 0 0" }}>{["LLP", "EV startup"].map((t) => <Tag key={t}>{t}</Tag>)}</div>
            </div>
          </div>
        </div>
        <div className="csWideM">
          <div className="csStrip csStripRow">
            <StripCell label="Revenue" value="115 Cr" accent />
            <StripCell label="EBITDA" value="5.9 Cr" />
            <StripCell label="PAT" value="4.8 Cr" />
            <StripCell label="Net worth" value="5 Cr" />
          </div>
        </div>
        <div className="csWideR">
          <div className="csRateBox"><span className="csStrip__label">CRISIL</span><Badge tone="success">AAA</Badge></div>
          <Button variant="warm" size="sm">Express interest</Button>
        </div>
      </div>
    </Card>
  );
}

/* ── the demo ──────────────────────────────────────────────────── */
export default function CardDemo() {
  const [mode, setMode] = useState<"dark" | "light">("dark");
  return (
    <div className="cardScope" data-mode={mode} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 18 }}>
        <div style={{ display: "inline-flex", gap: 6 }}>
          {(["dark", "light"] as const).map((m) => (
            <Pill key={m} selected={mode === m} onClick={() => setMode(m)} style={{ textTransform: "capitalize" }}>{m}</Pill>
          ))}
        </div>
      </div>

      <div className="csWrap">
        <Row label="01 · Media" hint="Image, video and audio. Media sits flush; the body stays padded.">
          <ImageCard art="csArt--dawn" cat="TRAVEL" title="Harbor at dawn" place="Lisbon, PT" desc="A resting card: flush media, a title band and a hairline footer." />
          <VideoCard />
          <AudioCard />
        </Row>

        <Row label="02 · Interactive" hint="Cards that respond to intent: lift, tilt, flip.">
          <InteractiveCard />
          <TiltCard />
          <FlipCard />
        </Row>

        <Row label="03 · Background movement" hint="Motion lives behind the content, never on it." wide>
          <SpotlightCard />
          <div className="csBeam"><div className="csBeam__inner">
            <Badge style={{ alignSelf: "flex-start" }}>Border beam</Badge>
            <div>
              <div style={{ fontSize: "1rem", fontWeight: 650, color: "var(--text)" }}>A light runs the edge</div>
              <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: 6 }}>A single conic sweep circles the border to draw the eye.</div>
            </div>
          </div></div>
        </Row>

        <Row label="04 · Data & finance" hint="A payment card, KPI stats and asset tiles. The same parts, recombined in ember." wide>
          <PayCard />
          <StatCard icon={<I.wallet />} label="Balance" value="24,592" caption="vs last week" dir="up" delta="3.5%" />
          <FeatureStatCard />
          <StatCard icon={<I.bag />} label="Expenses" value="8,120" caption="vs last week" dir="down" delta="1.2%" />
          <AssetTile sym="SOL" name="Solana" price="142.30" dir="up" delta="4.7%" data={[3, 5, 4, 6, 5, 8, 7, 9]} tint="linear-gradient(135deg,#37E6C9,#1B3A7A)" />
          <AssetTile sym="BTC" name="Bitcoin" price="90,959" dir="down" delta="1.6%" data={[9, 8, 8, 6, 7, 5, 6, 4]} tint="linear-gradient(135deg,#FF8A24,#7C3C02)" />
        </Row>

        <Row label="05 · Lending & offers" hint="Loans, deals and a peer-to-peer listing, built from our Badge, Button, Progress and Avatar." wide>
          <LoanCard />
          <DealCard />
          <LoanDealCard />
          <LoanMarketCard />
        </Row>

        <Row label="06 · People & progress" hint="Profiles, goals and activity, built from avatars, rings and bars.">
          <ProfileCard />
          <GoalCard />
          <TxnCard />
        </Row>

        <Row label="07 · Company profile" hint="A business profile with a logo, meta line, tag row and a metric grid, plus a grouped stat card." wide>
          <CompanyCard variant="buttons" />
          <CompanyCard variant="actions" accentFirst />
          <GroupedStatCard />
        </Row>

        <Row label="08 · Marketplace listings" hint="Deal-flow cards with a CRISIL rating, revenue and key figures. The last one spans the full row." wide>
          <CompanyListing initials="PP" logo="#7A1F3D" rating="A+" tone="info" revenue="51.5 Cr" />
          <CompanyListing initials="AK" logo="#21503C" rating="AAA" tone="success" revenue="115 Cr" />
          <CompanyListing initials="NR" logo="#3E63DD" rating="AAA" tone="success" revenue="88 Cr" />
          <CompanyListingWide />
        </Row>
      </div>
    </div>
  );
}
