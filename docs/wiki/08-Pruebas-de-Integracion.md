# 08 — Pruebas de Integración

## Objetivo

Validar que RoomBooker integra correctamente sus capas principales sin depender de una base de datos real ni de infraestructura externa. Las pruebas de integración verifican que los servicios de aplicación colaboran con repositorios in-memory y reglas de dominio para ejecutar flujos funcionales completos.

## Alcance

La fase cubre los módulos críticos del sistema de reservas:

- Gestión de salas.
- Consulta de disponibilidad.
- Creación de reservas.
- Validación de conflictos de horario.
- Cancelación de reservas.
- Control de permisos por rol.
- Administración de salas activas e inactivas.

No se incluyen pruebas de carga, rendimiento ni concurrencia. Esas pruebas quedan para una fase posterior.

## Arquitectura bajo prueba

```text
application services <-> repositories in-memory <-> domain rules
```

También se valida la integración completa desde la capa de delivery en las pruebas de sistema/API simulada:

```text
delivery/API simulada <-> application services <-> repositories <-> domain
```

La arquitectura se mantiene dentro del stack actual del proyecto: TypeScript, Vitest, Node.js y cobertura V8.

## Capas integradas

| Capa | Responsabilidad | Evidencia |
|---|---|---|
| Aplicación | Coordina casos de uso y orquesta reglas de negocio. | `src/application/services/` |
| Infraestructura | Simula persistencia en memoria para probar integración sin base de datos real. | `src/infrastructure/persistence/` |
| Dominio | Evalúa reglas puras de negocio. | `src/domain/rules/` |
| Delivery | Expone una API simulada para validar comportamiento tipo sistema. | `src/delivery/http/RoomBookingApi.ts` |

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

| Escenario | Archivo | Riesgo mitigado |
|---|---|---|
| Reserva válida se persiste. | `test/integration/application/ReservationService.integration.test.ts` | Reserva aceptada pero no almacenada. |
| Conflicto exacto y parcial se rechaza. | `test/integration/application/ReservationService.integration.test.ts` | Reservas solapadas para la misma sala. |
| Reserva consecutiva se permite. | `test/integration/application/ReservationService.integration.test.ts` | Falso positivo de conflicto en bordes horarios. |
| Reserva cancelada libera disponibilidad. | `test/integration/application/ReservationService.integration.test.ts` | Sala bloqueada indebidamente por reservas canceladas. |
| Sala inactiva no puede reservarse. | `test/integration/application/ReservationService.integration.test.ts` | Reserva sobre recurso no disponible. |
| Disponibilidad excluye salas ocupadas e inactivas. | `test/integration/application/AvailabilityService.integration.test.ts` | Disponibilidad incorrecta para usuarios. |
| Usuario común no administra salas. | `test/integration/application/RoomService.integration.test.ts` | Escalada de privilegios. |
| Administrador gestiona salas. | `test/integration/application/RoomService.integration.test.ts` | Bloqueo de acciones administrativas válidas. |

## Comandos de ejecución

```bash
npm run typecheck
npm run test:integration
```

## Resultado local

```text
Test Files  4 passed (4)
Tests       30 passed (30)
```

## Relación con trazabilidad

La relación entre historias, riesgos, tipos de prueba y archivos está documentada en:

- `docs/integration/traceability-matrix.md`
- `docs/wiki/07-Matriz-de-Trazabilidad.md`

La matriz evidencia que la regla crítica de negocio, evitar reservas solapadas para la misma sala y rango horario, está cubierta por pruebas unitarias y de integración.
