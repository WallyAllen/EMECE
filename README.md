# Arquitectura de Ingesta y Business Intelligence - Captura de Leads B2C/B2B

Este repositorio contiene la arquitectura de procesamiento de datos y la lógica de negocio para un sistema automatizado de captura, calificación y visualización de prospectos en el sector de la construcción y diseño de interiores (Arquitectura, Aberturas, Cortinas).

El sistema reemplaza la captura manual por un flujo transaccional asíncrono, eliminando la fricción operativa y exponiendo las métricas de retención en tiempo real mediante un modelo de Business Intelligence.

## 1. Topología del Sistema

El pipeline de datos opera bajo un modelo de desacoplamiento de capas (Ingesta, Procesamiento, Almacenamiento, Presentación) para garantizar alta disponibilidad y mitigar problemas de concurrencia.

*   **Capa de Ingesta (Manychat API):** Interfaz conversacional que captura las variables del usuario a través de un árbol de decisión determinista. Envía cargas útiles (Payloads) en formato JSON vía peticiones HTTP POST.
*   **Capa de Procesamiento (Google Apps Script - Webhook):** Un endpoint dedicado (`doPost(e)`) que recibe el JSON, procesa la calificación térmica del prospecto (Caliente, Tibio, Frío) en memoria viva y estructura la matriz de datos. Implementa `LockService` para garantizar operaciones atómicas de escritura (Upsert) bajo estrés de concurrencia.
*   **Capa de Almacenamiento (Google Sheets):** Base de datos relacional normalizada en dos dimensiones:
    *   `Contactos`: Tabla dimensional (Master Data) con identificadores únicos y el estado actualizado del usuario.
    *   `Interacciones`: Tabla de hechos (Fact Table) inmutable que registra cada evento temporal para análisis de series de tiempo.
*   **Capa de Presentación (Looker Studio):** Tablero directivo conectado a la tabla de interacciones, renderizando los campos calculados nativos y evaluando la fricción estructural del negocio.

## 2. Reglas de Negocio y Lógica del Embudo

El sistema implementa un embudo de ventas asimétrico programado condicionalmente según la naturaleza del producto consultado.

*   **Fases del Embudo:**
    *   Fase 1: Interacción inicial / Adquisición.
    *   Fase 2: Intención de producto.
    *   Fase 3: Especificaciones técnicas (Medidas / Tipo de obra).
    *   Fase 4: Fricción cualitativa descriptiva.
    *   Fase 5: Conversión (Lead calificado para contacto humano).
*   **Restricción Asimétrica:** Los rubros transaccionales (`Aberturas`, `Cortinas`) omiten por regla de negocio la Fase 4, saltando directamente a la consolidación. El rubro consultivo (`Arquitectura`) requiere el recorrido de las 5 fases completas.

## 3. Campos Calculados y KPIs Estructurales

El modelo analítico abandona las métricas de vanidad (volumen absoluto) para centrarse en indicadores de rendimiento financiero procesados a nivel de fila mediante SQL lógico.

*   **Tasa de Abandono Crítico:** Mide el volumen de capital potencial perdido por fricción en las interacciones de bajo compromiso.
    ```sql
    SUM(CASE WHEN Fase_Completada IN (1, 2) THEN 1 ELSE 0 END) / COUNT(Manychat_ID)
    ```
*   **Tasa de Supervivencia:** Mide la retención efectiva del flujo operativo unificando la finalización asimétrica del embudo en el nodo 5.
    ```sql
    SUM(CASE WHEN Fase_Completada = 5 THEN 1 ELSE 0 END) / COUNT(Manychat_ID)
    ```

## 4. Evolución Arquitectónica (Gestión de Concurrencia)

La versión actual del código ha migrado de una dependencia física de eventos de hoja de cálculo (`onChange` trigger) hacia una arquitectura de pasarela API (Webhook). 

Esta refactorización soluciona el cuello de botella intrínseco de las plataformas de almacenamiento utilizadas como disparadores de código, reduciendo el tiempo de bloqueo de segundos a milisegundos, previniendo la pérdida de registros bajo ráfagas concurrentes de peticiones web y aislando la lógica de negocio del almacenamiento de datos.

## 5. Estructura de Entorno de Pruebas (Mock Data)

El repositorio incluye un script generador de datos sintéticos (`generarSimulacionHistoricaCompleta.js`) diseñado para inyectar volumen estadístico que respeta el determinismo del embudo asimétrico. Emplea inyección nativa de objetos `Date` en formato `yyyy-MM-dd HH:mm:ss` para garantizar el parseo estricto del motor de Looker Studio, evitando fallos de tipificación `Type Mismatch`.