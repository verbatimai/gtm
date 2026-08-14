import Reveal from "./Reveal";

type Milestone = {
  id: string;
  title: string;
  blurb: string;
  status: "done" | "active" | "next";
};

const MILESTONES: Milestone[] = [
  {
    id: "M0",
    title: "Foundation & de-risking",
    blurb: "PyAI mapped, streaming protocol decoded, vendor-neutral core, CI gates.",
    status: "done",
  },
  {
    id: "M1",
    title: "Core pipeline, headless",
    blurb: "Audio in, live partials + validated edit ops out. Closes the latency risk.",
    status: "active",
  },
  {
    id: "M2",
    title: "Live web demo",
    blurb: "Speak in a browser, watch it transcribe and correct itself end to end.",
    status: "active",
  },
  {
    id: "M3",
    title: "Desktop widget (macOS)",
    blurb: "Hotkey, non-focusable overlay, injection into the focused field.",
    status: "next",
  },
  {
    id: "M4",
    title: "Multi-vendor + config",
    blurb: "Deepgram, OpenAI, Anthropic adapters. Keys in the OS keychain.",
    status: "next",
  },
  {
    id: "M5",
    title: "Quality & polish",
    blurb: "Custom vocabulary, undo, formatting modes, daily-driver reliability.",
    status: "next",
  },
  {
    id: "M6",
    title: "Open-source v1.0",
    blurb: "Windows support, signed builds, public repo, final security review.",
    status: "next",
  },
];

const STATUS_META: Record<Milestone["status"], { label: string; color: string }> = {
  done: { label: "shipped", color: "#22e4f5" },
  active: { label: "in progress", color: "#8b5cf6" },
  next: { label: "planned", color: "#8b93a7" },
};

export default function Roadmap() {
  return (
    <div className="relative">
      <div className="-mx-4 overflow-x-auto px-4 pb-4">
        <div className="flex min-w-max gap-4">
          {MILESTONES.map((m, i) => {
            const meta = STATUS_META[m.status];
            return (
              <Reveal key={m.id} delay={i * 60}>
                <div className="glass glass-hover flex h-full w-[16.5rem] flex-col rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-sm font-medium"
                      style={{ color: meta.color }}
                    >
                      {m.id}
                    </span>
                    <span
                      className="rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]"
                      style={{
                        color: meta.color,
                        borderColor: `${meta.color}40`,
                        background: `${meta.color}12`,
                      }}
                    >
                      {meta.label}
                    </span>
                  </div>

                  <div className="my-4 flex items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{
                        background: meta.color,
                        boxShadow:
                          m.status === "next" ? "none" : `0 0 12px ${meta.color}`,
                      }}
                    />
                    <span
                      className="h-px flex-1"
                      style={{
                        background:
                          i === MILESTONES.length - 1
                            ? "transparent"
                            : `linear-gradient(to right, ${meta.color}66, rgba(255,255,255,0.08))`,
                      }}
                    />
                  </div>

                  <p className="text-sm font-medium text-white">{m.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {m.blurb}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
      <p className="mt-2 font-mono text-[11px] text-muted/70">
        Each arrow is a hard gate — the left side must be demoable before the right
        side starts.
      </p>
    </div>
  );
}
