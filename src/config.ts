// Configuración general de la aplicación de examen

export const EXAM_TITLE = "La Era de los Jueces";
export const EXAM_SUBTITLE =
  "Examen interactivo — Israel entre la conquista y la monarquía";

/** Segundos disponibles para responder cada ejercicio */
export const QUESTION_TIME_SECONDS = 20;

/** Milisegundos que dura el pop-up de instrucciones antes de cada ejercicio */
export const INSTRUCTION_POPUP_MS = 5000;

/** Milisegundos que se muestra la retroalimentación antes de pasar al siguiente ejercicio */
export const FEEDBACK_DELAY_MS = 2600;

/**
 * URL del Google Apps Script (Web App) que recibe los resultados y los agrega
 * a la hoja "RC8" de la planilla de resultados:
 * https://docs.google.com/spreadsheets/d/1xtsQyxeNEno3EJ8s-7o0RqXdHr3HORiRuI5vUCOv-gE
 *
 * Para activar el envío automático:
 * 1. Abre la planilla y ve a Extensiones > Apps Script.
 * 2. Pega el contenido de "docs/AppsScript.gs" (incluido en este proyecto).
 * 3. Implementa como "Aplicación web", acceso "Cualquier usuario".
 * 4. Copia la URL generada y pégala abajo en GOOGLE_SCRIPT_URL.
 */
export const GOOGLE_SCRIPT_URL = "";

export const SHEET_NAME = "RC8";
