import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useExamEngine } from "@/hooks/useExamEngine";
import StartScreen from "@/components/StartScreen";
import InstructionPopup from "@/components/InstructionPopup";
import QuestionCard from "@/components/QuestionCard";
import ResultsScreen from "@/components/ResultsScreen";
import { submitResultsToSheet } from "@/utils/submitResults";
import { FEEDBACK_DELAY_MS } from "@/config";

type SubmissionStatus = "sending" | "sent" | "skipped" | "error";

export default function App() {
  const engine = useExamEngine();
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>("sending");
  const submittedAttemptRef = useRef<number | null>(null);

  // Avanza automáticamente tras mostrar la retroalimentación
  useEffect(() => {
    if (engine.phase !== "feedback") return;
    const timeout = setTimeout(() => engine.advance(), FEEDBACK_DELAY_MS);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine.phase, engine.index]);

  // Envía los resultados una sola vez por intento al llegar a la pantalla final
  useEffect(() => {
    if (engine.phase !== "results") return;
    if (submittedAttemptRef.current === engine.attempt) return;
    submittedAttemptRef.current = engine.attempt;
    setSubmissionStatus("sending");
    submitResultsToSheet(engine.studentName, engine.score, engine.total, engine.records).then(
      (status) => setSubmissionStatus(status),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [engine.phase, engine.attempt]);

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top,_#1b2a52_0%,_#0b1029_45%,_#05070f_100%)] text-indigo-50">
      <AnimatePresence mode="wait">
        {engine.phase === "start" && (
          <motion.div key="start" exit={{ opacity: 0 }}>
            <StartScreen onStart={engine.start} />
          </motion.div>
        )}

        {(engine.phase === "instruction" ||
          engine.phase === "question" ||
          engine.phase === "feedback") &&
          engine.currentQuestion && (
            <motion.div
              key={`q-${engine.currentQuestion.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="flex min-h-screen w-full items-center justify-center px-4 py-10"
            >
              <QuestionCard
                key={engine.currentQuestion.id}
                question={engine.currentQuestion}
                index={engine.index}
                total={engine.total}
                phase={engine.phase === "instruction" ? "waiting" : engine.phase}
                result={engine.lastResult}
                onAnswer={engine.submitAnswer}
                onTimeout={engine.timeExpired}
              />

              {engine.phase === "instruction" && (
                <InstructionPopup
                  section={engine.currentQuestion.section}
                  howTo={engine.currentQuestion.howTo}
                  questionNumber={engine.index + 1}
                  total={engine.total}
                  onDone={engine.beginQuestion}
                />
              )}
            </motion.div>
          )}

        {engine.phase === "results" && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ResultsScreen
              studentName={engine.studentName}
              score={engine.score}
              total={engine.total}
              records={engine.records}
              submissionStatus={submissionStatus}
              onRestart={engine.restart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
