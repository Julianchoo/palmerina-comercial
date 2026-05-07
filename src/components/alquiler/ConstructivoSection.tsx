import Image from "next/image";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionBadge } from "@/components/shared/SectionBadge";

const items = [
  {
    icon: "🏗️",
    title: "Estructura metálica",
    desc: "Sistema constructivo con estructura metálica, cubierta liviana y cerramientos de vidrio para lograr locales amplios, luminosos y de rápida ejecución.",
  },
  {
    icon: "💡",
    title: "Instalaciones de primera",
    desc: "Electricidad trifásica, gas natural, agua potable, pluviales y conexión a fibra óptica en cada módulo.",
  },
  {
    icon: "🚪",
    title: "Acceso vehicular directo",
    desc: "Portones de acceso vehicular en todos los módulos. Ideal para carga, descarga y atención al público con auto.",
  },
];

export function ConstructivoSection() {
  return (
    <section id="construccion" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <SectionBadge>Construcción</SectionBadge>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4"
            style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          >
            Calidad constructiva <span className="text-gradient-accent">premium</span>
          </h2>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <FadeInSection>
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center text-2xl flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3
                      className="font-bold text-brand-dark mb-1"
                      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-brand-dark/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>

          <FadeInSection delay="100ms">
            <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-card-lg">
              <Image
                src="/images/galery-metal.png"
                alt="Detalle constructivo del paseo comercial"
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
