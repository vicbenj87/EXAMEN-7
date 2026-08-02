import { useState } from "react";
import { QUESTIONS } from "../data/questions";
import type { AnswerRecord } from "../types";

interface Props {
  onFinish: (answers: AnswerRecord[]) => void;
  onSelect: (isCorrect: boolean) => void;
  onClick: () => void;
}

export default function ExamView({ onFinish, onSelect, onClick }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const question = QUESTIONS[index];
  const progress = ((index + (selected ? 1 : 0)) / QUESTIONS.length) * 100;

  function handleChoose(option: string) {
    if (selected) return;
    setSelected(option);
    onSelect(option === question.correct);
  }

  function handleNext() {
    if (!selected) return;
    onClick();
    const record: AnswerRecord = {
      questionId: question.id,
      questionText: question.text,
      selected,
      correct: question.correct,
      isCorrect: selected === question.correct,
    };
    const updated = [...answers, record];
    setAnswers(updated);

    if (index + 1 < QUESTIONS.length) {
      setIndex(index + 1);
      setSelected(null);
    } else {
      onFinish(updated);
    }
  }

  return (
    <div className="animate-fade-in-up flex w-full max-w-2xl flex-col gap-6 rounded-3xl border border-indigo-400/20 bg-white/5 p-6 shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)] backdrop-blur-xl sm:p-9">
      <div>
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-indigo-300">
          <span>
            Pregunta {index + 1} de {QUESTIONS.length}
          </span>
          <span className="uppercase tracking-widest text-indigo-400">
            {question.type === "completar" ? "Completa" : "Selección múltiple"}
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-indigo-950/70">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <h2 className="text-lg font-medium leading-relaxed text-indigo-50 sm:text-xl">
        {question.text}
      </h2>

      <div className="flex flex-col gap-3">
        {question.options.map((opt, i) => {
          const isSelected = selected === opt;
          const isCorrectOpt = selected && opt === question.correct;
          const isWrongSelected = isSelected && opt !== question.correct;
          return (
            <button
              key={opt}
              onClick={() => handleChoose(opt)}
              disabled={!!selected}
              className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-indigo-50 transition
                ${
                  isCorrectOpt
                    ? "border-emerald-400/70 bg-emerald-400/10"
                    : isWrongSelected
                    ? "border-rose-400/70 bg-rose-400/10"
                    : "border-indigo-400/20 bg-slate-900/50 hover:border-indigo-300/50 hover:bg-indigo-900/30"
                }
                ${selected ? "cursor-default" : "cursor-pointer"}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-indigo-400/40 text-xs font-semibold text-indigo-200 group-hover:border-indigo-200">
                {String.fromCharCode(97 + i)}
              </span>
              <span className="text-sm sm:text-base">{opt}</span>
              {isCorrectOpt && <span className="ml-auto text-emerald-300">✔</span>}
              {isWrongSelected && <span className="ml-auto text-rose-300">✘</span>}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={!selected}
        className="mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-900/40 transition enabled:hover:brightness-110 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {index + 1 < QUESTIONS.length ? "Siguiente pregunta →" : "Finalizar examen ✦"}
      </button>
    </div>
  );
}
