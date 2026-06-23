import Image from "next/image";
import { ExternalLink, MapPin } from "lucide-react";
import { SectionBadge } from "./SectionBadge";
import { FadeInSection } from "./FadeInSection";

const MAP_URL = "https://maps.app.goo.gl/eFMCSVcEKGdA7qoN9";

const accessItems = [
  { icon: "🛣️", title: "Ruta Provincial 58", desc: "Frente directo sobre la Ruta Provincial 58" },
  {
    icon: "🚗",
    title: "Autopista Presidente Perón",
    desc: "Acceso directo desde la nueva Autopista Presidente Perón",
  },
  { icon: "🏙️", title: "35 min de CABA", desc: "A 35 minutos del centro de Buenos Aires" },
  {
    icon: "✈️",
    title: "Aeropuerto Ezeiza",
    desc: "A 15 minutos del Aeropuerto Internacional Ministro Pistarini",
  },
];

const poiItems = [
  { icon: "🏘️", label: "Barrios privados y countrys" },
  { icon: "🏫", label: "Universidades y colegios" },
  { icon: "🏥", label: "Centros de salud y hospitales" },
];

export function LocationSection() {
  return (
    <section id="ubicacion" className="scroll-mt-20 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mb-16 text-center">
          <SectionBadge>Ubicación Estratégica</SectionBadge>
          <h2
            className="text-brand-dark mb-4 text-3xl font-extrabold md:text-4xl"
            style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          >
            En el corazón del <span className="text-gradient-accent">corredor sur</span>
          </h2>
          <p className="text-brand-dark/60 mx-auto max-w-2xl">
            Ubicación privilegiada con acceso directo a las principales vías de comunicación del
            Gran Buenos Aires Sur.
          </p>
        </FadeInSection>

        <div className="grid items-start gap-12 md:grid-cols-2">
          <FadeInSection>
            <div className="group border-brand-dark/10 shadow-card-lg relative aspect-[14/9] w-full overflow-hidden rounded-2xl border">
              <Image
                src="/images/mapa-zona-v2.png"
                alt="Mapa de la zona de La Palmerina sobre Ruta Provincial 58, con accesos y puntos de interés cercanos"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />

              <div className="from-brand-dark/35 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

              <div className="absolute top-4 left-4 max-w-[calc(100%-2rem)] rounded-xl border border-white/50 bg-white/95 p-3 shadow-lg backdrop-blur-sm sm:top-5 sm:left-5 sm:p-4">
                <div className="flex items-start gap-3">
                  <span className="bg-brand-primary flex size-9 shrink-0 items-center justify-center rounded-full text-white shadow-sm">
                    <MapPin className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-brand-dark leading-tight font-bold">La Palmerina</p>
                    <p className="text-brand-dark/65 mt-1 text-xs leading-snug">
                      RP58, Esteban Echeverría
                    </p>
                  </div>
                </div>
              </div>

              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-dark focus-visible:ring-brand-accent absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:bottom-5 sm:left-5"
                aria-label="Abrir la ubicación de La Palmerina en Google Maps"
              >
                Ver en Google Maps
                <ExternalLink className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </FadeInSection>

          <FadeInSection delay="100ms">
            <div className="space-y-6">
              <div>
                <h3
                  className="text-brand-dark mb-4 text-xl font-bold"
                  style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                >
                  Accesos y conectividad
                </h3>
                <div className="space-y-4">
                  {accessItems.map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <span className="flex-shrink-0 text-2xl">{item.icon}</span>
                      <div>
                        <div className="text-brand-dark text-sm font-semibold">{item.title}</div>
                        <div className="text-brand-dark/60 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="text-brand-dark mb-4 text-xl font-bold"
                  style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                >
                  Zona de influencia
                </h3>
                <div className="flex flex-col gap-2">
                  {poiItems.map((poi) => (
                    <div
                      key={poi.label}
                      className="text-brand-dark/70 flex items-center gap-2 text-sm"
                    >
                      <span>{poi.icon}</span>
                      <span>{poi.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
