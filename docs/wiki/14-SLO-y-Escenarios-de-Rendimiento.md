# 14 — SLO y Escenarios de Rendimiento

## SLO definidos

| Escenario | Error rate máximo | p95 máximo |
|---|---:|---:|
| Baseline | `< 1%` | `< 300 ms` |
| Load | `< 2%` | `< 500 ms` |
| Stress | `< 5%` | `< 1000 ms` |
| Spike | `< 8%` | `< 1500 ms` |
| Soak | `< 3%` | `< 800 ms` |
| Regresión | `< 2%` | `< 500 ms` |

## Justificación

RoomBooking usa repositorios en memoria y reglas de negocio sin I/O externo. Por esto, los umbrales iniciales son estrictos en baseline y load. En stress y spike los umbrales son más flexibles porque el objetivo es observar degradación controlada.

## Escenarios

### Baseline

Mide comportamiento con baja carga.

```bash
npm run perf:baseline
```

### Load

Valida carga esperada con rampa progresiva hasta 30 VUs.

```bash
npm run perf:load
```

### Stress

Evalúa degradación bajo carga superior a la esperada, hasta 60 VUs.

```bash
npm run perf:stress
```

### Spike

Simula incremento súbito hasta 75 VUs y retorno a baja carga.

```bash
npm run perf:spike
```

### Soak

Valida estabilidad académica durante 4 minutos. En un entorno productivo debería ejecutarse durante varias horas.

```bash
npm run perf:soak
```

### Regresión

Escenario corto para ejecución manual o CI.

```bash
npm run perf:regression
```

## Referencia técnica

La definición completa está en `perf/reports/slo.md`.
