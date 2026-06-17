# Clases de Equivalencia y Valores Límite

## RoomValidation.validate()

| Campo | Clase de Equivalencia | Valor Representativo | Resultado Esperado |
|---|---|---|---|
| `id` | Válido (no vacío) | `"A1"` | `true` |
| `id` | Inválido (vacío) | `""` | `false` |
| `name` | Válido (no vacío) | `"Sala Principal"` | `true` |
| `name` | Inválido (vacío) | `""` | `false` |
| `capacity` | Válido (entero positivo) | `10` | `true` |
| `capacity` | Límite inferior (cero) | `0` | `false` |
| `capacity` | Inválido (negativo) | `-1` | `false` |
| `capacity` | Inválido (no entero) | `2.5` | `false` |
| `location` | Válido (opcional omitido) | (sin `location`) | `true` |
| `location` | Válido (opcional presente) | `"Piso 1"` | `true` |

### Valores límite identificados

- `capacity = 1` → válido (mínimo aceptable)
- `capacity = 0` → inválido (frontera inferior)
- `capacity = -1` → inválido (debajo del límite)

---

## Permission.hasPermission()

| Rol | Acción | Clase | Resultado Esperado |
|---|---|---|---|
| ADMIN | `room:create` | Acción permitida | `true` |
| ADMIN | `room:delete` | Acción permitida | `true` |
| ADMIN | `user:manage` | Acción permitida | `true` |
| MANAGER | `room:create` | Acción permitida | `true` |
| MANAGER | `room:delete` | Acción prohibida | `false` |
| MANAGER | `user:manage` | Acción prohibida | `false` |
| USER | `reservation:create` | Acción permitida | `true` |
| USER | `room:create` | Acción prohibida | `false` |
| USER | `user:manage` | Acción prohibida | `false` |
