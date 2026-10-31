import "server-only";

import { adminErrorResponse } from "@/lib/admin";
import { InventoryError } from "./repository";

export const PRIVATE_HEADERS = { "Cache-Control": "private, no-store", Vary: "Cookie" };

export function inventoryErrorResponse(error: unknown): Response {
  if (error instanceof InventoryError) {
    return Response.json({ error: error.message }, { status: error.status, headers: PRIVATE_HEADERS });
  }
  return adminErrorResponse(error);
}

export function sameOriginMutation(request: Request): boolean {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none") return false;
  if (!origin) return false;
  try {
    const expected = new Set([new URL(request.url).origin]);
    const configured = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL;
    if (configured) expected.add(new URL(configured).origin);
    return expected.has(origin);
  } catch {
    return false;
  }
}

export async function limitedJson(request: Request, maxBytes = 16_384): Promise<unknown> {
  if (!request.body) throw new Error("empty-body");
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maxBytes) {
        await reader.cancel();
        throw new RangeError("body-too-large");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
}
