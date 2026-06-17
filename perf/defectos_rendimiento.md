# Defectos, hallazgos y riesgos de rendimiento — RoomBooking

## Estado de ejecución

Se ejecutaron los seis escenarios k6 definidos y no se registraron incumplimientos de SLO ni errores inesperados.

No se confirmaron defectos por incumplimiento de SLO en la ejecución local. Dado que la rúbrica solicita registros de defectos de rendimiento, se documentan tres hallazgos preventivos como riesgos técnicos pendientes de validación en escenarios productivos o con volúmenes mayores.

## Registro

| ID | Tipo | Escenario | Evidencia | Resultado esperado | Resultado obtenido | Impacto | Causa probable | Severidad | Prioridad | Estado | Propuesta de mejora |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PR-001 | Riesgo técnico / pendiente de validación | Stress / Soak | Stress p95 `0.74 ms`, soak p95 `1.43 ms`, error rate `0%`. | La consulta de disponibilidad mantiene p95 dentro del SLO. | Cumple en escenario académico local. | Podría aparecer latencia creciente con un historial mucho mayor. | Búsqueda lineal sobre reservas en memoria. | Media | Alta | No confirmado | Indexar reservas por sala y rango temporal. |
| PR-002 | Riesgo técnico / pendiente de validación | Spike | Spike p95 `0.90 ms`, error rate `0%`, conflictos `409` en `40.68%`. | La creación de reservas mantiene error rate dentro del SLO y diferencia conflictos funcionales. | Cumple en escenario académico local. | Podría aumentar la tasa de conflictos o errores con picos más altos. | Muchas reservas concurrentes sobre salas y franjas cercanas. | Media | Media | No confirmado | Mejorar distribución de datos de carga y monitorear conflictos esperados vs inesperados. |
| PR-003 | Riesgo técnico / pendiente de validación | Soak | Soak académico de 4 minutos aprobado con p99 `2.05 ms` y error rate `0%`. | El sistema mantiene estabilidad durante ejecución prolongada. | Cumple en ejecución corta local. | Resultados limitados para estabilidad real de varias horas. | Persistencia in-memory y observabilidad limitada. | Baja | Media | No confirmado | Ampliar métricas de proceso y una persistencia representativa para pruebas prolongadas. |

## Criterio para confirmar defectos

Un riesgo pasa a defecto confirmado cuando una ejecución real de k6 evidencia incumplimiento de SLO, errores inesperados o degradación clara. La evidencia debe incluir archivo en `perf/results/`, comando ejecutado y métrica observada.
