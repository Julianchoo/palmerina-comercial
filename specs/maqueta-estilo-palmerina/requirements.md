# Requirements: estilo La Palmerina

## Summary

El usuario pidió llevar el estilo de las fotos anteriores al proyecto nuevo y autorizó probarlo. La maqueta actual ya representa la volumetría pero tiene interiores planos, árboles facetados, personas esquemáticas y luces simuladas sobre el suelo. Mejorar esos elementos con recursos adecuados para una página estática three.js.

## Goals

- Metal negro mate con juntas verticales, estructura metálica legible y detalles cálidos.
- Vidrieras con reflejos moderados e interiores con profundidad; oficinas claramente visibles en primer piso.
- Árboles y canteros más naturales, mesas y sillas creíbles, luces de aproximadamente 2700 K.
- Antes/después con las mismas cámaras para juzgar la mejora.

## Non-Goals

- Rediseñar la parcela, huellas, alturas, locales, pasarelas, accesos o estacionamiento.
- Cambiar plano.html, precios, marcas o estados comerciales.
- Integrar con Next.js, desplegar, hacer push o reemplazar fotos de la web.
- Prometer equivalencia fotográfica con los renders generados por IA.

## Acceptance Criteria

- [ ] Parcela de 100 × 180 m; STRIPS, ANCHORS, CORES y alturas mantienen sus valores.
- [ ] Las seis cámaras y tres modos funcionan; exportar PNG y redimensionar siguen funcionando.
- [ ] Interiores tienen al menos mobiliario y luminarias tridimensionales visibles, sin tapar la circulación.
- [ ] Hay vegetación estratificada y árboles menos geométricos en los lugares existentes.
- [ ] Luces nocturnas iluminan superficies reales, con emisión y bloom controlados.
- [ ] Tres JPG nuevos salen directamente de la maqueta y se entregan junto con una comparación visual.
- [ ] No hay errores de consola; se informa rendimiento observado y cualquier limitación.

## Assumptions

- La geometría del commit 3158c5c es la autoridad. Las fotos antiguas aportan materiales y atmósfera.
- Conservar los acentos de ladrillo del nuevo modelo; mejorar el predominio visual del metal sin cambiar su construcción.

## Technical Constraints

- HTML estático y three.js 0.169.0; conservar import map y render headless con dependencia local.
- Usar instancias y materiales reutilizados; evitar cientos de luces dinámicas y nuevas dependencias pesadas.
- No introducir cuentas, claves API o servicios de pago.
- Mantener un seed reproducible. Si se añade vegetación, no alterar por accidente la distribución de los autos existentes mediante el generador compartido.
