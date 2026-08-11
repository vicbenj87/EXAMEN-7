import type {
  Question,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  FillBlankQuestion,
  ShortAnswerQuestion,
  OrderingQuestion,
  MatchingQuestion,
  MapDragQuestion,
} from "@/types/exam";
import { normalize, splitCommaList, textMatches } from "@/utils/text";

export interface GradeResult {
  correct: boolean;
  userAnswerText: string;
  correctAnswerText: string;
}

export function gradeMultipleChoice(
  q: MultipleChoiceQuestion,
  answer: string | null,
): GradeResult {
  const correctOption = q.options.find((o) => o.key === q.correct);
  return {
    correct: answer === q.correct,
    userAnswerText: answer
      ? `${answer.toUpperCase()}) ${q.options.find((o) => o.key === answer)?.text ?? ""}`
      : "Sin respuesta",
    correctAnswerText: `${q.correct.toUpperCase()}) ${correctOption?.text ?? ""}`,
  };
}

export function gradeTrueFalse(q: TrueFalseQuestion, answer: boolean | null): GradeResult {
  return {
    correct: answer === q.correct,
    userAnswerText: answer === null ? "Sin respuesta" : answer ? "Verdadero" : "Falso",
    correctAnswerText: q.correct ? "Verdadero" : "Falso",
  };
}

export function gradeFillBlank(q: FillBlankQuestion, answers: string[]): GradeResult {
  const results = q.blanks.map((blank, idx) => textMatches(answers[idx] ?? "", blank.accepted));
  const correct = results.every(Boolean);
  return {
    correct,
    userAnswerText: answers.filter(Boolean).length
      ? answers.map((a) => a || "—").join(" / ")
      : "Sin respuesta",
    correctAnswerText: q.blanks.map((b) => b.accepted[0]).join(" / "),
  };
}

export function gradeShortAnswer(q: ShortAnswerQuestion, answer: string): GradeResult {
  const tokens = splitCommaList(answer);
  let matchedCount = 0;
  if (tokens.length === 0) {
    matchedCount = 0;
  } else if (q.expectedKeywords.length === 1) {
    matchedCount = textMatches(answer, q.expectedKeywords) ? 1 : 0;
  } else {
    matchedCount = q.expectedKeywords.filter((keyword) =>
      tokens.some((t) => t.includes(normalize(keyword)) || normalize(keyword).includes(t)),
    ).length;
  }
  const required =
    q.minRequiredMatches ?? Math.max(1, Math.ceil(q.expectedKeywords.length * (q.minMatchRatio ?? 0.5)));
  return {
    correct: matchedCount >= required,
    userAnswerText: answer.trim() || "Sin respuesta",
    correctAnswerText: q.sampleAnswer,
  };
}

export function gradeOrdering(q: OrderingQuestion, order: string[]): GradeResult {
  const correct = order.length === q.correctOrder.length && order.every((id, i) => id === q.correctOrder[i]);
  const textFor = (ids: string[]) =>
    ids.map((id) => q.items.find((it) => it.id === id)?.text ?? id).join(" → ");
  return {
    correct,
    userAnswerText: textFor(order),
    correctAnswerText: textFor(q.correctOrder),
  };
}

export function gradeMatching(q: MatchingQuestion, mapping: Record<string, string>): GradeResult {
  const correct = q.left.every((l) => mapping[l.id] === q.correctMap[l.id]);
  const textFor = (m: Record<string, string>) =>
    q.left
      .map((l) => {
        const rightId = m[l.id];
        const rightText = q.right.find((r) => r.id === rightId)?.text ?? "—";
        return `${l.text} → ${rightText}`;
      })
      .join(" · ");
  return {
    correct,
    userAnswerText: textFor(mapping),
    correctAnswerText: textFor(q.correctMap),
  };
}

export function gradeMapDrag(q: MapDragQuestion, placements: Record<string, string>): GradeResult {
  const correct = q.zones.every((z) => placements[z.id] === z.correctChipId);
  const labelOf = (chipId: string | undefined) =>
    q.chips.find((c) => c.id === chipId)?.label ?? "—";
  const textFor = (p: Record<string, string>) =>
    q.zones.map((z, i) => `${i + 1}. ${labelOf(p[z.id])}`).join(" · ");
  return {
    correct,
    userAnswerText: textFor(placements),
    correctAnswerText: textFor(
      Object.fromEntries(q.zones.map((z) => [z.id, z.correctChipId])),
    ),
  };
}

export type AnswerValue =
  | { type: "multiple-choice"; value: string | null }
  | { type: "true-false"; value: boolean | null }
  | { type: "fill-blank"; value: string[] }
  | { type: "short-answer"; value: string }
  | { type: "ordering"; value: string[] }
  | { type: "matching"; value: Record<string, string> }
  | { type: "map-drag"; value: Record<string, string> };

export function gradeAnswer(question: Question, answer: AnswerValue): GradeResult {
  switch (question.type) {
    case "multiple-choice":
      return gradeMultipleChoice(question, answer.value as string | null);
    case "true-false":
      return gradeTrueFalse(question, answer.value as boolean | null);
    case "fill-blank":
      return gradeFillBlank(question, answer.value as string[]);
    case "short-answer":
      return gradeShortAnswer(question, answer.value as string);
    case "ordering":
      return gradeOrdering(question, answer.value as string[]);
    case "matching":
      return gradeMatching(question, answer.value as Record<string, string>);
    case "map-drag":
      return gradeMapDrag(question, answer.value as Record<string, string>);
    default:
      return { correct: false, userAnswerText: "Sin respuesta", correctAnswerText: "" };
  }
}
