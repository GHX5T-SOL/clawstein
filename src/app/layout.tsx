import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "$wifclaw | Your Cheerful Beach Buddy",
  description:
    "$wifclaw — dogwifclaw, your happy beach buddy bringing comfort, calm vibes, and fun. Say hi, get a little solace, and catch the sunshine.",
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
