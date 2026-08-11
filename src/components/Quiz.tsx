import { useEffect, useRef, useState } from "react";
import type { Answer, QuizConfig } from "../types";

interface Props {
  config: QuizConfig;
  onFinish: (answers: Answer[]) => void;
}

export default function Quiz({ config, onFinish }: Props) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const question = config.preguntas[current];
  const total = question.tiempo || config.tiempoPorDefecto;
  const [timeLeft, setTimeLeft] = useState(total);
  const intervalRef = useRef<number | null>(null);
  const answersRef = useRef<Answer[]>([]);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  useEffect(() => {
    setTimeLeft(total);
    setSelected(null);
    setLocked(false);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          window.clearInterval(intervalRef.current!);
          handleSelect(null, true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  function handleSelect(index: number | null, timeUp: boolean) {
    setLocked((wasLocked) => {
      if (wasLocked) return wasLocked;
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      const correct = !timeUp && index === question.correcta;
      setSelected(index);
      const newAnswers = [...answersRef.current, { selected: index, correct, timeUp }];
      setAnswers(newAnswers);
      answersRef.current = newAnswers;

      window.setTimeout(() => {
        if (current < config.preguntas.length - 1) {
          setCurrent((c) => c + 1);
        } else {
          onFinish(newAnswers);
        }
      }, 900);
      return true;
    });
  }

  const pct = Math.max(0, (timeLeft / total) * 100);
  const correctSoFar = answers.filter((a) => a.correct).length;

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)] backdrop-blur-xl sm:p-9">
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <span className="rounded-full bg-indigo-500/15 px-3 py-1 font-semibold uppercase tracking-widest text-indigo-200">
          Pregunta {current + 1} de {config.preguntas.length}
        </span>
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 font-semibold uppercase tracking-widest text-emerald-200">
          Aciertos: {correctSoFar}
        </span>
      </div>

      <div className="font-display mt-5 text-center text-2xl font-bold text-amber-300">
        {timeLeft}s
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 transition-[width] duration-1000 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </div>

      <h2 className="font-display mt-6 text-lg leading-snug font-semibold text-indigo-50 sm:text-xl">
        {question.pregunta}
      </h2>

      <div className="mt-5 space-y-2.5">
        {question.opciones.map((opcion, i) => {
          let cls =
            "w-full rounded-2xl border px-4 py-3 text-left text-sm sm:text-base transition border-white/15 bg-white/5 text-indigo-100 hover:border-indigo-300/50 hover:bg-indigo-900/30";
          if (locked) {
            if (i === question.correcta) {
              cls =
                "w-full rounded-2xl border px-4 py-3 text-left text-sm sm:text-base border-emerald-400/60 bg-emerald-500/20 text-emerald-200";
            } else if (i === selected) {
              cls =
                "w-full rounded-2xl border px-4 py-3 text-left text-sm sm:text-base border-rose-400/60 bg-rose-500/20 text-rose-200";
            } else {
              cls =
                "w-full rounded-2xl border px-4 py-3 text-left text-sm sm:text-base border-white/10 bg-white/5 text-indigo-300/60";
            }
          }
          return (
            <button
              key={i}
              disabled={locked}
              onClick={() => handleSelect(i, false)}
              className={cls + " disabled:cursor-not-allowed"}
            >
              {opcion}
            </button>
          );
        })}
      </div>
    </div>
  );
}
