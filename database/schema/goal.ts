import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user";
import { relations } from "drizzle-orm";
import { milestones } from "./milestone";

export const goals = pgTable("goals", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),

  start: timestamp("start").notNull(),
  deadline: timestamp("deadline").notNull(),
  motivation: text("motivation"),
  reward: text("reward"),
  theme: text("theme"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const goalsRelations = relations(goals, ({ one, many }) => ({
  user: one(users, { fields: [goals.userId], references: [users.id] }),
  milestones: many(milestones),
}));
