# Resumen de Cobertura de Integración

La cobertura se genera con Vitest y V8 mediante:

```bash
npm run test:coverage
```

## Resultado local

```text
Statements   : 99.33% (150/151)
Branches     : 97.5% (78/80)
Functions    : 100% (46/46)
Lines        : 99.3% (142/143)
```

## Capas incluidas

```text
src/domain/**
src/application/**
src/infrastructure/**
src/delivery/**
```

## Observaciones

El umbral global configurado es 80% para statements, branches, functions y lines. La suite actual supera ese umbral en todas las métricas.

Durante la Fase 4 se detectó una caída inicial de cobertura de ramas al ampliar el alcance a todas las capas. Se agregaron pruebas de errores y bordes reales en servicios/API simulada sin reducir los umbrales.
