import { GOOGLE_SCRIPT_URL, SHEET_NAME } from "@/config";
import type { AnsweredRecord } from "@/types/exam";

export interface SubmissionPayload {
  sheet: string;
  nombre: string;
  puntaje: number;
  total: number;
  porcentaje: number;
  respuestas: AnsweredRecord[];
  timestamp: string;
}

export async function submitResultsToSheet(
  nombre: string,
  score: number,
  total: number,
  records: AnsweredRecord[],
): Promise<"sent" | "skipped" | "error"> {
  if (!GOOGLE_SCRIPT_URL) return "skipped";

  const payload: SubmissionPayload = {
    sheet: SHEET_NAME,
    nombre,
    puntaje: score,
    total,
    porcentaje: Math.round((score / total) * 100),
    respuestas: records,
    timestamp: new Date().toISOString(),
  };

  try {
    // Los Web Apps de Apps Script no siempre devuelven cabeceras CORS,
    // por lo que se usa 'no-cors' (respuesta opaca, pero la fila igual se agrega).
    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return "sent";
  } catch (error) {
    console.error("No se pudo enviar el resultado a Google Sheets", error);
    return "error";
  }
}
