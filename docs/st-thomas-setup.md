# Configuración privada de St. Thomas

El código del sitio no contiene inventario, coordenadas de parcelas ni imágenes del plano. El PNG debe pesar como máximo 4 MiB para que pueda entregarse en la plataforma. Estos datos se cargan en Postgres y se entregan únicamente tras validar la sesión del administrador en el servidor. No guardar fuentes ni exportaciones en `public/`, en Git ni en un Blob público.

## Preparación

1. Configurar la conexión privada `POSTGRES_URL` (o `DATABASE_URL`), `BETTER_AUTH_SECRET` y `BETTER_AUTH_URL` indicadas en `env.example`. Guardar valores reales en el entorno, nunca en el repositorio.
2. Crear la cuenta de administrador (email y contraseña; no existe registro público): `ADMIN_PASSWORD='…' node --env-file=.env.local --import tsx scripts/create-admin.ts`. Con `--reset-password` cambia la contraseña de una cuenta existente. El administrador también puede cambiarla desde `/st-thomas`.
3. Ejecutar las migraciones aditivas con `pnpm db:migrate`, apuntando al entorno correcto. No usar `db:reset`.
4. Preparar los archivos privados con `scripts/import-st-thomas.py`. Necesita Python, PyMuPDF, openpyxl, NumPy y SciPy. El script toma `--plan`, `--spreadsheet` y `--output`, reconstruye los límites CAD y produce `inventory.json`, `plan.png` y `audit.json`.

## Estados iniciales e importación

Confirmar todos los lotes vendidos antes de la primera carga de producción. Preparar una carpeta nueva con `--sold-lots` y `--remaining-status available`; el importador exige el número de ventas esperado. Revisar `audit.json`, superficies, geometría, precios y estados antes de importar. Los lotes de precio pendiente se conservan con precio nulo.

Con el archivo de entorno local privado configurado:

```bash
node --env-file=.env.local --import tsx scripts/seed-st-thomas.ts /ruta/privada/del/seed
```

Para una vista previa privada sin estados confirmados se permite agregar `--allow-unconfirmed`; el validador impide ofrecer lotes disponibles en ese caso. Usar una base de vista previa separada. Este comando **no** habilita ni confirma estados comerciales.

El seed inserta en una transacción, serializa importaciones concurrentes y conserva los registros existentes. Nunca reemplaza precios, estados, notas o parámetros editados. Si ya se cargó una vista previa sin confirmar, no reutilizarla como producción: cargar la base correcta desde el seed confirmado o realizar una actualización explícita revisada de estados y metadatos. Reimportar por sí solo no cambia estados ni el indicador de confirmación.

No importar una versión diferente del plano sobre una existente: el comando rechaza imágenes o coordenadas de dimensiones distintas. Cualquier reemplazo necesita una migración revisada que preserve la correspondencia de las parcelas.

## API

- `GET /api/st-thomas/lots`: devuelve `lots`, `plan` y `sourceAudit` privado; nunca se cachea públicamente.
- `PATCH /api/st-thomas/lots/:id`: requiere sesión de administrador, origen permitido, JSON, versión leída y al menos un campo editable. Devuelve `{ lot }`. Un conflicto devuelve 409 para recargar antes de guardar.
- `GET /api/st-thomas/plan`: entrega el PNG privado desde Postgres con autorización en cada solicitud y `Cache-Control: private, no-store`.

Los errores de infraestructura no incluyen credenciales ni mensajes del driver. La ausencia de configuración, migraciones o fuentes genera una respuesta no disponible; las páginas públicas conservan su funcionamiento.

## Verificación y entrega

Ejecutar `pnpm lint`, `pnpm typecheck` y `pnpm build:ci`. Validar ingreso, rechazo de otros usuarios, denegación de API/plano anónimos, guardado, recarga y conflictos de edición. Para actualizar el sitio en vivo, seguir el flujo de `main` y verificar el deployment Production correspondiente al commit final.
