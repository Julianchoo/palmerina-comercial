import "server-only";

import { and, asc, eq, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { stThomasLots, stThomasPlans } from "@/lib/schema";
import type { Lot, LotPatch, PlanMetadata } from "./types";

export interface InventoryResponse {
  lots: Lot[];
  plan: PlanMetadata;
  sourceAudit: { statusesConfirmed: boolean; warnings: string[] };
}

export class InventoryError extends Error {
  constructor(public readonly status: 404 | 409 | 503, message: string) {
    super(message);
    this.name = "InventoryError";
  }
}

function publicLot(row: typeof stThomasLots.$inferSelect): Lot {
  return {
    id: row.id,
    number: row.number,
    street: row.street,
    areaM2: row.areaM2,
    priceUsd: row.priceUsd,
    status: row.status,
    notes: row.notes,
    polygon: row.polygon,
    updatedAt: row.updatedAt.toISOString(),
    version: row.version,
  };
}

export async function readInventory(): Promise<InventoryResponse> {
  try {
    // One database snapshot keeps plan metadata and lot rows consistent.
    return await getDb().transaction(async (tx) => {
      const [plan] = await tx.select({
        width: stThomasPlans.width,
        height: stThomasPlans.height,
        statusesConfirmed: stThomasPlans.statusesConfirmed,
        warnings: stThomasPlans.warnings,
      }).from(stThomasPlans).where(eq(stThomasPlans.slug, "st-thomas")).limit(1);
      if (!plan) throw new InventoryError(503, "El inventario todavía no está cargado.");
      const rows = await tx.select().from(stThomasLots).orderBy(asc(stThomasLots.number)).limit(5001);
      if (!rows.length || rows.length > 5000) {
        throw new InventoryError(503, "El inventario requiere revisión antes de continuar.");
      }
      return {
        lots: rows.map(publicLot),
        plan: { width: plan.width, height: plan.height, imageFile: "/api/st-thomas/plan" },
        sourceAudit: { statusesConfirmed: plan.statusesConfirmed, warnings: plan.warnings },
      };
    }, { isolationLevel: "repeatable read", readOnly: true });
  } catch (error) {
    if (error instanceof InventoryError) throw error;
    throw new InventoryError(503, "No se pudo consultar el inventario. Volvé a intentarlo.");
  }
}

export async function updateLot(id: string, patch: LotPatch, actorId: string): Promise<Lot> {
  try {
    const { version, ...changes } = patch;
    const [updated] = await getDb().update(stThomasLots).set({
      ...changes,
      updatedAt: new Date(),
      updatedBy: actorId,
      version: sql`${stThomasLots.version} + 1`,
    }).where(and(eq(stThomasLots.id, id), eq(stThomasLots.version, version))).returning();
    if (updated) return publicLot(updated);
    const [existing] = await getDb().select({ id: stThomasLots.id }).from(stThomasLots)
      .where(eq(stThomasLots.id, id)).limit(1);
    if (!existing) throw new InventoryError(404, "No se encontró el lote.");
    throw new InventoryError(409, "Este lote cambió desde que lo abriste. Actualizá los datos antes de guardar.");
  } catch (error) {
    if (error instanceof InventoryError) throw error;
    throw new InventoryError(503, "No se pudieron guardar los cambios. Volvé a intentarlo.");
  }
}

export async function readPlanImage(): Promise<Buffer> {
  try {
    const [plan] = await getDb().select({ image: stThomasPlans.image }).from(stThomasPlans)
      .where(eq(stThomasPlans.slug, "st-thomas")).limit(1);
    if (!plan) throw new InventoryError(503, "El plano todavía no está cargado.");
    return plan.image;
  } catch (error) {
    if (error instanceof InventoryError) throw error;
    throw new InventoryError(503, "No se pudo consultar el plano. Volvé a intentarlo.");
  }
}
