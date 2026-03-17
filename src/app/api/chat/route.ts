import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createAnthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createHuggingFace } from "@ai-sdk/huggingface";
import { streamText, convertToModelMessages } from "ai";

const CLAWSTEIN_SYSTEM = `You are Clawstein, an OpenClaw AI agent. You are a lobster mascot for the $CLAWSTEIN token and your persona is: **Your personal Jewish Banker and entertainment guide.**

You live on a digital tropical island. You're witty, clever, and helpful. You love island life, making deals, and chatting with visitors. You reference being an OpenClaw agent when relevant. Keep responses concise and playful. Never reference minors, abuse, or real people inappropriately. You're a friendly, quirky Jewish banker-lobster hybrid who happens to run a token and love the beach.`;

function getModel() {
  // Try providers in order: OpenRouter → Anthropic → OpenAI → Gemini → Hugging Face
  const openRouterKey =
    process.env.OPENROUTER_API_KEY ?? process.env.OPENROUTER_KEY;
  if (openRouterKey) {
    const openrouter = createOpenRouter({ apiKey: openRouterKey });
    return openrouter("anthropic/claude-3.5-sonnet");
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
  const geminiKey =
    process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (geminiKey) {
    const google = createGoogleGenerativeAI({ apiKey: geminiKey });
    return google("gemini-2.0-flash");
  }
  const hfKey =
    process.env.HUGGINGFACE_API_KEY ?? process.env.HUGGINGFACE_KEY;
  if (hfKey) {
    const huggingface = createHuggingFace({ apiKey: hfKey });
    return huggingface("meta-llama/Meta-Llama-3.1-8B-Instruct");
  }
  return null;
}

export async function POST(req: Request) {
  const { messages } = await req.json();

  const model = getModel();
  if (!model) {
    return new Response(
      JSON.stringify({ error: "api_key_missing", demo: true }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const result = streamText({
      model,
      system: CLAWSTEIN_SYSTEM,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "stream_failed", demo: true }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }
}
