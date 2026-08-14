"use client";

import Link from "next/link";

import { DOCS_URL, DOWNLOAD_URL, GITHUB_URL, GitHubMark } from "./Nav";

/**
 * The footer is open canvas — no card, no box. Link columns, then the
 * giant lockup: three live waveform bars resolving into the wordmark,
 * filling the width. It sits in the same fixed atmosphere as everything
 * else, so the page ends inside the scene it started in.
 */

const COLUMNS: [string, [string, string][]][] = [
  [
    "Product",
    [
      ["The story", "/#story"],
      ["Demo", "/demo"],
      ["Download", DOWNLOAD_URL],
      ["Stats for nerds", "/nerds"],
    ],
  ],
  [
    "Open source",
    [
      ["GitHub", GITHUB_URL],
      ["Docs", DOCS_URL],
      ["Releases", `${GITHUB_URL}/releases`],
      ["MIT license", `${GITHUB_URL}/blob/master/LICENSE`],
    ],
  ],
  [
    "Trust",
    [
      ["No content telemetry", "/#open-source"],
      ["Bring your own keys", "/#open-source"],
      ["Keys in your Keychain", "/#open-source"],
    ],
  ],
];

/* the giant animated logo: three gradient bars + three set lines, the exact
   geometry of Logo.tsx scaled up. Bars breathe; lines hold still. */
const LOGO_BARS = [0.56, 1, 0.72];
const LOGO_LINES = [1, 1, 0.6];

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden px-5 pb-8 pt-24">
      <div className="mx-auto max-w-6xl">
        {/* link columns — open, no card */}
        <div className="grid gap-10 sm:grid-cols-3">
          {COLUMNS.map(([title, links]) => (
            <div key={title}>
              <p className="t-kicker mb-4">{title}</p>
              <ul className="space-y-2.5">
                {links.map(([label, href]) => (
                  <li key={label}>
                    {href.startsWith("/") ? (
                      <Link
                        href={href}
                        className="text-[14.5px] text-muted transition-colors hover:text-foreground"
                      >
                        {label}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[14.5px] text-muted transition-colors hover:text-foreground"
                      >
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* the giant lockup — the animated logo, then the wordmark */}
        <div className="mt-24 flex items-center gap-[3vw]" aria-hidden>
          <div className="flex items-center gap-[2vw]">
            {/* the three live bars */}
            <div className="flex items-center gap-[1vw]">
              {LOGO_BARS.map((h, i) => (
                <span
                  key={i}
                  className="footer-bar accent-bar rounded-full"
                  style={{
                    width: "clamp(0.55rem, 1.9vw, 1.8rem)",
                    height: `clamp(${(h * 3.6).toFixed(2)}rem, ${(h * 11.5).toFixed(2)}vw, ${(h * 11).toFixed(2)}rem)`,
                    animationDelay: `${(-i * 0.5).toFixed(2)}s`,
                    transformOrigin: "center",
                  }}
                />
              ))}
            </div>
            {/* …resolving into the three set lines */}
            <div className="flex flex-col justify-center gap-[1.2vw]">
              {LOGO_LINES.map((w, i) => (
                <span
                  key={i}
                  className="rounded-full bg-foreground"
                  style={{
                    width: `calc(clamp(2.6rem, 7vw, 6.5rem) * ${w})`,
                    height: "clamp(0.55rem, 1.6vw, 1.5rem)",
                    opacity: i === 2 ? 0.55 : 1,
                  }}
                />
              ))}
            </div>
          </div>
          <span className="footer-wordmark select-none">verbatim</span>
        </div>

        {/* legal line */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">
            © Verbatim 2026 · Built by SaaS Labs · MIT licensed · BYOK · No
            content telemetry
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
          >
            <GitHubMark className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
