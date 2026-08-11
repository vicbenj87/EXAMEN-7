import { useState } from "react";
import { motion } from "framer-motion";
import { EXAM_TITLE, EXAM_SUBTITLE, QUESTION_TIME_SECONDS } from "@/config";
import { QUESTIONS } from "@/data/questions";

interface Props {
  onStart: (name: string) => void;
}

export default function StartScreen({ onStart }: Props) {
  const [name, setName] = useState("");

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-10">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url(/images/hero-judges.jpg)" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/60 via-slate-950/85 to-slate-950" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl rounded-3xl border border-indigo-400/25 bg-indigo-950/50 p-8 shadow-[0_0_60px_18px_rgba(199,210,254,0.15)] backdrop-blur-xl sm:p-10"
      >
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-[0.3em] text-indigo-300/80">
          Examen bíblico interactivo
        </p>
        <h1 className="font-display bg-gradient-to-br from-slate-100 via-violet-300 to-fuchsia-300 bg-clip-text text-center text-4xl font-bold text-transparent sm:text-5xl">
          {EXAM_TITLE}
        </h1>
        <p className="mt-3 text-center text-indigo-200/80">{EXAM_SUBTITLE}</p>

        <ul className="mt-7 space-y-2.5 rounded-2xl bg-white/5 p-5 text-sm text-indigo-100/90">
          <li>📜 {QUESTIONS.length} ejercicios de distintos tipos: selección múltiple, mapa, verdadero/falso, completar, respuesta corta, secuencia y emparejamiento.</li>
          <li>🔀 El orden de los ejercicios cambia cada vez que inicias el examen.</li>
          <li>💡 Antes de cada ejercicio verás una breve explicación de cómo resolverlo (5 segundos).</li>
          <li>⏱️ Tendrás {QUESTION_TIME_SECONDS} segundos por pregunta, con una barra de tiempo visible.</li>
          <li>✅ Al responder, se mostrará de inmediato la respuesta correcta y avanzarás automáticamente.</li>
        </ul>

        <div className="mt-7">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-indigo-300/80">
            Escribe tu nombre para comenzar
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && name.trim()) onStart(name);
            }}
            placeholder="Nombre y apellido"
            className="w-full rounded-xl border border-indigo-300/40 bg-indigo-950/70 px-4 py-3 text-base text-indigo-50 outline-none placeholder-indigo-400/40 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/40"
          />
        </div>

        <button
          type="button"
          disabled={!name.trim()}
          onClick={() => onStart(name)}
          className="mt-6 w-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 py-3.5 text-base font-bold uppercase tracking-wide text-white shadow-lg shadow-indigo-900/40 transition enabled:hover:brightness-110 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Comenzar examen
        </button>
      </motion.div>
    </div>
  );
}
