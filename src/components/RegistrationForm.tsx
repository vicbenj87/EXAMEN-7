import { FormEvent, useState } from "react";
import type { Participant } from "../types";

interface Props {
  onSubmit: (data: Participant) => void;
  onKeyPress?: () => void;
}

export default function RegistrationForm({ onSubmit, onKeyPress }: Props) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [ibm, setIbm] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim() || !ibm.trim()) {
      setError("Por favor completa los tres campos para continuar.");
      return;
    }
    setError("");
    onSubmit({ nombre: nombre.trim(), apellido: apellido.trim(), ibm: ibm.trim() });
  }

  return (
    <div className="animate-fade-in-up flex w-full max-w-lg flex-col items-center gap-6 rounded-3xl border border-indigo-400/20 bg-white/5 p-8 shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)] backdrop-blur-xl sm:p-10">
      <div className="animate-floaty text-5xl">🌙✨</div>
      <div className="text-center">
        <h1 className="font-display text-2xl font-semibold tracking-wide text-indigo-100 sm:text-3xl">
          La Era de la Conquista
        </h1>
        <p className="mt-1 text-sm text-indigo-300/80">Examen bíblico sobre el libro de Josué</p>
      </div>

      <div className="w-full rounded-2xl border border-indigo-400/20 bg-indigo-950/40 p-4">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
          Registro de Participante
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm text-indigo-200">
          Nombre
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            onFocus={onKeyPress}
            type="text"
            placeholder="Escribe tu nombre"
            className="rounded-xl border border-indigo-400/30 bg-slate-900/60 px-4 py-2.5 text-indigo-50 placeholder-indigo-400/40 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/40"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-indigo-200">
          Apellido
          <input
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            onFocus={onKeyPress}
            type="text"
            placeholder="Escribe tu apellido"
            className="rounded-xl border border-indigo-400/30 bg-slate-900/60 px-4 py-2.5 text-indigo-50 placeholder-indigo-400/40 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/40"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-indigo-200">
          IBM / Hogar / Barrio
          <input
            value={ibm}
            onChange={(e) => setIbm(e.target.value)}
            onFocus={onKeyPress}
            type="text"
            placeholder="Ej: IBM Central, Hogar 3, Barrio Las Flores"
            className="rounded-xl border border-indigo-400/30 bg-slate-900/60 px-4 py-2.5 text-indigo-50 placeholder-indigo-400/40 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/40"
          />
        </label>

        {error && <p className="text-center text-sm text-rose-300">{error}</p>}

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-900/40 transition hover:brightness-110 active:scale-[0.98]"
        >
          Comenzar Examen ✦
        </button>
      </form>

      <p className="text-center text-[11px] leading-relaxed text-indigo-400/70">
        Tus datos se registrarán junto con tu calificación al finalizar el examen.
      </p>
    </div>
  );
}
