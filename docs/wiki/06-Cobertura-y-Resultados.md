# 06 — Cobertura y Resultados

Esta página se actualiza con los resultados reales de `npm run test:coverage`.

## Comandos de verificación

```bash
npm install
npm run typecheck
npm test
npm run test:coverage
```

## Resultados actuales

Fecha de verificación local: 2026-06-16.

```text
Test Files  5 passed (5)
Tests       40 passed (40)
```

```text
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |     100 |    96.15 |     100 |     100 |
rules              |     100 |    96.15 |     100 |     100 |
Permission.ts      |     100 |       75 |     100 |     100 | 12
-------------------|---------|----------|---------|---------|-------------------

Statements   : 100% (53/53)
Branches     : 96.15% (25/26)
Functions    : 100% (21/21)
Lines        : 100% (46/46)
```

## Cumplimiento del umbral

| Métrica | Resultado | Umbral | Cumple |
|---|---:|---:|---|
| Statements | 100% | 80% | Sí |
| Branches | 96.15% | 80% | Sí |
| Functions | 100% | 80% | Sí |
| Lines | 100% | 80% | Sí |

El proyecto cumple el umbral mínimo de 80% configurado en `vitest.config.ts`.

## Observación

La única rama no cubierta está en `Permission.ts`, línea 12, correspondiente al fallback defensivo `?? false`. No afecta el cumplimiento del umbral global.

## Criterio de aceptación

El proyecto debe cumplir mínimo 80% global en statements, branches, functions y lines.

## Codecov

El workflow tiene configurado `codecov/codecov-action@v7`. Queda pendiente validar el repositorio en Codecov y configurar `CODECOV_TOKEN` como secret si el proyecto lo requiere. Por esa razón no se publica badge de Codecov en el `README.md`.
