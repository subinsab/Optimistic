/* Plain data module (NO "use client") so both the client CodeSurface and the
   server-rendered CodeBlockDoc can import the snippet arrays directly. Exporting
   non-component data from a "use client" file turns it into a client reference,
   which reads as undefined on the server. */

export type Tok = [cls: string, val: string];

export const SNIPPETS: Record<string, { lang: string; toks: Tok[] }> = {
  tsx: {
    lang: "tsx",
    toks: [
      ["kw", "import"], ["", " { "], ["var", "useState"], ["", " } "], ["kw", "from"], ["", " "], ["str", "\"react\""], ["punc", ";"], ["", "\n\n"],
      ["cmt", "// Optimistic like — render the result first"], ["", "\n"],
      ["kw", "function"], ["", " "], ["fn", "Like"], ["punc", "("], ["", "{ "], ["var", "id"], ["", " }"], ["punc", ")"], ["", " {"], ["", "\n"],
      ["", "  "], ["kw", "const"], ["", " ["], ["var", "liked"], ["punc", ","], ["", " "], ["var", "setLiked"], ["", "] = "], ["fn", "useState"], ["punc", "("], ["kw", "false"], ["punc", ")"], ["punc", ";"], ["", "\n"],
      ["", "  "], ["kw", "return"], ["", " ("], ["", "\n"],
      ["", "    "], ["punc", "<"], ["tag", "button"], ["", " "], ["attr", "aria-pressed"], ["", "={"], ["var", "liked"], ["", "} "], ["attr", "onClick"], ["", "={() "], ["kw", "=>"], ["", " "], ["fn", "setLiked"], ["punc", "("], ["punc", "!"], ["var", "liked"], ["punc", ")"], ["", "}"], ["punc", ">"], ["", "\n"],
      ["", "      {"], ["var", "liked"], ["", " "], ["punc", "?"], ["", " "], ["str", "\"★\""], ["", " "], ["punc", ":"], ["", " "], ["str", "\"☆\""], ["", "}"], ["", "\n"],
      ["", "    "], ["punc", "</"], ["tag", "button"], ["punc", ">"], ["", "\n"],
      ["", "  );"], ["", "\n"],
      ["punc", "}"],
    ],
  },
  css: {
    lang: "css",
    toks: [
      ["fn", ".o-btn"], ["", " {"], ["", "\n"],
      ["", "  "], ["attr", "background"], ["punc", ":"], ["", " "], ["num", "#ff7a00"], ["punc", ";"], ["", " "], ["cmt", "/* the one warm accent */"], ["", "\n"],
      ["", "  "], ["attr", "color"], ["punc", ":"], ["", " "], ["num", "#1a0e04"], ["punc", ";"], ["", "\n"],
      ["", "  "], ["attr", "border-radius"], ["punc", ":"], ["", " "], ["num", "8px"], ["punc", ";"], ["", "\n"],
      ["", "  "], ["attr", "height"], ["punc", ":"], ["", " "], ["num", "40px"], ["punc", ";"], ["", "\n"],
      ["punc", "}"], ["", "\n"],
      ["fn", ".o-btn"], ["punc", ":"], ["kw", "hover"], ["", " { "], ["attr", "filter"], ["punc", ":"], ["", " "], ["fn", "brightness"], ["punc", "("], ["num", "1.05"], ["punc", ")"], ["", "; }"],
    ],
  },
  shell: {
    lang: "shell",
    toks: [
      ["punc", "$"], ["", " "], ["fn", "npm"], ["", " install "], ["var", "@optimistic/ui"], ["", "\n"],
      ["cmt", "# 54 components, one warm accent"], ["", "\n"],
      ["punc", "$"], ["", " "], ["fn", "optimistic"], ["", " sync "], ["attr", "--tokens"], ["", "\n"],
      ["kw", "✓"], ["", " reconciled · "], ["num", "142ms"],
    ],
  },
};
