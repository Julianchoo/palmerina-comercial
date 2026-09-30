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
  ...(process.env.NEXT_PUBLIC_APP_URL
    ? { metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL) }
    : {}),
  title: {
    default: "Paseo La Palmerina · Canning",
    template: "%s | La Palmerina",
  },
  description:
    "Paseo comercial proyectado sobre Ruta Provincial 58, Canning. Una parcela de 100 × 180 m, 18.000 m² y 37 unidades proyectadas en dos plantas, con locales, gastronomía y oficinas.",
  keywords: [
    "Paseo La Palmerina",
    "paseo comercial Canning",
    "locales Ruta 58",
    "oficinas Canning",
  ],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Paseo La Palmerina",
    title: "Paseo La Palmerina · Canning",
    description:
      "Comercio, gastronomía y oficinas en un paseo proyectado sobre Ruta Provincial 58, Canning.",
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
      <body
        className="min-h-screen overflow-x-hidden antialiased"
        style={{ fontFamily: "var(--font-roboto), system-ui, sans-serif" }}
      >
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
