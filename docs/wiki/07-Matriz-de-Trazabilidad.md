# 07 — Matriz de Trazabilidad

| Regla de negocio | Componente | Archivo de prueba | Casos principales |
|---|---|---|---|
| Validar datos mínimos de sala. | `RoomValidation` | `RoomValidation.test.ts` | Sala válida, id vacío, name vacío, capacidad cero, negativa y no entera. |
| Controlar permisos por rol. | `Permission` | `Permission.test.ts` | Admin todo, user crea reserva, user no crea sala, manager crea sala, manager no elimina sala. |
| Detectar conflicto entre reservas. | `ReservationConflict` | `ReservationConflict.test.ts` | Lista vacía, sala distinta, solapamiento exacto, parcial, contención, cancelada, bordes exactos. |
| Determinar disponibilidad de sala. | `Availability` | `Availability.test.ts` | Sin reservas, distinta sala, sin solapamiento, solapamiento exacto, cancelada. |
| Validar políticas de reserva. | `ReservationPolicy` | `ReservationPolicy.test.ts` | Duración válida, duración excesiva, inicio pasado, duración cero, anticipación máxima. |

## Cobertura de trazabilidad

Todas las reglas seleccionadas tienen al menos un archivo de prueba unitario asociado y escenarios BDD documentados.
