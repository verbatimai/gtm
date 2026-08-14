/**
 * Verbatim brand mark — logo concept 1 ("waveform → text").
 * Inlined without the dark tile so it sits directly on the glassy nav.
 */
export default function Logo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="8 12 50 40"
      className={className}
      role="img"
      aria-label="Verbatim"
    >
      <defs>
        <linearGradient id="vbg" x1="9" y1="46" x2="34" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <g fill="none" strokeWidth="5" strokeLinecap="round">
        <g stroke="url(#vbg)">
          <path d="M11 23V41" />
          <path d="M21 16V48" />
          <path d="M31 20V44" />
        </g>
        <g stroke="currentColor">
          <path d="M40 22H54" />
          <path d="M40 32H54" />
          <path d="M40 42H48" strokeOpacity="0.55" />
        </g>
      </g>
    </svg>
  );
}
