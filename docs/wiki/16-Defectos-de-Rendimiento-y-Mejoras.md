# 16 — Defectos de Rendimiento y Mejoras

## Estado

No hay defectos de rendimiento confirmados en la ejecución local de k6. Los hallazgos actuales se documentan como riesgos potenciales para volúmenes mayores o infraestructura productiva.

## Riesgos registrados

| ID | Tipo | Escenario | Estado | Mejora propuesta |
|---|---|---|---|---|
| PR-001 | Riesgo potencial | Stress / Soak | No confirmado | Indexar reservas por sala y rango temporal. |
| PR-002 | Riesgo potencial | Spike | No confirmado | Separar conflictos esperados de errores inesperados y mejorar distribución de datos. |
| PR-003 | Riesgo potencial | Soak | No confirmado | Agregar métricas de CPU, memoria y persistencia representativa. |

## Propuestas de mejora

- Agregar índices por sala y fecha para disponibilidad y conflicto.
- Incorporar métricas de proceso y event loop lag.
- Ejecutar regresión de rendimiento desde GitHub Actions con `workflow_dispatch`.
- Ampliar soak a varias horas en entorno dedicado.
- Guardar reportes históricos para comparar regresiones.

## Referencia técnica

El registro completo está en `perf/defectos_rendimiento.md`.
