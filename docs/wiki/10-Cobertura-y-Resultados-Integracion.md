# 10 — Cobertura y Resultados de Integración

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

| Suite | Resultado |
|---|---|
| Unitarias | 5 archivos, 40 pruebas OK |
| Integración | 4 archivos, 30 pruebas OK |
| Sistema/API simulada | 1 archivo, 12 pruebas OK |
| Suite completa con cobertura | 9 archivos, 70 pruebas OK |

## Cobertura

```text
Statements   : 99.33% (150/151)
Branches     : 97.5% (78/80)
Functions    : 100% (46/46)
Lines        : 99.3% (142/143)
```

## Capas cubiertas

```text
src/domain/**
src/application/**
src/infrastructure/**
src/delivery/**
```

## CI/CD

GitHub Actions ejecuta `npm ci`, typecheck, unitarias, integración, sistema y cobertura en cada `push` o `pull_request` hacia `main`. El reporte `coverage/` se publica como artifact del workflow.

## Restricción antes de merge

Para usar el pipeline como control antes de integrar cambios, configurar branch protection en `main` y marcar el check `CI` como requerido.
