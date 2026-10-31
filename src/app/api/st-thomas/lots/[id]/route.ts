import { requireAdmin } from "@/lib/admin";
import { inventoryErrorResponse, limitedJson, PRIVATE_HEADERS, sameOriginMutation } from "@/lib/st-thomas/http";
import { updateLot } from "@/lib/st-thomas/repository";
import { lotIdSchema, lotPatchSchema } from "@/lib/st-thomas/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdmin(request);
    if (!sameOriginMutation(request)) {
      return Response.json({ error: "El origen de la solicitud no está autorizado." }, { status: 403, headers: PRIVATE_HEADERS });
    }
    if (request.headers.get("content-type")?.split(";")[0]?.trim() !== "application/json") {
      return Response.json({ error: "Enviá los cambios como JSON." }, { status: 415, headers: PRIVATE_HEADERS });
    }
    const id = lotIdSchema.safeParse((await params).id);
    if (!id.success) {
      return Response.json({ error: "El identificador del lote no es válido." }, { status: 400, headers: PRIVATE_HEADERS });
    }
    let input: unknown;
    try {
      input = await limitedJson(request);
    } catch (error) {
      const tooLarge = error instanceof RangeError;
      return Response.json({ error: tooLarge ? "La solicitud es demasiado grande." : "No se pudo leer la solicitud." }, {
        status: tooLarge ? 413 : 400, headers: PRIVATE_HEADERS,
      });
    }
    const patch = lotPatchSchema.safeParse(input);
    if (!patch.success) {
      return Response.json({ error: "Revisá el precio, la superficie, el estado y los demás campos." }, { status: 400, headers: PRIVATE_HEADERS });
    }
    const { version, priceUsd, areaM2, street, notes, status } = patch.data;
    return Response.json({ lot: await updateLot(id.data, {
      version,
      ...(priceUsd !== undefined ? { priceUsd } : {}),
      ...(areaM2 !== undefined ? { areaM2 } : {}),
      ...(street !== undefined ? { street } : {}),
      ...(notes !== undefined ? { notes } : {}),
      ...(status !== undefined ? { status } : {}),
    }, session.user.id) }, { headers: PRIVATE_HEADERS });
  } catch (error) {
    return inventoryErrorResponse(error);
  }
}
