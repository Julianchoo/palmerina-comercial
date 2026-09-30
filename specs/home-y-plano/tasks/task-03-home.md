# Task 03: Home del proyecto actual

## Status

pending

## Wave

2

## Description

Rearmar home / alrededor del paseo actual con las imágenes fotorrealistas aprobadas y siete nuevas. La home previa vende tierra de1000m frente18ha y no representa este proyecto. Diseñar una página editorial cálida, visual y creíble que facilite explorar el plano y consultar, conservando páginas secundarias.

## Dependencies

**Depends on:** task-01-imagenes, task-02-plano
**Blocks:** None
**Context:** Hay siete PNG public/images/proyecto-v2/01..07 y hero-aerea-noche.png, manifest conalt. /plano funciona e incluye búsqueda/filtros/zoom/fichas. Datosprecios/estados del plano son ilustrativos. No tocar esos archivos.

## Files to Modify

- `src/app/page.tsx` — home y metadata propios.
- `src/app/layout.tsx` — corregir metadata general del paseo, conservar providers/fuentes existentes/WhatsAppFloat.

## Files to Create

- `src/app/home.module.css` — estilos aislados.
- `src/components/home/` — componentes cliente mínimos para navegación móvil y galería si hacen falta.

## Technical Details

Leer frontend-design/nextjs y referencias relevantes imagen/metadata/font. No tocar auth/shadcn sin skills respectivas. Usar next/image para hero/fotos, priority sólohero, sizes y ratios estables, lazy resto. Sin fonts nuevas de red; títulos serif Georgia sobrios y cuerpo fonts locales disponibles; evitar lookgenérico azulgradiente del sitio anterior. Paleta carbón#181a17, crema#f3efe5, cobre#b58c63. Hero nocturno fullbleed con overlaycontenido sobrio y título Paseo La Palmerina, CTA primarioExplorar plano /plano, secundarioConsultar WHATSAPP_URL existente. Navegación simple proyecto,espacios,plano,ubicación,contacto y acceso /alquiler.

Composición: hero grande; banda100×180m/18.000m²/37unidades proyectadas/dosplantas; introducción visual con aérea día; espacios comerciales/gastronomía/oficinas con fotos distintas; galería de siete imágenes con captions breves; seccióndedicada plano con CTA; ubicaciónCanning sobreRP58 ycontacto existente, footerlimpio. Evitar cifras de tráfico, rentabilidad,tiempoviaje o disponibilidades no verificadas. Enfatizar proyecto/anteproyecto, no apertura ya concreta ni inquilinos confirmados. Nota conceptual breve para imágenes/datos. No repetir de manera pesada las siete fotos; asignar cada una a sección/galería funcional y no usar cualquier placeholder.

Conservar /alquiler sin redesign. Links al plano visibles en header,hero y sección. Contacto usa WHATSAPP_URLimport existente. Header móvil accesible aria-expanded/cierre Escape y tap; evitar controlarbodyoverflow innecesariamente. Galería si modal usar primitive existente previa skillshadcn; alternativa enlaces/scrollsnap accesible sin modal. Evitar estado clienteinnecesario, animación respetaprefers-reduced-motion.

Verificar fotoscargadas, rutas y WhatsApp, desktop1440/móvil390 sin overflow y todoslosCTA. Ejecutar npmrun typecheck, npmrunbuild (network escalada si fetchfont existente requiere). Lintbaseline falla pluginreact fuera alcance: informar en vez tocar configuración. LeerPlaywrightantes browser. Entregar screenshots y previewrevisable (HTML exportado de home con enlaces/recursos accesibles o servidorlocal verificado), no publicar/push, no commits.

## Acceptance Criteria

- [ ] Home terminada y visualmente distinta, fotos reales generadas integradas.
- [ ] Cifras/copy coherentes proyecto actual y sin datosinventados comerciales.
- [ ] Navegación, /plano y WhatsApp funcionan.
- [ ] Desktop/móvil verificados y build/typecheck con resultados informados.
