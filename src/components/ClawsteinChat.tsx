"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Shield,
  Bot,
  MessageSquare,
  Trash2,
  Send,
  Info,
  User,
} from "lucide-react";

function getMessageText(m: {
  content?: string;
  parts?: Array<{ type?: string; text?: string }>;
}): string {
  if (typeof m.content === "string") return m.content;
  if (Array.isArray(m.parts)) {
    return m.parts
      .filter(
        (p): p is { type: string; text: string } =>
          p.type === "text" && "text" in p
      )
      .map((p) => p.text)
      .join("");
  }
  return "";
}

const DEMO_REPLIES = [
  "Hey friend. Take a breath — you're on the beach with me now. What do you need today?",
  "I’ve got sunshine, calm waves, and a playlist that feels like a soft reset. Want cozy, hype, or mellow?",
  "$wifclaw is a vibe-first meme token world — beach energy, comfort, and a little playful chaos (the wholesome kind).",
  "The mint address is right on the page — copy it anytime. Then we can talk vibes, comfort, and beach nonsense.",
  "No pressure here. We do gentle vibes, steady breaths, and tiny wins — one wave at a time.",
];

const STARTER_MESSAGES = [
  {
    id: "start-1",
    role: "assistant" as const,
    content:
      "Welcome to the beach. Ask me anything — I’m here for comfort, calm vibes, and a little fun.",
  },
  {
    id: "start-2",
    role: "user" as const,
    content: "What are you exactly?",
  },
  {
    id: "start-3",
    role: "assistant" as const,
    content:
      "I’m dogwifclaw — your happy beach buddy. I’m not here for financial advice; I’m here to help you feel better and keep the vibes sunny.",
  },
];

type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

function generateClawsteinReply(userText: string): string {
  const t = userText.toLowerCase();
  if (t.includes("contract"))
    return "That mint is listed up top — copy it from the contract badge. It’s the real $wifclaw token address.";
  if (t.includes("wallet") || t.includes("solana"))
    return "Wallet stuff can wait — the mini-game is just a preview for now. For today: beach vibes and good company.";
  if (t.includes("tokens") || t.includes("1m") || t.includes("1,000,000"))
    return "No gatekeeping today. If you’re here, you belong. Want a quick $wifclaw vibe rundown instead?";
  if (t.includes("plan") || t.includes("entertainment") || t.includes("tonight"))
    return "Tonight’s gentle plan: sunset → warm snack → favorite song → a tiny happy thing. Want it cozy, hype, or mellow?";
  return DEMO_REPLIES[Math.floor(Math.random() * DEMO_REPLIES.length)];
}

export default function ClawsteinChat() {
  const [useDemo, setUseDemo] = useState(false);
  const [demoMessages, setDemoMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    []
  );
  const { messages, sendMessage, status } = useChat({
    transport,
    onError: () => setUseDemo(true),
  });

  const allMessages = useMemo(() => {
    const normalized = messages.map((m) => ({
      id: m.id,
      role: m.role as "user" | "assistant",
      content: getMessageText(m),
    }));
    return useDemo
      ? [...STARTER_MESSAGES, ...demoMessages]
      : [...STARTER_MESSAGES, ...normalized];
  }, [demoMessages, messages, useDemo]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [allMessages]);

  const handleDemoSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;
      const userMsg = input.trim();
      setInput("");
      const userEntry: ChatMessage = {
        id: "u-" + Date.now(),
        role: "user",
        content: userMsg,
      };
      setDemoMessages((prev) => [...prev, userEntry]);
      setTimeout(() => {
        const reply = generateClawsteinReply(userMsg);
        setDemoMessages((prev) => [
          ...prev,
          { id: "a-" + Date.now(), role: "assistant", content: reply },
        ]);
      }, 650);
    },
    [input]
  );

  const handleRealSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;
      sendMessage({ text: input });
      setInput("");
    },
    [input, sendMessage]
  );

  const onSubmit = useDemo ? handleDemoSubmit : handleRealSubmit;

  const handleSuggestion = useCallback(
    (text: string) => {
      if (useDemo) {
        setDemoMessages((prev) => [
          ...prev,
          { id: "u-" + Date.now(), role: "user", content: text },
        ]);
        setTimeout(() => {
          setDemoMessages((prev) => [
            ...prev,
            {
              id: "a-" + Date.now(),
              role: "assistant",
              content: generateClawsteinReply(text),
            },
          ]);
        }, 650);
      } else {
        sendMessage({ text });
      }
    },
    [useDemo, sendMessage]
  );

  const handleClear = useCallback(() => {
    setDemoMessages([]);
  }, []);

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <section id="chat" className="relative scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left intro */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-white/80 text-xs">
              <Shield className="text-sand-200" />
              dogwifclaw Chat
            </div>
            <h2 className="mt-4 font-display tracking-tight text-white text-3xl sm:text-4xl">
              Chat with dogwifclaw
            </h2>
            <p className="mt-3 text-white/75 text-base">
              Ask for a beachy pep-talk, comfort, a vibe check, or a little
              lighthearted fun. dogwifclaw is here to offer solace and keep the
              day sunny — with $wifclaw lore on the side.
            </p>

            <div className="mt-6 rounded-3xl bg-white/5 border border-white/10 p-5 shadow-soft-xl">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-claw-400 to-claw-700 flex items-center justify-center shadow-glow-contract">
                  <Bot className="text-white text-xl" />
                </div>
                <div className="min-w-0">
                  <div className="text-white font-semibold">dogwifclaw</div>
                  <div className="text-white/70 text-sm">
                    I’m your beach buddy. I bring comfort, calm waves, and a
                    little sparkle when you need it.
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleSuggestion(
                      "Give me a beach entertainment plan for tonight."
                    )
                  }
                  className="chat-suggestion text-left rounded-2xl bg-slate-950/70 border border-white/10 p-4 text-white hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-sand-200"
                >
                  <div className="text-sm font-semibold">Entertainment plan</div>
                  <div className="mt-1 text-xs text-white/65">
                    What&apos;s the vibe tonight?
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSuggestion(
                      "Explain $wifclaw like I'm new — keep it friendly and simple."
                    )
                  }
                  className="chat-suggestion text-left rounded-2xl bg-slate-950/70 border border-white/10 p-4 text-white hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-sand-200"
                >
                  <div className="text-sm font-semibold">Token rundown</div>
                  <div className="mt-1 text-xs text-white/65">
                    Sell me the legend.
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right chat panel */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white/5 border border-white/10 shadow-soft-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/10 bg-slate-950">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="text-sand-200 text-xl" />
                    <div>
                      <div className="text-white font-semibold">Live Chat</div>
                      <div className="text-xs text-white/60">
                        {useDemo ? "Demo mode" : "Live AI"} • instant personality • smooth UI
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 text-white px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-sand-200"
                  >
                    <Trash2 className="text-lg" />
                    Clear
                  </button>
                </div>
              </div>

              <div
                id="chat-scroll"
                ref={scrollRef}
                className="h-[420px] sm:h-[460px] overflow-y-auto px-5 py-5 space-y-4"
              >
                {allMessages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex gap-3 items-start ${
                      m.role === "user" ? "justify-end" : ""
                    }`}
                  >
                    {m.role === "user" ? (
                      <>
                        <div className="max-w-[85%] text-right">
                          <div className="text-xs text-white/55">You</div>
                          <div className="mt-1 rounded-2xl rounded-tr-sm bg-gradient-to-b from-sand-200 to-sand-400 p-4 text-slate-950 font-medium">
                            {m.content}
                          </div>
                        </div>
                        <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0">
                          <User className="text-white text-lg" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-claw-400 to-claw-700 flex items-center justify-center shrink-0">
                          <Bot className="text-white text-lg" />
                        </div>
                        <div className="max-w-[85%]">
                          <div className="text-xs text-white/55">dogwifclaw</div>
                          <div className="mt-1 rounded-2xl rounded-tl-sm bg-slate-950/70 border border-white/10 p-4 text-white">
                            {m.content}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 items-start">
                    <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-claw-400 to-claw-700 flex items-center justify-center shrink-0">
                      <Bot className="text-white text-lg" />
                    </div>
                    <div className="max-w-[85%]">
                      <div className="text-xs text-white/55">dogwifclaw</div>
                      <div className="mt-1 rounded-2xl rounded-tl-sm bg-slate-950/70 border border-white/10 p-4 text-white">
                        <span className="inline-flex items-center gap-2">
                          <span className="inline-block h-2 w-2 rounded-full bg-white/60 animate-pulse" />
                          <span
                            className="inline-block h-2 w-2 rounded-full bg-white/60 animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <span
                            className="inline-block h-2 w-2 rounded-full bg-white/60 animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 bg-slate-950 p-4">
                <form
                  onSubmit={onSubmit}
                  className="flex items-end gap-3"
                >
                  <label htmlFor="chat-input" className="sr-only">
                    Message
                  </label>
                  <div className="flex-1">
                    <div className="relative">
                      <textarea
                        id="chat-input"
                        rows={1}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full resize-none rounded-2xl bg-white/10 border border-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sand-200"
                        placeholder="Ask dogwifclaw for comfort or beach vibes…"
                        disabled={isLoading}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/35 text-xs">
                        Enter to send
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-white/55 flex items-center gap-2">
                      <Info className="text-sand-200" />
                      {useDemo
                        ? "Using demo replies (API unavailable)."
                        : "AI-powered replies via your configured provider."}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-2xl bg-gradient-to-b from-claw-300 to-claw-600 text-slate-950 font-semibold shadow-soft-xl hover:brightness-[1.03] transition focus:outline-none focus:ring-2 focus:ring-sand-200 disabled:opacity-50"
                  >
                    <span className="hidden sm:inline">Send</span>
                    <Send className="text-xl" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
