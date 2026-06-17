# 08 — Pruebas de Integración

## Objetivo

Validar que RoomBooker integra correctamente servicios de aplicación, repositorios in-memory y reglas de dominio.

## Arquitectura bajo prueba

```text
application service -> repository in-memory -> domain rules
```

## Componentes integrados

| Componente | Capa | Responsabilidad |
|---|---|---|
| `ReservationService` | Aplicación | Crear y cancelar reservas aplicando permisos, política y conflictos. |
| `RoomService` | Aplicación | Crear y desactivar salas con control de permisos. |
| `AvailabilityService` | Aplicación | Consultar salas disponibles excluyendo ocupadas e inactivas. |
| `InMemoryRoomRepository` | Infraestructura | Persistencia simulada de salas. |
| `InMemoryReservationRepository` | Infraestructura | Persistencia simulada de reservas. |
| Reglas de dominio | Dominio | Validación de permisos, disponibilidad, conflicto y políticas. |

## Escenarios cubiertos

| Escenario | Archivo |
|---|---|
| Reserva válida se persiste. | `ReservationService.integration.test.ts` |
| Conflicto exacto y parcial se rechaza. | `ReservationService.integration.test.ts` |
| Reserva consecutiva se permite. | `ReservationService.integration.test.ts` |
| Reserva cancelada libera disponibilidad. | `ReservationService.integration.test.ts` |
| Sala inactiva no puede reservarse. | `ReservationService.integration.test.ts` |
| Disponibilidad excluye salas ocupadas e inactivas. | `AvailabilityService.integration.test.ts` |
| Usuario común no administra salas. | `RoomService.integration.test.ts` |
| Administrador gestiona salas. | `RoomService.integration.test.ts` |

## Comando

```bash
npm run test:integration
```

## Resultado local

```text
Test Files  4 passed (4)
Tests       30 passed (30)
```
