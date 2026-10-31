"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function GoogleSignIn() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function signIn() {
    setPending(true);
    setError("");
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/st-thomas",
        errorCallbackURL: "/admin/ingresar?error=access",
      });
      if (result.error) {
        setError("No pudimos iniciar sesión. Volvé a intentarlo con la cuenta autorizada.");
        setPending(false);
      }
    } catch {
      setError("No pudimos conectar. Revisá tu conexión y volvé a intentarlo.");
      setPending(false);
    }
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={signIn}
        disabled={pending}
        className="flex min-h-12 w-full touch-manipulation items-center justify-center gap-3 rounded-lg bg-[#21483c] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16382d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#21483c] disabled:cursor-wait disabled:opacity-70"
      >
        <span aria-hidden="true" className="font-bold">G</span>
        {pending ? "Conectando con Google…" : "Ingresar con Google"}
      </button>
      <p role="status" aria-live="polite" className="text-sm leading-relaxed text-red-800">
        {error}
      </p>
    </div>
  );
}
