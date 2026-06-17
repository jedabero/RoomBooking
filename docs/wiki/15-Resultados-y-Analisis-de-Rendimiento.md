# 15 — Resultados y Análisis de Rendimiento

## Estado actual

Se ejecutaron localmente los seis escenarios definidos con k6. Todos aprobaron sus thresholds y generaron archivos JSON en `perf/results/`.

## Resultados obtenidos

| Escenario | Archivo | Estado | p95 | p99 | Error rate | Throughput | Conflictos `409` |
|---|---|---|---:|---:|---:|---:|---:|
| Baseline | `perf/results/baseline-summary.json` | Aprobado | `0.79 ms` | `0.93 ms` | `0%` | `10.31 req/s` | `0%` |
| Load | `perf/results/load-summary.json` | Aprobado | `0.60 ms` | `0.76 ms` | `0%` | `49.20 req/s` | `34.51%` |
| Stress | `perf/results/stress-summary.json` | Aprobado | `0.74 ms` | `1.13 ms` | `0%` | `99.81 req/s` | `57.94%` |
| Spike | `perf/results/spike-summary.json` | Aprobado | `0.90 ms` | `1.35 ms` | `0%` | `132.33 req/s` | `40.68%` |
| Soak | `perf/results/soak-summary.json` | Aprobado | `1.43 ms` | `2.05 ms` | `0%` | `64.14 req/s` | `58.73%` |
| Regresión | `perf/results/regression-summary.json` | Aprobado | `0.93 ms` | `1.30 ms` | `0%` | `16.80 req/s` | `0%` |

La métrica `reservation_conflicts` representa respuestas `409` por conflicto funcional de reserva. No se considera error técnico cuando ocurre como respuesta esperada de negocio bajo concurrencia.

## Evidencia de ejecución

Las evidencias disponibles son:

- Archivos JSON generados por k6 en `perf/results/`.
- Reporte técnico consolidado en `perf/reports/performance-report.md`.
- SLO documentados en `perf/reports/slo.md`.
- Workflow manual de performance en `.github/workflows/performance.yml`.
- Run manual ejecutado exitosamente con GitHub CLI: `https://github.com/jedabero/RoomBooking/actions/runs/27699539411`.

Para publicar evidencia visual en la Wiki real de GitHub, se recomienda adjuntar capturas de:

1. ejecución local de k6;
2. archivos generados en `perf/results/`;
3. ejecución exitosa del workflow manual `Performance`.

## Métricas a analizar

- Latencia promedio.
- Latencia p95.
- Latencia p99.
- Throughput.
- Tasa de errores.
- Conflictos funcionales `409`.
- Checks funcionales fallidos.

## Análisis inicial

Los seis escenarios ejecutados cumplen sus SLO. No se observaron errores inesperados ni checks fallidos. El resultado es coherente con una arquitectura local en memoria sin I/O externo.

## Cuellos de botella potenciales

- La consulta de disponibilidad puede crecer linealmente con el número de reservas.
- La validación de conflictos puede degradarse si aumenta el historial por sala.
- El servidor local usa un único proceso Node.js.
- El endpoint `/metrics` entrega memoria y conteos básicos, pero no incluye CPU, event loop lag ni trazas distribuidas.

## Reporte técnico

El reporte completo está en `perf/reports/performance-report.md`.
