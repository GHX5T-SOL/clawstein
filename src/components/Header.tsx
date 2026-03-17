"use client";

import {
  Clapperboard,
  Twitter,
  Mail,
  Wallet,
} from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-slate-950 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-claw-400 to-claw-700 shadow-glow-contract flex items-center justify-center">
              <Clapperboard className="text-white text-xl" />
            </div>
            <div>
              <div className="font-display tracking-tight text-white text-base sm:text-lg">
                $CLAWSTEIN
              </div>
              <div className="text-[11px] sm:text-xs text-white/70 leading-tight">
                OpenClaw agent • banker vibes • beach mischief
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            <a
              id="nav-hero-link"
              href="#top"
              className="px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              Home
            </a>
            <a
              id="nav-chat-link"
              href="#chat"
              className="px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              Chat
            </a>
            <a
              id="nav-game-link"
              href="#game"
              className="px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              Mini-game
            </a>
            <a
              id="nav-leaderboard-link"
              href="#leaderboard"
              className="px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              Leaderboard
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              id="header-twitter-link"
              href="https://x.com/ghostkid404"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/10 hover:bg-white/15 text-white transition"
              aria-label="Twitter"
            >
              <Twitter className="text-xl" />
            </a>
            <a
              id="header-email-link"
              href="mailto:jeevacation@gmail.com"
              className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/10 hover:bg-white/15 text-white transition"
              aria-label="Email"
            >
              <Mail className="text-xl" />
            </a>
            <a
              id="header-contract-link"
              href="#contract"
              className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-gradient-to-b from-sand-200 to-sand-400 text-slate-900 font-medium shadow-soft-xl hover:brightness-[1.02] transition"
            >
              <Wallet className="text-lg" />
              <span className="text-sm">Contract</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
