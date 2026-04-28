import type { Metadata } from "next";
import { Navbar } from "@/components/shared/Navbar";
import { HeroSection } from "@/components/shared/HeroSection";
import { LocationSection } from "@/components/shared/LocationSection";
import { CtaSection } from "@/components/shared/CtaSection";
import { Footer } from "@/components/shared/Footer";
import { ValuePropGrid } from "@/components/inversion/ValuePropGrid";
import { SpecsSection } from "@/components/inversion/SpecsSection";
import { DevelopmentsSection } from "@/components/inversion/DevelopmentsSection";
import { MarketContext } from "@/components/inversion/MarketContext";

export const metadata: Metadata = {
  title: "Tierra Comercial Premium – Ruta 58, Canning",
  description:
    "1,000m de frente sobre Ruta Provincial 58, Canning. Tierra comercial con acceso directo a la nueva Autopista Presidente Perón. Inversión de alta rentabilidad en el corredor sur.",
  keywords: [
    "tierra comercial canning",
    "lote ruta 58",
    "inversión inmobiliaria GBA",
    "desarrollo comercial Esteban Echeverría",
  ],
};

const navLinks = [
  { href: "#propuesta", label: "Por qué elegirnos" },
  { href: "#caracteristicas", label: "Especificaciones" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#desarrollos", label: "Desarrollos" },
  { href: "#contacto", label: "Contacto" },
];

const heroStats = [
  { value: "1.000", numericValue: 1000, suffix: "m", label: "de frente" },
  { value: "18", numericValue: 18, suffix: "ha", label: "superficie" },
  { value: "35", numericValue: 35, suffix: "min", label: "de CABA" },
];

export default function InversionPage() {
  return (
    <>
      <Navbar navLinks={navLinks} />

      <HeroSection
        backgroundImage="/images/hero-background.png"
        badge="Inversión Comercial · Canning, Buenos Aires"
        title={
          <>
            Tierra Comercial Premium
            <br />
            <span className="text-gradient-accent">sobre Ruta 58</span>
          </>
        }
        subtitle="1,000 metros de frente sobre la Ruta Provincial 58 con acceso directo a la nueva Autopista Presidente Perón. La oportunidad de inversión que estabas esperando."
        stats={heroStats}
        ctaSecondaryLabel="Ver especificaciones"
        ctaSecondaryHref="#caracteristicas"
        page="inversion"
      />

      <ValuePropGrid />
      <SpecsSection />
      <LocationSection />
      <DevelopmentsSection />
      <MarketContext />
      <CtaSection page="inversion" />
      <Footer variant="inversion" />
    </>
  );
}
