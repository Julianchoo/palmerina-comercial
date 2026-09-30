# Task 01: Materiales e interiores

## Status

complete

## Wave

1

## Description

Mejorar la maqueta de Paseo La Palmerina conservando el proyecto nuevo. El estilo anterior combina chapa negra vertical, estructura expuesta, vidrio transparente, interiores cálidos y cartelería sobria. El usuario quiere probar ese estilo en el modelo real, no solamente en imágenes generadas.

## Dependencies

**Depends on:** None (Wave 1)
**Blocks:** task-02-vegetacion-luces.md

**Context from dependencies:** Trabajar sobre commit 3158c5c9d21b41e235231b7e3a3383e5124d9afb. Referencias visuales existentes: public/images/galery-metal.png, Generica-metal-noche1.png y Zoomout4-metal.png. Son referencias de estilo, no de distribución.

## Files to Modify

- `plano-comercial/maqueta.html` — materiales, detalles de fachadas e interiores.

## Technical Details

1. Revisar materiales M, brickMaps(), metalMaps(), interiorTex(), strip() y ANCHORS. El vidrio actual usa metalness .85 y opacity .5, con interiores representados por planos INT_SHOP/INT_OFF.
2. Ajustar chapa para negro mate con variación sutil y juntas legibles a escala métrica. Revisar bumpScale para evitar apariencia artificial.
3. Ajustar vidrio para equilibrar transparencia y reflejo: probar MeshPhysicalMaterial con metalness bajo o transparente StandardMaterial si resulta más estable en este render. No activar transmisión costosa para cada paño sin medir.
4. Agregar mobiliario básico tridimensional reutilizado detrás de fachadas: mesas, estantes, mostradores y escritorios según rubro. Conservar las texturas como fondo si ayudan, evitando colisiones con caras opacas y z-fighting.
5. Mejorar fascia negra de pasarelas, perfilería y luminarias; conservar baranda vidriada, altura y acceso. Mantener ladrillo como acento existente.
6. Conservar constantes H_PB=6, H_1P=9.6, H_PAR=10.4, GLZ=4.4, STRIPS, CORES=[20,127.5], ANCHORS y sistema de coordenadas x=profundidad,z=ancho,y=altura.

## Acceptance Criteria

- [ ] Materiales y fachada mejoran con relación a fotos de estilo.
- [ ] Mobiliario interior muestra profundidad desde galeria y pasarela.
- [ ] Huellas y alturas iguales al modelo base.
- [ ] Cámaras, modos y exportación siguen funcionando.

## Notes

La página está separada de Next.js; no tocar la web comercial. Preparar un cambio local revisable y no publicar.

## Completion notes

Interiores con cavidades dentro de huellas y mobiliario instanciado, vidrio más transparente, chapa mate y texturas de relieve moderado. Review PASS ciclo2, render galería/pasarela sin pageerror. Sintaxis y typecheck pasan. Lint bloqueado por plugin react en configuración previa.
