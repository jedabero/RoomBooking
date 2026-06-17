# Reporte de Pruebas de Carga y Rendimiento — RoomBooking

## 1. Objetivo

Implementar una capa reproducible de pruebas de carga y rendimiento para RoomBooking usando k6, con escenarios parametrizados, SLO medibles y evidencia exportable en `perf/results/`.

## 2. Alcance

La prueba cubre endpoints REST locales representativos del dominio de reserva de salas. No evalúa bases de datos reales, autenticación, red externa ni infraestructura productiva.

## 3. Arquitectura evaluada

```text
k6 -> REST local Node HTTP -> servicios de aplicacion -> repositorios in-memory -> reglas de dominio
```

El servidor se ejecuta con:

```bash
npm run perf:serve
```

## 4. Endpoints evaluados

| Endpoint | Método | Propósito |
|---|---|---|
| `/health` | GET | Verificar salud del servicio. |
| `/metrics` | GET | Exponer métricas básicas del proceso para diagnóstico local. |
| `/api/availability` | POST | Consultar salas disponibles por horario y capacidad. |
| `/api/reservations` | POST | Crear reservas validando disponibilidad y conflictos. |
| `/api/reservations/:id/cancel` | PATCH | Cancelar reservas existentes. |
| `/api/test/reset` | POST | Reiniciar datos en memoria para escenarios reproducibles. |

## 5. Datos de prueba

Los datos semilla están definidos en `perf/data/` y reflejados en el servidor REST local:

- `perf/data/rooms.json`
- `perf/data/users.json`
- `perf/data/reservations.json`

Las reservas creadas por k6 usan identificadores y franjas horarias únicas por VU/iteración para reducir conflictos artificiales.

## Observabilidad básica

El servidor local expone `GET /metrics` con métricas simples del proceso Node.js:

- `uptimeSeconds`.
- Memoria del proceso (`rss`, `heapTotal`, `heapUsed`, `external`).
- Cantidad de salas cargadas.
- Cantidad de reservas en memoria.

Estas métricas permiten diagnóstico básico durante ejecuciones locales. No reemplazan una solución productiva de observabilidad.

## 6. SLO definidos

Los SLO completos están documentados en `perf/reports/slo.md`.

| Escenario | Error rate máximo | p95 máximo |
|---|---:|---:|
| Baseline | `< 1%` | `< 300 ms` |
| Load | `< 2%` | `< 500 ms` |
| Stress | `< 5%` | `< 1000 ms` |
| Spike | `< 8%` | `< 1500 ms` |
| Soak | `< 3%` | `< 800 ms` |
| Regresión | `< 2%` | `< 500 ms` |

## 7. Escenarios configurados

### 7.1 Baseline

Mide comportamiento con baja carga mediante 3 VUs durante 30 segundos.

Comando:

```bash
npm run perf:baseline
```

### 7.2 Load

Valida carga esperada con rampa progresiva hasta 30 VUs.

Comando:

```bash
npm run perf:load
```

### 7.3 Stress

Evalúa degradación con carga superior a la esperada, hasta 60 VUs.

Comando:

```bash
npm run perf:stress
```

### 7.4 Spike

Simula incremento súbito hasta 75 VUs y retorno a baja carga.

Comando:

```bash
npm run perf:spike
```

### 7.5 Soak

Ejecuta carga moderada durante 4 minutos. Es una versión académica corta; en un entorno real debería durar varias horas.

Comando:

```bash
npm run perf:soak
```

### 7.6 Regresión

Escenario corto apto para ejecución manual en CI. Usa 5 VUs durante 45 segundos.

Comando:

```bash
npm run perf:regression
```

## 8. Resultados obtenidos

Se ejecutaron localmente los seis escenarios definidos. Todos aprobaron sus thresholds de k6 y generaron archivos JSON en `perf/results/`.

| Escenario | Archivo JSON | Estado | p95 | p99 | Error rate | Throughput | Iteraciones | Conflictos `409` |
|---|---|---|---:|---:|---:|---:|---:|---:|
| Baseline | `perf/results/baseline-summary.json` | Aprobado | `0.79 ms` | `0.93 ms` | `0%` | `10.31 req/s` | `90` | `0%` |
| Load | `perf/results/load-summary.json` | Aprobado | `0.60 ms` | `0.76 ms` | `0%` | `49.20 req/s` | `1788` | `34.51%` |
| Stress | `perf/results/stress-summary.json` | Aprobado | `0.74 ms` | `1.13 ms` | `0%` | `99.81 req/s` | `3828` | `57.94%` |
| Spike | `perf/results/spike-summary.json` | Aprobado | `0.90 ms` | `1.35 ms` | `0%` | `132.33 req/s` | `3164` | `40.68%` |
| Soak | `perf/results/soak-summary.json` | Aprobado | `1.43 ms` | `2.05 ms` | `0%` | `64.14 req/s` | `4800` | `58.73%` |
| Regresión | `perf/results/regression-summary.json` | Aprobado | `0.85 ms` | `1.07 ms` | `0%` | `17.19 req/s` | `225` | `0%` |

La métrica `reservation_conflicts` mide respuestas `409` por conflicto funcional de reserva. Estos conflictos no se contabilizan como error técnico cuando son respuestas esperadas de negocio bajo concurrencia.

## Evidencia de ejecución

Las evidencias técnicas se encuentran en:

- `perf/results/*-summary.json`: resultados exportados por k6.
- `perf/reports/performance-report.md`: análisis consolidado.
- `perf/reports/slo.md`: SLO y criterios de aceptación.
- `.github/workflows/performance.yml`: regresión de rendimiento ejecutable desde GitHub Actions.
- Run manual ejecutado exitosamente con GitHub CLI: `https://github.com/jedabero/RoomBooking/actions/runs/27699539411`.

Para consultar el estado del run manual:

```bash
gh run watch 27699539411
gh run view 27699539411 --web
```

## Limitaciones de la medición

Las pruebas se ejecutan sobre un servidor local con repositorios in-memory. Por tanto, los resultados no representan rendimiento productivo con base de datos real, red externa, autenticación real ni infraestructura distribuida.

## 9. Comparación entre escenarios

Baseline y regresión operan con baja carga constante, load incrementa progresivamente hasta 30 VUs, stress alcanza 60 VUs, spike alcanza 75 VUs de forma súbita y soak mantiene 20 VUs durante 4 minutos. En todas las ejecuciones el p95 quedó por debajo del SLO definido y no se registraron errores HTTP inesperados.

## 10. Análisis de métricas

- Latencia promedio: baseline `0.44 ms`, load `0.41 ms`, stress `0.50 ms`, spike `0.44 ms`, soak `0.65 ms`, regresión `0.47 ms`.
- p95: baseline `0.79 ms`, load `0.60 ms`, stress `0.74 ms`, spike `0.90 ms`, soak `1.43 ms`, regresión `0.85 ms`.
- p99: baseline `0.93 ms`, load `0.76 ms`, stress `1.13 ms`, spike `1.35 ms`, soak `2.05 ms`, regresión `1.07 ms`.
- Throughput: baseline `10.31 req/s`, load `49.20 req/s`, stress `99.81 req/s`, spike `132.33 req/s`, soak `64.14 req/s`, regresión `17.19 req/s`.
- Tasa de errores: `0%` en todos los escenarios ejecutados.
- Conflictos funcionales `409`: se presentaron en load, stress, spike y soak como efecto esperado de concurrencia, sin convertirse en errores técnicos.

## 11. Identificación de cuellos de botella

Riesgos técnicos observados para fases futuras:

- La consulta de disponibilidad recorre reservas en memoria y puede crecer linealmente con el volumen de reservas.
- La validación de conflictos consulta reservas por sala y puede degradarse si aumenta el historial.
- El servidor local usa un único proceso Node.js y no representa escalamiento horizontal.
- La observabilidad actual expone memoria y conteos por `/metrics`, pero no incluye CPU, event loop lag ni trazas distribuidas.

## 12. Defectos de rendimiento

El registro se encuentra en `perf/defectos_rendimiento.md`. No se confirmaron defectos de rendimiento en la ejecución local; los hallazgos se mantienen como riesgos potenciales para escenarios con mayor volumen de datos o infraestructura productiva.

## 13. Propuestas de mejora

- Indexar reservas por sala y fecha si el volumen crece.
- Ampliar `/metrics` con CPU, event loop lag e histogramas por endpoint.
- Persistir datos en una base real para pruebas de soak representativas.
- Separar datasets de carga por escenario.
- Ejecutar regresión de rendimiento en workflow manual antes de entregas.

## 14. Conclusiones

RoomBooking queda preparado para ejecutar pruebas de carga y rendimiento reproducibles con k6. La estructura permite ejecutar escenarios locales, exportar resultados y registrar riesgos sin inventar métricas.
