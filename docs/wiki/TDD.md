# TDD — Red → Green → Refactor

Se aplicó el ciclo TDD en cada componente de reglas de negocio. A continuación se documentan las iteraciones realizadas.

## Iteración 1: RoomValidation

### RED
Se escribieron 7 pruebas para `RoomValidation.validate()` que describen el comportamiento esperado:
- Sala válida → `true`
- Sala con `id` vacío → `false`
- Sala con `name` vacío → `false`
- Sala con `capacity = 0` → `false`
- Sala con `capacity` negativo → `false`
- Sala con `capacity` no entero → `false`

**Resultado:** 7 pruebas fallan con `Error: not implemented`.

### GREEN
Se implementó la validación mínima:

```typescript
validate(room: Room): boolean {
  if (!room.id) return false
  if (!room.name) return false
  if (!Number.isInteger(room.capacity) || room.capacity <= 0) return false
  return true
}
```

**Resultado:** 7 pruebas pasan.

### REFACTOR
Se extrajeron métodos privados (`hasValidId`, `hasValidName`, `hasValidCapacity`) y la constante `MIN_CAPACITY`.

**Resultado:** Misma funcionalidad, código más legible y mantenible.

---

## Iteración 2: Permission

### RED
Se escribieron 9 pruebas para `Permission.hasPermission()` cubriendo los tres roles (ADMIN, MANAGER, USER) con diferentes acciones.

**Resultado:** 9 pruebas fallan con `Error: not implemented`.

### GREEN
Se implementó la lógica de permisos:

```typescript
hasPermission(role: UserRole, action: string): boolean {
  if (role === UserRole.ADMIN) return true
  return PERMISSIONS[role]?.includes(action) ?? false
}
```

### REFACTOR
Se extrajo la matriz de permisos a una constante `PERMISSIONS: Record<UserRole, string[]>` con las acciones permitidas por cada rol.

---

## Iteración 3: (próximos componentes)

El ciclo se repetirá para `ReservationConflict`, `Availability` y `ReservationPolicy` siguiendo la misma metodología.
