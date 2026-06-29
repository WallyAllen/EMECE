function procesarStaging(e) {
  // Solo reaccionar si se insertó una fila nueva
  if (!e || e.changeType !== "INSERT_ROW") return;

  const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheetStaging = ss.getSheetByName("Staging");
  if (!sheetStaging) return;

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // Esperar hasta 10 segs
  } catch (err) {
    return;
  }

  try {
    const dataStaging = sheetStaging.getDataRange().getValues();
    if (dataStaging.length < 2) return;

    let procesadas = 0;

    for (let i = 1; i < dataStaging.length; i++) {
      const fila = dataStaging[i];
      const estadoProceso = fila[14]; // Columna O: Estado_Proceso

      if (estadoProceso === "✅ Procesado") continue;

      const payload = {
        user_id:             String(fila[0]).trim(),
        nombre:              fila[1] || "",
        telefono:            fila[2] || "",
        rubro:               fila[3] || "",
        subtipo:             fila[4] || "",
        medidas:             fila[5] || "",
        foto_url:            fila[6] || "",
        zona:                fila[7] || "",
        fase_completada:     fila[8] || 0,
        calificacion_sesion: fila[9] || "🔴 Frío",
        arq_tipo_obra:       fila[10] || "",
        arq_superficie:      fila[11] || "",
        arq_ambientes:       fila[12] || "",
        arq_descripcion:     fila[13] || ""
      };

      if (!payload.user_id) {
        sheetStaging.getRange(i + 1, 15).setValue("⚠️ Sin user_id");
        continue;
      }

      // Convertir valores numéricos de calificación a texto (Si envías 2, 3 o 4)
      if (payload.calificacion_sesion == "2") payload.calificacion_sesion = "🔴 Frío";
      if (payload.calificacion_sesion == "3") payload.calificacion_sesion = "🟡 Tibio";
      if (payload.calificacion_sesion == "4") payload.calificacion_sesion = "🟢 Caliente";

      _ejecutarUpsert(payload);
      sheetStaging.getRange(i + 1, 15).setValue("✅ Procesado");
      procesadas++;
    }

    if (procesadas > 0) SpreadsheetApp.flush();

  } finally {
    lock.releaseLock();
  }
}

// =====================================================================
// LÓGICA DE REPARTO
// =====================================================================

function _ejecutarUpsert(payload) {
  const JERARQUIA = { "🔴 Frío": 1, "🟡 Tibio": 2, "🟢 Caliente": 3 };
  const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheetContactos = ss.getSheetByName("Contactos");
  const sheetInteracciones = ss.getSheetByName("Interacciones");
  
  const ahora = new Date();
  
  const dataContactos = sheetContactos.getDataRange().getValues();
  let filaExistente = -1;

  for (let i = 1; i < dataContactos.length; i++) {
    if (String(dataContactos[i][0]).trim() === String(payload.user_id).trim()) {
      filaExistente = i + 1;
      break;
    }
  }

  // 1. ACTUALIZAR "CONTACTOS"
  if (filaExistente === -1) {
    sheetContactos.appendRow([
      payload.user_id, ahora, ahora, payload.nombre, payload.telefono, 
      payload.zona, payload.calificacion_sesion, 1, "Nuevo", "", "", "", ""
    ]);
  } else {
    const filaActual = dataContactos[filaExistente - 1];
    const calificacionActual = filaActual[6]; // Columna G
    const sesionesActuales = parseInt(filaActual[7]) || 1; // Columna H

    const scoreNuevo = JERARQUIA[payload.calificacion_sesion] || 1;
    const scoreActual = JERARQUIA[calificacionActual] || 1;
    const calificacionFinal = scoreNuevo > scoreActual ? payload.calificacion_sesion : calificacionActual;

    sheetContactos.getRange(filaExistente, 3).setValue(ahora); // C
    if (payload.nombre) sheetContactos.getRange(filaExistente, 4).setValue(payload.nombre); // D
    if (payload.telefono) sheetContactos.getRange(filaExistente, 5).setValue(payload.telefono); // E
    if (payload.zona) sheetContactos.getRange(filaExistente, 6).setValue(payload.zona); // F
    sheetContactos.getRange(filaExistente, 7).setValue(calificacionFinal); // G
    sheetContactos.getRange(filaExistente, 8).setValue(sesionesActuales + 1); // H
  }

  // 2. ACTUALIZAR "INTERACCIONES"
  sheetInteracciones.appendRow([
    ahora, payload.user_id, payload.rubro, payload.subtipo, payload.medidas, 
    payload.foto_url, payload.zona, payload.fase_completada, payload.calificacion_sesion,
    payload.arq_tipo_obra, payload.arq_superficie, payload.arq_ambientes, payload.arq_descripcion
  ]);
}
