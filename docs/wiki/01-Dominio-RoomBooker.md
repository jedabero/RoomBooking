# 01 — Dominio RoomBooker / RoomBooking

## Contexto

RoomBooker es un sistema de reserva de salas. El repositorio se llama RoomBooking y contiene una implementación académica enfocada exclusivamente en reglas puras de dominio.

El alcance excluye base de datos, HTTP, UI y frameworks web. Las reglas se prueban como funciones y clases de dominio con TypeScript y Vitest.

## Modelos

| Modelo | Propósito |
|---|---|
| `Room` | Representa una sala con `id`, `name`, `capacity` y `location` opcional. |
| `Reservation` | Representa una reserva asociada a sala, usuario, rango de tiempo, estado y fecha de creación. |
| `TimeRange` | Value Object simple con fecha de inicio y fin. |
| `ReservationStatus` | Estados de una reserva: `CONFIRMED`, `CANCELLED`, `COMPLETED`. |
| `UserRole` | Roles de usuario: `ADMIN`, `MANAGER`, `USER`. |

Los modelos se mantienen como estructuras simples sin reglas internas. La validación se ubica en componentes de reglas para respetar el proceso TDD.

## Reglas de negocio seleccionadas

| Regla | Componente |
|---|---|
| Validar que una sala tenga identificador, nombre y capacidad válida. | `RoomValidation` |
| Controlar permisos por rol. | `Permission` |
| Detectar conflictos entre reservas de la misma sala. | `ReservationConflict` |
| Determinar si una sala está disponible en un rango. | `Availability` |
| Validar políticas de duración y anticipación de reserva. | `ReservationPolicy` |

## Decisiones de diseño

- La lógica vive en `src/domain/rules`.
- Los modelos viven en `src/domain/model`.
- Las pruebas viven en `test/domain/rules`.
- Las pruebas unitarias no dependen de infraestructura externa.
