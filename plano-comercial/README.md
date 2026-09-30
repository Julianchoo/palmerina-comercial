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
npm install
npm run render                          # todas las vistas → renders/*.jpg (1920×1080, supersampling 2×)
npm run render -- galeria-dia,aerea-tarde   # solo algunas
```

Variables opcionales: `CHROMIUM_PATH` (binario de Chromium), `RENDER_W`, `RENDER_H`, `RENDER_SS`.

Vistas: `aerea`, `tresc`, `galeria`, `pasarela`, `paseo`, `acceso` · Modos: `dia`, `tarde`, `noche`.
También podés abrir `maqueta.html?view=paseo&mode=noche` para arrancar en una vista.

## Coordenadas

Ambos archivos usan el mismo sistema en metros: `x` = profundidad desde la RP58 (0–180), `z`/`Y` = ancho de parcela (0–100). Si cambiás una unidad en `plano.html`, replicá la geometría en `STRIPS` / `ANCHORS` de `maqueta.html`.
