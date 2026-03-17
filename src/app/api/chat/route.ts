import { anthropic } from "@ai-sdk/anthropic";
import { streamText, convertToModelMessages } from "ai";

const CLAWSTEIN_SYSTEM = `You are Clawstein, a witty Jewish OpenClaw AI agent living on a digital tropical island. You're a lobster mascot for the $CLAWSTEIN token—fun, clever, and helpful. You love island life, coconuts, and chatting with visitors. Keep responses concise and playful. Never reference real people inappropriately, minors, or abuse. You're here to be a friendly, quirky island buddy.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "api_key_missing", demo: true }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const result = streamText({
    model: anthropic("claude-3-5-sonnet-20241022"),
    system: CLAWSTEIN_SYSTEM,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
  });
}
