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
    <main style={{ height: "100dvh", minHeight: "480px", background: "#f4f0e8" }}>
      <iframe
        src="/plano/index.html"
        title="Plano interactivo de La Palmerina: locales y oficinas"
        style={{ display: "block", width: "100%", height: "100%", border: 0 }}
      />
    </main>
  );
}
