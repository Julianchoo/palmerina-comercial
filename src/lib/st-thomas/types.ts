/** Public contracts only. Inventory and parcel coordinates live in private storage. */
export const LOT_STATUSES = ["available", "unavailable", "reserved", "sold"] as const;
export type LotStatus = (typeof LOT_STATUSES)[number];
export type PlanPoint = [number, number];
export interface Lot {
  id: string;
  number: number;
  street: string;
  areaM2: number;
  priceUsd: number | null;
  status: LotStatus;
  notes: string;
  polygon: PlanPoint[];
  updatedAt: string;
  version: number;
}
export interface LotPatch {
  priceUsd?: number | null;
  areaM2?: number;
  street?: string;
  notes?: string;
  status?: LotStatus;
  /** The version read by the editor; required for optimistic concurrency. */
  version: number;
}
export interface PlanMetadata {
  width: number;
  height: number;
  imageFile: string;
}
export interface InventorySeed {
  schemaVersion: 1;
  plan: PlanMetadata;
  lots: Lot[];
  sourceAudit: {
    lotCount: number;
    totalAreaM2: number;
    statusesConfirmed: boolean;
    warnings: string[];
  };
}
