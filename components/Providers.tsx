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

/* endpoints, measured off the real DOM so the routes always TOUCH the pills */
type Pts = {
  sx: number; sy: number;
  nx: number; nt: number; nb: number;
  kx: number; ky: number;
};

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
  const [pts, setPts] = useState<Pts | null>(null);
  const ref = useRef<HTMLElement>(null);
  const diagRef = useRef<HTMLDivElement>(null);
  const speechRowRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const corrRowRef = useRef<HTMLDivElement>(null);

  // measure the active pills and the transcript node, in diagram pixels —
  // run after the fly-in transitions settle, and again on resize/selection
  useEffect(() => {
    if (!shown) return;
    const measure = () => {
      const c = diagRef.current;
      const s = speechRowRef.current?.children[
        SPEECH.findIndex((p) => p.name === speech)
      ] as HTMLElement | undefined;
      const n = nodeRef.current;
      const k = corrRowRef.current?.children[
        CORRECTION.findIndex((p) => p.name === corr)
      ] as HTMLElement | undefined;
      if (!c || !s || !n || !k) return;
      const cr = c.getBoundingClientRect();
      const sr = s.getBoundingClientRect();
      const nr = n.getBoundingClientRect();
      const kr = k.getBoundingClientRect();
      setPts({
        sx: sr.left + sr.width / 2 - cr.left,
        sy: sr.bottom - cr.top - 2,
        nx: nr.left + nr.width / 2 - cr.left,
        nt: nr.top - cr.top + 2,
        nb: nr.bottom - cr.top - 2,
        kx: kr.left + kr.width / 2 - cr.left,
        ky: kr.top - cr.top + 2,
      });
    };
    // wait out the 700ms fly-in (plus stagger) so transforms are identity
    const t = setTimeout(measure, 850);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [shown, speech, corr]);

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
        <div ref={diagRef} className="relative mx-auto max-w-xl">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden
          >
            {pts && (
              <>
                <path
                  key={`s-${speech}-${pts.sx.toFixed(0)}`}
                  d={route(pts.sx, pts.sy, pts.nx, pts.nt)}
                  className="provider-path"
                  fill="none"
                  stroke="var(--cyan)"
                  strokeWidth="1.5"
                />
                <path
                  key={`c-${corr}-${pts.kx.toFixed(0)}`}
                  d={route(pts.nx, pts.nb, pts.kx, pts.ky)}
                  className="provider-path"
                  fill="none"
                  stroke="var(--violet)"
                  strokeWidth="1.5"
                />
              </>
            )}
          </svg>

          <p className="t-kicker mb-4 justify-center text-center">speech</p>
          <div
            ref={speechRowRef}
            className="relative z-10 grid grid-cols-3 justify-items-center gap-2"
          >
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

          <div
            ref={nodeRef}
            className="relative z-10 mx-auto my-14 w-fit rounded-full border border-line bg-background/60 px-6 py-2.5 backdrop-blur-sm"
          >
            <span className="text-[15px] font-medium text-foreground">
              your transcript
            </span>
          </div>

          <div
            ref={corrRowRef}
            className="relative z-10 grid grid-cols-3 justify-items-center gap-2"
          >
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
