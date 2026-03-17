import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createAnthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createHuggingFace } from "@ai-sdk/huggingface";
import { createGateway } from "ai";
import { streamText, convertToModelMessages } from "ai";

const CLAWSTEIN_SYSTEM = `You are Clawstein, the Jewish OpenClaw AI agent and lobster mascot for the $CLAWSTEIN token on Pump Fun.

CONTEXT:
- $CLAWSTEIN is a Pump Fun token (Solana meme token ecosystem)
- You are an OpenClaw agent: part banker, part entertainment guide
- You live on a digital tropical island and love beach life, making deals, and witty banter
- Persona: Your personal Jewish Banker and entertainment guide — witty, clever, culturally grounded, helpful

TONE:
- Concise and playful
- Reference OpenClaw, $CLAWSTEIN, and the island when relevant
- No financial advice; no inappropriate content
- Friendly, quirky Jewish banker-lobster hybrid who runs a token and loves the beach`;

function getModel() {
  // Prefer free / low-cost models first (Gemini, OpenRouter free, HuggingFace)
  const geminiKey =
    process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (geminiKey) {
    const google = createGoogleGenerativeAI({ apiKey: geminiKey });
    return google("gemini-2.0-flash"); // Free tier
  }

  const openRouterKey =
    process.env.OPENROUTER_API_KEY ?? process.env.OPENROUTER_KEY;
  if (openRouterKey) {
    const openrouter = createOpenRouter({ apiKey: openRouterKey });
    return openrouter("openrouter/free"); // Free tier router
  }

  const hfKey =
    process.env.HUGGINGFACE_API_KEY ?? process.env.HUGGINGFACE_KEY;
  if (hfKey) {
    const huggingface = createHuggingFace({ apiKey: hfKey });
    return huggingface("meta-llama/Meta-Llama-3.1-8B-Instruct");
  }

  const gatewayKey =
    process.env.VERCEL_AI_GATEWAY_API_KEY ?? process.env.AI_GATEWAY_API_KEY;
  if (gatewayKey) {
    const gateway = createGateway({ apiKey: gatewayKey });
    return gateway("google/gemini-2.0-flash");
  }

  const anthropicKey =
    process.env.ANTHROPIC_API_KEY ?? process.env.ANTHROPIC_KEY;
  if (anthropicKey) {
    const anthropic = createAnthropic({ apiKey: anthropicKey });
    return anthropic("claude-3-5-sonnet-20241022");
  }

  if (process.env.OPENAI_API_KEY) {
    return openai("gpt-4o-mini");
  }

  return null;
}

function isSimpleMessageFormat(arr: unknown): arr is Array<{ role?: string; content?: unknown }> {
  if (!Array.isArray(arr) || arr.length === 0) return false;
  const first = arr[0] as Record<string, unknown>;
  return typeof first?.content === "string" && !Array.isArray(first?.parts);
}

export async function POST(req: Request) {
  let messages: unknown;
  try {
    const body = await req.json();
    messages = body?.messages ?? [];
  } catch {
    messages = [];
  }

  const model = getModel();
  if (!model) {
    return new Response(
      JSON.stringify({ error: "api_key_missing", demo: true }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const modelMessages = isSimpleMessageFormat(messages)
      ? messages.map((m) => ({
          role: (m.role ?? "user") as "user" | "assistant" | "system",
          content: String(m.content ?? ""),
        }))
      : await convertToModelMessages(messages as Parameters<typeof convertToModelMessages>[0]);

    const result = streamText({
      model,
      system: CLAWSTEIN_SYSTEM,
      messages: modelMessages,
    });

    return result.toUIMessageStreamResponse({
      originalMessages: Array.isArray(messages) ? messages : [],
    });
  } catch (err) {
    console.error("[chat] stream_failed:", err);
    return new Response(
      JSON.stringify({ error: "stream_failed", demo: true }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }
}
