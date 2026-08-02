import { GOOGLE_SCRIPT_URL } from "../config";
import type { AnswerRecord, Participant } from "../types";

export interface SubmissionPayload {
  participant: Participant;
  score: number;
  total: number;
  percentage: number;
  answers: AnswerRecord[];
}

/**
 * Envía el registro del participante y su calificación a la hoja de Google.
 * Usamos mode: "no-cors" + Content-Type: text/plain para evitar el bloqueo
 * de preflight CORS que Google Apps Script no maneja correctamente.
 * Esto significa que no podemos leer la respuesta, pero el registro se guarda.
 */
export async function submitToSheet(payload: SubmissionPayload): Promise<boolean> {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("PEGA_AQUI")) {
    console.warn(
      "GOOGLE_SCRIPT_URL no está configurada. Edita src/config.ts con la URL de tu Apps Script."
    );
    return false;
  }

  const body = {
    nombre: payload.participant.nombre,
    apellido: payload.participant.apellido,
    ibm: payload.participant.ibm,
    puntaje: payload.score,
    total: payload.total,
    porcentaje: payload.percentage,
    respuestas: payload.answers
      .map((a, i) => `${i + 1}. ${a.selected}${a.isCorrect ? " ✔" : ` (correcta: ${a.correct})`}`)
      .join(" | "),
  };

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
    });
    return true;
  } catch (err) {
    console.error("Error al enviar datos a Google Sheets:", err);
    return false;
  }
}
