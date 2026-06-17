# 04 — Clases de Equivalencia y Valores Límite

## Clases de equivalencia

| Componente | Clase válida | Clase inválida |
|---|---|---|
| `RoomValidation` | Sala con `id`, `name` y `capacity` entero positivo. | `id` vacío, `name` vacío, capacidad cero, negativa o no entera. |
| `Permission` | Acción permitida para el rol. | Acción no permitida para el rol. |
| `ReservationConflict` | Reservas de distinta sala o sin solapamiento. | Reservas confirmadas de la misma sala con solapamiento temporal. |
| `Availability` | Sala sin reservas confirmadas solapadas. | Sala con al menos una reserva confirmada solapada. |
| `ReservationPolicy` | Duración positiva menor o igual a 4 horas y reserva dentro de 30 días. | Duración cero, excesiva, inicio en pasado o reserva con demasiada anticipación. |

## Valores límite

| Regla | Valor límite | Resultado esperado |
|---|---|---|
| Capacidad de sala | `capacity = 1` | Válido |
| Capacidad de sala | `capacity = 0` | Inválido |
| Capacidad de sala | `capacity = -1` | Inválido |
| Capacidad de sala | `capacity = 2.5` | Inválido |
| Solapamiento | Nueva reserva termina exactamente al inicio existente (`08:00–09:00` vs `09:00–10:00`) | Sin conflicto |
| Solapamiento | Nueva reserva empieza exactamente al final existente (`10:00–11:00` vs `09:00–10:00`) | Sin conflicto |
| Duración | `0` horas | Inválido |
| Duración | `2` horas | Válido |
| Duración | `8` horas | Inválido |
| Anticipación | 14 días | Válido |
| Anticipación | Más de 30 días | Inválido |
