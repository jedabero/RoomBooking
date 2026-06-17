# Guia de evidencias para defectos

## Evidencias aceptadas

- Captura de pantalla.
- Log de consola.
- Salida de pruebas.
- Enlace a GitHub Actions.
- Archivo de coverage.
- Resultado k6.
- Commit o diff.
- Issue relacionado.
- Pasos de reproduccion.

## Estandares minimos

- La evidencia debe ser reproducible.
- El ambiente debe estar identificado.
- Debe existir resultado esperado vs resultado obtenido.
- Debe relacionarse con una prueba, flujo o regla de negocio.
- Debe indicar el estado de validacion.

## Recomendacion para RoomBooking

Para defectos funcionales, adjuntar prueba relacionada o pasos manuales contra el flujo de reserva, disponibilidad, permisos o administracion de salas. Para riesgos de rendimiento, adjuntar comando k6, archivo `perf/results/` y SLO evaluado.
