# Task 03: Renders y comparación visual

## Status

pending

## Wave

3

## Description

Generar imágenes desde el modelo mejorado para comprobar que el estilo se trasladó al 3D. La geometría del commit 3158c5c es la referencia y las fotos antiguas sólo aportan el lenguaje visual. Entregar vistas directamente renderizadas con cámaras comparables al antes.

## Dependencies

**Depends on:** task-02-vegetacion-luces.md
**Blocks:** None

**Context from dependencies:** maqueta.html ya incorpora materiales, interiores, vegetación y luces mejorados, manteniendo planta, alturas y cámaras. Necesita validación visual final y artefactos reproducibles.

## Files to Create

- `plano-comercial/renders/estilo-v2/` — renders nuevos sin sobrescribir originales.

## Files to Modify

- `plano-comercial/scripts/render.mjs` — permitir destino de salida opcional si hace falta.
- `plano-comercial/README.md` — comandos y limitaciones observadas.

## Technical Details

1. Leer skill de Playwright del repo antes de automatizar navegador. Instalar dependencias del subproyecto con npm ci y disponer de Chromium. El script existente intercepta jsDelivr y sirve three.js de node_modules.
2. Guardar renders originales como comparación; no usar imágenes generadas por IA como resultado del motor.
3. Renderizar aerea-tarde, galeria-dia y paseo-noche a 1920×1080, inicialmente SS=1 para revisar y luego SS=2 si viable. Usar CHROMIUM_PATH, RENDER_W, RENDER_H, RENDER_SS existentes. Añadir destino opcional RENDER_OUT y solicitud explícita de vistas si el filtro actual sólo admite SHOTS predefinidas.
4. Comprobar visualmente fachadas, interiores, sombras, vegetación y paso libre. Verificar todos los modos/cámaras, PNG y resize con navegador sin errores de consola. Corregir problemas encontrados dentro del alcance.
5. Ejecutar lint y typecheck raíz conforme AGENTS.md; informar fallos previos o limitaciones por separado. La carpeta plano-comercial está excluida del ESLint raíz, por lo que la revisión visual y ejecución real del HTML son necesarias.
6. Documentar comandos de reproducción, diferencias antes/después y rendimiento observado. No hacer push ni despliegue.

## Acceptance Criteria

- [ ] Tres JPG nuevos directos del modelo en carpeta estilo-v2.
- [ ] Comparación visual contra originales a igual cámara.
- [ ] Sin errores de consola, modos/cámaras/descarga funcionales.
- [ ] Resultado y limitaciones descritos fielmente; lint/typecheck reportados.
