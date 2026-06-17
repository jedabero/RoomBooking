# 11 — Defectos de Integración

## Registro

| ID | Defecto | Severidad | Prioridad | Estado | Evidencia | Resolución |
|---|---|---|---|---|---|---|
| DI-001 | Al ampliar cobertura a todas las capas, branches quedó en 72.5%, por debajo del umbral 80%. | Media | Alta | Resuelto | `npm run test:coverage` falló por umbral de branches. | Se agregaron pruebas de ramas de error en servicios y API simulada. Resultado final: branches 97.5%. |

## Estado final

No se identifican defectos abiertos después de la ejecución final de la suite de pruebas de integración.

## Lecciones

La ampliación de cobertura a capas nuevas debe acompañarse con pruebas de flujos de error, no solo casos exitosos. Esto permitió detectar rutas no ejercitadas en servicios y delivery antes de considerar estable el pipeline.
