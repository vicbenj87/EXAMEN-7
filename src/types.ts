export interface Participant {
  nombre: string;
  apellido: string;
  ibm: string;
}

export interface AnswerRecord {
  questionId: number;
  questionText: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
}
