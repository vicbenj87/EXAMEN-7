import type { Question } from "@/types/exam";
import { HOW_TO_BY_TYPE } from "@/data/howTo";

// Banco de preguntas — Examen: "La Era de los Jueces"
export const QUESTIONS: Question[] = [
  // ---------------------------------------------------------------------
  // I. Selección múltiple
  // ---------------------------------------------------------------------
  {
    id: 1,
    section: "I. Selección Múltiple",
    type: "multiple-choice",
    prompt: '¿Quién fue "María Basura" según el relato inicial?',
    howTo: HOW_TO_BY_TYPE["multiple-choice"],
    options: [
      { key: "a", text: "Una mujer pobre que heredó una fortuna al final de su vida." },
      { key: "b", text: "Una millonaria que prefería vivir como una mendiga, buscando en la basura." },
      { key: "c", text: "Una jueza de Israel conocida por su humildad." },
      { key: "d", text: "La hija de un abogado que perdió todo su dinero en Kansas." },
    ],
    correct: "b",
  },
  {
    id: 2,
    section: "I. Selección Múltiple",
    type: "multiple-choice",
    prompt: '¿Cómo define el texto a los "Jueces" de Israel?',
    howTo: HOW_TO_BY_TYPE["multiple-choice"],
    options: [
      { key: "a", text: "Hombres con togas negras que tomaban decisiones legales." },
      { key: "b", text: "Líderes espirituales que solo se dedicaban a la oración." },
      { key: "c", text: "Líderes políticos y militares que ejercieron un poder casi absoluto." },
      { key: "d", text: "Patriarcas que lucharon en Israel antes de Saúl." },
    ],
    correct: "c",
  },
  {
    id: 3,
    section: "I. Selección Múltiple",
    type: "multiple-choice",
    prompt: "¿Cuál de estos jueces derrotó a un ejército con solo trescientos hombres?",
    howTo: HOW_TO_BY_TYPE["multiple-choice"],
    options: [
      { key: "a", text: "Sansón." },
      { key: "b", text: "Débora." },
      { key: "c", text: "Gedeón." },
      { key: "d", text: "Samuel." },
    ],
    correct: "c",
  },
  {
    id: 4,
    section: "I. Selección Múltiple",
    type: "multiple-choice",
    prompt: "¿Qué personaje es descrito como el último juez y el primer profeta?",
    howTo: HOW_TO_BY_TYPE["multiple-choice"],
    options: [
      { key: "a", text: "Josué." },
      { key: "b", text: "Samuel." },
      { key: "c", text: "Gedeón." },
      { key: "d", text: "Moisés." },
    ],
    correct: "b",
  },
  {
    id: 5,
    section: "I. Selección Múltiple",
    type: "multiple-choice",
    prompt: 'Según el texto: ¿Cuál fue el resultado de que el pueblo hiciera "lo que bien le parecía"?',
    howTo: HOW_TO_BY_TYPE["multiple-choice"],
    options: [
      { key: "a", text: "Prosperidad económica y paz con los vecinos." },
      { key: "b", text: "Bancarrota moral, social y espiritual por casi cuatrocientos años." },
      { key: "c", text: "Una expansión territorial sin precedentes." },
      { key: "d", text: "El fortalecimiento de las leyes de Moisés." },
    ],
    correct: "b",
  },

  // ---------------------------------------------------------------------
  // II. Ubicación en el mapa
  // ---------------------------------------------------------------------
  {
    id: 6,
    section: "II. Ubicación en el Mapa",
    type: "map-drag",
    prompt:
      "Arrastra cada región al lugar correspondiente en el mapa del Cercano Oriente Antiguo.",
    howTo: HOW_TO_BY_TYPE["map-drag"],
    chips: [
      { id: "filistea", label: "Filistea" },
      { id: "moab", label: "Moab" },
      { id: "mesopotamia", label: "Mesopotamia" },
      { id: "canaan", label: "Canaán" },
      { id: "amon", label: "Amón" },
      { id: "madian", label: "Madián" },
    ],
    zones: [
      { id: "z1", x: 30, y: 42, correctChipId: "canaan" },
      { id: "z2", x: 20, y: 62, correctChipId: "filistea" },
      { id: "z3", x: 43, y: 52, correctChipId: "moab" },
      { id: "z4", x: 45, y: 38, correctChipId: "amon" },
      { id: "z5", x: 50, y: 76, correctChipId: "madian" },
      { id: "z6", x: 80, y: 28, correctChipId: "mesopotamia" },
    ],
  },

  // ---------------------------------------------------------------------
  // III. Verdadero o Falso
  // ---------------------------------------------------------------------
  {
    id: 7,
    section: "III. Verdadero o Falso",
    type: "true-false",
    prompt: "Moisés instruyó a Israel a casarse con los cananeos para mantener la paz.",
    howTo: HOW_TO_BY_TYPE["true-false"],
    correct: false,
    feedback:
      "Falso. Una de las instrucciones fue evitar casarse con los cananeos para evitar la corrupción moral.",
  },
  {
    id: 8,
    section: "III. Verdadero o Falso",
    type: "true-false",
    prompt: "La historia de Rut ocurre durante la era de los jueces.",
    howTo: HOW_TO_BY_TYPE["true-false"],
    correct: true,
    feedback: "Verdadero.",
  },
  {
    id: 9,
    section: "III. Verdadero o Falso",
    type: "true-false",
    prompt: "Se registran exactamente siete ciclos de desventuras en el libro de los Jueces.",
    howTo: HOW_TO_BY_TYPE["true-false"],
    correct: true,
    feedback: "Verdadero.",
  },
  {
    id: 10,
    section: "III. Verdadero o Falso",
    type: "true-false",
    prompt: "Sansón es considerado el juez más famoso debido a su fuerza fabulosa.",
    howTo: HOW_TO_BY_TYPE["true-false"],
    correct: true,
    feedback: "Verdadero.",
  },

  // ---------------------------------------------------------------------
  // IV. Completar el texto
  // ---------------------------------------------------------------------
  {
    id: 11,
    section: "IV. Completar el Texto",
    type: "fill-blank",
    prompt: "El ciclo de los jueces comienza con el ___1___ de Israel.",
    template: "El ciclo de los jueces comienza con el ___1___ de Israel.",
    howTo: HOW_TO_BY_TYPE["fill-blank"],
    blanks: [{ accepted: ["pecado"] }],
  },
  {
    id: 12,
    section: "IV. Completar el Texto",
    type: "fill-blank",
    prompt:
      "Dios disciplinaba a su pueblo mediante la ___1___ militar por parte de una nación vecina.",
    template:
      "Dios disciplinaba a su pueblo mediante la ___1___ militar por parte de una nación vecina.",
    howTo: HOW_TO_BY_TYPE["fill-blank"],
    blanks: [{ accepted: ["conquista"] }],
  },
  {
    id: 13,
    section: "IV. Completar el Texto",
    type: "fill-blank",
    prompt: "Rut, aunque no era hebrea, fue incluida en el linaje de ___1___ a ___2___.",
    template: "Rut, aunque no era hebrea, fue incluida en el linaje de ___1___ a ___2___.",
    howTo: HOW_TO_BY_TYPE["fill-blank"],
    blanks: [{ accepted: ["abraham"] }, { accepted: ["jesus", "jesús", "jesucristo"] }],
  },
  {
    id: 14,
    section: "IV. Completar el Texto",
    type: "fill-blank",
    prompt: "Josué dirigió la ___1___ de la ___2___.",
    template: "Josué dirigió la ___1___ de la ___2___.",
    howTo: HOW_TO_BY_TYPE["fill-blank"],
    blanks: [
      { accepted: ["conquista"] },
      { accepted: ["tierra prometida", "prometida"] },
    ],
  },
  {
    id: 15,
    section: "IV. Completar el Texto",
    type: "fill-blank",
    prompt: "Por medio de Moisés, Dios libera al pueblo hebreo de la ___1___ en Egipto.",
    template: "Por medio de Moisés, Dios libera al pueblo hebreo de la ___1___ en Egipto.",
    howTo: HOW_TO_BY_TYPE["fill-blank"],
    blanks: [{ accepted: ["esclavitud"] }],
  },
  {
    id: 16,
    section: "IV. Completar el Texto",
    type: "fill-blank",
    prompt: "La repetición de las desventuras de Israel empezaba de nuevo cuando el juez ___1___.",
    template:
      "La repetición de las desventuras de Israel empezaba de nuevo cuando el juez ___1___.",
    howTo: HOW_TO_BY_TYPE["fill-blank"],
    blanks: [{ accepted: ["muere", "moria", "moría", "fallece"] }],
  },

  // ---------------------------------------------------------------------
  // V. Preguntas de respuesta corta
  // ---------------------------------------------------------------------
  {
    id: 17,
    section: "V. Respuesta Corta",
    type: "short-answer",
    prompt:
      "¿Cuáles son los cuatro temas principales de la era de los jueces mencionados en el texto? (usa comas para separar las palabras)",
    howTo: HOW_TO_BY_TYPE["short-answer"],
    expectedKeywords: ["jueces", "rebelion", "ciclos", "rut"],
    sampleAnswer: "Jueces, Rebelión, Ciclos y Rut.",
    minRequiredMatches: 3,
  },
  {
    id: 18,
    section: "V. Respuesta Corta",
    type: "short-answer",
    prompt:
      "Menciona tres naciones que conquistaron a Israel durante esta era según el mapa geográfico. (usa comas para separar las palabras)",
    howTo: HOW_TO_BY_TYPE["short-answer"],
    expectedKeywords: ["filistea", "moab", "mesopotamia", "amon", "madian"],
    sampleAnswer: "Filistea, Moab, Mesopotamia, Amón, Madián (tres cualesquiera).",
    minRequiredMatches: 3,
  },
  {
    id: 19,
    section: "V. Respuesta Corta",
    type: "short-answer",
    prompt: "¿Qué tres cosas debía hacer Israel para evitar ser corrompida por los cananeos?",
    howTo: HOW_TO_BY_TYPE["short-answer"],
    expectedKeywords: ["destruir", "casarse", "adoracion"],
    sampleAnswer:
      "Destruir a todos los habitantes, evitar casarse con ellos y huir de la adoración a sus dioses.",
    minRequiredMatches: 2,
  },
  {
    id: 20,
    section: "V. Respuesta Corta",
    type: "short-answer",
    prompt: "¿Qué cualidades morales se destacan en la historia de Rut?",
    howTo: HOW_TO_BY_TYPE["short-answer"],
    expectedKeywords: ["amor", "pureza", "consagracion"],
    sampleAnswer: "Amor, pureza y consagración.",
    minRequiredMatches: 2,
  },
  {
    id: 21,
    section: "V. Respuesta Corta",
    type: "short-answer",
    prompt: "¿Cuántos años duró aproximadamente el periodo de rebelión y jueces?",
    howTo: HOW_TO_BY_TYPE["short-answer"],
    expectedKeywords: ["cuatrocientos"],
    sampleAnswer: "Cuatrocientos años.",
    minRequiredMatches: 1,
  },

  // ---------------------------------------------------------------------
  // VI. Secuencia y emparejamiento
  // ---------------------------------------------------------------------
  {
    id: 22,
    section: "VI. Secuencia y Emparejamiento",
    type: "ordering",
    prompt: 'Ordena cronológicamente los 5 componentes de un "Ciclo" en Jueces:',
    howTo: HOW_TO_BY_TYPE["ordering"],
    items: [
      { id: "c1", text: "Dios levanta un juez que los libera." },
      { id: "c2", text: "Pecado de Israel." },
      { id: "c3", text: "Dios libera la tierra mientras el juez vive." },
      { id: "c4", text: "Conquista militar (disciplina de Dios)." },
      { id: "c5", text: "Israel se arrepiente y clama a Dios." },
    ],
    correctOrder: ["c2", "c4", "c5", "c1", "c3"],
  },
  {
    id: 23,
    section: "VI. Secuencia y Emparejamiento",
    type: "matching",
    prompt: "Relaciona al personaje con su descripción:",
    howTo: HOW_TO_BY_TYPE["matching"],
    left: [
      { id: "debora", text: "Débora" },
      { id: "samuel", text: "Samuel" },
      { id: "gedeon", text: "Gedeón" },
      { id: "sanson", text: "Sansón" },
    ],
    right: [
      { id: "r_transicion", text: "Personaje de transición." },
      { id: "r_inicio", text: "Juez asignado al principio de la era." },
      { id: "r_famoso", text: "El juez más famoso." },
      { id: "r_300", text: "Derrotó a miles con 300 hombres." },
    ],
    correctMap: {
      debora: "r_inicio",
      samuel: "r_transicion",
      gedeon: "r_300",
      sanson: "r_famoso",
    },
  },
];
