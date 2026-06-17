# 15 — Resultados y Análisis de Rendimiento

## Estado actual

Se ejecutaron localmente los seis escenarios definidos con k6. Todos aprobaron sus thresholds y generaron archivos JSON en `perf/results/`.

## Resultados esperados

| Escenario | Archivo | Estado | p95 | p99 | Error rate | Throughput |
|---|---|---|---:|---:|---:|---:|
| Baseline | `perf/results/baseline-summary.json` | Aprobado | `0.83 ms` | `0.97 ms` | `0%` | `10.48 req/s` |
| Load | `perf/results/load-summary.json` | Aprobado | `1.74 ms` | `6.78 ms` | `0%` | `49.58 req/s` |
| Stress | `perf/results/stress-summary.json` | Aprobado | `0.76 ms` | `1.01 ms` | `0%` | `101.66 req/s` |
| Spike | `perf/results/spike-summary.json` | Aprobado | `1.06 ms` | `1.55 ms` | `0%` | `134.68 req/s` |
| Soak | `perf/results/soak-summary.json` | Aprobado | `1.71 ms` | `2.48 ms` | `0%` | `65.55 req/s` |
| Regresión | `perf/results/regression-summary.json` | Aprobado | `0.93 ms` | `1.20 ms` | `0%` | `17.42 req/s` |

## Métricas a analizar

- Latencia promedio.
- Latencia p95.
- Latencia p99.
- Throughput.
- Tasa de errores.
- Checks funcionales fallidos.

## Análisis inicial

Los seis escenarios ejecutados cumplen sus SLO. No se observaron errores inesperados ni checks fallidos. El resultado es coherente con una arquitectura local en memoria sin I/O externo.

## Cuellos de botella potenciales

- La consulta de disponibilidad puede crecer linealmente con el número de reservas.
- La validación de conflictos puede degradarse si aumenta el historial por sala.
- El servidor local usa un único proceso Node.js.
- No hay observabilidad integrada de CPU, memoria o event loop lag.

## Reporte técnico

El reporte completo está en `perf/reports/performance-report.md`.
