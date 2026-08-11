// Tipos centrales del motor de examen

export type QuestionType =
  | "multiple-choice"
  | "true-false"
  | "fill-blank"
  | "short-answer"
  | "ordering"
  | "matching"
  | "map-drag";

export interface BaseQuestion {
  id: number;
  section: string;
  type: QuestionType;
  prompt: string;
  /** Texto explicativo que se muestra en el pop-up de 5s antes del ejercicio */
  howTo: string;
}

export interface MultipleChoiceOption {
  key: string;
  text: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  options: MultipleChoiceOption[];
  correct: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: "true-false";
  correct: boolean;
  feedback: string;
}

export interface FillBlank {
  accepted: string[];
  placeholder?: string;
}

export interface FillBlankQuestion extends BaseQuestion {
  type: "fill-blank";
  /** Texto con marcadores ___1___, ___2___, etc. */
  template: string;
  blanks: FillBlank[];
}

export interface ShortAnswerQuestion extends BaseQuestion {
  type: "short-answer";
  expectedKeywords: string[];
  sampleAnswer: string;
  minMatchRatio?: number;
  /** Número mínimo de coincidencias exigidas (en vez de un ratio) */
  minRequiredMatches?: number;
}

export interface OrderingItem {
  id: string;
  text: string;
}

export interface OrderingQuestion extends BaseQuestion {
  type: "ordering";
  items: OrderingItem[];
  correctOrder: string[];
}

export interface MatchPair {
  id: string;
  text: string;
}

export interface MatchingQuestion extends BaseQuestion {
  type: "matching";
  left: MatchPair[];
  right: MatchPair[];
  correctMap: Record<string, string>;
}

export interface MapChip {
  id: string;
  label: string;
}

export interface MapZone {
  id: string;
  x: number;
  y: number;
  correctChipId: string;
}

export interface MapDragQuestion extends BaseQuestion {
  type: "map-drag";
  chips: MapChip[];
  zones: MapZone[];
}

export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | FillBlankQuestion
  | ShortAnswerQuestion
  | OrderingQuestion
  | MatchingQuestion
  | MapDragQuestion;

export interface AnsweredRecord {
  questionId: number;
  section: string;
  prompt: string;
  correct: boolean;
  timeUsedSeconds: number;
  userAnswerText: string;
  correctAnswerText: string;
}
