# Defectos y riesgos de rendimiento — RoomBooking

## Estado de ejecución

Se ejecutaron los seis escenarios k6 definidos y no se registraron incumplimientos de SLO ni errores inesperados. Los siguientes elementos se mantienen como riesgos potenciales para volúmenes mayores, persistencia real o pruebas prolongadas fuera del alcance académico local.

## Registro

| ID | Tipo | Escenario | Evidencia | Resultado esperado | Resultado obtenido | Impacto | Causa probable | Severidad | Prioridad | Estado | Propuesta de mejora |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PR-001 | Riesgo potencial / pendiente de validación | Stress / Soak | Stress p95 `0.76 ms`, soak p95 `1.71 ms`, error rate `0%`. | La consulta de disponibilidad mantiene p95 dentro del SLO. | Cumple en escenario académico local. | Podría aparecer latencia creciente con un historial mucho mayor. | Búsqueda lineal sobre reservas en memoria. | Media | Alta | No confirmado | Indexar reservas por sala y rango temporal. |
| PR-002 | Riesgo potencial / pendiente de validación | Spike | Spike p95 `1.06 ms`, error rate `0%`. | La creación de reservas mantiene error rate dentro del SLO. | Cumple en escenario académico local. | Podría aumentar la tasa de conflictos o errores con picos más altos. | Muchas reservas concurrentes sobre salas y franjas cercanas. | Media | Media | No confirmado | Mejorar distribución de datos de carga y monitorear conflictos esperados vs inesperados. |
| PR-003 | Riesgo potencial / pendiente de validación | Soak | Soak académico de 4 minutos aprobado con p99 `2.48 ms` y error rate `0%`. | El sistema mantiene estabilidad durante ejecución prolongada. | Cumple en ejecución corta local. | Resultados limitados para estabilidad real de varias horas. | Persistencia in-memory y falta de observabilidad de CPU/memoria. | Baja | Media | No confirmado | Agregar métricas de proceso y una persistencia representativa para pruebas prolongadas. |

## Criterio para confirmar defectos

Un riesgo pasa a defecto confirmado cuando una ejecución real de k6 evidencia incumplimiento de SLO, errores inesperados o degradación clara. La evidencia debe incluir archivo en `perf/results/`, comando ejecutado y métrica observada.
