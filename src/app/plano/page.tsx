import { SiteHeader } from "@/components/shared/SiteHeader";
import styles from "./plano.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plano interactivo",
  description:
    "Explorá las 37 unidades proyectadas de La Palmerina: locales en planta baja y oficinas en primer piso, sobre Ruta Provincial 58, Canning.",
  openGraph: {
    title: "Plano interactivo | La Palmerina",
    description:
      "Un paseo comercial de 100 × 180 m. Explorá sus locales, oficinas y superficies en el plano conceptual.",
  },
};

export default function PlanoPage() {
  return (
    <>
      <a href="#contenido-plano" className={styles.skipLink}>Ir al plano</a>
      <SiteHeader />
      <main id="contenido-plano" className={styles.workspace} tabIndex={-1}>
        <iframe
          src="/plano/index.html?embedded=1"
          title="Plano interactivo de La Palmerina: locales y oficinas"
          className={styles.frame}
        />
      </main>
    </>
  );
}

