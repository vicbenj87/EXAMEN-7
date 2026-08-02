export interface Question {
  id: number;
  type: "seleccion" | "completar";
  text: string;
  options: string[];
  correct: string;
  reference?: string;
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    type: "seleccion",
    text: "¿Quién fue el líder que sucedió a Moisés para dirigir al pueblo de Israel hacia la Tierra Prometida?",
    options: ["Caleb", "Josué", "Aarón"],
    correct: "Josué",
  },
  {
    id: 2,
    type: "seleccion",
    text: "¿Por cuántos años deambularon los israelitas por el desierto debido a su rebelión en Cades-barnea?",
    options: ["12 años", "7 años", "40 años"],
    correct: "40 años",
  },
  {
    id: 3,
    type: "seleccion",
    text: "¿Cuál fue el primer gran reto que enfrentó Josué al dirigir a la nación?",
    options: ["La muralla de Jericó", "El cruce del río Jordán", "La batalla contra los cananeos"],
    correct: "La muralla de Jericó",
  },
  {
    id: 4,
    type: "seleccion",
    text: "¿Qué distancia aproximada se abrieron las aguas del Jordán para que el pueblo cruzara?",
    options: ["10 kilómetros", "30 kilómetros", "50 kilómetros"],
    correct: "30 kilómetros",
  },
  {
    id: 5,
    type: "seleccion",
    text: '¿Qué ciudad es descrita como un "pequeño oasis" y la "única entrada" a la Tierra Prometida?',
    options: ["Jericó", "Hai", "Jerusalén"],
    correct: "Jericó",
  },
  {
    id: 6,
    type: "seleccion",
    text: "En el séptimo día de la marcha sobre Jericó, ¿cuántas veces debían marchar alrededor de la ciudad?",
    options: ["Una vez", "Tres veces", "Siete veces"],
    correct: "Siete veces",
  },
  {
    id: 7,
    type: "seleccion",
    text: "¿Aproximadamente cuánto tiempo tomó completar la derrota de Canaán?",
    options: ["40 años", "7 años", "1 año"],
    correct: "7 años",
  },
  {
    id: 8,
    type: "seleccion",
    text: "¿Cómo se distribuyó el espacio de la tierra entre las doce tribus de Israel?",
    options: ["Por decisión directa de Josué", "Por sorteo (suerte)", "Según el tamaño de cada tribu"],
    correct: "Por sorteo (suerte)",
  },
  {
    id: 9,
    type: "seleccion",
    text: "¿Qué tipo de relación establecieron las tribus entre sí una vez asentadas en sus áreas?",
    options: ["Una monarquía centralizada", "Una relación federal informal", "Una alianza militar obligatoria"],
    correct: "Una relación federal informal",
  },
  {
    id: 10,
    type: "seleccion",
    text: "¿Quién se le apareció a Josué para darle instrucciones sobre cómo conquistar Jericó?",
    options: ["Moisés en una visión", "El ángel del Señor", "Un profeta de las tribus"],
    correct: "El ángel del Señor",
  },
  {
    id: 11,
    type: "completar",
    text: "El resumen histórico de esta era indica que Josué dirige la ____ de la Tierra Prometida.",
    options: ["salida", "conquista", "formación"],
    correct: "conquista",
  },
  {
    id: 12,
    type: "completar",
    text: "El cruce del Jordán es considerado la ____ división milagrosa de las aguas que Dios realizó para Israel.",
    options: ["primera", "segunda", "última"],
    correct: "segunda",
  },
  {
    id: 13,
    type: "completar",
    text: "Antes de que el agua se dividiera, Josué ordenó que los ____ entraran primero al río Jordán.",
    options: ["soldados", "ancianos", "sacerdotes"],
    correct: "sacerdotes",
  },
  {
    id: 14,
    type: "completar",
    text: "Los ____ se unieron en su aborrecimiento de los israelitas, pero no en su oposición militar.",
    options: ["egipcios", "cananeos", "filisteos"],
    correct: "cananeos",
  },
  {
    id: 15,
    type: "completar",
    text: "Para conquistar Canaán, Josué entró por el medio hacia el mar ____.",
    options: ["Rojo", "Muerto", "Mediterráneo"],
    correct: "Mediterráneo",
  },
  {
    id: 16,
    type: "completar",
    text: "Después de dividir la tierra por el medio, Josué empezó a conquistar de ____ a norte.",
    options: ["este", "sur", "oeste"],
    correct: "sur",
  },
  {
    id: 17,
    type: "completar",
    text: "Cada una de las doce tribus era responsable de ____ el dominio de su área asignada.",
    options: ["abandonar", "finalizar", "ignorar"],
    correct: "finalizar",
  },
  {
    id: 18,
    type: "completar",
    text: "La primera división milagrosa de las aguas (antes del Jordán) fue la del Mar ____.",
    options: ["de Galilea", "Muerto", "Rojo"],
    correct: "Rojo",
  },
  {
    id: 19,
    type: "completar",
    text: "La era de la conquista se divide en cuatro sucesos principales: Jordán, Jericó, Conquista y ____.",
    options: ["Éxodo", "Dominio", "Jueces"],
    correct: "Dominio",
  },
];
