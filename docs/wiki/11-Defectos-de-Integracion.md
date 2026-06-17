# 11 — Defectos de Integración

## Objetivo

Registrar hallazgos detectados durante la implementación y verificación de la fase de integración. El registro permite evidenciar defectos, severidad, prioridad, estado y resolución.

## Registro

| ID | Defecto | Severidad | Prioridad | Estado | Evidencia | Resolución |
|---|---|---|---|---|---|---|
| DI-001 | Al ampliar cobertura a todas las capas, branches quedó en 72.5%, por debajo del umbral 80%. | Media | Alta | Resuelto | `npm run test:coverage` falló por umbral de branches. | Se agregaron pruebas de ramas de error en servicios y API simulada. Resultado final: branches 97.5%. |

## Defectos abiertos

No se identifican defectos abiertos después de la ejecución final de la suite de pruebas de integración.

## Estado final

La suite final pasa correctamente con pruebas unitarias, integración, sistema/API simulada y cobertura. El defecto `DI-001` quedó resuelto sin reducir umbrales ni excluir código relevante de la medición.

## Lecciones

La ampliación de cobertura a capas nuevas debe acompañarse con pruebas de flujos de error, no solo casos exitosos. Esto permitió detectar rutas no ejercitadas en servicios y delivery antes de considerar estable el pipeline.

## Referencia técnica

El registro técnico completo se encuentra en `docs/integration/defects-integration.md`.
