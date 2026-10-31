import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin";
import { isAuthConfigured } from "@/lib/auth";
import { GoogleSignIn } from "./google-sign-in";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceso privado",
  robots: { index: false, follow: false },
};
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  let available = isAuthConfigured();
  let authenticated = false;
  if (available) {
    try {
      authenticated = (await getAdminSession()) !== null;
    } catch {
      available = false;
    }
  }
  if (authenticated) redirect("/st-thomas");
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col bg-[#f3f1e9] px-6 py-8 text-[#233e33] sm:px-12">
      <Link href="/" className="w-fit text-sm font-semibold tracking-wide hover:underline">
        ← La Palmerina
      </Link>
      <div className="mx-auto my-auto w-full max-w-md py-16">
        <p className="mb-5 text-xs font-semibold tracking-[0.2em] uppercase">Administración</p>
        <h1 className="text-5xl leading-tight" style={{ fontFamily: "Georgia, serif" }}>
          St. Thomas
        </h1>
        <p className="mt-5 mb-10 max-w-sm text-base leading-relaxed text-[#52665b]">
          Ingresá para consultar el plano y administrar tus lotes.
        </p>
        <div className="border-t border-[#c9d0c4] pt-8">
          {available ? (
            <>
              <p className="mb-5 text-sm leading-relaxed text-[#52665b]">
                Usá tu cuenta de Google autorizada para ingresar.
              </p>
              {error && (
                <p role="alert" className="mb-5 text-sm leading-relaxed text-red-800">
                  No pudimos validar tu acceso. Elegí la cuenta autorizada y volvé a intentarlo.
                </p>
              )}
              <GoogleSignIn />
            </>
          ) : (
            <p role="status" className="text-sm leading-relaxed text-[#52665b]">
              El acceso privado todavía no está habilitado. Volvé a intentarlo más tarde.
            </p>
          )}
        </div>
        <p className="mt-8 text-xs leading-relaxed text-[#52665b]">
          Acceso exclusivo para administradores.
        </p>
      </div>
    </main>
  );
}
