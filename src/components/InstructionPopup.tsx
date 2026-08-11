import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INSTRUCTION_POPUP_MS } from "@/config";

interface InstructionPopupProps {
  section: string;
  howTo: string;
  questionNumber: number;
  total: number;
  onDone: () => void;
}

export default function InstructionPopup({
  section,
  howTo,
  questionNumber,
  total,
  onDone,
}: InstructionPopupProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / INSTRUCTION_POPUP_MS) * 100);
      setProgress(pct);
    }, 50);
    const timeout = setTimeout(onDone, INSTRUCTION_POPUP_MS);
    return () => {
      clearInterval(id);
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-indigo-400/30 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 p-7 shadow-[0_0_60px_-10px_rgba(99,102,241,0.55)]"
        >
          <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/80">
            <span>{section}</span>
            <span>
              Ejercicio {questionNumber} / {total}
            </span>
          </div>
          <h3 className="font-display mb-3 text-2xl font-semibold text-indigo-50">
            ¿Cómo resolver este ejercicio?
          </h3>
          <p className="text-base leading-relaxed text-indigo-100/90">{howTo}</p>

          <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-indigo-400 transition-[width] duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-center text-[11px] uppercase tracking-widest text-indigo-300/60">
            El ejercicio comenzará automáticamente
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
