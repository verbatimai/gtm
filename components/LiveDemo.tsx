"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DEMO_SCRIPTS,
  REASON_LABELS,
  REASON_STYLES,
  cleanTextFor,
  type DemoOp,
  type DemoScript,
} from "./demo-data";

/* ------------------------------------------------------------------ */
/* timing                                                              */
/* ------------------------------------------------------------------ */

const PAUSE_MS = 600; // silence before the correction pass fires
const CORRECT_MS = 800; // "correcting…" shimmer
const MARK_MS = 1100; // strike-through + chips linger
const COLLAPSE_MS = 550; // must match the CSS transition duration
const SETTLE_MS = 350;
const TYPE_MS = 16; // per character into the target field
const ACTIVE_TAIL = 2; // words rendered as the volatile tail

type Phase =
  | "idle"
  | "listening"
  | "pause"
  | "correcting"
  | "marking"
  | "collapsing"
  | "injecting"
  | "done";

const LISTENING_PHASES: Phase[] = ["listening", "pause"];

/* ------------------------------------------------------------------ */
/* small pieces                                                        */
/* ------------------------------------------------------------------ */

function MicIcon({ live }: { live: boolean }) {
  return (
    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
      {live && (
        <>
          <span className="absolute inset-0 animate-ping rounded-full bg-cyan-400/25" />
          <span className="absolute inset-0 rounded-full bg-cyan-400/10" />
        </>
      )}
      <span
        className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300 ${
          live
            ? "border-cyan-300/50 bg-cyan-400/15 text-cyan-200"
            : "border-white/10 bg-white/5 text-white/40"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden
        >
          <rect x="9" y="2" width="6" height="11" rx="3" />
          <path d="M5 10.5a7 7 0 0 0 14 0" />
          <path d="M12 17.5V21" />
        </svg>
      </span>
    </span>
  );
}

const BAR_SEEDS = [
  0.4, 0.75, 0.35, 0.95, 0.55, 0.8, 0.3, 1, 0.5, 0.85, 0.4, 0.7, 0.45, 0.9,
  0.35, 0.6,
];

function Waveform({ live }: { live: boolean }) {
  return (
    <div
      className="flex h-8 items-center gap-[3px]"
      aria-hidden
      role="presentation"
    >
      {BAR_SEEDS.map((seed, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full transition-colors duration-300 ${
            live ? "bg-gradient-to-t from-cyan-400/70 to-violet-400/70" : "bg-white/15"
          }`}
          style={
            live
              ? {
                  height: "100%",
                  animation: `vb-bar ${520 + i * 37}ms ease-in-out ${
                    i * 45
                  }ms infinite alternate`,
                  transformOrigin: "center",
                  ["--vb-peak" as string]: String(seed),
                }
              : { height: `${Math.round(4 + seed * 5)}px` }
          }
        />
      ))}
    </div>
  );
}

function ReasonChip({ op }: { op: Extract<DemoOp, { kind: "remove" | "replace" }> }) {
  const style = REASON_STYLES[op.reason];
  return (
    <span
      className={`ml-1 inline-block rounded border px-1 py-px align-middle font-sans text-[9px] leading-none tracking-wide uppercase ${style.chip}`}
    >
      {REASON_LABELS[op.reason]}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* main                                                                */
/* ------------------------------------------------------------------ */

export default function LiveDemo() {
  const [scriptId, setScriptId] = useState(DEMO_SCRIPTS[0].id);
  const script: DemoScript = useMemo(
    () => DEMO_SCRIPTS.find((s) => s.id === scriptId) ?? DEMO_SCRIPTS[0],
    [scriptId],
  );

  const [phase, setPhase] = useState<Phase>("idle");
  const [streamed, setStreamed] = useState(0); // words revealed so far
  const [typed, setTyped] = useState(0); // chars typed into the target

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  const at = useCallback((ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const clean = useMemo(() => cleanTextFor(script), [script]);

  const reset = useCallback(() => {
    clearTimers();
    setPhase("idle");
    setStreamed(0);
    setTyped(0);
  }, [clearTimers]);

  // Switching examples always rewinds to a clean slate.
  const selectScript = useCallback(
    (id: string) => {
      reset();
      setScriptId(id);
    },
    [reset],
  );

  const play = useCallback(() => {
    clearTimers();
    setStreamed(0);
    setTyped(0);
    setPhase("listening");

    script.words.forEach((w, i) => {
      at(w.t, () => setStreamed(i + 1));
    });

    const spoken = script.words[script.words.length - 1].t + 120;

    at(spoken, () => setPhase("pause"));
    at(spoken + PAUSE_MS, () => setPhase("correcting"));
    at(spoken + PAUSE_MS + CORRECT_MS, () => setPhase("marking"));

    const collapseAt = spoken + PAUSE_MS + CORRECT_MS + MARK_MS;
    at(collapseAt, () => setPhase("collapsing"));

    const injectAt = collapseAt + COLLAPSE_MS + SETTLE_MS;
    at(injectAt, () => setPhase("injecting"));
    for (let i = 1; i <= clean.length; i++) {
      at(injectAt + i * TYPE_MS, () => setTyped(i));
    }
    at(injectAt + clean.length * TYPE_MS + 220, () => setPhase("done"));
  }, [script, clean, at, clearTimers]);

  const listening = LISTENING_PHASES.includes(phase);
  const started = phase !== "idle";
  const collapsed = phase === "collapsing" || phase === "injecting" || phase === "done";
  const marked = phase === "marking" || collapsed;

  const statusLabel =
    phase === "idle"
      ? "Ready"
      : phase === "listening"
        ? "Listening…"
        : phase === "pause"
          ? "Pause detected"
          : phase === "correcting"
            ? "Correcting…"
            : phase === "marking" || phase === "collapsing"
              ? "Applying edits"
              : phase === "injecting"
                ? "Inserting…"
                : "Done";

  return (
    <div className="w-full">
      <style>{`
        @keyframes vb-bar {
          from { transform: scaleY(0.14); }
          to   { transform: scaleY(var(--vb-peak, 0.8)); }
        }
        @keyframes vb-shimmer {
          from { background-position: -220% 0; }
          to   { background-position: 220% 0; }
        }
        @keyframes vb-caret {
          0%, 45% { opacity: 1; }
          55%, 100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vb-anim, .vb-anim * { animation-duration: 1ms !important; animation-iteration-count: 1 !important; transition-duration: 1ms !important; }
        }
      `}</style>

      {/* example picker */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {DEMO_SCRIPTS.map((s) => {
          const active = s.id === script.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => selectScript(s.id)}
              aria-pressed={active}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                active
                  ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-100"
                  : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/80"
              }`}
            >
              {s.label}
            </button>
          );
        })}
        <span className="ml-1 hidden text-xs text-white/35 sm:inline">
          {script.blurb}
        </span>
      </div>

      <div className="vb-anim relative">
        {/* ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-8 -z-10 opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(45% 55% at 25% 20%, rgba(34,211,238,0.14), transparent 70%), radial-gradient(45% 55% at 80% 60%, rgba(167,139,250,0.14), transparent 70%)",
          }}
        />

        {/* ---------------- floating widget ---------------- */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-black/50 backdrop-blur-xl sm:p-5">
          <div className="flex items-center gap-3">
            <MicIcon live={listening} />
            <Waveform live={listening} />
            <div className="ml-auto flex items-center gap-2">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  listening
                    ? "bg-cyan-400"
                    : phase === "correcting"
                      ? "bg-violet-400"
                      : phase === "done"
                        ? "bg-emerald-400"
                        : "bg-white/25"
                }`}
              />
              <span className="font-mono text-[11px] tracking-wide text-white/50">
                {statusLabel}
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.18em] text-white/30 uppercase">
              Verbatim
            </span>
            <span className="font-mono text-[10px] text-white/25">
              {script.target.app}
            </span>
          </div>

          {/* ---------------- transcript ---------------- */}
          <div className="relative mt-2 min-h-[7.5rem] rounded-xl border border-white/10 bg-black/30 p-4">
            {phase === "correcting" && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{
                  background:
                    "linear-gradient(100deg, transparent 30%, rgba(167,139,250,0.18) 50%, transparent 70%)",
                  backgroundSize: "220% 100%",
                  animation: "vb-shimmer 1s linear infinite",
                }}
              />
            )}

            {!started ? (
              <p className="font-mono text-sm leading-7 text-white/25">
                Hold the hotkey and start talking — raw words stream in here,
                then get cleaned up on pause.
              </p>
            ) : (
              <p
                className="font-mono text-sm leading-8 text-white/90"
                aria-live="polite"
              >
                {script.ops.map((op, oi) => (
                  <OpSpan
                    key={oi}
                    op={op}
                    script={script}
                    streamed={streamed}
                    listening={listening}
                    marked={marked}
                    collapsed={collapsed}
                  />
                ))}
                {listening && (
                  <span
                    className="ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] bg-cyan-300"
                    style={{ animation: "vb-caret 1s steps(1) infinite" }}
                  />
                )}
              </p>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={started && phase !== "done" ? reset : play}
              className="rounded-lg border border-cyan-300/30 bg-cyan-400/10 px-3.5 py-2 text-sm font-medium text-cyan-100 transition-colors hover:bg-cyan-400/20"
            >
              {phase === "idle"
                ? "▶ Play demo"
                : phase === "done"
                  ? "↻ Replay"
                  : "■ Stop"}
            </button>
            <span className="font-mono text-[10px] text-white/25">
              {phase === "idle"
                ? "simulated — no mic, no network"
                : `${streamed}/${script.words.length} words`}
            </span>
          </div>
        </div>

        {/* ---------------- mock target field ---------------- */}
        <div className="mx-auto mt-3 w-[94%] rounded-2xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-[11px] text-white/40">
              {script.target.context}
            </span>
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] transition-all duration-300 ${
                phase === "done"
                  ? "border-emerald-300/30 bg-emerald-400/10 text-emerald-200 opacity-100"
                  : "border-transparent text-transparent opacity-0"
              }`}
            >
              ✓ inserted
            </span>
          </div>
          <div className="min-h-[3.5rem] pt-3 text-sm leading-6">
            {typed === 0 ? (
              <span className="text-white/25">{script.target.placeholder}</span>
            ) : (
              <span className="text-white/90">
                {clean.slice(0, typed)}
                {phase !== "done" && (
                  <span
                    className="ml-px inline-block h-4 w-[2px] translate-y-[3px] bg-violet-300"
                    style={{ animation: "vb-caret 1s steps(1) infinite" }}
                  />
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* one transcript segment                                              */
/* ------------------------------------------------------------------ */

function OpSpan({
  op,
  script,
  streamed,
  listening,
  marked,
  collapsed,
}: {
  op: DemoOp;
  script: DemoScript;
  streamed: number;
  listening: boolean;
  marked: boolean;
  collapsed: boolean;
}) {
  const visible = script.words.slice(op.start, Math.min(op.end, streamed));
  if (visible.length === 0) return null;

  // While speech is still streaming, the trailing words are "volatile".
  const tailStart = listening ? Math.max(0, streamed - ACTIVE_TAIL) : streamed;

  const text = visible.map((w, i) => {
    const idx = op.start + i;
    const dim = idx >= tailStart;
    return (
      <span
        key={idx}
        className={`transition-colors duration-200 ${
          dim ? "text-white/35" : "text-white/90"
        }`}
      >
        {w.text}
        {i < visible.length - 1 ? " " : ""}
      </span>
    );
  });

  if (op.kind === "keep") {
    return <span>{text} </span>;
  }

  const style = REASON_STYLES[op.reason];
  const settled = op.end <= streamed && marked;

  return (
    <>
      <span
        className="inline-block max-w-[48rem] overflow-hidden align-bottom whitespace-nowrap transition-all ease-in-out"
        style={{
          transitionDuration: `${COLLAPSE_MS}ms`,
          maxWidth: collapsed ? 0 : "48rem",
          opacity: collapsed ? 0 : 1,
          filter: collapsed ? "blur(2px)" : "none",
        }}
      >
        <span
          className={`transition-all duration-300 ${
            settled
              ? `line-through decoration-2 underline-offset-2 opacity-60 ${style.mark}`
              : ""
          }`}
        >
          {text}
        </span>
        {settled && <ReasonChip op={op} />}
        <span> </span>
      </span>
      {op.kind === "replace" && (
        <span
          className="inline-block overflow-hidden align-bottom whitespace-nowrap transition-all ease-in-out"
          style={{
            transitionDuration: `${COLLAPSE_MS}ms`,
            maxWidth: collapsed ? "16rem" : 0,
            opacity: collapsed ? 1 : 0,
          }}
        >
          <span className="text-emerald-200/90">{op.replacement}</span>
          <span> </span>
        </span>
      )}
    </>
  );
}
