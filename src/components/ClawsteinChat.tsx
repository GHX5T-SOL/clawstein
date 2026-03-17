"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

function getMessageText(m: { content?: string; parts?: Array<{ type?: string; text?: string }> }): string {
  if (typeof m.content === "string") return m.content;
  if (Array.isArray(m.parts)) {
    return m.parts
      .filter((p): p is { type: string; text: string } => p.type === "text" && "text" in p)
      .map((p) => p.text)
      .join("");
  }
  return "";
}

const DEMO_REPLIES = [
  "Shalom! I'm Clawstein, your island buddy. Catch some coconuts and we'll chat properly once my API key is set!",
  "Yo! I'd love to schmooze but my keys are at the bottom of the ocean. Add ANTHROPIC_API_KEY to Vercel!",
  "Ahoy! I'm on island time. Configure my API key and I'll be fully operational, bubelah!",
  "The coconuts are calling! Set up my API and we'll have a real conversation. Until then, enjoy the demo!",
  "L'chaim! I'm here in spirit. Get that API key configured and I'll be your best digital island friend!",
];

type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

export default function ClawsteinChat() {
  const [useDemo, setUseDemo] = useState(false);
  const [demoMessages, setDemoMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status } = useChat({
    transport,
    onError: () => setUseDemo(true),
  });

  useEffect(() => {
    if (status === "error") setUseDemo(true);
  }, [status]);

  const handleDemoSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;
      const userMsg = input.trim();
      setInput("");
      const userEntry: ChatMessage = { id: "u-" + Date.now(), role: "user", content: userMsg };
      setDemoMessages((prev) => [...prev, userEntry]);
      const reply = DEMO_REPLIES[Math.floor(Math.random() * DEMO_REPLIES.length)];
      setTimeout(() => {
        setDemoMessages((prev) => [
          ...prev,
          { id: "a-" + Date.now(), role: "assistant", content: "🦞 " + reply },
        ]);
      }, 600);
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

  const displayMessages = useDemo ? demoMessages : messages;
  const onSubmit = useDemo ? handleDemoSubmit : handleRealSubmit;

  return (
    <section id="chat" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-2xl border-2 border-amber-400/50 bg-sky-900/80 p-6 backdrop-blur">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-amber-200">
            <Image src="/clawstein.png" alt="" width={40} height={48} className="rounded-full" />
            Chat with Clawstein
          </h2>
          <div className="mb-4 max-h-80 overflow-y-auto rounded-lg bg-black/30 p-4">
            {displayMessages.length === 0 && (
              <p className="text-amber-200/80">
                Say hi! Clawstein is your Jewish OpenClaw island buddy.
              </p>
            )}
            {displayMessages.map((m) => (
              <div
                key={m.id}
                className={`mb-3 ${m.role === "user" ? "text-right" : "flex gap-2"}`}
              >
                {m.role === "assistant" && (
                  <Image
                    src="/clawstein.png"
                    alt=""
                    width={28}
                    height={34}
                    className="h-8 w-8 shrink-0 rounded-full"
                  />
                )}
                <span
                  className={`inline-block max-w-[85%] rounded-2xl px-4 py-2 ${
                    m.role === "user"
                      ? "bg-amber-500/90 text-gray-900"
                      : "bg-sky-800/80 text-amber-100"
                  }`}
                >
                  {getMessageText(m)}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-xl border-2 border-amber-400/50 bg-black/30 px-4 py-3 text-amber-100 placeholder-amber-200/60 focus:border-amber-400 focus:outline-none"
              disabled={status === "streaming" || status === "submitted"}
            />
            <button
              type="submit"
              className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-gray-900 transition hover:bg-amber-400 disabled:opacity-50"
            >
              Send
            </button>
          </form>
          {useDemo && (
            <p className="mt-2 text-sm text-amber-200/70">
              Demo mode—add ANTHROPIC_API_KEY to Vercel for real AI chat.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
