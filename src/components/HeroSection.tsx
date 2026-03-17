"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  Copy,
  ExternalLink,
  MessageCircle,
  Gamepad2,
  ScanFace,
} from "lucide-react";

const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "YDCmRzntPy66k7biaYheudv7Q46wNKgdbBVaubwpump";
const SOLSCAN_URL = `https://solscan.io`;

function CopyButton({
  text,
  onCopy,
}: {
  text: string;
  onCopy: () => void;
}) {
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      onCopy();
    } catch {
      onCopy();
    }
  }, [text, onCopy]);

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-sand-300"
    >
      <Copy className="text-base" />
      Copy
    </button>
  );
}

export default function HeroSection() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("Copied.");
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastVisible(false), 1600);
  }, []);

  useEffect(() => {
    const parallaxEls = document.querySelectorAll("[data-parallax]");
    let lastScrollY = -1;
    let rafId: number;

    function loop() {
      const y = window.scrollY ?? 0;
      if (y !== lastScrollY) {
        lastScrollY = y;
        const clamped = Math.min(y, 700);
        parallaxEls.forEach((el) => {
          const speed = parseFloat(el.getAttribute("data-parallax") ?? "0");
          (el as HTMLElement).style.transform = `translate3d(0, ${clamped * speed}px, 0)`;
        });
      }
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Scene backdrop */}
      <div className="absolute inset-0">
        {/* Sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-50 to-sand-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(255,214,153,0.90),rgba(255,214,153,0)_55%)] opacity-80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(125,211,252,0.55),rgba(125,211,252,0)_52%)] opacity-70" />

        {/* Sun */}
        <div
          className="absolute -top-10 right-6 sm:right-10 md:right-20 will-change-transform motion-safe:animate-[sunPulse_4.5s_ease-in-out_infinite]"
          data-parallax="0.12"
        >
          <div className="relative h-36 w-36 sm:h-44 sm:w-44 rounded-full bg-gradient-to-br from-sand-100 via-sand-300 to-sand-500 shadow-glow-sun" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.95),rgba(255,255,255,0)_55%)] blur-2xl opacity-80" />
        </div>

        {/* Clouds image - scrolling across sky */}
        <div
          className="absolute top-0 left-0 right-0 h-[28%] min-h-[100px] overflow-hidden pointer-events-none"
          data-parallax="0.06"
        >
          <div className="absolute inset-0 flex motion-safe:animate-[cloudsScroll_45s_linear_infinite] will-change-transform">
            <Image
              src="/clouds.png"
              alt=""
              width={1920}
              height={400}
              className="h-full w-auto min-w-full object-contain opacity-90"
              draggable={false}
              aria-hidden
            />
            <Image
              src="/clouds.png"
              alt=""
              width={1920}
              height={400}
              className="h-full w-auto min-w-full object-contain opacity-90 flex-shrink-0"
              draggable={false}
              aria-hidden
            />
          </div>
        </div>

        {/* Ocean */}
        <div className="absolute inset-x-0 bottom-0 top-[46%] bg-gradient-to-b from-ocean-400 to-ocean-700" />

        {/* Wave overlays */}
        <div
          className="absolute inset-x-0 bottom-0 top-[46%] opacity-100 will-change-transform"
          data-parallax="0.03"
        >
          <div className="absolute inset-x-0 -top-2 h-44 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),rgba(255,255,255,0)_55%)] opacity-70" />
          <div className="absolute inset-x-0 top-10 h-40 bg-wave bg-repeat-x motion-safe:animate-[waveMove_10s_linear_infinite] bg-[length:1440px_120px]" />
          <div className="absolute inset-x-0 top-16 h-44 bg-wave2 bg-repeat-x motion-safe:animate-[waveMove_7s_linear_infinite] bg-[length:1440px_120px]" />
          <div className="absolute inset-0 bg-sparkle bg-repeat opacity-60 mix-blend-overlay motion-safe:animate-[sparkleDrift_6.5s_ease-in-out_infinite] bg-[length:180px_180px]" />
          <div className="absolute inset-x-0 top-24 h-56 bg-gradient-to-b from-white/12 to-transparent" />
        </div>

        {/* Shoreline foam */}
        <div
          className="absolute inset-x-0 top-[46%] h-24 bg-gradient-to-b from-white/45 via-white/15 to-transparent blur-[1px] will-change-transform"
          data-parallax="0.02"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-10 sm:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          {/* Left copy */}
          <div className="lg:col-span-7">
            {/* Contract badge */}
            <div
              id="contract"
              className="inline-flex items-center gap-3 rounded-2xl bg-slate-950/85 border border-white/10 px-4 py-3 shadow-soft-xl"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-claw-400 to-claw-700 shadow-glow-contract flex items-center justify-center">
                <BadgeCheck className="text-white text-xl" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-white/60">Contract address</div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    id="contract-text"
                    className="font-mono text-white text-sm sm:text-base tracking-tight"
                  >
                    {CONTRACT_ADDRESS}
                  </span>
                  <CopyButton
                    text={CONTRACT_ADDRESS}
                    onCopy={() =>
                      showToast("Contract copied: " + CONTRACT_ADDRESS)
                    }
                  />
                  <a
                    id="solscan-link"
                    href={SOLSCAN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-b from-sand-200 to-sand-400 text-slate-900 text-sm font-medium hover:brightness-[1.02] transition"
                  >
                    <ExternalLink className="text-base" />
                    View on Solscan
                  </a>
                </div>
              </div>
            </div>

            <h1 className="mt-7 font-display tracking-tight text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              <span className="text-white">$CLAWSTEIN</span>
              <span className="block text-sand-200">
                Tokenized OpenClaw Agent on Pump Fun
              </span>
            </h1>

            <p className="mt-4 text-white/80 text-base sm:text-lg max-w-xl">
              <span className="font-medium text-white">
                Your personal OpenClaw agent;
              </span>
              <span className="text-white/90">
                {" "}
                Jewish Banker & entertainment guide.
              </span>
              <span className="block mt-2 text-white/70">
                Chat with Clawstein, then get ready for the beach hunt.
              </span>
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
              <a
                id="hero-chat-cta"
                href="#chat"
                className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-2xl bg-gradient-to-b from-claw-300 to-claw-600 text-slate-950 font-semibold shadow-soft-xl hover:brightness-[1.03] transition focus:outline-none focus:ring-2 focus:ring-sand-200"
              >
                <MessageCircle className="text-xl" />
                Talk to Clawstein
              </a>
              <a
                id="hero-game-cta"
                href="#game"
                className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-2xl bg-slate-950/85 border border-white/10 text-white font-semibold shadow-soft-xl hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-sand-200"
              >
                <Gamepad2 className="text-xl" />
                Mini-game preview
              </a>
            </div>
          </div>

          {/* Right: Island + Clawstein */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-[400px] sm:h-[520px] md:h-[560px] lg:h-[620px]">
              {/* Island image - sand island base */}
              <div className="absolute inset-x-0 bottom-10 sm:bottom-12 flex justify-center lg:justify-end z-0">
                <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[500px]">
                  <Image
                    src="/island.png"
                    alt="Sand island"
                    width={500}
                    height={280}
                    className="w-full h-auto drop-shadow-[0_20px_60px_rgba(2,6,23,0.4)] select-none object-contain object-bottom"
                    draggable={false}
                    priority
                  />
                </div>
              </div>

              {/* Palm tree - larger */}
              <div className="absolute left-0 sm:left-4 bottom-16 sm:bottom-20 lg:bottom-24 z-10">
                <Image
                  src="/palm_tree.png"
                  alt="Palm tree"
                  width={220}
                  height={320}
                  className="h-64 sm:h-80 lg:h-96 w-auto drop-shadow-[0_16px_32px_rgba(2,6,23,0.35)] select-none object-contain object-bottom"
                  draggable={false}
                />
              </div>

              {/* Clawstein standing on island */}
              <div className="absolute inset-x-0 bottom-8 sm:bottom-10 lg:bottom-12 flex justify-center lg:justify-end z-20">
                <div className="relative w-[260px] sm:w-[320px] md:w-[360px] lg:w-[380px] motion-safe:animate-[floaty_5.5s_ease-in-out_infinite]">
                  <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-b from-slate-950/30 to-slate-950/0 blur-xl" />
                  <Image
                    src="/clawstein_standing.png"
                    alt="Clawstein standing on the beach"
                    width={380}
                    height={520}
                    className="relative w-full h-auto drop-shadow-[0_40px_80px_rgba(2,6,23,0.55)] select-none"
                    draggable={false}
                    priority
                  />
                </div>
              </div>

              {/* OpenClaw Mode card */}
              <div className="absolute right-2 sm:right-6 top-10 sm:top-14">
                <div className="rounded-2xl bg-slate-950/80 border border-white/10 px-4 py-3 shadow-soft-xl">
                  <div className="flex items-center gap-2">
                    <ScanFace className="text-sand-200 text-lg" />
                    <div className="text-white font-semibold text-sm">
                      OpenClaw Mode
                    </div>
                  </div>
                  <div className="mt-1 text-xs text-white/70">
                    Witty, banker-sharp, beach-ready.
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Solscan CTA */}
            <div className="mt-5 sm:hidden">
              <a
                id="solscan-link-mobile"
                href={SOLSCAN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 h-12 px-5 rounded-2xl bg-gradient-to-b from-sand-200 to-sand-400 text-slate-900 font-semibold shadow-soft-xl"
              >
                <ExternalLink className="text-xl" />
                View on Solscan
              </a>
            </div>
          </div>
        </div>

        {/* Toast */}
        <div className="mt-6">
          <div
            id="toast"
            className={`inline-flex items-center gap-2 rounded-2xl bg-slate-950/90 border border-white/10 px-4 py-3 text-white shadow-soft-xl ${
              toastVisible ? "animate-[fadeUp_0.7s_ease-out_both]" : "hidden"
            }`}
          >
            <BadgeCheck className="text-sand-200 text-lg" />
            <span id="toast-text" className="text-sm">
              {toastMessage}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
