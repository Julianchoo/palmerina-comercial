# Entorno: datos verificados para la home

Consultados el 30/09/2026 UTC (29/09 de Buenos Aires). Usar paráfrasis breves, sin prometer tiempos, demanda o distancias.

## Ubicación del proyecto

El enlace preexistente de `src/components/shared/LocationSection.tsx`, https://maps.app.goo.gl/eFMCSVcEKGdA7qoN9, redirige a una búsqueda de Google Maps para **-34.945948, -58.469175**. Es la ubicación suministrada por el repo. Conservar el enlace; no inventar altura de calle ni dibujar límites catastrales. Puede usarse un iframe `https://www.google.com/maps?q=-34.945948,-58.469175&z=12&output=embed`, con lazy y title. El mapa de unidades /plano conserva un propósito diferente.

## Accesos regionales

- RP58: la fuente provincial confirma conexiones con RP205, RN205 y Autopista Ezeiza-Cañuelas. https://gba.gob.ar/node/48573 (05/02/2025).
- Autopista Presidente Perón: el tramo habilitado en 2023 entre Ezeiza-Cañuelas y RP210 pasa por el empalme de RP58. https://www.gba.gob.ar/comunicacion_publica/gacetillas/kicillof_y_katopodis_encabezaron_la_habilitaci%C3%B3n_de_un_tramo_de_la
- El proyecto tiene frente RP58 según su plano/repo. No trasladar al lote cifras de vehículos de otro tramo ni afirmar que toda la autopista está finalizada.

## Puntos de interés del corredor

| Referencia | Categoría y dato utilizable | Fuente oficial |
| --- | --- | --- |
| Plaza Canning | Gastronomía, comercios y servicios. Av. Mariano Castex 1277, Canning/Ezeiza. | https://www.plazacanning.com.ar/ |
| Toscas Shopping | Centro comercial y cine. Formosa 653, Canning/Ezeiza. | https://toscasshopping.com.ar/ |
| Canning Health Institute | Centro de atención integrada. Mariano Castex 1078, Canning. | https://clinicamg.com.ar/canninghealthinstitute/ y https://clinicamg.com.ar/instituto-de-ojos/ |
| Universidad Provincial de Ezeiza | Educación superior. Alfonsina Storni 41, Barrio Justicialista N°1, Ezeiza. | https://web.upe.edu.ar/contacto/ |
| Terralagos | Barrio residencial en Canning/Ezeiza. No es un espacio público ni parte de La Palmerina. | https://www.terralagos.com.ar/ubicacion.php |

Los enlaces Maps de POIs pueden buscar por nombre + dirección verificada, sin coordenadas inventadas. Estas entidades se presentan como referencias regionales; no como socios ni servicios dentro del proyecto.

## Prioridad residencial añadida por el usuario

El usuario pidió después hacer foco en POIs residenciales, countries y accesos. Dar protagonismo a estos cinco barrios; mover los cuatro POIs comerciales/salud/educación a un bloque secundario. Mantener una presentación editorial y sobria, con enlaces que ayuden a explorar recorridos hacia el paseo.

| Barrio / country | Ubicación utilizable | Fuente primaria |
| --- | --- | --- |
| San Lucas | Ruta 58, km 16 · San Vicente | https://inversionesalcosto.com.ar/nuestros-barrios/san-lucas/ |
| Santa Rita | Ruta 58, km 15,5 · San Vicente | https://inversionesalcosto.com.ar/nuestros-barrios/santa-rita/ |
| Saint Thomas Centro | RP58, km 5 · Canning (oficinas comerciales dentro del barrio según contacto oficial) | https://www.saintthomasbp.com.ar/contacto.php y https://www.saintthomasbp.com.ar/nosotros.php |
| Terralagos | Canning / Ezeiza, sin altura de calle inventada | https://www.terralagos.com.ar/ubicacion.php |
| La Providencia Country Club | Ruta 52, km 9,5 · Canning / Ezeiza | https://www.laprovidenciacountryclub.com/como-llegar/ y https://laprovidenciacountryclub.com/ubicacion/ |

La Providencia también ofrece un enlace oficial de cómo llegar: https://maps.app.goo.gl/igX5NZHLw6FewBLo8. Para cada referencia, usar un nombre de Maps específico con ciudad/ubicación para evitar homónimos.

Un link Google Maps de recorridos puede usar origin = nombre/dirección del country, destination = -34.945948,-58.469175 y travelmode = driving, con el label “Ver recorrido al paseo”. El servicio resuelve la ruta al abrir el enlace; no calcular ni mostrar tiempos/distancias supuestos. No usar cifras de residentes, ocupación o demanda comercial. Copy sugerido como intención del proyecto: “Un paseo pensado para la vida de los barrios del corredor”.
