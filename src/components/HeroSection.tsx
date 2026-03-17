"use client";

import { useCallback } from "react";
import Image from "next/image";

const CONTRACT_ADDRESS = "0x00000";

function CopyButton({ text }: { text: string }) {
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <button
      onClick={copy}
      className="rounded-full bg-amber-400/90 px-6 py-3 font-mono text-sm font-bold text-gray-900 shadow-lg transition-all hover:bg-amber-300 hover:scale-105"
      title="Copy contract address"
    >
      {text}
    </button>
  );
}

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="animate-fade-in flex flex-col items-center gap-4">
          <Image
            src="/clawstein.png"
            alt="Clawstein"
            width={200}
            height={240}
            className="drop-shadow-2xl"
            priority
          />
          <h1 className="font-[family-name:var(--font-bungee)] text-6xl font-bold tracking-tight text-white drop-shadow-lg md:text-8xl">
            $CLAWSTEIN
          </h1>
          <p className="max-w-md text-xl text-amber-100 md:text-2xl">
            Your Jewish OpenClaw island buddy
          </p>
        </div>

        <div className="mt-4 flex flex-col items-center gap-4">
          <CopyButton text={CONTRACT_ADDRESS} />
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => scrollTo("chat")}
              className="rounded-full bg-rose-500 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-rose-600 hover:scale-105"
            >
              Chat with Clawstein
            </button>
            <button
              onClick={() => scrollTo("game")}
              className="rounded-full border-2 border-amber-400 bg-amber-400/20 px-8 py-3 font-semibold text-amber-100 backdrop-blur transition-all hover:bg-amber-400/40 hover:scale-105"
            >
              Play Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
