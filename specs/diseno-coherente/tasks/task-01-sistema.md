# Task 01: Sistema visual y navegación compartida

## Status

complete

## Wave

1

## Description

La Palmerina tiene encabezados diferentes en cada página. Crear una navegación reutilizable que conserve la identidad editorial de la portada y dé continuidad entre Proyecto, Alquiler y Plano. Esta dirección requiere aprobación del spec antes de implementación.

## Dependencies

**Depends on:** None (Wave 1)
**Blocks:** task-02-comercial.md, task-03-herramientas.md

**Context from dependencies:** No hay dependencias. Las páginas usan Next.js App Router, React 19 y CSS Modules/Tailwind 4. La portada define crema #f3efe5, tinta #181a17 y cobre #b58c63 en `src/app/home.module.css`.

## Files to Create

- `src/components/shared/SiteHeader.tsx` — Encabezado cliente y navegación.
- `src/components/shared/site-header.module.css` — Estilos responsivos aislados.

## Files to Modify

- `src/app/globals.css` — Tokens de marca compartidos y utilidades de presentación acotadas.

## Technical Details

1. Leer `AGENTS.md`, `.agents/skills/nextjs/SKILL.md`, frontend-design y web-design-guidelines antes de modificar código.
2. Mantener las fuentes ya cargadas en layout. Títulos Georgia y cuerpo `var(--font-roboto)`; sin descargar nuevas fuentes.
3. Exponer `SiteHeader` con enlaces principales estables, `sectionLinks?: {href:string;label:string}[]` y `accountSlot?: React.ReactNode`. Usar `usePathname` con coincidencia exacta y `aria-current="page"`. St. Thomas muestra su contexto activo sin cambiar permisos ni añadir enlaces administrativos a la navegación pública.
4. Marca común basada en HomeHeader. Preferir encabezado sólido crema y posición sticky, con altura estable, para funcionar también sobre herramientas y fondos claros. Ajustar offsets mediante variable compartida y scroll-margin.
5. Un solo menú móvil: botón con aria-expanded/aria-controls, Escape y devolución del foco; cierre al seleccionar un enlace. No duplicar enlaces enfocables ocultos.
6. Diferenciar navegación principal de enlaces a secciones. Mantener objetivos táctiles de 44 px y foco visible. Reducir movimiento con prefers-reduced-motion.
7. No cambiar tokens semánticos de disponibilidad/estados ni reglas generales de formularios administrativos.

## Acceptance Criteria

- [ ] Componente admite páginas comerciales y AccountMenu sin importarlo ni modificar autenticación.
- [ ] Mismos enlaces, orden, marca, foco y menú móvil en todos los usos.
- [ ] Estado activo exacto y sin desbordamiento a 375 px.
- [ ] Tokens compartidos conservan identidad crema/tinta/cobre.
