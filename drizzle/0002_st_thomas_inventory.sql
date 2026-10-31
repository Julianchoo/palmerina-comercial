CREATE TABLE "st_thomas_plans" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug" text NOT NULL,
  "width" double precision NOT NULL,
  "height" double precision NOT NULL,
  "image" bytea NOT NULL,
  "statuses_confirmed" boolean DEFAULT false NOT NULL,
  "warnings" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "st_thomas_plans_slug_unique" UNIQUE("slug"),
  CONSTRAINT "st_thomas_plans_dimensions" CHECK ("width" > 0 AND "width" <= 20000 AND "height" > 0 AND "height" <= 20000),
  CONSTRAINT "st_thomas_plans_image_size" CHECK (octet_length("image") <= 4194304)
);
--> statement-breakpoint
CREATE TABLE "st_thomas_lots" (
  "id" uuid PRIMARY KEY NOT NULL,
  "number" integer NOT NULL,
  "street" text NOT NULL,
  "area_m2" double precision NOT NULL,
  "price_usd" double precision,
  "status" text DEFAULT 'unavailable' NOT NULL,
  "notes" text DEFAULT '' NOT NULL,
  "polygon" jsonb NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_by" text,
  "version" integer DEFAULT 1 NOT NULL,
  CONSTRAINT "st_thomas_lots_number_unique" UNIQUE("number"),
  CONSTRAINT "st_thomas_lots_number" CHECK ("number" > 0),
  CONSTRAINT "st_thomas_lots_area" CHECK ("area_m2" > 0 AND "area_m2" <= 1000000000),
  CONSTRAINT "st_thomas_lots_price" CHECK ("price_usd" IS NULL OR ("price_usd" >= 0 AND "price_usd" <= 1000000000000)),
  CONSTRAINT "st_thomas_lots_status" CHECK ("status" IN ('available', 'unavailable', 'reserved', 'sold')),
  CONSTRAINT "st_thomas_lots_version" CHECK ("version" > 0),
  CONSTRAINT "st_thomas_lots_notes" CHECK (char_length("notes") <= 5000),
  CONSTRAINT "st_thomas_lots_street" CHECK (char_length("street") BETWEEN 1 AND 100)
);
