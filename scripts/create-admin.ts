/** Create (or reset the password of) the private administrator account.
 * Run: ADMIN_PASSWORD='…' node --env-file=.env.local --import tsx scripts/create-admin.ts [--reset-password]
 * Public sign-up is disabled, so this is the only way to create the account.
 */
import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { Pool } from "pg";

const ADMIN_EMAIL = "juliankorn@gmail.com";

async function main() {
  const args = process.argv.slice(2);
  const resetPassword = args.includes("--reset-password");
  if (args.some((arg) => arg !== "--reset-password")) {
    throw new Error("Usage: create-admin.ts [--reset-password]");
  }
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 8) throw new Error("Set ADMIN_PASSWORD (at least 8 characters)");
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Configure the private database connection");

  const pool = new Pool({ connectionString, max: 1, connectionTimeoutMillis: 10000 });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const hash = await hashPassword(password);
    const existing = await client.query<{ id: string }>('SELECT id FROM "user" WHERE email = $1', [ADMIN_EMAIL]);
    let userId = existing.rows[0]?.id;
    if (!userId) {
      userId = randomUUID();
      await client.query(
        'INSERT INTO "user" (id, name, email, email_verified, created_at, updated_at) VALUES ($1, $2, $3, true, now(), now())',
        [userId, "Julian", ADMIN_EMAIL]
      );
    } else {
      await client.query('UPDATE "user" SET email_verified = true, updated_at = now() WHERE id = $1', [userId]);
    }
    const credential = await client.query<{ id: string }>(
      "SELECT id FROM account WHERE user_id = $1 AND provider_id = 'credential'",
      [userId]
    );
    if (!credential.rows[0]) {
      await client.query(
        "INSERT INTO account (id, account_id, provider_id, user_id, password, created_at, updated_at) VALUES ($1, $2, 'credential', $2, $3, now(), now())",
        [randomUUID(), userId, hash]
      );
      console.log("Administrator account created.");
    } else if (resetPassword) {
      await client.query("UPDATE account SET password = $1, updated_at = now() WHERE id = $2", [hash, credential.rows[0].id]);
      await client.query("DELETE FROM session WHERE user_id = $1", [userId]);
      console.log("Administrator password reset; existing sessions were closed.");
    } else {
      console.log("Administrator account already exists. Use --reset-password to change its password.");
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Could not create the administrator account.");
  process.exitCode = 1;
});
