# Task 04: Agua azul y quitar rayas verdes del plano privado

## Status

complete

## Wave

3

## Description

Ampliación expresamente solicitada por el usuario: colorear el agua de azul y retirar las rayas verdes añadidas sobre los lotes de St. Thomas. El PDF original ya fue adjuntado y revisado. Conservar árboles, líneas, números, superficies y colores comerciales de los lotes.

## Dependencies

**Depends on:** task-03-herramientas.md
**Blocks:** None

**Context from dependencies:** El mapa privado conserva el raster autenticado `/api/st-thomas/plan` con polígonos interactivos encima. El filtro monocromo fue retirado. La base de datos privada no está disponible en el entorno; no cambiarla ni publicar el PDF/PNG en Git.

## Files to Create

- `src/components/st-thomas/plan-colors.ts` — Transformación de los colores identificados del fondo, solo en memoria del navegador.
- PDF vectorial corregido fuera del repositorio, como archivo entregable privado.

## Files to Modify

- `src/components/st-thomas/LotMap.tsx` — Preparar el fondo corregido manteniendo carga, errores y limpieza de recursos.
- `src/components/st-thomas/lot-map.module.css` — Solo si se requiere mantener legible el azul.

## Technical Details

- Fuente adjunta: `Plano Lotes Korn Raya Verde.pdf`, una página de 1191×1684 puntos; raster existente a escala 2.
- `Agua_Hatch`: cian RGB(0,255,255). Cambiar a azul RGB(81,158,196), incluyendo antialias del raster.
- Marcas añadidas: trazos lima aproximados RGB(106,217,40), RGB(105,217,39), RGB(104,217,38), sin capa CAD. Retirar únicamente estos trazos del PDF; en el raster, devolver estos píxeles y su antialias al fondo blanco.
- Árboles: verde oscuro RGB(68,142,51); conservar. Los estados comerciales se renderizan como polígonos SVG separados y deben permanecer intactos.
- Procesar la imagen privada localmente sin subirla a servicios ni modificar el archivo almacenado. Limpiar URLs de objetos y cancelar actualización de estado después de desmontaje/cambio de imagen.
- El PDF entregable se edita como documento vectorial: retirar operaciones de trazado lima y recolorear únicamente agua. Mantener textos y estructura.
- Verificar el resultado con el PDF real, dimensiones intactas, árboles y trazados negros conservados, sin marcas lima y con agua azul. Lint y typecheck deben pasar.

## Acceptance Criteria

- [x] Agua azul verificada contra la fuente real.
- [x] Rayas verdes eliminadas; árboles y datos preservados.
- [x] Funciones de selección, zoom/pan y estados de lotes intactas.
- [x] Imagen privada no publicada en Git ni en activos públicos.
- [x] PDF corregido entregable y comprobaciones documentadas.

## Publication

Sumar a la rama del PR #6. La actualización de `main` y despliegue siguen pendientes de autorización explícita tras el rechazo automático previo.

## Verificación

- Raster real 2382×3368: clases cian y lima desaparecen; agua RGB(81,158,196). Árboles verde oscuro y píxeles negros/neutros intactos.
- Chromium: componente real con estados comerciales, selección, zoom/reset, error de carga y recuperación aprobados; URLs de objetos creadas y revocadas correctamente. Sin errores JavaScript.
- Lint y typecheck aprobados, revisión independiente PASS.
- PDF vectorial:141 marcas Adobe Fill & Sign retiradas,2111 trazados de agua recoloreados; texto, árboles y geometría idénticos. Artefacto fuera del repositorio.
- Efecto estilístico menor del raster: cinco líneas cian de contorno también se muestran azules, sin cambios de geometría.
