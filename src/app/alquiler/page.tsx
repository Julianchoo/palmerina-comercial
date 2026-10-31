import { ConstructivoSection } from "@/components/alquiler/ConstructivoSection";
import { ModulosGrid } from "@/components/alquiler/ModulosGrid";
import { ProyectoSection } from "@/components/alquiler/ProyectoSection";
import { VentajasSection } from "@/components/alquiler/VentajasSection";
import { CtaSection } from "@/components/shared/CtaSection";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/shared/HeroSection";
import { LocationSection } from "@/components/shared/LocationSection";
import { SiteHeader } from "@/components/shared/SiteHeader";
import styles from "./alquiler.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alquiler de Módulos – Paseo Comercial La Palmerina",
  description:
    "Alquilá tu local comercial en el Paseo Comercial La Palmerina, Canning. Módulos de 200, 400 y 600m² sobre Ruta Provincial 58. Diseño open-air con acceso directo desde Autopista Presidente Perón.",
  keywords: [
    "alquiler local comercial canning",
    "paseo comercial ruta 58",
    "módulo comercial GBA sur",
    "local en alquiler Esteban Echeverría",
  ],
};

const navLinks = [
  { href: "#proyecto", label: "El proyecto" },
  { href: "#modulos", label: "Módulos" },
  { href: "#construccion", label: "Construcción" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
];

const heroStats = [
  { value: "3", numericValue: 3, suffix: "", label: "formatos" },
  { value: "600", numericValue: 600, suffix: "m²", label: "módulo máximo" },
  { value: "200", numericValue: 200, suffix: "+", label: "estacionamientos" },
];

export default function AlquilerPage() {
  return (
    <div className={styles.page}>
      <a href="#contenido" className={styles.skipLink}>
        Ir al contenido
      </a>
      <SiteHeader sectionLinks={navLinks} />
      <main id="contenido" tabIndex={-1}>
        <div className={styles.hero}>
          <HeroSection
            backgroundImage="/images/zoomout3.png"
            badge="Paseo Comercial · Canning, Buenos Aires"
            title={
              <>
                Tu local en el corazón
                <br />
                del <span className="text-gradient-accent">corredor sur</span>
              </>
            }
            subtitle="Módulos comerciales de 200, 400 y 600m² en el Paseo Comercial La Palmerina. Diseño open-air, visibilidad máxima desde Ruta 58 y acceso desde la Autopista Presidente Perón."
            stats={heroStats}
            ctaSecondaryLabel="Ver módulos"
            ctaSecondaryHref="#modulos"
            page="alquiler"
          />
        </div>
        <ProyectoSection />
        <ModulosGrid />
        <ConstructivoSection />
        <LocationSection />
        <VentajasSection />
        <CtaSection page="alquiler" />
      </main>
      <Footer variant="alquiler" />
    </div>
  );
}
