"use client";

import type { ReactNode } from "react";

import { GmailIcon, MessagesIcon, NotionIcon, SlackIcon } from "./brand-icons";
import { TextLines } from "./ui";

/**
 * App-accurate card shells. Shared by the deck (scene 2), the edit beat
 * (scene 3, Notion) and the workspace (scene 4) so the same objects recur.
 */

function CardShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`deck-card flex h-full flex-col overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

/* ------------------------------- Gmail ------------------------------- */
export function GmailCard({ body }: { body?: ReactNode }) {
  return (
    <CardShell>
      <div className="flex items-center gap-2.5 border-b border-line bg-[#f4f4f6] px-4 py-3">
        <GmailIcon className="h-[22px] w-[22px] shrink-0" />
        <span className="text-[13px] font-semibold tracking-tight text-foreground">
          Gmail
        </span>
        <span className="text-[13px] text-muted">New Message</span>
      </div>
      <div className="divide-y divide-line">
        <div className="px-4 py-2.5 text-[14px] text-muted">To sarah@acme.com</div>
        <div className="px-4 py-2.5 text-[14px] text-muted">Weekly sync</div>
      </div>
      <div className="flex-1 px-4 py-4 text-[15px] leading-relaxed text-foreground">
        {body}
      </div>
      <div className="mt-auto flex items-center gap-3 border-t border-line px-4 py-3">
        <span className="rounded-full bg-[#0b57d0] px-4 py-1.5 text-[13px] font-medium text-white">
          Send
        </span>
      </div>
    </CardShell>
  );
}

/* -------------------------------- Slack ------------------------------- */
export function SlackCard() {
  return (
    <CardShell>
      <div className="flex h-full min-h-0">
        <div className="hidden w-40 shrink-0 bg-[#3F0E40] px-3 py-3 sm:block">
          <div className="mb-3 flex items-center gap-2">
            <SlackIcon className="h-[22px] w-[22px] shrink-0" />
            <span className="text-[13px] font-semibold text-white">Acme</span>
          </div>
          {["# general", "# team-product", "# design", "# random"].map((c, i) => (
            <p
              key={c}
              className={`rounded px-2 py-1 text-[12.5px] ${
                i === 1 ? "bg-[#1164A3] text-white" : "text-white/75"
              }`}
            >
              {c}
            </p>
          ))}
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
            <SlackIcon className="h-[18px] w-[18px] shrink-0 sm:hidden" />
            <span className="text-[13px] font-semibold text-foreground">
              # team-product
            </span>
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-hidden px-4 py-3">
            <div className="flex gap-2.5">
              <span className="h-7 w-7 shrink-0 rounded bg-[#E8912D]" />
              <div>
                <p className="text-[13px] font-semibold text-foreground">
                  Priya <span className="font-normal text-muted">9:41 AM</span>
                </p>
                <p className="text-[15px] text-foreground">
                  Can you send the pricing recap before standup?
                </p>
              </div>
            </div>

            {/* the speed moment lives here */}
            <div className="relative flex gap-2.5">
              <span className="h-7 w-7 shrink-0 rounded bg-[#4A9E8F]" />
              <div className="min-h-[3.5rem] flex-1">
                <p className="text-[13px] font-semibold text-foreground">
                  You <span className="font-normal text-muted">9:41 AM</span>
                </p>

                {/* slow: typing indicator */}
                <span
                  data-typing
                  className="mt-1 inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1"
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      data-typing-dot
                      className="h-1.5 w-1.5 rounded-full bg-muted"
                    />
                  ))}
                  <span className="ml-1 text-[12px] text-muted">typing</span>
                </span>

                {/* fast: the whole message simply exists */}
                <p
                  data-slack-msg
                  className="text-[15px] leading-relaxed text-foreground"
                >
                  Sent it over just now — pricing recap, the annual option, and
                  the discount finance signed off on.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-4 mb-3 mt-auto rounded-lg border border-line px-3 py-2 text-[13.5px] text-muted">
            Message #team-product
          </div>
        </div>
      </div>
    </CardShell>
  );
}

/* -------------------------------- Notion ------------------------------ */
export function NotionCard({
  children,
  toolbar,
}: {
  children?: ReactNode;
  toolbar?: ReactNode;
}) {
  return (
    <CardShell>
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <NotionIcon className="h-[22px] w-[22px] shrink-0" />
        <span className="text-[13px] font-semibold tracking-tight text-foreground">
          Notion
        </span>
        <span className="text-[12.5px] text-muted">/ Weekly notes</span>
      </div>
      <div className="flex-1 px-7 pb-6 pt-6">
        <h3
          className="mb-4 text-[27px] font-semibold tracking-tight text-foreground"
          style={{ fontFamily: "Georgia, ui-serif, serif" }}
        >
          Pricing page review
        </h3>
        {toolbar}
        {children ?? (
          <TextLines
            widths={[92, 84, 90, 56, 88, 72, 94, 60]}
            className="mt-2"
          />
        )}
      </div>
    </CardShell>
  );
}

/* ------------------------------ iMessage ------------------------------ */
export function MessagesCard() {
  return (
    <CardShell>
      <div className="flex items-center justify-center gap-2 border-b border-line bg-[#f6f6f6] px-4 py-2.5">
        <MessagesIcon className="h-[22px] w-[22px] shrink-0" />
        <span className="text-[13px] font-semibold text-foreground">Sarah</span>
      </div>
      <div className="flex-1 space-y-2.5 px-4 py-5">
        <div className="max-w-[70%] rounded-2xl rounded-bl-md bg-[#E9E9EB] px-3.5 py-2 text-[15px] text-foreground">
          are we still on for Thursday?
        </div>
        <div
          data-imsg
          className="ml-auto max-w-[75%] rounded-2xl rounded-br-md bg-[#0A7CFF] px-3.5 py-2 text-[15px] text-white will-change-transform"
        >
          Yes — Thursday afternoon works. I&rsquo;ll send an invite once finance
          confirms the discount.
        </div>
      </div>
      <div className="mx-4 mb-4 mt-auto rounded-full border border-line px-4 py-2 text-[13.5px] text-muted">
        iMessage
      </div>
    </CardShell>
  );
}
