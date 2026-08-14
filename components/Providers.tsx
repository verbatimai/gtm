"use client";

import { useEffect, useRef, useState } from "react";

import { ChatGPTIcon, ClaudeIcon } from "./story/brand-icons";

/* provider marks — OpenAI/Anthropic reuse the brand set; PyAI and Deepgram
   get compact plates of their own */
function PyAIMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id="pyai-g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#3fc9e4" />
          <stop offset="1" stopColor="#8b7bf0" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#pyai-g)" />
      <g stroke="#fff" strokeWidth="2" strokeLinecap="round">
        <path d="M7.5 9.5v5" />
        <path d="M12 6.5v11" />
        <path d="M16.5 9v6" />
      </g>
    </svg>
  );
}

function DeepgramMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect width="24" height="24" rx="6" fill="#0b0b0e" />
      <path
        d="M9 5.5h3.2c3.7 0 6.3 2.7 6.3 6.5s-2.6 6.5-6.3 6.5H9v-5h3a1.5 1.5 0 0 0 0-3H9v-5Z"
        fill="#13ef95"
      />
    </svg>
  );
}

/**
 * The open-source reveal, on its own contrasting gradient band. The provider
 * bubbles fly in from off-screen (left / top / right — each from its own
 * direction) and settle into place; pick one of each and the route redraws.
 * Trust facts are pills, not cards.
 */

type Mark = (p: { className?: string }) => React.ReactElement;

const SPEECH: { name: string; Icon: Mark }[] = [
  { name: "PyAI", Icon: PyAIMark },
  { name: "Deepgram", Icon: DeepgramMark },
  { name: "OpenAI", Icon: ChatGPTIcon },
];
const CORRECTION: { name: string; Icon: Mark }[] = [
  { name: "PyAI", Icon: PyAIMark },
  { name: "OpenAI", Icon: ChatGPTIcon },
  { name: "Anthropic", Icon: ClaudeIcon },
];

/* fixed diagram coordinates (percent of the box) — identical in both themes */
const XS = [20, 50, 80];
const SPEECH_Y = 10;
const NODE_Y = 50;
const CORR_Y = 90;

/* fly-in origins: [x, y] offsets, per column position */
const FROM_TOP: [string, string][] = [
  ["-60vw", "0"],
  ["0", "-45vh"],
  ["60vw", "0"],
];
const FROM_BOTTOM: [string, string][] = [
  ["-60vw", "0"],
  ["0", "45vh"],
  ["60vw", "0"],
];

function route(fromX: number, fromY: number, toX: number, toY: number) {
  const my = (fromY + toY) / 2;
  return `M ${fromX} ${fromY} C ${fromX} ${my}, ${toX} ${my}, ${toX} ${toY}`;
}

function Chip({
  label,
  Icon,
  active,
  accent,
  onClick,
  badge,
  from,
  shown,
  delay,
}: {
  label: string;
  Icon: Mark;
  active: boolean;
  accent: string;
  onClick: () => void;
  badge?: string;
  from: [string, string];
  shown: boolean;
  delay: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        transform: shown
          ? "translate(0,0)"
          : `translate(${from[0]}, ${from[1]})`,
        opacity: shown ? 1 : 0,
        transitionDelay: `${delay}ms`,
        boxShadow: active
          ? `0 0 0 2px ${accent}, 0 12px 30px rgba(10,10,40,0.3)`
          : "0 10px 26px rgba(10,10,40,0.22)",
      }}
      /* solid white bubbles — deliberately opaque so they contrast with the
         glassy "your transcript" pill between the rows */
      className={`flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[14px] font-medium text-[#16161d] transition-all duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] ${
        active ? "" : "opacity-75 hover:opacity-100"
      }`}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" />
      {label}
      {badge && (
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#6b6b78]">
          {badge}
        </span>
      )}
    </button>
  );
}

export default function Providers() {
  const [speech, setSpeech] = useState("PyAI");
  const [corr, setCorr] = useState("PyAI");
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const sx = XS[SPEECH.findIndex((p) => p.name === speech)];
  const cx = XS[CORRECTION.findIndex((p) => p.name === corr)];

  return (
    <section
      ref={ref}
      id="open-source"
      className="providers-band flex min-h-[110vh] items-center overflow-hidden px-5 py-28"
    >
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-16 text-center">
          <h2 className="t-display t-display-lg">
            Your voice.
            <br />
            Your stack.
          </h2>
          <p className="t-body mt-5">Open source. Bring your own keys.</p>
        </div>

        {/* the mixer */}
        <div className="relative mx-auto max-w-xl">
          <svg
            className="pointer-events-none absolute inset-x-0 top-[3.2rem] h-[13rem] w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {shown && (
              <>
                <path
                  key={`s-${speech}`}
                  d={route(sx, SPEECH_Y, 50, NODE_Y - 8)}
                  className="provider-path"
                  fill="none"
                  stroke="var(--cyan)"
                  vectorEffect="non-scaling-stroke"
                  style={{ strokeWidth: 1.5 }}
                />
                <path
                  key={`c-${corr}`}
                  d={route(50, NODE_Y + 8, cx, CORR_Y)}
                  className="provider-path"
                  fill="none"
                  stroke="var(--violet)"
                  vectorEffect="non-scaling-stroke"
                  style={{ strokeWidth: 1.5 }}
                />
              </>
            )}
          </svg>

          <p className="t-kicker mb-4 justify-center text-center">speech</p>
          <div className="relative z-10 grid grid-cols-3 justify-items-center gap-2">
            {SPEECH.map(({ name, Icon }, i) => (
              <Chip
                key={name}
                label={name}
                Icon={Icon}
                accent="var(--cyan)"
                badge={name === "PyAI" ? "EN" : undefined}
                active={speech === name}
                onClick={() => setSpeech(name)}
                from={FROM_TOP[i]}
                shown={shown}
                delay={i * 110}
              />
            ))}
          </div>

          <div className="relative z-10 mx-auto my-14 w-fit rounded-full border border-line bg-background/60 px-6 py-2.5 backdrop-blur-sm">
            <span className="text-[15px] font-medium text-foreground">
              your transcript
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-3 justify-items-center gap-2">
            {CORRECTION.map(({ name, Icon }, i) => (
              <Chip
                key={name}
                label={name}
                Icon={Icon}
                accent="var(--violet)"
                active={corr === name}
                onClick={() => setCorr(name)}
                from={FROM_BOTTOM[i]}
                shown={shown}
                delay={140 + i * 110}
              />
            ))}
          </div>
          <p className="t-kicker mt-4 justify-center text-center">correction</p>
        </div>

        <p className="mt-10 text-center text-[14px] text-muted">
          Use one provider. Or mix them.{" "}
          <span className="opacity-70">
            PyAI speech is English-only — other languages route through
            Deepgram or OpenAI.
          </span>
        </p>

        {/* trust — pills, spread and breathing */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {[
            "MIT licensed",
            "BYOK",
            "No content telemetry",
            "Keys in your Keychain",
          ].map((t) => (
            <span key={t} className="trust-pill">
              <span className="accent-bar h-1.5 w-1.5 rounded-full" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
