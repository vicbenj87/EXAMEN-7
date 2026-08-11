export interface Question {
  id: string;
  pregunta: string;
  opciones: string[];
  correcta: number;
  tiempo: number; // segundos específicos para esta pregunta
}

export interface Answer {
  selected: number | null;
  correct: boolean;
  timeUp: boolean;
}

export interface QuizConfig {
  tiempoPorDefecto: number;
  preguntas: Question[];
}

export type Screen = "home" | "editor" | "quiz" | "result";
