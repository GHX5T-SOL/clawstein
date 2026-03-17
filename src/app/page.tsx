"use client";

import { use } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClawsteinChat from "@/components/ClawsteinChat";
import ClawsteinGame from "@/components/ClawsteinGame";
import LeaderboardSection from "@/components/LeaderboardSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

type PageProps = {
  params?: Promise<Record<string, string | string[]>>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default function Home(props: PageProps) {
  // Unwrap Next.js 16 async props to avoid sync-dynamic-apis errors
  use(props.params ?? Promise.resolve({}));
  use(props.searchParams ?? Promise.resolve({}));
  return (
    <div className="min-h-screen font-body text-slate-900 bg-slate-950">
      {/* Decorative background grain */}
      <div
        className="pointer-events-none fixed inset-0 bg-noise opacity-30 mix-blend-soft-light bg-[length:140px_140px]"
        aria-hidden
      />

      <Header />

      <main id="top" className="relative">
        <HeroSection />

        <ScrollReveal>
          <ClawsteinChat />
        </ScrollReveal>

        <ScrollReveal>
          <ClawsteinGame />
        </ScrollReveal>

        <ScrollReveal>
          <LeaderboardSection />
        </ScrollReveal>

        <Footer />
      </main>
    </div>
  );
}
