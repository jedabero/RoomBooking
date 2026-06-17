# 03 — Patrón AAA

Las pruebas siguen el patrón AAA: Arrange, Act, Assert. En esta documentación se relaciona además con Given, When, Then.

| AAA | BDD | Propósito |
|---|---|---|
| Arrange | Given | Preparar datos, entradas y dependencia bajo prueba. |
| Act | When | Ejecutar la operación del componente. |
| Assert | Then | Verificar el resultado esperado. |

## Ejemplo real

Archivo: `test/domain/rules/ReservationConflict.test.ts`

```typescript
it('shouldReturnFalseWhenNewReservationStartsExactlyAtExistingEnd', () => {
  // Arrange / Given
  const conflict = new ReservationConflict()
  const reservation = makeReservation('1', 'room-1', new Date('2026-01-01T10:00'), new Date('2026-01-01T11:00'))
  const existing = [
    makeReservation('2', 'room-1', new Date('2026-01-01T09:00'), new Date('2026-01-01T10:00')),
  ]

  // Act / When
  const result = conflict.check(reservation, existing)

  // Assert / Then
  expect(result).toBe(false)
})
```

## Beneficios observados

- Mejora la legibilidad de cada prueba.
- Reduce ambigüedad entre preparación, ejecución y verificación.
- Facilita mapear pruebas con escenarios BDD y clases de equivalencia.
