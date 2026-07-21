CREATE TABLE "waste" (
	"id" text PRIMARY KEY NOT NULL,
	"waste_label" text NOT NULL,
	"waste_type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "waste_id_idx" ON "waste" USING btree ("id");