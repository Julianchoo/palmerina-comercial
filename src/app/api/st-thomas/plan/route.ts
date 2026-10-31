import { requireAdmin } from "@/lib/admin";
import { inventoryErrorResponse, PRIVATE_HEADERS } from "@/lib/st-thomas/http";
import { readPlanImage } from "@/lib/st-thomas/repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    const image = await readPlanImage();
    return new Response(new Uint8Array(image), {
      headers: {
        ...PRIVATE_HEADERS,
        "Content-Type": "image/png",
        "Content-Length": String(image.byteLength),
        "Content-Disposition": 'inline; filename="st-thomas-plan.png"',
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    return inventoryErrorResponse(error);
  }
}
