import { SlackIcon } from "./story/brand-icons";

/**
 * A realistic desktop still: Slack, Notes and Cursor open on a purple
 * macOS desktop, the Verbatim widget pill floating on top, dock below.
 * Built to read as a screenshot, not a diagram — dense chrome, real
 * timestamps, syntax-coloured code skeleton.
 */

/* deterministic syntax-skeleton rows: [indent, [width, color][]] */
const CODE: [number, [number, string][]][] = [
  [1, [[38, "#c678a9"], [22, "#e5c07b"], [30, "#56b6c2"]]],
  [1, [[52, "#5c5c6a"], [40, "#5c5c6a"]]],
  [2, [[26, "#e88fb1"], [44, "#5c5c6a"]]],
  [1, [[34, "#56b6c2"]]],
  [2, [[48, "#5c5c6a"], [20, "#e5c07b"]]],
  [2, [[30, "#e5c07b"], [36, "#5c5c6a"], [24, "#5c5c6a"]]],
  [1, [[42, "#c678a9"], [18, "#56b6c2"]]],
  [2, [[56, "#5c5c6a"]]],
  [2, [[24, "#e88fb1"], [32, "#5c5c6a"]]],
  [1, [[20, "#5c5c6a"]]],
  [2, [[28, "#c678a9"], [22, "#e5c07b"]]],
  [1, [[46, "#e5c07b"], [30, "#5c5c6a"], [26, "#5c5c6a"]]],
  [2, [[38, "#e5c07b"], [44, "#5c5c6a"], [18, "#5c5c6a"]]],
  [1, [[50, "#e5c07b"], [24, "#c678a9"]]],
  [2, [[36, "#e5c07b"], [28, "#5c5c6a"]]],
];

function Lights({ dim = false }: { dim?: boolean }) {
  return (
    <span className="flex items-center gap-[5px]">
      {(dim ? ["#565660", "#565660", "#565660"] : ["#ff5f57", "#febc2e", "#28c840"]).map(
        (c, i) => (
          <span key={i} className="h-[10px] w-[10px] rounded-full" style={{ background: c }} />
        ),
      )}
    </span>
  );
}

export default function DesktopShot() {
  return (
    <section className="px-5 py-24">
      <div
        className="relative mx-auto aspect-[3/2] w-full max-w-5xl overflow-hidden rounded-[28px] text-left shadow-[0_60px_140px_-50px_rgba(10,4,30,0.9)]"
        style={{
          background:
            "radial-gradient(90% 70% at 12% 96%, #9b7fd4 0%, transparent 55%), radial-gradient(80% 60% at 88% 100%, #6c4bb0 0%, transparent 60%), linear-gradient(175deg, #170a2b 0%, #2d1650 55%, #4c2b84 100%)",
          fontFamily: "var(--font-geist-sans), -apple-system, sans-serif",
        }}
      >
        {/* ---------- the Verbatim widget, floating on top ---------- */}
        <div className="absolute left-1/2 top-[4.5%] z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#0b0b10] px-4 py-2 shadow-[0_10px_30px_rgba(0,0,10,0.5)] ring-1 ring-white/15">
          <span className="flex items-center gap-[2.5px]" aria-hidden>
            {[0.5, 0.95, 0.65, 1, 0.7, 0.45].map((h, i) => (
              <span
                key={i}
                className="cue-bar accent-bar rounded-full"
                style={{
                  width: 2.5,
                  height: `${(h * 13).toFixed(1)}px`,
                  animationDelay: `${(-i * 0.14).toFixed(2)}s`,
                }}
              />
            ))}
          </span>
          <span className="flex flex-col gap-[2.5px]" aria-hidden>
            {[9, 9, 6].map((w, i) => (
              <span
                key={i}
                className="rounded-full bg-white"
                style={{ width: w, height: 2, opacity: i === 2 ? 0.5 : 0.9 }}
              />
            ))}
          </span>
        </div>

        {/* ---------- Slack ---------- */}
        <div className="absolute left-[5%] top-[10%] z-10 w-[46%] overflow-hidden rounded-xl bg-white shadow-[0_30px_70px_rgba(10,4,30,0.55)]">
          <div className="flex items-center gap-3 bg-[#3F0E40] px-3 py-2">
            <Lights />
            <div className="ml-4 flex h-5 flex-1 items-center gap-1.5 rounded bg-white/20 px-2 text-[9px] text-white/80">
              🔍 Search Slack
            </div>
          </div>
          <div className="flex h-[240px]">
            {/* rail */}
            <div className="flex w-10 flex-col items-center gap-3 bg-[#3F0E40] pt-3">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-white/90">
                <SlackIcon className="h-4 w-4" />
              </span>
              {["Home", "DMs", "Activity"].map((t) => (
                <span key={t} className="text-center text-[6.5px] leading-tight text-white/75">
                  ⌂<br />{t}
                </span>
              ))}
              <span className="mt-auto mb-2 h-6 w-6 rounded bg-[#e8912d]" />
            </div>
            {/* channels */}
            <div className="w-[34%] bg-[#5b2c5d]/95 px-2.5 pt-2.5 text-[9.5px] text-white/85">
              <p className="mb-2 text-[11px] font-bold text-white">Slack ▾</p>
              <p className="py-0.5">≡ Unreads</p>
              <p className="py-0.5">▷ Drafts and sent</p>
              <p className="mt-2 text-white/60">Channels</p>
              <p className="py-0.5"># announcements</p>
              <p className="rounded bg-[#8253a8] px-1 py-0.5 font-semibold text-white"># standup</p>
              <p className="mt-2 text-white/60">Direct messages</p>
              <p className="flex justify-between py-0.5">
                <span>🟢 Lisa</span>
                <span className="rounded-full bg-[#c94f6d] px-1 text-[8px]">1</span>
              </p>
              <p className="flex justify-between py-0.5">
                <span>🟢 Dario</span>
                <span className="rounded-full bg-[#c94f6d] px-1 text-[8px]">2</span>
              </p>
            </div>
            {/* thread */}
            <div className="flex min-w-0 flex-1 flex-col bg-white">
              <div className="border-b border-black/10 px-3 py-1.5 text-[10.5px] font-bold text-[#1d1c1d]">
                #standup ▾
              </div>
              <div className="min-w-0 flex-1 space-y-2 px-3 py-2">
                <p className="text-center text-[10px] font-bold text-[#1d1c1d]">
                  👋 Welcome to the #standup channel
                </p>
                <p className="text-center text-[8.5px] leading-snug text-[#616061]">
                  This channel is for everything #standup. Hold meetings, share
                  docs, and make decisions with your team.
                </p>
                <div className="flex gap-1.5">
                  <span className="h-5 w-5 shrink-0 rounded bg-[#e0a1b8]" />
                  <div className="min-w-0">
                    <p className="text-[8.5px] font-bold text-[#1d1c1d]">
                      Lisa <span className="font-normal text-[#616061]">10:00 AM</span>
                    </p>
                    <p className="text-[8.5px] text-[#1d1c1d]">
                      Morning team, any updates for the week?
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <span className="h-5 w-5 shrink-0 rounded bg-[#4A9E8F]" />
                  <div className="min-w-0">
                    <p className="text-[8.5px] font-bold text-[#1d1c1d]">
                      You <span className="font-normal text-[#616061]">5:53 PM</span>
                    </p>
                    <p className="text-[8.5px] text-[#1d1c1d]">
                      Just finished up the design review — everything is
                      looking good. Can we get sign-off from Dario?
                    </p>
                  </div>
                </div>
              </div>
              <div className="mx-2.5 mb-2 rounded-md border border-black/15 px-2 py-1 text-[8.5px] text-[#8d8d8d]">
                Message #standup
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Notes ---------- */}
        <div className="absolute right-[6%] top-[13%] z-[5] w-[38%] overflow-hidden rounded-xl bg-[#f7f5ef] shadow-[0_30px_70px_rgba(10,4,30,0.5)]">
          <div className="flex items-center gap-3 border-b border-black/10 bg-[#ece9e0] px-3 py-2">
            <Lights dim />
          </div>
          <div className="flex h-[170px] text-[#3a3a38]">
            <div className="w-[38%] border-r border-black/10 px-2 pt-1.5">
              <p className="text-[8px] font-semibold text-[#8a887f]">Today</p>
              <div className="mt-1 rounded-md bg-[#ffe484] px-2 py-1.5">
                <p className="text-[9px] font-bold">Today&rsquo;s to-do list:</p>
                <p className="text-[7.5px] text-[#8a887f]">
                  5:52 PM · Review pull…
                </p>
              </div>
              <div className="mt-1 px-2 py-1.5">
                <p className="text-[9px] font-semibold">Dream where I fo…</p>
              </div>
            </div>
            <div className="flex-1 px-3 pt-1.5">
              <p className="text-center text-[7.5px] text-[#8a887f]">
                August 14, 2026 at 5:52 PM
              </p>
              <p className="mt-1 text-[9.5px] font-bold">Today&rsquo;s to-do list:</p>
              <ul className="mt-0.5 space-y-0.5 text-[8.5px]">
                <li>• Review pull requests</li>
                <li>• Finish API documentation</li>
                <li>• Call with design team at 3</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ---------- Cursor ---------- */}
        <div className="absolute left-[34%] top-[30%] z-20 w-[52%] overflow-hidden rounded-xl bg-[#17171d] shadow-[0_40px_90px_rgba(0,0,10,0.65)] ring-1 ring-white/10">
          <div className="flex items-center justify-between px-3 py-2">
            <Lights />
            <span className="flex gap-2 text-[10px] text-white/40">▯ ▤ ◨ ⚙</span>
          </div>
          <div className="flex border-b border-white/10 px-2">
            <span className="flex items-center gap-1.5 rounded-t-md bg-white/[0.07] px-3 py-1.5 text-[9px] text-white/85">
              <span className="h-2 w-2 rounded-full bg-[#e06c50]" /> mod.rs
            </span>
          </div>
          <div className="flex h-[230px]">
            {/* code */}
            <div className="min-w-0 flex-1 border-r border-white/10 px-2 pt-1.5">
              <p className="px-1 pb-1 text-[8px] text-white/35">
                src › listeners › mod.rs
              </p>
              <div className="space-y-[5px]">
                {CODE.map(([indent, segs], i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="w-4 text-right font-mono text-[7px] text-white/25">
                      {45 + i}
                    </span>
                    <span style={{ width: indent * 10 }} />
                    {segs.map(([w, c], j) => (
                      <span
                        key={j}
                        className="h-[4px] rounded-full"
                        style={{ width: w, background: c, opacity: 0.8 }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* agent panel */}
            <div className="w-[42%] px-2.5 pt-2">
              <div className="flex items-center gap-1 text-[8px] text-white/45">
                <span className="rounded border border-white/15 px-1">+</span>
                <span className="rounded-full border border-white/15 px-1.5 py-0.5">
                  ◉ <b className="text-white/70">mod.rs</b> Current File
                </span>
              </div>
              <p className="mt-2 text-[9.5px] leading-relaxed text-white/85">
                How could I make it easier to switch certificates in the
                transport listeners?
                <span className="caret caret-blink ml-0.5 h-[1em] align-[-0.12em]" style={{ background: "#e6e9f2" }} />
              </p>
              <p className="mt-3 flex items-center justify-between text-[7.5px] text-white/35">
                <span>∧ claude-4.5-opus</span>
                <span>⏎ chat · ⌘⏎ codebase ∧</span>
              </p>
            </div>
          </div>
        </div>

        {/* ---------- dock ---------- */}
        <div className="absolute bottom-[4%] left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5 rounded-2xl bg-[#0d0d13]/85 px-3 py-2 ring-1 ring-white/12 backdrop-blur">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#16161f] ring-1 ring-white/10">
            <span className="flex items-center gap-[2.5px]" aria-hidden>
              {[9, 15, 11].map((h, i) => (
                <span key={i} className="accent-bar w-[3px] rounded-full" style={{ height: h }} />
              ))}
            </span>
          </span>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
            <SlackIcon className="h-6 w-6" />
          </span>
          <span className="flex h-11 w-11 flex-col items-center justify-center overflow-hidden rounded-xl bg-white">
            <span className="h-3 w-full bg-[#ffe484]" />
            <span className="flex flex-1 w-full flex-col items-center justify-center gap-[2px] bg-white">
              {[14, 10].map((w, i) => (
                <span key={i} className="h-[2px] rounded-full bg-[#c9c6ba]" style={{ width: w }} />
              ))}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
