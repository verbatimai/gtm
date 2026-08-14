import Link from "next/link";
import type { Metadata } from "next";

import Background from "@/components/Background";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import Nav, { GITHUB_URL, GitHubMark } from "@/components/Nav";
import Pipeline from "@/components/Pipeline";
import Reveal from "@/components/Reveal";
import Roadmap from "@/components/Roadmap";

export const metadata: Metadata = {
  title: "Stats for nerds — Verbatim",
  description:
    "The architecture behind Verbatim: the two-layer pipeline, measured latency budget, vendor adapter matrix, security gates and the M0–M6 roadmap.",
};

/* --------------------------------- data --------------------------------- */

const STATS = [
  { value: "~590ms", label: "to first partial", sub: "mic → streaming STT" },
  { value: "<1s", label: "correction after pause", sub: "segment → animated diff" },
  { value: "16ms", label: "partial → on screen", sub: "local render budget" },
  { value: "live", label: "as spoken", sub: "Layer 1 never blocks" },
];

const LATENCY_ROWS = [
  ["Mic → first partial", "~300 ms", "~590 ms", "measured"],
  ["Partial → on screen", "< 16 ms", "local render", "ok"],
  ["Pause → segment final", "500–800 ms", "VAD timeout", "pending"],
  ["Segment → correction", "300–800 ms", "compact-ops", "tuning"],
  ["Correction animation", "200–400 ms", "CSS", "ok"],
];

const ADAPTERS = [
  {
    name: "PyAI",
    tag: "default",
    stt: "pyai-hear (WS stream)",
    llm: "gpt-5.6-sol",
    wire: "Anthropic-style",
    note: "Native stable/active split — the contract every other adapter normalizes to.",
    accent: "#22e4f5",
  },
  {
    name: "Deepgram",
    tag: "STT only",
    stt: "streaming WS",
    llm: "—",
    wire: "Deepgram",
    note: "Interim/final events; stable and active text computed from finals.",
    accent: "#8b5cf6",
  },
  {
    name: "OpenAI",
    tag: "both roles",
    stt: "Whisper / Realtime",
    llm: "GPT via chat completions",
    wire: "OpenAI",
    note: "Covers speech-to-text and the correction pass on its own.",
    accent: "#22e4f5",
  },
  {
    name: "Anthropic",
    tag: "correction only",
    stt: "—",
    llm: "Claude via /v1/messages",
    wire: "Anthropic",
    note: "Native tool-use makes structured edit ops especially clean.",
    accent: "#8b5cf6",
  },
];

const SECURITY = [
  {
    title: "Secret scanning",
    body: "gitleaks on every push and PR, plus a full-history scan and pre-commit hooks.",
  },
  {
    title: "SAST + dependency audit",
    body: "CodeQL on TypeScript and Python, npm audit and pip-audit gating merges, Dependabot on.",
  },
  {
    title: "Signed builds",
    body: "Pinned lockfiles, reproducible releases and signed binaries before anything ships.",
  },
  {
    title: "Keys never travel",
    body: "OS keychain storage, redacted logs, and no key in the renderer or client bundle. Ever.",
  },
];

/* --------------------------------- page --------------------------------- */

function Section({
  id,
  label,
  title,
  blurb,
  children,
}: {
  id: string;
  label: string;
  title: string;
  blurb: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-5 py-16">
      <Reveal>
        <p className="t-kicker text-white">{label}</p>
        <h2 className="t-display t-display-md mt-4 text-white">{title}</h2>
        <p className="t-body-sm mt-3 max-w-2xl text-[#8b93a7]">{blurb}</p>
      </Reveal>
      <div className="mt-9">{children}</div>
    </section>
  );
}

export default function NerdsPage() {
  return (
    // The landing page paints an opaque light body, so /nerds owns its dark
    // ground explicitly rather than relying on a layer behind the body.
    <div className="theme-dark relative flex min-h-screen flex-col bg-[#08080d]">
      <Background />
      <Nav />

      <main className="relative z-10 flex-1">
        {/* header */}
        <section className="mx-auto max-w-5xl px-5 pb-8 pt-36 sm:pt-44">
          <Reveal>
            <Link
              href="/"
              className="t-kicker text-[#8b93a7] transition-colors hover:text-white"
            >
              back to the short version
            </Link>
            <Logo className="mt-8 h-12 w-12 text-white" />
            <h1 className="t-display t-display-xl mt-5 text-white">
              Stats for <span className="gradient-text">nerds</span>
            </h1>
            <p className="t-body mt-6 max-w-2xl text-[#8b93a7]">
              The architecture, the measured numbers, and the parts still marked
              &ldquo;pending&rdquo;. This is the honest version.
            </p>
          </Reveal>
        </section>

        {/* stats strip */}
        <section className="mx-auto max-w-5xl px-5 py-8">
          <Reveal className="glass rounded-3xl p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <p className="gradient-text font-mono text-3xl font-medium tracking-tight sm:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">{s.label}</p>
                  <p className="mt-1 text-xs text-muted">{s.sub}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* pipeline */}
        <Section
          id="pipeline"
          label="Architecture"
          title="Two layers, moving at different speeds"
          blurb="A self-correction can't be detected until it happens — “8 pm” only becomes wrong once “no no make it 9 pm” arrives. So raw words stream continuously, and correction fires at pause boundaries."
        >
          <Pipeline />
        </Section>

        {/* latency */}
        <Section
          id="latency"
          label="Latency budget"
          title="Target vs. measured"
          blurb="Layer 1 is independent of the model, so the live feel is guaranteed. The correction pass is the number we're still driving down with compact edit-ops."
        >
          <Reveal className="glass overflow-hidden rounded-3xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    <th className="px-5 py-3.5 font-normal">Stage</th>
                    <th className="px-5 py-3.5 font-normal">Target</th>
                    <th className="px-5 py-3.5 font-normal">Actual</th>
                    <th className="px-5 py-3.5 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {LATENCY_ROWS.map(([stage, target, actual, status]) => (
                    <tr
                      key={stage}
                      className="border-b border-white/[0.05] last:border-0 transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3.5 text-white/90">{stage}</td>
                      <td className="px-5 py-3.5 font-mono text-xs text-muted">
                        {target}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs text-muted">
                        {actual}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className="rounded-md border px-2 py-0.5 font-mono text-[10px]"
                          style={{
                            color: status === "pending" ? "#8b93a7" : "#22e4f5",
                            borderColor:
                              status === "pending"
                                ? "rgba(139,147,167,0.3)"
                                : "rgba(34,228,245,0.3)",
                            background:
                              status === "pending"
                                ? "rgba(139,147,167,0.08)"
                                : "rgba(34,228,245,0.08)",
                          }}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Section>

        {/* adapters */}
        <Section
          id="adapters"
          label="Adapters"
          title="Vendor-agnostic, all the way down"
          blurb="Speech-to-text and correction are two separate interfaces. Pick a vendor for each — Deepgram for listening and Anthropic for cleanup is a perfectly normal setup. Adding a vendor is one file."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {ADAPTERS.map((a, i) => (
              <Reveal key={a.name} delay={(i % 2) * 100}>
                <article className="glass glass-hover h-full rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">{a.name}</h3>
                    <span
                      className="rounded-md border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]"
                      style={{
                        color: a.accent,
                        borderColor: `${a.accent}44`,
                        background: `${a.accent}12`,
                      }}
                    >
                      {a.tag}
                    </span>
                  </div>
                  <dl className="mt-4 space-y-2 border-t border-white/[0.07] pt-4 font-mono text-xs">
                    {[
                      ["STT", a.stt],
                      ["Correction", a.llm],
                      ["Wire format", a.wire],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4">
                        <dt className="text-muted">{k}</dt>
                        <dd className="text-right text-white/85">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{a.note}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={140}>
            <p className="mt-6 font-mono text-xs text-muted">
              STT_PROVIDER and CORRECTION_PROVIDER resolve through a small registry —
              mix and match freely, no core changes.
            </p>
          </Reveal>
        </Section>

        {/* security */}
        <Section
          id="security"
          label="Security"
          title="A gate, not a milestone"
          blurb="Every PR passes secret-scan, SAST and dependency audit from M0 onward. The assets we're protecting are your audio, your transcripts and your vendor keys."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {SECURITY.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 100}>
                <div className="glass glass-hover h-full rounded-2xl p-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#22e4f5] to-[#8b5cf6]" />
                    <div>
                      <p className="text-sm font-medium text-white">{s.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={140}>
            <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px]">
              {["packages/core", "apps/widget", "apps/backend", "docs/"].map((p) => (
                <span
                  key={p}
                  className="rounded-lg border border-white/[0.09] bg-white/[0.03] px-2.5 py-1 text-muted"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* roadmap */}
        <Section
          id="roadmap"
          label="Roadmap"
          title="M0 → M6"
          blurb="Every milestone ends in something you can run or demo. The two scariest unknowns — correction latency and macOS injection — are closed early, in M1 and M3."
        >
          <Roadmap />
        </Section>

        {/* cta */}
        <section className="mx-auto max-w-5xl px-5 pb-28 pt-8">
          <Reveal className="glass gradient-border rounded-3xl px-6 py-14 text-center sm:px-12">
            <h2 className="t-display t-display-md text-white">
              Read the whole thing yourself.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
              Interfaces, correction prompt, reconstructor and diff logic — all public,
              all MIT.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#22e4f5] to-[#8b5cf6] px-6 py-3.5 text-sm font-medium text-[#05060a] transition-transform duration-500 hover:scale-[1.03]"
              >
                <GitHubMark className="h-4 w-4" />
                View the repository
              </a>
              <Link
                href="/#demo"
                className="glass glass-hover rounded-xl px-6 py-3.5 text-sm font-medium text-white"
              >
                Back to the demo
              </Link>
            </div>
          </Reveal>
        </section>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
