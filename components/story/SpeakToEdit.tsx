"use client";

import gsap from "gsap";

import { NotionCard } from "./app-cards";
import { Scene, q } from "./scene";
import { MicIndicator } from "./ui";

/**
 * SCENE 3 — restaged inside the Notion card carried over from the deck,
 * so this reads as continuing to work on the same document rather than
 * arriving at yet another box.
 *
 * "Make this shorter"       → the paragraph physically compresses
 * "Make it more professional" → the wording reorganises
 * "Turn this into bullets"  → the block breaks apart into a list
 */

const COMMANDS = [
  "Make this shorter",
  "Make it more professional",
  "Turn this into bullets",
];

const LONG =
  "So I looked at the numbers again over the weekend and honestly I think the pricing page is what's holding us back, people get to it and then they just kind of drop off, and we've seen that pattern for a few weeks now, so maybe we should try reworking it.";

const SHORT =
  "I reviewed the numbers again. The pricing page looks like our drop-off point, and it's been consistent for weeks.";

const PRO =
  "Following a review of recent performance data, the pricing page appears to be our primary drop-off point — a pattern sustained over several weeks.";

const BULLETS = [
  "Reviewed recent performance data",
  "Pricing page is the primary drop-off point",
  "Pattern sustained over several weeks",
];

/** Fixed per-state heights so the container can be scrubbed smoothly. */
const HEIGHTS = [168, 116, 116, 144];

export function SpeakToEditScene() {
  return (
    <Scene
      height={295}
      build={(tl, root) => {
        const sel = q(root);
        const states = sel("[data-state]");
        const cmds = sel("[data-cmd]");
        const box = sel("[data-box]")[0];
        const micBars = sel("[data-mic-bar]");
        const entry = sel("[data-entry]")[0];

        // ENTRANCE — the deck ends on this exact Notion card at full size, so
        // we only settle by a hair: the cut reads as the same object.
        gsap.set(entry, { scale: 0.96, y: 10 });
        tl.to(entry, { scale: 1, y: 0, duration: 0.05, ease: "power2.out" }, 0);

        gsap.set(states.slice(1), { opacity: 0 });
        gsap.set(cmds, { opacity: 0, y: 10 });
        gsap.set(box, { height: HEIGHTS[0] });
        gsap.set(micBars, { transformOrigin: "50% 100%" });

        tl.to(
          micBars,
          {
            scaleY: () => 0.3 + Math.random() * 1.5,
            duration: 0.05,
            ease: "sine.inOut",
            stagger: { each: 0.01, from: "center" },
            repeat: 9,
            yoyo: true,
          },
          0,
        );

        COMMANDS.forEach((_, i) => {
          const at = 0.1 + i * 0.3;

          tl.to(cmds[i], { opacity: 1, y: 0, duration: 0.05 }, at);
          tl.to(states[i], { opacity: 0, duration: 0.07 }, at + 0.08);
          tl.to(states[i + 1], { opacity: 1, duration: 0.07 }, at + 0.11);
          tl.to(
            box,
            { height: HEIGHTS[i + 1], duration: 0.12, ease: "power2.inOut" },
            at + 0.08,
          );
          // spent commands stay readable — they dim to 0.6, never below
          tl.to(cmds[i], { opacity: 0.6, duration: 0.05 }, at + 0.22);
        });

        // EXIT — the window recedes, becoming one tile of the finale wall
        // (which opens zoomed onto this very card's position).
        tl.to(cmds, { opacity: 0, duration: 0.05 }, 0.92);
        tl.to(entry, { scale: 0.8, y: -30, duration: 0.08, ease: "power2.in" }, 0.92);
      }}
    >
      <div className="flex w-full max-w-3xl flex-col items-center">
        {/* the spoken commands, as large quoted display type on the canvas */}
        <div className="mb-8 flex w-full flex-col items-center gap-1.5">
          {COMMANDS.map((c) => (
            <p key={c} data-cmd className="t-quote text-center">
              &ldquo;{c}&rdquo;
            </p>
          ))}
        </div>

        <div data-entry className="w-full will-change-transform">
          <NotionCard
            toolbar={
              <div className="mb-4 flex items-center gap-3">
                <MicIndicator />
                <span className="t-kicker">listening</span>
              </div>
            }
          >
            <div
              data-box
              className="relative overflow-hidden will-change-[height]"
              style={{ height: HEIGHTS[0] }}
            >
              <p
                data-state
                className="absolute inset-x-0 top-0 text-[16px] leading-relaxed text-foreground"
              >
                {LONG}
              </p>
              <p
                data-state
                className="absolute inset-x-0 top-0 text-[16px] leading-relaxed text-foreground"
              >
                {SHORT}
              </p>
              <p
                data-state
                className="absolute inset-x-0 top-0 text-[16px] leading-relaxed text-foreground"
              >
                {PRO}
              </p>
              <ul data-state className="absolute inset-x-0 top-0 space-y-3">
                {BULLETS.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-[16px] leading-relaxed text-foreground"
                  >
                    <span className="accent-bar mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </NotionCard>
        </div>
      </div>
    </Scene>
  );
}
