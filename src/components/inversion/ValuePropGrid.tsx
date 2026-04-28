import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionBadge } from "@/components/shared/SectionBadge";

const values = [
  {
    icon: "📍",
    title: "Ubicación Premium",
    desc: "1,000 metros de frente sobre Ruta Provincial 58, en el corredor comercial más dinámico del sur del GBA.",
  },
  {
    icon: "🚗",
    title: "Accesibilidad Total",
    desc: "Acceso directo desde la nueva Autopista Presidente Perón, conectando con toda el área metropolitana.",
  },
  {
    icon: "📈",
    title: "Alto Potencial",
    desc: "Zona de expansión urbana acelerada con crecimiento sostenido de la demanda comercial.",
  },
  {
    icon: "🏗️",
    title: "Versatilidad",
    desc: "Terreno apto para múltiples usos: retail, logística, entretenimiento, educación y más.",
  },
];

export function ValuePropGrid() {
  return (
    <section id="propuesta" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <SectionBadge>Por qué La Palmerina</SectionBadge>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4"
            style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          >
            Una oportunidad única en el{" "}
            <span className="text-gradient-accent">corredor sur</span>
          </h2>
        </FadeInSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <FadeInSection key={v.title} delay={`${i * 80}ms`}>
              <div className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:-translate-y-1 transition-transform duration-200">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3
                  className="font-bold text-brand-dark mb-2"
                  style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                >
                  {v.title}
                </h3>
                <p className="text-brand-dark/60 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
