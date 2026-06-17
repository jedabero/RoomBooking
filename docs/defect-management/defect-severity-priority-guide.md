# Guia de severidad y prioridad

## Severidad

| Severidad | Criterio | Ejemplo hipotetico en RoomBooking |
|---|---|---|
| Critica | Bloquea una funcion central o compromete reglas esenciales del dominio. | Permitir reservas solapadas para la misma sala y franja horaria. |
| Alta | Afecta seguridad, permisos o flujos principales con impacto significativo. | Permitir acciones administrativas a un usuario comun. |
| Media | Afecta validaciones, mensajes o flujos secundarios sin bloquear el sistema. | Mostrar un mensaje de validacion incorrecto al crear una reserva invalida. |
| Baja | Impacto menor, cosmetico o documental. | Inconsistencia menor en una ruta de documentacion. |

## Prioridad

| Prioridad | Criterio |
|---|---|
| P1 | Debe atenderse de inmediato porque bloquea entrega, CI o funcionalidad critica. |
| P2 | Debe atenderse pronto por impacto alto o riesgo relevante. |
| P3 | Puede planificarse en una iteracion regular. |
| P4 | Puede diferirse sin afectar la operacion academica o funcional principal. |

## Uso recomendado

La severidad describe el impacto tecnico o funcional. La prioridad describe la urgencia de atencion. Un defecto puede ser severo pero no urgente si no afecta el alcance actual, o poco severo pero prioritario si bloquea una entrega academica.
