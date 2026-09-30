# Plano comercial y maqueta 3D — Paseo La Palmerina

Proyecto independiente del sitio (no forma parte del build de Next.js). Todo es HTML estático.

| Archivo | Qué es |
| --- | --- |
| `plano.html` | Plano interactivo: 37 unidades en planta baja + primer piso, ficha por unidad (m², USD venta/alquiler, rentabilidad), mensuras toggleables y control de FOS 0,6 / FOT 1,2. |
| `maqueta.html` | Maqueta 3D navegable (three.js) con la misma geometría del plano: ladrillo visto + metal negro, oficinas con pasarela, anclas, pads y kioscos. Luz de día, atardecer y noche. |
| `renders/` | Imágenes generadas desde `maqueta.html`. |
| `scripts/render.mjs` | Genera los renders con Chromium headless. |

Los datos (distribución, precios, estados, marcas) son **ilustrativos**.

## Ver

Abrí `plano.html` directo en el navegador. `maqueta.html` carga three.js desde jsDelivr con import maps, así que también abre directo (con conexión a internet). Si el navegador bloquea módulos en `file://`, serví la carpeta:

```bash
npm run serve   # http://localhost:8080/maqueta.html
```

## Regenerar renders

```bash
npm ci
npm run render                          # todas las vistas → renders/*.jpg (1920×1080, supersampling 2×)
npm run render -- galeria-dia,aerea-tarde   # solo algunas
```

Variables opcionales: `CHROMIUM_PATH` (binario de Chromium), `RENDER_W`, `RENDER_H`, `RENDER_SS` y `RENDER_OUT` (carpeta de destino; rutas relativas se resuelven desde `plano-comercial`). La lista explícita acepta cualquier combinación válida de vista y modo, incluida `paseo-noche`; una selección inválida falla antes de abrir Chromium.

Vistas: `aerea`, `tresc`, `galeria`, `pasarela`, `paseo`, `acceso` · Modos: `dia`, `tarde`, `noche`.
También podés abrir `maqueta.html?view=paseo&mode=noche` para arrancar en una vista.

## Coordenadas

Ambos archivos usan el mismo sistema en metros: `x` = profundidad desde la RP58 (0–180), `z`/`Y` = ancho de parcela (0–100). Si cambiás una unidad en `plano.html`, replicá la geometría en `STRIPS` / `ANCHORS` de `maqueta.html`.

## Estilo v2 y comparación

Abrí [`renders/estilo-v2/index.html`](renders/estilo-v2/index.html) para comparar antes/después. Incluye las seis imágenes embebidas para poder compartir el HTML como un solo archivo. El enlace a la maqueta funciona al abrirlo dentro de la carpeta del proyecto.

Los tres JPG finales se generaron directamente desde el motor, a 1920 × 1080 con supersampling 2×. Los pares originales se renderizaron desde `3158c5c` con las mismas cámaras, iluminación y parámetros de salida; se conservan en `renders/estilo-v2/original/`. Las siete imágenes anteriores de `renders/` permanecen intactas.

```bash
# Desde plano-comercial; Chromium debe estar instalado o indicado en CHROMIUM_PATH.
RENDER_OUT=renders/estilo-v2 RENDER_W=1920 RENDER_H=1080 RENDER_SS=2 npm run render -- aerea-tarde,galeria-dia,paseo-noche
```

La fachada tiene juntas en la chapa negra, vidrio con reflejos, interiores con mobiliario y luminarias, vegetación en varias capas y mesas con sillas. Diez luces cálidas locales iluminan superficies durante atardecer/noche, se apagan de día y no generan sombras adicionales. Se conservan la distribución, las alturas y las cámaras. Las personas, los autos y las copas siguen siendo representaciones simplificadas; el resultado es una maqueta con más detalle, sin equivalencia fotográfica con imágenes de IA.

### Verificación y límites de rendimiento

Se verificaron por interacción las 18 combinaciones de las seis cámaras con los tres modos, comprobando los estados activos y el renderizado de cuadros. Sin errores JavaScript ni mensajes de consola de nivel error. El canvas siguió los tamaños 960 × 540 y 390 × 844 al redimensionar; la exportación descargó `palmerina-noche.png`, PNG válido de 390 × 844 (219.944 bytes). La comparación HTML cargó sus seis imágenes embebidas a 1280 y 390 px de ancho, sin desbordamiento horizontal. Se revisaron visualmente los tres JPG finales y la comparación en escritorio/móvil.


La automatización usa Chromium headless y sirve three.js 0.169.0 desde `node_modules`, interceptando las rutas del CDN; la página normal conserva su import map original. La máquina de revisión usa SwiftShader (renderizado por software), por lo que estos tiempos no representan una GPU de escritorio ni un teléfono real. Las medianas observadas de cuadro fueron:

| Perfil y modo | Original | Estilo v2 | Diferencia aproximada |
| --- | ---: | ---: | ---: |
| Escritorio 960 × 540 · día | 773 ms | 900 ms | +16% |
| Escritorio 960 × 540 · noche | 781 ms | 982 ms | +26% |
| Móvil 390 × 844 · día | 622 ms | 727 ms | +17% |
| Móvil 390 × 844 · noche | 716 ms | 702 ms | Comparable |

Las muestras presentan variación considerable; se usan como indicio del costo añadido y no como estimación de fluidez en hardware real. Las geometrías y materiales se reutilizan con instancias cuando corresponde. No se publican contadores de draw calls/triángulos del composer, porque el último pase sólo mide el triángulo de salida.

Comprobaciones de la raíz: `npm run typecheck` pasó; `npm run lint` está bloqueado por el error previo de configuración de ESLint (`could not find plugin "react"` para la regla `react/jsx-no-target-blank`), sin modificar esa configuración. `plano-comercial` está excluido del lint raíz; la ejecución del HTML y la revisión visual son la comprobación relevante del modelo.
