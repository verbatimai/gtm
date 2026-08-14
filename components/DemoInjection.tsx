"use client";

import { useEffect, useState } from "react";

import { GmailCard, NotionCard, SlackCard } from "./story/app-cards";

/**
 * DEMO 3 — app injection. Pick a destination; the same dictation resolves
 * into it, typed at the cursor. A browser demonstration of the desktop
 * behaviour (nothing here touches your real apps).
 */

const CLEAN = "Hey Sarah, could we move the meeting to Thursday afternoon?";

type App = "Slack" | "Gmail" | "Notion";
const APPS: App[] = ["Slack", "Gmail", "Notion"];

function Typed({ text }: { text: string }) {
  // remounts per destination (the parent keys on the selected app), so the
  // counter always starts fresh — no state reset needed inside the effect
  const [n, setN] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          clearInterval(id);
          return v;
        }
        return v + 2;
      });
    }, 24);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span>
      {text.slice(0, n)}
      <span className="caret caret-blink ml-0.5 h-[1em] align-[-0.12em]" />
    </span>
  );
}

export default function DemoInjection() {
  const [app, setApp] = useState<App>("Gmail");

  return (
    <div>
      <div className="mb-4 flex items-center gap-1.5">
        {APPS.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setApp(a)}
            className={`rounded-lg border px-4 py-2 text-[13.5px] font-medium transition-colors ${
              a === app
                ? "border-foreground/50 bg-foreground/10 text-foreground"
                : "border-line text-muted hover:text-foreground"
            }`}
          >
            {a}
          </button>
        ))}
        <span className="ml-auto hidden font-mono text-[10.5px] uppercase tracking-wider text-muted sm:block">
          a demo of the desktop behaviour
        </span>
      </div>

      <div key={app} className="h-[22rem] [animation:fadeUp_.35s_ease] sm:h-[24rem]">
        {app === "Gmail" && <GmailCard body={<Typed text={CLEAN} />} />}
        {app === "Slack" && (
          // hide the deck-only typing indicator; show the settled message
          <div className="h-full [&_[data-typing]]:hidden">
            <SlackCard />
          </div>
        )}
        {app === "Notion" && (
          <NotionCard>
            <p className="text-[15px] leading-relaxed text-foreground">
              <Typed text={CLEAN} />
            </p>
          </NotionCard>
        )}
      </div>
    </div>
  );
}
