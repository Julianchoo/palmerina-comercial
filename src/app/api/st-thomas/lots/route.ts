import { requireAdmin } from "@/lib/admin";
import { inventoryErrorResponse, PRIVATE_HEADERS } from "@/lib/st-thomas/http";
import { readInventory } from "@/lib/st-thomas/repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    return Response.json(await readInventory(), { headers: PRIVATE_HEADERS });
  } catch (error) {
    return inventoryErrorResponse(error);
  }
}
