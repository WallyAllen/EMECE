// =====================================================================
// SCRIPT 1: INICIALIZADOR DEL CRM Y SIMULADOR
// =====================================================================

function inicializarCRMNuevo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Crear hoja Staging (Columna Origen añadida en posición 15)
  let sheetStaging = ss.getSheetByName("Staging");
  if (!sheetStaging) sheetStaging = ss.insertSheet("Staging");
  
  const headersStaging = [
    "user_id", "nombre", "telefono", "rubro", "subtipo", 
    "medidas", "foto_url", "zona", "fase_completada", "calificacion_sesion", 
    "arq_tipo_obra", "arq_superficie", "arq_ambientes", "arq_descripcion", "origen", "Estado_Proceso"
  ];
  sheetStaging.getRange(1, 1, 1, headersStaging.length).setValues([headersStaging]).setFontWeight("bold");

  // 2. Crear hoja Contactos
  let sheetContactos = ss.getSheetByName("Contactos");
  if (!sheetContactos) sheetContactos = ss.insertSheet("Contactos");
  else sheetContactos.clear(); 
  
  const headersContactos = [
    "Manychat_ID", "Fecha_Primera_Consulta", "Fecha_Ultima_Interaccion", 
    "Nombre", "Telefono", "Zona", "Calificacion_Maxima", "Sesiones_Totales",
    "Etapa", "Fecha_Contacto", "Valor_Estimado", "Resultado", "Notas", "Historial_Rubros"
  ];
  sheetContactos.getRange(1, 1, 1, headersContactos.length).setValues([headersContactos]).setFontWeight("bold");

  // 3. Crear hoja Interacciones (Columna Origen añadida en posición 3)
  let sheetInteracciones = ss.getSheetByName("Interacciones");
  if (!sheetInteracciones) sheetInteracciones = ss.insertSheet("Interacciones");
  else sheetInteracciones.clear();
  
  const headersInteracciones = [
    "Timestamp", "Manychat_ID", "Origen", "Rubro", "Subtipo", "Medidas", "Foto_URL", "Zona", 
    "Fase_Completada", "Calificacion_Sesion", "Arq_Tipo_Obra", "Arq_Superficie", 
    "Arq_Ambientes", "Arq_Descripcion"
  ];
  sheetInteracciones.getRange(1, 1, 1, headersInteracciones.length).setValues([headersInteracciones]).setFontWeight("bold");

  Logger.log("CRM Inicializado con trazabilidad de origen.");
}

// =====================================================================
// SCRIPT 2: MOTOR DE AUTOMATIZACIÓN (TRIGGER)
// =====================================================================

function crearDisparadorAutomatico() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Limpieza de disparadores previos para evitar bucles de duplicación
  const triggers = ScriptApp.getProjectTriggers();
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'procesarStaging') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  // Creación del nuevo disparador anclado al evento 'onChange'
  ScriptApp.newTrigger('procesarStaging')
    .forSpreadsheet(ss)
    .onChange()
    .create();
    
  Logger.log("Disparador automático activado. El sistema ahora opera en tiempo real.");
}

// =====================================================================
// SCRIPT 3: EL WEBHOOK DE STAGING Y UPSERT
// =====================================================================

function procesarStaging(e) {
  if (e && e.changeType && e.changeType !== "INSERT_ROW") return;

  const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheetStaging = ss.getSheetByName("Staging");
  if (!sheetStaging) return;

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); 
  } catch (err) {
    return;
  }

  try {
    const dataStaging = sheetStaging.getDataRange().getValues();
    if (dataStaging.length < 2) return;

    let procesadas = 0;

    for (let i = 1; i < dataStaging.length; i++) {
      const fila = dataStaging[i];
      const estadoProceso = fila[15]; // Desplazado al índice 15

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
        arq_descripcion:     fila[13] || "",
        origen:              fila[14] || "Orgánico" // Captura el origen
      };

      if (!payload.user_id) {
        sheetStaging.getRange(i + 1, 16).setValue("⚠️ Sin user_id"); // Desplazado a columna 16
        continue;
      }

      if (payload.calificacion_sesion == "2") payload.calificacion_sesion = "🔴 Frío";
      if (payload.calificacion_sesion == "3") payload.calificacion_sesion = "🟡 Tibio";
      if (payload.calificacion_sesion == "4") payload.calificacion_sesion = "🟢 Caliente";

      _ejecutarUpsert(payload);
      sheetStaging.getRange(i + 1, 16).setValue("✅ Procesado");
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

  // 1. ACTUALIZAR "CONTACTOS" (Identidad no cambia de origen, es irrelevante aquí)
  if (filaExistente === -1) {
    sheetContactos.appendRow([
      payload.user_id, ahora, ahora, payload.nombre, payload.telefono, 
      payload.zona, payload.calificacion_sesion, 1, "Nuevo", "", "", "", "", payload.rubro
    ]);
  } else {
    const filaActual = dataContactos[filaExistente - 1];
    const calificacionActual = filaActual[6]; 
    const sesionesActuales = parseInt(filaActual[7]) || 1; 
    const historialActual = filaActual[13] || ""; 

    let historialNuevo = historialActual;
    if (payload.rubro && historialActual.indexOf(payload.rubro) === -1) {
      historialNuevo = historialActual === "" ? payload.rubro : historialActual + ", " + payload.rubro;
    }

    const scoreNuevo = JERARQUIA[payload.calificacion_sesion] || 1;
    const scoreActual = JERARQUIA[calificacionActual] || 1;
    const calificacionFinal = scoreNuevo > scoreActual ? payload.calificacion_sesion : calificacionActual;

    sheetContactos.getRange(filaExistente, 3).setValue(ahora); 
    if (payload.nombre) sheetContactos.getRange(filaExistente, 4).setValue(payload.nombre); 
    if (payload.telefono) sheetContactos.getRange(filaExistente, 5).setValue(payload.telefono); 
    if (payload.zona) sheetContactos.getRange(filaExistente, 6).setValue(payload.zona); 
    sheetContactos.getRange(filaExistente, 7).setValue(calificacionFinal); 
    sheetContactos.getRange(filaExistente, 8).setValue(sesionesActuales + 1); 
    sheetContactos.getRange(filaExistente, 14).setValue(historialNuevo); 
  }

  // 2. ACTUALIZAR "INTERACCIONES" (Se inyecta el origen en la columna C)
  sheetInteracciones.appendRow([
    ahora, payload.user_id, payload.origen, payload.rubro, payload.subtipo, payload.medidas, 
    payload.foto_url, payload.zona, payload.fase_completada, payload.calificacion_sesion,
    payload.arq_tipo_obra, payload.arq_superficie, payload.arq_ambientes, payload.arq_descripcion
  ]);
}