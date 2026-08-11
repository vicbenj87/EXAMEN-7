import { useState } from "react";
import type { Answer, QuizConfig, Screen } from "./types";
import { loadConfig, saveConfig, resetConfig } from "./utils/storage";
import Home from "./components/Home";
import Editor from "./components/Editor";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

export default function App() {
  const [config, setConfig] = useState<QuizConfig>(() => loadConfig());
  const [screen, setScreen] = useState<Screen>("home");
  const [answers, setAnswers] = useState<Answer[]>([]);

  function handleSaveConfig(next: QuizConfig) {
    setConfig(next);
    saveConfig(next);
    setScreen("home");
  }

  function handleReset() {
    const fresh = resetConfig();
    setConfig(fresh);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-4 py-10 sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.25),transparent_60%)]" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="relative z-10 flex w-full justify-center">
        {screen === "home" && (
          <Home config={config} onStart={() => setScreen("quiz")} onEdit={() => setScreen("editor")} />
        )}

        {screen === "editor" && (
          <Editor
            initialConfig={config}
            onSave={handleSaveConfig}
            onCancel={() => setScreen("home")}
            onReset={handleReset}
          />
        )}

        {screen === "quiz" && config.preguntas.length > 0 && (
          <Quiz
            config={config}
            onFinish={(finalAnswers) => {
              setAnswers(finalAnswers);
              setScreen("result");
            }}
          />
        )}

        {screen === "result" && (
          <Result
            config={config}
            answers={answers}
            onRestart={() => setScreen("quiz")}
            onHome={() => setScreen("home")}
          />
        )}
      </div>
    </div>
  );
}
