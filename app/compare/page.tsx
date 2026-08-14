import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Nav, { DOWNLOAD_URL, GITHUB_URL } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Verbatim vs Wispr Flow",
  description:
    "Both turn speech into clean text in any app. Verbatim is open source, BYOK, provider-agnostic — and shows its corrections instead of hiding them.",
};

type Cell = true | false | string;
type RowT = { label: string; note?: string; us: Cell; them: Cell };

const ROWS: RowT[] = [
  { label: "Price", us: "Free — MIT open source", them: "Subscription" },
  { label: "Open source", note: "every line auditable on GitHub", us: true, them: false },
  { label: "Bring your own keys", note: "your accounts, your bill", us: true, them: false },
  { label: "Choose your providers", note: "speech: PyAI · Deepgram · OpenAI — correction: PyAI · OpenAI · Anthropic, mixed freely", us: true, them: false },
  { label: "Visible corrections", note: "see every filler and false start struck out — nothing edited behind your back", us: true, them: false },
  { label: "Revert to raw", note: "one shortcut back to exactly what you said", us: true, them: false },
  { label: "Live streaming transcript", note: "stable text + volatile tail while you speak", us: true, them: true },
  { label: "Formatting modes", note: "prose · message · code · raw", us: true, them: true },
  { label: "Custom vocabulary & snippets", us: true, them: true },
  { label: "Content telemetry", note: "what you say, collected as data", us: "Never — not collectable", them: "Cloud account required" },
  { label: "Key storage", us: "macOS Keychain", them: "—" },
  { label: "Platforms", us: "macOS (Windows coming)", them: "Mac · Windows · iPhone" },
];

function CellView({ v, strong = false }: { v: Cell; strong?: boolean }) {
  if (v === true)
    return <span className={strong ? "text-[17px] text-[#34d399]" : "text-[17px] text-muted"}>✓</span>;
  if (v === false) return <span className="text-[15px] text-muted/60">✗</span>;
  return (
    <span className={`text-[13.5px] leading-snug ${strong ? "font-medium text-foreground" : "text-muted"}`}>
      {v}
    </span>
  );
}

export default function ComparePage() {
  return (
    <>
      <Nav />
      <main className="flex-1 px-5 pb-24 pt-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 flex flex-col items-center text-center">
            <p className="t-kicker">compare</p>
            <h1 className="t-display t-display-lg mt-5">
              Verbatim vs Wispr Flow
            </h1>
            <p className="t-body mt-4 max-w-lg">
              Both turn natural speech into clean text in any app. The
              difference is who owns the stack — and whether you get to see
              what the correction pass did.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line">
            {/* header */}
            <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-line bg-foreground/[0.04]">
              <span className="px-5 py-3.5" />
              <span className="px-4 py-3.5 text-[14px] font-bold tracking-tight text-foreground">
                Verbatim
              </span>
              <span className="px-4 py-3.5 text-[14px] font-medium text-muted">
                Wispr Flow
              </span>
            </div>

            {ROWS.map((r) => (
              <div
                key={r.label}
                className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-line last:border-b-0"
              >
                <div className="px-5 py-3.5">
                  <p className="text-[14px] font-medium text-foreground">{r.label}</p>
                  {r.note && (
                    <p className="mt-0.5 text-[12px] leading-relaxed text-muted">{r.note}</p>
                  )}
                </div>
                <div className="flex items-center bg-foreground/[0.04] px-4 py-3.5">
                  <CellView v={r.us} strong />
                </div>
                <div className="flex items-center px-4 py-3.5">
                  <CellView v={r.them} />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center font-mono text-[11px] text-muted">
            based on publicly available information, August 2026 — corrections
            welcome via GitHub
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <a
              href={DOWNLOAD_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 rounded-lg bg-foreground px-6 py-3.5 text-[15px] font-medium text-background transition-opacity hover:opacity-85"
            >
              Download for Mac
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-line px-6 py-3.5 text-[15px] font-medium text-foreground transition-colors hover:border-foreground/45"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
