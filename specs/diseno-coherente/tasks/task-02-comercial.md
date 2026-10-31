# Task 02: Unificar portada y alquiler

## Status

complete

## Wave

2

## Description

Aplicar la navegación y estética compartidas a la portada y alquiler sin reescribir el contenido. La portada editorial es la referencia propuesta: crema, tinta, cobre, títulos serif y fotografías existentes. Alquiler actualmente usa encabezado transparente independiente, títulos sans y gradientes azules.

## Dependencies

**Depends on:** task-01-sistema.md
**Blocks:** None

**Context from dependencies:** task-01 entrega `SiteHeader` en `src/components/shared/SiteHeader.tsx`, estilos propios y tokens CSS de marca; admite `sectionLinks` y usa enlaces principales Proyecto `/`, Alquiler `/alquiler`, Plano `/plano` con estado activo por ruta exacta.

## Files to Create

- `src/app/alquiler/alquiler.module.css` — Presentación acotada de alquiler.

## Files to Modify

- `src/app/page.tsx` — Sustituir HomeHeader por SiteHeader sin cambiar secciones.
- `src/app/home.module.css` — Ajustar header/hero, offsets y tokens; retirar reglas de navegación sin uso cuando sea seguro.
- `src/app/alquiler/page.tsx` — Usar SiteHeader y envolvente de estilos con main accesible.
- `src/components/home/HomeHeader.tsx` — Retirar o convertir en wrapper únicamente si sigue siendo necesario.
- `src/components/shared/Navbar.tsx` — Retirar o delegar en SiteHeader si no hay otros consumidores.

## Technical Details

1. Leer las skills de Next.js y frontend-design del repositorio. Inspeccionar consumidores antes de retirar componentes.
2. Conservar todos los textos, imágenes, estadísticas, metadata, CTA y destinos. No resolver diferencias comerciales entre portada y alquiler dentro de este ajuste.
3. Portada conserva anclajes #proyecto, #espacios, #ubicacion, #contacto. Alquiler conserva #proyecto, #modulos, #construccion, #ubicacion, #contacto como navegación contextual.
4. Alquiler mantiene HeroSection, ProyectoSection, ModulosGrid, ConstructivoSection, LocationSection, VentajasSection, CtaSection y Footer. Usar una clase de envolvente y reglas acotadas para tipografía, fondos, bordes y botones; ampliar archivos de componentes solo si las clases existentes no permiten una solución clara.
5. Mantener contraste del hero fotográfico. Encabezado sólido de task-01 ocupa espacio propio; evitar compensación doble y alturas móviles excesivas.
6. Hacer coherentes títulos serif, fondos crema y oscuros, botones cobre, anchos de contenido y ritmo vertical con la portada. Conservar la legibilidad y estructura del formulario/consulta.
7. Verificar anclajes con encabezado sticky, enlaces entre rutas y menú móvil. No añadir nuevas dependencias.

## Acceptance Criteria

- [ ] Las dos páginas comparten encabezado y navegación permanente.
- [ ] Se preserva el contenido y todos los destinos de CTA.
- [ ] Alquiler se integra visualmente con portada; no hay saltos arbitrarios de tipografía y botones.
- [ ] Hero y secciones no quedan ocultos ni desbordan en móvil.
