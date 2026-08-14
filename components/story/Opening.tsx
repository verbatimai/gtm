"use client";

import gsap from "gsap";

import { Scene, q } from "./scene";
import { Waveform } from "./ui";

const RAW =
  "Hey um Sarah I was just thinking maybe we should probably move the meeting to like Thursday afternoon if that works";

/* ============================================================
   BEAT 1a — inside the waveform. Sound resolves into letters,
   letters into words, words into a text field.
   ============================================================ */
export function OpeningScene({ id }: { id?: string }) {
  return (
    <Scene
      id={id}
      height={230}
      build={(tl, root) => {
        const sel = q(root);
        const wave = sel("[data-wave]")[0];
        const bars = sel("[data-bar]");
        const field = sel("[data-field]")[0];
        const chars = sel("[data-char]");
        const caret = sel("[data-caret]")[0];
        const hint = sel("[data-hint]")[0];
        const caps = sel("[data-cap]");

        // Start at EXACTLY the state the hero's handoff waveform ends in
        // (same component, same size, scale 1.6, same screen offset) — the
        // swap between the two scenes lands on identical pixels.
        gsap.set(wave, { scale: 1.6, transformOrigin: "50% 50%" });
        gsap.set(bars, { transformOrigin: "50% 50%" });
        gsap.set(field, {
          opacity: 0,
          scaleY: 0.55,
          scaleX: 0.9,
          y: -26,
          transformOrigin: "50% 0%",
        });
        gsap.set(chars, { opacity: 0, yPercent: 70, scale: 0.5, filter: "blur(10px)" });
        gsap.set(caret, { opacity: 0 });
        // captions stay out of the way until the bars are small enough that
        // they are not sitting on top of the type
        gsap.set(caps, { opacity: 0, y: 8 });

        // the signal keeps moving the whole way down
        tl.to(
          bars,
          {
            scaleY: () => 0.2 + Math.random() * 1.0,
            duration: 0.06,
            ease: "sine.inOut",
            stagger: { each: 0.002, from: "center" },
            repeat: 5,
            yoyo: true,
          },
          0,
        );

        // 1 — settle out of the handoff size
        tl.to(wave, { scale: 1.15, duration: 0.3, ease: "power1.out" }, 0);
        tl.to(hint, { opacity: 0, duration: 0.1 }, 0);

        // 2 — settle into the compact centred cluster
        tl.to(wave, { scale: 1, duration: 0.2, ease: "power1.inOut" }, 0.3);
        tl.to(caps[0], { opacity: 1, y: 0, duration: 0.07 }, 0.36);

        // 3 — the cluster collapses down into the field, which grows out of
        //     the same point as the wave lands on it
        tl.to(
          wave,
          { scale: 0.26, y: 54, opacity: 0.5, duration: 0.24, ease: "power2.inOut" },
          0.52,
        );
        tl.to(
          field,
          {
            opacity: 1,
            scaleY: 1,
            scaleX: 1,
            y: 0,
            duration: 0.24,
            ease: "power2.out",
          },
          0.56,
        );

        // 4 — sound becomes letters becomes words
        tl.to(
          chars,
          {
            opacity: 1,
            yPercent: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.18,
            stagger: { each: 0.0045, from: "start" },
          },
          0.62,
        );
        tl.to(caret, { opacity: 1, duration: 0.06 }, 0.94);

        // captions hand off
        tl.to(caps[0], { opacity: 0, y: -8, duration: 0.07 }, 0.5);
        tl.to(caps[1], { opacity: 1, y: 0, duration: 0.07 }, 0.58);
        tl.to(caps[1], { opacity: 0, y: -8, duration: 0.07 }, 0.86);
        tl.to(caps[2], { opacity: 1, y: 0, duration: 0.07 }, 0.9);
      }}
    >
      <div className="relative flex w-full max-w-3xl flex-col items-center">
        <div
          data-wave
          className="relative z-0 flex h-32 w-full items-center justify-center will-change-transform"
        >
          <Waveform count={56} className="h-full w-full max-w-lg" />
        </div>

        <div className="relative z-20 mt-10 flex h-9 w-full justify-center">
          {["a voice", "becomes letters", "becomes words you can use"].map((c) => (
            <span
              key={c}
              data-cap
              className="t-cap absolute"
            >
              {c}
            </span>
          ))}
        </div>

        <div
          data-field
          className="surface relative z-20 mt-8 w-full rounded-xl px-6 py-5 will-change-transform"
        >
          <p className="text-[1.35rem] leading-relaxed tracking-tight sm:text-2xl">
            {RAW.split("").map((ch, i) => (
              <span
                key={i}
                data-char
                className="inline-block whitespace-pre will-change-transform"
              >
                {ch}
              </span>
            ))}
            <span
              data-caret
              className="caret caret-blink ml-0.5 h-[1.1em] align-[-0.15em]"
            />
          </p>
        </div>

        <p
          data-hint
          className="t-kicker relative z-20 mt-10"
        >
          scroll
        </p>
      </div>
    </Scene>
  );
}

/* ============================================================
   BEAT 1b — the sentence cleans itself. Removed words physically
   collapse; punctuation and connective words grow in.
   ============================================================ */

type Tok = { t: string; k: "keep" | "cut" | "add"; why?: string };

/* Every edit is colour-coded by WHY it happened — the same legend the widget
   prototype uses, so the story and the product speak one language. */
const CAT: Record<string, string> = {
  filler: "#e7c14b",
  "false start": "#a78bfa",
  hedge: "#60a5fa",
  trailing: "#f87171",
  punctuation: "#34d399",
  restructured: "#34d399",
};

const LEGEND: [string, string][] = [
  ["filler", CAT.filler],
  ["false start", CAT["false start"]],
  ["hedge", CAT.hedge],
  ["trailing", CAT.trailing],
  ["grammar / formatting", CAT.punctuation],
];

const TOKENS: Tok[] = [
  { t: "Hey ", k: "keep" },
  { t: "um ", k: "cut", why: "filler" },
  { t: "Sarah", k: "keep" },
  { t: ",", k: "add", why: "punctuation" },
  { t: " ", k: "keep" },
  { t: "I was just thinking ", k: "cut", why: "false start" },
  { t: "maybe ", k: "cut", why: "hedge" },
  { t: "could ", k: "add", why: "restructured" },
  { t: "we ", k: "keep" },
  { t: "should probably ", k: "cut", why: "hedge" },
  { t: "move the meeting to ", k: "keep" },
  { t: "like ", k: "cut", why: "filler" },
  { t: "Thursday afternoon", k: "keep" },
  { t: "?", k: "add", why: "punctuation" },
  { t: " if that works", k: "cut", why: "trailing" },
];

export function CleanupScene() {
  return (
    <Scene
      height={250}
      build={(tl, root) => {
        const sel = q(root);
        const cuts = sel<HTMLElement>("[data-cut]");
        const adds = sel<HTMLElement>("[data-add]");
        const rules = sel("[data-rule]");
        const caps = sel("[data-cap]");
        const badge = sel("[data-badge]")[0];
        const legend = sel("[data-legend]")[0];
        const head = sel("[data-head]")[0];

        gsap.set(head, { opacity: 0, y: 12 });
        tl.to(head, { opacity: 1, y: 0, duration: 0.05 }, 0.01);

        // measure natural widths, then collapse the additions to zero
        adds.forEach((el) => {
          gsap.set(el, { width: "auto" });
          const w = el.getBoundingClientRect().width;
          el.dataset.w = String(w);
          gsap.set(el, { width: 0, opacity: 0 });
        });
        cuts.forEach((el) => {
          gsap.set(el, { width: el.getBoundingClientRect().width });
        });
        gsap.set(rules, { scaleX: 0, transformOrigin: "0% 50%" });
        gsap.set(badge, { opacity: 0, scale: 0.9 });
        gsap.set(caps.slice(1), { opacity: 0, y: 8 });
        gsap.set(legend, { opacity: 0, y: 8 });
        tl.to(legend, { opacity: 1, y: 0, duration: 0.05 }, 0.02);

        // group the cuts so the cleanup reads as passes, not chaos
        const groups: HTMLElement[][] = [
          cuts.filter((el) => el.dataset.why === "filler"),
          cuts.filter((el) => el.dataset.why === "false start" || el.dataset.why === "hedge"),
          cuts.filter((el) => el.dataset.why === "trailing"),
        ];

        let at = 0.08;
        groups.forEach((group, gi) => {
          const strikes = group
            .map((el) => el.querySelector("[data-rule]"))
            .filter(Boolean) as Element[];

          // strike through
          tl.to(strikes, { scaleX: 1, duration: 0.07, stagger: 0.015 }, at);
          // then collapse — the surrounding words physically move in
          tl.to(
            group,
            {
              width: 0,
              opacity: 0,
              duration: 0.12,
              ease: "power2.inOut",
              stagger: 0.02,
            },
            at + 0.11,
          );

          // caption for this pass
          if (gi > 0) tl.to(caps[gi - 1], { opacity: 0, y: -8, duration: 0.05 }, at);
          tl.to(caps[gi], { opacity: 1, y: 0, duration: 0.05 }, at + 0.03);

          at += 0.24;
        });

        // punctuation + the restructured connector grow in
        tl.to(caps[2], { opacity: 0, y: -8, duration: 0.05 }, at);
        tl.to(caps[3], { opacity: 1, y: 0, duration: 0.05 }, at + 0.03);
        tl.to(
          adds,
          {
            width: (_i: number, el: Element) =>
              Number((el as HTMLElement).dataset.w ?? 0),
            opacity: 1,
            duration: 0.14,
            ease: "power2.out",
            stagger: 0.03,
          },
          at,
        );

        tl.to(badge, { opacity: 1, scale: 1, duration: 0.06 }, 0.8);

        // EXIT — the cleaned sentence becomes a compact card and lifts away.
        // This is the object scene 2 catches.
        const lift = sel("[data-lift]")[0];
        const capwrap = sel("[data-capwrap]")[0];
        tl.to([capwrap, badge, legend, head], { opacity: 0, duration: 0.05 }, 0.88);
        // geometry matched to the flyer's entry pose in the app deck
        // (scale 0.55, high on the stage) so the cut reads as the same card
        tl.to(
          lift,
          {
            scale: 0.55,
            y: -190,
            duration: 0.12,
            ease: "power2.in",
          },
          0.88,
        );
      }}
    >
      <div className="flex w-full max-w-3xl flex-col items-center">
        <div data-head className="mb-7 flex flex-col items-center text-center">
          <h2 className="t-display t-display-md">Say it messy.</h2>
          <p className="t-body-sm mt-2.5">
            We clean it up while keeping what you meant.
          </p>
        </div>

        <div data-capwrap className="relative mb-8 flex h-9 w-full justify-center">
          {[
            "removing fillers",
            "cutting hedges and false starts",
            "trimming the tail",
            "fixing punctuation",
          ].map((c) => (
            <span
              key={c}
              data-cap
              className="t-cap absolute"
            >
              {c}
            </span>
          ))}
        </div>

        {/* the colour legend — one swatch per kind of edit */}
        <div
          data-legend
          className="mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
        >
          {LEGEND.map(([label, color]) => (
            <span
              key={label}
              className="flex items-center gap-1.5 font-mono text-[11px] tracking-tight text-muted"
            >
              <span
                className="h-2.5 w-2.5 rounded-[4px]"
                style={{ background: color }}
              />
              {label}
            </span>
          ))}
        </div>

        <div
          data-lift
          className="surface w-full rounded-xl px-6 py-6 will-change-transform"
        >
          <p className="text-[1.35rem] leading-relaxed tracking-tight sm:text-2xl">
            {TOKENS.map((tok, i) => {
              if (tok.k === "cut") {
                const c = CAT[tok.why ?? ""] ?? "#9a9aa8";
                return (
                  <span
                    key={i}
                    data-cut
                    data-why={tok.why}
                    className="relative inline-block overflow-hidden whitespace-pre rounded-[4px] align-bottom"
                    style={{ color: c, background: `${c}1c` }}
                  >
                    {tok.t}
                    <span
                      data-rule
                      className="absolute left-0 top-1/2 h-[1.5px] w-full"
                      style={{ background: c }}
                    />
                  </span>
                );
              }
              if (tok.k === "add") {
                const c = CAT[tok.why ?? ""] ?? "#34d399";
                return (
                  <span
                    key={i}
                    data-add
                    className="inline-block overflow-hidden whitespace-pre rounded-[4px] align-bottom"
                    style={{ color: c, background: `${c}1c` }}
                  >
                    {tok.t}
                  </span>
                );
              }
              return (
                <span key={i} className="whitespace-pre">
                  {tok.t}
                </span>
              );
            })}
            <span className="caret caret-blink ml-0.5 h-[1.1em] align-[-0.15em]" />
          </p>
        </div>

        <div
          data-badge
          className="mt-8 flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2"
        >
          <span className="accent-bar h-1.5 w-1.5 rounded-full" />
          <span className="font-mono text-[11px] tracking-tight text-muted">
            meaning kept · 14 words saved
          </span>
        </div>
      </div>
    </Scene>
  );
}
