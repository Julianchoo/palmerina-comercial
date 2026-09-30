# Task 01: Siete imágenes nuevas

## Status

complete

## Wave

1

## Description

Generar exactamente siete imágenes fotorrealistas de La Palmerina, en el estilo de los renders generados aprobados. No entregar screenshots de la maqueta; es fuente de geometría. Conservar parcela100×180m, dos tiras continuas de dos plantas con oficinas y pasarela, estacionamiento central, anclas al fondo, pérgola transversal y pequeños pads/kioscos al frente.

## Dependencies

**Depends on:** None
**Blocks:** task-03-home
**Context:** Las imágenes generadas previamente aprobaron estructura y chapa negra, acentos de ladrillo del proyecto nuevo, vidrio transparente, interiores cálidos2700K y vegetación realista.

## Files to Create

- `public/images/proyecto-v2/01-aerea-dia.png`
- `public/images/proyecto-v2/02-acceso-ruta.png`
- `public/images/proyecto-v2/03-galeria-noche.png`
- `public/images/proyecto-v2/04-cafe-frente.png`
- `public/images/proyecto-v2/05-paseo-dia.png`
- `public/images/proyecto-v2/06-oficinas-pasarela.png`
- `public/images/proyecto-v2/07-restaurante.png`
- `public/images/proyecto-v2/hero-aerea-noche.png` — copia de la imagen nocturna ya aprobada, no generación adicional.
- `public/images/proyecto-v2/manifest.json` — nombres, escenas, alt y prompt usado.

## Technical Details

Leer skill imagegen, inspeccionar referencias antes de usarlas. Usar herramienta integrada image_gen con una llamada por imagen, solicitudes independientes pueden agruparse en paralelo. Referencias de estilo: public/images/galery-metal.png, Generica-metal-noche1.png y Zoomout4-metal.png. Referencias de geometría: plano-comercial/renders/tresc-dia.jpg, acceso-dia.jpg, galeria-dia.jpg, paseo-tarde.jpg, pasarela-tarde.jpg y aerea-tarde.jpg. Las geometrías antiguas en imágenes de estilo no se copian.

Referencia aprobada nueva nocturna y hero a copiar: /workspace/scratch/b79912c66fd2/generated_images/exec-d1fefa8a-e64d-42fa-a492-f89122095ec4.png. Galería aprobada: /workspace/scratch/b79912c66fd2/generated_images/exec-3d436c74-6774-4cda-8d1a-99c3f6e300f4.png. Usar estas para coherencia. Evitar collage, watermarks, edificios adicionales, pisos adicionales y canchas inventadas. Marcas son ilustrativas; preferir cartelería discreta. Fotos horizontales con encuadres distintos y utilidad para web.

Guardar cada salida seleccionada dentro del proyecto sin borrar originales. Revisar todas. Reportar cualquier fracaso explícitamente, no reemplazar con placeholders. No editar otros archivos, no commits.

## Acceptance Criteria

- [ ] Siete nuevas imágenes, escenas distintas, calidad fotorrealista coherente.
- [ ] Geometría nueva reconocible y dos plantas conservadas donde corresponda.
- [ ] Archivos disponibles y manifest con paths/alt/prompt.
