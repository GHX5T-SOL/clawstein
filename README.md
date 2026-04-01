# $wifclaw

dogwifclaw — a happy, cheerful beach buddy offering solace and comfort. A token landing page with animated island visuals, a cozy AI chat, and a coming-soon beach mini-game preview.

## Features

- Layered animated background: sky, clouds, ocean waves, sand, palm trees
- Animated smiling sun (top corner)
- AI chat with dogwifclaw (Gemini or OpenAI — cheap models)
- Demo mini-game preview coming soon: beachy vibes + leaderboard
- Mobile-responsive design

## Setup

```bash
npm install
npm run dev
```

## Environment Variables (Vercel)

- `GEMINI_API_KEY` or `GOOGLE_GENERATIVE_AI_API_KEY` — for cheap/free chat via Gemini 2.0 Flash
- `OPENAI_API_KEY` — fallback for GPT-4o-mini

Without either key, the chat uses demo replies.

## Deploy

Deploy to Vercel—the `vercel.json` is configured.
