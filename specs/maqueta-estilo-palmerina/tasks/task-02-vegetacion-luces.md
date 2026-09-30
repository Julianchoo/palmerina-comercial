# Task 02: Vegetación, mobiliario y luz

## Status

complete

## Wave

2

## Description

Aplicar al modelo de La Palmerina el paisaje y la luz cálida de las fotos anteriores. Conservar la geometría de 100 × 180 m, dos tiras de locales con oficinas arriba, anclas al fondo y estacionamiento central. Buscar una mejora clara a escala humana sin sacrificar innecesariamente la navegación.

## Dependencies

**Depends on:** task-01-materiales-interiores.md
**Blocks:** task-03-renders-comparacion.md

**Context from dependencies:** El HTML ya tiene materiales mejorados e interiores tridimensionales. Las referencias son public/images/galery-metal.png y Generica-metal-noche1.png. El ladrillo sigue como acento y las huellas no cambian.

## Files to Modify

- `plano-comercial/maqueta.html` — vegetación, mobiliario, luces y modos.

## Technical Details

1. La copa actual usa IcosahedronGeometry y flatShading:true. Mejorar silueta con grupos instanciados de follaje y ramas, variación determinista y normales suaves; priorizar árboles cercanos a cámaras humanas.
2. Incorporar arbustos y gramíneas en canteros existentes y macetas discretas junto a vidrieras. Mantener anchos libres en pasarelas, paseo, cocheras, accesos y giros. No ocupar plazas de estacionamiento.
3. Mejorar mesas y sillas del paseo usando geometrías reutilizadas. Evaluar mejora sencilla de personas existentes; no introducir multitud ni modelos pesados.
4. Las funciones pool() y glow() actuales simulan manchas y emisión, sin PointLight/SpotLight. Añadir un conjunto limitado de luces reales bajo galerías/pergola, con color cálido, alcance razonable y sombras sólo donde sean necesarias.
5. Conectar intensidades a setMode() y MODES dia/tarde/noche. Mantener pool() como complemento con baja intensidad, evitar duplicación de brillo y sobreexposición. Revisar bloom.
6. No alterar posiciones de autos mediante consumo adicional del rnd() compartido. Usar seed separado para nuevos elementos o precalcular posiciones existentes.
7. Comparar navegación de día/noche en viewport escritorio y móvil. Informar métricas observadas con hardware y resolución; ajustar detalle si hay regresión considerable.

## Acceptance Criteria

- [ ] Árboles menos facetados y canteros con varias alturas.
- [ ] Luces cálidas producen iluminación visible en superficies, no sólo discos emisivos.
- [ ] Las circulaciones y cocheras permanecen libres.
- [ ] Los tres modos tienen exposición equilibrada.
- [ ] Modelo navegable sin errores y rendimiento medido antes/después.

## Completion notes

Copas suaves, vegetación estratificada con seed separado, mesas/sillas instanciadas y diez luces cálidas reales sin sombras, apagadas de día. Review PASS: circulación, huellas y consumo de RNG preservados. Sintaxis/typecheck pasan, lint bloqueo previo. Benchmark SwiftShader ruidoso: día escritorio/móvil +16–17%, noche escritorio +26%, móvil noche comparable. No equivale a hardware real.
