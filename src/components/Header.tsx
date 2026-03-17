"use client";

import { useState, useCallback } from "react";
import {
  Clapperboard,
  Twitter,
  Mail,
  Wallet,
  Menu,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { href: "#top", label: "Home" },
  { href: "#chat", label: "Chat" },
  { href: "#game", label: "Mini-game" },
  { href: "#leaderboard", label: "Leaderboard" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

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
              <div className="text-[11px] sm:text-xs text-white/70 leading-tight hidden sm:block">
                OpenClaw agent • banker vibes • beach mischief
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl bg-white/10 hover:bg-white/15 text-white transition"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
          </button>

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

        {mobileOpen && (
          <nav className="md:hidden py-4 border-t border-white/10 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/10 transition"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
