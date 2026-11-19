"use client";

import { Send } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { getAgentReply } from "@/lib/data/chat";
import { buildDemoChat } from "@/lib/data/demo";
import type { ChatMessage } from "@/lib/data/types";
import { clsx } from "clsx";

const SUGGESTIONS = ["How long does a refund take?", "What is a SWIFT code?", "Can I change my bank?"];

const now = () => new Date().toISOString();
const timeLabel = (iso: string) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

interface ChatProps {
  replyDelay?: number;
  firstName?: string;
  className?: string;
}

export function Chat({ replyDelay = 900, firstName = "there", className = "h-[min(34rem,calc(100svh-14rem))] min-h-[24rem]" }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => buildDemoChat(firstName));
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const counter = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    const id = () => `local-${++counter.current}`;
    setMessages((list) => [...list, { id: id(), author: "user", text: clean, at: now() }]);
    setDraft("");
    setTyping(true);
    timer.current = setTimeout(() => {
      setMessages((list) => [...list, { id: id(), author: "agent", text: getAgentReply(clean), at: now() }]);
      setTyping(false);
    }, replyDelay);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    send(draft);
  };

  return (
    <div className={clsx("glass flex flex-col rounded-[2rem]", className)}>
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
        <span className="relative grid size-10 place-items-center rounded-full bg-mint/20 font-bold text-mint">
          N
          <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-navy bg-mint" />
        </span>
        <div>
          <p className="font-semibold">Noor, Refund support</p>
          <p className="text-xs text-muted">Usually replies in a few minutes</p>
        </div>
      </div>

      <div ref={scroller} data-lenis-prevent role="log" aria-live="polite" aria-label="Conversation" className="flex-1 space-y-3 overflow-y-auto px-4 py-5 sm:px-5">
        {messages.map((message) => (
          <div key={message.id} className={clsx("flex", message.author === "user" ? "justify-end" : "justify-start")}>
            <div
              className={clsx(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[75%]",
                message.author === "user" ? "rounded-br-md bg-mint text-[#04201a]" : "rounded-bl-md bg-white/[0.07]",
              )}
            >
              {message.text}
              <span className={clsx("mt-1 block text-[0.65rem]", message.author === "user" ? "text-[#04201a]/60" : "text-muted")}>
                {timeLabel(message.at)}
              </span>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex" aria-label="Support is typing">
            <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white/[0.07] px-4 py-3.5">
              {[0, 1, 2].map((dot) => (
                <span key={dot} className="size-1.5 rounded-full bg-text" style={{ animation: `typing 1.1s ${dot * 0.15}s infinite` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 p-3 sm:p-4">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" data-lenis-prevent>
          {SUGGESTIONS.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => send(suggestion)} className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-xs text-text/80 transition hover:border-mint/50 hover:text-white">
              {suggestion}
            </button>
          ))}
        </div>
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label="Message"
            placeholder="Write a message"
            className="field !rounded-full"
          />
          <button type="submit" aria-label="Send message" disabled={!draft.trim()} className="btn btn-primary !size-12 !shrink-0 !p-0">
            <Send size={18} aria-hidden />
          </button>
        </form>
      </div>
    </div>
  );
}
