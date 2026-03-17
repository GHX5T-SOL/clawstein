# $CLAWSTEIN

Your personal Jewish Banker & entertainment guide. An OpenClaw agent. A Pump.fun token landing page with animated island visuals, AI chat, and a coming-soon beach game.

## Features

- Layered animated background: sky, clouds, ocean waves, sand, palm trees
- Animated Jewish smiling sun (top corner)
- AI chat with Clawstein (Gemini or OpenAI — cheap models)
- Demo game coming soon: play as Lobster Clawstein roaming sandy beaches
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
