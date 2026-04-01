"use client";

import { Fish, Twitter, Mail, ExternalLink } from "lucide-react";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "0x000000";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-claw-400 to-claw-700 shadow-glow-contract flex items-center justify-center">
                <Fish className="text-white text-xl" />
              </div>
              <div>
                <div className="font-display tracking-tight text-white text-lg">
                  $wifclaw
                </div>
                <div className="text-xs text-white/60">
                  dogwifclaw — your happy beach buddy for solace and comfort
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/70 max-w-md">
              Built as a one-page beach escape: immersive island scene, a cozy
              AI chat, and a coming-soon mini-game preview.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                id="footer-twitter-link"
                href="https://x.com/dogwifclaw_ai"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white hover:bg-white/10 transition"
              >
                <div className="flex items-center gap-2">
                  <Twitter className="text-sand-200 text-lg" />
                  <div className="font-semibold">X</div>
                </div>
                <div className="mt-1 text-xs text-white/60">@dogwifclaw_ai</div>
              </a>
              <a
                id="footer-email-link"
                href="mailto:jeevacation@gmail.com"
                className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white hover:bg-white/10 transition"
              >
                <div className="flex items-center gap-2">
                  <Mail className="text-sand-200 text-lg" />
                  <div className="font-semibold">Email</div>
                </div>
                <div className="mt-1 text-xs text-white/60">
                  jeevacation@gmail.com
                </div>
              </a>
              <a
                id="footer-solscan-link"
                href="https://solscan.io"
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-white hover:bg-white/10 transition"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="text-sand-200 text-lg" />
                  <div className="font-semibold">Contract</div>
                </div>
                <div className="mt-1 text-xs text-white/60">
                  Explorer link (placeholder)
                </div>
              </a>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-white/50">
              <div>
                © {year} $wifclaw. Beach vibes online.
              </div>
              <div className="font-mono text-[11px] sm:text-xs break-all sm:break-normal">
                Contract: {CONTRACT_ADDRESS}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
