# Task 03: Integrar plano y administración

## Status

complete

## Wave

2

## Description

El plano actualmente se monta en un iframe de 100dvh y solo tiene un enlace de vuelta; St. Thomas tiene navegación propia con pestañas redondas. Integrar ambos con la envolvente compartida, conservando las funciones del plano y las restricciones administrativas. No modificar el motor SVG ni datos de lotes.

## Dependencies

**Depends on:** task-01-sistema.md
**Blocks:** None

**Context from dependencies:** task-01 entrega `SiteHeader` con `sectionLinks` opcional, slot React `accountSlot`, estado activo exacto, estilos crema/tinta/cobre y altura/offset compartidos. La navegación pública contiene Proyecto `/`, Alquiler `/alquiler` y Plano `/plano`; no expone administración al público.

## Files to Create

- `src/app/plano/plano.module.css` — Envolvente responsiva del iframe y su altura.

## Files to Modify

- `src/app/plano/page.tsx` — Añadir encabezado compartido conservando title accesible del iframe.
- `plano-comercial/plano.html` — Ajustes mínimos del modo embebido y tipografía/colores de interfaz.
- `src/app/st-thomas/page.tsx` — Sustituir nav propio por SiteHeader con AccountMenu después del control de sesión.

## Technical Details

1. Leer skills de Next.js y diseño del repositorio. No cambiar auth ni componentes shadcn. StThomasPage es async, runtime nodejs y force-dynamic: conservar `isAuthConfigured`, `getAdminSession`, manejo de errores y redirecciones exactamente.
2. Pasar AccountMenu en accountSlot al encabezado. Mantener el título, explicación e InventoryManager. Adaptar márgenes y color de fondo a los tokens aprobados.
3. El plano mantiene la fuente canónica `plano-comercial/plano.html`. `scripts/sync-plano.mjs` copia a `public/plano/index.html`, `plano.html` y maqueta durante prebuild. No editar solo copias generadas.
4. Añadir modo embebido explícito mediante query (`/plano/index.html?embedded=1`) con una clase CSS activada solo cuando coincide el parámetro y `window.self !== window.top`. Ocultar únicamente el enlace de retorno redundante en este modo; preservar acceso directo al HTML con vuelta al sitio. Conservar avisos conceptuales y botones del tema.
5. Encabezado global fuera del iframe, altura disponible calculada descontando su altura real; evitar que el plano de 100dvh sume otro viewport. Comprobar doble scroll y que los controles móviles sigan alcanzables.
6. Mantener tema claro/oscuro del plano, filtros, búsqueda, plantas, zoom/pan, selección, tabla, datos financieros, avisos y destinos existentes. No imponer colores decorativos sobre codificación funcional del SVG.
7. Ejecutar `pnpm lint`, `pnpm typecheck`, `pnpm build` al integrar todas las tareas. Verificar manualmente rutas a 375, 768 y 1440 px y funciones principales. Informar comprobaciones bloqueadas por entorno sin afirmar que pasan.

## Acceptance Criteria

- [ ] Plano tiene navegación permanente con estado activo y conserva exploración completa.
- [ ] El HTML independiente conserva retorno al sitio y el embebido evita duplicación.
- [ ] St. Thomas conserva sesión, menú de cuenta, edición y restricciones de acceso.
- [ ] Estilos de interfaz son coherentes sin alterar colores semánticos de lotes.
- [ ] Verificaciones ejecutadas y resultados documentados antes de declarar finalización.
