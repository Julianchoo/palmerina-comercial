# Task 02: Plano cómodo y accesible

## Status

complete

## Wave

1

## Description

Mejorar plano-comercial/plano.html para que un visitante pueda explorar unidades en escritorio y celular sin enfrentar primero una planilla financiera. Publicarlo dentro de la web con ruta /plano. El pedido autoriza mejoras de UX; los datos y geometría existentes deben permanecer.

## Dependencies

**Depends on:** None
**Blocks:** task-03-home
**Context:** Home futura tendrá enlaces a /plano. La maqueta no se rediseña. Plano contiene37unidades, U y coordenadas; precios/estados inventados son ilustrativos.

## Files to Modify

- `plano-comercial/plano.html` — UX, estilo y controles.
- `package.json` — hook prebuild/prebuild:ci para copiar estáticos, sin cambiar dependencias ni lockfile.
- `next.config.ts` — permitir el visor del plano con X-Frame-Options SAMEORIGIN únicamente en /plano/:path*, conservando DENY en las demás rutas.

## Files to Create

- `scripts/sync-plano.mjs` — copia fuente canónica a public/plano/index.html, alias plano.html y maqueta.html para enlaces existentes.
- `public/plano/index.html`, `public/plano/plano.html` y `public/plano/maqueta.html` — salidas reproducibles del script. El alias mantiene el enlace de regreso desde la maqueta.
- `src/app/plano/page.tsx` — ruta pública con visor iframe full-height y title accesible, metadata correcta.

## Technical Details

Leer frontend-design y nextjs del repo; no tocar shadcn/auth. Estilo negro/crema/cobre, controles44px mínimo, buena jerarquía. Simplificar header, plantas claras, búsqueda por ID/rubro, filtro de tipo, zoom+/− y ajustar. Filtros técnicos/color por precio/rentabilidad/mensuras y tabla completa permanecen en sección expandible, no primera pantalla. Default sin mensuras saturando dibujo. Fichas legibles con ID, tipo, superficie, rubro y planta; valores económicos sólo sección secundaria con datosilustrativos claros. Mantener cálculo y ordenar tabla existentes.

Zoom puede cambiar viewBox; si pan/pinch exige complejidad, implementar controles robustos y pan pointer sólo zoom>1 con gestión touch-action adecuada. Clic simple selecciona, arrastre no selecciona. No bloquear scroll normal del móvil. Selección buscada/tabla puede cambiar planta automáticamente. Ocultar/deseleccionar unidades que ya no cumplen filtro, no perder selection por redraw innecesario. Estados aria/keyboard y Escape/close panel; evitar autofocus que invada teclado móvil.

Conservar U, TYPES/STATES, NUCLEOS, OF_PRECIO, parcelas, FOS/FOT y geometría; no inventar disponibilidad ni alterar precios. Usar nota breve visible de anteproyecto/datos ilustrativos. Back link home con target_top al estar dentro iframe. Las rutas públicas se generan del canónico por script, comprobar igualdad; /plano frame puede usar /plano/index.html. Preservar scriptsbuild existentes, añadir sólo hook necesario y ejecutar sync para dev.

Verificar desktop y390px: búsqueda por ID/rubro con y sin resultados, filtro, ambos pisos, zoom/reset, selección click/Enter, close/Escape, detalles, tabla/orden, theme y enlaces. Sin errores JS ni overflow. Leer skill Playwright antes. Browser /tmp/palmerina-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell requiere exec escalado. Dependencias instaladas. Lintbaseline falla plugin react fuera alcance, typecheck previo pasa. No commits.

## Acceptance Criteria

- [ ] UX clara y controles accesibles móvil/teclado.
- [ ] Datos y geometría sin cambios.
- [ ] /plano funciona y estáticos se reproducen por sync.
- [ ] Evidencia navegador y screenshots sin errores/desbordamiento.
