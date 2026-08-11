import { useState } from "react";
import type { ShortAnswerQuestion as SAQ } from "@/types/exam";

interface Props {
  question: SAQ;
  locked: boolean;
  onSubmit: (value: string) => void;
}

export default function ShortAnswerQuestion({ question: _question, locked, onSubmit }: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-4">
      <textarea
        value={value}
        disabled={locked}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Escribe tu respuesta aquí… (separa con comas si son varias)"
        rows={3}
        className="w-full resize-none rounded-xl border border-indigo-300/40 bg-indigo-950/60 px-4 py-3 text-base text-indigo-50 outline-none placeholder-indigo-400/40 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/40 disabled:opacity-60"
      />
      <button
        type="button"
        disabled={locked || !value.trim()}
        onClick={() => onSubmit(value)}
        className="rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition enabled:hover:brightness-110 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Comprobar respuesta
      </button>
    </div>
  );
}
