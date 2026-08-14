"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

import { reducedMotion } from "./scene";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scene atmosphere, scrubbed across the whole document.
 *
 * This drives the theme tokens rather than a fixed element behind the page:
 * the sticky stages are opaque (they double as the curtain between scenes), so
 * anything painted behind would never be seen. Moving the tokens means body,
 * every stage, and all canvas-level type shift together — which is what lets
 * the edit beat swing to near-black without any component knowing about it.
 * White surfaces pin their own ink (see `.ink` in globals.css), so cards stay
 * readable and simply pop harder on the dark stop.
 */
/* Six stops, one per beat. The base only ever moves between near-blacks — all
   of the colour is carried by the two wash gradients, which is what keeps the
   type contrast constant while the room around it changes. */
const BG = [
  "#0a1130", // hero — deep navy, matching the supplied night scene
  "#060d13", // voice → clean text — cyan-tinged
  "#0c0817", // the app deck — violet
  "#040406", // speak to edit — near-pure black
  "#100b13", // finale — warm, dawn-like
  "#08080d", // demo + footer — neutral base
];
const FG = ["#f1f1f5", "#eef4f6", "#f1eff8", "#f4f4f6", "#f6f1f0", "#f1f1f5"];
const MUTED = ["#9a9aa8", "#8fa1a8", "#9d95b0", "#a2a2ac", "#a99c9c", "#9a9aa8"];
const LINE = [
  "rgba(255,255,255,0.13)",
  "rgba(255,255,255,0.13)",
  "rgba(255,255,255,0.13)",
  "rgba(255,255,255,0.10)",
  "rgba(255,255,255,0.14)",
  "rgba(255,255,255,0.12)",
];
/* wash 1 = the dominant light source, wash 2 = the counter-tint */
const WASH1 = [
  "rgba(96,80,232,0.34)", // deep indigo
  "rgba(40,178,212,0.26)", // cyan
  "rgba(126,84,238,0.32)", // violet
  "rgba(70,70,110,0.10)", // almost nothing — the room goes dark
  "rgba(255,146,92,0.22)", // dawn
  "rgba(96,86,190,0.14)",
];
const WASH2 = [
  "rgba(40,170,205,0.16)",
  "rgba(110,90,232,0.16)",
  "rgba(52,150,220,0.14)",
  "rgba(90,80,130,0.08)",
  "rgba(128,96,236,0.24)",
  "rgba(48,160,196,0.10)",
];

export default function Backdrop() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const PROPS = [
      "--background",
      "--foreground",
      "--muted",
      "--line",
      "--wash-1",
      "--wash-2",
    ];
    const clear = () => PROPS.forEach((k) => root.style.removeProperty(k));
    const apply = (v: number) => {
      // In light mode the CSS theme tokens must win — the scrubbed night-time
      // atmosphere only runs in dark mode.
      if (root.dataset.theme === "light") {
        clear();
        return;
      }
      root.style.setProperty("--background", gsap.utils.interpolate(BG, v));
      root.style.setProperty("--foreground", gsap.utils.interpolate(FG, v));
      root.style.setProperty("--muted", gsap.utils.interpolate(MUTED, v));
      root.style.setProperty("--line", gsap.utils.interpolate(LINE, v));
      root.style.setProperty("--wash-1", gsap.utils.interpolate(WASH1, v));
      root.style.setProperty("--wash-2", gsap.utils.interpolate(WASH2, v));
    };

    if (reducedMotion()) {
      apply(0);
      return;
    }

    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => apply(self.progress),
    });

    apply(0);

    // when the theme flips, re-apply (or clear) immediately
    const mo = new MutationObserver(() => apply(st.progress));
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      mo.disconnect();
      st.kill();
      clear();
    };
  }, []);

  return null;
}
