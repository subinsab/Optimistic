import Link from "next/link";
import Reveal from "../../_components/Reveal";
import type { ALL_ENTRIES } from "../_data/registry";
import InputDemo from "./InputDemo";
import InputConfigurator from "./InputConfigurator";
import InputBehavior from "./InputBehavior";
import CodeTabs from "./CodeTabs";
import RelatedSection from "./RelatedSection";
import s from "../docs.module.css";

const CLAUDE = encodeURIComponent(
  "Build the Optimistic Input component. Dark-field design system: heights 44/36/28px (L/M/S), radius 8px (6 at S), bg #0E0F12, border #242428, text #E7E9EE, placeholder #565A62. Focus: warm ring border rgba(255,122,0,.6) + 3px rgba(255,122,0,.14) glow. Validation: error border #EB4A4F, success border #1FA35C, each with a matching 3px focus glow and a message line below. Supports label, required marker, helper text, character count, leading icon (padding-left 38), trailing affix/button (padding-right 44), disabled (opacity .42), read-only. Controlled and uncontrolled, aria-invalid on error, label linked by htmlFor/id. Deliver React + CSS."
);

const CODE = [
  { label: "HTML", code: `<label class="o-field">
  <span class="o-field__label">Work email</span>
  <input class="o-input o-input--m" type="email" placeholder="you@company.com" />
  <span class="o-field__hint">We only use it to send receipts.</span>
</label>

<input class="o-input o-input--m is-error" aria-invalid="true" />` },
  { label: "CSS", code: `.o-input {
  width: 100%; height: 36px; padding: 0 12px;
  font: inherit; color: #e7e9ee;
  background: #0e0f12; border: 1px solid #242428; border-radius: 8px;
  transition: border-color .2s, box-shadow .2s;
}
.o-input::placeholder { color: #565a62; }
.o-input:focus {
  outline: none; border-color: rgba(255,122,0,.6);
  box-shadow: 0 0 0 3px rgba(255,122,0,.14);
}
.o-input.is-error   { border-color: #eb4a4f; }
.o-input.is-success { border-color: #1fa35c; }` },
  { label: "React", code: `import { Input } from "@optimistic/ui";

<Input label="Work email" type="email" placeholder="you@company.com"
       hint="We only use it to send receipts." />

<Input label="Amount" value={amt} onChange={setAmt}
       affix="USD" />

<Input label="Search" icon={<SearchIcon />} placeholder="Search…" />

<Input label="Email" value={email} onChange={setEmail}
       status={valid ? "success" : "error"}
       message={valid ? "Looks good." : "Enter a full email."} />` },
  { label: "Angular", code: `<o-input label="Work email" type="email"
         placeholder="you@company.com"
         hint="We only use it to send receipts."></o-input>

<o-input label="Amount" [(value)]="amount" affix="USD"></o-input>

<o-input label="Email" [(value)]="email"
         [status]="valid ? 'success' : 'error'"
         [message]="valid ? 'Looks good.' : 'Enter a full email.'">
</o-input>` },
  { label: "Async / API", code: `// Debounced availability check — optimistic hint, honest correction.
function UsernameField() {
  const [name, setName] = useState("");
  const [state, setState] = useState/* idle | checking | ok | taken */("idle");

  useEffect(() => {
    if (name.length < 3) return setState("idle");
    setState("checking");
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      fetch(\`/api/username?q=\${name}\`, { signal: ctrl.signal })
        .then(r => r.json())
        .then(d => setState(d.available ? "ok" : "taken"))
        .catch(e => e.name !== "AbortError" && setState("idle"));
    }, 300);                       // debounce keystrokes
    return () => { clearTimeout(t); ctrl.abort(); };  // cancel stale checks
  }, [name]);

  return (
    <Input label="Username" value={name} onChange={setName}
           status={state === "taken" ? "error" : state === "ok" ? "success" : undefined}
           message={{ checking: "Checking…", taken: "Already taken.",
                      ok: "Available." }[state]} />
  );
}` },
];

export default function InputDoc({ related }: { related: typeof ALL_ENTRIES }) {
  return (
    <>
      <Reveal delay={80}>
        <div className={s.resRow}>
          <a className={s.resChip} href="https://www.figma.com/community/file/optimistic-design-system" target="_blank" rel="noreferrer">
            <i>◇</i> Open the Figma file ↗
          </a>
          <a className={s.resChip} href={`https://claude.ai/new?q=${CLAUDE}`} target="_blank" rel="noreferrer">
            <i>✳</i> Start building with Claude ↗
          </a>
        </div>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Live Demo — Fully Interactive</div>
          <div className={s.secBody}><InputDemo /></div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Configuration</div>
          <div className={s.secBody}><InputConfigurator /></div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Behavior — The Engineering Contract</div>
          <div className={s.secBody}>
            <div className={s.subLabel}>Props</div>
            <table className={s.tokTable}>
              <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>value / defaultValue</td><td>string</td><td>—</td><td>Controlled or uncontrolled content</td></tr>
                <tr><td className={s.tokName}>type</td><td>text · email · password · number…</td><td>text</td><td>Native input type</td></tr>
                <tr><td className={s.tokName}>label</td><td>string</td><td>—</td><td>Linked by htmlFor/id; always visible</td></tr>
                <tr><td className={s.tokName}>hint</td><td>string</td><td>—</td><td>Helper text below the field</td></tr>
                <tr><td className={s.tokName}>status</td><td>error · success</td><td>—</td><td>Validation border + message colour</td></tr>
                <tr><td className={s.tokName}>icon / affix</td><td>ReactNode / string</td><td>—</td><td>Leading glyph or trailing adornment</td></tr>
                <tr><td className={s.tokName}>size</td><td>l · m · s</td><td>m</td><td>44 / 36 / 28px</td></tr>
                <tr><td className={s.tokName}>disabled / readOnly</td><td>boolean</td><td>false</td><td>Blocks editing; read-only keeps focus</td></tr>
              </tbody>
            </table>
            <div className={s.subLabel}>Events &amp; keyboard</div>
            <table className={s.tokTable}>
              <thead><tr><th>Event</th><th>Payload</th><th>Fires when</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>onChange</td><td>ChangeEvent</td><td>Every keystroke, paste and cut</td></tr>
                <tr><td className={s.tokName}>onFocus / onBlur</td><td>FocusEvent</td><td>Focus enters / leaves; validate on blur</td></tr>
                <tr><td className={s.tokName}>Enter</td><td>—</td><td>Submits the surrounding form</td></tr>
                <tr><td className={s.tokName}>aria-invalid</td><td>boolean</td><td>Set true whenever status is error</td></tr>
              </tbody>
            </table>
            <div className={s.subLabel}>Live behavior — every demo is real</div>
            <InputBehavior />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Anatomy</div>
          <div className={s.secBody}>
            <div className={s.anatomy}>
              <div className={s.anatomyStage}>
                <div className={s.vAnaWrap}>
                  <div className={s.inField} style={{ maxWidth: "none" }}>
                    <span className={s.inLabelRow}>
                      <span className={s.inLabel}>Work email <span className={s.inReq}>*</span></span>
                    </span>
                    <span className={s.inWrap}>
                      <input className={`${s.oinput} ${s.inM}`} defaultValue="ada@team.com" aria-label="Anatomy input" readOnly />
                    </span>
                    <span className={s.inHint}>We only use it to send receipts.</span>
                  </div>
                  {/* 1 label, 2 container, 4 hint = left horizontal;
                      3 value = vertical, dropping into the field */}
                  <span className={s.vAnaMark} style={{ top: 8 }} aria-hidden="true">
                    <b className={s.anaBadge}>1</b><i className={s.vAnaConn} />
                  </span>
                  <span className={s.vAnaMark} style={{ top: 41 }} aria-hidden="true">
                    <b className={s.anaBadge}>2</b><i className={s.vAnaConn} />
                  </span>
                  <span className={s.vAnaMarkTop} style={{ left: "55%", top: -32 }} aria-hidden="true">
                    <b className={s.anaBadge}>3</b><i className={s.vAnaConnV} style={{ height: 51 }} />
                  </span>
                  <span className={s.vAnaMark} style={{ top: 77 }} aria-hidden="true">
                    <b className={s.anaBadge}>4</b><i className={s.vAnaConn} />
                  </span>
                </div>
              </div>
              <div className={s.anaList}>
                <div className={s.anaItem}>
                  <span className={s.anaNum}>1</span>
                  <span className={s.anaName}>Label &amp; required</span>
                  <span className={s.anaDesc}>Mono caption, always present. A warm asterisk marks required fields.</span>
                </div>
                <div className={s.anaItem}>
                  <span className={s.anaNum}>2</span>
                  <span className={s.anaName}>Container</span>
                  <span className={s.anaDesc}>Fixed height per size, radius 8, warm focus ring on focus-visible.</span>
                </div>
                <div className={s.anaItem}>
                  <span className={s.anaNum}>3</span>
                  <span className={s.anaName}>Value / placeholder</span>
                  <span className={s.anaDesc}>Placeholder is a hint, never a substitute for the label.</span>
                </div>
                <div className={s.anaItem}>
                  <span className={s.anaNum}>4</span>
                  <span className={s.anaName}>Helper / message</span>
                  <span className={s.anaDesc}>Guidance in calm grey; validation swaps it for green or red.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Do&apos;s and Don&apos;ts</div>
          <div className={s.secBody}>
            <div className={s.ddGrid}>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}>
                  <div className={s.inField}>
                    <span className={s.inLabel}>Email</span>
                    <input className={`${s.oinput} ${s.inM}`} placeholder="you@company.com" readOnly />
                  </div>
                </div>
                <p className={s.ddText}>Keep the label visible above the field. It stays legible once the field is filled.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}>
                  <input className={`${s.oinput} ${s.inM}`} placeholder="Email" readOnly style={{ maxWidth: 220 }} />
                </div>
                <p className={s.ddText}>Don&apos;t rely on the placeholder as the label. It vanishes the moment someone types.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDo}`}>
                <div className={s.ddHead}>✓ Do</div>
                <div className={s.ddStage}>
                  <div className={s.inField}>
                    <input className={`${s.oinput} ${s.inM} ${s.inErr}`} defaultValue="not-an-email" readOnly style={{ maxWidth: 220 }} />
                    <span className={`${s.inMsg} ${s.inMsgErr}`}>That address is missing an @.</span>
                  </div>
                </div>
                <p className={s.ddText}>Say what is wrong and how to fix it, in plain words, right under the field.</p>
              </div>
              <div className={`${s.ddCard} ${s.ddDont}`}>
                <div className={s.ddHead}>✕ Don&apos;t</div>
                <div className={s.ddStage}>
                  <div className={s.inField}>
                    <input className={`${s.oinput} ${s.inM} ${s.inErr}`} defaultValue="not-an-email" readOnly style={{ maxWidth: 220 }} />
                    <span className={`${s.inMsg} ${s.inMsgErr}`}>Error 422: invalid input</span>
                  </div>
                </div>
                <p className={s.ddText}>Never make the reader decode a status code. The field is not a server log.</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>In context: Examples</div>
          <div className={s.secBody}>
            <div className={s.ctxGrid}>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>A · In a form</div>
                <div className={s.ctxStage}>
                  <div className={s.inField}>
                    <span className={s.inLabel}>Full name</span>
                    <input className={`${s.oinput} ${s.inM}`} defaultValue="Ada Lovelace" readOnly />
                    <span className={s.inLabel} style={{ marginTop: 4 }}>Work email</span>
                    <input className={`${s.oinput} ${s.inM}`} placeholder="you@company.com" readOnly />
                  </div>
                </div>
                <p className={s.ctxCaption}>Stacked fields, labels above, consistent width. One idea per row.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>B · As search</div>
                <div className={s.ctxStage}>
                  <span className={s.inWrap} style={{ width: "100%" }}>
                    <span className={s.inIcon}>
                      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M10.5 10.5 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </span>
                    <input className={`${s.oinput} ${s.inM} ${s.inHasIcon}`} placeholder="Search clients…" readOnly />
                  </span>
                </div>
                <p className={s.ctxCaption}>Leading icon, no label needed. The placeholder carries the intent here.</p>
              </div>
              <div className={s.ctxCard}>
                <div className={s.ctxKicker}>C · With affix</div>
                <div className={s.ctxStage}>
                  <div className={s.inField}>
                    <span className={s.inLabel}>Budget</span>
                    <span className={s.inWrap}>
                      <input className={`${s.oinput} ${s.inM} ${s.inHasAffix}`} defaultValue="2,500" readOnly />
                      <span className={s.inAffix}>USD</span>
                    </span>
                  </div>
                </div>
                <p className={s.ctxCaption}>Units and adornments sit inside as an affix, never in the value.</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Measurements &amp; Tokens</div>
          <div className={s.secBody}>
            <table className={s.tokTable}>
              <thead><tr><th>Token</th><th>Value</th><th>Role</th></tr></thead>
              <tbody>
                <tr><td className={s.tokName}>--in-height-l/m/s</td><td>44 / 36 / 28px</td><td>Matches the button scale</td></tr>
                <tr><td className={s.tokName}>--in-radius</td><td>8px</td><td>6px at size S</td></tr>
                <tr><td className={s.tokName}>--in-bg</td><td><span className={s.tokSwatch} style={{ background: "#0e0f12" }} />#0E0F12</td><td>Inset field surface</td></tr>
                <tr><td className={s.tokName}>--in-border</td><td><span className={s.tokSwatch} style={{ background: "#242428" }} />#242428</td><td>Resting border</td></tr>
                <tr><td className={s.tokName}>--in-text</td><td><span className={s.tokSwatch} style={{ background: "#e7e9ee" }} />#E7E9EE</td><td>Entered value</td></tr>
                <tr><td className={s.tokName}>--in-placeholder</td><td><span className={s.tokSwatch} style={{ background: "#565a62" }} />#565A62</td><td>Placeholder hint</td></tr>
                <tr><td className={s.tokName}>--in-focus</td><td>rgba(255,122,0,.6) + .14 glow</td><td>Warm ring on focus</td></tr>
                <tr><td className={s.tokName}>--in-error</td><td><span className={s.tokSwatch} style={{ background: "#eb4a4f" }} />#EB4A4F</td><td>Invalid border &amp; message</td></tr>
                <tr><td className={s.tokName}>--in-success</td><td><span className={s.tokSwatch} style={{ background: "#1fa35c" }} />#1FA35C</td><td>Valid border &amp; message</td></tr>
                <tr><td className={s.tokName}>--in-pad-icon</td><td>38px</td><td>Left pad with a leading icon</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={s.docSection}>
          <div className={s.secLabel}>Code</div>
          <div className={s.secBody}><CodeTabs tabs={CODE} /></div>
        </section>
      </Reveal>

      <RelatedSection related={related} />
    </>
  );
}
