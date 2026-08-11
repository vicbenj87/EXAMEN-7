import { useState } from "react";
import type { Question, QuizConfig } from "../types";

interface Props {
  initialConfig: QuizConfig;
  onSave: (config: QuizConfig) => void;
  onCancel: () => void;
  onReset: () => void;
}

function newQuestion(defaultTime: number): Question {
  return {
    id: "q" + Math.random().toString(36).slice(2, 9),
    pregunta: "Nueva pregunta...",
    opciones: ["Opción 1", "Opción 2"],
    correcta: 0,
    tiempo: defaultTime,
  };
}

export default function Editor({ initialConfig, onSave, onCancel, onReset }: Props) {
  const [tiempoPorDefecto, setTiempoPorDefecto] = useState(initialConfig.tiempoPorDefecto);
  const [preguntas, setPreguntas] = useState<Question[]>(
    JSON.parse(JSON.stringify(initialConfig.preguntas)),
  );

  function updateQuestion(id: string, patch: Partial<Question>) {
    setPreguntas((prev) => prev.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  }

  function updateOption(id: string, index: number, value: string) {
    setPreguntas((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;
        const opciones = [...q.opciones];
        opciones[index] = value;
        return { ...q, opciones };
      }),
    );
  }

  function addOption(id: string) {
    setPreguntas((prev) =>
      prev.map((q) =>
        q.id === id && q.opciones.length < 6
          ? { ...q, opciones: [...q.opciones, `Opción ${q.opciones.length + 1}`] }
          : q,
      ),
    );
  }

  function removeOption(id: string, index: number) {
    setPreguntas((prev) =>
      prev.map((q) => {
        if (q.id !== id || q.opciones.length <= 2) return q;
        const opciones = q.opciones.filter((_, i) => i !== index);
        let correcta = q.correcta;
        if (correcta === index) correcta = 0;
        else if (correcta > index) correcta -= 1;
        return { ...q, opciones, correcta };
      }),
    );
  }

  function removeQuestion(id: string) {
    setPreguntas((prev) => prev.filter((q) => q.id !== id));
  }

  function addQuestion() {
    setPreguntas((prev) => [...prev, newQuestion(tiempoPorDefecto)]);
  }

  function moveQuestion(index: number, dir: -1 | 1) {
    setPreguntas((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function handleSave() {
    const cleaned = preguntas
      .filter((q) => q.pregunta.trim() !== "")
      .map((q) => ({
        ...q,
        opciones: q.opciones.map((o) => o.trim() || "Sin texto"),
        tiempo: Number(q.tiempo) > 0 ? Number(q.tiempo) : tiempoPorDefecto,
      }));
    onSave({ tiempoPorDefecto: Number(tiempoPorDefecto) || 20, preguntas: cleaned });
  }

  return (
    <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)] backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-2xl font-bold text-indigo-50">
          Editar preguntas y tiempos
        </h1>
        <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-indigo-200">
          {preguntas.length} preguntas
        </span>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
        <label className="block text-xs font-semibold tracking-wide text-indigo-300 uppercase">
          Tiempo por defecto (segundos)
        </label>
        <input
          type="number"
          min={5}
          max={300}
          value={tiempoPorDefecto}
          onChange={(e) => setTiempoPorDefecto(Number(e.target.value))}
          className="mt-2 w-full max-w-40 rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-white outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/40"
        />
        <p className="mt-1 text-xs text-indigo-300/70">
          Se usa cuando una pregunta no tiene un tiempo propio definido.
        </p>
      </div>

      <div className="mt-6 max-h-[55vh] space-y-4 overflow-y-auto pr-1">
        {preguntas.map((q, qi) => (
          <div key={q.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold tracking-wide text-indigo-300 uppercase">
                Pregunta {qi + 1}
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => moveQuestion(qi, -1)}
                  disabled={qi === 0}
                  title="Subir"
                  className="rounded-lg bg-white/10 px-2 py-1 text-xs text-indigo-100 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveQuestion(qi, 1)}
                  disabled={qi === preguntas.length - 1}
                  title="Bajar"
                  className="rounded-lg bg-white/10 px-2 py-1 text-xs text-indigo-100 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeQuestion(q.id)}
                  title="Eliminar pregunta"
                  className="rounded-lg bg-rose-500/20 px-2 py-1 text-xs text-rose-200 hover:bg-rose-500/30"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <label className="mt-3 block text-xs text-indigo-300">Texto de la pregunta</label>
            <textarea
              value={q.pregunta}
              onChange={(e) => updateQuestion(q.id, { pregunta: e.target.value })}
              rows={2}
              className="mt-1 w-full rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/40"
            />

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div>
                <label className="block text-xs text-indigo-300">
                  Tiempo de esta pregunta (segundos)
                </label>
                <input
                  type="number"
                  min={5}
                  max={300}
                  value={q.tiempo}
                  onChange={(e) => updateQuestion(q.id, { tiempo: Number(e.target.value) })}
                  className="mt-1 w-full rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/40"
                />
              </div>
            </div>

            <label className="mt-3 block text-xs text-indigo-300">
              Opciones (marca la respuesta correcta)
            </label>
            <div className="mt-1 space-y-2">
              {q.opciones.map((op, oi) => (
                <div key={oi} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`correcta-${q.id}`}
                    checked={q.correcta === oi}
                    onChange={() => updateQuestion(q.id, { correcta: oi })}
                    className="h-4 w-4 accent-indigo-500"
                    title="Marcar como correcta"
                  />
                  <input
                    type="text"
                    value={op}
                    onChange={(e) => updateOption(q.id, oi, e.target.value)}
                    className="flex-1 rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/40"
                  />
                  <button
                    onClick={() => removeOption(q.id, oi)}
                    disabled={q.opciones.length <= 2}
                    className="rounded-lg bg-white/10 px-2 py-2 text-xs text-indigo-100 disabled:opacity-30"
                    title="Quitar opción"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() => addOption(q.id)}
                disabled={q.opciones.length >= 6}
                className="mt-1 rounded-lg bg-indigo-500/15 px-3 py-1.5 text-xs font-semibold text-indigo-200 disabled:opacity-30"
              >
                + Agregar opción
              </button>
            </div>
          </div>
        ))}

        {preguntas.length === 0 && (
          <p className="text-center text-sm text-indigo-300/70">
            No hay preguntas. Agrega una nueva abajo.
          </p>
        )}
      </div>

      <button
        onClick={addQuestion}
        className="mt-4 w-full rounded-2xl border border-dashed border-indigo-300/40 py-3 text-sm font-semibold text-indigo-200 hover:bg-indigo-900/30"
      >
        + Agregar nueva pregunta
      </button>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <button
          onClick={onReset}
          className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-200 hover:bg-rose-500/20"
        >
          Restaurar preguntas originales
        </button>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="rounded-2xl border border-indigo-300/30 bg-indigo-900/30 px-6 py-3 text-sm font-semibold text-indigo-100 hover:bg-indigo-800/60"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-900/40 hover:brightness-110"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
