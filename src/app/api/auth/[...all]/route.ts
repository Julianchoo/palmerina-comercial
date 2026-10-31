import { getAuth } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handle(request: Request): Promise<Response> {
  const auth = getAuth();
  if (!auth) {
    return Response.json(
      { error: "El acceso privado todavía no está habilitado." },
      { status: 503, headers: { "Cache-Control": "private, no-store" } }
    );
  }
  try {
    const response = await auth.handler(request);
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  } catch {
    return Response.json(
      { error: "No se pudo iniciar sesión. Volvé a intentarlo." },
      { status: 503, headers: { "Cache-Control": "private, no-store" } }
    );
  }
}

export const GET = handle;
export const POST = handle;
