"use client";

import gsap from "gsap";

import { Scene, q } from "./scene";
import { MicIndicator } from "./ui";

/**
 * ACT 2 — the live transcript. The product materializes inside the
 * atmosphere the hero left behind: words stream in as you speak, with two
 * states — locked stable text at full strength, and a dimmer VOLATILE TAIL
 * that can still change. Mid-stream the tail corrects itself ("Tuesday" is
 * struck and collapses; "Thursday afternoon" takes its place).
 *
 * The scene deliberately ends on the exact sentence and card geometry the
 * next act (the cleanup pass) opens with, so the story continues on one
 * object.
 */

const PRE = [
  "Hey", "um", "Sarah", "I", "was", "just", "thinking", "maybe", "we",
  "should", "probably", "move", "the", "meeting", "to", "like",
];
const REPLACE = ["Thursday", "afternoon"];
const POST = ["if", "that", "works"];

const VOLATILE = 0.45; // opacity of the not-yet-locked tail

export function LiveTranscriptScene({ id }: { id?: string }) {
  return (
    <Scene
      id={id}
      height={240}
      build={(tl, root) => {
        const sel = q(root);
        const field = sel("[data-field]")[0];
        const chip = sel("[data-chip]")[0];
        const caps = sel("[data-cap]");
        const pre = sel("[data-w-pre]");
        const cut = sel<HTMLElement>("[data-w-cut]")[0];
        const rule = sel("[data-w-rule]")[0];
        const rep = sel("[data-w-rep]");
        const post = sel("[data-w-post]");
        const caret = sel("[data-caret]")[0];

        gsap.set(field, { opacity: 0, y: 20, scale: 0.97 });
        gsap.set([...pre, ...rep, ...post], { opacity: 0, y: 8 });
        gsap.set(cut, { width: cut.getBoundingClientRect().width, opacity: 0 });
        gsap.set(rule, { scaleX: 0, transformOrigin: "0% 50%" });
        gsap.set(caret, { opacity: 0 });
        gsap.set(caps, { opacity: 0, y: 8 });

        // the surface materializes out of the atmosphere — no section card
        tl.to(field, { opacity: 1, y: 0, scale: 1, duration: 0.06, ease: "power2.out" }, 0.02);

        // captions narrate the two states
        tl.to(caps[0], { opacity: 1, y: 0, duration: 0.05 }, 0.05);
        tl.to(caps[0], { opacity: 0, y: -8, duration: 0.05 }, 0.34);
        tl.to(caps[1], { opacity: 1, y: 0, duration: 0.05 }, 0.38);
        tl.to(caps[1], { opacity: 0, y: -8, duration: 0.05 }, 0.6);
        tl.to(caps[2], { opacity: 1, y: 0, duration: 0.05 }, 0.66);

        // words stream in dim (volatile), then LOCK to full strength a beat
        // later — the classic stable-text / volatile-tail rhythm
        pre.forEach((w, i) => {
          const at = 0.06 + i * 0.029;
          tl.to(w, { opacity: VOLATILE, y: 0, duration: 0.02 }, at);
          tl.to(w, { opacity: 1, duration: 0.03 }, at + 0.075);
        });

        // the volatile tail corrects itself: "Tuesday" arrives, gets struck,
        // physically collapses — "Thursday afternoon" takes its place
        tl.to(cut, { opacity: VOLATILE, duration: 0.02 }, 0.55);
        tl.to(rule, { scaleX: 1, duration: 0.035 }, 0.6);
        tl.to(cut, { width: 0, opacity: 0, duration: 0.05, ease: "power2.inOut" }, 0.655);
        rep.forEach((w, i) => {
          const at = 0.67 + i * 0.03;
          tl.to(w, { opacity: VOLATILE, y: 0, duration: 0.02 }, at);
          tl.to(w, { opacity: 1, duration: 0.03 }, at + 0.06);
        });

        post.forEach((w, i) => {
          const at = 0.75 + i * 0.03;
          tl.to(w, { opacity: VOLATILE, y: 0, duration: 0.02 }, at);
          tl.to(w, { opacity: 1, duration: 0.03 }, at + 0.06);
        });

        tl.to(caret, { opacity: 1, duration: 0.04 }, 0.88);
        // the listening chip steps aside — the next act opens on the bare card
        tl.to(chip, { opacity: 0, duration: 0.05 }, 0.92);
      }}
    >
      <div className="flex w-full max-w-3xl flex-col items-center">
        <div className="relative mb-8 flex h-9 w-full justify-center">
          {[
            "words appear while you speak",
            "the dim tail can still change",
            "your voice, cleaned up as you speak",
          ].map((c) => (
            <span key={c} data-cap className="t-cap absolute">
              {c}
            </span>
          ))}
        </div>

        {/* spacer mirrors the legend row of the next act, so the card sits at
            the same height across the scene swap */}
        <div className="mb-6 h-[22px]" aria-hidden />

        <div
          data-field
          className="surface w-full rounded-xl px-6 py-6 will-change-transform"
        >
          <div data-chip className="mb-4 flex items-center gap-3">
            <MicIndicator />
            <span className="t-kicker">listening</span>
          </div>

          <p className="text-[1.35rem] leading-relaxed tracking-tight sm:text-2xl">
            {PRE.map((w, i) => (
              <span key={`p${i}`} data-w-pre className="lt-word">
                {w}{" "}
              </span>
            ))}
            <span
              data-w-cut
              data-frag
              className="relative inline-block overflow-hidden whitespace-pre rounded-[4px] align-bottom"
              style={{ color: "#f87171", background: "#f8717118" }}
            >
              Tuesday
              <span
                data-w-rule
                className="absolute left-0 top-1/2 h-[1.5px] w-full"
                style={{ background: "#f87171" }}
              />
            </span>
            {REPLACE.map((w, i) => (
              <span key={`r${i}`} data-w-rep className="lt-word">
                {w}{" "}
              </span>
            ))}
            {POST.map((w, i) => (
              <span key={`q${i}`} data-w-post className="lt-word">
                {w}{i < POST.length - 1 ? " " : ""}
              </span>
            ))}
            <span data-caret className="caret caret-blink ml-0.5 h-[1.1em] align-[-0.15em]" />
          </p>
        </div>
      </div>
    </Scene>
  );
}
