# RoomBooking

[![CI](https://github.com/jedabero/RoomBooking/actions/workflows/ci.yml/badge.svg)](https://github.com/jedabero/RoomBooking/actions/workflows/ci.yml)

RoomBooking es un proyecto integrador para validar un sistema de reserva de salas mediante pruebas unitarias, pruebas de integración, pruebas de sistema, pruebas de carga/rendimiento y gestión de defectos. El repositorio está implementado en TypeScript y usa Vitest, k6 y GitHub Actions.

## Dominio

El sistema permite gestionar reservas de salas de reunión. Las reglas principales del dominio incluyen:

- Validar disponibilidad de una sala en un rango horario.
- Detectar conflictos entre reservas existentes.
- Aplicar políticas de reserva, como duración máxima y anticipación permitida.
- Validar datos de salas y reservas.
- Controlar permisos según rol de usuario.
- Permitir cancelación de reservas y desactivación de salas.

## Stack

- TypeScript.
- Vitest para pruebas automatizadas y cobertura.
- k6 para pruebas de carga y rendimiento.
- GitHub Actions para CI y regresión manual de rendimiento.
- Repositorios in-memory para mantener el foco en reglas de negocio y pruebas reproducibles.

## Estructura

```text
src/
├── domain/
│   ├── model/           # Entidades y Value Objects
│   └── rules/           # Reglas de negocio
├── application/
│   └── services/        # Casos de uso y coordinación de reglas/repositorios
├── infrastructure/
│   └── persistence/     # Repositorios in-memory e interfaces
└── delivery/
    └── http/            # API simulada y servidor local de rendimiento
test/
├── domain/              # Pruebas unitarias
└── integration/         # Pruebas de integración y sistema/API simulada
perf/
├── scripts/             # Scripts k6
├── data/                # Datos de prueba
├── results/             # Resultados exportados por k6
└── reports/             # Reportes técnicos y SLO
docs/
├── integration/         # Evidencia técnica de integración/sistema
├── defect-management/   # Preparación y trazabilidad de gestión de defectos
└── wiki/                # Documentación lista para publicar en GitHub Wiki
```

## Instalación

```bash
npm ci
```

Requiere Node.js 24 o superior.

## Validación principal

```bash
npm run typecheck
npm test
npm run test:coverage
```

## Scripts disponibles

| Script                     | Propósito                                  |
| -------------------------- | ------------------------------------------ |
| `npm run typecheck`        | Validación TypeScript sin emitir archivos. |
| `npm test`                 | Ejecuta toda la suite Vitest.              |
| `npm run test:unit`        | Ejecuta pruebas unitarias del dominio.     |
| `npm run test:integration` | Ejecuta pruebas de integración.            |
| `npm run test:system`      | Ejecuta pruebas de sistema/API simulada.   |
| `npm run test:coverage`    | Ejecuta pruebas con reporte de cobertura.  |
| `npm run perf:serve`       | Levanta el servidor REST local para k6.    |
| `npm run perf:baseline`    | Ejecuta escenario k6 baseline.             |
| `npm run perf:load`        | Ejecuta escenario k6 load.                 |
| `npm run perf:stress`      | Ejecuta escenario k6 stress.               |
| `npm run perf:spike`       | Ejecuta escenario k6 spike.                |
| `npm run perf:soak`        | Ejecuta escenario k6 soak académico.       |
| `npm run perf:regression`  | Ejecuta regresión corta de rendimiento.    |

## Pruebas Automatizadas

La suite valida reglas puras de dominio, flujos de integración entre capas y comportamiento de API simulada.

```bash
npm run test:unit
npm run test:integration
npm run test:system
npm run test:coverage
```

Cobertura local de referencia:

```text
Statements   : 99.33% (150/151)
Branches     : 97.5% (78/80)
Functions    : 100% (46/46)
Lines        : 99.3% (142/143)
```

El servidor local `src/delivery/http/PerformanceServer.ts` se excluye de cobertura Vitest porque se valida mediante k6 como infraestructura de rendimiento.

## Pruebas De Rendimiento

El servidor REST local usa `node:http`, servicios de aplicación y repositorios in-memory.

```bash
npm run perf:serve
```

Endpoints disponibles:

- `GET /health`
- `GET /metrics`
- `POST /api/availability`
- `POST /api/reservations`
- `PATCH /api/reservations/:id/cancel`
- `POST /api/test/reset`

El endpoint `/metrics` expone observabilidad básica del proceso local: uptime, memoria, cantidad de salas y cantidad de reservas en memoria.

Con el servidor activo, los escenarios k6 se ejecutan con:

```bash
npm run perf:baseline
npm run perf:load
npm run perf:stress
npm run perf:spike
npm run perf:soak
npm run perf:regression
```

Los resultados se exportan a `perf/results/`. El análisis consolidado está en `perf/reports/performance-report.md` y los SLO en `perf/reports/slo.md`.

Las pruebas de rendimiento se ejecutan sobre servidor local e in-memory. Por tanto, sus resultados no representan infraestructura productiva con base de datos real, autenticación externa o red distribuida.

## CI/CD

El workflow `.github/workflows/ci.yml` se ejecuta en `push` y `pull_request` hacia `main`. El pipeline ejecuta:

- `npm ci`
- `npm run typecheck`
- `npm run test:unit`
- `npm run test:integration`
- `npm run test:system`
- `npm run test:coverage`

También publica el reporte `coverage/` como artifact y envía cobertura a Codecov cuando el repositorio cuenta con la configuración correspondiente.

El workflow `.github/workflows/performance.yml` se ejecuta manualmente con `workflow_dispatch` y corre la regresión corta de rendimiento para evitar costos e inestabilidad de escenarios largos.

## Gestión De Defectos

La estructura para gestión de defectos está en `docs/defect-management/` e incluye:

- `README.md`
- `defect-lifecycle-template.md`
- `defect-report-template.md`
- `defect-severity-priority-guide.md`
- `evidence-guidelines.md`
- `readiness-checklist.md`

Los templates de GitHub Issues están en `.github/ISSUE_TEMPLATE/`. Los labels sugeridos están en `.github/labels.yml`.

La trazabilidad de defectos debe relacionar cada issue con evidencia verificable: pruebas, coverage, resultados k6, workflows, commits, documentación o pasos de reproducción.

## Documentación

La documentación detallada se encuentra en `docs/wiki/` y https://github.com/jedabero/RoomBooking/wiki

## Evidencias Principales

- Pruebas y cobertura: `docs/integration/`, `coverage/` generado localmente o por CI.
- Rendimiento: `perf/results/`, `perf/reports/performance-report.md`, `perf/reports/slo.md`.
- Riesgos de rendimiento: `perf/defectos_rendimiento.md`.
- Gestión de defectos: GitHub Issues y `docs/defect-management/`.
- Wiki: `docs/wiki/`.

## Equipo

- Jeison David Berdugo Orejarena
- Jagler David Velasquez Velasquez
- Rigo Armando Rosero Castillo

## Licencia Y Uso

Proyecto desarrollado con fines académicos como evidencia integradora de pruebas, rendimiento y gestión de defectos en un sistema de reservas de salas.
