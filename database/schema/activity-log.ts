import { pgTable, uuid, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { relations } from "drizzle-orm";

export const activityLogs = pgTable("activity_logs", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: uuid("entity_id"),

  metadata: jsonb("metadata"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const activityLogRelations = relations(activityLogs, ({ one }) => ({
  user: one(users, { fields: [activityLogs.userId], references: [users.id] }),
}));
