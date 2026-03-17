import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "$CLAWSTEIN | Your Personal Jewish Banker & Entertainment Guide",
  description:
    "$CLAWSTEIN - OpenClaw agent. The Pump.fun token with a lobster mascot. Chat with Clawstein, your personal Jewish Banker & entertainment guide.",
  icons: {
    icon: "/clawstein.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,500&f[]=satoshi@400,500,700&f[]=jetbrains-mono@400,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-body bg-slate-950 text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
