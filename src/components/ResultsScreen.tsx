import { motion } from "framer-motion";
import type { AnsweredRecord } from "@/types/exam";

interface Props {
  studentName: string;
  score: number;
  total: number;
  records: AnsweredRecord[];
  submissionStatus: "sending" | "sent" | "skipped" | "error";
  onRestart: () => void;
}

const STATUS_TEXT: Record<Props["submissionStatus"], string> = {
  sending: "Enviando resultados a la hoja de cálculo…",
  sent: "✅ Resultados enviados a la hoja de resultados (RC8).",
  skipped: "ℹ️ Envío automático no configurado (ver docs/AppsScript.gs).",
  error: "⚠️ No se pudo confirmar el envío a Google Sheets.",
};

export default function ResultsScreen({
  studentName,
  score,
  total,
  records,
  submissionStatus,
  onRestart,
}: Props) {
  const pct = Math.round((score / total) * 100);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-6 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full rounded-3xl border border-indigo-400/25 bg-indigo-950/50 p-8 text-center shadow-[0_0_60px_18px_rgba(199,210,254,0.15)] backdrop-blur-xl"
      >
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-300/80">
          Resultado final
        </p>
        <h1 className="font-display mt-2 text-3xl font-bold text-indigo-50 sm:text-4xl">
          {studentName}
        </h1>
        <p className="mt-4 text-6xl font-bold text-transparent bg-gradient-to-br from-emerald-300 to-indigo-300 bg-clip-text">
          {score} / {total}
        </p>
        <p className="mt-1 text-lg text-indigo-200/80">{pct}% de respuestas correctas</p>
        <p className="mt-4 text-sm text-indigo-300/70">{STATUS_TEXT[submissionStatus]}</p>

        <button
          type="button"
          onClick={onRestart}
          className="mt-6 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-indigo-900/40 transition hover:brightness-110 active:scale-[0.98]"
        >
          Reintentar examen (orden aleatorio)
        </button>
      </motion.div>

      <div className="w-full space-y-3">
        {records.map((r, i) => (
          <div
            key={`${r.questionId}-${i}`}
            className={`rounded-2xl border p-4 text-sm ${
              r.correct ? "border-emerald-400/40 bg-emerald-400/5" : "border-rose-400/40 bg-rose-400/5"
            }`}
          >
            <div className="mb-1 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-indigo-300/70">
              <span>{r.section}</span>
              <span className={r.correct ? "text-emerald-300" : "text-rose-300"}>
                {r.correct ? "Correcto" : "Incorrecto"} · {r.timeUsedSeconds}s
              </span>
            </div>
            <p className="font-medium text-indigo-50">{r.prompt}</p>
            <p className="mt-1 text-indigo-200/80">
              <span className="font-semibold">Tu respuesta: </span>
              {r.userAnswerText}
            </p>
            <p className="text-indigo-200/80">
              <span className="font-semibold">Respuesta correcta: </span>
              {r.correctAnswerText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
