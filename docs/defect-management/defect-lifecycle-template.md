# Plantilla de ciclo de vida del defecto

## Flujo recomendado

`Nuevo -> Clasificado -> Priorizado -> Asignado -> En progreso -> Resuelto -> En validacion -> Cerrado`

## Estados principales

| Estado | Descripcion |
|---|---|
| Nuevo | El hallazgo fue identificado y requiere revision inicial. |
| Clasificado | QA o el equipo definio tipo, modulo y alcance preliminar. |
| Priorizado | Se asigno prioridad segun impacto, urgencia y riesgo. |
| Asignado | Existe una persona responsable de analizar o corregir. |
| En progreso | El responsable esta trabajando en la correccion o mitigacion. |
| Resuelto | El equipo considera que aplico una correccion o mitigacion. |
| En validacion | QA esta verificando la correccion con evidencia. |
| Cerrado | QA valido la correccion con evidencia y no se requiere mas accion. |

## Estados alternos

| Estado | Descripcion |
|---|---|
| Reabierto | El defecto reaparece o la correccion no satisface el criterio de cierre. |
| Duplicado | El hallazgo ya esta cubierto por otro registro. |
| No reproducible | No se pudo reproducir con la informacion disponible. |
| Diferido | Se decide atenderlo en una fase posterior por alcance o prioridad. |
| No confirmado | Hay riesgo o sospecha, pero falta evidencia suficiente. |
| No aplica | El hallazgo no corresponde a un defecto del producto o alcance evaluado. |

## Diferencia entre Resuelto y Cerrado

- Resuelto: el equipo considera que aplico una correccion o mitigacion.
- Cerrado: QA valido la correccion con evidencia y no se requiere mas accion.
