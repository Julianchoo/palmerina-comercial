import { sql } from "drizzle-orm";
import { pgTable, serial, text, timestamp, boolean, index, uuid, integer, doublePrecision, jsonb, customType, check } from "drizzle-orm/pg-core";
import type { LotStatus, PlanPoint } from "@/lib/st-thomas/types";

// IMPORTANT! ID fields should ALWAYS use UUID types, EXCEPT the BetterAuth tables.


export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("user_email_idx").on(table.email)]
);

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("session_user_id_idx").on(table.userId),
    index("session_token_idx").on(table.token),
  ]
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    index("account_user_id_idx").on(table.userId),
    index("account_provider_account_idx").on(table.providerId, table.accountId),
  ]
);

export const whatsappClicks = pgTable(
  "whatsapp_clicks",
  {
    id: serial("id").primaryKey(),
    page: text("page").notNull(),
    source: text("source").notNull(),
    clickedAt: timestamp("clicked_at").defaultNow().notNull(),
  },
  (table) => [index("whatsapp_clicks_page_idx").on(table.page)]
);

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

const bytea = customType<{ data: Buffer; driverData: Buffer }>({
  dataType: () => "bytea",
});

// Assets and coordinates stay in private database storage, never public/.
export const stThomasPlans = pgTable("st_thomas_plans", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  width: doublePrecision("width").notNull(),
  height: doublePrecision("height").notNull(),
  image: bytea("image").notNull(),
  statusesConfirmed: boolean("statuses_confirmed").default(false).notNull(),
  warnings: jsonb("warnings").$type<string[]>().default([]).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  check("st_thomas_plans_dimensions", sql`${table.width} > 0 AND ${table.width} <= 20000 AND ${table.height} > 0 AND ${table.height} <= 20000`),
  check("st_thomas_plans_image_size", sql`octet_length(${table.image}) <= 4194304`),
]);

export const stThomasLots = pgTable("st_thomas_lots", {
  id: uuid("id").primaryKey(),
  number: integer("number").notNull().unique(),
  street: text("street").notNull(),
  areaM2: doublePrecision("area_m2").notNull(),
  priceUsd: doublePrecision("price_usd"),
  status: text("status").$type<LotStatus>().default("unavailable").notNull(),
  notes: text("notes").default("").notNull(),
  polygon: jsonb("polygon").$type<PlanPoint[]>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  updatedBy: text("updated_by"),
  version: integer("version").default(1).notNull(),
}, (table) => [
  check("st_thomas_lots_number", sql`${table.number} > 0`),
  check("st_thomas_lots_area", sql`${table.areaM2} > 0 AND ${table.areaM2} <= 1000000000`),
  check("st_thomas_lots_price", sql`${table.priceUsd} IS NULL OR (${table.priceUsd} >= 0 AND ${table.priceUsd} <= 1000000000000)`),
  check("st_thomas_lots_status", sql`${table.status} IN ('available', 'unavailable', 'reserved', 'sold')`),
  check("st_thomas_lots_version", sql`${table.version} > 0`),
  check("st_thomas_lots_notes", sql`char_length(${table.notes}) <= 5000`),
  check("st_thomas_lots_street", sql`char_length(${table.street}) BETWEEN 1 AND 100`),
]);

