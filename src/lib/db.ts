import "server-only";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/lib/schema";

// Initialization stays lazy: public pages must work before private tools are configured.
const databaseGlobal = globalThis as typeof globalThis & { palmerinaPool?: Pool };

export function getPool(): Pool {
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Private database is not configured");
  }

  databaseGlobal.palmerinaPool ??= new Pool({
    connectionString,
    max: 3,
    connectionTimeoutMillis: 10_000,
    idleTimeoutMillis: 30_000,
    allowExitOnIdle: true,
  });
  return databaseGlobal.palmerinaPool;
}

export function getDb() {
  return drizzle(getPool(), { schema });
}
