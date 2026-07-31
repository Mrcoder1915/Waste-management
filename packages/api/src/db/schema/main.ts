import { index, pgTable, text, timestamp, real } from "drizzle-orm/pg-core";
import { generateUlid } from "../../lib/db";
import { user } from "./schema";

export const waste = pgTable(
  "waste",
  {
    id: text("id").primaryKey().$defaultFn(generateUlid("wte")),
    wasteLabel: text("waste_label").notNull(),
    wasteType: text("waste_type").notNull(),
    confidenceLevel: real("confidence_level").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("waste_id_idx").on(table.id)],
);

export const activityLog = pgTable(
  "activity_log",
  {
    id: text("id").primaryKey().$defaultFn(generateUlid("act")),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    action: text("action").notNull(),
    description: text("description"),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("activity_log_userId_idx").on(table.userId)],
);
