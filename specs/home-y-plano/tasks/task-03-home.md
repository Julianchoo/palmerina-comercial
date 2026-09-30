# Task 03: Home del proyecto actual

## Status

complete

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
- `specs/home-y-plano/preview/` — preview HTML autónomo y capturas del resultado final, respaldados en el repo.
- Script de exportación del preview si hace falta; sin agregar dependencias.

## Technical Details

Leer frontend-design/nextjs y referencias relevantes imagen/metadata/font. No tocar auth/shadcn sin skills respectivas. Usar next/image para hero/fotos, priority sólohero, sizes y ratios estables, lazy resto. Sin fonts nuevas de red; títulos serif Georgia sobrios y cuerpo fonts locales disponibles; evitar lookgenérico azulgradiente del sitio anterior. Paleta carbón#181a17, crema#f3efe5, cobre#b58c63. Hero nocturno fullbleed con overlaycontenido sobrio y título Paseo La Palmerina, CTA primarioExplorar plano /plano, secundarioConsultar WHATSAPP_URL existente. Navegación simple proyecto,espacios,plano,ubicación,contacto y acceso /alquiler.

Composición: hero grande; banda100×180m/18.000m²/37unidades proyectadas/dosplantas; introducción visual con aérea día; espacios comerciales/gastronomía/oficinas con fotos distintas; galería de siete imágenes con captions breves; seccióndedicada plano con CTA; ubicaciónCanning sobreRP58 ycontacto existente, footerlimpio. Evitar cifras de tráfico, rentabilidad,tiempoviaje o disponibilidades no verificadas. Enfatizar proyecto/anteproyecto, no apertura ya concreta ni inquilinos confirmados. Nota conceptual breve para imágenes/datos. No repetir de manera pesada las siete fotos; asignar cada una a sección/galería funcional y no usar cualquier placeholder.

Conservar /alquiler sin redesign. Links al plano visibles en header,hero y sección. Contacto usa WHATSAPP_URLimport existente. Header móvil accesible aria-expanded/cierre Escape y tap; evitar controlarbodyoverflow innecesariamente. Galería si modal usar primitive existente previa skillshadcn; alternativa enlaces/scrollsnap accesible sin modal. Evitar estado clienteinnecesario, animación respetaprefers-reduced-motion.

Verificar fotoscargadas, rutas y WhatsApp, desktop1440/móvil390 sin overflow y todoslosCTA. Ejecutar npmrun typecheck, npmrunbuild (network escalada si fetchfont existente requiere). Lintbaseline falla pluginreact fuera alcance: informar en vez tocar configuración. LeerPlaywrightantes browser. Entregar screenshots y previewrevisable (HTML exportado de home con enlaces/recursos accesibles o servidorlocal verificado), no publicar/push, no commits.

## Acceptance Criteria

- [x] Home terminada y visualmente distinta, fotos reales generadas integradas.
- [x] Cifras/copy coherentes proyecto actual y sin datosinventados comerciales.
- [x] Navegación, /plano y WhatsApp funcionan.
- [x] Desktop/móvil verificados y build/typecheck con resultados informados.

## Ampliación del usuario: entorno, accesos y puntos de interés

El usuario añadió esta sección antes de cerrar la revisión. Ampliar la sección actual de ubicación, manteniendo las siete fotos y el plano interior. Leer `../entorno-fuentes.md`. Incorporar un mapa geográfico real de Google Maps con la ubicación ya utilizada por el repo (no usar una ilustración generada como cartografía exacta), acceso externo claro y listas editoriales de accesos y referencias regionales. Cambiar el label del header a Entorno si encaja, conservando #ubicacion.

Accesos: frente RP58; empalme regional RP58/Autopista Presidente Perón; conexiones regionales RP205/RN205/Autopista Ezeiza-Cañuelas. No afirmar acceso de autopista directo al lote. Puntos de interés de categorías distintas: Plaza Canning, Toscas Shopping, Canning Health Institute, Universidad Provincial de Ezeiza y Terralagos. Descripciones sobrias y ciudad/dirección verificada; enlaces a Maps y/o sitios oficiales. Evitar tiempos de viaje, distancias, tráfico, demanda garantizada o proximidad inmediata no medida. Es un directorio del corredor Canning/Ezeiza, no una promesa de cercanía peatonal.

La sección debe conservar el diseño editorial y funcionar en móvil. iframe geográfico lazy, title accesible, ratio estable, botón externo disponible; no nuevas dependencias ni más generaciones de imágenes. Si Google Maps no puede cargar en el preview sin red, mantener el bloque legible y su enlace externo; la home, fotos y plano de unidades siguen embebidos. Registrar esta limitación en README del preview sin agregar avisos técnicos innecesarios al producto.

Rebuild y repetir checks de la sección nueva, navegación/links, imágenes y mapa de unidades. Regenerar HTML/capturas/verification.json desde la versión final, y mantener las fuentes en documento local para revisión. No commits ni push.

Nueva precisión del usuario: foco residencial en countries, barrios y accesos. Priorizar San Lucas, Santa Rita, Saint Thomas Centro, Terralagos y La Providencia con fuentes en entorno-fuentes.md. Los cuatro POIs no residenciales quedan como complemento. Incluir links de recorrido desde cada country hacia el paseo resueltos por Maps, sin tiempos o distancias inventados. No cifras de familias, residentes ni demanda comercial.
