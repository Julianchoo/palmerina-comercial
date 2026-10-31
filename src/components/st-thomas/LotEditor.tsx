"use client";

import { useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { Lot, LotPatch, LotStatus } from "@/lib/st-thomas/types";
import styles from "./inventory.module.css";

export const STATUS_LABELS: Record<LotStatus, string> = {
  available: "Disponible", unavailable: "No disponible", reserved: "Reservado", sold: "Vendido",
};
const money = new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const area = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 });
interface Draft { price: string; area: string; street: string; status: LotStatus; notes: string }
function draftFor(lot: Lot): Draft {
  return { price: lot.priceUsd === null ? "" : String(lot.priceUsd), area: String(lot.areaM2), street: lot.street, status: lot.status, notes: lot.notes };
}
function decimal(value: string): number { return Number(value.trim().replace(",", ".")); }

export interface LotEditorProps {
  lot: Lot;
  onSaved: (lot: Lot) => void;
  onDirtyChange: (dirty: boolean) => void;
  onBusyChange: (busy: boolean) => void;
  onReload: () => void;
  disabled: boolean;
}

export function LotEditor({ lot, onSaved, onDirtyChange, onBusyChange, onReload, disabled }: LotEditorProps) {
  const id = useId();
  const original = draftFor(lot);
  const [draft, setDraft] = useState<Draft>(original);
  const [saving, setSaving] = useState(false);
  const inFlight = useRef(false);
  const [error, setError] = useState("");
  const [conflict, setConflict] = useState(false);
  const [authExpired, setAuthExpired] = useState(false);
  const dirty = JSON.stringify(draft) !== JSON.stringify(original);

  function change<K extends keyof Draft>(key: K, value: Draft[K]) {
    const next = { ...draft, [key]: value };
    setDraft(next);
    onDirtyChange(JSON.stringify(next) !== JSON.stringify(original));
    setError("");
  }
  function cancel() {
    setDraft(original);
    onDirtyChange(false);
    setError("");
    // A conflict requires a fresh version; canceling the draft must not hide it.
  }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled || inFlight.current || !dirty || conflict) return;
    const priceUsd = draft.price.trim() === "" ? null : decimal(draft.price);
    const areaM2 = draft.area.trim() === "" ? NaN : decimal(draft.area);
    if (priceUsd !== null && (!Number.isFinite(priceUsd) || priceUsd < 0 || priceUsd > 1_000_000_000_000)) {
      setError("Ingresá un precio válido en USD, o dejalo vacío para definirlo después."); return;
    }
    if (!Number.isFinite(areaM2) || areaM2 <= 0 || areaM2 > 1_000_000_000) {
      setError("La superficie debe ser un número mayor a cero."); return;
    }
    if (!draft.street.trim() || draft.street.trim().length > 100 || draft.notes.length > 5000) {
      setError("Revisá la calle y las observaciones."); return;
    }
    const patch: LotPatch = { version: lot.version, priceUsd, areaM2, street: draft.street.trim(), status: draft.status, notes: draft.notes };
    inFlight.current = true;
    setSaving(true); onBusyChange(true); setError("");
    try {
      const response = await fetch(`/api/st-thomas/lots/${encodeURIComponent(lot.id)}`, {
        method: "PATCH", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch),
      });
      const result = await response.json().catch(() => null) as { lot?: Lot; error?: string } | null;
      if (!response.ok) {
        if (response.status === 409) setConflict(true);
        if (response.status === 401 || response.status === 403) setAuthExpired(true);
        throw new Error(result?.error || "No se guardaron los cambios. Volvé a intentarlo.");
      }
      if (!result?.lot || result.lot.id !== lot.id || result.lot.version <= lot.version) {
        throw new Error("No pudimos confirmar el guardado. Recargá los datos antes de volver a guardar.");
      }
      onDirtyChange(false);
      onSaved(result.lot);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "No se guardaron los cambios.");
    } finally {
      inFlight.current = false;
      setSaving(false); onBusyChange(false);
    }
  }

  return (
    <aside className={styles.editor} aria-labelledby={`${id}-title`}>
      <div className={styles.editorHeading}>
        <p className={styles.eyebrow}>Ficha del lote</p>
        <h2 id={`${id}-title`}>Lote {lot.number}</h2>
        <span className={`${styles.status} ${styles[lot.status]}`}>{STATUS_LABELS[lot.status]}</span>
      </div>
      <dl className={styles.facts}>
        <div><dt>Superficie</dt><dd>{area.format(lot.areaM2)} m²</dd></div>
        <div><dt>Precio actual</dt><dd>{lot.priceUsd === null ? "A definir" : money.format(lot.priceUsd)}</dd></div>
      </dl>
      <form onSubmit={save}>
        <fieldset disabled={disabled || saving || authExpired} className={styles.fields}>
          <legend className={styles.srOnly}>Editar datos del lote {lot.number}</legend>
          <label htmlFor={`${id}-price`}>Precio de venta · USD
            <input id={`${id}-price`} inputMode="decimal" value={draft.price} maxLength={32} onChange={(event) => change("price", event.target.value)} placeholder="A definir" aria-describedby={`${id}-price-help`} />
          </label>
          <p id={`${id}-price-help`} className={styles.fieldHelp}>Sin separador de miles. Vacío significa “A definir”.</p>
          <label htmlFor={`${id}-status`}>Estado
            <select id={`${id}-status`} value={draft.status} onChange={(event) => change("status", event.target.value as LotStatus)}>
              {Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <div className={styles.fieldRow}>
            <label htmlFor={`${id}-area`}>Superficie · m²
              <input id={`${id}-area`} inputMode="decimal" value={draft.area} maxLength={32} required onChange={(event) => change("area", event.target.value)} />
            </label>
            <label htmlFor={`${id}-street`}>Calle
              <input id={`${id}-street`} value={draft.street} required maxLength={100} onChange={(event) => change("street", event.target.value)} />
            </label>
          </div>
          <label htmlFor={`${id}-notes`}>Observaciones
            <textarea id={`${id}-notes`} rows={4} maxLength={5000} value={draft.notes} onChange={(event) => change("notes", event.target.value)} placeholder="Condiciones, consultas o seguimiento…" />
          </label>
        </fieldset>
        {error && <p role="alert" className={styles.error}>{error}</p>}
        {conflict && <div className={styles.conflict}><p>Tus cambios siguen en el formulario. Copialos si querés conservarlos antes de traer la versión más reciente.</p><button type="button" disabled={disabled || saving} onClick={onReload}>Revisar datos actualizados</button></div>}
        {authExpired && <p className={styles.error}>La sesión requiere verificación. Conservá tus cambios antes de <a href="/admin/ingresar">volver a ingresar</a>.</p>}
        <div className={styles.editorActions}>
          <button type="submit" className={styles.primary} disabled={disabled || !dirty || saving || conflict || authExpired}>{saving ? "Guardando…" : "Guardar cambios"}</button>
          <button type="button" disabled={disabled || !dirty || saving} onClick={cancel}>Cancelar</button>
        </div>
        <p className={styles.saveHint} role="status">{disabled ? "Actualizando los datos. Esperá para continuar editando." : saving ? "Esperá la confirmación del guardado." : dirty ? "Tenés cambios sin guardar." : "Los datos mostrados están guardados."}</p>
      </form>
    </aside>
  );
}
