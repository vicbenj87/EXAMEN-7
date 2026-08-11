import type { QuestionType } from "@/types/exam";

// Explicación estándar de cómo resolver cada tipo de ejercicio.
// Se muestra en el pop-up de 5 segundos antes de iniciar cada pregunta.
export const HOW_TO_BY_TYPE: Record<QuestionType, string> = {
  "multiple-choice":
    "Lee la pregunta con atención y toca la única opción correcta entre las cuatro alternativas (a, b, c, d).",
  "true-false":
    "Lee el enunciado y decide si la afirmación es Verdadera o Falsa tocando el botón correspondiente.",
  "fill-blank":
    "Lee el enunciado y escribe en cada casilla la palabra que falta para completar la idea correctamente.",
  "short-answer":
    "Escribe tu respuesta en el recuadro de texto. Si se piden varios elementos, sepáralos con comas.",
  ordering:
    "Usa las flechas ↑ ↓ (o arrastra) para ordenar los elementos de la lista, del primero al último, según la secuencia correcta.",
  matching:
    "Para cada personaje de la izquierda, selecciona en el menú la descripción que le corresponde a la derecha.",
  "map-drag":
    "Arrastra cada nombre de región hacia el punto numerado del mapa donde crees que se ubica. En pantallas táctiles: toca el nombre y luego toca el punto del mapa.",
};
