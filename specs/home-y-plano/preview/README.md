# Vista autónoma de la home

Abrir `index.html` directamente en un navegador. Incluye las ocho imágenes (hero aprobado y siete nuevas), CSS y fuentes embebidos. No necesita servidor para revisar la home, usar su menú móvil o explorar el plano de unidades.

Los accesos al plano abren una vista de revisión con el HTML canónico embebido. Buscar, cambiar plantas, filtrar y abrir fichas siguen funcionando. “Volver a La Palmerina” y la barra superior regresan a la home. Las adaptaciones del enlace de retorno y de la maqueta 3D existen solamente en este preview.

`/alquiler` se conserva en el sitio Next.js y fue verificado allí. El HTML autónomo avisa que esa página no está incluida. La maqueta 3D tampoco se incluye en esta vista.

El mapa geográfico de Google Maps necesita conexión a internet. El proveedor respondió HTTP 200 en la verificación con certificados válidos; el Chromium de esta sesión bloqueó el iframe por `net::ERR_CERT_AUTHORITY_INVALID`. El exportador conserva entonces la ubicación textual y el botón externo de Maps en la vista autónoma. El iframe geográfico real permanece intacto en la home de producción. No se usa una imagen generada como cartografía.

La sección de entorno prioriza San Lucas, Santa Rita, Saint Thomas Centro, Terralagos y La Providencia Country Club. Sus enlaces “Ver recorrido al paseo” usan orígenes específicos y el punto del proyecto como destino; Maps resuelve la ruta sin tiempos o distancias inventados. Los accesos y cuatro referencias de comercio, salud y educación completan la sección. Las fuentes están en `../entorno-fuentes.md`.

## Regenerar

Con el sitio Next.js funcionando y Playwright ya instalado en `plano-comercial/node_modules`:

```bash
PREVIEW_URL=http://127.0.0.1:3012 \
PREVIEW_BROWSER=/tmp/palmerina-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell \
node specs/home-y-plano/preview/export-preview.mjs
```

El exportador lee el DOM real, incorpora recursos locales y elimina scripts de Next.js y herramientas de desarrollo. Las fotografías embebidas son respuestas optimizadas de `next/image`; los PNG originales permanecen intactos. Genera capturas de escritorio a 1440 px, móvil a 390 px y del plano móvil; además verifica menú con Escape, imágenes, búsqueda/ficha del plano y retorno a la home.

## Capturas

- `home-hero-desktop.png` y `home-hero-mobile.png`: primera pantalla.
- `home-desktop.png` y `home-mobile.png`: página completa.
- `home-entorno-desktop.png` y `home-entorno-mobile.png`: countries, accesos y otras referencias.
- `plano-mobile.png`: ficha de oficina en el plano embebido.
