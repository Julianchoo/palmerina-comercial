import { z } from "zod";
import { LOT_STATUSES } from "./types";

const money = z.number().min(0).max(1_000_000_000_000).nullable();
const area = z.number().positive().max(1_000_000_000);
const street = z.string().trim().min(1).max(100);

export const lotPatchSchema = z.object({
  version: z.number().int().positive().max(2_147_483_646),
  priceUsd: money.optional(),
  areaM2: area.optional(),
  street: street.optional(),
  notes: z.string().max(5000).optional(),
  status: z.enum(LOT_STATUSES).optional(),
}).strict().refine((patch) => Object.keys(patch).some((key) => key !== "version"), {
  message: "Elegí al menos un campo para modificar.",
});

export const lotIdSchema = z.uuid();
const point = z.tuple([z.number().min(0).max(20000), z.number().min(0).max(20000)]);
export const inventorySeedSchema = z.object({
  schemaVersion: z.literal(1),
  plan: z.object({
    width: z.number().positive().max(20000),
    height: z.number().positive().max(20000),
    imageFile: z.literal("plan.png"),
  }).strict(),
  lots: z.array(z.object({
    id: lotIdSchema,
    number: z.number().int().positive(),
    street,
    areaM2: area,
    priceUsd: money,
    status: z.enum(LOT_STATUSES),
    notes: z.string().max(5000),
    polygon: z.array(point).min(3).max(10000),
    updatedAt: z.iso.datetime(),
    version: z.number().int().positive().max(2_147_483_646),
  }).strict()).min(1).max(5000),
  sourceAudit: z.object({
    lotCount: z.number().int().positive(),
    totalAreaM2: z.number().positive(),
    statusesConfirmed: z.boolean(),
    warnings: z.array(z.string().max(2000)).max(1000),
  }).strict(),
}).strict().superRefine((seed, context) => {
  const ids = new Set(seed.lots.map((lot) => lot.id));
  const numbers = new Set(seed.lots.map((lot) => lot.number));
  if (ids.size !== seed.lots.length || numbers.size !== seed.lots.length || seed.sourceAudit.lotCount !== seed.lots.length) {
    context.addIssue({ code: "custom", message: "Invalid inventory count or duplicate lots" });
  }
  const totalArea = seed.lots.reduce((sum, lot) => sum + lot.areaM2, 0);
  if (Math.abs(totalArea - seed.sourceAudit.totalAreaM2) > 0.02) {
    context.addIssue({ code: "custom", message: "Inventory surface does not reconcile" });
  }
  for (const lot of seed.lots) {
    if (lot.polygon.some(([x, y]) => x > seed.plan.width || y > seed.plan.height)) {
      context.addIssue({ code: "custom", message: "Parcel lies outside the plan" });
    }
    if (!seed.sourceAudit.statusesConfirmed && lot.status === "available") {
      context.addIssue({ code: "custom", message: "Unconfirmed inventory must not offer available lots" });
    }
  }
});
