import { useMemo } from "react";

interface Star {
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2.2 + 0.6,
    delay: Math.random() * 6,
    duration: Math.random() * 3 + 2.5,
  }));
}

export default function NightBackground() {
  const stars = useMemo(() => makeStars(140), []);
  const bigStars = useMemo(() => makeStars(18), []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[radial-gradient(ellipse_at_top,_#1b2a52_0%,_#0b1029_45%,_#05070f_100%)]">
      {/* nebulosas suaves */}
      <div className="absolute -left-40 top-[-10%] h-[38rem] w-[38rem] rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="absolute right-[-10%] top-1/3 h-[30rem] w-[30rem] rounded-full bg-fuchsia-600/10 blur-[130px]" />
      <div className="absolute bottom-[-15%] left-1/4 h-[34rem] w-[34rem] rounded-full bg-cyan-500/10 blur-[140px]" />

      {/* luna */}
      <div className="absolute right-10 top-10 h-24 w-24 rounded-full bg-gradient-to-br from-slate-100 to-indigo-200 shadow-[0_0_60px_18px_rgba(199,210,254,0.35)] sm:h-32 sm:w-32">
        <div className="absolute left-6 top-8 h-4 w-4 rounded-full bg-indigo-200/40" />
        <div className="absolute left-14 top-4 h-6 w-6 rounded-full bg-indigo-200/30" />
        <div className="absolute left-9 top-16 h-3 w-3 rounded-full bg-indigo-200/30" />
      </div>

      {/* silueta de montañas / colina */}
      <svg
        className="absolute bottom-0 left-0 h-40 w-full text-[#05070f] opacity-90 sm:h-56"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,224 C160,260 320,150 480,160 C640,170 720,260 880,250 C1040,240 1120,140 1280,150 C1360,155 1400,190 1440,210 L1440,320 L0,320 Z"
        />
      </svg>

      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: 0.7,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      {bigStars.map((s, i) => (
        <span
          key={`big-${i}`}
          className="absolute rounded-full bg-indigo-100 shadow-[0_0_6px_2px_rgba(199,210,254,0.6)]"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size + 1.5}px`,
            height: `${s.size + 1.5}px`,
            animation: `twinkle ${s.duration + 1}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
