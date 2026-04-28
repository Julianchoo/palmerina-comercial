import Image from "next/image";
import { SectionBadge } from "./SectionBadge";
import { FadeInSection } from "./FadeInSection";

const accessItems = [
  { icon: "🛣️", title: "Ruta Provincial 58", desc: "Frente directo sobre la Ruta Provincial 58" },
  { icon: "🚗", title: "Autopista Presidente Perón", desc: "Acceso directo desde la nueva Autopista Presidente Perón" },
  { icon: "🏙️", title: "35 min de CABA", desc: "A 35 minutos del centro de Buenos Aires" },
  { icon: "✈️", title: "Aeropuerto Ezeiza", desc: "A 15 minutos del Aeropuerto Internacional Ministro Pistarini" },
];

const poiItems = [
  { icon: "🏘️", label: "Barrios privados y countrys" },
  { icon: "🏫", label: "Universidades y colegios" },
  { icon: "🏥", label: "Centros de salud y hospitales" },
];

export function LocationSection() {
  return (
    <section id="ubicacion" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <SectionBadge>Ubicación Estratégica</SectionBadge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
            En el corazón del <span className="text-gradient-accent">corredor sur</span>
          </h2>
          <p className="text-brand-dark/60 max-w-2xl mx-auto">
            Ubicación privilegiada con acceso directo a las principales vías de comunicación del Gran Buenos Aires Sur.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeInSection>
            <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-card-lg">
              <Image
                src="/images/mapa-zona.png"
                alt="Mapa de ubicación La Palmerina – Canning, Ruta 58"
                fill
                className="object-cover"
              />
            </div>
          </FadeInSection>

          <FadeInSection delay="100ms">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-brand-dark mb-4" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                  Accesos y conectividad
                </h3>
                <div className="space-y-4">
                  {accessItems.map((item) => (
                    <div key={item.title} className="flex gap-3 items-start">
                      <span className="text-2xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <div className="font-semibold text-brand-dark text-sm">{item.title}</div>
                        <div className="text-brand-dark/60 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-brand-dark mb-4" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
                  Zona de influencia
                </h3>
                <div className="flex flex-col gap-2">
                  {poiItems.map((poi) => (
                    <div key={poi.label} className="flex items-center gap-2 text-brand-dark/70 text-sm">
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
