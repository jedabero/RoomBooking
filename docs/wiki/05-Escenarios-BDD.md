# 05 — Escenarios BDD

## RoomValidation

| Given | When | Then |
|---|---|---|
| Una sala con `id`, `name` y `capacity = 10`. | Se ejecuta `validate`. | Retorna `true`. |
| Una sala con `id` vacío. | Se ejecuta `validate`. | Retorna `false`. |
| Una sala con `capacity = 0`. | Se ejecuta `validate`. | Retorna `false`. |

## Permission

| Given | When | Then |
|---|---|---|
| Un usuario `ADMIN`. | Solicita `user:manage`. | Retorna `true`. |
| Un usuario `USER`. | Solicita `room:create`. | Retorna `false`. |
| Un usuario `MANAGER`. | Solicita `room:create`. | Retorna `true`. |

## ReservationConflict

| Given | When | Then |
|---|---|---|
| Reserva nueva y existente de la misma sala con mismo rango. | Se ejecuta `check`. | Retorna `true`. |
| Reserva existente cancelada con el mismo rango. | Se ejecuta `check`. | Retorna `false`. |
| Nueva reserva `08:00–09:00` y existente `09:00–10:00`. | Se ejecuta `check`. | Retorna `false`. |
| Nueva reserva `10:00–11:00` y existente `09:00–10:00`. | Se ejecuta `check`. | Retorna `false`. |

## Availability

| Given | When | Then |
|---|---|---|
| Sala sin reservas. | Se ejecuta `isAvailable`. | Retorna `true`. |
| Sala con reserva confirmada solapada. | Se ejecuta `isAvailable`. | Retorna `false`. |
| Sala con reserva cancelada solapada. | Se ejecuta `isAvailable`. | Retorna `true`. |

## ReservationPolicy

| Given | When | Then |
|---|---|---|
| Reserva futura de 2 horas. | Se ejecuta `validate`. | Retorna `true`. |
| Reserva de 8 horas. | Se ejecuta `validate`. | Retorna `false`. |
| Reserva con inicio en el pasado. | Se ejecuta `validate`. | Retorna `false`. |
