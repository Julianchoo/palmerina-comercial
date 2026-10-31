"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import styles from "./lot-map.module.css";
import type { Lot, LotStatus, PlanMetadata } from "@/lib/st-thomas/types";
import type { KeyboardEvent, PointerEvent } from "react";

export interface LotMapProps {
  lots: Lot[];
  plan: Pick<PlanMetadata, "width" | "height">;
  selectedId: string | null;
  onSelect: (id: string) => void;
  imageUrl?: string;
  className?: string;
}

interface Viewport { x: number; y: number; width: number; height: number }
interface PointerPosition { x: number; y: number }

const STATUS: Record<LotStatus, { label: string; color: string; symbol: string }> = {
  available: { label: "Disponible", color: "#25805b", symbol: "●" },
  unavailable: { label: "No disponible", color: "#7b8583", symbol: "—" },
  reserved: { label: "Reservado", color: "#b97b15", symbol: "◆" },
  sold: { label: "Vendido", color: "#ad504c", symbol: "×" },
};
const currency = new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const area = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 2 });

function bounds(lot: Lot) {
  const xs = lot.polygon.map(([x]) => x);
  const ys = lot.polygon.map(([, y]) => y);
  return { left: Math.min(...xs), top: Math.min(...ys), right: Math.max(...xs), bottom: Math.max(...ys) };
}

export function LotMap({ lots, plan, selectedId, onSelect, imageUrl = "/api/st-thomas/plan", className }: LotMapProps) {
  const id = useId().replace(/:/g, "");
  const svg = useRef<SVGSVGElement>(null);
  const pointers = useRef(new Map<number, PointerPosition>());
  const gesture = useRef({ moved: false, startX: 0, startY: 0 });
  const mapSelection = useRef<string | null>(null);
  const initial = { x: 0, y: 0, width: plan.width, height: plan.height };
  const [viewport, setViewport] = useState<Viewport>(initial);
  const viewportRef = useRef<Viewport>(initial);
  const [imageState, setImageState] = useState<"loading" | "ready" | "error">("loading");
  const selected = useMemo(() => lots.find((lot) => lot.id === selectedId), [lots, selectedId]);
  const selectedBounds = useMemo(() => selected ? bounds(selected) : null, [selected]);

  const applyViewport = useCallback((next: Viewport) => {
    // Keep a little margin around the sheet while preventing the plan from being lost.
    const width = Math.max(plan.width / 18, Math.min(plan.width, next.width));
    const height = width * plan.height / plan.width;
    const bounded = {
      width, height,
      x: Math.max(-width * .15, Math.min(plan.width - width * .85, next.x)),
      y: Math.max(-height * .15, Math.min(plan.height - height * .85, next.y)),
    };
    viewportRef.current = bounded;
    setViewport(bounded);
  }, [plan.width, plan.height]);

  const reset = useCallback(() => {
    applyViewport({ x: 0, y: 0, width: plan.width, height: plan.height });
  }, [applyViewport, plan.width, plan.height]);

  const toPlanPoint = useCallback((clientX: number, clientY: number) => {
    const element = svg.current;
    const matrix = element?.getScreenCTM();
    if (!element || !matrix) return null;
    const point = element.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    return point.matrixTransform(matrix.inverse());
  }, []);

  const zoom = useCallback((factor: number, anchor?: { x: number; y: number }) => {
    const current = viewportRef.current;
    const width = Math.max(plan.width / 18, Math.min(plan.width, current.width * factor));
    const ratio = width / current.width;
    const center = anchor ?? { x: current.x + current.width / 2, y: current.y + current.height / 2 };
    applyViewport({
      width, height: current.height * ratio,
      x: center.x - (center.x - current.x) * ratio,
      y: center.y - (center.y - current.y) * ratio,
    });
  }, [applyViewport, plan.width]);

  const focusSelection = useCallback(() => {
    if (!selectedBounds) return;
    const width = Math.min(plan.width, Math.max(
      plan.width / 9,
      (selectedBounds.right - selectedBounds.left) * 4,
      (selectedBounds.bottom - selectedBounds.top) * 4 * plan.width / plan.height,
    ));
    const height = width * plan.height / plan.width;
    applyViewport({
      width, height,
      x: (selectedBounds.left + selectedBounds.right - width) / 2,
      y: (selectedBounds.top + selectedBounds.bottom - height) / 2,
    });
  }, [applyViewport, plan.width, plan.height, selectedBounds]);

  useEffect(() => {
    if (!selectedId || mapSelection.current === selectedId) return;
    // Table/dropdown selections are brought into view; clicking the map keeps its position.
    const frame = requestAnimationFrame(focusSelection);
    return () => cancelAnimationFrame(frame);
  }, [selectedId, focusSelection]);

  useEffect(() => {
    const element = svg.current;
    if (!element) return;
    const onWheel = (event: WheelEvent) => {
      // Preserve page scrolling. The explicit buttons and keyboard offer the same action.
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const anchor = toPlanPoint(event.clientX, event.clientY);
      zoom(Math.exp(Math.max(-100, Math.min(100, event.deltaY)) * .008), anchor ?? undefined);
    };
    element.addEventListener("wheel", onWheel, { passive: false });
    return () => element.removeEventListener("wheel", onWheel);
  }, [toPlanPoint, zoom]);

  function selectLot(lotId: string, fromMap: boolean) {
    mapSelection.current = fromMap ? lotId : null;
    onSelect(lotId);
  }

  function pointerDown(event: PointerEvent<SVGSVGElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const current = pointers.current;
    if (!current.size) gesture.current = { moved: false, startX: event.clientX, startY: event.clientY };
    current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (current.size > 1) gesture.current.moved = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function pointerMove(event: PointerEvent<SVGSVGElement>) {
    const current = pointers.current;
    const previous = current.get(event.pointerId);
    if (!previous) return;
    const next = { x: event.clientX, y: event.clientY };
    if (Math.hypot(next.x - gesture.current.startX, next.y - gesture.current.startY) > 5) gesture.current.moved = true;
    const other = [...current.entries()].find(([pointerId]) => pointerId !== event.pointerId)?.[1];
    if (other) {
      const oldDistance = Math.hypot(previous.x - other.x, previous.y - other.y);
      const newDistance = Math.hypot(next.x - other.x, next.y - other.y);
      const oldCenter = toPlanPoint((previous.x + other.x) / 2, (previous.y + other.y) / 2);
      if (oldDistance > 1 && newDistance > 1) zoom(oldDistance / newDistance, oldCenter ?? undefined);
      const newCenter = toPlanPoint((next.x + other.x) / 2, (next.y + other.y) / 2);
      if (oldCenter && newCenter) {
        const view = viewportRef.current;
        applyViewport({ ...view, x: view.x + oldCenter.x - newCenter.x, y: view.y + oldCenter.y - newCenter.y });
      }
    } else if (gesture.current.moved) {
      const before = toPlanPoint(previous.x, previous.y);
      const after = toPlanPoint(next.x, next.y);
      if (before && after) {
        const view = viewportRef.current;
        applyViewport({ ...view, x: view.x + before.x - after.x, y: view.y + before.y - after.y });
      }
    }
    current.set(event.pointerId, next);
  }

  function pointerUp(event: PointerEvent<SVGSVGElement>) {
    if (!pointers.current.has(event.pointerId)) return;
    if (!gesture.current.moved && pointers.current.size === 1) {
      // Pointer capture retargets events to the SVG, so find the actual parcel under the tap.
      const element = document.elementFromPoint(event.clientX, event.clientY);
      const lotId = element?.closest("[data-lot-id]")?.getAttribute("data-lot-id");
      if (lotId) selectLot(lotId, true);
    }
    pointers.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function mapKeyboard(event: KeyboardEvent<SVGSVGElement>) {
    if (event.target !== event.currentTarget) return;
    const view = viewportRef.current;
    if (event.key === "+" || event.key === "=") zoom(.75);
    else if (event.key === "-") zoom(1.3333);
    else if (event.key === "Home" || event.key === "0") reset();
    else if (event.key === "ArrowLeft") applyViewport({ ...view, x: view.x - view.width * .12 });
    else if (event.key === "ArrowRight") applyViewport({ ...view, x: view.x + view.width * .12 });
    else if (event.key === "ArrowUp") applyViewport({ ...view, y: view.y - view.height * .12 });
    else if (event.key === "ArrowDown") applyViewport({ ...view, y: view.y + view.height * .12 });
    else return;
    event.preventDefault();
  }

  const zoomPercent = Math.round(plan.width / viewport.width * 100);

  return (
    <section className={`${styles.mapCard} ${className ?? ""}`} aria-labelledby={`${id}-heading`}>
      <div className={styles.topbar}>
        <div>
          <p className={styles.eyebrow}>Explorá el loteo</p>
          <h2 id={`${id}-heading`}>Plano de St. Thomas</h2>
        </div>
        <div className={styles.controls} aria-label="Controles del plano">
          <button type="button" onClick={() => zoom(1.3333)} disabled={zoomPercent <= 100} aria-label="Alejar plano">−</button>
          <output className={styles.zoom} aria-label="Nivel de zoom">{zoomPercent}%</output>
          <button type="button" onClick={() => zoom(.75)} disabled={zoomPercent >= 1800} aria-label="Acercar plano">+</button>
          <button type="button" onClick={reset} className={styles.reset}>Ver todo</button>
        </div>
      </div>

      <div className={styles.selectionBar}>
        <label htmlFor={`${id}-lot`}>Ir al lote</label>
        <select id={`${id}-lot`} value={selectedId ?? ""} onChange={(event) => { if (event.target.value) selectLot(event.target.value, false); }}>
          <option value="">Elegí un lote…</option>
          {lots.map((lot) => <option key={lot.id} value={lot.id}>Lote {lot.number} · {lot.street} · {STATUS[lot.status].label}</option>)}
        </select>
        <button type="button" disabled={!selected} onClick={focusSelection}>Centrar selección</button>
      </div>

      <div className={styles.canvas}>
        {imageState === "loading" && <p className={styles.imageMessage} role="status">Cargando plano…</p>}
        {imageState === "error" && <p className={styles.imageMessage} role="alert">No se pudo cargar el plano. Recargá la página para volver a intentarlo.</p>}
        <svg
          ref={svg}
          className={styles.svg}
          viewBox={`${viewport.x} ${viewport.y} ${viewport.width} ${viewport.height}`}
          preserveAspectRatio="xMidYMid meet"
          role="group"
          aria-labelledby={`${id}-title`}
          aria-describedby={`${id}-instructions`}
          tabIndex={0}
          onKeyDown={mapKeyboard}
          onPointerDown={pointerDown}
          onPointerMove={pointerMove}
          onPointerUp={pointerUp}
          onPointerCancel={(event) => { pointers.current.delete(event.pointerId); gesture.current.moved = true; }}
          onLostPointerCapture={(event) => pointers.current.delete(event.pointerId)}
        >
          <title id={`${id}-title`}>Plano interactivo de St. Thomas, lotes y estado comercial</title>
          <defs>
            <pattern id={`${id}-reserved`} patternUnits="userSpaceOnUse" width="7" height="7" patternTransform="rotate(45)">
              <rect width="7" height="7" fill="#e9bd65" fillOpacity=".35" />
              <path d="M 0 0 L 0 7" stroke="#996314" strokeOpacity=".6" strokeWidth="2" />
            </pattern>
            <pattern id={`${id}-sold`} patternUnits="userSpaceOnUse" width="8" height="8">
              <rect width="8" height="8" fill="#d88d86" fillOpacity=".4" />
              <path d="M 0 0 L 8 8 M 8 0 L 0 8" stroke="#9f4944" strokeOpacity=".5" strokeWidth=".8" />
            </pattern>
          </defs>
          <image href={imageUrl} width={plan.width} height={plan.height} x="0" y="0" preserveAspectRatio="none" onLoad={() => setImageState("ready")} onError={() => setImageState("error")} aria-hidden="true" />
          {imageState === "ready" && lots.map((lot) => {
            const active = lot.id === selectedId;
            const status = STATUS[lot.status];
            const fill = lot.status === "reserved" ? `url(#${id}-reserved)` : lot.status === "sold" ? `url(#${id}-sold)` : status.color;
            return (
              <polygon
                key={lot.id}
                data-lot-id={lot.id}
                className={`${styles.parcel} ${active ? styles.selected : ""}`}
                points={lot.polygon.map((point) => point.join(",")).join(" ")}
                fill={fill}
                fillOpacity={lot.status === "available" ? ".42" : lot.status === "unavailable" ? ".25" : "1"}
                stroke={active ? "#122e26" : status.color}
                strokeWidth={active ? "3" : "1"}
                vectorEffect="non-scaling-stroke"
                strokeDasharray={!active && lot.status === "unavailable" ? "3 2" : undefined}
                role="button"
                tabIndex={active || (!selectedId && lot.id === lots[0]?.id) ? 0 : -1}
                aria-label={`Lote ${lot.number}, ${lot.street}, ${area.format(lot.areaM2)} metros cuadrados, ${lot.priceUsd === null ? "precio a definir" : currency.format(lot.priceUsd)}, ${status.label}`}
                aria-pressed={active}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    selectLot(lot.id, false);
                  }
                }}
              >
                <title>{`Lote ${lot.number} · ${status.label} · ${lot.priceUsd === null ? "A definir" : currency.format(lot.priceUsd)}`}</title>
              </polygon>
            );
          })}
          {imageState === "ready" && selected && selectedBounds && (
            <text
              x={(selectedBounds.left + selectedBounds.right) / 2}
              y={selectedBounds.top - viewport.width / 100}
              fontSize={viewport.width / 65}
              textAnchor="middle"
              fill="#122e26"
              stroke="#fffefa"
              strokeWidth={viewport.width / 250}
              paintOrder="stroke"
              fontWeight="600"
              pointerEvents="none"
              aria-hidden="true"
            >Lote {selected.number}</text>
          )}
        </svg>
        <div className={styles.canvasCaption} aria-live="polite">
          {selected ? <><strong>Lote {selected.number}</strong><span>{STATUS[selected.status].symbol} {STATUS[selected.status].label}</span></> : <span>Seleccioná un lote para ver su ficha</span>}
        </div>
      </div>

      <div className={styles.legend} aria-label="Estados de los lotes">
        {Object.entries(STATUS).map(([key, state]) => <span key={key}><i className={styles[key]} aria-hidden="true">{state.symbol}</i>{state.label}</span>)}
      </div>
      <p id={`${id}-instructions`} className={styles.instructions}>Arrastrá para recorrer el plano o usá dos dedos para acercar. Con teclado: flechas para desplazar, + y − para zoom, Inicio para ver todo. También podés elegir un lote en la lista.</p>
      {!lots.length && <p className={styles.empty} role="status">No hay lotes para mostrar con los filtros actuales.</p>}
    </section>
  );
}
