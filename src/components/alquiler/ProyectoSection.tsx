import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { EmblaCarousel } from "./EmblaCarousel";

const slides = [
  { src: "/images/zoomout.png", alt: "Vista aérea del paseo comercial", caption: "Paseo Comercial La Palmerina" },
  { src: "/images/sports.png", alt: "Local deportivo", caption: "Local deportivo y fitness" },
  { src: "/images/cocina.png", alt: "Local gastronómico", caption: "Local gastronómico" },
  { src: "/images/restaurant.png", alt: "Restaurante", caption: "Restaurante y gastronomía" },
];

const highlights = [
  "Diseño industrial open-air de última generación",
  "Alturas libres de 6 a 8 metros",
  "Fachada con visibilidad máxima desde Ruta 58",
  "Estacionamiento propio para 200+ vehículos",
  "Áreas comunes y circulación amplia",
  "Seguridad 24/7 con CCTV",
];

export function ProyectoSection() {
  return (
    <section id="proyecto" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <SectionBadge>El Proyecto</SectionBadge>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4"
            style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          >
            Visión general del <span className="text-gradient-accent">paseo</span>
          </h2>
          <p className="text-brand-dark/60 max-w-2xl mx-auto">
            Un desarrollo comercial de nueva generación pensado para el corredor sur del Gran Buenos Aires.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeInSection>
            <div className="space-y-4 mb-6">
              {highlights.map((h) => (
                <div key={h} className="flex items-start gap-3 text-sm text-brand-dark/70">
                  <span className="text-brand-accent mt-0.5 flex-shrink-0 font-bold">✓</span>
                  {h}
                </div>
              ))}
            </div>
          </FadeInSection>

          <FadeInSection delay="100ms">
            <EmblaCarousel slides={slides} />
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
