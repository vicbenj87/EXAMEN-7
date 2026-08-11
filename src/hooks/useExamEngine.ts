import { useCallback, useState } from "react";
import { QUESTIONS } from "@/data/questions";
import { shuffleArray } from "@/utils/shuffle";
import { gradeAnswer, type AnswerValue } from "@/utils/grading";
import type { AnsweredRecord, Question } from "@/types/exam";
import { QUESTION_TIME_SECONDS } from "@/config";

export type ExamPhase = "start" | "instruction" | "question" | "feedback" | "results";

export interface LastResult {
  correct: boolean;
  userAnswerText: string;
  correctAnswerText: string;
}

export function useExamEngine() {
  const [phase, setPhase] = useState<ExamPhase>("start");
  const [order, setOrder] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [records, setRecords] = useState<AnsweredRecord[]>([]);
  const [studentName, setStudentName] = useState("");
  const [lastResult, setLastResult] = useState<LastResult | null>(null);
  const [attempt, setAttempt] = useState(0);

  const currentQuestion = order[index];

  const start = useCallback((name: string) => {
    setStudentName(name.trim() || "Estudiante");
    setOrder(shuffleArray(QUESTIONS));
    setIndex(0);
    setRecords([]);
    setLastResult(null);
    setPhase("instruction");
    setAttempt((a) => a + 1);
  }, []);

  const beginQuestion = useCallback(() => {
    setPhase("question");
  }, []);

  const submitAnswer = useCallback(
    (answer: AnswerValue, timeUsedSeconds: number) => {
      if (!currentQuestion) return;
      const result = gradeAnswer(currentQuestion, answer);
      const record: AnsweredRecord = {
        questionId: currentQuestion.id,
        section: currentQuestion.section,
        prompt: currentQuestion.prompt,
        correct: result.correct,
        timeUsedSeconds,
        userAnswerText: result.userAnswerText,
        correctAnswerText: result.correctAnswerText,
      };
      setRecords((prev) => [...prev, record]);
      setLastResult(result);
      setPhase("feedback");
    },
    [currentQuestion],
  );

  const timeExpired = useCallback(() => {
    if (!currentQuestion) return;
    let emptyAnswer: AnswerValue;
    switch (currentQuestion.type) {
      case "multiple-choice":
        emptyAnswer = { type: "multiple-choice", value: null };
        break;
      case "true-false":
        emptyAnswer = { type: "true-false", value: null };
        break;
      case "fill-blank":
        emptyAnswer = {
          type: "fill-blank",
          value: currentQuestion.blanks.map(() => ""),
        };
        break;
      case "ordering":
        emptyAnswer = { type: "ordering", value: currentQuestion.items.map((it) => it.id) };
        break;
      case "matching":
        emptyAnswer = { type: "matching", value: {} };
        break;
      case "map-drag":
        emptyAnswer = { type: "map-drag", value: {} };
        break;
      case "short-answer":
      default:
        emptyAnswer = { type: "short-answer", value: "" };
        break;
    }
    submitAnswer(emptyAnswer, QUESTION_TIME_SECONDS);
  }, [submitAnswer, currentQuestion]);

  const advance = useCallback(() => {
    setLastResult(null);
    if (index + 1 < order.length) {
      setIndex((i) => i + 1);
      setPhase("instruction");
    } else {
      setPhase("results");
    }
  }, [index, order.length]);

  const restart = useCallback(() => {
    setPhase("start");
    setOrder([]);
    setIndex(0);
    setRecords([]);
    setLastResult(null);
  }, []);

  const score = records.filter((r) => r.correct).length;

  return {
    phase,
    order,
    index,
    total: order.length,
    currentQuestion,
    records,
    studentName,
    lastResult,
    score,
    attempt,
    start,
    beginQuestion,
    submitAnswer,
    timeExpired,
    advance,
    restart,
  };
}
