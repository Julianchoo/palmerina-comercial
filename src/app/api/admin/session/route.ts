import { getAdminSession, adminErrorResponse } from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  try {
    const session = await getAdminSession(request.headers);
    return Response.json(
      { isAdmin: session !== null },
      { headers: { "Cache-Control": "private, no-store", Vary: "Cookie" } }
    );
  } catch (error) {
    return adminErrorResponse(error);
  }
}
