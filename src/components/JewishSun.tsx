"use client";

export default function JewishSun() {
  return (
    <div className="fixed right-6 top-6 z-50 md:right-10 md:top-10">
      <div className="relative animate-sun-glow">
        <svg width="96" height="96" viewBox="0 0 96 96" className="drop-shadow-2xl">
          <defs>
            <radialGradient id="sun-core">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="40%" stopColor="#fde047" />
              <stop offset="70%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </radialGradient>
            <filter id="sun-glow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Glow halo */}
          <circle cx="48" cy="48" r="42" fill="url(#sun-core)" opacity="0.4" filter="url(#sun-glow)" />
          {/* Sun rays - more numerous, softer */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180;
            const x1 = 48 + 28 * Math.cos(angle);
            const y1 = 48 + 28 * Math.sin(angle);
            const x2 = 48 + 44 * Math.cos(angle);
            const y2 = 48 + 44 * Math.sin(angle);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#sun-core)"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.9"
                className="animate-sun-ray"
              />
            );
          })}
          {/* Main sun body */}
          <circle cx="48" cy="48" r="26" fill="url(#sun-core)" stroke="#f59e0b" strokeWidth="1.5" filter="url(#sun-glow)" />
          {/* Smiling mouth */}
          <path
            d="M34 54 Q48 62 62 54"
            fill="none"
            stroke="#92400e"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Eyes */}
          <circle cx="40" cy="46" r="3.5" fill="#78350f" />
          <circle cx="56" cy="46" r="3.5" fill="#78350f" />
          <circle cx="41" cy="45" r="1" fill="white" />
          <circle cx="57" cy="45" r="1" fill="white" />
        </svg>
      </div>
    </div>
  );
}
