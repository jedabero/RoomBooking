# SLO de rendimiento — RoomBooking

## Objetivo

Definir criterios medibles para aceptar o rechazar la ejecución de pruebas de carga y rendimiento sobre RoomBooking.

## Métricas principales

| Métrica | Descripción | Motivo |
|---|---|---|
| `http_req_failed` | Proporción de solicitudes fallidas. | Mide confiabilidad bajo carga. |
| `http_req_duration p95` | Latencia percibida por el 95% de las solicitudes. | Evalúa experiencia de usuario y degradación. |
| `unexpected_errors` | Checks funcionales fallidos no esperados. | Separa errores técnicos de respuestas de negocio esperadas. |

## SLO por escenario

| Escenario | Error rate máximo | p95 máximo | Criterio de aprobación |
|---|---:|---:|---|
| Baseline | `< 1%` | `< 300 ms` | El sistema responde correctamente con baja carga. |
| Load | `< 2%` | `< 500 ms` | El sistema sostiene carga esperada. |
| Stress | `< 5%` | `< 1000 ms` | El sistema degrada de forma controlada. |
| Spike | `< 8%` | `< 1500 ms` | El sistema tolera incrementos súbitos. |
| Soak | `< 3%` | `< 800 ms` | El sistema se mantiene estable durante ejecución prolongada académica. |
| Regresión | `< 2%` | `< 500 ms` | El sistema conserva desempeño aceptable después de cambios. |

## Justificación técnica

RoomBooking usa persistencia en memoria y reglas de negocio sin I/O externo. Por tanto, los SLO son exigentes para baseline y load, y más flexibles para stress y spike. En una versión con base de datos real, autenticación o red externa, estos umbrales deberían recalibrarse con mediciones históricas.

## Relación con el dominio

Los SLO se aplican sobre flujos representativos del dominio:

- Consulta de salud del servicio.
- Consulta de disponibilidad de salas.
- Creación de reserva con validación de conflicto.
- Cancelación de reserva existente.

## Aprobación y rechazo

Una ejecución se considera aprobada si k6 termina con código `0` y todos los thresholds definidos para el escenario se cumplen. Si un threshold falla, el escenario queda rechazado y debe registrarse el hallazgo en `perf/defectos_rendimiento.md`.
