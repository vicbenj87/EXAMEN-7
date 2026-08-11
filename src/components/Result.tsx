import type { Answer, QuizConfig } from "../types";

interface Props {
  config: QuizConfig;
  answers: Answer[];
  onRestart: () => void;
  onHome: () => void;
}

export default function Result({ config, answers, onRestart, onHome }: Props) {
  const correctCount = answers.filter((a) => a.correct).length;
  const total = config.preguntas.length;
  const pct = total ? Math.round((correctCount / total) * 100) : 0;

  let mensaje = "¡Sigue estudiando el libro de Jueces!";
  if (pct >= 90) mensaje = "¡Excelente! Conoces muy bien la era de los jueces.";
  else if (pct >= 70) mensaje = "¡Muy bien! Tienes un buen dominio del tema.";
  else if (pct >= 50) mensaje = "Vas bien, repasa un poco más.";

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)] backdrop-blur-xl sm:p-9">
      <div className="flex justify-center">
        <span className="mb-2 inline-block rounded-full bg-indigo-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-indigo-200">
          Resultado final
        </span>
      </div>
      <h1 className="font-display text-center text-3xl font-bold text-indigo-50 sm:text-4xl">
        ¡Examen completado!
      </h1>
      <div className="font-display mt-4 text-center text-6xl font-bold text-amber-300">
        {correctCount}/{total}
      </div>
      <p className="mt-2 text-center text-indigo-200">{pct}% de aciertos</p>
      <p className="mt-1 text-center text-sm text-indigo-300/80 italic">{mensaje}</p>

      <div className="mt-6 max-h-96 space-y-2.5 overflow-y-auto pr-1">
        {config.preguntas.map((q, i) => {
          const a = answers[i];
          const ok = a?.correct;
          const userAns = a?.timeUp
            ? "Sin responder (tiempo agotado)"
            : a?.selected !== null && a?.selected !== undefined
              ? q.opciones[a.selected]
              : "—";
          return (
            <div
              key={q.id}
              className={
                "rounded-xl border-l-4 bg-white/5 p-3 text-sm " +
                (ok ? "border-emerald-400" : "border-rose-400")
              }
            >
              <p className="font-semibold text-indigo-50">
                {i + 1}. {q.pregunta}
              </p>
              <p className="mt-1 text-indigo-200/80">
                Tu respuesta: <span className={ok ? "text-emerald-300" : "text-rose-300"}>{userAns}</span>
              </p>
              {!ok && (
                <p className="text-indigo-200/70">
                  Respuesta correcta:{" "}
                  <span className="text-emerald-300">{q.opciones[q.correcta]}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          onClick={onRestart}
          className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-8 py-3 font-bold text-white shadow-lg shadow-indigo-900/40 transition hover:brightness-110 active:scale-[0.98]"
        >
          Volver a intentar
        </button>
        <button
          onClick={onHome}
          className="rounded-2xl border border-indigo-300/30 bg-indigo-900/30 px-8 py-3 font-semibold text-indigo-100 transition hover:border-indigo-300/50 hover:bg-indigo-800/60 active:scale-[0.98]"
        >
          Inicio
        </button>
      </div>
    </div>
  );
}
