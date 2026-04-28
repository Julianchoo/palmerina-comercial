import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionBadge } from "@/components/shared/SectionBadge";

const points = [
  {
    icon: "📊",
    title: "Zona en expansión acelerada",
    desc: "Canning es uno de los corredores de mayor crecimiento del GBA sur, con aumento sostenido de población y actividad comercial.",
  },
  {
    icon: "🏗️",
    title: "Infraestructura en desarrollo",
    desc: "La nueva Autopista Presidente Perón revaloriza toda la zona, multiplicando el flujo vehicular y la accesibilidad.",
  },
  {
    icon: "👥",
    title: "Alta densidad de demanda",
    desc: "Más de 300 mil personas en el área de influencia inmediata, con perfil socioeconómico medio-alto en crecimiento.",
  },
  {
    icon: "💼",
    title: "Escasez de oferta comercial",
    desc: "La relación demanda/oferta comercial en el corredor es favorable para nuevos desarrollos de cualquier escala.",
  },
];

export function MarketContext() {
  return (
    <section className="py-20 md:py-28 bg-gradient-dark scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <SectionBadge>Contexto de Mercado</SectionBadge>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          >
            El momento es <span className="text-gradient-accent">ahora</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Las condiciones macro y micro del mercado hacen de esta una ventana de oportunidad única.
          </p>
        </FadeInSection>

        <div className="grid sm:grid-cols-2 gap-6">
          {points.map((point, i) => (
            <FadeInSection key={point.title} delay={`${i * 80}ms`}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-200">
                <div className="text-3xl mb-3">{point.icon}</div>
                <h3
                  className="font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                >
                  {point.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{point.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
