import v from "./visuals.module.css";

/* primitive → semantic → component, the three-layer token architecture */
export function TokenLayers() {
  return (
    <div className={v.bviz}>
      <div className={v.layers}>
        <div className={`${v.layer} ${v["layer--prim"]}`}>
          <span className={v.layerTag}>Primitive</span>
          <div><div className={v.layerName}>What values exist</div><div className={v.layerDesc}>carbon-900 = #0E0F12, ember-500 = #FF7A00, space-4 = 16px. Raw, named, opinion-free.</div></div>
        </div>
        <div className={v.layerArrow}>↓ referenced by</div>
        <div className={`${v.layer} ${v["layer--sem"]}`}>
          <span className={v.layerTag}>Semantic</span>
          <div><div className={v.layerName}>What they mean</div><div className={v.layerDesc}>--surface = carbon-900, --accent = ember-500, --danger = scarlet-500. Intent, not hex.</div></div>
        </div>
        <div className={v.layerArrow}>↓ referenced by</div>
        <div className={`${v.layer} ${v["layer--comp"]}`}>
          <span className={v.layerTag}>Component</span>
          <div><div className={v.layerName}>Where they apply</div><div className={v.layerDesc}>button-bg = --accent, card-surface = --surface. Each layer only points at the one below it.</div></div>
        </div>
      </div>
    </div>
  );
}

/* Figma variables become platform tokens through a build, not a conversation. */
export function TokenPipeline() {
  return (
    <div className={v.bviz}>
      <div className={v.flow}>
        <div className={v.flowNode}>
          <span className={v.flowTag}>Source</span>
          <div className={v.flowName}>Figma variables</div>
          <div className={v.flowSub}>Collections and modes hold every decision once.</div>
        </div>
        <div className={v.flowArrow} aria-hidden="true">→</div>
        <div className={v.flowNode}>
          <span className={v.flowTag}>Build</span>
          <div className={v.flowName}>Token transform</div>
          <div className={v.flowSub}>Export on publish, generate the platform files.</div>
        </div>
        <div className={v.flowArrow} aria-hidden="true">→</div>
        <div className={`${v.flowNode} ${v.flowNodeEmber}`}>
          <span className={v.flowTag}>Output</span>
          <div className={v.flowName}>Platform tokens</div>
          <div className={v.flowChips}><span>Web</span><span>iOS</span><span>Android</span></div>
        </div>
      </div>
    </div>
  );
}

/* Install once, import, ship. The fast path is the working path. */
export function InstallSteps() {
  const steps = [
    { n: "01", name: "Install once", code: "npx optimistic-ui add button card table" },
    { n: "02", name: "Import and use", code: 'import { Button } from "@/optimistic-ui"' },
    { n: "03", name: "Ship with defaults", code: "<Button>Get started</Button>   // accessible, on-brand" },
  ];
  return (
    <div className={v.bviz}>
      <div className={v.steps}>
        {steps.map((s) => (
          <div key={s.n} className={v.step}>
            <span className={v.stepNum}>{s.n}</span>
            <div className={v.stepBody}>
              <div className={v.stepName}>{s.name}</div>
              <code className={v.stepCode}>{s.code}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* The context, tokens, components, rules, is the input that keeps generation on-system. */
export function ClaudeLoop() {
  return (
    <div className={v.bviz}>
      <div className={v.flow}>
        <div className={v.flowNode}>
          <span className={v.flowTag}>Describe</span>
          <div className={v.flowName}>Prompt in plain words</div>
          <div className={v.flowSub}>&quot;A pricing card using our tokens and Button.&quot;</div>
        </div>
        <div className={v.flowArrow} aria-hidden="true">→</div>
        <div className={`${v.flowNode} ${v.flowNodeEmber}`}>
          <span className={v.flowTag}>Generate</span>
          <div className={v.flowName}>System-aware code</div>
          <div className={v.flowSub}>Real components, real tokens, no invented values.</div>
        </div>
        <div className={v.flowArrow} aria-hidden="true">→</div>
        <div className={v.flowNode}>
          <span className={v.flowTag}>Review</span>
          <div className={v.flowName}>Diff and merge</div>
          <div className={v.flowSub}>Lint blocks any raw hex that slipped in.</div>
        </div>
      </div>
      <div className={v.flowLoop}>The context you feed it, tokens, components, and rules, is what keeps every generation on-system.</div>
    </div>
  );
}

function Bars({ title, rows, unit }: { title: string; rows: { label: string; val: number; max: number; ember?: boolean }[]; unit: string }) {
  return (
    <div className={v.bviz}>
      <div className={v.barChart}>
        <div className={v.barTitle}>{title}</div>
        {rows.map((r, i) => (
          <div key={i} className={v.barRow}>
            <span className={v.barLabel}>{r.label}</span>
            <span className={v.barTrack}>
              <span className={`${v.barFill} ${r.ember ? v.barFillEmber : ""}`} style={{ width: `${Math.round((r.val / r.max) * 100)}%` }} />
            </span>
            <span className={v.barVal}>{r.val}{unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Time from brief to shipped screen shrinks as the system carries more. */
export function ShipBars() {
  return (
    <Bars title="Weeks from brief to a shipped, on-brand screen" unit="w" rows={[
      { label: "Assemble from scratch", val: 8, max: 8 },
      { label: "With a component library", val: 5, max: 8 },
      { label: "With the full system", val: 2, max: 8, ember: true },
    ]} />
  );
}

/* Relative front-end effort, once the UI layer stops being rebuilt per team. */
export function CostBars() {
  return (
    <Bars title="Relative front-end engineering effort (index)" unit="" rows={[
      { label: "UI rebuilt and reconciled per team", val: 100, max: 100 },
      { label: "Shared parts, drifting tokens", val: 88, max: 100 },
      { label: "One governed system", val: 70, max: 100, ember: true },
    ]} />
  );
}

/* One source, many surfaces. Cost per new surface trends toward zero. */
export function ScaleFan() {
  const teams = ["Web app", "Marketing", "iOS", "Android", "Admin", "Docs", "Email", "Partner API"];
  return (
    <div className={v.bviz}>
      <div className={v.scaleWrap}>
        <div className={v.scaleCore}>
          <span className={v.flowTag}>One source</span>
          <div className={v.flowName}>Tokens + components</div>
        </div>
        <div className={v.scaleArrow} aria-hidden="true">→</div>
        <div className={v.scaleGrid}>
          {teams.map((t) => <span key={t} className={v.scaleCell}>{t}</span>)}
        </div>
      </div>
      <div className={v.flowLoop}>Add the ninth surface and it inherits everything already decided. The marginal cost of consistency keeps falling.</div>
    </div>
  );
}

/* What an audit surfaces: named findings, ranked by how much they hurt. */
export function AuditFindings() {
  const rows: { text: string; tag: string; tone: "bad" | "warn" | "good" }[] = [
    { text: "Four different grays used for the same card surface", tag: "Drift", tone: "bad" },
    { text: "Primary button contrast fails on the muted background", tag: "A11y", tone: "bad" },
    { text: "Spacing of 12px and 16px used interchangeably for the same gap", tag: "Scale", tone: "warn" },
    { text: "Two modal components ship, one of them undocumented", tag: "Dupe", tone: "warn" },
    { text: "Focus ring present and consistent across inputs", tag: "Pass", tone: "good" },
  ];
  return (
    <div className={v.bviz}>
      <div className={v.check}>
        {rows.map((r, i) => (
          <div key={i} className={v.checkRow}>
            <span className={`${v.checkTag} ${v[`tag_${r.tone}`]}`}>{r.tag}</span>
            <span className={v.checkText}>{r.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Using a system well is a set of habits, not a rulebook. */
export function PracticeList() {
  const rows: { text: string; tag: string; tone: "bad" | "good" }[] = [
    { text: "Style with semantic tokens, never a raw hex or px", tag: "Do", tone: "good" },
    { text: "Reach for an existing component before building a new one", tag: "Do", tone: "good" },
    { text: "File a request when the system has a real gap", tag: "Do", tone: "good" },
    { text: "Fork a component to make a private one-off tweak", tag: "Avoid", tone: "bad" },
    { text: "Hardcode a value because the token you need is missing", tag: "Avoid", tone: "bad" },
  ];
  return (
    <div className={v.bviz}>
      <div className={v.check}>
        {rows.map((r, i) => (
          <div key={i} className={v.checkRow}>
            <span className={`${v.checkTag} ${v[`tag_${r.tone}`]}`}>{r.tag}</span>
            <span className={v.checkText}>{r.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
