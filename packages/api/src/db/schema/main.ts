import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { generateUlid } from "../../lib/db";

export const waste = pgTable(
  "waste",
  {
    id: text("id").primaryKey().$defaultFn(generateUlid("wte")),
    wasteLabel: text("waste_label").notNull(),
    wasteType: text("waste_type").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("waste_id_idx").on(table.id)],
);
