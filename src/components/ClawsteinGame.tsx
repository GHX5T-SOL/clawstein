"use client";

import { useEffect, useRef, useState } from "react";
import {
  Rocket,
  Plug,
  Joystick,
  Bug,
  PersonStanding,
  Sparkles,
  Timer,
  Target,
  Swords,
  Wallet,
  Trophy,
  ClipboardList,
  BadgeDollarSign,
} from "lucide-react";

export default function ClawsteinGame() {
  const lobsterRef = useRef<HTMLDivElement>(null);
  const runner1Ref = useRef<HTMLDivElement>(null);
  const runner2Ref = useRef<HTMLDivElement>(null);
  const catchRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const t0Ref = useRef(0);
  const scoreState = useRef(0);
  const [showCatch, setShowCatch] = useState(false);

  useEffect(() => {
    t0Ref.current = performance.now();
    const width = 520;

    function setTransform(
      el: HTMLDivElement | null,
      x: number
    ) {
      if (el) el.style.transform = `translateX(${x}px)`;
    }

    function tick(now: number) {
      const dt = (now - t0Ref.current) / 1000;
      const lobX = 12 + ((Math.sin(dt * 1.25) + 1) * 40);
      const r1X = -((dt * 70) % width);
      const r2X = -(((dt * 55) + 220) % width);

      setTransform(lobsterRef.current, lobX);
      setTransform(runner1Ref.current, r1X);
      setTransform(runner2Ref.current, r2X);

      const near = Math.abs(lobX - Math.abs(r1X)) < 80;
      if (near && Math.floor(dt * 10) % 10 === 0) {
        scoreState.current = Math.min(999, scoreState.current + 5);
        if (scoreRef.current)
          scoreRef.current.textContent = String(
            scoreState.current
          ).padStart(3, "0");
        setShowCatch(true);
        setTimeout(() => setShowCatch(false), 420);
      }

      requestAnimationFrame(tick);
    }
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section id="game" className="relative scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-end justify-between gap-4 flex-col md:flex-row">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-white/80 text-xs">
              <Rocket className="text-sand-200" />
              Coming soon
            </div>
            <h2 className="mt-4 font-display tracking-tight text-white text-3xl sm:text-4xl">
              Lobster Beach Dash
            </h2>
            <p className="mt-3 text-white/75 max-w-2xl">
              Play as a lobster. Catch beachgoers. Climb the leaderboard.
              <span className="text-white/60">
                {" "}
                Wallet-connected, token-gated chaos.
              </span>
            </p>
          </div>
          <div className="w-full md:w-auto">
            <button
              type="button"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 h-12 px-5 rounded-2xl bg-white/10 border border-white/10 text-white font-semibold hover:bg-white/15 transition focus:outline-none focus:ring-2 focus:ring-sand-200 disabled:opacity-50"
              aria-label="Connect wallet coming soon"
              disabled
            >
              <Plug className="text-xl" />
              Connect Solana Wallet (soon)
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Game window */}
          <div className="lg:col-span-7 rounded-3xl bg-white/5 border border-white/10 shadow-soft-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 bg-slate-950">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Joystick className="text-sand-200 text-xl" />
                  <div>
                    <div className="text-white font-semibold">
                      Gameplay Preview
                    </div>
                    <div className="text-xs text-white/60">
                      Tiny animated demo • not playable yet
                    </div>
                  </div>
                </div>
                <div className="text-xs text-white/60">WASD / Touch (concept)</div>
              </div>
            </div>

            <div className="p-5">
              <div className="rounded-3xl bg-gradient-to-b from-ocean-400 to-ocean-700 border border-white/10 overflow-hidden shadow-soft-xl">
                <div className="relative h-[280px] sm:h-[320px]">
                  {/* Sky overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-ocean-300/60 via-sky-200/20 to-sand-200/15" />
                  {/* Sand strip */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-sand-100 to-sand-400" />
                  {/* Foam */}
                  <div className="absolute inset-x-0 bottom-20 h-10 bg-gradient-to-b from-white/40 to-transparent" />
                  {/* Waves */}
                  <div className="absolute inset-x-0 bottom-16 h-24 bg-wave bg-repeat-x opacity-80 motion-safe:animate-[waveMove_10s_linear_infinite] bg-[length:1440px_120px]" />

                  {/* Characters */}
                  <div className="absolute left-0 right-0 top-0 bottom-0">
                    <div
                      id="demo-lobster"
                      ref={lobsterRef}
                      className="absolute bottom-10 left-6 flex items-center gap-2"
                    >
                      <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-claw-300 to-claw-600 shadow-soft-xl flex items-center justify-center">
                        <Bug className="text-slate-950 text-xl" />
                      </div>
                      <div className="text-xs text-white/90 font-semibold">
                        Lobster
                      </div>
                    </div>

                    <div
                      id="demo-runner-1"
                      ref={runner1Ref}
                      className="absolute bottom-12 right-10 flex items-center gap-2"
                    >
                      <div className="h-9 w-9 rounded-2xl bg-white/90 shadow-soft-xl flex items-center justify-center">
                        <PersonStanding className="text-slate-900 text-lg" />
                      </div>
                      <div className="text-xs text-white/90 font-semibold">
                        Beachgoer
                      </div>
                    </div>

                    <div
                      id="demo-runner-2"
                      ref={runner2Ref}
                      className="absolute bottom-12 right-40 hidden sm:flex items-center gap-2"
                    >
                      <div className="h-9 w-9 rounded-2xl bg-white/85 shadow-soft-xl flex items-center justify-center">
                        <PersonStanding className="text-slate-900 text-lg" />
                      </div>
                      <div className="text-xs text-white/90 font-semibold">
                        Beachgoer
                      </div>
                    </div>

                    {/* Catch indicator */}
                    <div
                      id="demo-catch"
                      ref={catchRef}
                      className={`absolute bottom-24 left-24 rounded-2xl bg-slate-950/80 border border-white/10 px-4 py-2 text-white shadow-soft-xl ${
                        showCatch ? "" : "hidden"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="text-sand-200" />
                        <div className="text-sm font-semibold">Caught!</div>
                      </div>
                    </div>
                  </div>

                  {/* UI overlay */}
                  <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                    <div className="rounded-2xl bg-slate-950/70 border border-white/10 px-3 py-2 text-white text-xs flex items-center gap-2">
                      <Timer className="text-sand-200" />
                      <span>Match: 60s</span>
                    </div>
                    <div className="rounded-2xl bg-slate-950/70 border border-white/10 px-3 py-2 text-white text-xs flex items-center gap-2">
                      <Target className="text-sand-200" />
                      <span>
                        Score:{" "}
                        <span
                          id="demo-score"
                          ref={scoreRef}
                          className="font-mono"
                        >
                          000
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Shimmer */}
                  <div className="pointer-events-none absolute -inset-y-10 -left-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-18deg] opacity-70 motion-safe:animate-[shimmer_2.2s_ease-in-out_infinite]" />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-950/70 border border-white/10 p-4">
                  <div className="flex items-center gap-2 text-white">
                    <Bug className="text-sand-200 text-lg" />
                    <div className="font-semibold">Play as: Lobster</div>
                  </div>
                  <div className="mt-1 text-xs text-white/70">
                    Pinch & dash. Fast movement, silly collisions.
                  </div>
                </div>
                <div className="rounded-2xl bg-slate-950/70 border border-white/10 p-4">
                  <div className="flex items-center gap-2 text-white">
                    <BadgeDollarSign className="text-sand-200 text-lg" />
                    <div className="font-semibold">Rewards</div>
                  </div>
                  <div className="mt-1 text-xs text-white/70">
                    Top 5 automatically win token rewards.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Requirements panel */}
          <div className="lg:col-span-5 rounded-3xl bg-white/5 border border-white/10 shadow-soft-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 bg-slate-950">
              <div className="flex items-center gap-2">
                <ClipboardList className="text-sand-200 text-xl" />
                <div>
                  <div className="text-white font-semibold">How it works</div>
                  <div className="text-xs text-white/60">
                    Token-gated • wallet-powered • leaderboard-driven
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="rounded-2xl bg-slate-950/70 border border-white/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-white">
                    <Swords className="text-sand-200 text-lg" />
                    <div className="font-semibold">Objective</div>
                  </div>
                  <div className="text-xs text-white/70">Catch beachgoers</div>
                </div>
                <div className="mt-2 text-sm text-white/80">
                  Hunt, tag, and rack up score streaks on the sand.
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950/70 border border-white/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-white">
                    <Wallet className="text-sand-200 text-lg" />
                    <div className="font-semibold">Requirements</div>
                  </div>
                  <div className="text-xs text-white/70">
                    Solana wallet + tokens
                  </div>
                </div>

                <ul className="mt-3 space-y-2 text-sm text-white/80">
                  <li className="flex items-start gap-2">
                    <span className="text-sand-200 text-lg mt-0.5">•</span>
                    <span>
                      <span className="font-semibold text-white">Wallet:</span>{" "}
                      Solana wallet connected
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sand-200 text-lg mt-0.5">•</span>
                    <span>
                      <span className="font-semibold text-white">
                        Min holding:
                      </span>{" "}
                      at least{" "}
                      <span className="font-mono">1,000,000</span> $CLAWSTEIN
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sand-200 text-lg mt-0.5">•</span>
                    <span>
                      <span className="font-semibold text-white">
                        Leaderboard:
                      </span>{" "}
                      wallet addresses displayed
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl bg-gradient-to-b from-claw-300/20 to-white/5 border border-white/10 p-4">
                <div className="flex items-center gap-2 text-white">
                  <Trophy className="text-sand-200 text-lg" />
                  <div className="font-semibold">Top 5 auto-win</div>
                </div>
                <div className="mt-2 text-sm text-white/80">
                  Score highest, end of round → automatic token distribution to
                  the top 5 wallets.
                </div>
              </div>

              <div className="pt-2 text-xs text-white/60">
                Live gameplay + wallet checks will be implemented at launch.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
