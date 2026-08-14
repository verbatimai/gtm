"use client";

import { useEffect, useState } from "react";

/**
 * ACT 7 — the daily driver. Not a feature-card wall: a lightweight settings
 * window. The left nav switches panels; Hotkeys includes a real
 * shortcut-recording interaction (browser-side only, nothing is stored).
 */

const SECTIONS = [
  "Dictation",
  "Models",
  "Vocabulary",
  "Snippets",
  "Hotkeys",
  "Privacy",
] as const;
type Section = (typeof SECTIONS)[number];

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-3 last:border-b-0">
      <span className="text-[14px] text-muted">{label}</span>
      <span className="flex items-center gap-2 text-[14px] text-foreground">
        {children}
      </span>
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        on ? "bg-[#34d399]" : "bg-foreground/20"
      }`}
    >
      <span
        className={`absolute h-4 w-4 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-[18px]" : "translate-x-[2px]"
        }`}
      />
    </span>
  );
}

function Select({ value, options }: { value: string; options: string[] }) {
  const [v, setV] = useState(value);
  return (
    <select
      value={v}
      onChange={(e) => setV(e.target.value)}
      className="rounded-lg border border-line bg-transparent px-2.5 py-1.5 text-[13.5px] text-foreground outline-none"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-background text-foreground">
          {o}
        </option>
      ))}
    </select>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-md border border-line bg-foreground/5 px-2 py-1 font-mono text-[12.5px] text-foreground">
      {children}
    </kbd>
  );
}

function HotkeyRecorder() {
  const [recording, setRecording] = useState(false);
  const [combo, setCombo] = useState("⌥ Space");

  useEffect(() => {
    if (!recording) return;
    const onKey = (e: KeyboardEvent) => {
      e.preventDefault();
      const parts: string[] = [];
      if (e.metaKey) parts.push("⌘");
      if (e.altKey) parts.push("⌥");
      if (e.ctrlKey) parts.push("⌃");
      if (e.shiftKey) parts.push("⇧");
      const key = e.key === " " ? "Space" : e.key.length === 1 ? e.key.toUpperCase() : e.key;
      if (!["Meta", "Alt", "Control", "Shift"].includes(e.key)) {
        parts.push(key);
        setCombo(parts.join(" "));
        setRecording(false);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [recording]);

  return (
    <span className="flex items-center gap-2">
      <Kbd>{combo}</Kbd>
      <button
        type="button"
        onClick={() => setRecording((r) => !r)}
        className={`rounded-lg border px-2.5 py-1 text-[12.5px] transition-colors ${
          recording
            ? "border-[#f87171]/60 text-[#f87171]"
            : "border-line text-muted hover:text-foreground"
        }`}
      >
        {recording ? "press keys…" : "record"}
      </button>
    </span>
  );
}

const VOCAB = ["JustCall", "AIVA", "Kubernetes", "PostHog"];

function Panel({ section }: { section: Section }) {
  switch (section) {
    case "Dictation":
      return (
        <div>
          <Row label="Activation">
            <Kbd>⌥ Space</Kbd>
          </Row>
          <Row label="Mode">
            <Select value="Tap to toggle" options={["Tap to toggle", "Hold to talk"]} />
          </Row>
          <Row label="Formatting">
            <Select value="Message" options={["Prose", "Message", "Code", "Raw"]} />
          </Row>
          <Row label="Secure fields">
            <span className="text-[13px] text-muted">never injected — copy offered instead</span>
          </Row>
        </div>
      );
    case "Models":
      return (
        <div>
          <Row label="Speech model">
            <Select value="PyAI (default)" options={["PyAI (default)", "Deepgram", "OpenAI"]} />
          </Row>
          <Row label="Correction model">
            <Select value="PyAI (default)" options={["PyAI (default)", "OpenAI", "Anthropic"]} />
          </Row>
          <Row label="API keys">
            <span className="flex items-center gap-1.5 text-[13px] text-muted">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <rect x="5" y="10.5" width="14" height="9" rx="2" />
                <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
              </svg>
              stored in macOS Keychain
            </span>
          </Row>
        </div>
      );
    case "Vocabulary":
      return (
        <div>
          <div className="flex flex-wrap gap-2 pb-4">
            {VOCAB.map((w) => (
              <span
                key={w}
                className="rounded-full border border-line px-3 py-1.5 text-[13px] text-foreground"
              >
                {w}
              </span>
            ))}
            <span className="rounded-full border border-dashed border-line px-3 py-1.5 text-[13px] text-muted">
              + add word
            </span>
          </div>
          <p className="text-[13px] leading-relaxed text-muted">
            Words you say every day shouldn&rsquo;t be the words transcription
            gets wrong.
          </p>
        </div>
      );
    case "Snippets":
      return (
        <div>
          <Row label="“my email”">
            <span className="font-mono text-[12.5px]">vishad@saaslabs.co</span>
          </Row>
          <Row label="“standup link”">
            <span className="font-mono text-[12.5px]">meet.google.com/xyz-abcd</span>
          </Row>
          <Row label="“sign off”">
            <span className="font-mono text-[12.5px]">Best, Vishad</span>
          </Row>
        </div>
      );
    case "Hotkeys":
      return (
        <div>
          <Row label="Start / stop dictation">
            <HotkeyRecorder />
          </Row>
          <Row label="Paste last result">
            <Kbd>⌥ ⇧ V</Kbd>
          </Row>
          <Row label="Revert to raw">
            <Kbd>⌥ ⇧ R</Kbd>
          </Row>
        </div>
      );
    case "Privacy":
      return (
        <div>
          <Row label="Content telemetry">
            <span className="flex items-center gap-2 text-[13px] text-muted">
              off — not collectable <Toggle on={false} />
            </span>
          </Row>
          <Row label="Anonymous latency metrics">
            <span className="flex items-center gap-2 text-[13px] text-muted">
              opt-in <Toggle on />
            </span>
          </Row>
          <Row label="Keys in Keychain">
            <span className="text-[#34d399]">✓</span>
          </Row>
        </div>
      );
  }
}

export default function SettingsTour() {
  const [section, setSection] = useState<Section>("Dictation");

  return (
    <section id="settings" className="px-5 py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="t-kicker">the daily driver</p>
          <h2 className="t-display t-display-md mt-5">
            Tuned in five minutes. Yours for years.
          </h2>
        </div>

        <div className="surface mx-auto flex min-h-[21rem] max-w-3xl overflow-hidden rounded-xl">
          {/* left nav */}
          <div className="w-36 shrink-0 border-r border-line bg-black/[0.03] py-3 sm:w-44">
            {SECTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSection(s)}
                className={`block w-full px-4 py-2 text-left text-[13.5px] transition-colors ${
                  s === section
                    ? "bg-foreground/[0.07] font-medium text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* panel */}
          <div key={section} className="flex-1 px-6 py-5 [animation:fadeUp_.3s_ease]">
            <p className="mb-3 text-[15px] font-semibold tracking-tight text-foreground">
              {section}
            </p>
            <Panel section={section} />
          </div>
        </div>
      </div>
    </section>
  );
}
