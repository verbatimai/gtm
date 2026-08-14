"use client";

import { useState } from "react";

import { MicIndicator } from "./story/ui";

/**
 * ACT 5 — one spoken thought, four shapes. A single interactive surface with
 * Prose / Message / Code / Raw tabs; the output re-renders per mode. The
 * small utility labels below stay labels — never a card wall.
 */

const VOICE =
  "hey rhea can you send me the numbers from last quarter also tell me whether churn went down thanks";

const CODE_VOICE =
  "add a todo above this function reminding me to debounce the search input and handle rate limits";

type Mode = "Prose" | "Message" | "Code" | "Raw";
const MODES: Mode[] = ["Prose", "Message", "Code", "Raw"];

const OUTPUT: Record<Mode, { voice: string; body: React.ReactNode }> = {
  Prose: {
    voice: VOICE,
    body: (
      <p className="text-[16px] leading-relaxed text-foreground">
        Rhea, could you share last quarter&rsquo;s numbers? I&rsquo;d also like
        to know whether churn decreased over the period.
      </p>
    ),
  },
  Message: {
    voice: VOICE,
    body: (
      <p className="text-[16px] leading-relaxed text-foreground">
        Hey Rhea, can you send me the numbers from last quarter? Also, could
        you let me know whether churn went down? Thanks!
      </p>
    ),
  },
  Code: {
    voice: CODE_VOICE,
    body: (
      <pre className="overflow-x-auto rounded-lg bg-[#0d0d14] p-4 font-mono text-[13.5px] leading-relaxed text-[#d8dce8]">
        {`// TODO: debounce the search input and handle rate limits
function searchCustomers(query: string) {`}
      </pre>
    ),
  },
  Raw: {
    voice: VOICE,
    body: (
      <p className="text-[16px] leading-relaxed text-muted">
        hey rhea can you send me the numbers from last quarter also tell me
        whether churn went down thanks
      </p>
    ),
  },
};

const UTILITIES = [
  "Custom vocabulary",
  "Snippets",
  "Paste last",
  "Revert to raw",
  "Custom hotkey",
];

export default function FormatModes() {
  const [mode, setMode] = useState<Mode>("Message");

  return (
    <section id="modes" className="px-5 py-28">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="t-kicker">control how it writes</p>
          <h2 className="t-display t-display-md mt-5">
            One thought. Four shapes.
          </h2>
        </div>

        {/* the spoken input */}
        <div className="mb-5 flex items-start gap-3">
          <MicIndicator className="mt-0.5 shrink-0" />
          <p className="t-quote text-[1.15rem] leading-relaxed text-muted sm:text-[1.3rem]">
            &ldquo;{OUTPUT[mode].voice}&rdquo;
          </p>
        </div>

        {/* the surface */}
        <div className="surface overflow-hidden rounded-xl">
          <div className="flex items-center gap-1 border-b border-line px-3 py-2.5">
            {MODES.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-lg px-3.5 py-1.5 text-[13.5px] font-medium transition-colors ${
                  m === mode
                    ? "bg-foreground text-background"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <div key={mode} className="min-h-[7.5rem] px-6 py-5 [animation:fadeUp_.35s_ease]">
            {OUTPUT[mode].body}
          </div>
        </div>

        {/* restrained utility labels — not six cards */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5">
          {UTILITIES.map((u) => (
            <span
              key={u}
              className="flex items-center gap-2 font-mono text-[12px] tracking-tight text-muted"
            >
              <span className="accent-bar h-1.5 w-1.5 rounded-full" />
              {u}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
