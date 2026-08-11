import type { QuizConfig } from "../types";
import { defaultConfig } from "../data/defaultQuestions";

const KEY = "examen_jueces_config_v1";

export function loadConfig(): QuizConfig {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return clone(defaultConfig);
    const parsed = JSON.parse(raw) as QuizConfig;
    if (!parsed.preguntas || !Array.isArray(parsed.preguntas)) return clone(defaultConfig);
    return parsed;
  } catch {
    return clone(defaultConfig);
  }
}

export function saveConfig(config: QuizConfig) {
  localStorage.setItem(KEY, JSON.stringify(config));
}

export function resetConfig(): QuizConfig {
  localStorage.removeItem(KEY);
  return clone(defaultConfig);
}

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}
