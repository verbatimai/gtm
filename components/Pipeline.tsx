"use client";

import Reveal from "./Reveal";

type Node = { title: string; sub: string; mono?: string };

const LAYER_1: Node[] = [
  { title: "Mic", sub: "16 kHz PCM, ~20 ms frames", mono: "cpal" },
  { title: "Streaming STT", sub: "WebSocket partials", mono: "pyai-hear" },
  { title: "Live text", sub: "stable solid · active dim", mono: "~590 ms" },
];

const LAYER_2: Node[] = [
  { title: "Segment", sub: "pause / VAD boundary", mono: "500–800 ms" },
  { title: "LLM pass", sub: "compact edit ops", mono: "JSON" },
  { title: "Animated diff", sub: "strike-through → fade", mono: "reason labels" },
  { title: "Inject", sub: "AX write · paste fallback", mono: "focused field" },
];

export default function Pipeline() {
  return (
    <div className="space-y-5">
      <LayerRow
        badge="Layer 1"
        title="Instant, verbatim"
        blurb="Never waits on the model. What you said appears as you say it."
        accent="#22e4f5"
        nodes={LAYER_1}
      />

      {/* branch connector */}
      <Reveal className="flex items-center justify-center gap-3 py-1" delay={80}>
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/12 to-white/12" />
        <span className="glass rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          on final segment ↓
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/12 to-white/12" />
      </Reveal>

      <LayerRow
        badge="Layer 2"
        title="Explained corrections"
        blurb="Lands under a second after you pause — and shows exactly what it removed."
        accent="#8b5cf6"
        nodes={LAYER_2}
      />
    </div>
  );
}

function LayerRow({
  badge,
  title,
  blurb,
  accent,
  nodes,
}: {
  badge: string;
  title: string;
  blurb: string;
  accent: string;
  nodes: Node[];
}) {
  return (
    <Reveal className="glass rounded-3xl p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span
          className="rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em]"
          style={{ color: accent, borderColor: `${accent}44`, background: `${accent}12` }}
        >
          {badge}
        </span>
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <p className="w-full text-sm text-muted sm:w-auto sm:flex-1">{blurb}</p>
      </div>

      <div className="mt-5 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
        {nodes.map((n, i) => (
          <div key={n.title} className="flex flex-1 items-center gap-3">
            <div className="glass glass-hover flex-1 rounded-2xl p-4">
              <p className="text-sm font-medium text-white">{n.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{n.sub}</p>
              {n.mono && (
                <p
                  className="mt-2 font-mono text-[10px] tracking-tight"
                  style={{ color: accent }}
                >
                  {n.mono}
                </p>
              )}
            </div>
            {i < nodes.length - 1 && <FlowArrow accent={accent} />}
          </div>
        ))}
      </div>
    </Reveal>
  );
}

function FlowArrow({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 40 12"
      aria-hidden
      className="h-3 w-8 shrink-0 rotate-90 lg:rotate-0"
      style={{ color: accent }}
    >
      <line
        x1="0"
        y1="6"
        x2="30"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.75"
        className="anim-flow"
      />
      <path
        d="M30 2.5 L37 6 L30 9.5 Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </svg>
  );
}
