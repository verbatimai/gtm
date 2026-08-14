"use client";

import { useMemo, useState } from "react";

/**
 * DEMO 2 — the formatter. Paste (or type) a messy transcript, preview the
 * formatting modes. Everything runs locally in the browser with clearly
 * rule-based sample transformations — no remote model is pretended.
 */

const SAMPLE =
  "okay so um basically I looked at the numbers again and uh I think the pricing page is like the main issue you know people just drop off there";

const FILLERS =
  /\b(um+|uh+|erm|like|you know|i mean|basically|actually|okay so|so um|kind of|sort of)\b[,\s]*/gi;

function stripFillers(t: string) {
  return t.replace(FILLERS, "").replace(/\s{2,}/g, " ").trim();
}

function sentenceCase(t: string) {
  return t
    .split(/(?<=[.?!])\s+/)
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(" ");
}

function punctuate(t: string) {
  const out = t.trim();
  if (!out) return out;
  return /[.?!]$/.test(out) ? out : `${out}.`;
}

type Mode = "Prose" | "Message" | "Raw";
const MODES: Mode[] = ["Prose", "Message", "Raw"];

function transform(raw: string, mode: Mode): string {
  if (mode === "Raw") return raw;
  const clean = punctuate(sentenceCase(stripFillers(raw)));
  if (mode === "Prose") return clean;
  // Message: a touch more casual — keep it short and direct
  return clean.replace(/\bI think\b/gi, "I think").trim();
}

export default function DemoFormatter() {
  const [text, setText] = useState(SAMPLE);
  const [mode, setMode] = useState<Mode>("Prose");

  const out = useMemo(() => transform(text, mode), [text, mode]);

  return (
    <div className="surface overflow-hidden rounded-xl">
      <div className="border-b border-line px-5 py-4">
        <label className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-muted">
          your messy transcript
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full resize-y rounded-lg border border-line bg-transparent px-3 py-2.5 text-[15px] leading-relaxed text-foreground outline-none focus:border-foreground/40"
        />
      </div>

      <div className="flex items-center gap-1 border-b border-line px-3 py-2.5">
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-lg px-3.5 py-1.5 text-[13.5px] font-medium transition-colors ${
              m === mode
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            }`}
          >
            {m}
          </button>
        ))}
        <span className="ml-auto hidden font-mono text-[10.5px] uppercase tracking-wider text-muted sm:block">
          sample rules · runs in your browser
        </span>
      </div>

      <div key={mode} className="min-h-[5.5rem] px-5 py-4 [animation:fadeUp_.3s_ease]">
        <p className={`text-[15.5px] leading-relaxed ${mode === "Raw" ? "text-muted" : "text-foreground"}`}>
          {out || <span className="text-muted">say something…</span>}
        </p>
      </div>
    </div>
  );
}
