import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionBadge } from "@/components/shared/SectionBadge";
import { EmblaCarousel } from "./EmblaCarousel";

const slides = [
  { src: "/images/zoomout3.png", alt: "Vista aérea del paseo comercial", caption: "Paseo Comercial La Palmerina" },
  { src: "/images/Generica-metal-noche1.png", alt: "Locales comerciales de noche", caption: "Locales comerciales" },
  { src: "/images/generica-metal-dia1.png", alt: "Locales comerciales de día", caption: "Paseo comercial" },
  { src: "/images/generica-metal-dia2.png", alt: "Vista exterior del paseo comercial", caption: "Diseño open-air" },
  { src: "/images/padel-noche.png", alt: "Cancha de pádel de noche", caption: "Pádel nocturno" },
  { src: "/images/sports.png", alt: "Local deportivo", caption: "Local deportivo y fitness" },
  { src: "/images/cocina.png", alt: "Hogar y deco", caption: "Hogar y deco" },
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

const highlightItems = [
  { label: "Dise\u00f1o open-air", detail: "\u00daltima generaci\u00f3n" },
  { label: "Altura libre", detail: "6 a 8 metros" },
  { label: "Ruta 58", detail: "Visibilidad m\u00e1xima" },
  { label: "Parking", detail: "200+ veh\u00edculos" },
  { label: "Circulaci\u00f3n", detail: "\u00c1reas comunes amplias" },
  { label: "Seguridad", detail: "24/7 con CCTV" },
];

export function ProyectoSection() {
  return (
    <section id="proyecto" className="bg-white py-20 scroll-mt-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
          <SectionBadge>El Proyecto</SectionBadge>
          <h2
            className="mb-4 text-3xl font-extrabold text-brand-dark md:text-4xl"
            style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          >
            Visión general del <span className="text-gradient-accent">paseo</span>
          </h2>
          <p className="mx-auto max-w-2xl text-brand-dark/60">
            Un desarrollo comercial de nueva generación pensado para el corredor sur del Gran Buenos Aires.
          </p>
        </FadeInSection>

        <FadeInSection delay="100ms">
          <EmblaCarousel slides={slides} />
        </FadeInSection>

        <FadeInSection delay="160ms">
          <div className="mt-6 border-y border-brand-primary/10 bg-brand-primary/[0.03] px-4 py-4 md:mt-8 md:px-6 md:py-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {highlightItems.map((item, index) => (
                <div
                  key={item.label}
                  title={highlights[index]}
                  className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm ring-1 ring-brand-primary/10"
                >
                  <span className="flex size-7 flex-none items-center justify-center rounded-full bg-brand-accent/15 text-sm font-bold text-brand-accent">
                    ✓
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold leading-tight text-brand-dark">{item.label}</span>
                    <span className="mt-0.5 block text-xs leading-tight text-brand-dark/55">{item.detail}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
