"use client";

export default function BackgroundLayers() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-300 to-sky-400" />

      {/* Realistic clouds - cumulus shapes with SVG */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[12%] -left-20 w-full animate-cloud" style={{ animationDuration: "50s" }}>
          <svg viewBox="0 0 400 80" className="h-24 w-[600px] opacity-92 md:w-[800px]">
            <defs>
              <filter id="cloud-blur-a" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
              </filter>
            </defs>
            <g filter="url(#cloud-blur-a)">
              <ellipse cx="80" cy="45" rx="50" ry="22" fill="white" fillOpacity="0.95" />
              <ellipse cx="120" cy="38" rx="35" ry="18" fill="white" fillOpacity="0.9" />
              <ellipse cx="160" cy="48" rx="45" ry="20" fill="white" fillOpacity="0.92" />
              <ellipse cx="200" cy="42" rx="40" ry="19" fill="white" fillOpacity="0.93" />
            </g>
          </svg>
        </div>
        <div className="absolute top-[25%] -left-20 w-full animate-cloud" style={{ animationDuration: "55s", animationDelay: "-10s" }}>
          <svg viewBox="0 0 350 70" className="h-20 w-[500px] opacity-85 md:w-[700px]">
            <ellipse cx="60" cy="38" rx="42" ry="18" fill="white" fillOpacity="0.93" />
            <ellipse cx="100" cy="32" rx="30" ry="14" fill="white" fillOpacity="0.9" />
            <ellipse cx="140" cy="40" rx="38" ry="16" fill="white" fillOpacity="0.92" />
          </svg>
        </div>
        <div className="absolute top-[8%] -right-40 w-full animate-cloud-reverse" style={{ animationDuration: "48s", animationDelay: "-20s" }}>
          <svg viewBox="0 0 300 60" className="h-16 w-[450px] opacity-88 md:w-[600px]">
            <ellipse cx="70" cy="32" rx="45" ry="18" fill="white" fillOpacity="0.94" />
            <ellipse cx="120" cy="28" rx="35" ry="15" fill="white" fillOpacity="0.91" />
            <ellipse cx="165" cy="35" rx="40" ry="17" fill="white" fillOpacity="0.92" />
          </svg>
        </div>
        <div className="absolute top-[35%] -left-10 w-full animate-cloud" style={{ animationDuration: "60s", animationDelay: "-30s" }}>
          <svg viewBox="0 0 250 50" className="h-12 w-[380px] opacity-80 md:w-[500px]">
            <ellipse cx="50" cy="28" rx="35" ry="14" fill="white" fillOpacity="0.9" />
            <ellipse cx="90" cy="24" rx="28" ry="12" fill="white" fillOpacity="0.88" />
            <ellipse cx="125" cy="30" rx="32" ry="13" fill="white" fillOpacity="0.89" />
          </svg>
        </div>
      </div>

      {/* Ocean with realistic waves */}
      <div className="absolute bottom-0 left-0 right-0 h-[42%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c4a6e] via-[#0369a1] to-[#0ea5e9]" />
        <svg className="absolute bottom-0 w-[400%] animate-wave-slow" preserveAspectRatio="none" style={{ height: "120%", animationDuration: "8s" }}>
          <defs>
            <linearGradient id="wave-fill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M0 60 Q50 40 100 60 T200 60 T300 60 T400 60 T500 60 T600 60 T700 60 T800 60 T900 60 T1000 60 T1100 60 T1200 60 T1300 60 T1400 60 T1500 60 T1600 60 V100 H0 Z"
            fill="url(#wave-fill)"
            className="animate-wave-path"
          />
        </svg>
        <svg className="absolute bottom-0 w-[300%] animate-wave-medium" preserveAspectRatio="none" style={{ height: "100%", animationDuration: "6s", animationDelay: "0.5s" }}>
          <path
            d="M0 70 Q100 50 200 70 T400 70 T600 70 T800 70 T1000 70 T1200 70 V100 H0 Z"
            fill="rgba(255,255,255,0.15)"
            className="animate-wave-path-alt"
          />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-amber-200/30 to-transparent" />
      </div>

      {/* Sand / Beach with texture */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] overflow-hidden">
        <div className="absolute inset-0 bg-[#fef3c7]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 180" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sand-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="50%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#fcd34d" />
            </linearGradient>
          </defs>
          <path d="M0,180 Q200,60 400,100 T800,80 T1200,110 L1200,180 Z" fill="url(#sand-grad)" />
        </svg>
      </div>

      {/* Realistic palm trees with fronds */}
      <div className="absolute bottom-[40%] left-[3%]">
        <svg width="100" height="140" viewBox="0 0 100 140" className="animate-palm-sway" style={{ animationDuration: "4s" }}>
          <defs>
            <linearGradient id="trunk" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="50%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>
          <rect x="42" y="40" width="16" height="100" rx="2" fill="url(#trunk)" />
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const cx = 50 + 35 * Math.cos(angle);
            const cy = 45 + 35 * Math.sin(angle);
            return (
              <ellipse key={i} cx={cx} cy={cy} rx="18" ry="8" fill="#14532d" fillOpacity="0.9" className="animate-frond" style={{ animationDelay: `${i * 0.1}s` }} />
            );
          })}
        </svg>
      </div>
      <div className="absolute bottom-[38%] right-[5%] scale-95">
        <svg width="100" height="140" viewBox="0 0 100 140" className="animate-palm-sway" style={{ animationDuration: "4.5s", animationDelay: "0.3s" }}>
          <rect x="42" y="40" width="16" height="100" rx="2" fill="#92400e" />
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const cx = 50 + 35 * Math.cos(angle);
            const cy = 45 + 35 * Math.sin(angle);
            return (
              <ellipse key={i} cx={cx} cy={cy} rx="18" ry="8" fill="#166534" fillOpacity="0.85" />
            );
          })}
        </svg>
      </div>
      <div className="absolute bottom-[42%] left-[22%] scale-75 opacity-90">
        <svg width="100" height="140" viewBox="0 0 100 140" className="animate-palm-sway" style={{ animationDuration: "3.8s", animationDelay: "0.6s" }}>
          <rect x="42" y="40" width="16" height="100" rx="2" fill="#78350f" />
          {[...Array(6)].map((_, i) => {
            const angle = (i * 60 * Math.PI) / 180;
            const cx = 50 + 30 * Math.cos(angle);
            const cy = 45 + 30 * Math.sin(angle);
            return <ellipse key={i} cx={cx} cy={cy} rx="14" ry="6" fill="#15803d" fillOpacity="0.8" />;
          })}
        </svg>
      </div>
      <div className="absolute bottom-[39%] right-[20%] scale-80 opacity-88">
        <svg width="100" height="140" viewBox="0 0 100 140" className="animate-palm-sway" style={{ animationDuration: "4.2s", animationDelay: "0.2s" }}>
          <rect x="42" y="40" width="16" height="100" rx="2" fill="#92400e" />
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const cx = 50 + 32 * Math.cos(angle);
            const cy = 45 + 32 * Math.sin(angle);
            return <ellipse key={i} cx={cx} cy={cy} rx="16" ry="7" fill="#14532d" fillOpacity="0.88" />;
          })}
        </svg>
      </div>
    </div>
  );
}
