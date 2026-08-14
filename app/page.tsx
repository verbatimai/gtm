import ComingNext from "@/components/ComingNext";
import DesktopShot from "@/components/DesktopShot";
import FeatureGrid from "@/components/FeatureGrid";
import Footer from "@/components/Footer";
import FormatModes from "@/components/FormatModes";
import Nav from "@/components/Nav";
import Providers from "@/components/Providers";
import SettingsTour from "@/components/SettingsTour";
import { AppDeckScene } from "@/components/story/AppDeck";
import Backdrop from "@/components/story/Backdrop";
import { FinaleScene } from "@/components/story/Finale";
import Hero from "@/components/story/Hero";
import { LiveTranscriptScene } from "@/components/story/LiveTranscript";
import { CleanupScene } from "@/components/story/Opening";
import WaveRibbon from "@/components/story/WaveRibbon";

/**
 * One continuous scroll story:
 *   SPEAK            — hero: face + laptop part, the atmosphere stays
 *   SEE IT UNDERSTAND— live transcript: stable text + volatile tail
 *   SEE IT CORRECT   — the protected strike/fade cleanup pass
 *   PUT IT ANYWHERE  — the protected multi-app deck + the orb
 *   CONTROL HOW IT WRITES — formatting modes
 *   CHOOSE THE MODELS— provider mixer, BYOK
 *   OWN THE STACK    — settings tour, feature wall, honest roadmap
 *   …then the wall of apps and the closing CTA.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <Backdrop />
      <WaveRibbon />

      <main className="flex-1">
        {/* the cinematic run — adjacent Scenes chain seamlessly */}
        <Hero />
        <LiveTranscriptScene id="story" />
        <CleanupScene />
        <AppDeckScene />

        {/* the desktop, as it actually looks */}
        <DesktopShot />

        {/* the interactive run — same atmosphere, calmer rhythm */}
        <FormatModes />
        <Providers />
        <SettingsTour />
        <FeatureGrid />
        <ComingNext />

        <FinaleScene />
      </main>

      <Footer />
    </>
  );
}
