"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import ClawsteinGame from "@/components/ClawsteinGame";
import ClawsteinChat from "@/components/ClawsteinChat";
import TokenSection from "@/components/TokenSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const IslandScene = dynamic(() => import("@/components/IslandScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-400 to-sky-700" />
  ),
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-sky-500 via-sky-600 to-sky-800">
      <IslandScene />
      <HeroSection />
      <ScrollReveal>
        <ClawsteinGame />
      </ScrollReveal>
      <ScrollReveal>
        <ClawsteinChat />
      </ScrollReveal>
      <ScrollReveal>
        <TokenSection />
      </ScrollReveal>
      <Footer />
    </main>
  );
}
