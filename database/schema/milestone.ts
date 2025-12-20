import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { goals } from "./goal";
import { relations } from "drizzle-orm";

export const milestones = pgTable("milestones", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  goalId: uuid("goal_id").references(() => goals.id, {
    onDelete: "cascade",
  }),

  title: text("title").notNull(),
  isCompleted: boolean("is_completed").default(false),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const milestonesRelations = relations(milestones, ({ one }) => ({
  goal: one(goals, {
    fields: [milestones.goalId],
    references: [goals.id],
  }),
}));
