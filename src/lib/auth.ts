import "server-only";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import * as schema from "@/lib/schema";

const ADMIN_EMAIL = "juliankorn@gmail.com";

export function isAdminIdentity(email: string, emailVerified: boolean): boolean {
  return emailVerified && email.trim().toLowerCase() === ADMIN_EMAIL;
}

function getAuthConfiguration() {
  // Preview deployments build arbitrary branches against the same database: no private access there.
  if (process.env.VERCEL_ENV === "preview") return null;
  // On Vercel production the origin comes from the platform, so a mistyped BETTER_AUTH_URL cannot break or widen it.
  const productionHost = process.env.VERCEL_ENV === "production" ? process.env.VERCEL_PROJECT_PRODUCTION_URL : undefined;
  const baseURL = productionHost ? `https://${productionHost}` : process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL;
  const secret = process.env.BETTER_AUTH_SECRET;

  if (
    !baseURL ||
    !secret ||
    secret.length < 32 ||
    !(process.env.POSTGRES_URL || process.env.DATABASE_URL)
  ) {
    return null;
  }

  try {
    const url = new URL(baseURL);
    const localDevelopment =
      process.env.NODE_ENV !== "production" &&
      ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if (
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== "/" ||
      (url.protocol !== "https:" && !(url.protocol === "http:" && localDevelopment))
    ) {
      return null;
    }
    return { baseURL: url.origin, secret };
  } catch {
    return null;
  }
}

export function isAuthConfigured(): boolean {
  return getAuthConfiguration() !== null;
}

function createAuth(configuration: NonNullable<ReturnType<typeof getAuthConfiguration>>) {
  return betterAuth({
    appName: "La Palmerina",
    baseURL: configuration.baseURL,
    secret: configuration.secret,
    trustedOrigins: [configuration.baseURL],
    database: drizzleAdapter(getDb(), { provider: "pg", schema }),
    // The administrator account is created with scripts/create-admin.ts; there is no public sign-up.
    emailAndPassword: { enabled: true, disableSignUp: true, minPasswordLength: 8 },
    account: { accountLinking: { enabled: false } },
    session: {
      expiresIn: 60 * 60 * 8,
      updateAge: 60 * 60,
      cookieCache: { enabled: false },
    },
    advanced: {
      useSecureCookies: configuration.baseURL.startsWith("https:"),
    },
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            if (!isAdminIdentity(user.email, user.emailVerified)) {
              throw new APIError("FORBIDDEN", { message: "Acceso no autorizado." });
            }
            return { data: { ...user, email: user.email.trim().toLowerCase() } };
          },
        },
      },
      session: {
        create: {
          before: async (session) => {
            const [user] = await getDb()
              .select({ email: schema.user.email, emailVerified: schema.user.emailVerified })
              .from(schema.user)
              .where(eq(schema.user.id, session.userId))
              .limit(1);
            if (!user || !isAdminIdentity(user.email, user.emailVerified)) {
              throw new APIError("FORBIDDEN", { message: "Acceso no autorizado." });
            }
            return { data: session };
          },
        },
      },
    },
  });
}

let authInstance: ReturnType<typeof createAuth> | undefined;

export function getAuth(): ReturnType<typeof createAuth> | null {
  const configuration = getAuthConfiguration();
  if (!configuration) return null;
  authInstance ??= createAuth(configuration);
  return authInstance;
}
