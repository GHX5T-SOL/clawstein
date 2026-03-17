# $CLAWSTEIN

Your Jewish OpenClaw island buddy. A Pump.fun token landing page with 3D island visuals, AI chat, and a mini catch game.

## Features

- 3D island hero scene (React Three Fiber + Drei)
- AI chat with Clawstein (Anthropic Claude)
- Mini 3D game: catch coconuts as Lobster Clawstein
- Leaderboard (demo with localStorage)
- Mobile-responsive design

## Setup

```bash
npm install
npm run dev
```

## Environment Variables (Vercel)

Add `ANTHROPIC_API_KEY` in your Vercel project settings for real AI chat. Without it, the chat uses demo replies.

## Deploy

Deploy to Vercel—the `vercel.json` is configured. Set `ANTHROPIC_API_KEY` in Vercel env vars.
