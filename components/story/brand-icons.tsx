/**
 * Simplified brand marks, hand-inlined.
 * Used small, as UI decoration inside demo mockups, to make it read as
 * "this works inside the apps you already use" (nominative use).
 */

type IconProps = { className?: string };

export function GmailIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect x="1" y="4.5" width="22" height="15" rx="2.5" fill="#fff" />
      <path d="M1 7a2.5 2.5 0 0 1 4-2l7 5.2L19 5a2.5 2.5 0 0 1 4 2v.6l-11 8.2L1 7.6Z" fill="#EA4335" />
      <path d="M1 7a2.5 2.5 0 0 1 4-2l1.6 1.2V19H3a2 2 0 0 1-2-2Z" fill="#C5221F" />
      <path d="M23 7a2.5 2.5 0 0 0-4-2l-1.6 1.2V19H21a2 2 0 0 0 2-2Z" fill="#4285F4" />
      <rect
        x="1"
        y="4.5"
        width="22"
        height="15"
        rx="2.5"
        fill="none"
        stroke="rgba(0,0,0,0.08)"
      />
    </svg>
  );
}

export function SlackIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect x="9.9" y="1.5" width="4.2" height="11.5" rx="2.1" fill="#36C5F0" />
      <rect x="11" y="11" width="11.5" height="4.2" rx="2.1" fill="#2EB67D" />
      <rect x="9.9" y="11" width="4.2" height="11.5" rx="2.1" fill="#ECB22E" />
      <rect x="1.5" y="8.8" width="11.5" height="4.2" rx="2.1" fill="#E01E5A" />
    </svg>
  );
}

export function NotionIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="4"
        fill="#fff"
        stroke="rgba(0,0,0,0.18)"
      />
      <path
        d="M7.5 16.5V7.5l9 9v-9"
        fill="none"
        stroke="#0e0e11"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MessagesIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <defs>
        <linearGradient id="msg-g" x1="12" y1="1" x2="12" y2="23" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5BF675" />
          <stop offset="1" stopColor="#1FAF38" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="22" height="22" rx="5.5" fill="url(#msg-g)" />
      <path
        d="M12 6c-3.9 0-7 2.4-7 5.4 0 1.7 1 3.2 2.6 4.2-.2.8-.7 1.7-1.5 2.4 1.4-.2 2.7-.7 3.6-1.4.7.2 1.5.3 2.3.3 3.9 0 7-2.4 7-5.5S15.9 6 12 6Z"
        fill="#fff"
      />
    </svg>
  );
}

export function BrowserIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="#4b4b52" strokeWidth="1.6" />
      <ellipse cx="12" cy="12" rx="4.2" ry="10" fill="none" stroke="#4b4b52" strokeWidth="1.4" />
      <path d="M2.4 9h19.2M2.4 15h19.2" stroke="#4b4b52" strokeWidth="1.4" />
    </svg>
  );
}

export function DocsIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M5 2.5h8.5L19 8v13.5H5Z" fill="#4285F4" />
      <path d="M13.5 2.5 19 8h-5.5Z" fill="#A1C2FA" />
      <path d="M8 12h8M8 15h8M8 18h5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ============================================================
   THE WALL — simplified marks for the finale grid. Drawn at tile size
   (16–20px), so they are reduced to the one shape each brand is known by.
   ============================================================ */

/** shared rounded-square plate */
function Plate({ fill }: { fill: string }) {
  return <rect x="1" y="1" width="22" height="22" rx="5.5" fill={fill} />;
}

export function ChatGPTIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <Plate fill="#0D0D0D" />
      <path
        d="M12 5.4 17.6 8.6v6.8L12 18.6 6.4 15.4V8.6L12 5.4Z"
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 5.4v6.7l5.6 3.3M12 12.1 6.4 15.4" fill="none" stroke="#fff" strokeWidth="1.5" />
    </svg>
  );
}

export function ClaudeIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <Plate fill="#D97757" />
      <g stroke="#fff" strokeWidth="1.7" strokeLinecap="round">
        <path d="M12 6.2v11.6M6.9 9.1l10.2 5.8M17.1 9.1 6.9 14.9" />
      </g>
    </svg>
  );
}

export function XIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <Plate fill="#000" />
      <path
        d="M7.4 6.6h2.9l3 4.1 3.4-4.1h1.5l-4.2 5 4.5 6.1h-2.9l-3.2-4.4-3.6 4.4H7.3l4.4-5.3L7.4 6.6Z"
        fill="#fff"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <defs>
        <linearGradient id="ig-g" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset="0.4" stopColor="#FA7E1E" />
          <stop offset="0.7" stopColor="#D62976" />
          <stop offset="1" stopColor="#962FBF" />
        </linearGradient>
      </defs>
      <Plate fill="url(#ig-g)" />
      <rect x="6" y="6" width="12" height="12" rx="3.6" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.9" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="16.4" cy="7.7" r="1" fill="#fff" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <Plate fill="#25D366" />
      <path
        d="M12 5.4a6.5 6.5 0 0 0-5.6 9.8L5.6 18.6l3.5-.8A6.5 6.5 0 1 0 12 5.4Zm3.4 8.9c-.2.5-1 .9-1.4.9-.9.1-1.9-.6-3-1.6a7.4 7.4 0 0 1-1.7-2.4c-.2-.7 0-1.4.4-1.8.2-.2.5-.2.7-.1l.6 1.2c.1.2 0 .4-.1.5l-.3.4c.4.8 1.1 1.5 2 1.9l.4-.4c.2-.2.4-.2.6-.1l1.2.6c.2.1.2.6.1.9Z"
        fill="#fff"
      />
    </svg>
  );
}

export function LinearIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <Plate fill="#5E6AD2" />
      <g stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M6.4 13.2 10.8 17.6M6.4 9.6l8 8M8.2 6.6l9.2 9.2" />
      </g>
    </svg>
  );
}

export function FigmaIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <Plate fill="#fff" />
      <rect x="1" y="1" width="22" height="22" rx="5.5" fill="none" stroke="rgba(0,0,0,0.14)" />
      <path d="M12 4.5H9.4a2.6 2.6 0 0 0 0 5.2H12V4.5Z" fill="#F24E1E" />
      <path d="M12 4.5h2.6a2.6 2.6 0 0 1 0 5.2H12V4.5Z" fill="#FF7262" />
      <path d="M12 9.7H9.4a2.6 2.6 0 0 0 0 5.2H12V9.7Z" fill="#A259FF" />
      <path d="M12 14.9H9.4a2.6 2.6 0 1 0 2.6 2.6v-2.6Z" fill="#0ACF83" />
      <circle cx="14.6" cy="12.3" r="2.6" fill="#1ABCFE" />
    </svg>
  );
}

export function VSCodeIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <Plate fill="#0F6CBD" />
      <path d="M17 5.2 9.4 12 17 18.8V5.2Z" fill="#fff" opacity="0.95" />
      <path d="M6.6 9.3 8.4 8l6.2 5.4-1.9 1.4-6.1-5.5Z" fill="#fff" opacity="0.6" />
    </svg>
  );
}

export function DiscordIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <Plate fill="#5865F2" />
      <path
        d="M16.6 7.6a10 10 0 0 0-2.6-.8l-.3.7a8 8 0 0 0-3.4 0l-.3-.7a10 10 0 0 0-2.6.8C5.6 10.3 5.2 12.9 5.4 15.5a10.7 10.7 0 0 0 3.3 1.7l.7-1.1-1.1-.6.3-.2a7.3 7.3 0 0 0 6.8 0l.3.2-1.1.6.7 1.1a10.7 10.7 0 0 0 3.3-1.7c.2-3-.4-5.5-2-7.9ZM9.8 14a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Zm4.4 0a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6Z"
        fill="#fff"
      />
    </svg>
  );
}

export function TelegramIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <circle cx="12" cy="12" r="11" fill="#2AABEE" />
      <path d="m6.2 12.1 11-4.3-1.9 9.6-3.3-2.5-1.7 1.6-.3-2.9 5-4.4-6.2 3.6-2.6-.7Z" fill="#fff" />
    </svg>
  );
}

export function SpotifyIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <circle cx="12" cy="12" r="11" fill="#1DB954" />
      <g stroke="#000" strokeLinecap="round" fill="none">
        <path d="M7 9.4c3.2-1 6.9-.7 9.7 1" strokeWidth="1.9" />
        <path d="M7.6 12.4c2.6-.8 5.6-.5 7.9.8" strokeWidth="1.6" />
        <path d="M8.2 15.2c2-.6 4.3-.4 6.1.7" strokeWidth="1.3" />
      </g>
    </svg>
  );
}

export function LinkedInIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <Plate fill="#0A66C2" />
      <circle cx="7.6" cy="7.6" r="1.5" fill="#fff" />
      <path d="M6.3 10.2h2.6v7.5H6.3v-7.5Zm4.2 0h2.5v1c.5-.8 1.4-1.2 2.4-1.2 1.9 0 2.9 1.2 2.9 3.4v4.3h-2.6v-3.9c0-1-.4-1.6-1.3-1.6s-1.4.6-1.4 1.6v3.9h-2.5v-7.5Z" fill="#fff" />
    </svg>
  );
}

export function TerminalIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <Plate fill="#1B1B20" />
      <g stroke="#4ADE80" strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path d="M6.8 8.8 10 12l-3.2 3.2M12.4 15.4h5" />
      </g>
    </svg>
  );
}

export function ZoomIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <Plate fill="#2D8CFF" />
      <path d="M6.4 9.2h6.4a1 1 0 0 1 1 1v4.6a1 1 0 0 1-1 1H6.4a1 1 0 0 1-1-1v-4.6a1 1 0 0 1 1-1Zm8.4 2.6 3.8-2.4v6.2l-3.8-2.4v-1.4Z" fill="#fff" />
    </svg>
  );
}

export function CalendarIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <Plate fill="#fff" />
      <path d="M1 6.5A5.5 5.5 0 0 1 6.5 1h11A5.5 5.5 0 0 1 23 6.5V8H1V6.5Z" fill="#EA4335" />
      <rect x="1" y="1" width="22" height="22" rx="5.5" fill="none" stroke="rgba(0,0,0,0.14)" />
      <text
        x="12"
        y="18.4"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="9"
        fill="#3c4043"
      >
        17
      </text>
    </svg>
  );
}

export function DriveIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M9.2 3h5.6l6.4 11h-5.6L9.2 3Z" fill="#FFCF63" />
      <path d="M2.8 14 9.2 3l2.8 4.9L8.4 14H2.8Z" fill="#11A861" />
      <path d="M2.8 14h18.4l-2.8 5H5.6l-2.8-5Z" fill="#4285F4" />
    </svg>
  );
}

export function RedditIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <circle cx="12" cy="12" r="11" fill="#FF4500" />
      <ellipse cx="12" cy="13.4" rx="6.2" ry="4.4" fill="#fff" />
      <circle cx="9.6" cy="12.8" r="1" fill="#FF4500" />
      <circle cx="14.4" cy="12.8" r="1" fill="#FF4500" />
      <path d="M9.7 15.5c1.4.9 3.2.9 4.6 0" stroke="#FF4500" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <circle cx="18.4" cy="8" r="1.6" fill="#fff" />
    </svg>
  );
}

export function DropboxIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <Plate fill="#0061FF" />
      <path
        d="M8.6 6.2 5 8.6l3.6 2.4L12 8.6 8.6 6.2Zm6.8 0L12 8.6l3.4 2.4L19 8.6l-3.6-2.4ZM5 13.4l3.6 2.4L12 13.4 8.6 11 5 13.4Zm10.4-2.4L12 13.4l3.4 2.4L19 13.4 15.4 11Zm-3.4 5.6-3.4 2.3 3.4 2 3.4-2-3.4-2.3Z"
        fill="#fff"
      />
    </svg>
  );
}

export function JustCallIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <Plate fill="#0BA96F" />
      <path
        d="M8.1 6.5c.5-.5 1.4-.5 1.8.2l1 1.6c.3.5.2 1.2-.2 1.6l-.7.7c.5 1.1 1.5 2.1 2.6 2.6l.7-.7c.4-.4 1.1-.5 1.6-.2l1.6 1c.7.4.8 1.3.2 1.8l-.8.8c-.6.6-1.4.8-2.2.6-1.6-.4-3.2-1.3-4.5-2.6-1.3-1.3-2.2-2.9-2.6-4.5-.2-.8 0-1.6.6-2.2l.9-.7Z"
        fill="#fff"
      />
    </svg>
  );
}
