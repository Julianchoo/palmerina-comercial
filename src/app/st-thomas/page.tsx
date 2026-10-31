import Link from "next/link";
import { redirect } from "next/navigation";
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
    <main className="min-h-screen bg-[#f3f1e9] px-4 py-8 text-[#233e33] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold tracking-wide hover:underline">
            ← La Palmerina
          </Link>
          <div className="flex items-center gap-1 rounded-full bg-[#21483c]/10 p-1 text-sm font-medium">
            <Link href="/" className="rounded-full px-4 py-1.5 text-[#52665b] hover:text-[#233e33]">
              Inversión
            </Link>
            <Link href="/alquiler" className="rounded-full px-4 py-1.5 text-[#52665b] hover:text-[#233e33]">
              Alquiler
            </Link>
            <span aria-current="page" className="rounded-full bg-[#21483c] px-4 py-1.5 text-white">
              St. Thomas
            </span>
          </div>
        </nav>
        <header className="mb-8">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase">Administración</p>
          <h1 className="text-4xl leading-tight sm:text-5xl" style={{ fontFamily: "Georgia, serif" }}>
            Lotes en St. Thomas
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#52665b]">
            Plano del loteo con el estado de cada lote. Elegí una parcela para ver sus datos y editar
            precio, estado y observaciones.
          </p>
        </header>
        <InventoryManager />
      </div>
    </main>
  );
}
