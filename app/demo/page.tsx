import type { Metadata } from "next";

import DemoFormatter from "@/components/DemoFormatter";
import DemoInjection from "@/components/DemoInjection";
import Footer from "@/components/Footer";
import LiveDemo from "@/components/LiveDemo";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Verbatim — playground",
  description:
    "Try the pipeline: live streaming transcription with visible corrections, the formatter, and app injection.",
};

/**
 * /demo — an interactive playground, not a second homepage.
 * 1. Live transcription: sample sessions with synced transcript, volatile
 *    tail, correction pass and final text (simulated playback of recorded
 *    sessions — real recordings drop into demo-data.ts).
 * 2. Formatter: paste a messy transcript, preview modes (browser-side rules).
 * 3. App injection: the same dictation resolving into Slack, Gmail, Notion.
 */
export default function DemoPage() {
  return (
    <>
      <Nav />
      <main className="flex-1 px-5 pb-24 pt-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 flex flex-col items-center text-center">
            <p className="t-kicker">playground</p>
            <h1 className="t-display t-display-lg mt-5">Try the pipeline.</h1>
            <p className="t-body mt-4 max-w-md">
              The same streaming, correction and injection behaviour the app
              ships with — demonstrated right here.
            </p>
          </div>

          {/* 1 — live transcription */}
          <section className="mb-20">
            <div className="mb-6">
              <p className="t-kicker">demo 1</p>
              <h2 className="t-display t-display-md mt-3">
                Live transcription
              </h2>
              <p className="t-body-sm mt-2 max-w-lg">
                Pick a sample session. Watch the stable transcript, the
                volatile tail, the visible corrections and the final text —
                simulated playback of a recorded session.
              </p>
            </div>
            <div className="theme-dark overflow-hidden rounded-2xl border border-white/10 bg-[#05060b] p-4 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.95)] sm:p-8">
              <LiveDemo />
            </div>
          </section>

          {/* 2 — formatter */}
          <section className="mb-20">
            <div className="mb-6">
              <p className="t-kicker">demo 2</p>
              <h2 className="t-display t-display-md mt-3">The formatter</h2>
              <p className="t-body-sm mt-2 max-w-lg">
                Type or paste a messy transcript and preview the formatting
                modes. This runs on simple sample rules in your browser — the
                app uses your chosen correction model.
              </p>
            </div>
            <DemoFormatter />
          </section>

          {/* 3 — app injection */}
          <section>
            <div className="mb-6">
              <p className="t-kicker">demo 3</p>
              <h2 className="t-display t-display-md mt-3">App injection</h2>
              <p className="t-body-sm mt-2 max-w-lg">
                The same dictation, landing wherever the cursor is. A browser
                demonstration of the desktop behaviour.
              </p>
            </div>
            <DemoInjection />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
