import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { AccountMenu } from "@/components/st-thomas/AccountMenu";
import { InventoryManager } from "@/components/st-thomas/InventoryManager";
import { getAdminSession } from "@/lib/admin";
import { isAuthConfigured } from "@/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lotes St. Thomas",
  robots: { index: false, follow: false },
};
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function StThomasPage() {
  if (!isAuthConfigured()) redirect("/admin/ingresar");
  let authorized = false;
  try {
    authorized = (await getAdminSession()) !== null;
  } catch {
    authorized = false;
  }
  if (!authorized) redirect("/admin/ingresar");

  return (
    <>
      <a href="#contenido-inventario" className="fixed top-3 left-5 z-[100] -translate-y-32 bg-[var(--palmerina-cream)] px-5 py-3 text-[var(--palmerina-ink)] focus:translate-y-0">
        Ir al inventario
      </a>
      <SiteHeader accountSlot={<AccountMenu />} />
      <main id="contenido-inventario" tabIndex={-1} className="min-h-[calc(100dvh-var(--palmerina-header-height))] scroll-mt-[var(--palmerina-anchor-offset)] bg-[var(--palmerina-cream)] px-4 py-10 text-[var(--palmerina-ink)] sm:px-8 sm:py-14 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <header className="mb-9 border-b border-[var(--palmerina-line)] pb-8">
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-[var(--palmerina-copper-dark)] uppercase">Administración</p>
            <h1 className="text-4xl leading-tight font-normal tracking-[-0.04em] text-balance sm:text-5xl" style={{ fontFamily: "Georgia, serif" }}>
              Lotes en St. Thomas
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--palmerina-muted)]">
              Plano del loteo con el estado de cada lote. Elegí una parcela para ver sus datos y editar
              precio, estado y observaciones.
            </p>
          </header>
          <InventoryManager />
        </div>
      </main>
    </>
  );
}

