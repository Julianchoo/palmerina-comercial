import { WhatsAppButton } from "./WhatsAppButton";

interface CtaSectionProps {
  page: string;
}

export function CtaSection({ page }: CtaSectionProps) {
  return (
    <section id="contacto" className="py-20 md:py-28 bg-gradient-brand scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2
          className="text-3xl md:text-4xl font-extrabold text-white mb-4"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          ¿Listo para dar el próximo paso?
        </h2>
        <p className="text-white/80 text-lg mb-8">
          Hablá con nosotros hoy y recibí información detallada, precios y disponibilidad. Sin compromiso.
        </p>
        <WhatsAppButton
          label="Iniciar conversación por WhatsApp"
          page={page}
          source="cta-section"
          className="text-base px-8 py-4"
        />
        <p className="text-white/50 text-sm mt-4">Respondemos en minutos en horario comercial</p>
      </div>
    </section>
  );
}
