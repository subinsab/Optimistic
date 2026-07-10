"use client";

import { useState } from "react";
import s from "../docs.module.css";
import { CodeSurface } from "./CodeBlockDemo";
import { SNIPPETS } from "./codeSnippets";

const LANG = ["tsx", "css", "shell"] as const;
const NUMS = ["Off", "On"] as const;
const WRAP = ["Off", "On"] as const;

function Chips({ label, options, value, onPick }: { label: string; options: readonly string[]; value: string; onPick: (v: string) => void }) {
  return (
    <div className={s.configGroup}><span className={s.configLabel}>{label}</span>
      <div className={s.configChips} role="radiogroup" aria-label={label}>
        {options.map((o) => <button key={o} type="button" role="radio" aria-checked={value === o}
          className={`${s.configChip} ${value === o ? s.configChipOn : ""}`} onClick={() => onPick(o)}>{o}</button>)}
      </div>
    </div>
  );
}

export default function CodeBlockConfigurator() {
  const [lang, setLang] = useState<string>("tsx");
  const [nums, setNums] = useState("On");
  const [wrap, setWrap] = useState("Off");
  const snip = SNIPPETS[lang];
  const numProp = nums === "On" ? " showLineNumbers" : "";
  const wrapProp = wrap === "On" ? " wrap" : "";
  return (
    <div className={s.config}>
      <div className={s.configControls}>
        <Chips label="Language" options={LANG} value={lang} onPick={setLang} />
        <Chips label="Line numbers" options={NUMS} value={nums} onPick={setNums} />
        <Chips label="Wrap" options={WRAP} value={wrap} onPick={setWrap} />
      </div>
      <div className={s.configRight}>
        <div className={s.configPreview}>
          <div style={{ width: "100%", maxWidth: 300 }}>
            <CodeSurface lang={snip.lang} toks={snip.toks} showNums={nums === "On"} wrap={wrap === "On"} />
          </div>
        </div>
        <div className={s.configCode}>{"<"}<b>CodeBlock</b> language=&quot;{lang}&quot;{numProp}{wrapProp} {"/>"}</div>
      </div>
    </div>
  );
}
