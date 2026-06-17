# 13 — Pruebas de Carga y Rendimiento

## Objetivo

Extender RoomBooking con una capa reproducible de pruebas de carga y rendimiento usando k6. La fase permite evaluar comportamiento del sistema bajo baja carga, carga esperada, estrés, picos, estabilidad prolongada académica y regresión de rendimiento.

## Arquitectura evaluada

```text
k6 -> REST local Node HTTP -> servicios de aplicacion -> repositorios in-memory -> reglas de dominio
```

El servicio REST local se implementa en `src/delivery/http/PerformanceServer.ts` y se ejecuta con:

```bash
npm run perf:serve
```

## Endpoints evaluados

| Endpoint | Método | Propósito |
|---|---|---|
| `/health` | GET | Verificar salud del servicio. |
| `/api/availability` | POST | Consultar disponibilidad por horario y capacidad. |
| `/api/reservations` | POST | Crear reservas validando reglas de dominio. |
| `/api/reservations/:id/cancel` | PATCH | Cancelar reservas existentes. |
| `/api/test/reset` | POST | Reiniciar datos en memoria para pruebas reproducibles. |

## Datos de prueba

Los datos base se encuentran en:

- `perf/data/rooms.json`
- `perf/data/users.json`
- `perf/data/reservations.json`

El endpoint `/api/test/reset` existe solo para ambiente local y pruebas de performance. No representa una funcionalidad productiva.

## Herramienta

La herramienta principal es k6. Los scripts están parametrizados por variable de entorno `SCENARIO` y permiten cambiar `BASE_URL`.

```bash
k6 run perf/scripts/room_booking_k6.js -e SCENARIO=baseline -e BASE_URL=http://localhost:3000
```

## Reproducibilidad

Ejecución mínima:

```bash
npm install
npm run perf:serve
npm run perf:baseline
```

Los resultados exportados por k6 se almacenan en `perf/results/`.
