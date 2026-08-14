"use client";

import gsap from "gsap";

import Logo from "../Logo";
import { DOWNLOAD_URL, GITHUB_URL, GitHubMark } from "../Nav";
import { Scene, q } from "./scene";

/**
 * ACT 1 — the supplied photographic hero, rebuilt in layers.
 *
 * All layers share the pack's 1920×1080 coordinate system and identical
 * object-fit/position, so the opening frame is pixel-identical to
 * hero-{theme}-fullhd.png:
 *
 *   1  background SVG   (persistent; opacity 0 until the photo yields)
 *   2  full hero photo  (the exact reference frame; crossfades out 4–20%)
 *   3  face PNG         (exits left,  10–58%, −42vw, power2.inOut)
 *   4  laptop PNG       (exits right, 10–58%, +42vw)
 *   5  copy + THE RIBBON (never move with the foreground objects)
 *
 * THE RIBBON is the v1 marquee: raw speech in an unruly italic serif runs in
 * from the left, passes through the verbatim capsule (the animated logo),
 * and comes out printed on the pale wavy slab. It runs on its own clock —
 * it is the product demo, not a scroll effect.
 */

type Pair = { raw: string; clean: string };

const PAIRS: Pair[] = [
  {
    raw: "so um I looked at the numbers again and I think the pricing page is uh the issue",
    clean: "The numbers say the pricing page is our problem.",
  },
  {
    raw: "hey Sarah can we maybe move the thing to like Thursday afternoon if that works",
    clean: "Sarah — could we move Thursday afternoon?",
  },
  {
    raw: "um yesterday I basically finished the auth stuff and today I'll uh do the tests",
    clean: "Yesterday: finished auth. Today: tests.",
  },
];

const RAW_SEGS = PAIRS.map((p) => p.raw.split(" "));
const CLEAN_SEGS = PAIRS.map((p) => p.clean.split(" "));
const RAW_N = RAW_SEGS.reduce((n, w) => n + w.length, 0);
const CLEAN_N = CLEAN_SEGS.reduce((n, w) => n + w.length, 0);

/** deterministic 0..1 — SSR and client must agree, so no Math.random */
const noise = (n: number) => {
  const x = Math.sin(n * 12.9898 + 4.1) * 43758.5453;
  return x - Math.floor(x);
};

function wordStyle(k: number, total: number, raw: boolean) {
  const wave = Math.sin((k / total) * Math.PI * 6) * (raw ? 7 : 4.5);
  if (!raw) {
    return { transform: `translateY(${wave.toFixed(2)}px)` };
  }
  const drift = (noise(k) - 0.5) * 6;
  const rot = (noise(k + 97) - 0.5) * 7;
  return {
    transform: `translateY(${(wave + drift).toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`,
    opacity: (0.58 + noise(k + 13) * 0.42).toFixed(2),
  };
}

function Track({ raw, copy }: { raw: boolean; copy: number }) {
  const segs = raw ? RAW_SEGS : CLEAN_SEGS;
  const total = raw ? RAW_N : CLEAN_N;
  let k = 0;
  return (
    <>
      {segs.map((words, s) => (
        <span className="ribbon-seg" key={`${copy}-${s}`}>
          {words.map((w) => {
            const i = k++;
            return (
              <span
                key={i}
                className={`ribbon-word${raw ? "" : " ribbon-word--clean"}`}
                style={wordStyle(i, total, raw)}
              >
                {w}
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}

const layer = (z: number): React.CSSProperties => ({
  // inline styles: the stage's child rule forces position:relative/z-1
  position: "absolute",
  inset: 0,
  zIndex: z,
});

function ThemePair({
  light,
  dark,
  extra = "",
}: {
  light: string;
  dark: string;
  extra?: string;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`hero-theme-img hero-img-light ${extra}`} src={light} alt="" draggable={false} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={`hero-theme-img hero-img-dark ${extra}`} src={dark} alt="" draggable={false} />
    </>
  );
}

export default function Hero() {
  return (
    <Scene
      height={210}
      build={(tl, root) => {
        const sel = q(root);
        const vec = sel("[data-vec]")[0];
        const photo = sel("[data-photo]")[0];
        const face = sel("[data-face]")[0];
        const laptop = sel("[data-laptop]")[0];
        const ribbon = sel("[data-ribbon]")[0];
        const cue = sel("[data-cue]")[0];

        gsap.set(vec, { opacity: 0 });

        // narrower screens need less travel to clear the frame
        const exit = window.innerWidth < 768 ? 32 : 42;

        // 0–4%: nothing. 4–20%: the reference photo yields to the layered
        // scene — same coordinates, so the eye can't catch the seam.
        tl.to(photo, { opacity: 0, duration: 0.16, ease: "none" }, 0.04);
        tl.to(vec, { opacity: 1, duration: 0.16, ease: "none" }, 0.04);

        // 10–58%: the two physical objects leave. Heavy, cinematic, no
        // scale, no rotation.
        tl.to(face, { x: `-${exit}vw`, duration: 0.48, ease: "power2.inOut" }, 0.1);
        tl.to(laptop, { x: `${exit}vw`, duration: 0.48, ease: "power2.inOut" }, 0.1);

        // the atmosphere drifts a hair across the WHOLE range — and stays.
        tl.to(vec, { x: 14, y: -8, duration: 1, ease: "none" }, 0);

        // the ribbon leaves with the copy
        tl.to(ribbon, { y: -36, opacity: 0, duration: 0.28, ease: "power1.in" }, 0.24);
        tl.to(cue, { opacity: 0, duration: 0.08 }, 0.1);
      }}
    >
      {/* 1 — persistent atmospheric background (ambient SMIL + static twin
             for reduced-motion readers) */}
      <div data-vec style={layer(1)} aria-hidden>
        <ThemePair
          light="/hero/hero-bg-light-animated.svg"
          dark="/hero/hero-bg-dark-animated.svg"
          extra="hero-bg-anim"
        />
        <ThemePair
          light="/hero/hero-bg-light.svg"
          dark="/hero/hero-bg-dark.svg"
          extra="hero-bg-static"
        />
      </div>

      {/* 2 — the exact reference frame */}
      <div data-photo style={layer(2)} aria-hidden>
        <ThemePair
          light="/hero/hero-light-fullhd.png"
          dark="/hero/hero-dark-fullhd.png"
        />
      </div>

      {/* 3 — the face, an independent physical object (masked to its own
             region: the supplied PNG is a full-frame composite) */}
      <div
        data-face
        className="hero-cut-face"
        style={{ ...layer(3), willChange: "transform" }}
        aria-hidden
      >
        <ThemePair
          light="/hero/hero-face-light.png"
          dark="/hero/hero-face-dark.png"
        />
      </div>

      {/* 4 — the laptop (same treatment) */}
      <div
        data-laptop
        className="hero-cut-laptop"
        style={{ ...layer(4), willChange: "transform" }}
        aria-hidden
      >
        <ThemePair
          light="/hero/hero-laptop-light.png"
          dark="/hero/hero-laptop-dark.png"
        />
      </div>

      {/* 5 — the copy. It never moves with the foreground objects. */}
      <div
        className="flex w-full flex-col items-center"
        style={{ zIndex: 5 }}
      >
        <p className="t-kicker">macOS · open source · bring your own models</p>

        <h1 className="t-display t-display-xl mt-6 max-w-4xl text-center">
          Just speak.
          <br />
          Write faster.
        </h1>

        <p className="t-body mt-5 max-w-xl text-center">
          Speak naturally — fillers, false starts and all. Verbatim streams it
          live, cleans it up and types it wherever your cursor is.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 rounded-lg bg-foreground px-6 py-3.5 text-[15px] font-medium text-background transition-opacity hover:opacity-85"
          >
            Download for Mac
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 rounded-lg border border-foreground/30 bg-background/25 px-6 py-3.5 text-[15px] font-medium text-foreground backdrop-blur-sm transition-colors hover:border-foreground/50"
          >
            <GitHubMark className="h-4 w-4" />
            View on GitHub
          </a>
        </div>

        <a href="#story" data-cue className="t-kicker mt-12">
          scroll
        </a>
      </div>

      {/* ---------- the ribbon: raw speech in, clean text out ----------
          Parked low, in the empty band under the copy. Inline position: the
          stage's child rule forces position:relative. */}
      <div
        data-ribbon
        className="ribbon"
        style={{ position: "absolute", left: 0, right: 0, bottom: "11%", zIndex: 5 }}
      >
        <div className="ribbon-band">
          <div className="ribbon-half ribbon-half--in">
            <div className="ribbon-track">
              <Track raw copy={0} />
              <Track raw copy={1} />
            </div>
          </div>

          <div className="ribbon-half ribbon-half--out">
            <div className="ribbon-slab" />
            <div className="ribbon-track ribbon-track--clean">
              <Track raw={false} copy={0} />
              <Track raw={false} copy={1} />
            </div>
          </div>
        </div>

        {/* the capsule the speech passes through — just the logo */}
        <div className="ribbon-capsule">
          <Logo className="h-7 w-7 text-[#131317]" />
        </div>
      </div>
    </Scene>
  );
}
