"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

const inputClass =
  "mt-2 block w-full rounded-lg border border-[#c9d0c4] bg-white px-4 py-3 text-base text-[#233e33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21483c]";

export function PasswordSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const result = await authClient.signIn.email({ email: email.trim(), password, callbackURL: "/st-thomas" });
      if (result.error) {
        setError("Email o contraseña incorrectos.");
        setPending(false);
        return;
      }
      window.location.assign("/st-thomas");
    } catch {
      setError("No pudimos conectar. Revisá tu conexión y volvé a intentarlo.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={signIn} className="space-y-5">
      <label className="block text-sm font-semibold">
        Email
        <input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} />
      </label>
      <label className="block text-sm font-semibold">
        Contraseña
        <input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className={inputClass} />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="flex min-h-12 w-full touch-manipulation items-center justify-center rounded-lg bg-[#21483c] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#16382d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#21483c] disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Ingresando…" : "Ingresar"}
      </button>
      <p role="status" aria-live="polite" className="text-sm leading-relaxed text-red-800">
        {error}
      </p>
    </form>
  );
}
