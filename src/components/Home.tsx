import type { QuizConfig } from "../types";

interface Props {
  config: QuizConfig;
  onStart: () => void;
  onEdit: () => void;
}

export default function Home({ config, onStart, onEdit }: Props) {
  return (
    <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-950/60 p-8 shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)] backdrop-blur-xl sm:p-10">
      <div className="flex justify-center">
        <span className="mb-4 inline-block rounded-full bg-indigo-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-indigo-200">
          Libro de Jueces
        </span>
      </div>
      <h1 className="font-display bg-gradient-to-r from-indigo-200 via-violet-300 to-amber-300 bg-clip-text text-center text-4xl font-bold text-transparent sm:text-5xl">
        La Era de los Jueces
      </h1>
      <p className="mt-3 text-center text-sm tracking-widest text-indigo-300/70 uppercase">
        Examen interactivo
      </p>

      <p className="mx-auto mt-6 max-w-md text-center text-indigo-100/90">
        Responde {config.preguntas.length} preguntas sobre los jueces de Israel. Cada pregunta
        tiene su propio tiempo límite (por defecto {config.tiempoPorDefecto}s).
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          onClick={onStart}
          disabled={config.preguntas.length === 0}
          className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-900/40 transition enabled:hover:brightness-110 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Comenzar examen
        </button>
        <button
          onClick={onEdit}
          className="rounded-2xl border border-indigo-300/30 bg-indigo-900/30 px-8 py-3.5 text-base font-semibold text-indigo-100 transition hover:border-indigo-300/50 hover:bg-indigo-800/60 active:scale-[0.98]"
        >
          ✏️ Editar preguntas y tiempos
        </button>
      </div>

      {config.preguntas.length === 0 && (
        <p className="mt-4 text-center text-sm text-rose-300">
          No hay preguntas cargadas. Ve a "Editar preguntas y tiempos" para agregar al menos una.
        </p>
      )}

      <p className="mt-8 text-center text-xs text-indigo-300/60">
        ¿Quieres el código fuente en HTML, CSS y JavaScript puro para editarlo tú mismo fuera de
        esta app?{" "}
        <a
          href="/examen-vanilla.html"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-indigo-200 underline decoration-dotted underline-offset-2 hover:text-white"
        >
          Descárgalo aquí
        </a>
        .
      </p>
    </div>
  );
}
