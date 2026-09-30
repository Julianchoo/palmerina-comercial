import Image from "next/image";
import Link from "next/link";
import { HomeHeader } from "@/components/home/HomeHeader";
import { WHATSAPP_URL } from "@/lib/constants";
import styles from "./home.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Paseo La Palmerina | Canning · Ruta 58" },
  description:
    "Un proyecto de paseo comercial en Canning, sobre RP58. Una parcela de 100 × 180 m, 18.000 m² y 37 unidades proyectadas en dos plantas. Explorá el plano y conocé sus espacios.",
  keywords: [
    "Paseo La Palmerina",
    "paseo comercial Canning",
    "locales Ruta 58",
    "oficinas Canning",
  ],
  openGraph: {
    title: "Paseo La Palmerina | Canning · Ruta 58",
    description:
      "Comercio, gastronomía y oficinas en un paseo proyectado sobre Ruta Provincial 58. Conocé el proyecto y explorá su plano.",
    images: [
      {
        url: "/images/proyecto-v2/hero-aerea-noche.png",
        width: 1672,
        height: 941,
        alt: "Vista conceptual nocturna del Paseo La Palmerina",
      },
    ],
  },
};

// Project pin already used by the existing LocationSection; see entorno-fuentes.md.
const PROJECT_MAP_URL = "https://maps.app.goo.gl/eFMCSVcEKGdA7qoN9";
const regionalReferences = [
  {
    name: "Plaza Canning",
    category: "Gastronomía, comercios y servicios",
    address: "Av. Mariano Castex 1277 · Canning / Ezeiza",
    url: "https://www.plazacanning.com.ar/",
    query: "Plaza Canning Mariano Castex 1277 Canning Ezeiza",
  },
  {
    name: "Toscas Shopping",
    category: "Centro comercial y cine",
    address: "Formosa 653 · Canning / Ezeiza",
    url: "https://toscasshopping.com.ar/",
    query: "Toscas Shopping Formosa 653 Canning Ezeiza",
  },
  {
    name: "Canning Health Institute",
    category: "Centro de atención integrada",
    address: "Mariano Castex 1078 · Canning",
    url: "https://clinicamg.com.ar/canninghealthinstitute/",
    query: "Canning Health Institute Mariano Castex 1078 Canning",
  },
  {
    name: "Universidad Provincial de Ezeiza",
    category: "Educación superior",
    address: "Alfonsina Storni 41 · Barrio Justicialista N°1, Ezeiza",
    url: "https://web.upe.edu.ar/contacto/",
    query: "Universidad Provincial de Ezeiza Alfonsina Storni 41 Ezeiza",
  },
];

const residentialReferences = [
  {
    name: "San Lucas",
    address: "Ruta 58, km 16 · San Vicente",
    url: "https://inversionesalcosto.com.ar/nuestros-barrios/san-lucas/",
    origin: "Barrio San Lucas Ruta 58 km 16 San Vicente Buenos Aires",
  },
  {
    name: "Santa Rita",
    address: "Ruta 58, km 15,5 · San Vicente",
    url: "https://inversionesalcosto.com.ar/nuestros-barrios/santa-rita/",
    origin: "Barrio Santa Rita Ruta 58 km 15.5 San Vicente Buenos Aires",
  },
  {
    name: "Saint Thomas Centro",
    address: "Ruta 58, km 5 · Canning",
    url: "https://www.saintthomasbp.com.ar/contacto.php",
    origin: "Saint Thomas Centro Ruta Provincial 58 km 5 Canning Buenos Aires",
  },
  {
    name: "Terralagos",
    address: "Canning / Ezeiza",
    url: "https://www.terralagos.com.ar/ubicacion.php",
    origin: "Terralagos Canning Ezeiza Buenos Aires",
  },
  {
    name: "La Providencia Country Club",
    address: "Ruta 52, km 9,5 · Canning / Ezeiza",
    url: "https://www.laprovidenciacountryclub.com/como-llegar/",
    origin: "La Providencia Country Club Ruta 52 km 9.5 Canning Ezeiza Buenos Aires",
  },
];

const photos = {
  aerial: {
    src: "/images/proyecto-v2/01-aerea-dia.png",
    alt: "Vista aérea diurna del paseo comercial, con dos tiras de dos plantas, estacionamiento central y acceso sobre RP58.",
  },
  access: {
    src: "/images/proyecto-v2/02-acceso-ruta.png",
    alt: "Acceso al paseo desde Ruta Provincial 58, con pabellones de una planta al frente y galerías de dos plantas detrás.",
  },
  night: {
    src: "/images/proyecto-v2/03-galeria-noche.png",
    alt: "Galería comercial nocturna con fachadas transparentes, iluminación cálida y oficinas en planta alta.",
  },
  cafe: {
    src: "/images/proyecto-v2/04-cafe-frente.png",
    alt: "Café independiente de una planta al frente, con vidrio transparente, mesas exteriores y el paseo detrás.",
  },
  paseo: {
    src: "/images/proyecto-v2/05-paseo-dia.png",
    alt: "Paseo comercial diurno bajo una pérgola de madera y acero, con mesas, vidrieras y vegetación.",
  },
  offices: {
    src: "/images/proyecto-v2/06-oficinas-pasarela.png",
    alt: "Pasarela exterior de oficinas en planta alta, con baranda de vidrio y vista al estacionamiento central.",
  },
  restaurant: {
    src: "/images/proyecto-v2/07-restaurante.png",
    alt: "Interior de restaurante en planta baja, con iluminación cálida y vistas a la galería exterior y al estacionamiento.",
  },
};

function ProjectPhoto({
  photo,
  caption,
  className,
  sizes = "(max-width: 760px) 100vw, 60vw",
}: {
  photo: { src: string; alt: string };
  caption: string;
  className?: string | undefined;
  sizes?: string;
}) {
  return (
    <figure className={`${styles.photo} ${className ?? ""}`}>
      <div className={styles.photoFrame}>
        <Image src={photo.src} alt={photo.alt} width={1672} height={941} sizes={sizes} />
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function HomePage() {
  return (
    <div className={styles.home}>
      <a href="#contenido" className={styles.skipLink}>
        Ir al contenido
      </a>
      <HomeHeader />
      <main id="contenido">
        <section className={styles.hero} aria-labelledby="hero-title">
          <Image
            src="/images/proyecto-v2/hero-aerea-noche.png"
            alt="Vista aérea nocturna del Paseo La Palmerina con estacionamiento central y fachadas cálidas."
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroShade} />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Canning · Ruta Provincial 58</p>
            <h1 id="hero-title">
              Paseo
              <br />
              <em>La Palmerina.</em>
            </h1>
            <p className={styles.heroDescription}>
              Un lugar para encontrarse.
              <br />
              Un nuevo espacio para proyectar tu negocio.
            </p>
            <div className={styles.heroActions}>
              <Link href="/plano" className={styles.button}>
                Explorar el plano <Arrow />
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroContact}
              >
                Consultar el proyecto <Arrow />
              </a>
            </div>
          </div>
          <div className={styles.heroFoot}>
            <span>Comercio / Gastronomía / Oficinas</span>
            <a href="#proyecto">
              Conocé el paseo <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>

        <dl className={styles.stats} aria-label="El proyecto en cifras">
          <div>
            <dt>Parcela</dt>
            <dd>
              100 × 180 <small>m</small>
            </dd>
          </div>
          <div>
            <dt>Superficie del terreno</dt>
            <dd>
              18.000 <small>m²</small>
            </dd>
          </div>
          <div>
            <dt>Unidades proyectadas</dt>
            <dd>37</dd>
          </div>
          <div>
            <dt>Organización</dt>
            <dd>
              Dos <small>plantas</small>
            </dd>
          </div>
        </dl>

        <section
          id="proyecto"
          className={`${styles.section} ${styles.intro}`}
          aria-labelledby="project-title"
        >
          <div className={styles.introCopy}>
            <p className={styles.eyebrow}>01 / El proyecto</p>
            <h2 id="project-title">
              La vida cotidiana,
              <br />
              <em>en un mismo paseo.</em>
            </h2>
            <p>
              La Palmerina propone un lugar abierto donde comprar, trabajar y compartir una mesa se
              conectan con el entorno.
            </p>
            <p>
              Dos galerías de dos plantas acompañan un estacionamiento central. Locales en planta
              baja, oficinas arriba y espacios gastronómicos al frente dan forma al anteproyecto.
            </p>
            <Link href="/plano" className={styles.textLink}>
              Descubrir su distribución <Arrow />
            </Link>
          </div>
          <ProjectPhoto
            photo={photos.aerial}
            caption="Una mirada al conjunto · Vista conceptual diurna"
            className={styles.aerial}
          />
        </section>

        <section
          id="espacios"
          className={`${styles.section} ${styles.spaces}`}
          aria-labelledby="spaces-title"
        >
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>02 / Espacios para cada día</p>
            <h2 id="spaces-title">
              Distintas maneras
              <br />
              de <em>habitar el paseo.</em>
            </h2>
          </div>
          <div className={styles.retail}>
            <ProjectPhoto
              photo={photos.paseo}
              caption="01 — Comercio · Galerías abiertas y vidrieras al paseo"
              sizes="(max-width: 760px) 100vw, 72vw"
            />
            <div className={styles.retailCopy}>
              <span className={styles.index}>01</span>
              <h3>
                Comercio
                <br />a cielo abierto.
              </h3>
              <p>
                Un recorrido entre vidrieras, pérgolas y vegetación. Espacios proyectados para
                integrar comercios y servicios a la vida del barrio.
              </p>
            </div>
          </div>
          <div className={styles.spacePair}>
            <article>
              <ProjectPhoto
                photo={photos.cafe}
                caption="02 — Gastronomía · Un café a la entrada"
                sizes="(max-width: 760px) 100vw, 46vw"
              />
              <div className={styles.articleCopy}>
                <span className={styles.index}>02</span>
                <div>
                  <h3>Tiempo para una pausa.</h3>
                  <p>
                    Un café en el frente y locales pensados para propuestas gastronómicas.
                    Encuentros que empiezan con una mesa compartida.
                  </p>
                </div>
              </div>
            </article>
            <article className={styles.officeArticle}>
              <ProjectPhoto
                photo={photos.offices}
                caption="03 — Oficinas · Pasarela exterior en planta alta"
                sizes="(max-width: 760px) 100vw, 46vw"
              />
              <div className={styles.articleCopy}>
                <span className={styles.index}>03</span>
                <div>
                  <h3>Otra forma de trabajar.</h3>
                  <p>
                    Oficinas proyectadas en la planta alta, conectadas por una pasarela exterior. El
                    trabajo, cerca del movimiento del paseo.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="plano" className={styles.planSection} aria-labelledby="plan-title">
          <div className={styles.planLead}>
            <p className={styles.eyebrow}>03 / Explorá el anteproyecto</p>
            <h2 id="plan-title">
              Encontrá tu lugar
              <br />
              <em>en el plano.</em>
            </h2>
            <p>
              Recorré las plantas, buscá una unidad y conocé sus superficies. Una mirada más cercana
              a la distribución del paseo.
            </p>
            <Link href="/plano" className={styles.button}>
              Abrir plano interactivo <Arrow />
            </Link>
            <p className={styles.planNote}>
              Plano conceptual. Las cifras, precios y estados de las fichas son ilustrativos.
            </p>
          </div>
          <div className={styles.planFacts}>
            <span className={styles.planNumber}>37</span>
            <p>unidades proyectadas</p>
            <div>
              <span>Planta baja</span>
              <strong>Locales & gastronomía</strong>
            </div>
            <div>
              <span>Planta alta</span>
              <strong>Oficinas & pasarela</strong>
            </div>
            <Link href="/alquiler" className={styles.textLink}>
              Ver propuesta de alquileres <Arrow />
            </Link>
          </div>
        </section>

        <section className={`${styles.section} ${styles.gallery}`} aria-labelledby="gallery-title">
          <div className={styles.galleryHeading}>
            <div>
              <p className={styles.eyebrow}>04 / Imaginá el paseo</p>
              <h2 id="gallery-title">
                Del primer café
                <br />
                <em>al último encuentro.</em>
              </h2>
            </div>
            <p>
              Materiales cálidos, fachadas transparentes y espacios para quedarse. Tres escenas del
              proyecto, desde el acceso hasta la noche.
            </p>
          </div>
          <div className={styles.galleryGrid}>
            <ProjectPhoto
              photo={photos.night}
              caption="La galería al caer la noche"
              className={styles.galleryMain}
              sizes="(max-width: 760px) 100vw, 58vw"
            />
            <ProjectPhoto
              photo={photos.restaurant}
              caption="Gastronomía con calidez"
              sizes="(max-width: 760px) 100vw, 34vw"
            />
            <ProjectPhoto
              photo={photos.access}
              caption="La llegada desde Ruta Provincial 58"
              sizes="(max-width: 760px) 100vw, 34vw"
            />
          </div>
          <p className={styles.conceptNote}>
            Las imágenes son visualizaciones conceptuales del anteproyecto. No representan una obra
            terminada ni marcas o inquilinos confirmados.
          </p>
        </section>

        <section
          id="ubicacion"
          className={`${styles.section} ${styles.location}`}
          aria-labelledby="location-title"
        >
          <div className={styles.locationHeading}>
            <div>
              <p className={styles.eyebrow}>05 / Entorno y accesos</p>
              <h2 id="location-title">
                Canning.
                <br />
                <em>Un entorno para recorrer.</em>
              </h2>
            </div>
            <div className={styles.locationDetails}>
              <p>
                Sobre Ruta Provincial 58, La Palmerina se proyecta en el corredor Canning / Ezeiza.
                Su frente de 100 metros articula el acceso y la llegada al paseo.
              </p>
              <p>
                Un paseo pensado para la vida de los barrios del corredor. Conocé los countries,
                barrios residenciales y accesos que forman parte de este entorno.
              </p>
            </div>
          </div>
          <figure className={styles.geographicMap}>
            <div className={styles.geographicMapFrame}>
              <div className={styles.mapFallback}>
                <span>Ubicación del proyecto</span>
                <strong>La Palmerina.</strong>
                <p>
                  Ruta Provincial 58 · Canning
                  <br />
                  Buenos Aires, Argentina
                </p>
              </div>
              <iframe
                data-geographic-map
                src="https://www.google.com/maps?q=-34.945948,-58.469175&z=12&output=embed"
                title="Ubicación geográfica de La Palmerina sobre Ruta Provincial 58, Canning"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <figcaption className={styles.mapCaption}>
              <div>
                <span>Ubicación del proyecto</span>
                <strong>La Palmerina · Canning, RP58</strong>
              </div>
              <a
                href={PROJECT_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                Abrir ubicación en Google Maps <Arrow />
              </a>
            </figcaption>
          </figure>
          <div className={styles.regionDirectory}>
            <div className={styles.residential}>
              <p className={styles.eyebrow}>La vida de los barrios del corredor</p>
              <h3>Countries & barrios.</h3>
              <ul className={styles.residentialList}>
                {residentialReferences.map((place, index) => (
                  <li key={place.name}>
                    <span className={styles.residentialIndex}>0{index + 1}</span>
                    <a
                      href={place.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.residentialName}
                    >
                      {place.name} <Arrow />
                    </a>
                    <p>{place.address}</p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(place.origin)}&destination=-34.945948,-58.469175&travelmode=driving`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.routeLink}
                      aria-label={`Ver recorrido de ${place.name} al paseo`}
                    >
                      Ver recorrido al paseo <Arrow />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.accesses}>
              <p className={styles.eyebrow}>Cómo se conecta la región</p>
              <h3>Los accesos.</h3>
              <ol className={styles.accessList}>
                <li>
                  <span>01</span>
                  <div>
                    <h4>Ruta Provincial 58</h4>
                    <p>
                      El frente del proyecto se encuentra sobre RP58, eje del corredor de Canning.
                    </p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <h4>Autopista Presidente Perón</h4>
                    <p>
                      El empalme con RP58 aporta una conexión regional. El acceso al lote se realiza
                      desde la ruta.
                    </p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <h4>RP205, RN205 y Ezeiza–Cañuelas</h4>
                    <p>
                      Conexiones del corredor de RP58 con la red de rutas y autopistas de la región.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
          <div className={styles.references}>
            <p className={styles.eyebrow}>Comercios, salud y educación</p>
            <h3>Otras referencias del entorno.</h3>
            <ul className={styles.referenceList}>
              {regionalReferences.map((place) => (
                <li key={place.name}>
                  <div>
                    <span className={styles.placeCategory}>{place.category}</span>
                    <a
                      href={place.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.placeName}
                    >
                      {place.name} <Arrow />
                    </a>
                    <p>{place.address}</p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.query)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.placeMapLink}
                    aria-label={`Ver ${place.name} en Google Maps`}
                  >
                    Maps <Arrow />
                  </a>
                </li>
              ))}
            </ul>
            <p className={styles.directoryNote}>
              Referencias del corredor Canning / Ezeiza. Consultá sus ubicaciones en Maps.
            </p>
          </div>
        </section>

        <section id="contacto" className={styles.contact} aria-labelledby="contact-title">
          <p className={styles.eyebrow}>Tu próximo espacio empieza con una conversación</p>
          <h2 id="contact-title">
            Proyectemos
            <br />
            <em>lo que viene.</em>
          </h2>
          <p>
            Consultanos para conocer el proyecto y conversar sobre el espacio que imaginás para tu
            negocio.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            Conversar por WhatsApp <Arrow />
          </a>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerBrand}>
          La Palmerina.<small>PASEO COMERCIAL · CANNING</small>
        </div>
        <nav aria-label="Enlaces del pie">
          <Link href="/plano">Plano interactivo</Link>
          <Link href="/alquiler">Alquileres</Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            Contacto <Arrow />
          </a>
        </nav>
        <p>
          Anteproyecto · Información e imágenes conceptuales.
          <br />
          Paseo La Palmerina, Buenos Aires.
        </p>
      </footer>
    </div>
  );
}
