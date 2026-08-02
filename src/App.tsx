import { useState } from "react";
import NightBackground from "./components/NightBackground";
import RegistrationForm from "./components/RegistrationForm";
import ExamView from "./components/ExamView";
import ResultsView from "./components/ResultsView";
import { useNightAudio } from "./hooks/useNightAudio";
import type { AnswerRecord, Participant } from "./types";

type Stage = "registro" | "examen" | "resultados";

export default function App() {
  const [stage, setStage] = useState<Stage>("registro");
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);

  const { ambientOn, toggleAmbient, playClick, playSelect, playCorrect, playWrong, playComplete } =
    useNightAudio();

  function handleRegister(data: Participant) {
    playClick();
    setParticipant(data);
    setStage("examen");
  }

  function handleSelect(isCorrect: boolean) {
    if (isCorrect) playCorrect();
    else playWrong();
    playSelect();
  }

  function handleFinish(final: AnswerRecord[]) {
    playComplete();
    setAnswers(final);
    setStage("resultados");
  }

  function handleRestart() {
    playClick();
    setParticipant(null);
    setAnswers([]);
    setStage("registro");
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-10">
      <NightBackground />

      <button
        onClick={toggleAmbient}
        className="fixed right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-indigo-400/30 bg-slate-950/60 px-4 py-2 text-xs font-medium text-indigo-200 backdrop-blur-md transition hover:border-indigo-300/60 hover:bg-indigo-950/70"
      >
        <span className={ambientOn ? "animate-pulse" : ""}>{ambientOn ? "🔊" : "🔈"}</span>
        {ambientOn ? "Sonido ambiente activo" : "Activar sonido relajante"}
      </button>

      <div className="z-10 flex w-full flex-col items-center">
        {stage === "registro" && <RegistrationForm onSubmit={handleRegister} onKeyPress={playClick} />}
        {stage === "examen" && (
          <ExamView onFinish={handleFinish} onSelect={handleSelect} onClick={playClick} />
        )}
        {stage === "resultados" && participant && (
          <ResultsView participant={participant} answers={answers} onRestart={handleRestart} />
        )}
      </div>

      <p className="z-10 mt-8 text-center text-[11px] text-indigo-400/50">
        Josué • La Era de la Conquista — Examen nocturno interactivo
      </p>
    </div>
  );
}
