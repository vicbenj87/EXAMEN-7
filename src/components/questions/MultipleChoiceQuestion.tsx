import type { MultipleChoiceQuestion as MCQ } from "@/types/exam";
import type { GradeResult } from "@/utils/grading";

interface Props {
  question: MCQ;
  locked: boolean;
  selected: string | null;
  result: GradeResult | null;
  onSelect: (key: string) => void;
}

export default function MultipleChoiceQuestion({ question, locked, selected, result, onSelect }: Props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {question.options.map((opt) => {
        const isSelected = selected === opt.key;
        const isCorrectOpt = result && opt.key === question.correct;
        const isWrongSelected = result && isSelected && opt.key !== question.correct;

        let stateClasses =
          "border-white/15 bg-white/5 hover:border-indigo-300/50 hover:bg-indigo-900/30";
        if (result) {
          if (isCorrectOpt) stateClasses = "border-emerald-400/70 bg-emerald-400/10";
          else if (isWrongSelected) stateClasses = "border-rose-400/70 bg-rose-400/10";
          else stateClasses = "border-white/10 bg-white/5 opacity-60";
        } else if (isSelected) {
          stateClasses = "border-indigo-300/60 bg-indigo-600/20";
        }

        return (
          <button
            key={opt.key}
            type="button"
            disabled={locked}
            onClick={() => onSelect(opt.key)}
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm sm:text-base text-indigo-50 transition-all disabled:cursor-not-allowed ${stateClasses}`}
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold uppercase">
              {opt.key}
            </span>
            <span>{opt.text}</span>
          </button>
        );
      })}
    </div>
  );
}
