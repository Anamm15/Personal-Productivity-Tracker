import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { users } from "./user";
import { relations } from "drizzle-orm";

export const pushSubscriptions = pgTable("push_subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  endpoint: text("endpoint").notNull().unique(),
  // Menyimpan keys: { p256dh: string, auth: string }
  keys: jsonb("keys").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pushSubscriptionRelations = relations(
  pushSubscriptions,
  ({ one }) => ({
    user: one(users, {
      fields: [pushSubscriptions.userId],
      references: [users.id],
    }),
  })
);
