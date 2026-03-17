"use client";

import { useCallback } from "react";

const CONTRACT_ADDRESS = "0x00000";

function CopyButton({ text }: { text: string }) {
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <button
      onClick={copy}
      className="rounded-xl bg-amber-500/90 px-6 py-3 font-mono text-sm font-bold text-gray-900 transition hover:bg-amber-400"
      title="Copy"
    >
      {text}
    </button>
  );
}

export default function TokenSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-2xl border-2 border-amber-400/50 bg-sky-900/80 p-8 backdrop-blur">
          <h2 className="mb-6 text-center font-[family-name:var(--font-bungee)] text-3xl text-amber-200">
            $CLAWSTEIN Token
          </h2>
          <div className="mb-6 flex flex-col items-center gap-4">
            <p className="text-center text-amber-100">Contract Address</p>
            <CopyButton text={CONTRACT_ADDRESS} />
          </div>
          <p className="mb-6 text-center text-amber-200/80">
            OpenClaw agent token. Demo game coming soon — play as Lobster Clawstein on the beach. Winners win tokens.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-rose-500 px-6 py-3 font-semibold text-white transition hover:bg-rose-600"
            >
              Pump.fun
            </a>
            <a
              href="https://solscan.io"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border-2 border-amber-400 bg-amber-400/20 px-6 py-3 font-semibold text-amber-100 transition hover:bg-amber-400/40"
            >
              Solscan
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
