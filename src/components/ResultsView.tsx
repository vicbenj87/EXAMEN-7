import { useEffect, useRef, useState } from "react";
import type { AnswerRecord, Participant } from "../types";
import { submitToSheet } from "../lib/submitToSheet";

interface Props {
  participant: Participant;
  answers: AnswerRecord[];
  onRestart: () => void;
}

export default function ResultsView({ participant, answers, onRestart }: Props) {
  const total = answers.length;
  const score = answers.filter((a) => a.isCorrect).length;
  const percentage = Math.round((score / total) * 100);
  const [status, setStatus] = useState<"enviando" | "ok" | "error">("enviando");
  const sentRef = useRef(false);

  useEffect(() => {
    if (sentRef.current) return;
    sentRef.current = true;
    submitToSheet({ participant, score, total, percentage, answers }).then((ok) => {
      setStatus(ok ? "ok" : "error");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let message = "¡Buen intento! Sigue estudiando el libro de Josué.";
  let emoji = "🌘";
  if (percentage >= 90) {
    message = "¡Excelente! Conoces muy bien la conquista de la Tierra Prometida.";
    emoji = "🌕";
  } else if (percentage >= 70) {
    message = "¡Muy bien! Tienes un buen conocimiento del tema.";
    emoji = "🌖";
  } else if (percentage >= 50) {
    message = "Vas por buen camino, repasa un poco más.";
    emoji = "🌗";
  }

  return (
    <div className="animate-fade-in-up flex w-full max-w-2xl flex-col gap-6 rounded-3xl border border-indigo-400/20 bg-white/5 p-6 shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)] backdrop-blur-xl sm:p-9">
      <div className="text-center">
        <div className="animate-floaty text-6xl">{emoji}</div>
        <h2 className="font-display mt-3 text-2xl font-semibold text-indigo-50">
          {participant.nombre} {participant.apellido}
        </h2>
        <p className="text-sm text-indigo-300/80">{participant.ibm}</p>
      </div>

      <div className="flex items-center justify-center gap-8">
        <div className="text-center">
          <p className="font-display text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300">
            {score}/{total}
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest text-indigo-400">Puntaje</p>
        </div>
        <div className="text-center">
          <p className="font-display text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300">
            {percentage}%
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest text-indigo-400">Porcentaje</p>
        </div>
      </div>

      <p className="text-center text-indigo-100">{message}</p>

      <div className="rounded-xl border border-indigo-400/20 bg-indigo-950/30 px-4 py-2 text-center text-xs text-indigo-300/80">
        {status === "enviando" && "Guardando tu registro en la hoja de cálculo…"}
        {status === "ok" && "✔ Registro guardado correctamente."}
        {status === "error" &&
          "⚠ No se pudo confirmar el envío (revisa la configuración de Google Sheets en src/config.ts)."}
      </div>

      <div className="max-h-72 overflow-y-auto rounded-2xl border border-indigo-400/10 bg-slate-950/40 p-2">
        {answers.map((a, i) => (
          <div
            key={a.questionId}
            className={`flex items-start gap-3 rounded-lg px-3 py-2 text-sm ${
              a.isCorrect ? "text-emerald-200" : "text-rose-200"
            }`}
          >
            <span className="mt-0.5">{a.isCorrect ? "✔" : "✘"}</span>
            <div>
              <p className="text-indigo-100/90">
                {i + 1}. {a.questionText}
              </p>
              <p className="text-xs opacity-80">
                Tu respuesta: <strong>{a.selected}</strong>
                {!a.isCorrect && (
                  <>
                    {" "}
                    · Correcta: <strong>{a.correct}</strong>
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:brightness-110 active:scale-[0.98]"
      >
        Registrar otro participante
      </button>
    </div>
  );
}
