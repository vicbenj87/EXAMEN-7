import { motion } from "framer-motion";
import type { GradeResult } from "@/utils/grading";

interface Props {
  result: GradeResult;
  extraNote?: string;
}

export default function FeedbackPanel({ result, extraNote }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-6 rounded-2xl border p-5 ${
        result.correct
          ? "border-emerald-400/50 bg-emerald-400/10"
          : "border-rose-400/50 bg-rose-400/10"
      }`}
    >
      <div className="mb-2 flex items-center gap-2 text-lg font-bold">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
            result.correct ? "bg-emerald-400 text-emerald-950" : "bg-rose-400 text-rose-950"
          }`}
        >
          {result.correct ? "✓" : "✕"}
        </span>
        <span className={result.correct ? "text-emerald-200" : "text-rose-200"}>
          {result.correct ? "¡Correcto!" : "Incorrecto"}
        </span>
      </div>
      <p className="text-sm text-indigo-100/90">
        <span className="font-semibold text-indigo-200">Tu respuesta: </span>
        {result.userAnswerText}
      </p>
      <p className="mt-1 text-sm text-indigo-100/90">
        <span className="font-semibold text-indigo-200">Respuesta correcta: </span>
        {result.correctAnswerText}
      </p>
      {extraNote && <p className="mt-2 text-sm italic text-indigo-200/80">{extraNote}</p>}
    </motion.div>
  );
}
