"use client";

import { useEffect, useState } from "react";

/**
 * ACT 7 — the daily driver: a faithful replica of the actual Verbatim
 * settings window (dark chrome in both site themes, like the app).
 * Sidebar groups, the Ready banner, Preferences toggles, the Shortcuts
 * panel with preset chips and a real recorder — all interactive.
 */

const C = {
  win: "#0d0f1e",
  side: "#10132480",
  border: "rgba(255,255,255,0.08)",
  text: "#e8eaf4",
  muted: "#8b90a8",
  accent: "#8b7bf0",
};

const SECTIONS = [
  ["GENERAL", ["Preferences", "Shortcuts"]],
  ["INTELLIGENCE", ["API Keys", "Labs"]],
  ["SYSTEM", ["Permissions", "Names & Jargon", "Snippets", "Advanced"]],
] as const;
type Section =
  | "Preferences" | "Shortcuts" | "API Keys" | "Labs"
  | "Permissions" | "Names & Jargon" | "Snippets" | "Advanced";

const ICONS: Record<Section, React.ReactNode> = {
  Preferences: <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm7.5 3.5-.9-2.6 1.4-2-1.9-1.9-2 1.4-2.6-.9L12 4l-1.5 2-2.6.9-2-1.4-1.9 1.9 1.4 2-.9 2.6L4 12l2 1.5.9 2.6-1.4 2 1.9 1.9 2-1.4 2.6.9L12 20l1.5-2 2.6-.9 2 1.4 1.9-1.9-1.4-2 .9-2.6L20 12l-.5 0Z" />,
  Shortcuts: <><rect x="3" y="7" width="18" height="11" rx="2" /><path d="M7 11h.01M11 11h.01M15 11h.01M8 14.5h8" /></>,
  "API Keys": <path d="M14.5 4a5.5 5.5 0 0 0-5.2 7.3L4 16.5V20h3.5l1-1v-2h2l1.5-1.5.3-1.7A5.5 5.5 0 1 0 14.5 4Zm1.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />,
  Labs: <path d="M9.5 3v6L4.8 17a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14.5 9V3M8 3h8" />,
  Permissions: <path d="M12 3 5 6v5c0 4.4 3 8.4 7 9.5 4-1.1 7-5.1 7-9.5V6l-7-3Zm-1.5 12-2.5-2.5 1.4-1.4 1.1 1.1 3.6-3.6 1.4 1.4-5 5Z" />,
  "Names & Jargon": <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Zm3 4h8M8 12h8" />,
  Snippets: <path d="m8 8-4 4 4 4M16 8l4 4-4 4" />,
  Advanced: <path d="M4 8h10M18 8h2M4 16h2M10 16h10M14 5.5v5M8 13.5v5" />,
};

function Toggle({ on, onClick }: { on: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors"
      style={{ background: on ? C.accent : "rgba(255,255,255,0.16)" }}
    >
      <span
        className="absolute h-5 w-5 rounded-full bg-white shadow transition-transform"
        style={{ transform: on ? "translateX(22px)" : "translateX(2px)" }}
      />
    </button>
  );
}

function Row({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="flex items-start justify-between gap-6 border-b py-4 last:border-b-0"
      style={{ borderColor: C.border }}
    >
      <div className="min-w-0">
        <p className="text-[14.5px] font-semibold" style={{ color: C.text }}>
          {title}
        </p>
        {desc && (
          <p className="mt-1 text-[12.5px] leading-relaxed" style={{ color: C.muted }}>
            {desc}
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2 pt-0.5">{children}</div>
    </div>
  );
}

function Kbd({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <kbd
      className="rounded-md px-2.5 py-1 font-mono text-[12px]"
      style={{
        background: active ? C.accent : "rgba(255,255,255,0.08)",
        color: active ? "#fff" : C.text,
        border: `1px solid ${active ? C.accent : C.border}`,
      }}
    >
      {children}
    </kbd>
  );
}

function Recorder() {
  const [recording, setRecording] = useState(false);
  const [combo, setCombo] = useState<string | null>(null);

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
        setCombo(parts.join(""));
        setRecording(false);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [recording]);

  return (
    <>
      <button
        type="button"
        onClick={() => setRecording((r) => !r)}
        className="rounded-lg px-3 py-1.5 font-mono text-[12px] transition-colors"
        style={{
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${recording ? C.accent : C.border}`,
          color: recording ? C.accent : combo ? C.text : C.muted,
        }}
      >
        {recording ? "press a combo…" : combo ?? "Click, then press a combo"}
      </button>
      <button
        type="button"
        onClick={() => setCombo(null)}
        className="rounded-lg px-3 py-1.5 text-[12px]"
        style={{ border: `1px solid ${C.border}`, color: C.muted }}
      >
        Clear
      </button>
    </>
  );
}

function Panel({ section }: { section: Section }) {
  const [appearance, setAppearance] = useState("Dark");
  const [launch, setLaunch] = useState(false);
  const [dock, setDock] = useState(false);
  const [mute, setMute] = useState(true);
  const [live, setLive] = useState(true);
  const [ptt, setPtt] = useState(true);

  switch (section) {
    case "Preferences":
      return (
        <div>
          <p className="text-[13px]" style={{ color: C.muted }}>
            Application behavior, dictation, and correction — all in one place.
          </p>
          <div
            className="mt-4 rounded-lg px-4 py-2.5 text-[13px]"
            style={{ background: "rgba(34,150,90,0.14)", border: "1px solid rgba(60,200,130,0.3)", color: "#6fdc9f" }}
          >
            ✓ Ready — this configuration will run.
          </div>

          <div className="mt-2">
            <Row title="Appearance" desc="Light, dark, or match the system. Applies to the widget and settings.">
              <div className="flex rounded-lg p-0.5" style={{ background: "rgba(255,255,255,0.07)" }}>
                {["Light", "Dark", "System"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setAppearance(m)}
                    className="rounded-md px-3 py-1 text-[12.5px] font-medium transition-colors"
                    style={{
                      background: appearance === m ? "rgba(255,255,255,0.14)" : "transparent",
                      color: appearance === m ? C.text : C.muted,
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </Row>
            <Row title="Launch at login" desc="Automatically start Verbatim when you log in.">
              <Toggle on={launch} onClick={() => setLaunch((v) => !v)} />
            </Row>
            <Row title="Show app in dock" desc="Display the application icon in the macOS dock.">
              <Toggle on={dock} onClick={() => setDock((v) => !v)} />
            </Row>
            <Row title="Mute other audio while dictating" desc="Silence system output while you dictate, then restore it.">
              <Toggle on={mute} onClick={() => setMute((v) => !v)} />
            </Row>
            <Row
              title="Show live transcript while dictating"
              desc={'Show the streaming transcript and the "what we removed" reveal in a small bubble above the widget.'}
            >
              <Toggle on={live} onClick={() => setLive((v) => !v)} />
            </Row>
          </div>
        </div>
      );
    case "Shortcuts":
      return (
        <div>
          <p className="text-[13px]" style={{ color: C.muted }}>
            Global keyboard shortcuts for dictation and hands-free modes.
          </p>
          <div className="mt-2">
            <Row title="Toggle dictation" desc="Press once to start, again to stop. Needs at least one modifier (⌥/⌃/⌘/⇧).">
              <div className="flex flex-wrap justify-end gap-1.5">
                <Kbd>⌥Space</Kbd>
                <Kbd>⌃Space</Kbd>
                <Kbd>⌘⇧D</Kbd>
                <Kbd active>⌥`</Kbd>
              </div>
            </Row>
            <Row title="Push to talk" desc="Hold a key to dictate while it's pressed. Needs Input Monitoring.">
              <Toggle on={ptt} onClick={() => setPtt((v) => !v)} />
              <Kbd>Fn 🌐</Kbd>
            </Row>
            <Row title="Paste last transcript" desc="Re-insert your most recent transcription into the active app.">
              <Recorder />
            </Row>
            <Row title="Revert to raw" desc="Re-insert the RAW (uncorrected) transcript when a correction over-edited.">
              <Recorder />
            </Row>
            <Row title="Command mode hotkey" desc="Start/stop voice command mode (edits + system commands).">
              <Kbd active>⌃Backquote</Kbd>
            </Row>
          </div>
        </div>
      );
    case "API Keys":
      return (
        <div>
          <Row title="Speech model" desc="PyAI is the default. English-only — route other languages through Deepgram or OpenAI.">
            <Kbd active>PyAI</Kbd>
            <Kbd>Deepgram</Kbd>
            <Kbd>OpenAI</Kbd>
          </Row>
          <Row title="Correction model">
            <Kbd active>PyAI</Kbd>
            <Kbd>OpenAI</Kbd>
            <Kbd>Anthropic</Kbd>
          </Row>
          <Row title="OpenAI key" desc="Stored in the macOS Keychain — never in a config file.">
            <span className="font-mono text-[12.5px]" style={{ color: C.muted }}>
              sk-••••••••••3kF9 🔒
            </span>
          </Row>
        </div>
      );
    case "Labs":
      return (
        <div>
          <Row title="Voice command mode" desc="Edit by talking — “delete the last sentence”, “make that bold”.">
            <span className="tag tag--planned">In beta</span>
            <Toggle on />
          </Row>
          <Row title="Meeting capture" desc="Mic + system audio → transcript → structured notes.">
            <span className="tag tag--experimental">Experimental</span>
            <Toggle on={false} />
          </Row>
        </div>
      );
    case "Permissions":
      return (
        <div>
          {["Microphone", "Accessibility", "Input Monitoring"].map((p) => (
            <Row key={p} title={p}>
              <span className="text-[13px]" style={{ color: "#6fdc9f" }}>✓ Granted</span>
            </Row>
          ))}
          <Row title="Screen recording" desc="Only needed for meeting capture (Labs).">
            <span className="text-[13px]" style={{ color: C.muted }}>Not requested</span>
          </Row>
        </div>
      );
    case "Names & Jargon":
      return (
        <div>
          <div className="flex flex-wrap gap-2 py-4">
            {["JustCall", "AIVA", "Kubernetes", "PostHog"].map((w) => (
              <span
                key={w}
                className="rounded-full px-3 py-1.5 text-[13px]"
                style={{ border: `1px solid ${C.border}`, color: C.text }}
              >
                {w}
              </span>
            ))}
            <span
              className="rounded-full border-dashed px-3 py-1.5 text-[13px]"
              style={{ border: `1px dashed ${C.border}`, color: C.muted }}
            >
              + add word
            </span>
          </div>
          <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>
            Names and terms you say every day shouldn&rsquo;t be the words
            transcription gets wrong.
          </p>
        </div>
      );
    case "Snippets":
      return (
        <div>
          <Row title=";intro">
            <span className="font-mono text-[12px]" style={{ color: C.muted }}>Hi, I&rsquo;m Vishad from SaaS Labs —</span>
          </Row>
          <Row title="“my email”">
            <span className="font-mono text-[12px]" style={{ color: C.muted }}>vishad@saaslabs.co</span>
          </Row>
          <Row title="“standup link”">
            <span className="font-mono text-[12px]" style={{ color: C.muted }}>meet.google.com/xyz-abcd</span>
          </Row>
        </div>
      );
    case "Advanced":
      return (
        <div>
          <Row title="Content telemetry" desc="What you say is never collected. This cannot be turned on.">
            <Toggle on={false} />
          </Row>
          <Row title="Anonymous latency metrics" desc="Opt-in, metadata only.">
            <Toggle on />
          </Row>
          <Row title="Overlapping sessions" desc="A new dictation safely cancels the previous one.">
            <span className="text-[13px]" style={{ color: "#6fdc9f" }}>✓ Safe</span>
          </Row>
        </div>
      );
  }
}

export default function SettingsTour() {
  const [section, setSection] = useState<Section>("Preferences");

  return (
    <section id="settings" className="px-5 py-28">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col items-center text-center">
          <p className="t-kicker">the daily driver</p>
          <h2 className="t-display t-display-md mt-5">
            Tuned in five minutes. Yours for years.
          </h2>
        </div>

        {/* the app's settings window — dark chrome in both site themes */}
        <div
          className="mx-auto overflow-hidden rounded-2xl shadow-[0_50px_120px_-45px_rgba(0,0,15,0.85)]"
          style={{ background: C.win, border: `1px solid ${C.border}` }}
        >
          {/* title bar */}
          <div
            className="relative flex items-center gap-1.5 border-b px-4 py-3"
            style={{ borderColor: C.border }}
          >
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} className="h-3 w-3 rounded-full" style={{ background: c }} />
            ))}
            <span
              className="absolute left-1/2 -translate-x-1/2 text-[13px] font-semibold"
              style={{ color: C.text }}
            >
              Verbatim
            </span>
          </div>

          <div className="flex min-h-[26rem]">
            {/* sidebar */}
            <div
              className="hidden w-56 shrink-0 flex-col border-r px-3 py-4 sm:flex"
              style={{ borderColor: C.border, background: C.side }}
            >
              <p className="px-2 text-[12.5px]" style={{ color: C.muted }}>
                ‹ Back to app
              </p>
              <div className="mt-3 flex items-center gap-2.5 px-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <span className="flex items-center gap-[2px]">
                    {[10, 15, 12].map((h, i) => (
                      <span key={i} className="accent-bar w-[2.5px] rounded-full" style={{ height: h }} />
                    ))}
                  </span>
                </span>
                <span>
                  <span className="block text-[13.5px] font-semibold" style={{ color: C.text }}>Verbatim</span>
                  <span className="block text-[11px]" style={{ color: C.muted }}>Settings</span>
                </span>
              </div>

              <div
                className="mt-3 flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[12px]"
                style={{ border: `1px solid ${C.border}`, color: C.muted }}
              >
                <span>Search</span>
                <span className="font-mono text-[10px]">⌘K</span>
              </div>

              {SECTIONS.map(([group, items]) => (
                <div key={group} className="mt-4">
                  <p className="px-2 pb-1 font-mono text-[10px] tracking-[0.14em]" style={{ color: C.muted }}>
                    {group}
                  </p>
                  {items.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSection(s)}
                      className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors"
                      style={{
                        background: section === s ? "rgba(255,255,255,0.09)" : "transparent",
                        color: section === s ? C.text : C.muted,
                      }}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        {ICONS[s]}
                      </svg>
                      {s}
                    </button>
                  ))}
                </div>
              ))}

              <div className="mt-auto pt-4">
                <div
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12.5px]"
                  style={{ border: `1px solid ${C.border}`, color: C.muted }}
                >
                  🌙 Dark
                </div>
                <div className="mt-2 flex items-center gap-2 px-2 text-[12.5px]" style={{ color: C.muted }}>
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold text-white"
                    style={{ background: "#e0596e" }}
                  >
                    VT
                  </span>
                  Vishad Thusu
                </div>
              </div>
            </div>

            {/* panel */}
            <div key={section} className="min-w-0 flex-1 px-6 py-5 [animation:fadeUp_.3s_ease]">
              <p className="mb-1 text-[19px] font-bold tracking-tight" style={{ color: C.text }}>
                {section}
              </p>
              <Panel section={section} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
