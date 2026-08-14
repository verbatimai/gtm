"use client";

import type { ReactElement } from "react";

import { GITHUB_URL, GitHubMark } from "./Nav";
import {
  ChatGPTIcon,
  ClaudeIcon,
  DocsIcon,
  FigmaIcon,
  GmailIcon,
  LinearIcon,
  MessagesIcon,
  NotionIcon,
  SlackIcon,
  TelegramIcon,
  VSCodeIcon,
  WhatsAppIcon,
} from "./story/brand-icons";

/**
 * The bento wall — every capability as its own tile, Krea-style: mixed paper
 * and dark tiles, big stats, and a few quiet looping animations (waveform,
 * icon marquee, the filler-strike). Pure CSS loops; nothing scroll-driven.
 */

const MARQUEE: ((p: { className?: string }) => ReactElement)[] = [
  GmailIcon,
  SlackIcon,
  NotionIcon,
  MessagesIcon,
  VSCodeIcon,
  FigmaIcon,
  ChatGPTIcon,
  ClaudeIcon,
  LinearIcon,
  TelegramIcon,
  WhatsAppIcon,
  DocsIcon,
];

function WaveLoop({ bars = 26 }: { bars?: number }) {
  return (
    <span className="flex h-12 items-center gap-[3px]" aria-hidden>
      {Array.from({ length: bars }).map((_, i) => {
        const env = Math.sin((i / bars) * Math.PI);
        const h = 0.25 + env * (0.45 + 0.45 * Math.sin(i * 2.1));
        return (
          <span
            key={i}
            className="cue-bar accent-bar"
            style={{
              width: 3,
              height: `${(h * 46).toFixed(1)}px`,
              animationDelay: `${(-i * 0.11).toFixed(2)}s`,
            }}
          />
        );
      })}
    </span>
  );
}

export default function FeatureGrid() {
  return (
    <section id="features" className="px-5 pb-8 pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <p className="t-kicker">under the hood</p>
          <h2 className="t-display t-display-md mt-5">
            Built like a tool, not a toy
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-6 lg:grid-cols-12">
          {/* speed — the flagship tile */}
          <div className="feat-tile feat-tile--dark items-center text-center sm:col-span-6 sm:row-span-2 sm:min-h-[320px]">
            <WaveLoop />
            <h3 className="t-display t-display-md mt-6 text-foreground">
              Faster than your hands
            </h3>
            <p className="t-body-sm mt-3 max-w-xs">
              Streaming transcription with the correction pass riding right
              behind it.
            </p>
          </div>

          {/* latency stat */}
          <div className="feat-tile feat-tile--paper feat-tile--mint ink items-center text-center sm:col-span-3">
            <span className="feat-stat text-foreground">&lt;400ms</span>
            <p className="mt-2 flex items-center gap-2 text-[14px] text-muted">
              <span className="feat-pulse accent-bar h-2 w-2 rounded-full" />
              voice to text on screen
            </p>
          </div>

          {/* privacy */}
          <div className="feat-tile feat-tile--paper feat-tile--lavender ink items-center text-center sm:col-span-3">
            <span className="feat-stat text-foreground">0</span>
            <p className="mt-2 text-[14px] text-muted">
              content telemetry — what you say is never collected
            </p>
          </div>

          {/* languages — a slowly revolving globe */}
          <div className="feat-tile feat-tile--paper feat-tile--amber ink items-center text-center sm:col-span-3">
            <svg
              viewBox="0 0 24 24"
              className="feat-spin h-7 w-7"
              aria-hidden
              fill="none"
              stroke="#b78617"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="9" />
              <ellipse cx="12" cy="12" rx="4" ry="9" />
              <path d="M3.6 9h16.8M3.6 15h16.8" />
            </svg>
            <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-foreground">
              Multilingual
            </h3>
            <p className="mt-2 text-[14px] text-muted">
              route non-English speech through Deepgram or OpenAI
            </p>
          </div>

          {/* do not train */}
          <div className="feat-tile feat-tile--paper feat-tile--sky ink items-center text-center sm:col-span-3">
            <svg
              viewBox="0 0 24 24"
              className="feat-wobble h-7 w-7"
              aria-hidden
              fill="none"
              stroke="#2569b5"
              strokeWidth="1.7"
              strokeLinecap="round"
            >
              <rect x="5" y="10.5" width="14" height="9" rx="2.2" />
              <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
            </svg>
            <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-foreground">
              BYOK
            </h3>
            <p className="mt-2 text-[14px] text-muted">
              your keys, stored in the macOS Keychain — nowhere else
            </p>
          </div>

          {/* every app — icon marquee */}
          <div className="feat-tile feat-tile--dark items-center overflow-hidden text-center sm:col-span-6">
            <h3 className="text-[19px] font-semibold tracking-tight text-foreground">
              Works in every app
            </h3>
            <div className="feat-marquee-mask mt-5 w-full overflow-hidden">
              <div className="feat-marquee">
                {[0, 1].map((copy) => (
                  <span key={copy} className="flex shrink-0 items-center gap-[1.1rem]">
                    {MARQUEE.map((Icon, i) => (
                      <Icon key={i} className="h-7 w-7" />
                    ))}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* removes fillers — the looping strike */}
          <div className="feat-tile feat-tile--paper feat-tile--sky ink items-center text-center sm:col-span-3">
            <p className="text-[22px] font-semibold tracking-tight text-foreground">
              so{" "}
              <span className="feat-strike">
                <span className="feat-strike-word">um</span>
              </span>{" "}
              basically
            </p>
            <p className="mt-2 text-[14px] text-muted">
              fillers removed as you speak
            </p>
          </div>

          {/* speak to edit */}
          <div className="feat-tile feat-tile--paper feat-tile--mint ink items-center text-center sm:col-span-3">
            <svg
              viewBox="0 0 24 24"
              className="feat-wobble h-6 w-6"
              aria-hidden
              fill="#159570"
            >
              <path d="M12 2.8 13.9 9l6.3 1.9-6.3 1.9L12 19l-1.9-6.2L3.8 10.9 10.1 9 12 2.8Z" />
            </svg>
            <p className="mt-3 text-[22px] font-semibold tracking-tight text-foreground">
              Revert to raw
            </p>
            <p className="mt-2 text-[14px] text-muted">
              one tap back to exactly what you said
            </p>
          </div>

          {/* hold fn — the key jumps */}
          <div className="feat-tile feat-tile--paper feat-tile--lavender ink items-center text-center sm:col-span-3">
            <span className="feat-bounce rounded-lg border border-line bg-white px-3.5 py-2 font-mono text-[16px] font-semibold text-foreground shadow-[0_3px_0_rgba(0,0,0,0.12)]">
              fn + Space
            </span>
            <p className="mt-4 text-[14px] text-muted">
              tap to toggle · hold to talk (configurable)
            </p>
          </div>

          {/* custom vocabulary — revolving asterisk */}
          <div className="feat-tile feat-tile--paper feat-tile--amber ink items-center text-center sm:col-span-3">
            <svg
              viewBox="0 0 24 24"
              className="feat-spin h-7 w-7"
              aria-hidden
              stroke="#b78617"
              strokeWidth="2.2"
              strokeLinecap="round"
            >
              <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
            </svg>
            <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-foreground">
              Custom vocabulary
            </h3>
            <p className="mt-2 text-[14px] text-muted">
              your names, your jargon, spelled right
            </p>
          </div>

          {/* open source */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="feat-tile feat-tile--dark items-center text-center transition-colors hover:border-white/25 sm:col-span-6"
          >
            <GitHubMark className="h-7 w-7 text-foreground" />
            <h3 className="mt-4 text-[19px] font-semibold tracking-tight text-foreground">
              Free &amp; open source
            </h3>
            <p className="t-body-sm mt-2">
              every line of it on GitHub — audit the privacy claims yourself
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
