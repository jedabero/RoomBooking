# Matriz de Trazabilidad de Integración

| Historia | Riesgo | Tipo de prueba | Archivo de prueba | Escenario |
|---|---|---|---|---|
| HU-03 Registro de sala | Gestión incorrecta de recursos | Integración/Sistema | `test/integration/application/RoomService.integration.test.ts`, `test/integration/delivery/RoomBookingApi.system.test.ts` | Administrador crea sala y usuario común es rechazado. |
| HU-05 Inactivación de sala | Sala inactiva reservable | Integración/Sistema | `test/integration/application/RoomService.integration.test.ts`, `test/integration/delivery/RoomBookingApi.system.test.ts` | Sala se desactiva y queda fuera del flujo de reserva. |
| HU-06 Consulta de disponibilidad | Disponibilidad incorrecta | Integración/Sistema | `test/integration/application/AvailabilityService.integration.test.ts`, `test/integration/delivery/RoomBookingApi.system.test.ts` | Salas ocupadas o inactivas no aparecen como disponibles. |
| HU-07 Creación de reserva | Reserva no persistida | Integración/Sistema | `test/integration/application/ReservationService.integration.test.ts`, `test/integration/delivery/RoomBookingApi.system.test.ts` | Reserva válida se persiste y API retorna 201. |
| HU-08 Validación de conflictos | Reservas solapadas | Integración/Sistema | `test/integration/application/ReservationService.integration.test.ts`, `test/integration/delivery/RoomBookingApi.system.test.ts` | Conflicto exacto/parcial se rechaza y API retorna 409. |
| HU-10 Cancelación de reserva | Sala bloqueada indebidamente | Integración | `test/integration/application/ReservationService.integration.test.ts` | Reserva cancelada no bloquea nueva reserva. |
| HU-12 Control de permisos por rol | Acceso no autorizado | Integración/Sistema | `test/integration/application/RoomService.integration.test.ts`, `test/integration/delivery/RoomBookingApi.system.test.ts` | Usuario no puede administrar salas; administrador sí. |
| HT-01 Automatización de conflictos | Regresión en regla crítica | Automatizada | `test/domain/rules/ReservationConflict.test.ts`, `test/integration/application/ReservationService.integration.test.ts` | Bordes consecutivos permitidos y solapamientos rechazados. |
| HT-02 Suite de regresión de reservas | Fallos no detectados | Automatizada | `test/integration/application/ReservationService.integration.test.ts` | Persistencia, conflicto, cancelación y sala inactiva. |
| HT-03 Trazabilidad historia-prueba | Falta de evidencia | Documental | `docs/integration/traceability-matrix.md` | Relación entre historia, riesgo, prueba y archivo. |
