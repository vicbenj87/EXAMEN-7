import { useState } from "react";
import type { OrderingQuestion as OQ } from "@/types/exam";
import { shuffleArray } from "@/utils/shuffle";

interface Props {
  question: OQ;
  locked: boolean;
  onSubmit: (order: string[]) => void;
}

export default function OrderingQuestion({ question, locked, onSubmit }: Props) {
  const [order, setOrder] = useState<string[]>(() => shuffleArray(question.items).map((i) => i.id));

  const move = (index: number, direction: -1 | 1) => {
    setOrder((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const textOf = (id: string) => question.items.find((it) => it.id === id)?.text ?? id;

  return (
    <div className="space-y-4">
      <ol className="space-y-2">
        {order.map((id, idx) => (
          <li
            key={id}
            className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-indigo-50"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-500/30 text-sm font-bold">
              {idx + 1}
            </span>
            <span className="flex-1 text-sm sm:text-base">{textOf(id)}</span>
            <div className="flex shrink-0 flex-col gap-1">
              <button
                type="button"
                disabled={locked || idx === 0}
                onClick={() => move(idx, -1)}
                aria-label="Subir"
                className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-indigo-100 disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                disabled={locked || idx === order.length - 1}
                onClick={() => move(idx, 1)}
                aria-label="Bajar"
                className="rounded-md bg-white/10 px-2 py-0.5 text-xs text-indigo-100 disabled:opacity-30"
              >
                ↓
              </button>
            </div>
          </li>
        ))}
      </ol>
      <button
        type="button"
        disabled={locked}
        onClick={() => onSubmit(order)}
        className="rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition enabled:hover:brightness-110 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Comprobar orden
      </button>
    </div>
  );
}
