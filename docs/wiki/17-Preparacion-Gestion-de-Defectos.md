# 17 Preparacion Gestion de Defectos

## Objetivo

RoomBooking queda preparado para registrar y gestionar defectos en una fase posterior. Esta pagina no constituye el informe final de Gestion de Defectos ni registra defectos reales.

## Plantillas disponibles

La estructura preparatoria esta en `docs/defect-management/`:

- `README.md`: alcance y trazabilidad esperada.
- `defect-lifecycle-template.md`: ciclo de vida recomendado.
- `defect-report-template.md`: plantilla de reporte de defecto.
- `defect-severity-priority-guide.md`: criterios de severidad y prioridad.
- `evidence-guidelines.md`: evidencias minimas requeridas.
- `readiness-checklist.md`: lista de preparacion.

## GitHub Issues

Los templates para la fase posterior estan en `.github/ISSUE_TEMPLATE/`:

- `defect_report.yml` para defectos funcionales o tecnicos.
- `performance_risk.yml` para riesgos de rendimiento pendientes de confirmacion.
- `documentation_issue.yml` para inconsistencias documentales.

No se crean Issues reales en esta preparacion. Cuando inicie la gestion formal, cada Issue debera incluir modulo afectado, severidad, prioridad, pasos, resultado esperado, resultado obtenido, evidencia, prueba relacionada y criterio de cierre.

## Evidencias requeridas

La fase posterior debera adjuntar evidencia reproducible, por ejemplo:

- Capturas de pantalla.
- Logs de consola.
- Salidas de pruebas.
- Enlaces a GitHub Actions.
- Reportes de coverage.
- Resultados k6.
- Commits o diffs.
- Pasos de reproduccion.

## Pendiente para la fase posterior

- Crear Issues reales solo cuando existan defectos o riesgos con evidencia.
- Trazar defectos contra pruebas, commits, workflows o documentacion.
- Validar correcciones antes de cerrar defectos.
- Publicar la Wiki real de GitHub si aplica.
- Adjuntar capturas o evidencias visuales requeridas por la entrega.
