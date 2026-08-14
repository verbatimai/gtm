"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useLayoutEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Every beat is a tall section with a sticky, full-height stage inside it.
 * Pinning is done with CSS `position: sticky` (robust, no pin-spacer maths);
 * GSAP only supplies the scrubbed timeline that scrapes progress off the
 * section's scroll range.
 *
 * The markup renders in its FINAL state. `build` runs in useLayoutEffect and
 * uses gsap.set() to push elements back to their start values before paint —
 * so there is no flash, and if JS never runs (or motion is reduced) the reader
 * still gets a legible static scene.
 */
export function Scene({
  height = 200,
  className = "",
  stageClassName = "",
  build,
  children,
  id,
}: {
  /** total scroll length of the beat, in vh. ~150–220 reads well. */
  height?: number;
  className?: string;
  stageClassName?: string;
  build?: (tl: gsap.core.Timeline, root: HTMLDivElement) => void;
  children: ReactNode;
  id?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  // Captured once: the timeline is built on mount and scrubbed by scroll
  // thereafter, so later identities of `build` are irrelevant.
  const buildRef = useRef(build);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const fn = buildRef.current;
    if (!root || !stage || !fn) return;
    if (reducedMotion()) {
      // Markup renders the end state, but several beats stack layers on top of
      // one another (captions, app screens, edit states). Without motion those
      // would overlap, so keep only the final layer of each stack.
      root.dataset.static = "true";
      for (const s of ["[data-cap]", "[data-label]", "[data-screen]", "[data-state]"]) {
        const els = Array.from(root.querySelectorAll<HTMLElement>(s));
        els.slice(0, -1).forEach((el) => (el.style.display = "none"));
      }
      root
        .querySelectorAll<HTMLElement>("[data-frag]")
        .forEach((el) => (el.style.display = "none"));
      return;
    }

    const ctx = gsap.context(() => {
      // Once this scene stops pinning it spends a full viewport scrolling away,
      // and its opaque stage would keep covering the top of the next scene —
      // which is already pinned and composed underneath. Drop it at the handoff
      // so the next scene is revealed whole rather than sliced.
      // ...but only when another scene is waiting underneath. Scenes followed
      // by ordinary flow sections (or nothing) scroll away naturally — hiding
      // their stage would leave a blank viewport.
      if (root.nextElementSibling?.classList.contains("story-scene")) {
        ScrollTrigger.create({
          trigger: root,
          start: "bottom bottom",
          onEnter: () => gsap.set(stage, { autoAlpha: 0 }),
          onLeaveBack: () => gsap.set(stage, { autoAlpha: 1 }),
        });
      }

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
        },
      });
      fn(tl, root);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={id}
      ref={rootRef}
      className={`story-scene relative ${className}`}
      style={{ height: `${height}vh` }}
    >
      <div
        ref={stageRef}
        // pt-24 keeps content out of the floating nav band; pb-20 keeps it
        // clear of the fixed waveform ribbon. Content centres in what's left.
        className={`sticky top-0 z-10 flex h-screen w-full items-center justify-center overflow-hidden bg-background px-5 pb-20 pt-24 ${stageClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

/** Selector helper scoped to a scene root. */
export const q =
  (root: HTMLElement) =>
  <T extends Element = HTMLElement>(sel: string): T[] =>
    Array.from(root.querySelectorAll<T>(sel));

/** A quiet caption that names what the motion is doing. */
export function Caption({
  children,
  className = "",
  ...rest
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      {...rest}
      className={`font-mono text-[11px] uppercase tracking-[0.2em] text-muted ${className}`}
    >
      {children}
    </p>
  );
}
