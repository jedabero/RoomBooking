# Registro de Defectos de Integración

| ID | Defecto | Severidad | Prioridad | Estado | Evidencia | Resolución |
|---|---|---|---|---|---|---|
| DI-001 | Al ampliar cobertura a `src/application/**`, `src/infrastructure/**` y `src/delivery/**`, la cobertura global de branches quedó en 72.5%, por debajo del umbral de 80%. | Media | Alta | Resuelto | `npm run test:coverage` falló con `Coverage for branches (72.5%) does not meet global threshold (80%)`. | Se agregaron pruebas de ramas de error reales en servicios de aplicación y API simulada. Resultado final: branches 97.5%. |

No se identifican defectos abiertos después de la ejecución final de la suite de pruebas de integración.
