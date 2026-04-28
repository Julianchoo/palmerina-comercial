import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { WhatsAppFloat } from "@/components/shared/WhatsAppFloat";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "La Palmerina – Tierra Comercial Canning",
    template: "%s | La Palmerina",
  },
  description:
    "1000m de frente sobre Ruta Provincial 58, Canning. Tierra comercial premium con acceso directo a la nueva Autopista Presidente Perón.",
  keywords: [
    "tierra comercial canning",
    "lote ruta 58",
    "inversión inmobiliaria",
    "desarrollo comercial",
    "La Palmerina",
    "autopista presidente perón",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "La Palmerina",
    title: "La Palmerina – Tierra Comercial Canning",
    description:
      "1000m de frente sobre Ruta Provincial 58, Canning. Tierra comercial premium.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${roboto.variable}`}>
      <body className="antialiased min-h-screen overflow-x-hidden" style={{ fontFamily: "var(--font-roboto), system-ui, sans-serif" }}>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
