export default function Footer() {
  return (
    <footer className="border-t border-amber-400/30 bg-sky-950/80 py-12">
      <div className="mx-auto max-w-2xl px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://x.com/ghostkid404"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-200 transition hover:text-amber-400"
            >
              X (Twitter)
            </a>
            <a
              href="mailto:jeevacation@gmail.com"
              className="text-amber-200 transition hover:text-amber-400"
            >
              Email
            </a>
          </div>
          <p className="text-sm text-amber-200/70">
            Full game coming soon. $CLAWSTEIN — Your Jewish OpenClaw island buddy.
          </p>
        </div>
      </div>
    </footer>
  );
}
