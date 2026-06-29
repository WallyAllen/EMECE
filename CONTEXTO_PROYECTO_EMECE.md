# PROYECTO: Servicios de Automatización y Análisis de Datos para Grupo Emece

> **Documento de contexto maestro.** Contiene todo el conocimiento acumulado
> para que un agente de IA pueda retomar este proyecto sin pérdida de información.
> Última actualización: 24 de junio de 2026 — v3.0 (Arquitectura Implementada).

---

## 1. PERFIL DEL USUARIO (Yo)

- **Situación profesional:** Estoy buscando mi primer trabajo/cliente en análisis de datos.
- **Nivel de experiencia:** Junior. Tengo conocimientos técnicos básicos pero aún no tengo portafolio ni clientes previos.
- **Estrategia elegida:** En lugar de competir en el mercado laboral formal, decidí buscar PYMEs argentinas con baja madurez digital y ofrecerles servicios directamente.
- **País:** Argentina.
- **Objetivo inmediato:** Conseguir mi primer cliente real, cobrar por un servicio tangible y construir un caso de éxito para mi portafolio.
- **Stack que manejo o puedo aprender rápido:** Python, Google Sheets, herramientas no-code (Manychat), Google Analytics 4, Looker Studio.

---

## 2. LA EMPRESA OBJETIVO: GRUPO EMECE

### Datos generales
| Campo | Detalle |
|---|---|
| **Nombre** | Grupo Emece |
| **Sitio web** | https://emece.ar/ |
| **Ubicación** | Sáenz Peña, Buenos Aires (GBA) |
| **Fundador/Contacto** | Arq. Mauro Capalbo |
| **Teléfono/WhatsApp** | +54 11 6447-2227 |
| **Email** | info@emece.ar |
| **Instagram** | @grupo.emece |
| **WhatsApp directo** | https://api.whatsapp.com/send?phone=541164472227 |
| **Diseñador web actual** | Agencia Izag (https://agenciaizag.com) |

### Unidades de negocio (3 rubros integrados)
1. **Arquitectura:** Diseño, dirección y construcción llave en mano. Estudio de arquitectura propio.
2. **Fábrica de Aberturas:** Trabajan con líneas Aluar (Modena, A30), Alcemar (Delta, Alfa), Aluwind, Hydro. Ofrecen vidrio simple y DVH, premarco, mosquiteros, laminado de seguridad. Reemplazan aberturas sin romper paredes.
3. **Fábrica de Cortinas:** +15 años en el rubro. Fabrican cortinas Blackout (100% bloqueo de luz), Sun Screen (visibilidad unidireccional, varias líneas: Chinas, Mermet, Office, Mediterránea) y Roller Doble (combo Blackout + Sun Screen). Son importadores directos.

### Stack tecnológico del sitio web
- **CMS:** WordPress 6.2.9 (versión desactualizada, de 2023)
- **Constructor visual:** Elementor
- **Formulario de contacto:** Contact Form 7 (plugin básico)
- **Tema:** Kava 2.0.1
- **Menú:** Jet Menu plugin
- **Tipografía:** Roboto + Montserrat (Google Fonts)
- **Idioma:** Español (es-AR)

### Páginas del sitio (5 en total)
| Página | URL | Contenido |
|---|---|---|
| Inicio | https://emece.ar/ | Landing page general |
| Nosotros | https://emece.ar/nosotros/ | Descripción de la empresa, filosofía |
| Aberturas | https://emece.ar/aberturas/ | Catálogo de líneas de aberturas, proveedores |
| Arquitectura | https://emece.ar/arquitectura/ | Estudio de arquitectura, servicios |
| Cortinas | https://emece.ar/cortinas/ | Tipos de cortinas, cómo tomar medidas, colores |
| Contacto | https://emece.ar/#contacto | Sección dentro del home (ancla) |

> **Nota:** /servicios/ y /contacto/ devuelven error 404. El contacto está como sección ancla dentro del home.

---

## 3. DIAGNÓSTICO COMPLETO DE LA EMPRESA

### Nivel de madurez digital: MUY BAJO

#### Problemas detectados:
1. **Sin Google Analytics ni Google Tag Manager instalados** → No hay datos de tráfico web. Literalmente cero métricas históricas.
2. **Sin píxel de Meta/Facebook** → No miden conversiones desde Instagram.
3. **Web 100% estática (folleto digital)** → 5 páginas con texto e imágenes, sin funcionalidad interactiva.
4. **Sin formulario de cotización estructurado** → Solo Contact Form 7 básico.
5. **Sin precios, catálogos descargables ni presupuestador online.**
6. **Sin blog ni contenido SEO** → Pierden tráfico orgánico de búsquedas como "aberturas aluminio Sáenz Peña".
7. **WhatsApp 100% manual** → Sin bot, sin respuesta automática, sin calificación de leads.
8. **Sin CRM ni tracking de clientes** → No saben de dónde vienen sus clientes ni cuántos presupuestos se cierran.
9. **WordPress desactualizado** → 6.2.9 (2023), posible riesgo de seguridad.
10. **Instagram sin integración con el sitio** → No saben qué publicaciones generan visitas o consultas.

#### Aspectos positivos:
1. Empresa real con tres rubros activos y fábricas propias.
2. Ya invirtieron en una agencia para el sitio web (Agencia Izag) → hay disposición previa a invertir en digital.
3. Tienen presencia activa en Instagram.
4. Zona GBA → potencial de escala.

---

## 4. DECISIONES ESTRATÉGICAS YA TOMADAS

> Estas decisiones ya fueron discutidas y acordadas. No volver a debatirlas.

### ✅ Decisión 1: Entrar con el Bot de WhatsApp primero (NO con Analytics)
**Motivo:** El bot resuelve un "dolor activo" (perder consultas fuera de horario). GA4 es un "problema silencioso" que no les quita el sueño. El bot tiene efecto "wow" inmediato y es demostrable en 90 segundos.

### ✅ Decisión 2: No usar la palabra "análisis de datos" en el primer contacto
**Motivo:** Es un concepto abstracto para una PYME de construcción. El pitch correcto es: **"horas recuperadas"**, **"filtro de curiosos"** y **"presupuestación acelerada"**. Prohibido usar jerga: Data Analytics, Dashboards, Machine Learning.

### ✅ Decisión 3: Contactar por WhatsApp, no por email
**Motivo:** Los mails a PYMEs argentinas tienen tasa de apertura muy baja. Además, es irónico y efectivo contactarlos por el canal que vas a mejorar.

### ✅ Decisión 4: Preparar la demo ANTES de contactar
**Motivo:** La demo hace el 80% de la venta. No contactar sin tener el video de Loom grabado y el bot funcionando.

### ✅ Decisión 5: El bot es el "caballo de Troya" para entrar con análisis de datos
**Motivo:** El bot genera datos estructurados en Google Sheets. A las 2 semanas, esos datos se convierten en el primer reporte analítico, que justifica el abono mensual de análisis.

### ✅ Decisión 6: Re-encuadre estratégico v2.0 — El objetivo es reducción de CAC y carga operativa
**Motivo:** El objetivo principal NO es "mejorar la atención al cliente" ni "proveer reportes de métricas". El objetivo real es la **reducción del Costo de Adquisición de Clientes (CAC)** y la **eliminación de carga operativa** mediante la pre-calificación automatizada. El vendedor humano solo invierte tiempo en el prospecto que ya completó la calificación o aceptó una visita técnica.

### ✅ Decisión 7: El bot aplica fricción progresiva (micro-compromisos), NO fricción binaria
**Motivo:** Aplicar un muro de contención estricto en el primer mensaje (exigir medidas y fotos desde el inicio) mata la tasa de conversión en tráfico frío del mercado argentino. La calificación es un proceso escalonado: primero generás inercia con 3 respuestas fáciles, después solicitás el esfuerzo pesado (medidas y foto). Los prospectos que abandonan en la fase de datos duros se clasifican como "Lead Frío" y reciben una secuencia automática de recuperación.

---

## 5. ARQUITECTURA DEL SISTEMA Y FLUJO DE DATOS ACTUAL

### 5.1 Resumen Ejecutivo y Objetivo
El sistema califica, procesa y visualiza leads en tiempo real para tres unidades de negocio: Arquitectura, Aberturas y Cortinas. El objetivo es eliminar la carga operativa manual del equipo de ventas, segmentar los prospectos según su nivel de intención de compra (temperatura del lead) y diagnosticar cuellos de botella en el embudo mediante Business Intelligence.

### 5.2 Stack Tecnológico y Flujo de Datos
El pipeline sigue una arquitectura relacional estricta de cuatro capas:
**Manychat** (Captura/Procesamiento conversacional) -> **Google Sheets** (Ingesta/Staging) -> **Google Apps Script** (Lógica transaccional/Upsert) -> **Looker Studio** (Capa de Visualización BI)

### 5.3 Frontend Conversacional (Manychat)

**Flujo B (Extractor de Datos)**
- **Inicialización:** Al ingresar, se establece la variable `emece_fase = 1`.
- **Estandarización de Nulos:** Si el usuario desconoce un dato o presiona botones de evasión (ej. "No tengo"), el bot escribe explícitamente la cadena de texto `SIN_DATOS` en la variable correspondiente para evitar valores vacíos en la base de datos.
- **Escala de Fases Universales (Eje X del Embudo):** Se utiliza una variable ordinal (`emece_fase` del 1 al 5) para medir el avance y el abandono de forma simétrica entre rubros:
  - **Fase 1:** Inicio de la interacción.
  - **Fase 2:** Resolución de fricción técnica primaria (`arq_superficie` o `emece_medidas`).
  - **Fase 3:** Resolución de fricción técnica secundaria (`arq_ambientes` o `emece_foto`).
  - **Fase 4:** Fricción descriptiva cualitativa (`arq_descripcion` - solo en Arquitectura; Aberturas salta esta fase).
  - **Fase 5:** Finalización. Se asigna mediante un bloque de acción obligatorio inmediatamente después de responder la pregunta de "Zona" y justo antes de pasar al Flujo C.

**Flujo C (Procesador Lógico y Calificación)**
Utiliza compuertas lógicas compuestas para evaluar la densidad del payload recibido. Reduce la complejidad ciclomática agrupando condiciones (AND / OR) en nodos únicos:
- **División Inicial:** Evalúa `emece_rubro` para bifurcar el camino entre Arquitectura y Aberturas/Cortinas.
- **Filtro Caliente (🟢 Caliente / Valor 4):** Nodo Match ALL (AND). Exige que todas las variables técnicas tengan valor y ninguna sea igual a `SIN_DATOS`.
  - *Arquitectura:* `arq_superficie` y `arq_ambientes` válidos.
  - *Aberturas/Cortinas:* `emece_foto` y `emece_medidas` válidos.
- **Filtro Tibio (🟡 Tibio / Valor 3):** Nodo Match ANY (OR). Si falla el filtro caliente, exige que al menos una de las variables técnicas no sea igual a `SIN_DATOS`.
- **Filtro Frío (🔴 Frío / Valor 2):** Ruta de descarte por defecto si el usuario no aportó ningún dato duro.
- **Cierre Operativo:** Centraliza todas las salidas en un único bloque de acción que inyecta la fila en la hoja Staging de Google Sheets. Incluye un nodo condicional final para identificar si el cliente proviene del re-hook automático (`Origen_Watchdog`). Si es verdadero, finaliza en silencio para no interferir en la reactivación; si es falso (orgánico), envía el mensaje de cierre estándar.

### 5.4 Capa de Almacenamiento y Lógica de Backend (Google Apps Script)

La base de datos cuenta con tres pestañas estructuradas:
1. **Staging (16 columnas):** Tabla de ingesta cruda. Almacena temporalmente los datos mapeados desde Manychat. La columna 15 almacena el `Origen` ("Orgánico" o "Watchdog") y la columna 16 rastrea el `Estado_Proceso`.
2. **Contactos (Tabla Dimensional):** Almacena entidades únicas de clientes mediante el identificador principal `Manychat_ID`. Realiza lógica de Upsert: si el ID ya existe, actualiza los campos de contacto, incrementa en 1 el contador `Sesiones_Totales`, actualiza el timestamp de la última interacción y evalúa la jerarquía de calificación para mantener la temperatura más alta registrada. Implementa un algoritmo de concatenación que añade nuevos rubros consultados a la columna `Historial_Rubros` sin generar duplicados.
3. **Interacciones (Tabla de Hechos / Transaccional):** Registra de forma histórica cada sesión individual con su propio timestamp e inyecta la variable `Origen` en la columna C. Es el motor crudo para Looker Studio.

**Automatización (Triggers y Concurrencia):**
- **Manejo de Concurrencia:** El script utiliza `LockService.getScriptLock()` con un tiempo de espera de 10 segundos para bloquear la base de datos durante la escritura masiva, evitando colisiones de datos si múltiples Webhooks impactan al mismo tiempo.
- **Automatización Total:** La función `crearDisparadorAutomatico` configura un trigger del lado del servidor anclado al evento `onChange` de la hoja de cálculo. Cuando Manychat inserta una fila vía API, el backend se ejecuta, procesa el Upsert hacia Contactos e Interacciones, escribe "✅ Procesado" en la columna 16 de Staging y libera la memoria.

### 5.5 Capa de Visualización (Looker Studio)

Tablero directivo y operativo conectado de manera independiente a las hojas de Sheets (Interacciones para análisis de eventos y Contactos para volumen de usuarios únicos).
- **Modelado Semántico Temporal:** La dimensión Timestamp está configurada estrictamente como tipo de dato Fecha (YYYY-MM-DD), lo que consolida los registros a nivel diario, eliminando el ruido de los milisegundos y permitiendo el correcto funcionamiento de los filtros y tendencias.
- **Estructura del Tablero:**
  - *KPI Maestro:* Tarjeta de resultados (Scorecard) que calcula las "Consultas Totales".
  - *Gráfico de Líneas Temporales:* Muestra la tendencia diaria del volumen de consultas, desglosada por la dimensión `Origen`. Mide directamente el ROI de la automatización comparando el tráfico Orgánico frente al rescatado por el Watchdog.
  - *Gráficos de Anillos:* Segmentación porcentual de la calidad de leads (`Calificacion_Sesion`) y distribución de tráfico por origen.
  - *Gráfico de Barras Verticales (Fricción):* Muestra el volumen de respuestas agrupado por `Fase_Completada`. Está ordenado en sentido Ascendente por la dimensión para forzar la visualización correcta del embudo (Fases 1 a 5).
  - *Gráfico de Barras Apiladas al 100%: Muestra en el eje X los rubros comerciales y desglosa internamente los porcentajes de abandono por fase para aislar qué preguntas causan mayor deserción por producto.
  - *Tabla Operativa (Filtro Comercial):* Lista de acción directa ubicada en la base del reporte. Muestra fecha, nombre, teléfono, zona y descripción cualitativa del proyecto. Cuenta con un filtro duro incrustado en el componente: Include -> `Calificacion_Sesion` -> Equal to -> 🟢 Caliente. Funciona como la agenda de llamadas del día para el vendedor.
  - *Controles Maestros:* Panel superior con filtro de periodo (configurado por defecto para los últimos 28 días) y lista desplegable por Rubro para segmentar todo el tablero de forma dinámica.

---

## 6. MODELO DE COBRO

| Servicio | Tipo de cobro | Valor referencia |
|---|---|---|
| Implementación del Bot | Pago único | USD 80-150 |
| Mantenimiento bot + soporte | Abono mensual | USD 20-40/mes |
| Reporte mensual de análisis | Abono mensual (extra o incluido) | USD 20-30/mes |
| **Total recurrente estimado** | | **USD 40-70/mes** |

> Para el primer cliente: negociar precio de entrada a cambio de un testimonio
> escrito o mención en Instagram. El testimonio vale más que el dinero al inicio.

---

## 7. VISIÓN A FUTURO (Post-implementación)

Una vez establecida la relación con el cliente y con datos reales fluyendo:

1. **Instalar GA4 + GTM en el sitio** → Medir tráfico web real
2. **Instalar píxel de Meta** → Conectar Instagram con métricas
3. **Análisis de rentabilidad por unidad de negocio** (si proporcionan datos financieros)
4. **Optimización SEO con análisis de keywords** (tráfico orgánico)
5. **Formulario de cotización inteligente** en la web (reemplazar Contact Form 7)

---

## 8. NOTAS PARA EL AGENTE DE IA

- El usuario prefiere respuestas **directas y honestas**, sin suavizar la realidad.
- El usuario pidió explícitamente análisis **riguroso y orientado a resultados**.
- No tratar al usuario como principiante absoluto: tiene criterio estratégico claro.
- No repetir decisiones ya tomadas (ver sección 4).
- El proyecto se encuentra en **FASE DE PRODUCCIÓN** (sistema implementado y funcionando).
- Priorizar acciones concretas y ejecutables por sobre conceptos teóricos.
- El contexto es **mercado argentino**, PYMEs, zona GBA, todo en pesos argentinos.
- **La visita técnica presencial NO es un parche para datos incompletos.** El parche es el presupuesto paramétrico estimado. La visita física solo se autoriza después de que el prospecto validó un rango de precios.
- **El objetivo central es reducción de CAC y carga operativa**, no "reportes de métricas". Toda propuesta se evalúa bajo esa premisa.
- **El esquema de la base de datos define el bot, no a la inversa.** No modificar el flujo de Manychat sin primero verificar que el campo capturado tiene columna definida en el Google Sheet.
- **Clave primaria del CRM:** Manychat User ID (ahora en Contactos e Interacciones). Inmutable. Nunca usar ROW() o similar.
