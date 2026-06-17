# 09 — Pruebas de Sistema

## Objetivo

Validar el comportamiento visible del sistema mediante una API simulada sin levantar servidor HTTP real.

## Justificación de API simulada

RoomBooking no implementa un backend HTTP real. Para mantener el alcance académico y respetar el stack actual, se creó una capa de delivery simulada mediante `RoomBookingApi`. Esta clase permite probar flujos equivalentes a endpoints HTTP sin introducir frameworks web, servidores, puertos, base de datos ni infraestructura adicional.

La prueba de sistema valida la colaboración completa:

```text
delivery/API simulada <-> application services <-> repositories in-memory <-> domain rules
```

## API simulada

La clase `RoomBookingApi` retorna respuestas con esta forma:

```ts
type ApiResponse<T = unknown> = {
  status: number
  body: T
}
```

## Endpoints simulados

| Operación | Método simulado | Estados relevantes |
|---|---|---|
| Crear sala | `postRoom` | `201`, `400`, `403` |
| Desactivar sala | `deactivateRoom` | `200`, `403`, `404` |
| Crear reserva | `postReservation` | `201`, `400`, `403`, `404`, `409` |
| Consultar disponibilidad | `getAvailability` | `200`, `400` |

## Estados HTTP validados

| Estado | Significado en la API simulada |
|---:|---|
| 200 | Consulta o actualización correcta. |
| 201 | Creación correcta de sala o reserva. |
| 400 | Datos inválidos o regla de negocio no cumplida. |
| 403 | Rol no autorizado para la operación. |
| 404 | Recurso no encontrado. |
| 409 | Conflicto de reserva por solapamiento horario. |

## Escenarios cubiertos

| Escenario | Estado esperado | Archivo |
|---|---:|---|
| Creación de reserva exitosa. | 201 | `test/integration/delivery/RoomBookingApi.system.test.ts` |
| Conflicto de reserva. | 409 | `test/integration/delivery/RoomBookingApi.system.test.ts` |
| Consulta de disponibilidad. | 200 | `test/integration/delivery/RoomBookingApi.system.test.ts` |
| Acción administrativa con rol inválido. | 403 | `test/integration/delivery/RoomBookingApi.system.test.ts` |
| Datos inválidos. | 400 | `test/integration/delivery/RoomBookingApi.system.test.ts` |
| Recurso no encontrado. | 404 | `test/integration/delivery/RoomBookingApi.system.test.ts` |

## Comando de ejecución

```bash
npm run test:system
```

## Resultado local

```text
Test Files  1 passed (1)
Tests       12 passed (12)
```

## Evidencia complementaria

Los resultados completos de ejecución están documentados en `docs/integration/test-results.md`.
