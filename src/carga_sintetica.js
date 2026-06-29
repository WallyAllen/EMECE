function generarSimulacionHistoricaCompleta() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetContactos = ss.getSheetByName("Contactos");
  const sheetInteracciones = ss.getSheetByName("Interacciones");

  if (!sheetContactos || !sheetInteracciones) {
    Logger.log("ERROR: Asegúrate de tener las hojas 'Contactos' y 'Interacciones' creadas.");
    return;
  }

  // Limpieza total del entorno para evitar colisiones de formato
  sheetContactos.clear();
  sheetInteracciones.clear();

  // Reestablecer encabezados
  const headersContactos = ["Manychat_ID", "Fecha_Primera_Consulta", "Fecha_Ultima_Interaccion", "Nombre", "Telefono", "Zona", "Calificacion_Maxima", "Sesiones_Totales", "Etapa", "Fecha_Contacto", "Valor_Estimado", "Resultado", "Notas", "Historial_Rubros"];
  sheetContactos.getRange(1, 1, 1, headersContactos.length).setValues([headersContactos]).setFontWeight("bold");

  const headersInteracciones = ["Timestamp", "Manychat_ID", "Origen", "Rubro", "Subtipo", "Medidas", "Foto_URL", "Zona", "Fase_Completada", "Calificacion_Sesion", "Arq_Tipo_Obra", "Arq_Superficie", "Arq_Ambientes", "Arq_Descripcion"];
  sheetInteracciones.getRange(1, 1, 1, headersInteracciones.length).setValues([headersInteracciones]).setFontWeight("bold");

  const nombres = ["Carlos Rossi", "Marina Fernandez", "Esteban Quito", "Julia Silva", "Lucas Palacios", "Florencia Diaz", "Alejandro Muñiz", "Patricia Sosa", "Roberto Piazza", "Natalia Oreiro"];
  const rubros = ["Aberturas", "Cortinas", "Arquitectura"];
  const zonas = ["La Plata", "City Bell", "Villa Elisa", "Gonnet", "Los Hornos", "Ensenada"];
  const calificaciones = ["🔴 Frío", "🟡 Tibio", "🟢 Caliente"];
  const origenes = ["Orgánico", "Orgánico", "Orgánico", "Watchdog"];

  const poolUsuarios = [];
  
  for (let i = 0; i < 30; i++) {
    poolUsuarios.push({
      id: "user_" + (2000 + i),
      nombre: nombres[i % nombres.length],
      telefono: "549221" + Math.floor(4000000 + Math.random() * 6000000),
      zona: zonas[i % zonas.length],
      interacciones: []
    });
  }

  const totalInteracciones = 90;
  const ahora = new Date();

  for (let i = 0; i < totalInteracciones; i++) {
    const usuario = poolUsuarios[Math.floor(Math.random() * poolUsuarios.length)];
    const diasAtras = Math.floor(Math.random() * 30);
    
    // Objeto Date puro, sin conversión a texto
    const fechaObj = new Date();
    fechaObj.setDate(ahora.getDate() - diasAtras);
    fechaObj.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

    const rubro = rubros[Math.floor(Math.random() * rubros.length)];
    const calificacion = calificaciones[Math.floor(Math.random() * calificaciones.length)];
    const origen = origenes[Math.floor(Math.random() * origenes.length)];
    
    // Control de flujo estricto del embudo
    const fasesPermitidas = (rubro === "Arquitectura") ? [1, 2, 3, 4, 5] : [1, 2, 3, 5];
    const fase = fasesPermitidas[Math.floor(Math.random() * fasesPermitidas.length)];

    let subtipo = "", medidas = "", foto_url = "", arq_tipo_obra = "", arq_superficie = "", arq_ambientes = "", arq_descripcion = "";
    
    if (rubro === "Aberturas" || rubro === "Cortinas") {
      subtipo = Math.random() > 0.5 ? "Obra Nueva" : "Remodelación";
      medidas = Math.floor(100 + Math.random() * 150) + "x" + Math.floor(100 + Math.random() * 150);
      foto_url = "https://storage.manychat.com/images/mock.png";
    } else {
      arq_tipo_obra = Math.random() > 0.5 ? "Casa" : "Departamento";
      arq_superficie = Math.floor(45 + Math.random() * 250) + "m2";
      arq_ambientes = String(Math.floor(1 + Math.random() * 6));
      arq_descripcion = "Proyecto de simulación histórica.";
    }

    usuario.interacciones.push({
      fechaObj, origen, rubro, subtipo, medidas, foto_url, fase, calificacion, arq_tipo_obra, arq_superficie, arq_ambientes, arq_descripcion
    });
  }

  const filasInteracciones = [];
  const filasContactos = [];
  const JERARQUIA = { "🔴 Frío": 1, "🟡 Tibio": 2, "🟢 Caliente": 3 };

  poolUsuarios.forEach(u => {
    if (u.interacciones.length === 0) return;

    u.interacciones.sort((a, b) => a.fechaObj - b.fechaObj);

    let calificacionMaxima = "🔴 Frío";
    let scoreMaximo = 1;
    const listaRubros = [];

    u.interacciones.forEach(int => {
      // Inyección de la variable fechaObj directa en el array bidimensional
      filasInteracciones.push([
        int.fechaObj, u.id, int.origen, int.rubro, int.subtipo, int.medidas,
        int.foto_url, u.zona, int.fase, int.calificacion, int.arq_tipo_obra,
        int.arq_superficie, int.arq_ambientes, int.arq_descripcion
      ]);

      const scoreActual = JERARQUIA[int.calificacion] || 1;
      if (scoreActual > scoreMaximo) {
        scoreMaximo = scoreActual;
        calificacionMaxima = int.calificacion;
      }

      if (listaRubros.indexOf(int.rubro) === -1) {
        listaRubros.push(int.rubro);
      }
    });

    const primeraConsulta = u.interacciones[0].fechaObj;
    const ultimaInteraccion = u.interacciones[u.interacciones.length - 1].fechaObj;

    filasContactos.push([
      u.id, primeraConsulta, ultimaInteraccion, u.nombre, u.telefono, u.zona,
      calificacionMaxima, u.interacciones.length, "Nuevo", "", "", "", "", listaRubros.join(", ")
    ]);
  });

  if (filasInteracciones.length > 0) {
    sheetInteracciones.getRange(2, 1, filasInteracciones.length, filasInteracciones[0].length).setValues(filasInteracciones);
  }
  if (filasContactos.length > 0) {
    sheetContactos.getRange(2, 1, filasContactos.length, filasContactos[0].length).setValues(filasContactos);
  }

  Logger.log("Ejecución finalizada. Datos inyectados de forma nativa.");
}