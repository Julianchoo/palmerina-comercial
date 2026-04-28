import Image from "next/image";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionBadge } from "@/components/shared/SectionBadge";

const modulos = [
  {
    size: "200m²",
    image: "/images/Muebles.png",
    alt: "Local de muebles y decoración – módulo 200m²",
    desc: "Ideal para locales de retail, servicios, gastronomía y comercios especializados.",
    usos: ["Retail", "Gastronomía", "Servicios", "Salud"],
    featured: false,
  },
  {
    size: "400m²",
    image: "/images/Resto.png",
    alt: "Restaurante – módulo 400m²",
    desc: "El formato más versátil del paseo. Perfecto para cadenas, supermercados y locales âncoras.",
    usos: ["Cadenas", "Supermercado", "Ancora", "Gym"],
    featured: true,
  },
  {
    size: "600m²",
    image: "/images/Gym.png",
    alt: "Gimnasio y centro deportivo – módulo 600m²",
    desc: "Para grandes operadores que necesitan escala y visibilidad máxima desde la ruta.",
    usos: ["Logística", "Gran retail", "Educación", "Entretenimiento"],
    featured: false,
  },
];

export function ModulosGrid() {
  return (
    <section id="modulos" className="py-20 md:py-28 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <SectionBadge>Módulos Disponibles</SectionBadge>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4"
            style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          >
            Encontrá el módulo <span className="text-gradient-accent">ideal</span>
          </h2>
          <p className="text-brand-dark/60 max-w-2xl mx-auto">
            Tres formatos diseñados para adaptarse a todo tipo de negocio.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6">
          {modulos.map((mod, i) => (
            <FadeInSection key={mod.size} delay={`${i * 80}ms`}>
              <div
                className={`rounded-2xl overflow-hidden shadow-card-md flex flex-col h-full ${
                  mod.featured
                    ? "ring-2 ring-brand-accent ring-offset-2"
                    : "bg-white"
                }`}
              >
                {mod.featured && (
                  <div className="bg-brand-accent text-white text-center text-xs font-bold py-1.5 uppercase tracking-wider">
                    Más popular
                  </div>
                )}
                <div className="relative w-full h-48">
                  <Image src={mod.image} alt={mod.alt} fill className="object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1 bg-white">
                  <div
                    className="text-3xl font-extrabold text-brand-primary mb-2"
                    style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                  >
                    {mod.size}
                  </div>
                  <p className="text-brand-dark/60 text-sm leading-relaxed mb-4">{mod.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {mod.usos.map((uso) => (
                      <span
                        key={uso}
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary"
                      >
                        {uso}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <WhatsAppButton
                      label="Consultar disponibilidad"
                      page="alquiler"
                      source={`modulo-${mod.size}`}
                      className="w-full justify-center text-sm"
                    />
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
