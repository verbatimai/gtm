"use client";

/** Vertical waveform bars. `count` bars, centred, ready to be scrubbed. */
export function Waveform({
  count = 48,
  className = "",
  barClassName = "",
}: {
  count?: number;
  className?: string;
  barClassName?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-[3px] ${className}`}
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => {
        // deterministic envelope so SSR and client agree
        const env = Math.sin((i / count) * Math.PI);
        const h = 0.22 + env * (0.5 + 0.5 * Math.sin(i * 2.3));
        return (
          <span
            key={i}
            data-bar
            className={`accent-bar w-[3px] rounded-full ${barClassName}`}
            // toFixed: raw float precision differed between SSR and client,
            // which tripped a hydration attribute mismatch
            style={{ height: `${(Math.max(0.12, h) * 100).toFixed(2)}%` }}
          />
        );
      })}
    </div>
  );
}

export function MicIndicator({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 ${className}`}
    >
      <span className="accent-bar h-2 w-2 rounded-full" />
      <span className="flex items-end gap-[2px]" aria-hidden>
        {[0.4, 0.9, 0.6, 1, 0.5].map((h, i) => (
          <span
            key={i}
            data-mic-bar
            className="accent-bar w-[2px] rounded-full"
            style={{ height: `${h * 14}px` }}
          />
        ))}
      </span>
    </span>
  );
}

export function TextLines({
  widths,
  className = "",
}: {
  widths: number[];
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`} aria-hidden>
      {widths.map((w, i) => (
        <span
          key={i}
          className="block h-[6px] rounded-full bg-black/[0.07]"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  );
}
