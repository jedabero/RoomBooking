# 02 — TDD Red Green Refactor

El desarrollo siguió ciclos incrementales Red → Green → Refactor. Primero se escribieron pruebas fallidas, luego se implementó la lógica mínima y finalmente se refactorizó manteniendo las pruebas en verde.

## Iteración 1: RoomValidation

### Red

Se crearon pruebas para salas válidas e inválidas: `id` vacío, `name` vacío, capacidad cero, negativa y no entera. Las pruebas fallaron inicialmente porque el stub lanzaba `Error('not implemented')`.

### Green

Se implementó la mínima lógica necesaria:

```typescript
if (!room.id) return false
if (!room.name) return false
if (!Number.isInteger(room.capacity) || room.capacity <= 0) return false
return true
```

### Refactor

Se extrajeron métodos privados y una constante `MIN_CAPACITY` para expresar la intención.

## Iteración 2: Permission

### Red

Se definieron pruebas para permisos de `ADMIN`, `MANAGER` y `USER` sobre acciones como `room:create`, `room:delete`, `user:manage` y `reservation:create`.

### Green

Se implementó una matriz mínima de permisos: `ADMIN` puede todo, `MANAGER` puede crear salas y `USER` puede crear reservas.

### Refactor

Se extrajo la matriz `PERMISSIONS` y se mantuvo el caso especial de `ADMIN` como acceso global.

## Iteración 3: ReservationConflict

### Red

Se escribieron pruebas para lista vacía, salas distintas, solapamientos exactos, parciales, contención completa, reservas canceladas y bordes exactos donde una reserva termina justo cuando otra empieza.

### Green

Se implementó la regla de solapamiento:

```typescript
return aStart < bEnd && bStart < aEnd
```

### Refactor

Se extrajeron métodos privados `conflictsWith` y `overlaps`.

## Iteraciones adicionales

También se completaron ciclos para `Availability` y `ReservationPolicy`, manteniendo el mismo flujo Red → Green → Refactor.
