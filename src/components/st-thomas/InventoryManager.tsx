"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { LotMap } from "./LotMap";
import { LotEditor, STATUS_LABELS } from "./LotEditor";
import type { Lot, LotStatus, PlanMetadata } from "@/lib/st-thomas/types";
import { LOT_STATUSES } from "@/lib/st-thomas/types";
import styles from "./inventory.module.css";

export interface InventoryData {
  lots: Lot[];
  plan: PlanMetadata;
  sourceAudit: { statusesConfirmed: boolean; warnings: string[] };
}
export interface InventoryManagerProps { initialInventory?: InventoryData }
type SortKey = "number" | "street" | "areaM2" | "priceUsd" | "status";
const money = new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
const area = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 });
const collator = new Intl.Collator("es-AR", { numeric: true });
const EMPTY_LOTS: Lot[] = [];

function isInventory(value: unknown): value is InventoryData {
  if (!value || typeof value !== "object") return false;
  const result = value as Partial<InventoryData>;
  return Array.isArray(result.lots) && !!result.plan && Number.isFinite(result.plan.width) && Number.isFinite(result.plan.height) && !!result.sourceAudit && Array.isArray(result.sourceAudit.warnings);
}

export function InventoryManager({ initialInventory }: InventoryManagerProps) {
  const id = useId();
  const [inventory, setInventory] = useState<InventoryData | null>(initialInventory ?? null);
  const [loading, setLoading] = useState(!initialInventory);
  const [error, setError] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [notice, setNotice] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [street, setStreet] = useState("");
  const [status, setStatus] = useState<LotStatus | "">("");
  const [sort, setSort] = useState<SortKey>("number");
  const [descending, setDescending] = useState(false);
  const [view, setView] = useState<"map" | "table">("map");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const dirtyRef = useRef(false);
  const busyRef = useRef(false);
  const loadingRef = useRef(!initialInventory);
  const reloadController = useRef<AbortController | null>(null);
  const [editorKey, setEditorKey] = useState(0);
  const editorRef = useRef<HTMLDivElement>(null);
  const openEditor = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.scrollIntoView({ behavior: "smooth", block: "start" });
    editor.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
  }, []);

  const markDirty = useCallback((value: boolean) => { dirtyRef.current = value; setDirty(value); }, []);
  const markBusy = useCallback((value: boolean) => { busyRef.current = value; setBusy(value); }, []);

  useEffect(() => {
    if (!dirty) return;
    const beforeUnload = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [dirty]);

  const load = useCallback(async (signal: AbortSignal) => {
    try {
      const response = await fetch("/api/st-thomas/lots", { credentials: "same-origin", cache: "no-store", signal });
      const result: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) setSessionExpired(true);
        const message = result && typeof result === "object" && "error" in result && typeof result.error === "string" ? result.error : "No se pudo cargar el inventario.";
        throw new Error(message);
      }
      if (!isInventory(result)) throw new Error("No se pudieron leer los datos del inventario.");
      if (signal.aborted) return;
      setInventory(result);
      setSelectedId((current) => current && result.lots.some((lot) => lot.id === current) ? current : null);
      setError(""); setSessionExpired(false); loadingRef.current = false; setLoading(false);
      return true;
    } catch (failure) {
      if (signal.aborted) return;
      setError(failure instanceof Error ? failure.message : "No se pudo cargar el inventario.");
      loadingRef.current = false; setLoading(false);
      return false;
    }
  }, []);

  useEffect(() => {
    if (initialInventory) return;
    const controller = new AbortController();
    void load(controller.signal);
    return () => controller.abort();
  }, [initialInventory, load]);
  useEffect(() => () => reloadController.current?.abort(), []);
  useEffect(() => {
    const askBeforeLeaving = (event: Event) => {
      if (loadingRef.current || busyRef.current || (dirtyRef.current && !window.confirm("Tenés cambios sin guardar. ¿Querés descartarlos para salir?"))) event.preventDefault();
    };
    const followLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.pathname === window.location.pathname && destination.search === window.location.search && destination.hash) return;
      askBeforeLeaving(event);
      if (event.defaultPrevented) event.stopPropagation();
    };
    document.addEventListener("click", followLink, true);
    window.addEventListener("st-thomas:before-navigation", askBeforeLeaving);
    return () => {
      document.removeEventListener("click", followLink, true);
      window.removeEventListener("st-thomas:before-navigation", askBeforeLeaving);
    };
  }, []);

  function canDiscard() {
    return !loadingRef.current && !busyRef.current && (!dirtyRef.current || window.confirm("Tenés cambios sin guardar. ¿Querés descartarlos para continuar?"));
  }
  function select(id: string) {
    if (id === selectedId || !canDiscard()) return;
    markDirty(false); setSelectedId(id); setNotice("");
  }
  function filter(change: () => void) {
    if (!canDiscard()) return;
    markDirty(false); setSelectedId(null); change(); setNotice("");
  }
  async function reload() {
    if (loading || !canDiscard()) return;
    // Keep the draft mounted until the request succeeds, including on failed refreshes.
    reloadController.current?.abort();
    const controller = new AbortController();
    reloadController.current = controller;
    loadingRef.current = true; setLoading(true); setNotice("");
    if (await load(controller.signal)) {
      markDirty(false); setEditorKey((value) => value + 1);
      setNotice("Inventario actualizado.");
    }
  }

  const lots = inventory?.lots ?? EMPTY_LOTS;
  const streets = useMemo(() => [...new Set(lots.map((lot) => lot.street))].sort(collator.compare), [lots]);
  const counts = useMemo(() => {
    const result: Record<LotStatus, number> = { available: 0, unavailable: 0, reserved: 0, sold: 0 };
    for (const lot of lots) result[lot.status] += 1;
    return result;
  }, [lots]);
  const visible = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("es");
    return lots.filter((lot) => (!query || `${lot.number} ${lot.street}`.toLocaleLowerCase("es").includes(query)) && (!street || lot.street === street) && (!status || lot.status === status)).sort((a, b) => {
      let value = 0;
      if (sort === "priceUsd") {
        if (a.priceUsd === null || b.priceUsd === null) return a.priceUsd === b.priceUsd ? a.number - b.number : a.priceUsd === null ? 1 : -1;
        value = a.priceUsd - b.priceUsd;
      } else if (sort === "number" || sort === "areaM2") value = a[sort] - b[sort];
      else value = collator.compare(sort === "status" ? STATUS_LABELS[a.status] : a.street, sort === "status" ? STATUS_LABELS[b.status] : b.street);
      return (descending ? -value : value) || a.number - b.number;
    });
  }, [lots, search, street, status, sort, descending]);
  const selected = lots.find((lot) => lot.id === selectedId);

  function saved(lot: Lot) {
    setInventory((current) => current ? { ...current, lots: current.lots.map((existing) => existing.id === lot.id ? lot : existing) } : current);
    const query = search.trim().toLocaleLowerCase("es");
    const excluded = (query && !`${lot.number} ${lot.street}`.toLocaleLowerCase("es").includes(query)) || (street && lot.street !== street) || (status && lot.status !== status);
    if (excluded) { setSearch(""); setStreet(""); setStatus(""); }
    setNotice(`Se guardaron los cambios del lote ${lot.number}.${excluded ? " Limpiamos los filtros para mantener visible tu selección." : ""}`);
  }
  const filtersActive = !!(search || street || status);

  return (
    <div className={styles.manager} aria-busy={loading}>
      <div className={styles.inventoryHeading}>
        <div><p className={styles.eyebrow}>Gestión comercial</p><h2>Tu inventario de lotes</h2></div>
        <button type="button" disabled={loading || busy} onClick={() => void reload()}>{loading ? "Actualizando…" : "Actualizar datos"}</button>
      </div>
      {inventory && <>
        <div className={styles.stats} aria-label="Resumen de inventario">
          <div><span>Total de lotes</span><strong>{lots.length}</strong></div>
          {LOT_STATUSES.map((value) => <div key={value}><span>{STATUS_LABELS[value]}</span><strong className={styles[value]}>{counts[value]}</strong></div>)}
        </div>
        {!inventory.sourceAudit.statusesConfirmed && <p className={styles.warning} role="status">Los estados iniciales están pendientes de revisión. Confirmá los lotes vendidos antes de ofrecer el resto como disponible.</p>}
        {!!inventory.sourceAudit.warnings.length && <details className={styles.audit}><summary>Observaciones del inventario</summary><ul>{inventory.sourceAudit.warnings.map((warning, index) => <li key={index}>{warning}</li>)}</ul></details>}
      </>}
      {error && <div className={styles.error} role="alert"><p>{error}</p>{inventory && <p>Conservamos los datos que ya estabas viendo. No pudimos traer una versión actualizada.</p>}{sessionExpired && <p>Volvé a <a href="/admin/ingresar">ingresar con tu cuenta autorizada</a>.</p>}{!inventory && <button type="button" disabled={loading} onClick={() => void reload()}>Volver a intentar</button>}</div>}
      {notice && <p className={styles.notice} role="status">{notice}</p>}
      {!inventory && loading && <p className={styles.loading} role="status">Cargando tu inventario…</p>}
      {inventory && <>
        <div className={styles.toolbar}>
          <div className={styles.viewToggle} aria-label="Vista del inventario">
            <button type="button" aria-pressed={view === "map"} onClick={() => setView("map")}>Mapa</button>
            <button type="button" aria-pressed={view === "table"} onClick={() => setView("table")}>Tabla</button>
          </div>
          <label htmlFor={`${id}-search`} className={styles.search}>Buscar lote o calle<input id={`${id}-search`} type="search" autoComplete="off" value={search} disabled={loading || busy} onChange={(event) => filter(() => setSearch(event.target.value))} placeholder="Número de lote o calle…" /></label>
          <label htmlFor={`${id}-street`}>Calle<select id={`${id}-street`} value={street} disabled={loading || busy} onChange={(event) => filter(() => setStreet(event.target.value))}><option value="">Todas las calles</option>{streets.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label htmlFor={`${id}-status`}>Estado<select id={`${id}-status`} value={status} disabled={loading || busy} onChange={(event) => filter(() => setStatus(event.target.value as LotStatus | ""))}><option value="">Todos los estados</option>{LOT_STATUSES.map((value) => <option key={value} value={value}>{STATUS_LABELS[value]}</option>)}</select></label>
          <button type="button" disabled={!filtersActive || loading || busy} onClick={() => filter(() => { setSearch(""); setStreet(""); setStatus(""); })}>Limpiar filtros</button>
        </div>
        <p className={styles.results} aria-live="polite">{visible.length} de {lots.length} lotes{dirty ? " · Hay cambios sin guardar en la ficha." : ""}</p>
        <div className={styles.workspace}>
          <div className={styles.mainView}>
            {view === "map" ? <LotMap lots={visible} plan={inventory.plan} selectedId={selectedId} onSelect={select} onEdit={openEditor} imageUrl="/api/st-thomas/plan" /> : <section className={styles.tableCard} aria-label="Tabla de lotes">
              <div className={styles.sortControls}><label htmlFor={`${id}-sort`}>Ordenar por<select id={`${id}-sort`} value={sort} onChange={(event) => setSort(event.target.value as SortKey)}><option value="number">Número de lote</option><option value="street">Calle</option><option value="areaM2">Superficie</option><option value="priceUsd">Precio</option><option value="status">Estado</option></select></label><button type="button" onClick={() => setDescending(!descending)} aria-label={descending ? "Cambiar a orden ascendente" : "Cambiar a orden descendente"}>{descending ? "↓ Descendente" : "↑ Ascendente"}</button></div>
              <div className={styles.tableScroll}><table><caption className={styles.srOnly}>Lotes del inventario. Elegí un lote para consultar o editar su ficha.</caption><thead><tr><th scope="col">Lote</th><th scope="col">Calle</th><th scope="col" className={styles.numeric}>Superficie</th><th scope="col" className={styles.numeric}>Precio · USD</th><th scope="col">Estado</th><th scope="col"><span className={styles.srOnly}>Ver ficha</span></th></tr></thead><tbody>{visible.map((lot) => <tr key={lot.id} className={selectedId === lot.id ? styles.activeRow : undefined}><th scope="row"><button type="button" disabled={loading || busy} onClick={() => select(lot.id)} aria-label={`Ver ficha del lote ${lot.number}`}>{lot.number}</button></th><td>{lot.street}</td><td className={styles.numeric}>{area.format(lot.areaM2)} m²</td><td className={styles.numeric}>{lot.priceUsd === null ? "A definir" : money.format(lot.priceUsd)}</td><td><span className={`${styles.status} ${styles[lot.status]}`}>{STATUS_LABELS[lot.status]}</span></td><td><button type="button" disabled={loading || busy} onClick={() => select(lot.id)} aria-label={`Editar lote ${lot.number}`}>Ver ficha ↗</button></td></tr>)}</tbody></table></div>
              {!visible.length && <p className={styles.empty}>No hay lotes que coincidan con estos filtros.</p>}
            </section>}
          </div>
          <div ref={editorRef} className={styles.editorSlot}>{selected ? <LotEditor key={`${selected.id}:${selected.version}:${editorKey}`} lot={selected} disabled={loading} onSaved={saved} onDirtyChange={markDirty} onBusyChange={markBusy} onReload={() => void reload()} /> : <aside className={`${styles.editor} ${styles.emptyEditor}`}><span aria-hidden="true">↗</span><h2>Elegí un lote</h2><p>Seleccioná una parcela del plano o una fila de la tabla para ver su precio, estado y datos.</p></aside>}</div>
        </div>
      </>}
    </div>
  );
}
