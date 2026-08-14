"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import { reducedMotion } from "./story/scene";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ACT 8 — the roadmap rail: cinematic panels in the superwhisper format.
 * Rich image/gradient backgrounds, a floating glass UI element as the
 * visual, and a coloured icon + title + punchline pasted over the bottom.
 * Panels are deliberately dark in BOTH themes.
 *
 * SCROLL-JACKED: the section pins and vertical scroll drives the rail
 * horizontally; when the last card lands, vertical scroll resumes.
 * Small screens / reduced motion keep a native swipe rail.
 */

const flow = "anim-flow";

function Card({
  bg,
  hover,
  accent,
  tag,
  tagClass,
  icon,
  title,
  copy,
  punch,
  children,
}: {
  bg: string;
  hover: string;
  accent: string;
  tag: string;
  tagClass: string;
  icon: React.ReactNode;
  title: string;
  copy: string;
  punch: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rm-card group snap-center ${hover}`}>
      <div className={`rm-bg ${bg}`} aria-hidden />
      <span className={`rm-tag tag ${tagClass}`}>{tag}</span>

      <div className="relative z-[1] flex h-full flex-col p-5">
        {/* the floating UI element */}
        <div className="flex flex-1 items-center justify-center py-4">
          {children}
        </div>

        {/* pasted text, reference format: icon + coloured title, then copy
            ending on a bold punchline */}
        <div className="flex items-center gap-2.5">
          <span
            className="rm-icon"
            style={{
              color: accent,
              background: `color-mix(in srgb, ${accent} 22%, transparent)`,
              boxShadow: `0 0 20px color-mix(in srgb, ${accent} 55%, transparent)`,
            }}
          >
            {icon}
          </span>
          <h3 className="text-[16.5px] font-semibold tracking-tight" style={{ color: accent }}>
            {title}
          </h3>
        </div>
        <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">
          {copy} <strong className="font-semibold text-white">{punch}</strong>
        </p>
      </div>
    </div>
  );
}

export default function ComingNext() {
  const rootRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const scroller = scrollerRef.current;
    const rail = railRef.current;
    if (!root || !scroller || !rail) return;
    if (reducedMotion() || window.innerWidth < 768) return; // native swipe

    scroller.style.overflowX = "visible";
    const dist = () => Math.max(0, rail.scrollWidth - scroller.clientWidth);
    if (dist() === 0) return;
    root.style.height = `${window.innerHeight + dist()}px`;

    const ctx = gsap.context(() => {
      gsap.to(rail, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, root);

    return () => {
      ctx.revert();
      root.style.height = "";
      scroller.style.overflowX = "";
    };
  }, []);

  return (
    <section ref={rootRef} id="next" className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden py-10">
        <div className="mb-12 flex flex-col items-center px-5 text-center">
          <p className="t-kicker">roadmap</p>
          <h2 className="t-display t-display-md mt-5">
            We&rsquo;re not stopping at dictation.
          </h2>
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar snap-x snap-mandatory overflow-x-auto pb-6"
        >
          {/* lead-in/lead-out padding keeps the first and last card centred —
              and guarantees the rail always overflows, so the scroll-jack
              engages at every viewport width */}
          <div
            ref={railRef}
            className="flex w-max gap-8 will-change-transform"
            style={{ paddingInline: "max(1.25rem, calc(50vw - 200px))" }}
          >
            {/* Commands */}
            <Card
              bg="rm-bg--commands"
              hover="rm-hover--blue"
              accent="#7db2ff"
              tag="In beta"
              tagClass="tag--planned"
              title="Voice commands"
              copy="Speak to edit what's already in the field."
              punch="Your words, doing the editing."
              icon={
                <svg viewBox="0 0 24 24" className="feat-wobble h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M14 5.5 18.5 10 8.5 20H4v-4.5L14 5.5Z" />
                  <path d="M12.5 7.5l4 4" />
                </svg>
              }
            >
              <div className="rm-panel w-full max-w-[250px] space-y-3 p-4">
                <p className="font-mono text-[11px] text-white/55">
                  &ldquo;delete the last sentence&rdquo;
                </p>
                <p className="text-[13.5px] leading-relaxed text-white">
                  Shipping Thursday.{" "}
                  <span className="cmd-fade text-white/60 underline decoration-[#ff8a8a]/70">
                    We can revisit the copy.
                  </span>
                </p>
                <p className="border-t border-white/10 pt-3 font-mono text-[11px] text-white/55">
                  &ldquo;make that bold&rdquo;
                </p>
                <p className="text-[13.5px] text-white">
                  The deadline is <span className="cmd-bold">Thursday, 5 pm</span>.
                </p>
              </div>
            </Card>

            {/* Meetings — the photographic panel */}
            <Card
              bg="rm-bg--meetings"
              hover="rm-hover--amber"
              accent="#f0b45c"
              tag="Experimental"
              tagClass="tag--experimental"
              title="Meetings"
              copy="Mic and system audio become one transcript, then structured notes."
              punch="Prototype — not in today's build."
              icon={
                <svg viewBox="0 0 24 24" className="feat-pulse h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <rect x="9" y="3" width="6" height="10" rx="3" />
                  <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
                </svg>
              }
            >
              <div className="rm-panel w-full max-w-[240px] p-4 font-mono text-[11.5px] text-white/80">
                <div className="flex items-center gap-1.5">
                  <span className="rounded bg-white/12 px-1.5 py-0.5">mic</span>
                  <span className="text-white/40">+</span>
                  <span className="rounded bg-white/12 px-1.5 py-0.5">system audio</span>
                </div>
                <svg viewBox="0 0 24 18" className="my-1.5 h-4 w-4" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" aria-hidden>
                  <path d="M12 2v10m0 0 4-4m-4 4-4-4" className={flow} />
                </svg>
                <p className="text-white">transcript</p>
                <svg viewBox="0 0 24 18" className="my-1.5 h-4 w-4" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" aria-hidden>
                  <path d="M12 2v10m0 0 4-4m-4 4-4-4" className={flow} />
                </svg>
                <p className="rounded-md bg-white/15 px-2 py-1 font-semibold text-white">
                  structured notes
                </p>
              </div>
            </Card>

            {/* Draft mode */}
            <Card
              bg="rm-bg--draft"
              hover="rm-hover--red"
              accent="#ff96a8"
              tag="Exploring"
              tagClass="tag--exploring"
              title="Draft mode"
              copy="Speak an instruction, review the draft before it lands."
              punch="You approve every word."
              icon={
                <svg viewBox="0 0 24 24" className="feat-spin h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M12 2.8 13.9 9l6.3 1.9-6.3 1.9L12 19l-1.9-6.2L3.8 10.9 10.1 9 12 2.8Z" />
                </svg>
              }
            >
              <div className="rm-panel w-full max-w-[250px] p-4">
                <p className="text-[11.5px] italic text-white/60">
                  “write a polite follow-up asking whether they reviewed the
                  proposal”
                </p>
                <div className="mt-2.5 rounded-md bg-white/12 p-2.5 text-[12.5px] leading-relaxed text-white">
                  Hi Priya — just checking in on the proposal from last week.
                  Any thoughts?
                  <span className="caret caret-blink ml-0.5 h-[1em] align-[-0.12em]" style={{ background: "#fff" }} />
                </div>
                <div className="mt-2.5 flex gap-2">
                  <span className="rounded-md bg-white px-2.5 py-1 text-[11.5px] font-semibold text-[#131018] transition-transform duration-300 group-hover:scale-105">
                    Insert
                  </span>
                  <span className="rounded-md border border-white/25 px-2.5 py-1 text-[11.5px] text-white/70">
                    Discard
                  </span>
                </div>
              </div>
            </Card>

            {/* Windows */}
            <Card
              bg="rm-bg--windows"
              hover="rm-hover--green"
              accent="#5fe0b0"
              tag="Coming"
              tagClass="tag--coming"
              title="Windows"
              copy="macOS ships today."
              punch="Windows is on the way."
              icon={
                <svg viewBox="0 0 24 24" className="feat-bounce h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm0 13 7.5 1.1v-7H3v5.9Zm8.5 1.2L21 21V12.6h-9.5v7.1Zm0-15.4v7.2H21V3L11.5 4.3Z" />
                </svg>
              }
            >
              <svg
                viewBox="0 0 24 24"
                className="h-28 w-28 text-white/20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                fill="currentColor"
                aria-hidden
              >
                <path d="M3 5.5 10.5 4.4v7.1H3V5.5Zm0 13 7.5 1.1v-7H3v5.9Zm8.5 1.2L21 21V12.6h-9.5v7.1Zm0-15.4v7.2H21V3L11.5 4.3Z" />
              </svg>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
