import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionBadge } from "@/components/shared/SectionBadge";

const ventajas = [
  {
    icon: "📈",
    title: "Zona de crecimiento acelerado",
    desc: "Canning es el corredor de mayor expansión del GBA sur, con crecimiento sostenido de población y consumo.",
  },
  {
    icon: "🚗",
    title: "Visibilidad y accesibilidad únicas",
    desc: "1,000 metros de frente sobre Ruta 58, con acceso desde la nueva Autopista Presidente Perón.",
  },
  {
    icon: "🅿️",
    title: "Estacionamiento amplio",
    desc: "Más de 200 espacios de estacionamiento propio para clientes, garantizando acceso cómodo.",
  },
  {
    icon: "✏️",
    title: "Locales a medida",
    desc: "Posibilidad de personalizar el módulo según las necesidades específicas de tu negocio.",
  },
];

export function VentajasSection() {
  return (
    <section id="ventajas" className="py-20 md:py-28 bg-gradient-dark scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <SectionBadge>Por qué instalarte acá</SectionBadge>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          >
            La ubicación que tu negocio <span className="text-gradient-accent">necesita</span>
          </h2>
        </FadeInSection>

        <div className="grid sm:grid-cols-2 gap-6">
          {ventajas.map((v, i) => (
            <FadeInSection key={v.title} delay={`${i * 80}ms`}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-200">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3
                  className="font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                >
                  {v.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
