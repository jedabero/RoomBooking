# Publicación de la Wiki de GitHub

La documentación oficial de la fase de pruebas se encuentra en `docs/wiki/`.

Para publicarla en la Wiki real de GitHub:

```bash
# Desde una carpeta externa al repositorio principal
git clone git@github.com:jedabero/RoomBooking.wiki.git RoomBooking.wiki

# Copiar páginas generadas
cp RoomBooking/docs/wiki/*.md RoomBooking.wiki/

cd RoomBooking.wiki
git status
git add .
git commit -m "docs: publicar wiki de pruebas de carga y rendimiento"
git push
```

Si la Wiki aún no existe, primero abrir:

`https://github.com/jedabero/RoomBooking/wiki`

Crear la primera página manualmente y luego repetir el proceso.

## Sincronización auxiliar

Este repositorio incluye un script auxiliar que copia las páginas locales hacia un repositorio Wiki clonado como carpeta hermana `../RoomBooking.wiki`:

```bash
scripts/sync-wiki.sh
```

El script solo copia archivos y muestra `git status`. No realiza commit ni push.

## Evidencia recomendada

Para la Wiki real de GitHub se recomienda adjuntar capturas de:

- Ejecución local de k6.
- Archivos JSON generados en `perf/results/`.
- Ejecución exitosa del workflow manual `Performance`.
