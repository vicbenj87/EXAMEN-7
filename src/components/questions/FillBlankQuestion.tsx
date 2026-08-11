import { useState } from "react";
import type { FillBlankQuestion as FBQ } from "@/types/exam";

interface Props {
  question: FBQ;
  locked: boolean;
  onSubmit: (values: string[]) => void;
}

export default function FillBlankQuestion({ question, locked, onSubmit }: Props) {
  const [values, setValues] = useState<string[]>(() => question.blanks.map(() => ""));

  const parts = question.template.split(/___\d+___/g);

  const update = (idx: number, v: string) => {
    setValues((prev) => prev.map((val, i) => (i === idx ? v : val)));
  };

  return (
    <div className="space-y-5">
      <p className="flex flex-wrap items-center gap-2 text-lg leading-loose text-indigo-50">
        {parts.map((part, i) => (
          <span key={i} className="contents">
            <span>{part}</span>
            {i < question.blanks.length && (
              <input
                value={values[i]}
                disabled={locked}
                onChange={(e) => update(i, e.target.value)}
                placeholder="……"
                className="mx-1 w-40 rounded-lg border border-indigo-300/40 bg-indigo-950/60 px-3 py-1.5 text-center text-base font-semibold text-emerald-200 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/40 disabled:opacity-60"
              />
            )}
          </span>
        ))}
      </p>
      <button
        type="button"
        disabled={locked || values.some((v) => !v.trim())}
        onClick={() => onSubmit(values)}
        className="rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition enabled:hover:brightness-110 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Comprobar respuesta
      </button>
    </div>
  );
}
