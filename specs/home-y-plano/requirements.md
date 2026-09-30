# Requirements: home y plano

## Summary

El usuario pidió siete fotos adicionales como las imágenes generadas que aprobó, rearmar la home y agregar un enlace al mapa interactivo, mejorándolo si es posible. Trabajar sobre Julianchoo/palmerina-comercial; conservar el stack Next.js y la geometría del plano. Las fotos son imágenes conceptuales fotorrealistas, no nuevas capturas del modelo esquemático que el usuario rechazó.

## Goals

- Siete imágenes distintas y coherentes: aérea diurna, acceso RP58, galería nocturna, café del frente, paseo diurno, oficinas/pasarela y restaurante.
- Home con identidad del paseo, imágenes grandes, lectura clara y CTA al plano y al contacto existente.
- Plano disponible en /plano, búsqueda, filtros simples, zoom y fichas cómodas en móvil.

## Non-Goals

- Rehacer la maqueta 3D o cambiar las huellas de edificios.
- Inventar precios, disponibilidad real, marcas confirmadas o promesas de rentabilidad.
- Cambiar páginas de administración, auth, APIs, backend o dependencias.
- Hacer push o desplegar en producción sin un pedido posterior.

## Acceptance Criteria

- [ ] Siete fotos nuevas completas y guardadas como assets del proyecto.
- [ ] Home presenta el proyecto de parcela100×180m,18.000m² y37unidades proyectadas en2plantas; no las cifras antiguas de1.000m frente y18ha.
- [ ] Todas las fotos nuevas aparecen en la home, con tamaños estables, carga diferida donde corresponde y textos alternativos.
- [ ] Enlaces visibles al plano desde navegación, hero y sección dedicada; ruta /plano funciona.
- [ ] Plano conserva datos U y coordenadas, con advertencia breve de datos ilustrativos.
- [ ] Búsqueda, plantas, filtros, zoom/ajustar, selección y fichas funcionan con teclado y móvil390px sin desbordamiento.
- [ ] Home funciona en escritorio/móvil; imágenes cargan, enlaces funcionan y no hay errores de consola.
- [ ] Typecheck y build ejecutados; lint y cualquier bloqueo previo informados honestamente.

## Technical Constraints

- Next.js App Router existente; usar next/image. Sin nueva librería de componentes ni fonts remotas adicionales.
- Estética editorial cálida: negro carbón, crema, cobre apagado, títulos serif sobrios; CSS aislado para no cambiar /alquiler.
- Respetar originales de imágenes y plano; generación mediante image_gen. Imágenes antiguas sólo referencias de estilo, renders del modelo sólo autoridad de geometría.
- Datos del plano son ilustrativos: no presentarlos como disponibilidad o cotización comercial.
- Reutilizar WHATSAPP_URL existente y conservar /alquiler.
