import Image from "next/image";
import { FadeInSection } from "@/components/shared/FadeInSection";
import { SectionBadge } from "@/components/shared/SectionBadge";

const devCards = [
  {
    icon: "🛒",
    title: "Centro Comercial",
    desc: "Strip mall o shopping de escala regional con alta visibilidad desde la ruta.",
    tags: ["Retail", "Alto tráfico"],
  },
  {
    icon: "🍔",
    title: "Corredor Gastronómico",
    desc: "Cluster de restaurantes, cafeterías y locales de comida rápida.",
    tags: ["Food", "Drive-through"],
  },
  {
    icon: "🏋️",
    title: "Centro Deportivo",
    desc: "Complejo de deportes y bienestar para la creciente población de la zona.",
    tags: ["Salud", "Wellness"],
  },
  {
    icon: "🏢",
    title: "Parque Empresarial",
    desc: "Oficinas y showrooms para empresas que buscan visibilidad en el corredor.",
    tags: ["Oficinas", "B2B"],
  },
  {
    icon: "📦",
    title: "Logística y Distribución",
    desc: "Centro de distribución con acceso privilegiado al corredor Autopista–Ruta 58.",
    tags: ["Logística", "Last-mile"],
  },
  {
    icon: "🎓",
    title: "Campus Educativo",
    desc: "Universidad, instituto técnico o escuela privada para la comunidad en expansión.",
    tags: ["Educación", "Comunidad"],
  },
];

export function DevelopmentsSection() {
  return (
    <section id="desarrollos" className="py-20 md:py-28 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <SectionBadge>Usos Sugeridos</SectionBadge>
          <h2
            className="text-3xl md:text-4xl font-extrabold text-brand-dark mb-4"
            style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          >
            Infinitas posibilidades de <span className="text-gradient-accent">desarrollo</span>
          </h2>
          <p className="text-brand-dark/60 max-w-2xl mx-auto">
            La escala y ubicación del terreno lo hacen apto para una gran variedad de usos comerciales, logísticos y de servicios.
          </p>
        </FadeInSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {devCards.map((card, i) => (
            <FadeInSection key={card.title} delay={`${i * 60}ms`}>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card hover:-translate-y-1 transition-transform duration-200 h-full">
                <div className="text-4xl mb-3">{card.icon}</div>
                <h3
                  className="font-bold text-brand-dark mb-2"
                  style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-brand-dark/60 text-sm leading-relaxed mb-4">{card.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection>
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-card-lg">
            <Image
              src="/images/desarrollo-opciones.png"
              alt="Opciones de desarrollo comercial en La Palmerina"
              fill
              className="object-cover"
            />
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
