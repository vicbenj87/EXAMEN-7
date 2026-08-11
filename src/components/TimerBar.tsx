import { useCountdown } from "@/hooks/useCountdown";

interface TimerBarProps {
  durationMs: number;
  active: boolean;
  resetKey: unknown;
  onComplete: () => void;
}

export default function TimerBar({ durationMs, active, resetKey, onComplete }: TimerBarProps) {
  const remaining = useCountdown(durationMs, active, onComplete, resetKey);
  const pct = Math.max(0, Math.min(100, (remaining / durationMs) * 100));
  const seconds = Math.ceil(remaining / 1000);
  const urgent = pct <= 25;

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-indigo-200/70">
        <span>Tiempo restante</span>
        <span className={urgent ? "text-rose-300" : "text-indigo-200"}>{seconds}s</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-indigo-950/60 ring-1 ring-inset ring-white/10">
        <div
          className={`h-full rounded-full transition-[width] duration-150 ease-linear ${
            urgent
              ? "bg-gradient-to-r from-rose-500 to-orange-400"
              : "bg-gradient-to-r from-emerald-400 to-indigo-400"
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
