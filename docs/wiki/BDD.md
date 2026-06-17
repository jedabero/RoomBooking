# BDD — Behavior Driven Development

Los escenarios BDD se describen en formato **Given – When – Then** y se corresponden directamente con las pruebas unitarias.

## RoomValidation

### Escenario 1: Sala válida
- **Given** una sala con id `"1"`, nombre `"Sala A"` y capacidad `10`
- **When** se valida la sala
- **Then** el resultado debe ser `true`

### Escenario 2: Capacidad inválida (cero)
- **Given** una sala con capacidad `0`
- **When** se valida la sala
- **Then** el resultado debe ser `false`

### Escenario 3: Capacidad inválida (negativa)
- **Given** una sala con capacidad `-1`
- **When** se valida la sala
- **Then** el resultado debe ser `false`

### Escenario 4: Capacidad inválida (no entera)
- **Given** una sala con capacidad `2.5`
- **When** se valida la sala
- **Then** el resultado debe ser `false`

### Escenario 5: Id vacío
- **Given** una sala con id vacío
- **When** se valida la sala
- **Then** el resultado debe ser `false`

### Escenario 6: Nombre vacío
- **Given** una sala con nombre vacío
- **When** se valida la sala
- **Then** el resultado debe ser `false`

---

## Permission

### Escenario 1: ADMIN crea sala
- **Given** un usuario con rol ADMIN
- **When** se verifica permiso para `"room:create"`
- **Then** el resultado debe ser `true`

### Escenario 2: ADMIN gestiona usuarios
- **Given** un usuario con rol ADMIN
- **When** se verifica permiso para `"user:manage"`
- **Then** el resultado debe ser `true`

### Escenario 3: USER crea sala (prohibido)
- **Given** un usuario con rol USER
- **When** se verifica permiso para `"room:create"`
- **Then** el resultado debe ser `false`

### Escenario 4: USER crea reserva (permitido)
- **Given** un usuario con rol USER
- **When** se verifica permiso para `"reservation:create"`
- **Then** el resultado debe ser `true`

### Escenario 5: MANAGER crea sala (permitido)
- **Given** un usuario con rol MANAGER
- **When** se verifica permiso para `"room:create"`
- **Then** el resultado debe ser `true`

### Escenario 6: MANAGER elimina sala (prohibido)
- **Given** un usuario con rol MANAGER
- **When** se verifica permiso para `"room:delete"`
- **Then** el resultado debe ser `false`
