# Cobertura y Resultados

## Reporte actual

Ejecutando `npx vitest run --coverage` se obtiene:

```
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines |
-------------------|---------|----------|---------|---------|-------------------
All files          |   53.12 |    88.88 |   53.84 |   51.61 |
 model             |      40 |      100 |      40 |      40 |
 rules             |      75 |    88.88 |    62.5 |   72.72 |
  Permission.ts    |     100 |       75 |     100 |     100 |
  RoomValidation   |     100 |      100 |     100 |     100 |
-------------------|---------|----------|---------|---------|-------------------
```

## Componentes cubiertos

| Componente | Líneas | Ramas | Estado |
|---|---|---|---|
| `RoomValidation` | 100% | 100% | ✅ Completo |
| `Permission` | 100% | 75% | ✅ Completo |
| `ReservationConflict` | 0% | 0% | ⬜ Stub |
| `Availability` | 0% | 0% | ⬜ Stub |
| `ReservationPolicy` | 0% | 0% | ⬜ Stub |
| Modelos (`Room`, `Reservation`, etc.) | 0% | 0% | ⬜ Sin probar |

## Próximos pasos

Para alcanzar el objetivo de ≥80% global, es necesario implementar y probar:

1. `ReservationConflict` — detección de conflictos entre reservas
2. `Availability` — verificación de disponibilidad
3. `ReservationPolicy` — políticas de reserva
4. Pruebas para los modelos de dominio (`Reservation`, `TimeRange`, etc.)
