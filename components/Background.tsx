/** Fixed ambient layer: gradient wash, glow orbs, grid and noise. Purely decorative. */
export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#08080d]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 55% at 50% -10%, rgba(63,201,228,0.15), transparent 60%), radial-gradient(ellipse 70% 50% at 85% 15%, rgba(139,123,240,0.16), transparent 62%)",
        }}
      />
      <div
        className="orb anim-float h-[38rem] w-[38rem] -left-40 top-[8%]"
        style={{ background: "rgba(63,201,228,0.15)" }}
      />
      <div
        className="orb anim-float h-[34rem] w-[34rem] -right-32 top-[38%]"
        style={{ background: "rgba(139,123,240,0.18)", animationDelay: "-5s" }}
      />
      <div
        className="orb anim-float h-[30rem] w-[30rem] left-[20%] top-[72%]"
        style={{ background: "rgba(96,80,232,0.14)", animationDelay: "-9s" }}
      />
      <div className="bg-grid absolute inset-0" />
      <div className="bg-noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
    </div>
  );
}
