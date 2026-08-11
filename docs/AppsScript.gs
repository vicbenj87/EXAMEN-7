/**
 * Google Apps Script para recibir los resultados del examen
 * "La Era de los Jueces" y agregarlos como fila nueva en la hoja "RC8"
 * de la planilla:
 * https://docs.google.com/spreadsheets/d/1xtsQyxeNEno3EJ8s-7o0RqXdHr3HORiRuI5vUCOv-gE
 *
 * INSTALACIÓN:
 * 1. Abre la planilla de Google Sheets.
 * 2. Ve a Extensiones > Apps Script.
 * 3. Borra el contenido por defecto y pega este archivo completo.
 * 4. Guarda y presiona "Implementar" > "Nueva implementación".
 * 5. Tipo: "Aplicación web". Ejecutar como: "Yo". Quién tiene acceso: "Cualquier usuario".
 * 6. Copia la URL resultante y pégala en src/config.ts en GOOGLE_SCRIPT_URL.
 */

var SHEET_NAME = "RC8";
var HEADERS = [
  "Marca temporal",
  "Nombre",
  "Puntaje",
  "Total",
  "Porcentaje",
  "Respuestas (detalle)",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = data.sheet || SHEET_NAME;
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    var detalle = (data.respuestas || [])
      .map(function (r) {
        return (
          "#" +
          r.questionId +
          " [" +
          (r.correct ? "OK" : "X") +
          "] " +
          r.prompt +
          " -> Resp: " +
          r.userAnswerText +
          " | Correcta: " +
          r.correctAnswerText
        );
      })
      .join("\n");

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.nombre || "Anónimo",
      data.puntaje,
      data.total,
      data.porcentaje + "%",
      detalle,
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok" }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
