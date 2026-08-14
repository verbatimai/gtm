"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import { reducedMotion } from "./scene";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BARS = 90;

/**
 * Connective tissue: one thin waveform pinned to the bottom edge that runs the
 * whole story. Loud through scene 1, a calm pulse afterwards, gone by the CTA.
 */
export default function WaveRibbon() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (reducedMotion()) {
      gsap.set(root, { opacity: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const bars = Array.from(root.querySelectorAll<HTMLElement>("[data-rib]"));
      gsap.set(bars, { transformOrigin: "50% 100%" });

      // Two independent timelines. The bar tween repeats, which inflates a
      // timeline's duration — keeping it separate stops it from rescaling the
      // fade keyframes into the wrong part of the page.
      const fade = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });
      // loud while the voice is the subject, then it settles, then it steps
      // aside completely for the closing statement and everything after it.
      fade.fromTo(root, { opacity: 0.55 }, { opacity: 0.24, duration: 0.28 }, 0);
      fade.to(root, { scaleY: 0.45, duration: 0.28 }, 0);
      fade.to(root, { opacity: 0, scaleY: 0.12, duration: 0.1 }, 0.62);
      fade.set(root, {}, 1); // pad the timeline to the full scroll range

      gsap.to(bars, {
        scaleY: () => 0.15 + Math.random() * 1.55,
        duration: 0.03,
        ease: "sine.inOut",
        stagger: { each: 0.002, from: "center" },
        repeat: 14,
        yoyo: true,
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex h-10 items-end justify-center gap-[3px] px-4 opacity-40"
      style={{ transformOrigin: "50% 100%" }}
    >
      {Array.from({ length: BARS }).map((_, i) => {
        const env = Math.sin((i / BARS) * Math.PI);
        return (
          <span
            key={i}
            data-rib
            className="accent-bar w-[2px] flex-none rounded-full"
            style={{ height: `${Math.max(10, env * 26).toFixed(2)}px` }}
          />
        );
      })}
    </div>
  );
}
