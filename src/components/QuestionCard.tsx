import { useEffect, useRef, useState } from "react";
import type { Question } from "@/types/exam";
import type { AnswerValue, GradeResult } from "@/utils/grading";
import { QUESTION_TIME_SECONDS } from "@/config";
import TimerBar from "@/components/TimerBar";
import FeedbackPanel from "@/components/FeedbackPanel";
import MultipleChoiceQuestion from "@/components/questions/MultipleChoiceQuestion";
import TrueFalseQuestion from "@/components/questions/TrueFalseQuestion";
import FillBlankQuestion from "@/components/questions/FillBlankQuestion";
import ShortAnswerQuestion from "@/components/questions/ShortAnswerQuestion";
import OrderingQuestion from "@/components/questions/OrderingQuestion";
import MatchingQuestion from "@/components/questions/MatchingQuestion";
import MapDragQuestion from "@/components/questions/MapDragQuestion";

interface QuestionCardProps {
  question: Question;
  index: number;
  total: number;
  phase: "waiting" | "question" | "feedback";
  result: GradeResult | null;
  onAnswer: (answer: AnswerValue, timeUsedSeconds: number) => void;
  onTimeout: () => void;
}

export default function QuestionCard({
  question,
  index,
  total,
  phase,
  result,
  onAnswer,
  onTimeout,
}: QuestionCardProps) {
  const startRef = useRef(Date.now());
  const [mcSelected, setMcSelected] = useState<string | null>(null);
  const [tfSelected, setTfSelected] = useState<boolean | null>(null);
  const locked = phase !== "question";

  useEffect(() => {
    if (phase === "question") {
      startRef.current = Date.now();
    }
  }, [phase]);

  const timeUsed = () => Math.min(QUESTION_TIME_SECONDS, Math.round((Date.now() - startRef.current) / 1000));

  const wrappedAnswer = (answer: AnswerValue) => {
    if (locked) return;
    onAnswer(answer, timeUsed());
  };

  return (
    <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-indigo-950/40 p-6 shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)] backdrop-blur-xl sm:p-9">
      <div className="mb-5 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/80">
        <span>{question.section}</span>
        <span>
          Pregunta {index + 1} / {total}
        </span>
      </div>

      <div className="mb-6">
        <TimerBar
          durationMs={QUESTION_TIME_SECONDS * 1000}
          active={phase === "question"}
          resetKey={question.id}
          onComplete={onTimeout}
        />
      </div>

      <h2 className="font-display mb-6 text-xl font-semibold leading-snug text-indigo-50 sm:text-2xl">
        {question.prompt}
      </h2>

      {question.type === "multiple-choice" && (
        <MultipleChoiceQuestion
          question={question}
          locked={locked}
          selected={mcSelected}
          result={result}
          onSelect={(key) => {
            setMcSelected(key);
            wrappedAnswer({ type: "multiple-choice", value: key });
          }}
        />
      )}

      {question.type === "true-false" && (
        <TrueFalseQuestion
          question={question}
          locked={locked}
          selected={tfSelected}
          result={result}
          onSelect={(value) => {
            setTfSelected(value);
            wrappedAnswer({ type: "true-false", value });
          }}
        />
      )}

      {question.type === "fill-blank" && (
        <FillBlankQuestion
          question={question}
          locked={locked}
          onSubmit={(values) => wrappedAnswer({ type: "fill-blank", value: values })}
        />
      )}

      {question.type === "short-answer" && (
        <ShortAnswerQuestion
          question={question}
          locked={locked}
          onSubmit={(value) => wrappedAnswer({ type: "short-answer", value })}
        />
      )}

      {question.type === "ordering" && (
        <OrderingQuestion
          question={question}
          locked={locked}
          onSubmit={(order) => wrappedAnswer({ type: "ordering", value: order })}
        />
      )}

      {question.type === "matching" && (
        <MatchingQuestion
          question={question}
          locked={locked}
          onSubmit={(mapping) => wrappedAnswer({ type: "matching", value: mapping })}
        />
      )}

      {question.type === "map-drag" && (
        <MapDragQuestion
          question={question}
          locked={locked}
          onSubmit={(placements) => wrappedAnswer({ type: "map-drag", value: placements })}
        />
      )}

      {phase === "feedback" && result && (
        <FeedbackPanel
          result={result}
          extraNote={question.type === "true-false" ? question.feedback : undefined}
        />
      )}
    </div>
  );
}
