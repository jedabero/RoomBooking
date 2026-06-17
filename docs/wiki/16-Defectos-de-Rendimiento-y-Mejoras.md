# 16 — Defectos, Riesgos de Rendimiento y Mejoras

## Estado

No se confirmaron defectos por incumplimiento de SLO en la ejecución local. Dado que la rúbrica solicita registros de defectos de rendimiento, se documentan tres hallazgos preventivos como riesgos técnicos pendientes de validación en escenarios productivos o con volúmenes mayores.

## Riesgos registrados

| ID | Tipo | Escenario | Estado | Mejora propuesta |
|---|---|---|---|---|
| PR-001 | Riesgo técnico / pendiente de validación | Stress / Soak | No confirmado | Indexar reservas por sala y rango temporal. |
| PR-002 | Riesgo técnico / pendiente de validación | Spike | No confirmado | Separar conflictos esperados de errores inesperados y mejorar distribución de datos. |
| PR-003 | Riesgo técnico / pendiente de validación | Soak | No confirmado | Agregar métricas de CPU, memoria y persistencia representativa. |

## Propuestas de mejora

- Agregar índices por sala y fecha para disponibilidad y conflicto.
- Ampliar `/metrics` con CPU, event loop lag e histogramas por endpoint.
- Ejecutar regresión de rendimiento desde GitHub Actions con `workflow_dispatch`.
- Ampliar soak a varias horas en entorno dedicado.
- Guardar reportes históricos para comparar regresiones.

## Referencia técnica

El registro completo está en `perf/defectos_rendimiento.md`.
