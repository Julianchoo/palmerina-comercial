import Image from "next/image";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionBadge } from "@/components/shared/SectionBadge";

const specs = [
  { label: "Frente total", value: "1,000 metros" },
  { label: "Profundidad", value: "180 metros" },
  { label: "Superficie total", value: "~18 hectáreas" },
  { label: "Zona", value: "Canning, Esteban Echeverría" },
  { label: "Ruta", value: "Provincial 58" },
  { label: "Uso de suelo", value: "Comercial / Mixto" },
  { label: "Fracciones", value: "Adaptable a demanda" },
  { label: "Servicios", value: "Luz, agua, gas (en gestión)" },
];

const advantages = [
  "Frente de 1km sobre vía de alto tráfico",
  "Sin restricciones de altura",
  "Posibilidad de subdivisión",
  "Venta total o por fracción",
];

export function SpecsSection() {
  return (
    <section id="caracteristicas" className="py-20 md:py-28 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <SectionBadge>Ficha Técnica</SectionBadge>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4"
            style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          >
            Especificaciones del <span className="text-gradient-accent">terreno</span>
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeInSection>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                {specs.map((spec) => (
                  <div key={spec.label} className="bg-white rounded-xl p-4 shadow-card">
                    <div className="text-xs text-brand-dark/50 uppercase tracking-wider mb-1">
                      {spec.label}
                    </div>
                    <div
                      className="font-bold text-brand-primary text-sm"
                      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                    >
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-brand rounded-2xl p-6 text-white">
                <h3
                  className="font-bold mb-3"
                  style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                >
                  Ventajas clave
                </h3>
                <ul className="space-y-2">
                  {advantages.map((adv) => (
                    <li key={adv} className="flex items-start gap-2 text-sm text-white/90">
                      <span className="text-brand-accent mt-0.5 flex-shrink-0">✓</span>
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay="100ms">
            <div className="relative w-full h-80 md:h-[420px] rounded-2xl overflow-hidden shadow-card-lg sticky top-24">
              <Image
                src="/images/zoomout.png"
                alt="Vista aérea del terreno La Palmerina – Canning"
                fill
                className="object-cover"
              />
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
