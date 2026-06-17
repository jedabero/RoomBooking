# Reporte de Pruebas de Carga y Rendimiento — RoomBooking

## 1. Objetivo

Implementar una capa reproducible de pruebas de carga y rendimiento para RoomBooking usando k6, con escenarios parametrizados, SLO medibles y evidencia exportable en `perf/results/`.

## 2. Alcance

La prueba cubre endpoints REST locales representativos del dominio de reserva de salas. No evalúa bases de datos reales, autenticación, red externa ni infraestructura productiva.

## 3. Arquitectura evaluada

```text
k6 -> REST local Node HTTP -> servicios de aplicacion -> repositorios in-memory -> reglas de dominio
```

El servidor se ejecuta con:

```bash
npm run perf:serve
```

## 4. Endpoints evaluados

| Endpoint | Método | Propósito |
|---|---|---|
| `/health` | GET | Verificar salud del servicio. |
| `/api/availability` | POST | Consultar salas disponibles por horario y capacidad. |
| `/api/reservations` | POST | Crear reservas validando disponibilidad y conflictos. |
| `/api/reservations/:id/cancel` | PATCH | Cancelar reservas existentes. |
| `/api/test/reset` | POST | Reiniciar datos en memoria para escenarios reproducibles. |

## 5. Datos de prueba

Los datos semilla están definidos en `perf/data/` y reflejados en el servidor REST local:

- `perf/data/rooms.json`
- `perf/data/users.json`
- `perf/data/reservations.json`

Las reservas creadas por k6 usan identificadores y franjas horarias únicas por VU/iteración para reducir conflictos artificiales.

## 6. SLO definidos

Los SLO completos están documentados en `perf/reports/slo.md`.

| Escenario | Error rate máximo | p95 máximo |
|---|---:|---:|
| Baseline | `< 1%` | `< 300 ms` |
| Load | `< 2%` | `< 500 ms` |
| Stress | `< 5%` | `< 1000 ms` |
| Spike | `< 8%` | `< 1500 ms` |
| Soak | `< 3%` | `< 800 ms` |
| Regresión | `< 2%` | `< 500 ms` |

## 7. Escenarios configurados

### 7.1 Baseline

Mide comportamiento con baja carga mediante 3 VUs durante 30 segundos.

Comando:

```bash
npm run perf:baseline
```

### 7.2 Load

Valida carga esperada con rampa progresiva hasta 30 VUs.

Comando:

```bash
npm run perf:load
```

### 7.3 Stress

Evalúa degradación con carga superior a la esperada, hasta 60 VUs.

Comando:

```bash
npm run perf:stress
```

### 7.4 Spike

Simula incremento súbito hasta 75 VUs y retorno a baja carga.

Comando:

```bash
npm run perf:spike
```

### 7.5 Soak

Ejecuta carga moderada durante 4 minutos. Es una versión académica corta; en un entorno real debería durar varias horas.

Comando:

```bash
npm run perf:soak
```

### 7.6 Regresión

Escenario corto apto para ejecución manual en CI. Usa 5 VUs durante 45 segundos.

Comando:

```bash
npm run perf:regression
```

## 8. Resultados obtenidos

Se ejecutaron localmente los seis escenarios definidos. Todos aprobaron sus thresholds de k6 y generaron archivos JSON en `perf/results/`.

| Escenario | Archivo | Estado | p95 | p99 | Error rate | Throughput | Iteraciones |
|---|---|---|---:|---:|---:|---:|---:|
| Baseline | `perf/results/baseline-summary.json` | Aprobado | `0.83 ms` | `0.97 ms` | `0%` | `10.48 req/s` | `90` |
| Load | `perf/results/load-summary.json` | Aprobado | `1.74 ms` | `6.78 ms` | `0%` | `49.58 req/s` | `1787` |
| Stress | `perf/results/stress-summary.json` | Aprobado | `0.76 ms` | `1.01 ms` | `0%` | `101.66 req/s` | `3828` |
| Spike | `perf/results/spike-summary.json` | Aprobado | `1.06 ms` | `1.55 ms` | `0%` | `134.68 req/s` | `3164` |
| Soak | `perf/results/soak-summary.json` | Aprobado | `1.71 ms` | `2.48 ms` | `0%` | `65.55 req/s` | `4800` |
| Regresión | `perf/results/regression-summary.json` | Aprobado | `0.93 ms` | `1.20 ms` | `0%` | `17.42 req/s` | `225` |

## 9. Comparación entre escenarios

Baseline y regresión operan con baja carga constante, load incrementa progresivamente hasta 30 VUs, stress alcanza 60 VUs, spike alcanza 75 VUs de forma súbita y soak mantiene 20 VUs durante 4 minutos. En todas las ejecuciones el p95 quedó por debajo del SLO definido y no se registraron errores HTTP inesperados.

## 10. Análisis de métricas

- Latencia promedio: baseline `0.47 ms`, load `0.73 ms`, stress `0.49 ms`, spike `0.51 ms`, soak `0.72 ms`, regresión `0.51 ms`.
- p95: baseline `0.83 ms`, load `1.74 ms`, stress `0.76 ms`, spike `1.06 ms`, soak `1.71 ms`, regresión `0.93 ms`.
- p99: baseline `0.97 ms`, load `6.78 ms`, stress `1.01 ms`, spike `1.55 ms`, soak `2.48 ms`, regresión `1.20 ms`.
- Throughput: baseline `10.48 req/s`, load `49.58 req/s`, stress `101.66 req/s`, spike `134.68 req/s`, soak `65.55 req/s`, regresión `17.42 req/s`.
- Tasa de errores: `0%` en todos los escenarios ejecutados.

## 11. Identificación de cuellos de botella

Riesgos técnicos observados para fases futuras:

- La consulta de disponibilidad recorre reservas en memoria y puede crecer linealmente con el volumen de reservas.
- La validación de conflictos consulta reservas por sala y puede degradarse si aumenta el historial.
- El servidor local usa un único proceso Node.js y no representa escalamiento horizontal.
- No hay métricas de CPU/memoria integradas en el servidor.

## 12. Defectos de rendimiento

El registro se encuentra en `perf/defectos_rendimiento.md`. No se confirmaron defectos de rendimiento en la ejecución local; los hallazgos se mantienen como riesgos potenciales para escenarios con mayor volumen de datos o infraestructura productiva.

## 13. Propuestas de mejora

- Indexar reservas por sala y fecha si el volumen crece.
- Agregar métricas de CPU, memoria y event loop lag.
- Persistir datos en una base real para pruebas de soak representativas.
- Separar datasets de carga por escenario.
- Ejecutar regresión de rendimiento en workflow manual antes de entregas.

## 14. Conclusiones

RoomBooking queda preparado para ejecutar pruebas de carga y rendimiento reproducibles con k6. La estructura permite ejecutar escenarios locales, exportar resultados y registrar riesgos sin inventar métricas.
