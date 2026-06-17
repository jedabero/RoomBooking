# 10 — Cobertura y Resultados de Integración

Esta página resume los resultados reales de la fase de pruebas de integración y sistema. La información se basa en los reportes técnicos de `docs/integration/test-results.md` y `docs/integration/coverage-summary.md`.

## Comandos de verificación

```bash
npm ci
npm run typecheck
npm run test:unit
npm run test:integration
npm run test:system
npm run test:coverage
```

## Resultados locales

| Suite | Comando | Resultado |
|---|---|---|
| Typecheck | `npm run typecheck` | Correcto |
| Unitarias | `npm run test:unit` | 5 archivos, 40 pruebas OK |
| Integración | `npm run test:integration` | 4 archivos, 30 pruebas OK |
| Sistema/API simulada | `npm run test:system` | 1 archivo, 12 pruebas OK |
| Suite completa con cobertura | `npm run test:coverage` | 9 archivos, 70 pruebas OK |

## Cobertura

```text
Statements   : 99.33% (150/151)
Branches     : 97.5% (78/80)
Functions    : 100% (46/46)
Lines        : 99.3% (142/143)
```

## Umbrales configurados

| Métrica | Umbral | Resultado | Cumple |
|---|---:|---:|---|
| Statements | 80% | 99.33% | Sí |
| Branches | 80% | 97.5% | Sí |
| Functions | 80% | 100% | Sí |
| Lines | 80% | 99.3% | Sí |

## Capas cubiertas

```text
src/domain/**
src/application/**
src/infrastructure/**
src/delivery/**
```

## Interpretación

La cobertura supera el umbral mínimo en todas las métricas. El resultado indica que la fase de integración no solo cubre flujos exitosos, sino también rutas de error relevantes como conflictos, permisos insuficientes, recursos inexistentes y datos inválidos.

Durante la ampliación de cobertura se detectó una caída inicial en branches al incluir nuevas capas. Ese hallazgo se documentó como defecto resuelto en `docs/integration/defects-integration.md`.

## CI/CD

GitHub Actions ejecuta `npm ci`, typecheck, unitarias, integración, sistema y cobertura en cada `push` o `pull_request` hacia `main`. El reporte `coverage/` se publica como artifact del workflow.

## Restricción antes de merge

Para usar el pipeline como control antes de integrar cambios, configurar branch protection en `main` y marcar el check `CI` como requerido.

## Referencias técnicas

- `docs/integration/test-results.md`
- `docs/integration/coverage-summary.md`
- `.github/workflows/ci.yml`
