import { SiteHeader } from "@/components/shared/SiteHeader";

const sectionLinks = [
  { href: "#proyecto", label: "El proyecto" },
  { href: "#espacios", label: "Espacios" },
  { href: "#ubicacion", label: "Entorno" },
  { href: "#contacto", label: "Contacto" },
];

/** Compatibility entry point; all page navigation uses the shared header. */
export function HomeHeader() {
  return <SiteHeader sectionLinks={sectionLinks} />;
}
