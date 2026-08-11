import type { TrueFalseQuestion as TFQ } from "@/types/exam";
import type { GradeResult } from "@/utils/grading";

interface Props {
  question: TFQ;
  locked: boolean;
  selected: boolean | null;
  result: GradeResult | null;
  onSelect: (value: boolean) => void;
}

export default function TrueFalseQuestion({ question: _question, locked, selected, result, onSelect }: Props) {
  const options: { value: boolean; label: string }[] = [
    { value: true, label: "Verdadero" },
    { value: false, label: "Falso" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        let stateClasses =
          "border-white/15 bg-white/5 hover:border-indigo-300/50 hover:bg-indigo-900/30";
        if (result) {
          const isCorrectOpt = opt.value === (result.correctAnswerText === "Verdadero");
          const isWrongSelected = isSelected && !isCorrectOpt;
          if (isCorrectOpt) stateClasses = "border-emerald-400/70 bg-emerald-400/10";
          else if (isWrongSelected) stateClasses = "border-rose-400/70 bg-rose-400/10";
          else stateClasses = "border-white/10 bg-white/5 opacity-60";
        } else if (isSelected) {
          stateClasses = "border-indigo-300/60 bg-indigo-600/20";
        }
        return (
          <button
            key={String(opt.value)}
            type="button"
            disabled={locked}
            onClick={() => onSelect(opt.value)}
            className={`rounded-xl border px-4 py-6 text-center text-lg font-semibold text-indigo-50 transition-all disabled:cursor-not-allowed ${stateClasses}`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
