import type { Metadata } from "next";
import { Bungee, Nunito } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const bungee = Bungee({
  weight: "400",
  variable: "--font-bungee",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "$CLAWSTEIN | Your Jewish OpenClaw Island Buddy",
  description:
    "$CLAWSTEIN - The Pump.fun token with a lobster mascot. Chat with Clawstein, play the demo game, and join the island.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bungee.variable} ${nunito.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
