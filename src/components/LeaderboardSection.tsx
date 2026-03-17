"use client";

import { BarChart3, Trophy } from "lucide-react";

const MOCK_LEADERBOARD = [
  { rank: 1, wallet: "9nQp…e4kZ", score: "12,840", tokens: "250,000" },
  { rank: 2, wallet: "4mTg…p2Vw", score: "11,995", tokens: "150,000" },
  { rank: 3, wallet: "Hk8A…1sQd", score: "10,210", tokens: "100,000" },
  { rank: 4, wallet: "2bYo…A8nR", score: "9,740", tokens: "75,000" },
  { rank: 5, wallet: "Cw1k…x0Lm", score: "8,965", tokens: "50,000" },
];

export default function LeaderboardSection() {
  return (
    <section id="leaderboard" className="relative scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14 sm:pb-20">
        <div className="flex items-end justify-between gap-4 flex-col md:flex-row">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-white/80 text-xs">
              <BarChart3 className="text-sand-200" />
              Preview
            </div>
            <h2 className="mt-4 font-display tracking-tight text-white text-3xl sm:text-4xl">
              Leaderboard (mock)
            </h2>
            <p className="mt-3 text-white/75">
              Wallet addresses will be displayed. Top 5 automatically win token
              rewards.
            </p>
          </div>
          <div className="text-xs text-white/60">
            Note: Live leaderboard activates at game launch.
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-white/5 border border-white/10 shadow-soft-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10 bg-slate-950">
            <div className="flex items-center gap-2">
              <Trophy className="text-sand-200 text-xl" />
              <div className="text-white font-semibold">Top 5</div>
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="min-w-[420px] w-full text-left text-sm">
              <thead className="bg-slate-950/60">
                <tr className="text-white/70 text-xs">
                  <th className="px-4 sm:px-5 py-3 sm:py-4 font-semibold">Rank</th>
                  <th className="px-4 sm:px-5 py-3 sm:py-4 font-semibold">Wallet</th>
                  <th className="px-4 sm:px-5 py-3 sm:py-4 font-semibold">Score</th>
                  <th className="px-4 sm:px-5 py-3 sm:py-4 font-semibold">Tokens</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {MOCK_LEADERBOARD.map((row) => (
                  <tr key={row.rank} className="text-white">
                    <td className="px-4 sm:px-5 py-3 sm:py-4 font-semibold">#{row.rank}</td>
                    <td className="px-4 sm:px-5 py-3 sm:py-4 font-mono text-xs sm:text-sm">{row.wallet}</td>
                    <td className="px-4 sm:px-5 py-3 sm:py-4 font-mono">{row.score}</td>
                    <td className="px-4 sm:px-5 py-3 sm:py-4 font-mono text-sand-200">
                      {row.tokens}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-4 bg-slate-950/40 border-t border-white/10 text-xs text-white/60">
            Live mode will show verified wallet addresses and on-chain reward
            distribution rules.
          </div>
        </div>
      </div>
    </section>
  );
}
