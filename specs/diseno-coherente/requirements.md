# Requirements: Diseño coherente

## Summary

El usuario quiere mejorar el estilo de Palmerina Comercial, cuya navegación y diseño cambian entre pestañas, sin cambiar mucho el contenido. El código confirma encabezados independientes en la portada, alquiler y St. Thomas, y un plano en iframe que ocupa toda la ventana.

Se implementa una identidad común tomando como referencia la portada actual: fondos crema, texto oscuro, detalles cobre, títulos serif y cuerpo con las fuentes ya cargadas. Se propone un encabezado compartido con marca, enlaces permanentes entre páginas, estado activo y menú móvil consistente. Los enlaces a secciones se presentan como navegación secundaria contextual.

## Goals

- Reconocer el mismo sitio al pasar de una página a otra.
- Mantener una navegación principal estable: Proyecto (`/`), Alquiler (`/alquiler`) y Plano (`/plano`).
- Aplicar la misma presentación al área St. Thomas conservando acceso administrativo y menú de cuenta.
- Unificar tipografía, botones, anchos, espaciados y colores de superficies.
- Conservar imágenes, textos, datos, consultas y funciones existentes.

## Non-Goals

- Reescribir información comercial, corregir cifras, modificar disponibilidad o precios.
- Cambiar autenticación, permisos, base de datos o audiencias.
- Rediseñar el motor del plano ni la maqueta 3D.
- Exponer St. Thomas como contenido público.

## Acceptance Criteria

- [ ] Las páginas públicas comparten marca, orden de navegación y estado activo exacto.
- [ ] La navegación móvil abre, cierra al navegar y con Escape, devuelve foco y declara su estado.
- [ ] Los anclajes no quedan ocultos por el encabezado.
- [ ] Portada y alquiler comparten estilos sin modificar sus textos o estadísticas.
- [ ] El plano mantiene búsqueda, filtros, plantas, selección, zoom, tema y consultas; su encabezado global se mantiene accesible.
- [ ] St. Thomas conserva redirecciones y AccountMenu; se adapta su envolvente visual.
- [ ] No hay desbordamiento horizontal a 375, 768 y 1440 px.
- [ ] `pnpm lint`, `pnpm typecheck` y `pnpm build` se ejecutan y se informa su resultado real.

## Assumptions

- La portada editorial es la referencia propuesta, pendiente de respuesta del usuario.
- St. Thomas recibe únicamente la adaptación visual de la envolvente; no se cambia su acceso.
- El orden y los nombres propuestos de navegación se pueden ajustar antes de implementar.

## Technical Constraints

- Next.js 16, React 19, Tailwind 4 y pnpm; Node 24.
- Leer las skills obligatorias del repositorio para Next.js, diseño y cualquier componente shadcn que se modifique.
- Usar tokens CSS compartidos con prefijo de marca; aislar cambios públicos para no afectar autenticación ni semántica de colores de estados.
- `plano-comercial/plano.html` es fuente canónica; `scripts/sync-plano.mjs` genera `public/plano/` antes del build.
- No agregar dependencias ni nuevas fuentes para este ajuste.
- Producción despliega desde `main`; no declarar actualización publicada sin verificar el despliegue y su commit.

## Ampliación aprobada por el usuario

Agua azul y retirada de las rayas verdes añadidas en St. Thomas. El PDF adjunto permite identificar agua cian y anotaciones lima sin modificar árboles, datos ni polígonos comerciales. Corregir la visualización del raster privado en memoria del navegador; no publicar la imagen privada ni cambiar registros del inventario. Entregar además PDF vectorial corregido.
