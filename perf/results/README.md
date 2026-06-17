# Resultados de k6

Este directorio almacena los resultados exportados por k6 mediante `--summary-export`.

Ejemplos:

```bash
npm run perf:baseline
npm run perf:load
npm run perf:regression
```

Los archivos generados esperados son:

- `baseline-summary.json`
- `load-summary.json`
- `stress-summary.json`
- `spike-summary.json`
- `soak-summary.json`
- `regression-summary.json`

No se deben inventar ni editar métricas manualmente. Si k6 no está instalado, ejecutar con Docker o instalar k6 localmente.

Alternativa con Docker en Linux:

```bash
docker run --rm --network host -i grafana/k6 run -e BASE_URL=http://localhost:3000 -e SCENARIO=baseline - < perf/scripts/room_booking_k6.js
```
