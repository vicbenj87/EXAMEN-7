import type { QuizConfig } from "../types";

export const DEFAULT_TIME = 20;

export const defaultConfig: QuizConfig = {
  tiempoPorDefecto: DEFAULT_TIME,
  preguntas: [
    {
      id: "q1",
      pregunta: "¿Quién fue el primer juez que Dios levantó para librar a Israel?",
      opciones: ["Aod", "Otoniel", "Débora", "Gedeón"],
      correcta: 1,
      tiempo: 20,
    },
    {
      id: "q2",
      pregunta: "¿Qué juez israelita era zurdo y mató al rey Eglón de Moab?",
      opciones: ["Aod", "Samgar", "Barac", "Tola"],
      correcta: 0,
      tiempo: 20,
    },
    {
      id: "q3",
      pregunta: "¿Qué profetisa y jueza guio a Israel junto con Barac contra Sísara?",
      opciones: ["Jael", "Débora", "Ana", "Miriam"],
      correcta: 1,
      tiempo: 20,
    },
    {
      id: "q4",
      pregunta: "¿Quién mató a Sísara clavándole una estaca en la sien?",
      opciones: ["Débora", "Jael", "Dalila", "Rahab"],
      correcta: 1,
      tiempo: 25,
    },
    {
      id: "q5",
      pregunta: "¿Cuántos hombres usó Gedeón para derrotar al ejército madianita?",
      opciones: ["10,000", "1,000", "300", "3,000"],
      correcta: 2,
      tiempo: 20,
    },
    {
      id: "q6",
      pregunta: "¿Qué señal pidió Gedeón a Dios usando un vellón de lana?",
      opciones: [
        "Que lloviera fuego del cielo",
        "Que el vellón estuviera mojado o seco mientras el suelo hacía lo contrario",
        "Que se abriera el Jordán",
        "Que apareciera un ángel",
      ],
      correcta: 1,
      tiempo: 25,
    },
    {
      id: "q7",
      pregunta: "¿Qué juez hizo un voto imprudente que le costó la vida de su hija?",
      opciones: ["Jefté", "Sansón", "Elón", "Ibzán"],
      correcta: 0,
      tiempo: 20,
    },
    {
      id: "q8",
      pregunta: "¿Qué juez tuvo una fuerza sobrehumana dada por Dios mediante el voto nazareo?",
      opciones: ["Sansón", "Tola", "Jair", "Abdón"],
      correcta: 0,
      tiempo: 15,
    },
    {
      id: "q9",
      pregunta: "¿Quién traicionó a Sansón cortándole el cabello?",
      opciones: ["Dalila", "Jael", "Débora", "Micaía"],
      correcta: 0,
      tiempo: 15,
    },
    {
      id: "q10",
      pregunta: "¿Con qué objeto mató Sansón a mil filisteos?",
      opciones: ["Una espada", "Una quijada de asno", "Una honda", "Una lanza"],
      correcta: 1,
      tiempo: 20,
    },
    {
      id: "q11",
      pregunta:
        "Según el libro de Jueces, ¿qué hacía cada quien porque no había rey en Israel?",
      opciones: [
        "Lo que era recto en su propia opinión",
        "Sacrificios diarios",
        "Guerra contra Egipto",
        "Peregrinaciones a Silo",
      ],
      correcta: 0,
      tiempo: 20,
    },
    {
      id: "q12",
      pregunta:
        "¿Cuántas veces se repite el ciclo de pecado-opresión-clamor-liberación en el libro de Jueces?",
      opciones: ["Una vez", "Varias veces, de forma cíclica", "Nunca ocurre", "Solo con Sansón"],
      correcta: 1,
      tiempo: 20,
    },
  ],
};
