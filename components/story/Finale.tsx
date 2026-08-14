"use client";

import gsap from "gsap";
import type { ReactElement } from "react";

import { DOWNLOAD_URL, GITHUB_URL, GitHubMark } from "../Nav";
import {
  BrowserIcon,
  CalendarIcon,
  ChatGPTIcon,
  ClaudeIcon,
  DiscordIcon,
  DocsIcon,
  DriveIcon,
  FigmaIcon,
  GmailIcon,
  InstagramIcon,
  LinearIcon,
  LinkedInIcon,
  MessagesIcon,
  NotionIcon,
  RedditIcon,
  SlackIcon,
  SpotifyIcon,
  TelegramIcon,
  TerminalIcon,
  VSCodeIcon,
  WhatsAppIcon,
  XIcon,
  ZoomIcon,
} from "./brand-icons";
import { Scene, q } from "./scene";

/**
 * SCENE 4 — one continuous pull-back.
 *
 * We open held tight on the four windows the story has been living in, then
 * the camera retreats and they turn out to be four tiles in a wall of every
 * app you actually type into. When the wall fills the frame the closing
 * statement lands on top of it — the wall dims, but never disappears, because
 * it IS the argument.
 *
 * 6 × 4 tiles: the four story apps are deliberately at the four dead-centre
 * cells (indices 8, 9, 14, 15), which is what the camera is zoomed into at
 * progress 0, so the cut from scene 3 reads as continuous.
 */

type App = {
  name: string;
  Icon: (p: { className?: string }) => ReactElement;
};

/* the official JustCall mark, pulled from justcall.io */
function JustCallLogo({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logos/justcall.png" alt="" className={className} />;
}

/* NOTE: 24 entries, 6×4 — the four story apps must stay at the centre cells
   (indices 8, 9, 14, 15), so positions are swapped, never inserted. */
const APPS: App[] = [
  { name: "JustCall", Icon: JustCallLogo },
  { name: "Linear", Icon: LinearIcon },
  { name: "X", Icon: XIcon },
  { name: "Chrome", Icon: BrowserIcon },
  { name: "Discord", Icon: DiscordIcon },
  { name: "Docs", Icon: DocsIcon },

  { name: "Telegram", Icon: TelegramIcon },
  { name: "VS Code", Icon: VSCodeIcon },
  { name: "Gmail", Icon: GmailIcon }, // ← centre
  { name: "Slack", Icon: SlackIcon }, // ← centre
  { name: "Instagram", Icon: InstagramIcon },
  { name: "Spotify", Icon: SpotifyIcon },

  { name: "LinkedIn", Icon: LinkedInIcon },
  { name: "Terminal", Icon: TerminalIcon },
  { name: "Notion", Icon: NotionIcon }, // ← centre
  { name: "Messages", Icon: MessagesIcon }, // ← centre
  { name: "ChatGPT", Icon: ChatGPTIcon },
  { name: "Claude", Icon: ClaudeIcon },

  { name: "WhatsApp", Icon: WhatsAppIcon },
  { name: "Calendar", Icon: CalendarIcon },
  { name: "Drive", Icon: DriveIcon },
  { name: "Zoom", Icon: ZoomIcon },
  { name: "Reddit", Icon: RedditIcon },
  { name: "Figma", Icon: FigmaIcon },
];

/** deterministic hint-line widths — SSR and client must agree */
const hint = (i: number) => [
  62 + ((i * 37) % 30),
  44 + ((i * 53) % 40),
  56 + ((i * 41) % 34),
  30 + ((i * 29) % 34),
];

export function FinaleScene() {
  return (
    <Scene
      height={300}
      build={(tl, root) => {
        const sel = q(root);
        const camera = sel("[data-camera]")[0];
        const tiles = sel("[data-tile]");
        const scrim = sel("[data-scrim]")[0];
        const stage = sel("[data-stage]")[0];
        const lines = sel("[data-line]");
        const cta = sel("[data-cta]")[0];

        // held tight on the four windows carried over from scene 3
        gsap.set(camera, { scale: 3.05, transformOrigin: "50% 50%" });
        gsap.set(tiles, { opacity: 0 });
        // the four centre tiles are the ones already on screen
        gsap.set([tiles[8], tiles[9], tiles[14], tiles[15]], { opacity: 1 });
        gsap.set(scrim, { opacity: 0 });
        gsap.set(stage, { opacity: 0, y: 26 });
        gsap.set(lines, { yPercent: 115 });
        gsap.set(cta, { opacity: 0, y: 16 });

        // ---- the pull-back: the wall multiplies out of the four ----
        tl.to(camera, { scale: 1, duration: 0.5, ease: "power2.inOut" }, 0);
        tl.to(
          tiles,
          {
            opacity: 1,
            duration: 0.16,
            stagger: { each: 0.008, from: "center", grid: [4, 6] },
          },
          0.1,
        );

        // once the wall has filled, the tiles breathe — a random fade-out /
        // fade-in shimmer that keeps the wall alive under the statement
        tl.to(
          tiles,
          {
            opacity: 0.55,
            duration: 0.045,
            stagger: { each: 0.006, from: "random", yoyo: true, repeat: 1 },
          },
          0.34,
        );

        // ---- the statement lands over the wall ----
        // the wall only dims: it stays clearly readable behind the type.
        tl.to(camera, { opacity: 0.62, duration: 0.14 }, 0.56);
        tl.to(scrim, { opacity: 1, duration: 0.14 }, 0.56);
        tl.to(stage, { opacity: 1, y: 0, duration: 0.1 }, 0.6);
        tl.to(lines, { yPercent: 0, duration: 0.14, stagger: 0.06 }, 0.62);
        tl.to(cta, { opacity: 1, y: 0, duration: 0.1 }, 0.82);
      }}
    >
      <div className="relative flex min-h-[28rem] w-full max-w-[min(94vw,1600px)] flex-col items-center justify-center">
        {/* the wall */}
        <div data-camera className="w-full will-change-transform">
          <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-6 sm:gap-3">
            {APPS.map(({ name, Icon }, i) => (
              <div
                key={name}
                data-tile
                className="app-tile ink flex flex-col gap-2.5 p-3 will-change-transform sm:p-3.5"
              >
                <div className="flex items-center gap-1.5">
                  <Icon className="h-[18px] w-[18px] shrink-0" />
                  <span className="truncate text-[11px] font-medium tracking-tight text-foreground">
                    {name}
                  </span>
                </div>
                <div className="space-y-[6px]" aria-hidden>
                  {hint(i).map((w, j) => (
                    <span
                      key={j}
                      className="block h-[4px] rounded-full bg-black/[0.08]"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* the scrim that makes the type land — dims, never hides */}
        <div
          data-scrim
          aria-hidden
          className="finale-scrim pointer-events-none absolute -inset-24 z-10"
        />

        {/* the closing statement, over the wall */}
        <div
          data-stage
          className="absolute inset-0 z-20 flex flex-col items-center justify-center"
        >
          {/* the halo is what guarantees legibility over a white tile — it
              also covers the reduced-motion path, where the wall never dims */}
          <h2 className="t-display finale-halo text-center text-[2.6rem] leading-[1.04] sm:text-[3.9rem]">
            <span className="mask-line">
              <span data-line className="block">
                Speak freely.
              </span>
            </span>
            <span className="mask-line">
              <span
                data-line
                className="block text-[0.42em] font-medium tracking-tight text-foreground/80"
              >
                Open source dictation for your entire computer.
              </span>
            </span>
          </h2>

          <div data-cta className="mt-9 flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-lg bg-foreground px-7 py-3.5 text-[15px] font-medium text-background transition-opacity hover:opacity-85"
              >
                Download for Mac
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-lg border border-line bg-white/[0.06] px-7 py-3.5 text-[15px] font-medium text-foreground backdrop-blur-sm transition-colors hover:border-foreground/45"
              >
                <GitHubMark className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
            <p className="font-mono text-[11.5px] tracking-wider text-muted">
              MIT licensed · BYOK · No content telemetry
            </p>
          </div>
        </div>
      </div>
    </Scene>
  );
}
