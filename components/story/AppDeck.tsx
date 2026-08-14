"use client";

import gsap from "gsap";

import Logo from "../Logo";
import { GmailCard, MessagesCard, NotionCard, SlackCard } from "./app-cards";
import { GmailIcon, MessagesIcon, NotionIcon, SlackIcon } from "./brand-icons";
import { Scene, q } from "./scene";
import { Waveform } from "./ui";

/**
 * SCENE 2 — the text card from scene 1 lands in Gmail, then the deck cascades:
 * each app card slides up over the one before, which tilts and recedes.
 * Gmail → Slack → Notion → iMessage.
 *
 * Every card gets a beat of life:
 *  - Gmail: the flyer card sheds its chrome and dissolves into the compose
 *    body while the Gmail window expands around it.
 *  - Slack: the typing indicator is overtaken by the waveform sweep.
 *  - Notion: the page writes itself — skeleton lines draw in, then the
 *    decision paragraph lands.
 *  - Messages: the reply bubble pops in like a real send.
 *
 * ENDING — the stack behind Messages leaves, and the Messages face
 * cross-fades into the Notion card in the same frame: one window changing
 * app, which is the exact object the next scene (Pricing page review)
 * continues on.
 */

const LABELS = [
  { name: "Gmail", Icon: GmailIcon },
  { name: "Slack", Icon: SlackIcon },
  { name: "Notion", Icon: NotionIcon },
  { name: "Messages", Icon: MessagesIcon },
];

export function AppDeckScene() {
  return (
    <Scene
      height={350}
      build={(tl, root) => {
        const sel = q(root);
        const cards = sel<HTMLElement>("[data-card]");
        const labels = sel("[data-label]");
        const flyer = sel("[data-flyer]")[0];
        const gmailBody = sel("[data-gmail-body]")[0];
        const typing = sel("[data-typing]")[0];
        const dots = sel("[data-typing-dot]");
        const msg = sel("[data-slack-msg]")[0];
        const sweep = sel("[data-sweep]")[0];
        const nlines = sel("[data-nline]");
        const ntext = sel("[data-ntext]")[0];
        const imsg = sel("[data-imsg]")[0];

        // deck starts as a single card; the rest wait below the fold
        gsap.set(cards.slice(1), { yPercent: 116, rotate: 0, scale: 1, opacity: 0 });
        gsap.set(gmailBody, { opacity: 0 });
        gsap.set(labels.slice(1), { opacity: 0, y: 8 });
        gsap.set(sel("[data-deck-head]")[0], { opacity: 0, y: 12 });

        // ---- the Gmail landing: one continuous expansion ----
        // The flyer arrives in the exact pose the cleanup card left in
        // (scale 0.55, high on the stage), while the Gmail window grows up
        // around it — then the card sheds its chrome and dissolves into the
        // compose body. Nothing cuts; the sentence never disappears.
        gsap.set(cards[0], { scale: 0.9, y: 26 });
        gsap.set(flyer, { y: -210, scale: 0.55, opacity: 1 });
        tl.to(cards[0], { scale: 1, y: 0, duration: 0.09, ease: "power2.out" }, 0);
        tl.to(flyer, { y: 0, scale: 1, duration: 0.07, ease: "power2.out" }, 0);
        tl.to(
          flyer,
          {
            width: "100%",
            boxShadow: "none",
            borderColor: "rgba(0,0,0,0)",
            duration: 0.05,
            ease: "power1.inOut",
          },
          0.07,
        );
        tl.to(gmailBody, { opacity: 1, duration: 0.04 }, 0.11);
        tl.to(flyer, { opacity: 0, duration: 0.03 }, 0.115);

        // ---- slack speed moment ----
        gsap.set(msg, { opacity: 0 });
        gsap.set(sweep, { xPercent: -130, opacity: 0 });
        tl.to(
          dots,
          {
            opacity: 0.25,
            duration: 0.014,
            stagger: { each: 0.014, repeat: 7, yoyo: true },
          },
          0.26,
        );
        tl.to(sweep, { opacity: 1, duration: 0.014 }, 0.355);
        tl.to(sweep, { xPercent: 150, duration: 0.055, ease: "power2.in" }, 0.36);
        tl.to(sweep, { opacity: 0, duration: 0.014 }, 0.412);
        tl.to(typing, { opacity: 0, scale: 0.9, duration: 0.022 }, 0.392);
        tl.to(msg, { opacity: 1, duration: 0.026 }, 0.402);

        // ---- notion writes itself ----
        gsap.set(nlines, { scaleX: 0, transformOrigin: "0% 50%" });
        gsap.set(ntext, { opacity: 0, y: 10 });
        tl.to(nlines, { scaleX: 1, duration: 0.045, stagger: 0.018 }, 0.5);
        tl.to(ntext, { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" }, 0.575);

        // ---- the iMessage reply pops in like a real send ----
        gsap.set(imsg, { opacity: 0, y: 12, scale: 0.85, transformOrigin: "100% 100%" });
        tl.to(imsg, { opacity: 1, y: 0, scale: 1, duration: 0.05, ease: "back.out(1.6)" }, 0.77);

        // ---- the cascade ----
        const enters = [0.2, 0.44, 0.7];
        enters.forEach((at, i) => {
          const incoming = cards[i + 1];
          const beneath = cards.slice(0, i + 1);

          tl.to(incoming, { opacity: 1, duration: 0.02 }, at);
          tl.to(incoming, { yPercent: 0, duration: 0.12, ease: "power3.out" }, at);
          beneath.forEach((c, j) => {
            const depth = i + 1 - j;
            tl.to(
              c,
              {
                yPercent: -3.5 * depth,
                scale: 1 - 0.045 * depth,
                rotate: -1.4 * depth,
                duration: 0.12,
                ease: "power3.out",
              },
              at,
            );
          });

          tl.to(labels[i], { opacity: 0, y: -8, duration: 0.04 }, at);
          tl.to(labels[i + 1], { opacity: 1, y: 0, duration: 0.04 }, at + 0.03);
        });

        // ---- the floating orb: it emerges FROM the first card ----
        // It rises out of the Gmail window's bottom edge the moment the
        // message lands, then floats beside the deck for the whole scene.
        const orb = sel("[data-orb]")[0];
        gsap.set(orb, { opacity: 0, scale: 0.5, y: 34, transformOrigin: "18% 100%" });
        tl.to(orb, { opacity: 1, scale: 1, y: 0, duration: 0.05, ease: "back.out(1.7)" }, 0.1);
        tl.to(orb, { y: -8, duration: 0.55, ease: "sine.inOut" }, 0.25);

        // ---- ENDING: the deck settles into a loose fan and the line lands
        // BELOW the artwork (never over it) ----
        const stageEl = sel("[data-stage]")[0];
        const stageW = stageEl?.getBoundingClientRect().width ?? 700;
        const frameW =
          (stageEl?.parentElement?.parentElement?.getBoundingClientRect()
            .width ?? stageW) - 48;
        const FAN_SCALE = 0.62;
        const room = Math.max(0, frameW / 2 - (stageW * FAN_SCALE) / 2 - 12);
        const wide = Math.min(room, stageW * 0.3);
        const near = wide * 0.36;
        const fan = [
          { x: -wide, y: 42, r: -7 },
          { x: -near, y: 14, r: -2.5 },
          { x: near, y: 14, r: 2.5 },
          { x: wide, y: 42, r: 7 },
        ];
        cards.forEach((c, i) => {
          tl.to(
            c,
            {
              x: fan[i].x,
              y: fan[i].y,
              rotate: fan[i].r,
              yPercent: 0,
              scale: FAN_SCALE,
              duration: 0.14,
              ease: "power2.inOut",
            },
            0.84,
          );
        });
        tl.to(labels[3], { opacity: 0, duration: 0.04 }, 0.84);
        tl.to(sel("[data-deck-head]")[0], { opacity: 1, y: 0, duration: 0.08 }, 0.9);
      }}
    >
      <div className="relative flex w-full max-w-3xl flex-col items-center">
        {/* label sits on the canvas, never over the artwork */}
        <div className="relative mb-6 h-8 w-full">
          {LABELS.map(({ name, Icon }) => (
            <span
              key={name}
              data-label
              className="t-cap absolute left-1/2 -translate-x-1/2"
            >
              <Icon className="h-6 w-6 shrink-0" />
              {name}
            </span>
          ))}
        </div>

        <div data-stage className="relative h-[21rem] w-full sm:h-[24rem]">
          {/* the deck — later cards sit on top */}
          {[
            <GmailCard
              key="gmail"
              body={
                <span data-gmail-body>
                  Hey Sarah, could we move the meeting to Thursday afternoon?
                </span>
              }
            />,
            <SlackCard key="slack" />,
            <NotionCard key="notion">
              <div className="mt-1 space-y-2.5">
                {[92, 84, 58].map((w, i) => (
                  <span
                    key={i}
                    data-nline
                    aria-hidden
                    className="block h-[6px] rounded-full bg-black/[0.08] will-change-transform"
                    style={{ width: `${w}%` }}
                  />
                ))}
                <p
                  data-ntext
                  className="pt-2 text-[15px] leading-relaxed text-foreground"
                >
                  Decision: rework the pricing page this sprint — keep the nav,
                  give every tier one clear call to action.
                </p>
              </div>
            </NotionCard>,
            <MessagesCard key="msg" />,
          ].map((card, i) => (
            <div
              key={i}
              data-card
              className="absolute inset-0 will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              {card}
            </div>
          ))}

          {/* The waveform that overtakes the typing indicator. Clipped to the
              card footprint so it cannot bleed onto the canvas or the deck. */}
          <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden rounded-[14px]">
            <div
              data-sweep
              className="absolute inset-y-0 left-0 w-32 will-change-transform"
            >
              <Waveform count={22} className="h-full w-full" />
            </div>
          </div>

          {/* the floating orb — it pops out of the first card and stays.
              It never steals focus from the destination field. */}
          <div
            data-orb
            className="pointer-events-none absolute -bottom-3 right-6 z-[55] flex items-end gap-2"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_rgba(10,10,30,0.22)] ring-1 ring-black/5">
              <Logo className="h-5 w-5 text-[#131317]" />
            </span>
            <span className="orb-bubble">
              I float above every app.
              <br />
              Drag me anywhere — I never steal focus.
            </span>
          </div>

          {/* the card handed over from scene 1 */}
          <div
            data-flyer
            className="card-shadow pointer-events-none absolute left-1/2 top-24 z-50 w-[22rem] -translate-x-1/2 rounded-xl border border-line bg-paper px-4 py-3 will-change-transform"
          >
            <p className="text-[15px] leading-snug text-foreground">
              Hey Sarah, could we move the meeting to Thursday afternoon?
            </p>
          </div>

        </div>

        {/* the line lands below the artwork, never over it */}
        <div data-deck-head className="mt-9 flex flex-col items-center text-center">
          <h2 className="t-display t-display-md">Wherever the cursor is.</h2>
          <p className="t-body-sm mt-2.5">
            Slack. Gmail. Docs. Code. Anywhere you type — text lands in the
            field that already has focus.
          </p>
        </div>
      </div>
    </Scene>
  );
}
