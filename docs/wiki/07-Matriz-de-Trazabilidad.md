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

## Trazabilidad de integración y sistema

| Historia | Riesgo | Tipo de prueba | Archivo de prueba | Escenario |
|---|---|---|---|---|
| HU-03 Registro de sala | Gestión incorrecta de recursos | Integración/Sistema | `RoomService.integration.test.ts`, `RoomBookingApi.system.test.ts` | Administrador crea sala y usuario común es rechazado. |
| HU-05 Inactivación de sala | Sala inactiva reservable | Integración/Sistema | `RoomService.integration.test.ts`, `RoomBookingApi.system.test.ts` | Sala se desactiva y queda fuera del flujo de reserva. |
| HU-06 Consulta de disponibilidad | Disponibilidad incorrecta | Integración/Sistema | `AvailabilityService.integration.test.ts`, `RoomBookingApi.system.test.ts` | Salas ocupadas o inactivas no aparecen como disponibles. |
| HU-07 Creación de reserva | Reserva no persistida | Integración/Sistema | `ReservationService.integration.test.ts`, `RoomBookingApi.system.test.ts` | Reserva válida se persiste y API retorna 201. |
| HU-08 Validación de conflictos | Reservas solapadas | Integración/Sistema | `ReservationService.integration.test.ts`, `RoomBookingApi.system.test.ts` | Conflicto exacto/parcial se rechaza y API retorna 409. |
| HU-10 Cancelación de reserva | Sala bloqueada indebidamente | Integración | `ReservationService.integration.test.ts` | Reserva cancelada no bloquea una nueva reserva. |
| HU-12 Control de permisos por rol | Acceso no autorizado | Integración/Sistema | `RoomService.integration.test.ts`, `RoomBookingApi.system.test.ts` | Usuario no puede administrar salas; administrador sí. |
| HT-01 Automatización de conflictos | Regresión en regla crítica | Automatizada | `ReservationConflict.test.ts`, `ReservationService.integration.test.ts` | Bordes consecutivos permitidos y solapamientos rechazados. |
| HT-02 Suite de regresión de reservas | Fallos no detectados | Automatizada | `ReservationService.integration.test.ts` | Persistencia, conflicto, cancelación y sala inactiva. |
| HT-03 Trazabilidad historia-prueba | Falta de evidencia | Documental | `docs/integration/traceability-matrix.md` | Relación entre historia, riesgo, prueba y archivo. |
