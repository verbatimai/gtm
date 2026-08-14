/**
 * Canned demo data for the Verbatim LiveDemo component.
 *
 * This file is intentionally the ONLY place demo content lives, so that real
 * recorded sessions (transcript + LLM edit ops) can be dropped in later without
 * touching the component. Keep the shapes below stable.
 */

/** Why the correction pass removed a span of raw speech. */
export type RemovalReason =
  | "filler"
  | "self_correction"
  | "repetition"
  | "false_start"
  | "grammar";

/** A single recognized word as emitted by the streaming ASR. */
export interface DemoWord {
  /** Verbatim token, no surrounding whitespace. */
  text: string;
  /** Milliseconds from utterance start at which this word became visible. */
  t: number;
}

/**
 * One contiguous span of the raw transcript, tagged with what the correction
 * pass decided to do with it. Segments MUST be ordered and MUST tile the whole
 * `words` array with no gaps or overlaps: segment[n].end === segment[n+1].start.
 */
export type DemoOp =
  | {
      kind: "keep";
      /** Inclusive index into `words`. */
      start: number;
      /** Exclusive index into `words`. */
      end: number;
    }
  | {
      kind: "remove";
      start: number;
      end: number;
      reason: RemovalReason;
    }
  | {
      kind: "replace";
      start: number;
      end: number;
      reason: RemovalReason;
      /** Text that takes the place of words[start..end). */
      replacement: string;
    };

export interface DemoScript {
  id: string;
  /** Short tab label. */
  label: string;
  /** One-line description of the correction types showcased. */
  blurb: string;
  /** Where the polished text gets injected — used for the mock target field. */
  target: {
    app: string;
    /** e.g. "To: team@acme.com" */
    context: string;
    placeholder: string;
  };
  words: DemoWord[];
  ops: DemoOp[];
}

export const REASON_LABELS: Record<RemovalReason, string> = {
  filler: "filler",
  self_correction: "self-correction",
  repetition: "repetition",
  false_start: "false start",
  grammar: "grammar",
};

/** Tailwind classes per reason: [text, bg, border, decoration]. */
export const REASON_STYLES: Record<
  RemovalReason,
  { chip: string; mark: string }
> = {
  filler: {
    chip: "text-amber-200/90 bg-amber-400/10 border-amber-300/30",
    mark: "decoration-amber-300/80",
  },
  self_correction: {
    chip: "text-violet-200/90 bg-violet-400/10 border-violet-300/30",
    mark: "decoration-violet-300/80",
  },
  repetition: {
    chip: "text-cyan-200/90 bg-cyan-400/10 border-cyan-300/30",
    mark: "decoration-cyan-300/80",
  },
  false_start: {
    chip: "text-rose-200/90 bg-rose-400/10 border-rose-300/30",
    mark: "decoration-rose-300/80",
  },
  grammar: {
    chip: "text-emerald-200/90 bg-emerald-400/10 border-emerald-300/30",
    mark: "decoration-emerald-300/80",
  },
};

/** Helper so hand-authored scripts don't need per-word timestamps by hand. */
function words(spec: string, msPerWord = 110): DemoWord[] {
  let t = 0;
  return spec.split(/\s+/).map((text) => {
    // A little jitter makes playback feel human rather than metronomic.
    const step = msPerWord + ((text.length * 37) % 60) - 25;
    t += step;
    return { text, t };
  });
}

export const DEMO_SCRIPTS: DemoScript[] = [
  {
    id: "meeting",
    label: "Scheduling",
    blurb: "Fillers, a mid-sentence self-correction, and a stutter repeat.",
    target: {
      app: "Mail — Compose",
      context: "To: team@acme.com",
      placeholder: "Write your message…",
    },
    // 0      1    2         3 4       5  6 7  8 9  10   11 12 13 14  15 16  17  18     19 20 21  22
    // Let's umm schedule a meeting at 8 pm no no make it 9 pm and umm send the the invite to the team
    words: words(
      "Let's umm schedule a meeting at 8 pm no no make it 9 pm and umm send the the invite to the team",
    ),
    ops: [
      { kind: "keep", start: 0, end: 1 },
      { kind: "remove", start: 1, end: 2, reason: "filler" },
      { kind: "keep", start: 2, end: 6 },
      { kind: "remove", start: 6, end: 12, reason: "self_correction" },
      { kind: "keep", start: 12, end: 15 },
      { kind: "remove", start: 15, end: 16, reason: "filler" },
      { kind: "keep", start: 16, end: 18 },
      { kind: "remove", start: 18, end: 19, reason: "repetition" },
      { kind: "keep", start: 19, end: 23 },
    ],
  },
  {
    id: "standup",
    label: "Standup note",
    blurb: "A false start, a dropped filler, and a grammar fix.",
    target: {
      app: "Slack — #eng-standup",
      context: "Posting as you",
      placeholder: "Message #eng-standup",
    },
    // 0  1   2      3   4  5   6  7        8   9      10  11 12   13   14  15   16 17   18  19    20
    // I was gonna I mean yesterday I finished the caching layer and uh it dont break under load so we shipped
    words: words(
      "I was gonna I mean yesterday I finished the caching layer and uh it dont break under load so we shipped",
    ),
    ops: [
      { kind: "remove", start: 0, end: 5, reason: "false_start" },
      { kind: "keep", start: 5, end: 12 },
      { kind: "remove", start: 12, end: 13, reason: "filler" },
      { kind: "keep", start: 13, end: 14 },
      {
        kind: "replace",
        start: 14,
        end: 15,
        reason: "grammar",
        replacement: "doesn't",
      },
      { kind: "keep", start: 15, end: 21 },
    ],
  },
  {
    id: "bugreport",
    label: "Bug report",
    blurb: "Two self-corrections plus a repeated phrase.",
    target: {
      app: "Linear — New issue",
      context: "Team: Platform",
      placeholder: "Describe the bug…",
    },
    // 0   1     2   3    4   5   6      7  8  9   10  11  12  13   14  15  16   17  18   19  20 21     22    23   24
    // The upload fails on Safari sorry not Safari on Firefox when the file is is larger than 20 no 200 megabytes every single time
    words: words(
      "The upload fails on Safari sorry not Safari on Firefox when the file is is larger than 20 no 200 megabytes every single time",
    ),
    ops: [
      { kind: "keep", start: 0, end: 4 },
      { kind: "remove", start: 4, end: 8, reason: "self_correction" },
      { kind: "keep", start: 8, end: 14 },
      { kind: "remove", start: 14, end: 15, reason: "repetition" },
      { kind: "keep", start: 15, end: 17 },
      { kind: "remove", start: 17, end: 19, reason: "self_correction" },
      { kind: "keep", start: 19, end: 24 },
    ],
  },
];

/** The polished string the correction pass commits for a script. */
export function cleanTextFor(script: DemoScript): string {
  const out: string[] = [];
  for (const op of script.ops) {
    if (op.kind === "keep") {
      out.push(...script.words.slice(op.start, op.end).map((w) => w.text));
    } else if (op.kind === "replace") {
      out.push(op.replacement);
    }
  }
  let text = out.join(" ");
  text = text.charAt(0).toUpperCase() + text.slice(1);
  if (!/[.!?]$/.test(text)) text += ".";
  return text;
}
