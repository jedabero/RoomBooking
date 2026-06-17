# 09 — Pruebas de Sistema

## Objetivo

Validar el comportamiento visible del sistema mediante una API simulada sin levantar servidor HTTP real.

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

## Escenarios cubiertos

| Escenario | Estado esperado |
|---|---:|
| Creación de reserva exitosa. | 201 |
| Conflicto de reserva. | 409 |
| Consulta de disponibilidad. | 200 |
| Acción administrativa con rol inválido. | 403 |
| Datos inválidos. | 400 |
| Recurso no encontrado. | 404 |

## Comando

```bash
npm run test:system
```

## Resultado local

```text
Test Files  1 passed (1)
Tests       12 passed (12)
```
