"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import ThemeToggle from "./ThemeToggle";

export const GITHUB_URL = "https://github.com/verbatimai/verbatim";
export const DOWNLOAD_URL =
  "https://github.com/verbatimai/verbatim/releases/download/v1.0.0/Verbatim_1.0.0_aarch64.dmg";
export const DOCS_URL =
  "https://github.com/verbatimai/verbatim/blob/master/README.md";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link =
    "rounded-lg px-2.5 py-1.5 text-[13px] text-foreground/65 transition-colors hover:text-foreground sm:px-3 sm:text-sm";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled ? "glass" : "border border-transparent"
        }`}
      >
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5"
          aria-label="Verbatim — back to top"
        >
          {/* the lockup mark: three live bars resolving into three lines */}
          <span className="flex items-center gap-2" aria-hidden>
            <span className="flex items-center gap-[3px]">
              {[0.6, 1, 0.75].map((h, i) => (
                <span
                  key={i}
                  className="footer-bar accent-bar rounded-full"
                  style={{
                    width: 4,
                    height: `${(h * 22).toFixed(0)}px`,
                    animationDelay: `${(-i * 0.5).toFixed(2)}s`,
                    transformOrigin: "center",
                  }}
                />
              ))}
            </span>
            <span className="flex flex-col justify-center gap-[3px]">
              {[1, 1, 0.62].map((w, i) => (
                <span
                  key={i}
                  className="rounded-full bg-foreground"
                  style={{
                    width: `${(w * 13).toFixed(0)}px`,
                    height: 3.5,
                    opacity: i === 2 ? 0.55 : 1,
                  }}
                />
              ))}
            </span>
          </span>
          <span
            className="footer-wordmark text-foreground"
            style={{ fontSize: 21, lineHeight: 1 }}
          >
            verbatim
          </span>
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-1.5">
          <Link href="/#story" className={`hidden sm:block ${link}`}>
            Product
          </Link>
          <Link href="/demo" className={link}>
            Demo
          </Link>
          <a href={DOCS_URL} target="_blank" rel="noreferrer" className={`hidden sm:block ${link}`}>
            Docs
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={link}>
            GitHub
          </a>
          <ThemeToggle />
          <a
            href={DOWNLOAD_URL}
            target="_blank"
            rel="noreferrer"
            className="ml-1 flex items-center gap-2 rounded-lg bg-foreground px-3.5 py-2 text-[13px] font-medium text-background transition-opacity hover:opacity-85 sm:text-sm"
          >
            Download
          </a>
        </div>
      </nav>
    </header>
  );
}

export function GitHubMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden className={className}>
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38l-.01-1.49C3.8 14.18 3.34 13 3.34 13c-.36-.92-.88-1.16-.88-1.16-.72-.49.06-.48.06-.48.79.06 1.21.81 1.21.81.71 1.21 1.86.86 2.31.66.07-.51.28-.86.5-1.06-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.11.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}
