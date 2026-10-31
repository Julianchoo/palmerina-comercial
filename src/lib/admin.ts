import "server-only";

import { headers } from "next/headers";
import { getAuth, isAdminIdentity } from "@/lib/auth";

type Auth = NonNullable<ReturnType<typeof getAuth>>;
export type AdminSession = NonNullable<Awaited<ReturnType<Auth["api"]["getSession"]>>>;

export class AdminAccessError extends Error {
  constructor(
    public readonly status: 401 | 403 | 503,
    message: string
  ) {
    super(message);
    this.name = "AdminAccessError";
  }
}

async function readSession(requestHeaders?: Headers) {
  const auth = getAuth();
  if (!auth) {
    throw new AdminAccessError(503, "El acceso privado todavía no está habilitado.");
  }

  try {
    return await auth.api.getSession({
      headers: requestHeaders ?? new Headers(await headers()),
      // Every protected request checks the database, including session revocation.
      query: { disableCookieCache: true },
    });
  } catch {
    throw new AdminAccessError(503, "No se pudo verificar la sesión. Volvé a intentarlo.");
  }
}

export async function getAdminSession(requestHeaders?: Headers): Promise<AdminSession | null> {
  if (!getAuth()) return null;
  const session = await readSession(requestHeaders);
  return session && isAdminIdentity(session.user.email, session.user.emailVerified) ? session : null;
}

export async function requireAdmin(request: Request): Promise<AdminSession> {
  const session = await readSession(request.headers);
  if (!session) {
    throw new AdminAccessError(401, "Iniciá sesión para continuar.");
  }
  if (!isAdminIdentity(session.user.email, session.user.emailVerified)) {
    throw new AdminAccessError(403, "Tu cuenta no tiene acceso a esta sección.");
  }
  return session;
}

export function adminErrorResponse(error: unknown): Response {
  const known = error instanceof AdminAccessError;
  return Response.json(
    { error: known ? error.message : "No se pudo completar la solicitud. Volvé a intentarlo." },
    {
      status: known ? error.status : 500,
      headers: { "Cache-Control": "private, no-store" },
    }
  );
}
