/** Insert private source data into Postgres without replacing existing edits.
 * Run: node --env-file=.env.local --import tsx scripts/seed-st-thomas.ts /private/seed
 * Add --allow-unconfirmed ONLY for a private preview with all lots unavailable.
 */
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";
import { inventorySeedSchema } from "../src/lib/st-thomas/validation";

async function boundedFile(file: string, maxBytes: number): Promise<Buffer> {
  const info = await stat(file);
  if (!info.isFile() || info.size > maxBytes) throw new Error("Invalid private source file");
  return readFile(file);
}

async function main() {
  const args = process.argv.slice(2);
  const allowUnconfirmed = args.includes("--allow-unconfirmed");
  const positional = args.filter((arg) => !arg.startsWith("--"));
  if (positional.length !== 1 || args.some((arg) => arg.startsWith("--") && arg !== "--allow-unconfirmed")) {
    throw new Error("Usage: seed-st-thomas.ts PRIVATE_DIRECTORY [--allow-unconfirmed]");
  }
  const directory = path.resolve(positional[0]!);
  if (directory.split(path.sep).includes("public")) throw new Error("Sources must be private");
  const source = await boundedFile(path.join(directory, "inventory.json"), 20 * 1024 * 1024);
  const seed = inventorySeedSchema.parse(JSON.parse(source.toString("utf8")) as unknown);
  if (!seed.sourceAudit.statusesConfirmed && !allowUnconfirmed) {
    throw new Error("Confirm the sold lots before the first production import. Use --allow-unconfirmed only for a private preview.");
  }
  const image = await boundedFile(path.join(directory, "plan.png"), 4 * 1024 * 1024);
  if (image.length < 24 || !image.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    throw new Error("The private plan must be a PNG image");
  }
  const imageWidth = image.readUInt32BE(16);
  const imageHeight = image.readUInt32BE(20);
  if (!imageWidth || !imageHeight || imageWidth > 40000 || imageHeight > 40000 ||
      Math.abs(imageWidth / imageHeight - seed.plan.width / seed.plan.height) > 0.001) {
    throw new Error("Plan image dimensions do not match its coordinate system");
  }
  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Configure the private database connection");
  const pool = new Pool({ connectionString, max: 1, connectionTimeoutMillis: 10000 });
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // Serializes seed runs, so a second import cannot mix source plans.
    await client.query("SELECT pg_advisory_xact_lock(811285771)");
    const existing = await client.query<{ width: number; height: number; image: Buffer }>(
      "SELECT width, height, image FROM st_thomas_plans WHERE slug = $1", ["st-thomas"]
    );
    const previous = existing.rows[0];
    if (previous && (previous.width !== seed.plan.width || previous.height !== seed.plan.height || !previous.image.equals(image))) {
      throw new Error("An existing inventory uses a different plan; perform an explicitly reviewed migration");
    }
    await client.query(
      "INSERT INTO st_thomas_plans (slug, width, height, image, statuses_confirmed, warnings) VALUES ($1,$2,$3,$4,$5,$6::jsonb) ON CONFLICT (slug) DO NOTHING",
      ["st-thomas", seed.plan.width, seed.plan.height, image, seed.sourceAudit.statusesConfirmed, JSON.stringify(seed.sourceAudit.warnings)]
    );
    let inserted = 0;
    for (const lot of seed.lots) {
      const result = await client.query(
        "INSERT INTO st_thomas_lots (id, number, street, area_m2, price_usd, status, notes, polygon, updated_at, version) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,$10) ON CONFLICT DO NOTHING",
        [lot.id, lot.number, lot.street, lot.areaM2, lot.priceUsd, lot.status, lot.notes, JSON.stringify(lot.polygon), lot.updatedAt, lot.version]
      );
      inserted += result.rowCount ?? 0;
    }
    await client.query("COMMIT");
    console.info(`Private import complete: ${inserted} new lots; existing records preserved.`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(() => {
  // Never include source data, connection strings or driver errors in CI logs.
  console.error("Private import failed. Check the private files, confirmed statuses, migrations and database configuration.");
  process.exitCode = 1;
});
