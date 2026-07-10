"use client";

import { Plus, Spinner } from "./ButtonDemo";
import { useCfg, setCfg } from "./configStore";
import s from "../docs.module.css";

/* the configuration playground — compose a button, read its code.
   Writes to the shared store so "Build with Claude" can reuse the state. */

const VARIANTS = ["Primary", "Brand", "Gradient", "Ghost", "Quiet", "Success", "Error", "Info"] as const;
const SIZES = ["L", "M", "S"] as const;
const STATES = ["Default", "Loading", "Disabled"] as const;
const ICONS = ["None", "Leading"] as const;
const TYPES = ["Button", "Submit", "Link"] as const;
const TARGETS = ["React", "Angular", "HTML"] as const;

const VCLASS: Record<string, string> = {
  Primary: "vPrimary", Brand: "vWarm", Gradient: "vGradient", Ghost: "vGhost",
  Quiet: "vQuiet", Success: "vSuccess", Error: "vError", Info: "vInfo",
};
const SCLASS: Record<string, string> = { L: "l", M: "m", S: "sm" };

function Chips({
  label, options, value, onPick,
}: { label: string; options: readonly string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className={s.configGroup}>
      <span className={s.configLabel}>{label}</span>
      <div className={s.configChips} role="radiogroup" aria-label={label}>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={value === o}
            className={`${s.configChip} ${value === o ? s.configChipOn : ""}`}
            onClick={() => onPick(o)}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

/* framework-aware snippet for the live code readout */
function snippet(c: ReturnType<typeof useCfg>) {
  const v = c.variant.toLowerCase();
  const size = c.size.toLowerCase();
  const loading = c.state === "Loading";
  const disabled = c.state === "Disabled";
  const iconR = c.icon === "Leading";
  if (c.target === "React") {
    const props = [
      `variant="${v}"`, `size="${size}"`,
      c.type === "Submit" ? `type="submit"` : "",
      c.type === "Link" ? `href="/next"` : "",
      iconR ? "icon={<Plus />}" : "",
      loading ? "loading" : "",
      disabled ? "disabled" : "",
    ].filter(Boolean).join(" ");
    return { pre: "<", tag: c.type === "Link" ? "Button as=\"a\"" : "Button", mid: ` ${props}>`, label: c.label, close: "</Button>" };
  }
  if (c.target === "Angular") {
    const attrs = [
      `variant="${v}"`, `size="${size}"`,
      c.type === "Submit" ? `type="submit"` : "",
      c.type === "Link" ? `href="/next"` : "",
      iconR ? `icon="plus"` : "",
      loading ? `[loading]="true"` : "",
      disabled ? "disabled" : "",
    ].filter(Boolean).join(" ");
    return { pre: "<", tag: "o-button", mid: ` ${attrs}>`, label: c.label, close: "</o-button>" };
  }
  // HTML
  const tag = c.type === "Link" ? "a" : "button";
  const cls = `o-btn o-btn--${size} o-btn--${v}${loading ? " is-loading" : ""}`;
  const attrs = [
    `class="${cls}"`,
    c.type === "Submit" ? `type="submit"` : "",
    c.type === "Link" ? `href="/next"` : "",
    disabled ? "disabled" : "",
    loading ? `aria-busy="true"` : "",
  ].filter(Boolean).join(" ");
  return { pre: "<", tag, mid: ` ${attrs}>`, label: c.label, close: `</${tag}>` };
}

export default function ButtonConfigurator() {
  const c = useCfg();
  const loading = c.state === "Loading";
  const disabled = c.state === "Disabled";
  const cls = [
    s.obtn, s[SCLASS[c.size] as keyof typeof s], s[VCLASS[c.variant] as keyof typeof s],
    loading ? s.isLoading : "",
  ].join(" ");
  const code = snippet(c);

  const preview =
    c.type === "Link" ? (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a className={cls} role="button" aria-busy={loading || undefined}>
        {loading ? <Spinner /> : c.icon === "Leading" ? <Plus w={c.size === "S" ? 11 : 13} /> : null}
        {c.label || "Label"}
      </a>
    ) : (
      <button
        className={cls}
        type={c.type === "Submit" ? "submit" : "button"}
        disabled={disabled}
        aria-busy={loading || undefined}
      >
        {loading ? <Spinner /> : c.icon === "Leading" ? <Plus w={c.size === "S" ? 11 : 13} /> : null}
        {c.label || "Label"}
      </button>
    );

  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Variant" options={VARIANTS} value={c.variant} onPick={(v) => setCfg({ variant: v })} />
        <Chips label="Size" options={SIZES} value={c.size} onPick={(v) => setCfg({ size: v })} />
        <Chips label="State" options={STATES} value={c.state} onPick={(v) => setCfg({ state: v })} />
        <Chips label="Icon" options={ICONS} value={c.icon} onPick={(v) => setCfg({ icon: v })} />
        <Chips label="Render as" options={TYPES} value={c.type} onPick={(v) => setCfg({ type: v })} />
        <Chips label="Target" options={TARGETS} value={c.target} onPick={(v) => setCfg({ target: v })} />
        <div className={s.configGroup}>
          <span className={s.configLabel}>Label</span>
          <input
            className={s.configInput}
            value={c.label}
            maxLength={28}
            onChange={(e) => setCfg({ label: e.target.value })}
            placeholder="Label"
            aria-label="Button label"
          />
        </div>
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>{preview}</div>
        <div className={s.configCode} aria-label="Generated code">
          {code.pre}<b>{code.tag}</b>{code.mid}{code.label}{code.close}
        </div>
      </div>
    </div>
  );
}
