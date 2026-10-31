"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { authClient } from "@/lib/auth-client";

const inputClass =
  "mt-1 block w-full rounded-lg border border-[#c9d0c4] bg-white px-3 py-2 text-sm text-[#233e33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#21483c]";

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [repeat, setRepeat] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [failed, setFailed] = useState(false);

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setFailed(false);
    if (next.length < 8) { setFailed(true); setMessage("La nueva contraseña debe tener al menos 8 caracteres."); return; }
    if (next !== repeat) { setFailed(true); setMessage("Las contraseñas nuevas no coinciden."); return; }
    setPending(true);
    try {
      const result = await authClient.changePassword({ currentPassword: current, newPassword: next, revokeOtherSessions: true });
      if (result.error) {
        setFailed(true);
        setMessage("No se pudo cambiar. Revisá la contraseña actual.");
      } else {
        setCurrent(""); setNext(""); setRepeat("");
        setMessage("Contraseña actualizada.");
      }
    } catch {
      setFailed(true);
      setMessage("No pudimos conectar. Volvé a intentarlo.");
    } finally {
      setPending(false);
    }
  }

  async function signOut() {
    await authClient.signOut().catch(() => undefined);
    window.location.assign("/admin/ingresar");
  }

  return (
    <div className="relative flex items-center gap-3 text-sm">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="font-semibold hover:underline">
        Cambiar contraseña
      </button>
      <button type="button" onClick={() => void signOut()} className="font-semibold hover:underline">
        Salir
      </button>
      {open && (
        <form onSubmit={changePassword} className="absolute top-8 right-0 z-20 w-72 space-y-3 rounded-xl border border-[#c9d0c4] bg-[#f8f7f2] p-4 shadow-lg">
          <label className="block text-xs font-semibold">Contraseña actual
            <input type="password" autoComplete="current-password" required value={current} onChange={(event) => setCurrent(event.target.value)} className={inputClass} />
          </label>
          <label className="block text-xs font-semibold">Nueva contraseña
            <input type="password" autoComplete="new-password" required minLength={8} value={next} onChange={(event) => setNext(event.target.value)} className={inputClass} />
          </label>
          <label className="block text-xs font-semibold">Repetir nueva contraseña
            <input type="password" autoComplete="new-password" required minLength={8} value={repeat} onChange={(event) => setRepeat(event.target.value)} className={inputClass} />
          </label>
          <button type="submit" disabled={pending} className="w-full rounded-lg bg-[#21483c] px-4 py-2 font-semibold text-white disabled:opacity-70">
            {pending ? "Guardando…" : "Guardar contraseña"}
          </button>
          <p role="status" aria-live="polite" className={failed ? "text-xs text-red-800" : "text-xs text-[#21483c]"}>{message}</p>
        </form>
      )}
    </div>
  );
}
