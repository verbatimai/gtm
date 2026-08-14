# site-v2 — implementation map

`../site` is the untouched previous version. This copy extends it per the
product-story spec. Dev: `npm run dev` → port **3002** (old site: 3001).

## Preserved (protected)
- `components/story/scene.tsx` — scroll engine (one fix: a stage now hides at
  handoff only when the NEXT sibling is also a scene).
- `components/story/Opening.tsx` → `CleanupScene` — the strike/fade correction
  animation. Now Act 3 with the "Say it messy." headline.
- `components/story/AppDeck.tsx` — the multi-app typing sequence. Now Act 4:
  headline "Wherever the cursor is." lands BELOW the artwork; floating-orb
  cameo added; ends in the loose fan again (no morph — the next section is
  static).
- `Backdrop` (dark-mode only now), `WaveRibbon`, `Finale` wall (CTA re-copy),
  `FeatureGrid` (claims corrected to product truth), `LiveDemo` (moved to
  /demo as Demo 1).

## Replaced
- `OpeningScene` (voice→letters) → `story/LiveTranscript.tsx`: stable text +
  dim volatile tail + a visible self-correction; ends on the exact card the
  cleanup act opens with.
- `SpeakToEdit` removed from the flow — voice commands are NOT shipped; they
  appear in Act 8 as **Planned**.

## Added
- Acts: `FormatModes.tsx` (Prose/Message/Code/Raw), `Providers.tsx`
  (interactive speech × correction picker, BYOK/keychain trust),
  `SettingsTour.tsx` (settings window with live hotkey recorder),
  `ComingNext.tsx` (Experimental/Planned/Exploring/Coming).
- Theme system: `ThemeToggle.tsx`, `html[data-theme="light"]` tokens, FOUC
  guard in `layout.tsx`. Light/dark share every coordinate.
- `/demo`: LiveDemo playback + browser-rules formatter + app-injection picker.

## Asset slots (drop-in, no code changes)
- `public/hero/face.png` — enters from the left edge.
- `public/hero/laptop.png` — enters from the right edge.
  Until present, soft hazy CSS stand-ins hold the exact same boxes.

## Honesty constraints encoded
- No on-device/"never uploaded" claims — BYOK cloud providers.
- PyAI = default, English-only STT; Deepgram/OpenAI for other languages.
- Keys → macOS Keychain only. Telemetry: metadata-only, opt-in, no content.
- Meetings/commands/draft/wake-word/Windows all labelled, never "available".
