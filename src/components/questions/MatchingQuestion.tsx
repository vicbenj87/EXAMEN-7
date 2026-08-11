import { useMemo, useState } from "react";
import type { MatchingQuestion as MQ } from "@/types/exam";
import { shuffleArray } from "@/utils/shuffle";

interface Props {
  question: MQ;
  locked: boolean;
  onSubmit: (mapping: Record<string, string>) => void;
}

export default function MatchingQuestion({ question, locked, onSubmit }: Props) {
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const rightShuffled = useMemo(() => shuffleArray(question.right), [question.right]);

  const allAnswered = question.left.every((l) => mapping[l.id]);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {question.left.map((l) => (
          <div
            key={l.id}
            className="flex flex-col gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="font-semibold text-indigo-50">{l.text}</span>
            <select
              disabled={locked}
              value={mapping[l.id] ?? ""}
              onChange={(e) => setMapping((prev) => ({ ...prev, [l.id]: e.target.value }))}
              className="rounded-lg border border-indigo-300/40 bg-indigo-950/70 px-3 py-2 text-sm text-indigo-50 outline-none focus:border-indigo-300 disabled:opacity-60"
            >
              <option value="" disabled>
                Selecciona una descripción…
              </option>
              {rightShuffled.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.text}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <button
        type="button"
        disabled={locked || !allAnswered}
        onClick={() => onSubmit(mapping)}
        className="rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition enabled:hover:brightness-110 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Comprobar emparejamiento
      </button>
    </div>
  );
}
